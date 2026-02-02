# Task Plan: AccessBook

> **Generated from**: docs/prd/PRD_accessbook.md (v3.0)
> **Created**: 2026-02-02
> **Updated**: 2026-02-02 (Digging 분석 반영)
> **Status**: Ready for Implementation
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)

---

## Key Changes from Digging Analysis

| 항목 | 변경 내용 | 우선순위 |
|------|----------|----------|
| 연락처 수집 | 필수 수집 항목으로 추가 | Critical |
| Fallback | Chat Completion 자동 전환 로직 추가 | Critical |
| 민감정보 마스킹 | 전화번호 마스킹 + 토글 UI | Critical |
| 수정 플로우 | 수정하기 → 재확인 플로우 정의 | Major |
| 에러 메시지 | 사용자 친화적 메시지 매핑 | Major |
| 복사 피드백 | 복사 성공 시 피드백 추가 | Minor |
| 프로젝트명 | AccessBook으로 통일 | Minor |

---

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
| AI 개발자 | **AI-1** | OpenAI API, WebRTC, **Fallback**, Tools | Phase 3, 4 |
| AI 개발자 | **AI-2** | 프롬프트, QA, 발표 준비 | Phase 3, 5 |
| 프론트엔드 | **FE-1** | UI/UX, 접근성, 3개 화면, **마스킹 UI** | Phase 2, 4 |
| 풀스택 | **FE-2** | API, 상태관리, **수정 플로우**, 에러처리 | Phase 1, 4 |

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

| Task | 담당 | Parallel | 완료 |
|------|------|----------|------|
| Next.js 16 프로젝트 생성 (pnpm) | FE-1 | - | ☐ |
| TailwindCSS v4 설정 | FE-1 | - | ☐ |
| 폴더 구조 생성 | FE-1 | - | ☐ |
| **Zustand store** (connectionMode, 마스킹 상태 포함) | FE-2 | Agent 1 | ☐ |
| 환경변수 설정 (.env.local) | AI-1 | Agent 2 | ☐ |
| **유틸리티 함수** (maskPhoneNumber, errorMessages) | FE-2 | Agent 1 | ☐ |
| Git 초기화 + GitHub push | FE-2 | - | ☐ |
| Vercel 첫 배포 | FE-2 | - | ☐ |
| AGENTS.md 업데이트 (AccessBook) | AI-2 | Agent 3 | ☐ |

**Completion Criteria**:
- [ ] `pnpm dev` 로컬 실행 확인
- [ ] Vercel 배포 URL 접속 확인
- [ ] 전원 같은 repo clone 완료
- [ ] `maskPhoneNumber('01012345678')` → `'010-****-5678'` 테스트 통과

**Commit Message**: `chore: initial AccessBook setup with Next.js 16`

---

### Phase 2: 핵심 UI 구현 (11:15 ~ 12:30) — 1시간 15분

**담당**: FE-1 (주도) + FE-2 (지원)

| Task | 담당 | Parallel Agent | 우선순위 | 완료 |
|------|------|----------------|----------|------|
| AccessibleButton, Card, Input | FE-1 | Agent 1 | P0 | ☐ |
| **MaskedText** (마스킹 + 토글) | FE-1 | Agent 1 | P0 | ☐ |
| **CopyButton** (복사 + 피드백) | FE-1 | Agent 1 | P0 | ☐ |
| 대화 화면 (page.tsx) | FE-1 | Agent 2 | P0 | ☐ |
| **확인 화면** (마스킹 연락처 포함) | FE-1 | Agent 3 | P0 | ☐ |
| 결과 화면 (복사 피드백 포함) | FE-1 | Agent 4 | P0 | ☐ |
| VoiceInputPanel + ConnectionStatus | FE-2 | Agent 5 | P0 | ☐ |
| QuickButtons + AccessibilityButtons | FE-2 | Agent 5 | P1 | ☐ |
| **수정 모드 UI** (EditableField) | FE-2 | Agent 6 | P1 | ☐ |
| **에러 메시지 컴포넌트** | FE-2 | Agent 6 | P1 | ☐ |

**Parallel Agent 전략 (FE-1)**:
```
# Cursor에서 worktree 모드로 4x 병렬 실행

Agent 1: "src/components/ui/에 접근성 컴포넌트를 만들어줘.
          - AccessibleButton (48x48px, ARIA)
          - MaskedText (전화번호 마스킹 + 토글 버튼)
          - CopyButton (복사 + '복사 완료!' 피드백)"

Agent 2: "src/app/page.tsx에 대화 화면을 만들어줘.
          마이크 버튼, 대화 내역, 빠른 입력 버튼, 텍스트 입력
          + 연결 상태 표시 (Realtime/Chat/텍스트)"

Agent 3: "src/app/confirm/page.tsx에 확인 화면을 만들어줘.
          예약 정보 카드, 연락처 마스킹 표시,
          '맞아요'/'수정하기' 버튼"

Agent 4: "src/app/result/page.tsx에 결과 화면을 만들어줘.
          탭 네비게이션(메시지/전화/요약),
          복사 버튼(피드백 포함), 새 예약 버튼"
```

**Completion Criteria**:
- [ ] 3개 화면 모두 접근 가능
- [ ] 모든 버튼 48x48px 이상
- [ ] 연락처 마스킹 UI 동작 (토글 포함)
- [ ] 복사 버튼 클릭 → "복사 완료!" 표시
- [ ] 수정 모드 UI 렌더링

**Commit Message**: `feat: implement AccessBook UI with accessibility and masking`

---

### Phase 3: AI 연동 (12:30 ~ 14:00) — 1시간 30분

**담당**: AI-1 (주도) + AI-2 (프롬프트) + FE-2 (연동)

| Task | 담당 | Parallel Agent | 우선순위 | 완료 |
|------|------|----------------|----------|------|
| Ephemeral Token 발급 API | AI-1 | Agent 1 | P0 | ☐ |
| WebRTC 연결 로직 | AI-1 | Agent 2 | P0 | ☐ |
| **Chat Completion Fallback API** | AI-1 | Agent 3 | **P0** | ☐ |
| **자동 Fallback 전환 로직** | AI-1 | Agent 3 | **P0** | ☐ |
| Tools Schema (연락처 필수) | AI-1 | Agent 4 | P0 | ☐ |
| System Instructions | AI-2 | Agent 5 | P0 | ☐ |
| 응답 → Zustand 연동 | FE-2 | Agent 6 | P0 | ☐ |
| **에러 코드 → 사용자 메시지 매핑** | FE-2 | Agent 6 | P1 | ☐ |

**AI-1 작업 상세**:
```typescript
// 1. app/api/realtime/session/route.ts - Ephemeral Token
// 2. lib/realtime/webrtc.ts - WebRTC 연결
// 3. app/api/chat/route.ts - Chat Completion Fallback (신규)
// 4. lib/ai/tools.ts - Function 정의 (contact_phone required)
// 5. hooks/useRealtimeConnection.ts - React Hook + Fallback 로직
```

**Fallback 구현**:
```typescript
// hooks/useRealtimeConnection.ts

const connectWithFallback = async () => {
  try {
    // 1차: Realtime API 시도
    await connectRealtime();
    setConnectionMode('realtime');
  } catch (error) {
    console.log('Realtime failed, switching to Chat Completion');
    // 2차: Chat Completion으로 전환
    setConnectionMode('chat');
    showMessage(getErrorMessage('WEBRTC_FAILED'));
  }
};
```

**점심 + 머지 (13:30 ~ 14:00)**:
```
□ 전원 feature 브랜치 → main 머지
□ pnpm build 성공 확인
□ 마이크 → AI 응답 → 화면 표시 E2E 확인
□ Fallback 동작 확인 (네트워크 차단 테스트)
□ Vercel 배포 확인
```

**Completion Criteria**:
- [ ] 마이크 버튼 → WebRTC 연결 성공
- [ ] 음성 입력 → AI 응답 (음성)
- [ ] **연락처 없이는 결과 생성 불가** 확인
- [ ] **WebRTC 실패 시 3초 내 Chat 전환**
- [ ] 에러 시 사용자 친화적 메시지 표시

**Commit Message**: `feat: integrate OpenAI Realtime API with Chat Completion fallback`

---

### Phase 4: 결과 생성 + 통합 (14:00 ~ 15:00) — 1시간

**담당**: 전원 교차 통합

| Task | 담당 | 우선순위 | 완료 |
|------|------|----------|------|
| 확인 카드에 Zustand 데이터 연동 | FE-1 | P0 | ☐ |
| **마스킹 토글 기능** 연동 | FE-2 | P0 | ☐ |
| **수정 → 재확인 플로우** 연동 | FE-2 | P0 | ☐ |
| compose_message Function 결과 처리 | AI-1 | P0 | ☐ |
| compose_call_script Function 결과 처리 | AI-1 | P0 | ☐ |
| 전화 스크립트 단계별 이동 | FE-2 | P0 | ☐ |
| **복사 성공 피드백** 연동 | FE-1 | P1 | ☐ |
| 캘린더 URL 생성 API | AI-1 | P1 | ☐ |
| 전체 플로우 E2E 테스트 | AI-2 | P0 | ☐ |

**통합 조 편성**:
- **조 A (AI ↔ State)**: AI-1 + FE-2 — Function 응답 → Zustand → UI 연결
- **조 B (UI ↔ UX)**: FE-1 + AI-2 — 마스킹/복사 피드백 + 데모 시나리오 테스트

**Completion Criteria**:
- [ ] 음성 입력 → 확인 카드 → 결과 화면 전체 플로우
- [ ] **연락처 마스킹 표시 + 토글 동작**
- [ ] **수정 → 재확인 → 결과 플로우 동작**
- [ ] 메시지 복사 버튼 → "복사 완료!" 피드백
- [ ] 전화 스크립트 다음/이전 버튼 동작
- [ ] 새 예약 버튼으로 초기화

**Commit Message**: `feat: complete AccessBook flow with edit and masking features`

---

### Phase 5: 마무리 + 데모 준비 (15:00 ~ 16:00) — 1시간

**담당**: 전원

| Task | 담당 | 시간 | 완료 |
|------|------|------|------|
| 접근성 최종 점검 | FE-1 | 15분 | ☐ |
| 에러 핸들링 강화 | FE-2 | 15분 | ☐ |
| 데모 시나리오 3개 테스트 | AI-2 | 20분 | ☐ |
| 최종 Vercel 배포 | FE-2 | 10분 | ☐ |
| 발표 자료 준비 | AI-2 | 전체 | ☐ |
| 발표 리허설 (3분 30초) | AI-2 | 10분 | ☐ |

**데모 시나리오 체크리스트**:
- [ ] **Scenario 1**: 휠체어 사용자 음성 예약 (연락처 수집 포함)
- [ ] **Scenario 2**: Realtime 실패 → Fallback 자동 전환
- [ ] **Scenario 3**: 수정하기 → 재확인 플로우

**최종 체크리스트**:
- [ ] Vercel 배포 URL 정상 동작
- [ ] 데모 3개 시나리오 100% 성공
- [ ] **연락처 마스킹 정상 표시**
- [ ] **Fallback 3초 내 전환**
- [ ] 스크린리더 기본 테스트 (VoiceOver)
- [ ] 키보드만으로 전체 플로우 가능

**Commit Message**: `feat: finalize AccessBook for hackathon demo`

---

## Progress Tracking

| Metric | Value |
|--------|-------|
| Total Tasks | 0/42 |
| Current Phase | - |
| Status | Ready |
| Last Updated | 2026-02-02 |

---

## Execution Log

| Timestamp | Phase | Task | Status | Notes |
|-----------|-------|------|--------|-------|
| - | - | - | - | - |

---

## Fallback Plan

### 15:00 기준 판단

| 상황 | 대응 |
|------|------|
| Realtime 연동 실패 | Chat Completion 기반으로 전체 플로우 구현 |
| UI 미완성 | 대화 화면 + 결과 화면만 완성 (확인 화면 스킵) |
| 전체 플로우 불안정 | happy path 1개만 데모 |
| 마스킹 미구현 | 연락처 전체 표시로 대체 |

### 최소 데모 (Emergency)

1. 텍스트 입력 → AI 응답 → 메시지 생성 (연락처 포함)
2. 메시지 복사 기능
3. "음성 기능은 개발 중, 접근성 요구사항 정리가 핵심" 강조

---

## Notes for Cursor Agents

해커톤 당일 Cursor Agent에게 전달할 핵심 컨텍스트:

```
프로젝트: AccessBook - 장애인 접근성 식당 예약 에이전트
핵심 기술: OpenAI Realtime API (WebRTC) + Chat Completion Fallback
접근성: WCAG 2.2 AA 기준, 48x48px 버튼, 4.5:1 대비, 스크린리더 지원
필수 수집: 날짜, 시간, 인원, 연락처(마스킹 표시)
플로우: 음성/텍스트 입력 → 확인 카드(마스킹) → 결과(메시지/스크립트/요약)
Fallback: WebRTC 3초 실패 시 Chat Completion 자동 전환
PRD: docs/prd/PRD_accessbook.md (v3.0)
```

---

## Digging Analysis Summary

Critical 이슈 4개가 모두 PRD v3.0에 반영되었습니다:

| Issue | Status |
|-------|--------|
| C-1. 연락처 수집 누락 | ✅ 필수 항목으로 추가 |
| C-2. Fallback 미구현 | ✅ Chat Completion 자동 전환 추가 |
| C-3. 민감정보 마스킹 | ✅ 마스킹 + 토글 UI 추가 |
| C-4. 택시 범위 | ✅ MVP에서 제외, 향후 계획으로 명시 |

**구현 준비 완료!** `/implement accessbook` 으로 시작하세요.
