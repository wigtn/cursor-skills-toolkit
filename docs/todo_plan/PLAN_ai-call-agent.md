# Task Plan: AI Call Agent

> **Generated from**: docs/prd/PRD_ai-call-agent.md
> **Created**: 2026-02-05
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

### Phase 2: 사용자 인증
**목표**: 로그인/회원가입 기능 구현

- [ ] 2.1 NextAuth.js 설정 (Credentials Provider)
- [ ] 2.2 User 모델 마이그레이션
- [ ] 2.3 로그인/회원가입 페이지 UI
- [ ] 2.4 비밀번호 정책 적용 (8자+, 영문+숫자)
- [ ] 2.5 로그인 실패 잠금 (5회 실패 시 15분)
- [ ] 2.6 인증 미들웨어 설정

**산출물**: 보안 정책이 적용된 인증 시스템

---

### Phase 3: 요청 입력 시스템
**목표**: 자연어 요청 입력 및 파싱

- [ ] 3.1 요청 입력 페이지 UI
- [ ] 3.2 자연어 요청 파싱 API (GPT-4)
- [ ] 3.3 요청 유형 분류 (예약/문의)
- [ ] 3.4 예약 정보 추출 (날짜, 시간, 서비스)
- [ ] 3.5 문의 정보 추출 (질문)
- [ ] 3.6 전화번호 입력/검증
- [ ] 3.7 긴급 전화번호 차단
- [ ] 3.8 요청 확인 페이지 UI
- [ ] 3.9 Rate Limiting 적용 (시간당 5회)

**산출물**: 요청 입력 → 파싱 → 확인 플로우

---

### Phase 4: ElevenLabs Agent 설정
**목표**: AI 통화 에이전트 구성

- [ ] 4.1 ElevenLabs 계정 설정
- [ ] 4.2 예약 Agent 생성 (프롬프트 작성)
- [ ] 4.3 문의 Agent 생성 (프롬프트 작성)
- [ ] 4.4 한국어 음성 선택 및 테스트
- [ ] 4.5 동적 변수 설정 (날짜, 시간, 서비스 등)
- [ ] 4.6 Agent 테스트 (시뮬레이션)

**산출물**: 예약/문의용 AI Agent

---

### Phase 5: ElevenLabs Outbound Call 연동
**목표**: AI 전화 발신 기능 구현

- [ ] 5.1 ElevenLabs + Twilio 연동 설정
- [ ] 5.2 Outbound Call API 연동
- [ ] 5.3 통화 시작 API (`POST /api/v1/calls`)
- [ ] 5.4 동적 변수 전달 (conversation_initiation_client_data)
- [ ] 5.5 통화 상태 추적
- [ ] 5.6 통화 진행 중 UI
- [ ] 5.7 녹음 동의 안내 설정

**산출물**: 요청 → AI 전화 발신

---

### Phase 6: 결과 처리 시스템
**목표**: 통화 결과 수신 및 처리

- [ ] 6.1 ElevenLabs 웹훅 설정
- [ ] 6.2 웹훅 엔드포인트 구현 (`POST /api/webhooks/elevenlabs`)
- [ ] 6.3 통화 결과 파싱 (성공/실패)
- [ ] 6.4 예약 정보 추출 및 저장
- [ ] 6.5 문의 답변 추출 및 저장
- [ ] 6.6 AI 요약 생성 (ElevenLabs or GPT-4)
- [ ] 6.7 결과 화면 UI
- [ ] 6.8 실패 시 재시도 로직

**산출물**: 통화 결과 → 사용자 표시

---

### Phase 7: 알림 시스템
**목표**: 통화 완료 알림

- [ ] 7.1 Web Push 설정
- [ ] 7.2 알림 권한 요청 UI
- [ ] 7.3 통화 완료 알림 발송
- [ ] 7.4 알림 클릭 → 결과 페이지 이동

**산출물**: 통화 완료 알림

---

### Phase 8: 통화 기록 관리 (P1)
**목표**: 통화 히스토리 관리

- [ ] 8.1 통화 기록 목록 API
- [ ] 8.2 통화 기록 목록 페이지
- [ ] 8.3 통화 상세 API
- [ ] 8.4 통화 상세 페이지 (요약, 녹음, 전문)
- [ ] 8.5 녹음 재생 컴포넌트
- [ ] 8.6 Transcript 표시

**산출물**: 통화 기록 관리 시스템

---

### Phase 9: 마무리 및 배포 준비
**목표**: 배포 가능한 상태로 완성

- [ ] 9.1 에러 핸들링 강화
- [ ] 9.2 전체 테스트 및 버그 수정
- [ ] 9.3 환경 변수 문서화
- [ ] 9.4 README.md 작성
- [ ] 9.5 배포 설정 (Vercel)

**산출물**: 배포 준비 완료된 애플리케이션

---

## Dependencies

```
Phase 1 (초기 설정)
    ↓
Phase 2 (인증)
    ↓
Phase 3 (요청 입력)
    ↓
Phase 4 (Agent 설정) ◀── ElevenLabs 핵심
    ↓
Phase 5 (Outbound Call) ◀── ElevenLabs + Twilio
    ↓
Phase 6 (결과 처리)
    ↓
Phase 7 (알림)
    ↓
Phase 8 (기록 관리)
    ↓
Phase 9 (마무리)
```

---

## Progress

| Metric | Value |
|--------|-------|
| Total Tasks | 0/48 |
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

**ElevenLabs 설정**:
- ElevenLabs 계정 및 API 키
- Conversational AI 접근 권한
- Twilio 연동 설정 (ElevenLabs 대시보드에서)

**Twilio 설정**:
- Twilio 계정 및 전화번호 (한국 발신 가능)
- ElevenLabs와 연동 완료

**OpenAI 설정** (요청 파싱용):
- OpenAI API 키
- GPT-4 접근 권한

### 환경 변수 목록

```env
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# ElevenLabs
ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID_RESERVATION=
ELEVENLABS_AGENT_ID_INQUIRY=
ELEVENLABS_PHONE_NUMBER_ID=

# OpenAI (요청 파싱용)
OPENAI_API_KEY=

# App
BASE_URL=
```

### Voice Proxy vs AI Call Agent 비교

| 항목 | Voice Proxy | AI Call Agent |
|------|-------------|---------------|
| 사용자 참여 | 실시간 타이핑 | 요청만 |
| AI 역할 | TTS/STT 변환 | 자율 대화 |
| 아키텍처 | Twilio + TTS/STT | ElevenLabs Conversational AI |
| 구현 복잡도 | 높음 | 낮음 |

### 테스트 체크리스트

- [ ] 요청 파싱 정확도 확인
- [ ] ElevenLabs Agent 대화 품질 테스트
- [ ] 예약 성공률 측정
- [ ] 문의 답변 정확도 측정
- [ ] 통화 실패 시 재시도 작동 확인
- [ ] 알림 수신 확인
