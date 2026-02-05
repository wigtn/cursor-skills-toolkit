# ADR: Voice Proxy 아키텍처 결정

> **ADR**: Architecture Decision Record
> **Date**: 2026-02-05
> **Status**: Accepted
> **Deciders**: Team

## Context

Voice Proxy는 말이 불편한 사용자를 위해 **텍스트 입력 → TTS → 전화 상대방에게 전달**하는 대리 통화 서비스입니다. 아키텍처 선택 시 두 가지 옵션을 검토했습니다.

## Options Considered

### Option A: Twilio + ElevenLabs TTS/STT (개별 API)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Option A: 개별 API 조합                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [사용자 → 상대방]                                                   │
│  ┌────────┐    ┌─────────┐    ┌───────────┐    ┌─────────┐         │
│  │ 텍스트  │ →  │ Backend │ →  │ ElevenLabs│ →  │ Twilio  │ → 상대방 │
│  │ 입력   │    │         │    │ TTS API   │    │ Media   │         │
│  └────────┘    └─────────┘    └───────────┘    └─────────┘         │
│                                                                     │
│  [상대방 → 사용자]                                                   │
│  ┌─────────┐    ┌───────────┐    ┌─────────┐    ┌────────┐         │
│  │ Twilio  │ →  │ ElevenLabs│ →  │ Backend │ →  │ 텍스트  │         │
│  │ Media   │    │ STT API   │    │         │    │ 표시   │         │
│  └─────────┘    └───────────┘    └─────────┘    └────────┘         │
│                                                                     │
│  특징: 모든 로직을 우리 서버에서 제어                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Option B: ElevenLabs Conversational AI + Outbound Call API

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Option B: ElevenLabs Conversational AI            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                   ElevenLabs AI Agent                          │ │
│  │  ┌─────┐    ┌─────┐    ┌──────────┐    ┌─────┐               │ │
│  │  │ ASR │ →  │ LLM │ →  │ Response │ →  │ TTS │               │ │
│  │  │     │    │     │    │ Generate │    │     │               │ │
│  │  └─────┘    └─────┘    └──────────┘    └─────┘               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│        ↑                                         │                  │
│        │ WebSocket                               │ Twilio           │
│        │ (user_message)                          ↓                  │
│  ┌──────────┐                              ┌──────────┐            │
│  │ 사용자    │                              │  상대방   │            │
│  │ 텍스트    │                              │          │            │
│  │ 입력     │                              │          │            │
│  └──────────┘                              └──────────┘            │
│                                                                     │
│  특징: ElevenLabs가 TTS/STT/대화 로직 모두 처리                      │
│        AI가 자동으로 응답 생성 (비활성화 불가)                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Detailed Comparison

### 기능 비교

| 항목 | Option A (Twilio + TTS/STT) | Option B (Conversational AI) |
|------|----------------------------|------------------------------|
| **텍스트 → 음성** | 직접 TTS API 호출 | `user_message` 이벤트로 주입 |
| **음성 → 텍스트** | 직접 STT API 호출 | WebSocket으로 transcription 수신 |
| **AI 자동 응답** | 없음 (순수 릴레이) | **항상 AI가 응답 생성** |
| **사용자 텍스트 전달** | 그대로 TTS 변환 | AI가 해석 후 응답 생성 |

### 동작 차이 예시

**Voice Proxy가 원하는 동작:**
```
사용자 입력: "안녕하세요, 예약 확인하려고 전화드렸습니다"
        ↓
상대방이 듣는 음성: "안녕하세요, 예약 확인하려고 전화드렸습니다"
        (동일해야 함)
```

**Option A (Twilio + TTS/STT) 동작:**
```
사용자 입력: "안녕하세요, 예약 확인하려고 전화드렸습니다"
        ↓ (ElevenLabs TTS API 직접 호출)
상대방이 듣는 음성: "안녕하세요, 예약 확인하려고 전화드렸습니다"
        ✅ 정확히 동일
```

**Option B (Conversational AI) 동작:**
```
사용자 입력: "안녕하세요, 예약 확인하려고 전화드렸습니다"
        ↓ (user_message 이벤트)
        ↓ (AI Agent가 해석)
        ↓ (AI가 응답 생성)
상대방이 듣는 음성: "안녕하세요! 예약 확인을 도와드리겠습니다.
                    성함과 예약 날짜를 말씀해 주시겠어요?"
        ❌ AI가 자체 응답 생성 (원본과 다름)
```

### 기술적 특성

| 특성 | Option A | Option B |
|------|----------|----------|
| **구현 복잡도** | 높음 (Media Streams 브릿지 필요) | 낮음 (SDK 사용) |
| **제어 수준** | 완전한 제어 | 제한적 제어 |
| **의존성** | Twilio + ElevenLabs (개별) | ElevenLabs 플랫폼 |
| **커스터마이징** | 자유로움 | 에이전트 설정 범위 내 |

### 비용 구조

| 항목 | Option A | Option B |
|------|----------|----------|
| Twilio 발신 (한국) | ~$0.04/분 | ~$0.04/분 (내부적으로 사용) |
| Twilio Media Streams | ~$0.004/분 | 포함 |
| ElevenLabs TTS | ~$0.30/1K 문자 | 포함 |
| ElevenLabs STT | ~$0.10/분 | 포함 |
| **예상 통화당 비용** | **~$0.20-0.40/분** | **Conversational AI 요금** |

### ElevenLabs Conversational AI 제한사항

ElevenLabs 공식 문서 조사 결과:

1. **AI 자동 응답 비활성화 불가**
   - [Conversation Flow 문서](https://elevenlabs.io/docs/agents-platform/customization/conversation-flow)에서 타임아웃, 중단, 응답 속도만 제어 가능
   - 응답 생성 자체를 비활성화하는 옵션 없음

2. **user_message 이벤트의 한계**
   - [Client-to-Server Events 문서](https://elevenlabs.io/docs/agents-platform/customization/events/client-to-server-events)
   - "Text is processed as user input to the conversation"
   - 즉, 텍스트가 AI 입력으로 처리되어 AI가 해석하고 응답

3. **Chat Mode도 부적합**
   - 텍스트 전용 모드지만 여전히 AI가 응답 생성
   - "AI 응답 비활성화"와 다른 개념

## Decision

**Option A: Twilio + ElevenLabs TTS/STT 선택**

## Rationale

1. **핵심 요구사항 충족**: 사용자 텍스트를 **그대로** 음성으로 변환하여 전달
2. **완전한 제어**: 모든 로직이 우리 서버에서 동작하여 예측 가능한 동작
3. **AI 간섭 없음**: 원하지 않는 AI 자동 응답 없이 순수 릴레이 동작
4. **유연성**: 향후 기능 추가 시 제약 없음

## Consequences

### 긍정적
- 사용자 의도대로 정확한 텍스트 전달
- 예측 가능한 동작
- 완전한 커스터마이징 가능

### 부정적
- 구현 복잡도 증가 (Media Streams + WebSocket 브릿지)
- 개별 서비스 연동 필요
- 비용 구조 복잡 (두 서비스 별도 과금)

### 완화 방안
- Media Streams 연동은 Twilio 공식 예제 참고
- ElevenLabs WebSocket API로 스트리밍 TTS 지연 최소화
- 비용 모니터링 및 일일 한도 설정

## Use Cases by Architecture

| 서비스 유형 | 권장 아키텍처 | 이유 |
|------------|--------------|------|
| **Voice Proxy** (대리 통화) | Option A | 사용자 텍스트 그대로 전달 필요 |
| **Auto CallBot** (자동화 봇) | Option B | AI 자동 응답이 목적 |
| **고객 상담 봇** | Option B | 시나리오 기반 AI 응답 필요 |
| **접수/예약 봇** | Option B | 구조화된 대화 흐름 필요 |

## References

- [ElevenLabs Outbound Call via Twilio](https://elevenlabs.io/docs/api-reference/twilio/outbound-call)
- [ElevenLabs Client-to-Server Events](https://elevenlabs.io/docs/agents-platform/customization/events/client-to-server-events)
- [ElevenLabs Conversation Flow](https://elevenlabs.io/docs/agents-platform/customization/conversation-flow)
- [ElevenLabs Multimodal Conversational AI](https://elevenlabs.io/blog/introducing-multimodal-conversational-ai)
- [ElevenLabs Batch Calling](https://elevenlabs.io/blog/introducing-batch-calling-for-elevenlabs-conversational-ai)
- [Twilio Media Streams](https://www.twilio.com/docs/voice/media-streams)

## Related Documents

- [PRD_voice-proxy.md](../prd/PRD_voice-proxy.md) - Voice Proxy PRD
- [PLAN_voice-proxy.md](../todo_plan/PLAN_voice-proxy.md) - 구현 계획
