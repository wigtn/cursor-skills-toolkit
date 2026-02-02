# Task Plan: Stone Garden (3D Edition)

> **Generated from**: docs/prd/PRD_stone-garden.md v2.1
> **Created**: 2026-02-02
> **Updated**: 2026-02-02
> **Status**: pending
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)
> **Digging 반영**: Critical 4개, Major 8개

## Execution Config

| Option | Value | Description |
|--------|-------|-------------|
| `auto_commit` | true | 완료 시 자동 커밋 |
| `commit_per_phase` | true | Phase별 중간 커밋 (해커톤 안전) |
| `quality_gate` | true | /auto-commit 품질 검사 |
| `parallel_agents` | true | Cursor Parallel Agents 활용 |

---

## Team Assignment (3D 전문성 반영)

| 역할 | 코드명 | 담당 영역 | Phase 집중 | 핵심 기술 |
|---|---|---|---|---|
| 프론트엔드 | **FE-1** | **3D 씬 리드**, UI | Phase 2, 4 | **R3F, Three.js** |
| 풀스택 | **FE-2** | Zustand, 게임 로직, localStorage | Phase 2, 3 | Zustand |
| AI 개발자 | **AI-1** | **3D 데코레이션** | Phase 3, 4 | **R3F geometry** |
| AI 개발자 | **AI-2** | QA, 발표 준비, 데모 시나리오 | Phase 4, 5 | - |

**사전 준비**: FE-1, AI-1은 R3F 기본 튜토리얼 필수 숙지

---

## Timeline (5시간)

```
11:00 ─────────────────────────────────────────────────────────── 16:00
  │                                                                 │
  │ P1 │    Phase 2     │    Phase 3     │   Phase 4   │    P5    │
  │15m │   1h 15m       │      1h        │     1h      │   30m    │
  │    │                │                │             │          │
  └────┴────────────────┴────────────────┴─────────────┴──────────┘
       11:15           12:30            13:30        14:30       15:00
                        │
                    점심+머지
                    (12:30-13:00)
```

---

## Phases

### Phase 1: 환경 설정 (11:00 ~ 11:15) — 15분

**담당**: FE-1 (리드) + 전원 동시 작업

| Task | 담당 | Parallel | 의존성 |
|------|------|----------|--------|
| Next.js 16 프로젝트 생성 (pnpm) | FE-1 | - | - |
| TailwindCSS v4 설정 | FE-1 | - | Task 1 |
| 폴더 구조 생성 | FE-1 | - | Task 1 |
| Zustand + Framer Motion 설치 | FE-2 | Agent 1 | Task 1 |
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

### Phase 2: 3D 씬 + 핵심 UI (11:15 ~ 12:45) — 1시간 30분 ⚠️

**담당**: FE-1 (3D 리드) + FE-2 (로직)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| **StoneScene.tsx (Canvas)** | FE-1 | Agent 1 | P0 |
| **Stone3D.tsx (3D 돌)** | FE-1 | Agent 1 | P0 |
| **Ground.tsx (모래 바닥)** | FE-1 | Agent 1 | P0 |
| **Lighting.tsx (조명)** | FE-1 | Agent 2 | P0 |
| **OrbitControls (자동 회전)** | FE-1 | Agent 2 | P0 |
| **Stone2DFallback.tsx** | FE-1 | Agent 2 | P0 |
| CoinCounter 컴포넌트 | FE-2 | Agent 3 | P0 |
| 메인 페이지 (dynamic import) | FE-2 | Agent 3 | P0 |
| 상점 모달 UI | FE-2 | Agent 3 | P0 |
| gameStore (Zustand) | FE-2 | Agent 4 | P0 |
| useCoinTimer 훅 | FE-2 | Agent 4 | P0 |
| items.ts (3D 좌표 포함) | FE-2 | Agent 4 | P0 |

**Parallel Agent 전략 (4x 병렬)**:
```
Agent 1: "src/components/Scene/ 폴더에 StoneScene.tsx, Stone3D.tsx, Ground.tsx를 만들어줘.
          React Three Fiber 사용. Canvas + OrbitControls + Environment preset='studio'
          돌은 sphereGeometry, 자동 회전, 모래 바닥은 circleGeometry"

Agent 2: "Lighting.tsx, Stone2DFallback.tsx를 만들어줘.
          조명은 ambientLight + directionalLight.
          2D 폴백은 🪨 이모지 + 데코레이션 오버레이."

Agent 3: "CoinCounter, page.tsx(dynamic import), 상점 모달을 만들어줘.
          상점은 페이지 대신 모달로 구현 (3D 씬 유지).
          WebGL 감지 후 조건부 렌더링."

Agent 4: "gameStore, useCoinTimer, items.ts를 만들어줘.
          items.ts에 position3D 좌표 포함.
          Zustand persist로 localStorage 자동 동기화."
```

**Completion Criteria**:
- [ ] **3D 돌이 자동 회전하며 표시됨**
- [ ] **WebGL 미지원 시 2D 폴백 표시**
- [ ] 코인 카운터 표시
- [ ] 상점 모달 열기/닫기 가능
- [ ] 아이템 카드 3개 표시 (이끼, 버섯, 자갈)

**Commit Message**: `feat: implement 3D scene with R3F and fallback`

---

### Phase 3: 게임 로직 + 3D 데코레이션 (12:45 ~ 13:45) — 1시간

**담당**: FE-2 (게임 로직) + AI-1 (3D 데코)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| 코인 타이머 활성화 (10초/1코인) | FE-2 | Agent 1 | P0 |
| 아이템 구매 로직 | FE-2 | Agent 1 | P0 |
| **Moss3D.tsx (이끼)** | AI-1 | Agent 2 | P0 |
| **Mushroom3D.tsx (버섯)** | AI-1 | Agent 2 | P0 |
| **Pebbles3D.tsx (자갈)** | AI-1 | Agent 2 | P0 |
| **Decorations3D.tsx (통합)** | AI-1 | Agent 2 | P0 |
| 구매 불가 피드백 (코인 부족) | FE-2 | Agent 1 | P1 |
| 이미 보유 아이템 표시 | FE-2 | Agent 1 | P1 |

**점심 + 머지 (13:00 ~ 13:30)**:
```
□ 전원 feature 브랜치 → main 머지
□ pnpm build 성공 확인 (SSR 에러 없음)
□ 3D 씬 렌더링 확인
□ 코인 자동 수집 → 상점 구매 → 3D 데코 표시 E2E 확인
□ Vercel 배포 확인
```

**3D 데코레이션 구현 가이드**:
```typescript
// Moss3D: 5-7개 작은 녹색 구체 클러스터
// Mushroom3D: 빨간 반구(갓) + 흰 원기둥(줄기)
// Pebbles3D: 3-5개 작은 회색 구체

// 모든 데코는 position3D 좌표 사용
// scale 애니메이션: 구매 시 0 → 1 (spring)
```

**Completion Criteria**:
- [ ] 10초마다 코인 +1 동작
- [ ] 상점에서 아이템 구매 가능
- [ ] **구매한 아이템이 3D로 돌에 표시됨**
- [ ] localStorage에 저장/로드 동작

**Commit Message**: `feat: implement game mechanics with 3D decorations`

---

### Phase 4: 이벤트 + 폴리싱 (13:30 ~ 14:30) — 1시간

**담당**: AI-1 (주도) + FE-1 (지원)

| Task | 담당 | 우선순위 |
|------|------|----------|
| 개미 이벤트 (AntEvent.tsx) | AI-1 | P1 |
| 2분 방치 감지 로직 | AI-1 | P1 |
| 코인 추가 애니메이션 (bounce) | FE-1 | P1 |
| 아이템 적용 애니메이션 (fade-in) | FE-1 | P1 |
| 페이지 전환 애니메이션 | FE-1 | P1 |
| 반응형 처리 (모바일) | FE-1 | P1 |
| 버그 수정 | 전원 | P0 |

**Completion Criteria**:
- [ ] 2분 방치 시 개미 애니메이션 동작 (데모용 30초)
- [ ] 코인 추가 시 bounce 효과
- [ ] 아이템 적용 시 fade-in 효과
- [ ] 모바일에서 정상 표시

**Commit Message**: `feat: add events and animations`

---

### Phase 5: 마무리 + 데모 준비 (14:30 ~ 15:00) — 30분

**담당**: 전원

| Task | 담당 | 시간 |
|------|------|------|
| 전체 플로우 테스트 | AI-2 | 10분 |
| 크리티컬 버그 수정 | FE-2 | 10분 |
| 최종 Vercel 배포 | FE-2 | 5분 |
| 데모 시나리오 3개 확인 | AI-2 | 10분 |
| 발표 리허설 | AI-2 | 5분 |

**데모 시나리오 체크리스트**:
- [ ] Scenario 1: 첫 방문 → 코인 수집 (1분)
- [ ] Scenario 2: 상점에서 이끼 구매 → 적용 확인 (1분)
- [ ] Scenario 3: 방치 → 개미 이벤트 (30초)

**최종 체크리스트**:
- [ ] Vercel 배포 URL 정상 동작
- [ ] 데모 3개 시나리오 100% 성공
- [ ] 모바일에서 정상 동작
- [ ] localStorage 저장/로드 확인

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

### 14:00 기준 판단

| 상황 | 대응 |
|------|------|
| 상점 미완성 | 하드코딩으로 아이템 1개 표시 |
| 개미 이벤트 미완성 | 제외, 핵심 기능만 데모 |
| 애니메이션 미완성 | 정적 UI로 대체 |

### 최소 데모 (Emergency)

1. 돌 화면 + 코인 자동 수집
2. 상점에서 이끼 1개 구매
3. 돌에 이끼 표시

---

## Notes for Cursor Agents

해커톤 당일 Cursor Agent에게 전달할 핵심 컨텍스트:

```
프로젝트: Stone Garden - 3D 힐링 게임
스타일: 젠 가든 (미니멀, 자연 색상, 부드러운 3D)

핵심 기술:
- Next.js 16 (App Router)
- React Three Fiber (R3F) + @react-three/drei
- TailwindCSS v4
- Zustand (상태 관리)

3D 핵심:
- Canvas + OrbitControls (자동 회전)
- sphereGeometry (돌)
- 데코레이션: Moss3D, Mushroom3D, Pebbles3D
- Environment preset: 'studio'

필수 처리:
- dynamic import (SSR 회피)
- WebGL 감지 + 2D 폴백
- 상점은 모달로 (3D 씬 유지)

게임 로직:
- 10초마다 1코인 자동 수집
- 코인으로 아이템 구매 → 3D 데코 표시
- localStorage 저장

PRD: docs/prd/PRD_stone-garden.md
Digging: docs/prd/DIGGING_stone-garden.md
```
