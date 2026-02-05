# Task Plan: Voice Proxy

> **Generated from**: docs/prd/PRD_voice-proxy.md
> **Created**: 2026-02-05
> **Updated**: 2026-02-05 (Digging Review 반영)
> **Status**: pending

## Execution Config

| Option | Value | Description |
|--------|-------|-------------|
| `auto_commit` | true | 완료 시 자동 커밋 |
| `commit_per_phase` | true | Phase별 중간 커밋 |
| `quality_gate` | true | /auto-commit 품질 검사 |

---

## Phases

### Phase 1: 프로젝트 초기 설정
**목표**: 개발 환경 구성 및 기본 구조 설정

- [ ] 1.1 Next.js 14 프로젝트 생성 (App Router)
- [ ] 1.2 Tailwind CSS + shadcn/ui 설정
- [ ] 1.3 Prisma 설정 및 데이터베이스 스키마 작성
- [ ] 1.4 환경 변수 설정 (.env.example)
- [ ] 1.5 프로젝트 디렉토리 구조 생성

**산출물**: 실행 가능한 Next.js 프로젝트 boilerplate

---

### Phase 2: 사용자 인증 (보안 정책 포함)
**목표**: 로그인/회원가입 기능 구현 + 보안 정책

- [ ] 2.1 NextAuth.js 설정 (Credentials Provider)
- [ ] 2.2 User, UserSettings 모델 마이그레이션
- [ ] 2.3 로그인/회원가입 페이지 UI
- [ ] 2.4 **비밀번호 정책 적용** (8자+, 영문+숫자)
- [ ] 2.5 **로그인 실패 잠금** (5회 실패 시 15분)
- [ ] 2.6 인증 미들웨어 설정
- [ ] 2.7 세션 관리 (24시간 만료, 동시 로그인 제한)

**산출물**: 보안 정책이 적용된 인증 시스템

---

### Phase 3: 전화 발신 기능 (검증 포함)
**목표**: Twilio를 통한 전화 발신 + Rate Limiting

- [ ] 3.1 Twilio 클라이언트 설정
- [ ] 3.2 전화번호 입력 UI
- [ ] 3.3 전화번호 검증 로직 (E.164, 한국 번호)
- [ ] 3.4 **긴급 전화번호 차단** (112, 119, 110, 111)
- [ ] 3.5 `/api/v1/calls` 발신 API
- [ ] 3.6 **Rate Limiting 적용** (시간당 10회)
- [ ] 3.7 TwiML 생성 (녹음 동의 안내 + Media Streams)
- [ ] 3.8 통화 상태 콜백 처리 (Twilio webhook)
- [ ] 3.9 Call 모델 저장 (cost, endReason 필드 포함)

**산출물**: 전화 발신 및 연결 기능 (검증 및 제한 포함)

---

### Phase 4: 실시간 음성 처리 (핵심)
**목표**: Twilio Media Streams + ElevenLabs TTS/STT 연동

- [ ] 4.1 WebSocket 서버 설정 (Socket.io)
- [ ] 4.2 Twilio Media Streams 연동
- [ ] 4.3 ElevenLabs TTS API 연동 (텍스트 → 음성)
- [ ] 4.4 ElevenLabs STT API 연동 (음성 → 텍스트)
- [ ] 4.5 양방향 오디오 브릿지 구현
- [ ] 4.6 사용자 메시지 → TTS → Twilio 전송
- [ ] 4.7 **텍스트 길이 제한** (200자)
- [ ] 4.8 **TTS 실패 시 에러 이벤트** (message_error)
- [ ] 4.9 **메시지 큐잉** (음성 출력 중 새 메시지 대기)
- [ ] 4.10 Twilio 오디오 → STT → 사용자 표시
- [ ] 4.11 **STT 실패 시 에러 이벤트** (transcription_error)
- [ ] 4.12 **무음 감지** (5초 이상 silence_detected)
- [ ] 4.13 지연 시간 최적화 (스트리밍 방식)
- [ ] 4.14 **상대방 통화 종료 감지** (call_ended_by_callee)

**산출물**: 실시간 TTS/STT 양방향 음성 통신 (에러 처리 포함)

---

### Phase 5: 실시간 채팅 인터페이스
**목표**: 대리 통화 핵심 UI

- [ ] 5.1 통화 화면 레이아웃
- [ ] 5.2 대화 내역 표시 컴포넌트 (나/상대방 구분)
- [ ] 5.3 메시지 입력 필드 (자동 포커스)
- [ ] 5.4 빠른 응답 버튼 패널 (기본 6개)
- [ ] 5.5 음성 변환 중 시각적 피드백
- [ ] 5.6 상대방 말하는 중 표시
- [ ] 5.7 통화 상태 표시 (발신중/연결됨/종료)
- [ ] 5.8 통화 종료 버튼
- [ ] 5.9 키보드 단축키 (Enter: 전송, Esc: 종료)

**산출물**: 완전한 실시간 대리 통화 UI

---

### Phase 6: 빠른 응답 관리
**목표**: 빠른 응답 템플릿 기능

- [ ] 6.1 QuickReply 모델 마이그레이션
- [ ] 6.2 기본 빠른 응답 시드 데이터
- [ ] 6.3 빠른 응답 목록 조회 API
- [ ] 6.4 커스텀 빠른 응답 CRUD API
- [ ] 6.5 빠른 응답 관리 UI (설정 페이지)

**산출물**: 빠른 응답 생성/수정/삭제 기능

---

### Phase 7: 통화 기록 및 요약 (P1)
**목표**: 통화 내역 저장 및 조회

- [ ] 7.1 Message 모델 저장 로직 (실시간 저장)
- [ ] 7.2 통화 기록 목록 API
- [ ] 7.3 통화 상세 조회 API (transcript)
- [ ] 7.4 AI 통화 요약 생성 (GPT-4)
- [ ] 7.5 통화 기록 목록 페이지
- [ ] 7.6 통화 상세 페이지 (대화 내역)
- [ ] 7.7 통화 종료 후 요약 표시 화면

**산출물**: 통화 기록 관리 시스템

---

### Phase 8: 녹음 기능 (P1)
**목표**: 통화 녹음 저장 및 재생

- [ ] 8.1 Twilio 녹음 설정 (동의 시에만)
- [ ] 8.2 녹음 파일 저장 로직
- [ ] 8.3 녹음 재생 UI
- [ ] 8.4 녹음 다운로드 기능

**산출물**: 통화 녹음 기능

---

### Phase 9: 접근성 기능 (P1)
**목표**: 접근성 향상

- [ ] 9.1 고대비 모드 구현
- [ ] 9.2 큰 글자 모드 구현
- [ ] 9.3 ARIA labels 추가
- [ ] 9.4 키보드 네비게이션 최적화
- [ ] 9.5 사용자 설정 저장

**산출물**: 접근성 옵션 제공

---

### Phase 10: 마무리 및 배포 준비
**목표**: 배포 가능한 상태로 완성

- [ ] 10.1 에러 핸들링 강화
- [ ] 10.2 전체 테스트 및 버그 수정
- [ ] 10.3 환경 변수 문서화
- [ ] 10.4 README.md 작성
- [ ] 10.5 배포 설정 (Vercel)

**산출물**: 배포 준비 완료된 애플리케이션

---

## Dependencies

```
Phase 1 (초기 설정)
    ↓
Phase 2 (인증)
    ↓
Phase 3 (전화 발신)
    ↓
Phase 4 (실시간 음성 처리) ◀── 핵심
    ↓
Phase 5 (채팅 인터페이스)
    ↓
Phase 6 (빠른 응답)
    ↓
Phase 7 (통화 기록)
    ↓
Phase 8 (녹음)
    ↓
Phase 9 (접근성)
    ↓
Phase 10 (마무리)
```

---

## Progress

| Metric | Value |
|--------|-------|
| Total Tasks | 0/58 |
| Current Phase | - |
| Status | pending |

---

## Execution Log

| Timestamp | Phase | Task | Status |
|-----------|-------|------|--------|
| - | - | - | - |

---

## Notes

### 사전 요구사항

**Twilio 설정**:
- Twilio 계정 생성 및 전화번호 구매 (한국 발신 가능 번호)
- Account SID, Auth Token 확보
- Programmable Voice 활성화
- Media Streams 활성화

**ElevenLabs 설정**:
- ElevenLabs 계정 및 API 키
- 한국어 음성 모델 선택 (테스트 필요)
- TTS/STT API 접근 권한

**OpenAI 설정** (요약 기능):
- OpenAI API 키
- GPT-4 접근 권한

### 환경 변수 목록

```env
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# ElevenLabs
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=

# OpenAI (요약용)
OPENAI_API_KEY=

# App
BASE_URL=
```

### 핵심 기술 포인트

1. **실시간 양방향 오디오**: Twilio Media Streams + WebSocket
2. **TTS 지연 최소화**: 스트리밍 방식 구현, 청크 단위 전송
3. **STT 실시간 표시**: 부분 결과(partial) + 최종 결과(final) 처리
4. **사용자 경험**: 자동 포커스, 키보드 단축키, 시각적 피드백

### 비용 예상 (통화당)

| 항목 | 예상 비용 |
|------|----------|
| Twilio 발신 (한국) | ~$0.04/분 |
| Twilio Media Streams | ~$0.004/분 |
| ElevenLabs TTS | ~$0.30/1K 문자 |
| ElevenLabs STT | ~$0.10/분 |
| **예상 통화당 비용** | **~$0.20-0.40/분** |

### 테스트 체크리스트

- [ ] TTS 지연 시간 < 2초 확인
- [ ] STT 정확도 > 90% 확인
- [ ] 통화 연결/종료 정상 작동
- [ ] 빠른 응답 즉시 전송 확인
- [ ] 키보드 단축키 작동 확인
- [ ] 접근성 모드 전환 확인
- [ ] **긴급 전화번호 차단 확인**
- [ ] **200자 초과 입력 차단 확인**
- [ ] **Rate Limiting 작동 확인**
- [ ] **TTS/STT 실패 시 에러 표시 확인**
- [ ] **상대방 통화 종료 시 알림 확인**
- [ ] **네트워크 끊김 시 재연결 확인**

### Digging Review 해결 체크리스트

- [x] 비밀번호 정책 추가 (C-1)
- [x] Rate Limiting 정의 (C-2)
- [x] 메시지 전송 에러 처리 (C-3)
- [x] STT 인식 실패 처리 (C-4)
- [x] 통화 비용 필드 추가 (C-5)
- [x] 세션 관리 정책 (M-1)
- [x] 네트워크 복구 전략 (M-2)
- [x] 텍스트 길이 제한 (M-3)
- [x] 메시지 큐잉 (M-4)
- [x] 상대방 종료 알림 (M-5)
- [x] 긴급 전화 차단 (M-6)
