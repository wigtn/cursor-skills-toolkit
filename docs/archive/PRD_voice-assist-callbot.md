# Voice Assist CallBot PRD

> **Version**: 1.0
> **Created**: 2026-01-29
> **Status**: Draft
> **Project**: Cursor Hackathon - WIGTN

---

## 1. Overview

### 1.1 Problem Statement

거동이 어려운 사람들(장애인, 고령자, 환자 등)은 전화 통화가 필요한 상황에서 큰 어려움을 겪습니다:
- 청각 장애로 인해 전화 내용을 듣기 어려움
- 언어 장애로 인해 말하기가 어려움
- 인지 장애로 인해 실시간 대화가 부담됨
- 긴급 상황에서 도움을 요청하기 어려움

이러한 사람들이 **채팅 형식으로 입력하면 AI가 대신 전화를 걸어주고**, 상대방의 음성을 실시간 텍스트로 보여주며, 사용자의 텍스트 입력을 음성으로 변환하여 상대방에게 전달하는 **음성 AI 콜봇**이 필요합니다.

### 1.2 Goals

- **접근성 향상**: 전화 통화가 어려운 사람들이 쉽게 전화 서비스를 이용할 수 있게 함
- **실시간 양방향 변환**: STT(음성→텍스트)와 TTS(텍스트→음성)의 실시간 변환
- **직관적 인터페이스**: 채팅 형식의 익숙한 UI로 누구나 쉽게 사용
- **해커톤 완성도**: Cursor AI만 사용하여 MVP 수준의 완성된 프로토타입 제작

### 1.3 Non-Goals (Out of Scope)

- 실제 통신사 연동 (데모는 시뮬레이션 또는 WebRTC 기반)
- 다국어 지원 (한국어만 지원)
- 결제 시스템
- 사용자 인증/회원가입 (해커톤 데모용)
- 통화 녹음 및 저장 (프라이버시 이슈)

### 1.4 Scope

| 포함 | 제외 |
|------|------|
| 채팅 기반 UI | 실제 PSTN 전화 연동 |
| 실시간 STT (음성→텍스트) | 다국어 지원 |
| 실시간 TTS (텍스트→음성) | 사용자 인증 시스템 |
| WebRTC 기반 음성 통화 시뮬레이션 | 통화 녹음/저장 |
| 자주 사용하는 연락처 (택시, 병원, 공공기관) | 결제 시스템 |
| 통화 시나리오 템플릿 | 복잡한 백엔드 인프라 |

---

## 2. User Stories

### 2.1 Primary User

**페르소나**: 김영희 (68세, 청각 장애 3급)
- 보청기를 착용해도 전화 통화가 어려움
- 스마트폰 채팅 앱은 능숙하게 사용
- 혼자 병원 예약이나 택시 호출이 어려워 항상 가족에게 부탁

**User Story**:
> As a 청각 장애인, I want to 채팅으로 입력하면 AI가 대신 전화를 걸어주고 상대방 말을 텍스트로 보여주는 서비스 so that 가족 도움 없이 혼자서 병원 예약이나 택시 호출을 할 수 있다.

### 2.2 Secondary User Stories

1. **언어 장애인**:
   > As a 언어 장애인, I want to 텍스트로 입력하면 자연스러운 음성으로 상대방에게 전달 so that 전화 통화가 필요한 업무를 처리할 수 있다.

2. **고령자**:
   > As a 고령자, I want to 간단한 버튼 클릭으로 택시나 병원에 전화 so that 복잡한 절차 없이 도움을 요청할 수 있다.

### 2.3 Acceptance Criteria (Gherkin)

```gherkin
Feature: 음성 AI 콜봇으로 전화 걸기

  Scenario: 사용자가 택시를 호출한다
    Given 사용자가 앱을 실행한 상태에서
    And "택시 호출" 빠른 연결 버튼이 보인다
    When 사용자가 "택시 호출" 버튼을 클릭하면
    Then AI가 택시 콜센터에 전화를 건다
    And 상대방의 음성이 실시간으로 텍스트로 표시된다
    And 사용자는 채팅창에 텍스트를 입력하여 응답할 수 있다

  Scenario: 실시간 음성-텍스트 변환
    Given 전화가 연결된 상태에서
    When 상대방(콜센터)이 "안녕하세요, 어디로 모실까요?"라고 말하면
    Then 화면에 "상대방: 안녕하세요, 어디로 모실까요?"가 실시간으로 표시된다
    And 사용자는 1초 이내에 텍스트를 확인할 수 있다

  Scenario: 텍스트-음성 변환으로 응답
    Given 전화가 연결된 상태에서
    When 사용자가 "서울역으로 가주세요"라고 채팅창에 입력하고 전송하면
    Then AI가 자연스러운 음성으로 "서울역으로 가주세요"를 상대방에게 전달한다
    And 화면에 "나: 서울역으로 가주세요"가 표시된다

  Scenario: 통화 종료
    Given 전화가 연결된 상태에서
    When 사용자가 "통화 종료" 버튼을 클릭하면
    Then 전화가 종료된다
    And "통화가 종료되었습니다" 메시지가 표시된다
```

---

## 3. Functional Requirements

| ID | Requirement | Priority | Dependencies |
|----|------------|----------|--------------|
| FR-001 | 사용자가 텍스트를 입력하면 TTS로 변환하여 상대방에게 전달 | P0 (Must) | - |
| FR-002 | 상대방의 음성을 STT로 변환하여 실시간 텍스트 표시 | P0 (Must) | - |
| FR-003 | 채팅 형식의 대화 UI (카카오톡 스타일) | P0 (Must) | - |
| FR-004 | 빠른 연결 버튼 (택시, 병원, 공공기관) | P0 (Must) | FR-001, FR-002 |
| FR-005 | 전화 걸기/끊기 기능 | P0 (Must) | - |
| FR-006 | 실시간 연결 상태 표시 (연결 중, 통화 중, 종료) | P1 (Should) | FR-005 |
| FR-007 | 자주 쓰는 문장 템플릿 (예: "서울역으로 가주세요") | P1 (Should) | FR-001 |
| FR-008 | 대화 내용 복사 기능 | P2 (Could) | FR-003 |
| FR-009 | 음성 속도 조절 (TTS) | P2 (Could) | FR-001 |
| FR-010 | 긴급 연락처 (119, 112) 빠른 호출 | P1 (Should) | FR-004 |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target | Description |
|--------|--------|-------------|
| STT 지연시간 | < 500ms | 음성 인식 후 텍스트 표시까지 |
| TTS 지연시간 | < 300ms | 텍스트 전송 후 음성 출력까지 |
| 동시 사용자 | 10+ | 해커톤 데모 수준 |
| 초기 로딩 | < 3초 | 앱 실행 후 사용 가능까지 |

### 4.2 Accessibility (접근성)

| Feature | Requirement |
|---------|-------------|
| 글씨 크기 | 최소 18px, 조절 가능 |
| 대비율 | WCAG AA (4.5:1) 이상 |
| 버튼 크기 | 최소 48x48px (터치 영역) |
| 스크린 리더 | 기본 지원 |

### 4.3 Security

- HTTPS 통신 필수
- 통화 내용 서버 저장 안함 (프라이버시)
- API 키 환경 변수 관리

### 4.4 Reliability

- 네트워크 오류 시 재연결 시도 (최대 3회)
- 오류 발생 시 사용자 친화적 메시지 표시

---

## 5. Technical Design

### 5.1 Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | Next.js 14 (App Router) | React 기반, 빠른 개발 |
| Styling | Tailwind CSS | 빠른 UI 개발, 반응형 |
| STT | Web Speech API / Whisper API | 브라우저 기본 or 고품질 |
| TTS | Web Speech API / OpenAI TTS | 브라우저 기본 or 자연스러운 음성 |
| 실시간 통신 | WebRTC / WebSocket | 양방향 실시간 음성/데이터 |
| 상태 관리 | Zustand | 가벼움, 간단한 API |
| 배포 | Vercel | Next.js 최적화, 무료 |

### 5.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │   Chat UI   │    │  Call UI    │    │ Quick Dial  │        │
│   │  Component  │    │ Component   │    │  Component  │        │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘        │
│          │                  │                  │                │
│   ┌──────▼──────────────────▼──────────────────▼──────┐        │
│   │              Zustand State Store                  │        │
│   │  (messages, callStatus, settings)                 │        │
│   └──────────────────────┬────────────────────────────┘        │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   STT Service │  │   TTS Service │  │ WebRTC/Socket │
│  (Whisper)    │  │  (OpenAI TTS) │  │   Service     │
└───────────────┘  └───────────────┘  └───────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                 ┌─────────────────┐
                 │  Demo Backend   │
                 │ (AI 상대방 시뮬) │
                 └─────────────────┘
```

### 5.3 API Specification

---

#### API: 텍스트를 음성으로 변환 (TTS)

##### `POST /api/tts`

**Description**: 사용자가 입력한 텍스트를 음성으로 변환

**Authentication**: None (해커톤 데모)

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Content-Type | Yes | application/json |

**Request Body**:
```json
{
  "text": "string (required) - 음성으로 변환할 텍스트, 최대 500자",
  "voice": "string (optional) - 음성 종류, default: 'alloy'",
  "speed": "number (optional) - 음성 속도 0.5~2.0, default: 1.0"
}
```

**Request Example**:
```json
{
  "text": "서울역으로 가주세요",
  "voice": "alloy",
  "speed": 1.0
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "audioUrl": "string - 생성된 오디오 URL (base64 or URL)",
    "duration": "number - 오디오 길이 (초)"
  }
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "audioUrl": "data:audio/mp3;base64,//uQxAAAAAANIAAAAAExBTUUz...",
    "duration": 2.5
  }
}
```

**Error Responses**:
| Status | Code | Message | When |
|--------|------|---------|------|
| 400 | INVALID_INPUT | Text is required | 텍스트 누락 |
| 400 | TEXT_TOO_LONG | Text exceeds 500 characters | 텍스트 길이 초과 |
| 500 | TTS_ERROR | Failed to generate audio | TTS API 오류 |

---

#### API: 음성을 텍스트로 변환 (STT)

##### `POST /api/stt`

**Description**: 오디오 데이터를 텍스트로 변환

**Authentication**: None (해커톤 데모)

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Content-Type | Yes | multipart/form-data |

**Request Body**:
```
audio: File (required) - 오디오 파일 (webm, mp3, wav)
language: string (optional) - 언어 코드, default: 'ko'
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "text": "string - 인식된 텍스트",
    "confidence": "number - 신뢰도 0~1"
  }
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "text": "안녕하세요, 어디로 모실까요?",
    "confidence": 0.95
  }
}
```

**Error Responses**:
| Status | Code | Message | When |
|--------|------|---------|------|
| 400 | INVALID_AUDIO | Invalid audio format | 지원하지 않는 형식 |
| 400 | AUDIO_TOO_LONG | Audio exceeds 30 seconds | 오디오 길이 초과 |
| 500 | STT_ERROR | Failed to transcribe audio | STT API 오류 |

---

#### API: 통화 시뮬레이션 시작

##### `POST /api/call/start`

**Description**: AI 상대방과의 통화 시뮬레이션 시작

**Authentication**: None (해커톤 데모)

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Content-Type | Yes | application/json |

**Request Body**:
```json
{
  "contactType": "string (required) - 연락처 유형: 'taxi' | 'hospital' | 'public' | 'emergency'",
  "contactName": "string (optional) - 연락처 이름"
}
```

**Request Example**:
```json
{
  "contactType": "taxi",
  "contactName": "카카오택시"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "callId": "string - 통화 세션 ID",
    "status": "string - 'connecting' | 'connected'",
    "greeting": "string - AI 상대방의 첫 인사"
  }
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "callId": "call_abc123",
    "status": "connected",
    "greeting": "안녕하세요, 카카오택시입니다. 어디로 모실까요?"
  }
}
```

---

#### API: 통화 중 메시지 전송

##### `POST /api/call/message`

**Description**: 통화 중 사용자 메시지를 AI 상대방에게 전달하고 응답 받기

**Authentication**: None (해커톤 데모)

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Content-Type | Yes | application/json |

**Request Body**:
```json
{
  "callId": "string (required) - 통화 세션 ID",
  "message": "string (required) - 사용자 메시지"
}
```

**Request Example**:
```json
{
  "callId": "call_abc123",
  "message": "서울역으로 가주세요"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "response": "string - AI 상대방 응답",
    "callStatus": "string - 통화 상태"
  }
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "response": "네, 서울역으로 배차하겠습니다. 현재 위치가 어디신가요?",
    "callStatus": "connected"
  }
}
```

---

#### API: 통화 종료

##### `POST /api/call/end`

**Description**: 통화 세션 종료

**Request Body**:
```json
{
  "callId": "string (required) - 통화 세션 ID"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "message": "통화가 종료되었습니다",
    "duration": "number - 통화 시간 (초)"
  }
}
```

---

### 5.4 Database Schema

해커톤 MVP에서는 서버 사이드 DB 없이 클라이언트 상태만 사용합니다.

**Zustand Store Schema**:

```typescript
interface CallState {
  // 통화 상태
  callId: string | null;
  callStatus: 'idle' | 'connecting' | 'connected' | 'ended';
  contactType: 'taxi' | 'hospital' | 'public' | 'emergency' | null;
  contactName: string | null;

  // 메시지
  messages: Message[];

  // 설정
  settings: {
    fontSize: 'small' | 'medium' | 'large';
    voiceSpeed: number;
    selectedVoice: string;
  };
}

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}
```

### 5.5 UI/UX Wireframe

```
┌─────────────────────────────────────────┐
│  Voice Assist CallBot          [설정]   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  빠른 연결                       │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐│   │
│  │  │택시 │ │병원 │ │공공 │ │긴급 ││   │
│  │  │ 🚕 │ │ 🏥 │ │ 🏛️ │ │ 🚨 ││   │
│  │  └─────┘ └─────┘ └─────┘ └─────┘│   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        💬 대화 영역               │   │
│  │                                 │   │
│  │  ┌───────────────────────────┐ │   │
│  │  │ 상대방: 안녕하세요,        │ │   │
│  │  │ 카카오택시입니다.          │ │   │
│  │  │ 어디로 모실까요?           │ │   │
│  │  └───────────────────────────┘ │   │
│  │                                 │   │
│  │        ┌───────────────────────┐│   │
│  │        │ 나: 서울역으로        ││   │
│  │        │ 가주세요              ││   │
│  │        └───────────────────────┘│   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  자주 쓰는 문장                  │   │
│  │  [서울역으로] [집으로] [병원으로]  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  메시지를 입력하세요...    [전송] │   │
│  └─────────────────────────────────┘   │
│                                         │
│        ┌──────────────────┐            │
│        │   📞 통화 종료    │            │
│        └──────────────────┘            │
│                                         │
└─────────────────────────────────────────┘
```

---

## 6. Implementation Phases

### Phase 1: 기본 환경 설정 (MVP Foundation)

- [ ] Next.js 14 프로젝트 생성
- [ ] Tailwind CSS 설정
- [ ] 기본 레이아웃 및 라우팅 구조
- [ ] Zustand 상태 관리 설정

**Deliverable**: 프로젝트 기본 구조 완성

### Phase 2: 핵심 UI 구현

- [ ] 채팅 UI 컴포넌트 (메시지 목록, 입력창)
- [ ] 빠른 연결 버튼 UI
- [ ] 통화 상태 표시 UI
- [ ] 접근성 고려한 스타일링 (큰 글씨, 높은 대비)

**Deliverable**: 완성된 UI (데이터 연동 전)

### Phase 3: TTS/STT 연동

- [ ] TTS API 연동 (텍스트 → 음성)
- [ ] STT API 연동 (음성 → 텍스트)
- [ ] 실시간 스트리밍 처리 (Web Speech API 또는 Whisper)
- [ ] 오디오 재생/녹음 기능

**Deliverable**: 음성 변환 기능 동작

### Phase 4: 통화 시뮬레이션

- [ ] AI 상대방 시뮬레이션 (OpenAI API 활용)
- [ ] 통화 시나리오별 프롬프트 (택시, 병원, 공공기관)
- [ ] 통화 시작/종료 로직
- [ ] 실시간 대화 흐름

**Deliverable**: 완전한 통화 시뮬레이션 데모

### Phase 5: 마무리 및 배포

- [ ] 에러 핸들링 및 UX 개선
- [ ] 모바일 반응형 최적화
- [ ] Vercel 배포
- [ ] 데모 시나리오 준비

**Deliverable**: 배포된 데모 앱

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| STT 정확도 | > 90% | 테스트 문장 인식률 |
| TTS 자연스러움 | 4.0/5.0 | 사용자 피드백 |
| 전체 플로우 완료율 | 100% | 택시 호출 시나리오 완료 |
| 초기 로딩 시간 | < 3초 | Lighthouse 측정 |
| 접근성 점수 | > 90 | Lighthouse Accessibility |

---

## 8. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| STT/TTS API 비용 초과 | High | Medium | 무료 Web Speech API 우선 사용, 필요시 Whisper |
| 실시간 성능 이슈 | High | Medium | 스트리밍 방식 적용, 청크 단위 처리 |
| 해커톤 시간 부족 | High | Medium | Phase별 MVP 우선, Phase 4까지 최소 목표 |
| 모바일 호환성 | Medium | Low | 반응형 디자인, 터치 최적화 |

---

## 9. Open Questions

1. **실제 전화 연동 필요 여부**: 해커톤 데모에서 실제 전화 연동이 필요한가, 아니면 AI 시뮬레이션으로 충분한가?
2. **음성 선택**: 남성/여성 음성 선택 기능이 필요한가?
3. **다중 언어**: 향후 영어 등 다국어 지원 계획이 있는가?

---

## 10. Appendix

### A. 경쟁/유사 서비스

| 서비스 | 특징 | 차별점 |
|--------|------|--------|
| 손말이음센터 | 정부 운영, 수어 통역 | 실시간 채팅 UI 없음 |
| Google Live Transcribe | 실시간 음성 인식 | 전화 대리 기능 없음 |
| 각 통신사 보이스피싱 차단 | 음성 분석 | 접근성 목적 아님 |

### B. 참고 자료

- [Web Speech API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [OpenAI TTS API](https://platform.openai.com/docs/guides/text-to-speech)
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [WCAG 2.1 접근성 가이드](https://www.w3.org/WAI/WCAG21/quickref/)
