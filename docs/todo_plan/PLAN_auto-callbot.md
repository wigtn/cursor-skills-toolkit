# Task Plan: Auto CallBot

> **Generated from**: docs/prd/PRD_auto-callbot.md
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
- [ ] 1.3 Prisma 설정 및 데이터베이스 스키마 작성 (업데이트된 Call 모델 포함)
- [ ] 1.4 환경 변수 설정 (.env.example) - Twilio 추가
- [ ] 1.5 프로젝트 디렉토리 구조 생성

**산출물**: 실행 가능한 Next.js 프로젝트 boilerplate

---

### Phase 2: 사용자 인증
**목표**: 로그인/회원가입 기능 구현 (보안 정책 포함)

- [ ] 2.1 NextAuth.js 설정 (Credentials Provider)
- [ ] 2.2 User 모델 마이그레이션
- [ ] 2.3 로그인/회원가입 페이지 UI
- [ ] 2.4 **비밀번호 정책 적용** (8자+, 영문+숫자)
- [ ] 2.5 **로그인 실패 잠금** (5회 실패 시 15분)
- [ ] 2.6 인증 미들웨어 설정
- [ ] 2.7 세션 관리 (24시간 만료, 동시 로그인 제한)

**산출물**: 보안 정책이 적용된 인증 시스템

---

### Phase 3: 자연어 → 스크립트 변환
**목표**: AI 기반 통화 스크립트 생성 기능

- [ ] 3.1 OpenAI GPT-4 API 연동
- [ ] 3.2 자연어 분석 및 스크립트 생성 로직
- [ ] 3.3 `/api/v1/scripts/generate` 엔드포인트
- [ ] 3.4 **Rate Limiting 적용** (분당 10회)
- [ ] 3.5 스크립트 저장 API (`/api/v1/scripts`)
- [ ] 3.6 주문 설정 페이지 UI (자연어 입력)
- [ ] 3.7 스크립트 미리보기 및 수정 UI

**산출물**: 자연어 입력 → 구조화된 통화 스크립트 생성

---

### Phase 4: 캠페인 관리
**목표**: 통화 캠페인 생성 및 관리

- [ ] 4.1 Campaign, Call 모델 마이그레이션 (cost, recordingConsent 필드 포함)
- [ ] 4.2 캠페인 CRUD API (생성, 조회, **취소, 삭제** 포함)
- [ ] 4.3 연락처 입력 UI (수동 입력)
- [ ] 4.4 **전화번호 검증 로직** (E.164, 한국 번호 패턴)
- [ ] 4.5 연락처 컨텍스트 설정 (이름, 예약 시간 등)
- [ ] 4.6 캠페인 생성 플로우 UI

**산출물**: 연락처 목록과 스크립트를 묶은 캠페인 생성 (검증 포함)

---

### Phase 5: Twilio + ElevenLabs 통화 연동
**목표**: 실제 전화 발신 기능 구현 (Twilio + ElevenLabs 하이브리드)

- [ ] 5.1 **Twilio 클라이언트 설정** (Programmable Voice)
- [ ] 5.2 **ElevenLabs WebSocket 연동** (TTS/STT)
- [ ] 5.3 **Twilio Media Streams 설정** (양방향 오디오)
- [ ] 5.4 **녹음 동의 안내 멘트 자동 재생**
- [ ] 5.5 통화 시작/종료 API
- [ ] 5.6 스크립트 컨텍스트를 AI에 전달
- [ ] 5.7 통화 상태 콜백 처리 (Twilio webhook)
- [ ] 5.8 **통화 예외 처리** (끊김, 인식 실패, 음성메일)
- [ ] 5.9 통화 결과 저장 로직
- [ ] 5.10 캠페인 실행 큐 관리 (순차 발신)

**산출물**: Twilio로 전화 발신, ElevenLabs로 AI 음성 대화 수행

---

### Phase 6: 실시간 대시보드
**목표**: 통화 현황 실시간 모니터링

- [ ] 6.1 SSE (Server-Sent Events) 엔드포인트
- [ ] 6.2 대시보드 페이지 레이아웃
- [ ] 6.3 진행률 표시 컴포넌트
- [ ] 6.4 통화 목록 실시간 업데이트
- [ ] 6.5 캠페인 일시정지/재개/취소 기능
- [ ] 6.6 개별 통화 상세 정보 모달

**산출물**: 실시간 통화 현황 대시보드

---

### Phase 7: 리포트 및 녹음 (P1)
**목표**: 통화 결과 분석 및 기록

- [ ] 7.1 Twilio 녹음 저장 로직 (동의한 통화만)
- [ ] 7.2 녹음 재생 UI
- [ ] 7.3 AI 통화 요약 생성 (GPT-4)
- [ ] 7.4 PDF 리포트 생성
- [ ] 7.5 CSV 리포트 다운로드
- [ ] 7.6 리포트 다운로드 UI

**산출물**: 캠페인 결과 리포트 및 녹음 재생

---

### Phase 8: 추가 기능 (P1)
**목표**: 편의 기능 및 안정성 개선

- [ ] 8.1 CSV 연락처 업로드
- [ ] 8.2 통화 실패 자동 재시도 (최대 3회)
- [ ] 8.3 진행률 및 예상 완료 시간 계산
- [ ] 8.4 **발신자 번호 설정** (Twilio 번호 인증)
- [ ] 8.5 **통화 비용 추적 및 표시**
- [ ] 8.6 에러 핸들링 및 사용자 알림 개선

**산출물**: 향상된 사용성 및 안정성

---

### Phase 9: 마무리 및 배포 준비
**목표**: 배포 가능한 상태로 완성

- [ ] 9.1 전체 테스트 및 버그 수정
- [ ] 9.2 환경 변수 문서화
- [ ] 9.3 README.md 작성
- [ ] 9.4 배포 설정 (Vercel)

**산출물**: 배포 준비 완료된 애플리케이션

---

## Dependencies

```
Phase 1 (초기 설정)
    ↓
Phase 2 (인증 + 보안 정책)
    ↓
Phase 3 (스크립트 생성 + Rate Limiting)
    ↓
Phase 4 (캠페인 관리 + 번호 검증)
    ↓
Phase 5 (Twilio + ElevenLabs 연동) ◀── 핵심 변경
    ↓
Phase 6 (대시보드)
    ↓
Phase 7 (리포트)
    ↓
Phase 8 (추가 기능 + 비용 추적)
    ↓
Phase 9 (마무리)
```

---

## Progress

| Metric | Value |
|--------|-------|
| Total Tasks | 0/52 |
| Current Phase | - |
| Status | pending |

---

## Execution Log

| Timestamp | Phase | Task | Status |
|-----------|-------|------|--------|
| - | - | - | - |

---

## Notes

### 사전 요구사항 (Digging Review 반영)

**Twilio 설정**:
- Twilio 계정 생성 및 전화번호 구매 (한국 발신 가능 번호)
- Account SID, Auth Token 확보
- Programmable Voice 활성화

**ElevenLabs 설정**:
- ElevenLabs 계정 및 API 키
- 한국어 음성 모델 선택 및 테스트
- WebSocket API 접근 권한

**OpenAI 설정**:
- OpenAI API 키
- GPT-4 접근 권한

### 환경 변수 목록 (업데이트)
```
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# OpenAI
OPENAI_API_KEY=

# Twilio (신규)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# ElevenLabs
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=

# App
BASE_URL=
```

### 비용 예상 (통화당)
| 항목 | 예상 비용 |
|------|----------|
| Twilio 발신 (한국) | ~$0.04/분 |
| Twilio 녹음 | ~$0.0025/분 |
| ElevenLabs TTS | ~$0.30/1K 문자 |
| ElevenLabs STT | ~$0.10/분 |
| OpenAI GPT-4 | ~$0.03/1K 토큰 |
| **예상 통화당 비용** | **~$0.15-0.30/분** |

### Critical 이슈 해결 체크리스트
- [x] ElevenLabs + Twilio 아키텍처 결정
- [x] 통화 녹음 동의 프로세스 정의
- [x] 비밀번호 정책 추가
- [x] Rate Limiting 정책 추가
- [x] 전화번호 검증 로직 추가
- [x] 캠페인 취소/삭제 API 추가
- [x] 통화 예외 처리 정의
- [x] 비용 추적 기능 추가
