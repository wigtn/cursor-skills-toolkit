# Task Plan: Healing Terrarium (3D Mobile + AI Chatbot)

> **Generated from**: docs/prd/PRD_stone-garden.md v4.0
> **Created**: 2026-02-02
> **Updated**: 2026-02-02
> **Status**: pending
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)
> **Edition**: 3D Mobile + AI Chatbot Edition

## Execution Config

| Option | Value | Description |
|--------|-------|-------------|
| `auto_commit` | true | 완료 시 자동 커밋 |
| `commit_per_phase` | true | Phase별 중간 커밋 (해커톤 안전) |
| `quality_gate` | true | /auto-commit 품질 검사 |
| `parallel_agents` | true | Cursor Parallel Agents 활용 |

---

## Team Assignment (모바일 + AI 전문성 반영)

| 역할 | 코드명 | 담당 영역 | Phase 집중 | 핵심 기술 |
|---|---|---|---|---|
| 프론트엔드 | **FE-1** | **3D 씬 리드**, 모바일 UI | Phase 2, 4 | **expo-three, Three.js** |
| 풀스택 | **FE-2** | Zustand, 게임 로직, AsyncStorage | Phase 2, 3 | Zustand, Expo Router |
| AI 개발자 | **AI-1** | **AI 챗봇**, OpenAI 연동 | Phase 3, 4 | **OpenAI API, Streaming** |
| AI 개발자 | **AI-2** | QA, 발표 준비, 데모 시나리오 | Phase 4, 5 | - |

**사전 준비**:
- FE-1: expo-three 기본 튜토리얼 숙지
- AI-1: OpenAI Chat Completions API 숙지

---

## Timeline (5시간)

```
11:00 ─────────────────────────────────────────────────────────── 16:00
  │                                                                 │
  │ P1 │    Phase 2     │    Phase 3     │   Phase 4   │    P5    │
  │20m │   1h 20m       │   1h 20m       │     1h      │   1h     │
  │    │                │                │             │          │
  └────┴────────────────┴────────────────┴─────────────┴──────────┘
       11:20           12:40            14:00        15:00       16:00
                        │
                    점심+머지
                    (13:00-13:30)
```

---

## Phases

### Phase 1: 환경 설정 (11:00 ~ 11:20) — 20분

**담당**: FE-1 (리드) + 전원 동시 작업

| Task | 담당 | Parallel | 의존성 |
|------|------|----------|--------|
| Expo 프로젝트 생성 (npx create-expo-app) | FE-1 | - | - |
| NativeWind v4 설정 | FE-1 | - | Task 1 |
| 폴더 구조 생성 | FE-1 | - | Task 1 |
| 3D 패키지 설치 (expo-gl, expo-three, three) | FE-1 | Agent 1 | Task 1 |
| Zustand + AsyncStorage 설치 | FE-2 | Agent 2 | Task 1 |
| 환경변수 설정 (OPENAI_API_KEY) | AI-1 | Agent 3 | Task 1 |
| Git 초기화 + GitHub push | FE-2 | - | Task 1-6 |
| EAS Build 설정 (eas.json) | FE-2 | - | Task 7 |
| AGENTS.md 당일 확정 사항 반영 | AI-2 | Agent 4 | - |

**Completion Criteria**:
- [ ] `npx expo start` 로컬 실행 확인
- [ ] Expo Go 앱에서 접속 확인
- [ ] 전원 같은 repo clone 완료

**Commit Message**: `chore: initial project setup with Expo + expo-three`

---

### Phase 2: 3D 테라리움 씬 + 핵심 UI (11:20 ~ 12:40) — 1시간 20분 ⚠️

**담당**: FE-1 (3D 리드) + FE-2 (상태/로직)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| **TerrariumScene.tsx (GLView)** | FE-1 | Agent 1 | P0 |
| **GlassJar3D.tsx (유리병)** | FE-1 | Agent 1 | P0 |
| **Soil3D.tsx (흙)** | FE-1 | Agent 1 | P0 |
| **Lighting.tsx (조명)** | FE-1 | Agent 2 | P0 |
| **CameraController (자동 회전)** | FE-1 | Agent 2 | P0 |
| **Terrarium2DFallback.tsx** | FE-1 | Agent 2 | P0 |
| CoinCounter 컴포넌트 | FE-2 | Agent 3 | P0 |
| 메인 화면 (app/index.tsx) | FE-2 | Agent 3 | P0 |
| 상점 Bottom Sheet | FE-2 | Agent 3 | P0 |
| gameStore (Zustand + AsyncStorage) | FE-2 | Agent 4 | P0 |
| useCoinTimer 훅 | FE-2 | Agent 4 | P0 |
| items.ts (3D 좌표 포함) | FE-2 | Agent 4 | P0 |

**Parallel Agent 전략 (4x 병렬)**:
```
Agent 1: "src/components/Scene/ 폴더에 TerrariumScene.tsx, GlassJar3D.tsx, Soil3D.tsx를 만들어줘.
          expo-three + GLView 사용. 유리병은 반투명 실린더, 흙은 갈색 원기둥.
          자동 회전 카메라 적용."

Agent 2: "Lighting.tsx, Terrarium2DFallback.tsx를 만들어줘.
          조명은 ambientLight + pointLight.
          2D 폴백은 🫙 이모지 + 식물 이모지 오버레이."

Agent 3: "CoinCounter, app/index.tsx, 상점 Bottom Sheet를 만들어줘.
          @gorhom/bottom-sheet 사용.
          NativeWind로 스타일링."

Agent 4: "gameStore, useCoinTimer, items.ts를 만들어줘.
          items.ts에 position3D 좌표 포함.
          Zustand persist + AsyncStorage로 저장."
```

**Completion Criteria**:
- [ ] **3D 테라리움이 자동 회전하며 표시됨**
- [ ] **GL 미지원 시 2D 폴백 표시**
- [ ] 코인 카운터 표시
- [ ] 상점 Bottom Sheet 열기/닫기 가능
- [ ] 아이템 카드 3개 표시 (이끼, 버섯, 자갈)

**Commit Message**: `feat: implement 3D terrarium scene with expo-three`

---

### Phase 3: AI 챗봇 + 게임 로직 (12:40 ~ 14:00) — 1시간 20분

**담당**: AI-1 (챗봇) + FE-2 (게임 로직)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| **lib/openai/client.ts** | AI-1 | Agent 1 | P0 |
| **lib/openai/config.ts (시스템 프롬프트)** | AI-1 | Agent 1 | P0 |
| **hooks/useChat.ts (스트리밍)** | AI-1 | Agent 2 | P0 |
| **ChatBottomSheet.tsx** | AI-1 | Agent 2 | P0 |
| **ChatBubble.tsx** | AI-1 | Agent 2 | P0 |
| chatStore (Zustand) | AI-1 | Agent 2 | P0 |
| 코인 타이머 활성화 (10초/1코인) | FE-2 | Agent 3 | P0 |
| 아이템 구매 로직 | FE-2 | Agent 3 | P0 |
| **Moss3D.tsx (이끼)** | FE-1 | Agent 4 | P0 |
| **Mushroom3D.tsx (버섯)** | FE-1 | Agent 4 | P0 |
| **Pebbles3D.tsx (자갈)** | FE-1 | Agent 4 | P0 |

**AI 챗봇 시스템 프롬프트**:
```typescript
// 초록이 - 테라리움 정령
const TERRARIUM_SPIRIT_PROMPT = `
당신은 테라리움 속에 사는 작은 정령 "초록이"입니다.
성격: 따뜻하고 공감 능력이 뛰어남, 긍정적
대화 스타일: 짧은 문장 (2-3문장), 질문으로 대화 이어가기
역할: 힐링 대화, 감정 공감, 격려
`;
```

**점심 + 머지 (13:00 ~ 13:30)**:
```
□ 전원 feature 브랜치 → main 머지
□ Expo Go에서 빌드 확인
□ 3D 씬 렌더링 확인
□ 코인 수집 → 상점 구매 → 3D 데코 표시 E2E 확인
□ AI 챗봇 대화 테스트
```

**Completion Criteria**:
- [ ] 10초마다 코인 +1 동작
- [ ] 상점에서 아이템 구매 가능
- [ ] **구매한 아이템이 3D로 테라리움에 표시됨**
- [ ] **AI 챗봇과 대화 가능 (스트리밍)**
- [ ] AsyncStorage에 저장/로드 동작

**Commit Message**: `feat: implement AI chatbot and game mechanics`

---

### Phase 4: 폴리싱 + 통합 (14:00 ~ 15:00) — 1시간

**담당**: 전원

| Task | 담당 | 우선순위 |
|------|------|----------|
| 채팅 → 데코 연동 (특정 키워드 시 반응) | AI-1 | P1 |
| 코인 추가 애니메이션 (Reanimated) | FE-1 | P1 |
| 아이템 적용 애니메이션 (scale spring) | FE-1 | P1 |
| 햅틱 피드백 추가 | FE-2 | P1 |
| 화면 전환 애니메이션 | FE-1 | P1 |
| 다크 모드 지원 | FE-2 | P2 |
| 버그 수정 | 전원 | P0 |

**통합 조 편성**:
- **조 A (AI ↔ 3D)**: AI-1 + FE-1 — 챗봇 반응 → 3D 이벤트 연결
- **조 B (UX ↔ 테스트)**: FE-2 + AI-2 — 전체 플로우 테스트 + 햅틱

**Completion Criteria**:
- [ ] 코인 추가 시 bounce 효과
- [ ] 아이템 적용 시 scale 애니메이션
- [ ] 초록이와 대화 시 테라리움 반응 (P2)
- [ ] 모바일에서 부드러운 60fps

**Commit Message**: `feat: add animations and polish`

---

### Phase 5: 마무리 + 데모 준비 (15:00 ~ 16:00) — 1시간

**담당**: 전원

| Task | 담당 | 시간 |
|------|------|------|
| 전체 플로우 테스트 | AI-2 | 15분 |
| 크리티컬 버그 수정 | FE-2 | 15분 |
| EAS Build (Development Build) | FE-2 | 10분 |
| 데모 시나리오 3개 확인 | AI-2 | 15분 |
| 발표 리허설 | AI-2 | 5분 |

**데모 시나리오 체크리스트**:
- [ ] Scenario 1: 첫 방문 → 테라리움 감상 → 코인 수집 (1분)
- [ ] Scenario 2: 상점에서 이끼 구매 → 3D 적용 확인 (1분)
- [ ] Scenario 3: 초록이와 힐링 대화 (1분)

**최종 체크리스트**:
- [ ] Expo Go에서 정상 동작
- [ ] 데모 3개 시나리오 100% 성공
- [ ] AI 챗봇 응답 속도 정상
- [ ] AsyncStorage 저장/로드 확인

**Commit Message**: `feat: finalize for hackathon demo`

---

## Progress Tracking

| Metric | Value |
|--------|-------|
| Total Tasks | 0/40 |
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
| 3D 씬 미완성 | 2D 이모지 버전으로 대체 |
| AI 챗봇 미완성 | 하드코딩 응답으로 대체 |
| 애니메이션 미완성 | 정적 UI로 대체 |

### 최소 데모 (Emergency)

1. 테라리움 화면 (2D/3D) + 코인 자동 수집
2. 상점에서 이끼 1개 구매
3. AI 챗봇 1회 대화 (하드코딩 OK)

---

## Notes for Cursor Agents

해커톤 당일 Cursor Agent에게 전달할 핵심 컨텍스트:

```
프로젝트: Healing Terrarium - 3D 힐링 모바일 앱
컨셉: 테라리움 속 정령 "초록이"와 힐링 대화

핵심 기술:
- React Native + Expo (SDK 52)
- expo-three + expo-gl (3D 렌더링)
- OpenAI GPT-4o-mini (AI 챗봇)
- NativeWind v4 (스타일링)
- Zustand + AsyncStorage (상태 관리)

3D 핵심:
- GLView + expo-three
- 유리병(cylinder) + 흙(cylinder) + 데코레이션
- 자동 회전 카메라

AI 챗봇:
- 초록이 캐릭터 (테라리움 정령)
- 스트리밍 응답
- 힐링/공감 대화

게임 로직:
- 10초마다 1코인 자동 수집
- 코인으로 아이템 구매 → 3D 데코 표시
- AsyncStorage 저장

PRD: docs/prd/PRD_stone-garden.md (v4.0)
```

---

## 기술 스택 요약

```json
{
  "runtime": "React Native 0.76.x + Expo SDK 52",
  "navigation": "Expo Router ~4.0.0",
  "3d": "expo-gl ~15.0.0 + expo-three ^8.0.0 + three ^0.160.0",
  "ai": "openai ^4.28.0 (GPT-4o-mini)",
  "styling": "nativewind ^4.0.0",
  "state": "zustand ^5.0.0 + @react-native-async-storage/async-storage ^2.0.0",
  "animation": "react-native-reanimated ^3.16.0",
  "ui": "@gorhom/bottom-sheet ^5.0.0"
}
```
