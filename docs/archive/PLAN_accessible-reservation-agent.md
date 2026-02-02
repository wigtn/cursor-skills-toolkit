# Task Plan: Accessible Reservation Agent

> **Generated from**: docs/prd/PRD_accessible-reservation-agent.md
> **Created**: 2026-02-02
> **Status**: pending
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)

## Execution Config

| Option | Value | Description |
|--------|-------|-------------|
| `auto_commit` | true | 완료 시 자동 커밋 |
| `commit_per_phase` | true | Phase별 중간 커밋 (해커톤 안전) |
| `quality_gate` | true | /auto-commit 품질 검사 |
| `parallel_agents` | true | Cursor Parallel Agents 활용 |

---

## Team Assignment

| 역할 | 코드명 | 담당 영역 | Phase 집중 |
|---|---|---|---|
| AI 개발자 | **AI-1** | OpenAI Realtime API, WebRTC, Function Calling | Phase 3 |
| AI 개발자 | **AI-2** | 프롬프트 엔지니어링, QA, 발표 준비 | Phase 3, 5 |
| 프론트엔드 | **FE-1** | UI/UX, 접근성 컴포넌트, 3개 화면 | Phase 2, 4 |
| 풀스택 | **FE-2** | API 라우트, 상태 관리, 통합 | Phase 1, 4 |

---

## Timeline (5시간)

```
11:00 ─────────────────────────────────────────────────────────── 16:00
  │                                                                 │
  │ P1 │    Phase 2     │    Phase 3      │   Phase 4   │   P5    │
  │15m │   1h 15m       │   1h 30m        │    1h       │   1h    │
  │    │                │                 │             │         │
  └────┴────────────────┴─────────────────┴─────────────┴─────────┘
       11:15           12:30             14:00        15:00      16:00
                        │
                    점심+머지
                    (13:30-14:00)
```

---

## Phases

### Phase 1: 환경 설정 (11:00 ~ 11:15) — 15분

**담당**: FE-2 (리드) + 전원 동시 작업

| Task | 담당 | Parallel | 의존성 |
|------|------|----------|--------|
| Next.js 16 프로젝트 생성 (pnpm) | FE-1 | - | - |
| TailwindCSS v4 설정 | FE-1 | - | Task 1 |
| 폴더 구조 생성 | FE-1 | - | Task 1 |
| Zustand store 기본 설정 | FE-2 | Agent 1 | Task 3 |
| 환경변수 설정 (.env.local) | AI-1 | Agent 2 | Task 1 |
| Git 초기화 + GitHub push | FE-2 | - | Task 1-5 |
| Vercel 첫 배포 | FE-2 | - | Task 6 |
| AGENTS.md 당일 확정 사항 반영 | AI-2 | Agent 3 | - |

**Completion Criteria**:
- [ ] `pnpm dev` 로컬 실행 확인
- [ ] Vercel 배포 URL 접속 확인
- [ ] 전원 같은 repo clone 완료

**Commit Message**: `chore: initial project setup with Next.js 16`

---

### Phase 2: 핵심 UI 구현 (11:15 ~ 12:30) — 1시간 15분

**담당**: FE-1 (주도) + FE-2 (지원)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| AccessibleButton 컴포넌트 | FE-1 | Agent 1 | P0 |
| AccessibleCard 컴포넌트 | FE-1 | Agent 1 | P0 |
| AccessibleInput 컴포넌트 | FE-1 | Agent 1 | P0 |
| 대화 화면 (page.tsx) | FE-1 | Agent 2 | P0 |
| 확인 화면 (confirm/page.tsx) | FE-1 | Agent 3 | P0 |
| 결과 화면 (result/page.tsx) | FE-1 | Agent 4 | P0 |
| VoiceInputPanel 컴포넌트 | FE-2 | Agent 5 | P0 |
| QuickButtons 컴포넌트 | FE-2 | Agent 5 | P0 |
| PhoneScript 단계별 UI | FE-2 | Agent 6 | P1 |
| 탭 네비게이션 | FE-2 | Agent 6 | P1 |

**Parallel Agent 전략 (FE-1)**:
```
# Cursor에서 worktree 모드로 4x 병렬 실행

Agent 1: "src/components/ui/ 폴더에 접근성 강화된 Button, Card, Input 컴포넌트를 만들어줘.
          WCAG 2.2 AA 기준, 48x48px 최소 터치 영역, ARIA 완전 지원"

Agent 2: "src/app/page.tsx에 대화 화면을 만들어줘.
          마이크 버튼(크게), 대화 내역, 빠른 입력 버튼 3개, 텍스트 입력창"

Agent 3: "src/app/confirm/page.tsx에 확인 화면을 만들어줘.
          예약 정보 카드, '맞아요'/'수정하기' 버튼 2개"

Agent 4: "src/app/result/page.tsx에 결과 화면을 만들어줘.
          탭 네비게이션(메시지/전화/요약), 복사 버튼, 새 예약 버튼"
```

**Completion Criteria**:
- [ ] 3개 화면 모두 접근 가능
- [ ] 모든 버튼 48x48px 이상
- [ ] 색상 대비 4.5:1 이상
- [ ] 키보드 탭 이동 정상 동작

**Commit Message**: `feat: implement accessible UI components and 3 main screens`

---

### Phase 3: OpenAI Realtime 연동 (12:30 ~ 14:00) — 1시간 30분

**담당**: AI-1 (주도) + AI-2 (프롬프트)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| Ephemeral Token 발급 API | AI-1 | Agent 1 | P0 |
| WebRTC 연결 로직 | AI-1 | Agent 2 | P0 |
| 마이크 입력 → Realtime | AI-1 | Agent 2 | P0 |
| Tools (Function Calling) 정의 | AI-1 | Agent 3 | P0 |
| System Instructions 작성 | AI-2 | Agent 4 | P0 |
| 응답 → Zustand 연동 | FE-2 | Agent 5 | P0 |
| 에러 핸들링 (연결 실패, 타임아웃) | AI-1 | Agent 3 | P1 |
| 텍스트 입력 fallback | FE-2 | Agent 5 | P1 |

**AI-1 작업 상세**:
```typescript
// 1. lib/realtime/session.ts - Ephemeral Token
// 2. lib/realtime/webrtc.ts - WebRTC 연결
// 3. lib/realtime/tools.ts - Function 정의
// 4. app/api/realtime/session/route.ts - Token API
// 5. hooks/useRealtimeConnection.ts - React Hook
```

**AI-2 프롬프트 작업**:
```typescript
// lib/realtime/instructions.ts
// - 접근성 톤 (천천히, 쉬운 말)
// - 확인 중심 대화
// - Function Call 시점 지시
```

**점심 + 머지 (13:30 ~ 14:00)**:
```
□ 전원 feature 브랜치 → main 머지
□ pnpm build 성공 확인
□ 마이크 → AI 응답 → 화면 표시 E2E 확인
□ Vercel 배포 확인
```

**Completion Criteria**:
- [ ] 마이크 버튼 누르면 WebRTC 연결
- [ ] 음성 입력 → AI 응답 (음성)
- [ ] Function Call로 예약 정보 추출 확인
- [ ] 연결 실패 시 에러 메시지 표시

**Commit Message**: `feat: integrate OpenAI Realtime API with WebRTC`

---

### Phase 4: 결과 생성 + 통합 (14:00 ~ 15:00) — 1시간

**담당**: FE-1 + FE-2 (통합) + AI-1 + AI-2 (지원)

| Task | 담당 | 우선순위 |
|------|------|----------|
| 확인 카드에 Zustand 데이터 연동 | FE-1 | P0 |
| generate_outputs Function 결과 처리 | AI-1 | P0 |
| 예약 메시지 복사 기능 | FE-2 | P0 |
| 전화 스크립트 단계별 이동 | FE-2 | P0 |
| 캘린더 URL 생성 API | AI-1 | P1 |
| 전체 플로우 E2E 테스트 | AI-2 | P0 |
| 화면 간 네비게이션 | FE-1 | P0 |

**통합 조 편성**:
- **조 A (AI ↔ State)**: AI-1 + FE-2 — Realtime 응답 → Zustand → UI 연결
- **조 B (UI ↔ UX)**: FE-1 + AI-2 — 화면 연결 + 데모 시나리오 테스트

**Completion Criteria**:
- [ ] 음성 입력 → 확인 카드 → 결과 화면 전체 플로우
- [ ] 메시지 복사 버튼 동작
- [ ] 전화 스크립트 다음/이전 버튼 동작
- [ ] 새 예약 버튼으로 초기화

**Commit Message**: `feat: complete reservation flow with results generation`

---

### Phase 5: 마무리 + 데모 준비 (15:00 ~ 16:00) — 1시간

**담당**: 전원

| Task | 담당 | 시간 |
|------|------|------|
| 접근성 최종 점검 | FE-1 | 15분 |
| 에러 핸들링 강화 | FE-2 | 15분 |
| 데모 시나리오 3개 테스트 | AI-2 | 20분 |
| 최종 Vercel 배포 | FE-2 | 10분 |
| 발표 자료 준비 | AI-2 | 전체 |
| 발표 리허설 | AI-2 | 10분 |

**데모 시나리오 체크리스트**:
- [ ] Scenario 1: 휠체어 사용자 음성 예약 (핵심)
- [ ] Scenario 2: 텍스트 입력 fallback
- [ ] Scenario 3: 전화 스크립트 단계별 사용

**최종 체크리스트**:
- [ ] Vercel 배포 URL 정상 동작
- [ ] 데모 3개 시나리오 100% 성공
- [ ] 스크린리더 기본 테스트 (VoiceOver)
- [ ] 키보드만으로 전체 플로우 가능

**Commit Message**: `feat: finalize for hackathon demo`

---

## Progress Tracking

| Metric | Value |
|--------|-------|
| Total Tasks | 0/35 |
| Current Phase | - |
| Status | pending |
| Last Updated | 2026-02-02 |

---

## Execution Log

| Timestamp | Phase | Task | Status | Notes |
|-----------|-------|------|--------|-------|
| - | - | - | - | - |

---

## Fallback Plan

만약 시간이 부족하면:

### 15:00 기준 판단

| 상황 | 대응 |
|------|------|
| Realtime 연동 실패 | 텍스트 기반 Chat Completion으로 전환 |
| UI 미완성 | 핵심 화면 1개(대화)만 완성 |
| 전체 플로우 불안정 | happy path 1개만 데모 |

### 최소 데모 (Emergency)

1. 텍스트 입력 → AI 응답 → 메시지 생성
2. 메시지 복사 기능만
3. "음성 기능은 개발 중" 언급

---

## Notes for Cursor Agents

해커톤 당일 Cursor Agent에게 전달할 핵심 컨텍스트:

```
프로젝트: 장애인 접근성 식당 예약 에이전트
핵심 기술: OpenAI Realtime API (WebRTC), Next.js 16, TailwindCSS v4
접근성: WCAG 2.2 AA 기준, 48x48px 버튼, 4.5:1 대비, 스크린리더 지원
플로우: 음성/텍스트 입력 → 확인 카드 → 결과(메시지/스크립트/요약)
PRD: docs/prd/PRD_accessible-reservation-agent.md
```
