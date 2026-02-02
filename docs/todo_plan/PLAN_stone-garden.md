# Task Plan: Healing Terrarium (Emotional Healing Edition)

> **Generated from**: docs/prd/PRD_stone-garden.md v5.0
> **Created**: 2026-02-02
> **Updated**: 2026-02-02
> **Status**: pending
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)
> **Edition**: Emotional Healing Edition

## Core Concept

**"작은 자연 + 소유감 + AI 공감 대화 + 감정 루틴"**

핵심 감정선:
- "30초면 충분해" - 짧게 끝내도 괜찮다
- "초록이가 내 편" - 판단 없는 공감
- "내가 돌봐서 변했다" - 정령 상태 변화
- "오늘도 괜찮았다" - 1줄 일기

---

## Execution Config

| Option | Value | Description |
|--------|-------|-------------|
| `auto_commit` | true | 완료 시 자동 커밋 |
| `commit_per_phase` | true | Phase별 중간 커밋 |
| `quality_gate` | true | /auto-commit 품질 검사 |
| `parallel_agents` | true | Cursor Parallel Agents 활용 |

---

## Team Assignment

| 역할 | 코드명 | 담당 영역 | Phase 집중 | 핵심 기술 |
|---|---|---|---|---|
| 프론트엔드 | **FE-1** | **3D 씬 리드**, 아이템 | Phase 2 | **expo-three, Three.js** |
| 풀스택 | **FE-2** | Zustand, 게임 로직, 일기 시스템 | Phase 2, 4 | Zustand, AsyncStorage |
| AI 개발자 | **AI-1** | **AI 챗봇**, 스트리밍 | Phase 3 | **OpenAI API** |
| AI 개발자 | **AI-2** | 콘텐츠(프롬프트, 질문, 멘트), QA | Phase 3, 5 | 프롬프트 엔지니어링 |

**사전 준비**:
- FE-1: expo-three 기본 예제 실행
- AI-1: OpenAI 스트리밍 API 테스트
- AI-2: 프롬프트/질문/멘트 최종 검토

---

## Timeline (5시간)

```
11:00 ─────────────────────────────────────────────────────────── 16:00
  │                                                                 │
  │ P1 │    Phase 2     │    Phase 3     │   Phase 4   │    P5    │
  │20m │   1h 20m       │   1h 20m       │     1h      │   30m    │
  │    │                │                │             │          │
  └────┴────────────────┴────────────────┴─────────────┴──────────┘
       11:20           12:40            14:00        15:00       15:30
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
| Expo 프로젝트 생성 | FE-1 | - | - |
| 3D 패키지 설치 (expo-gl, expo-three, three) | FE-1 | Agent 1 | Task 1 |
| NativeWind v4 설정 | FE-1 | Agent 1 | Task 1 |
| Zustand + AsyncStorage 설치 | FE-2 | Agent 2 | Task 1 |
| OpenAI 패키지 설치 | AI-1 | Agent 2 | Task 1 |
| 환경변수 설정 (OPENAI_API_KEY) | AI-1 | Agent 3 | Task 1 |
| 폴더 구조 생성 | FE-2 | Agent 3 | Task 1 |
| Git 초기화 + GitHub push | FE-2 | - | Task 1-7 |
| EAS Build 설정 | FE-2 | - | Task 8 |

**Completion Criteria**:
- [ ] `npx expo start` 로컬 실행 확인
- [ ] Expo Go 앱에서 접속 확인
- [ ] 전원 같은 repo clone 완료

**Commit Message**: `chore: initial project setup with Expo + expo-three`

---

### Phase 2: 3D 테라리움 + 상점 (11:20 ~ 12:40) — 1시간 20분

**담당**: FE-1 (3D 리드) + FE-2 (상태/로직)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| **TerrariumScene.tsx (GLView)** | FE-1 | Agent 1 | P0 |
| **GlassJar.tsx (유리병)** | FE-1 | Agent 1 | P0 |
| **Soil.tsx (흙)** | FE-1 | Agent 1 | P0 |
| **Moss.tsx (이끼)** | FE-1 | Agent 2 | P0 |
| **Succulent.tsx (다육이)** | FE-1 | Agent 2 | P0 |
| **Mushroom.tsx (버섯)** | FE-1 | Agent 2 | P0 |
| **Pebbles.tsx (자갈)** | FE-1 | Agent 2 | P0 |
| CoinCounter 컴포넌트 | FE-2 | Agent 3 | P0 |
| 메인 화면 (app/index.tsx) | FE-2 | Agent 3 | P0 |
| ShopBottomSheet (감정 기능 표시) | FE-2 | Agent 3 | P0 |
| ItemCard (감정 기능 1줄) | FE-2 | Agent 3 | P0 |
| gameStore (Zustand) | FE-2 | Agent 4 | P0 |
| useCoinTimer 훅 | FE-2 | Agent 4 | P0 |
| items.ts (감정 기능 포함 6종) | FE-2 | Agent 4 | P0 |

**Parallel Agent 전략 (4x 병렬)**:
```
Agent 1 (FE-1): "components/Terrarium/ 폴더에 TerrariumScene.tsx, GlassJar.tsx, Soil.tsx를 만들어줘.
          expo-three + GLView 사용. 유리병은 투명 구체(MeshPhysicalMaterial), 흙은 갈색 원기둥.
          자동 회전 카메라 적용."

Agent 2 (FE-1): "components/Terrarium/items/ 폴더에 Moss.tsx, Succulent.tsx, Mushroom.tsx, Pebbles.tsx를 만들어줘.
          이끼: 초록 구체 클러스터, 다육이: 로제트 형태, 버섯: 반구+원기둥, 자갈: 회색 구체들"

Agent 3 (FE-2): "CoinCounter, 메인 화면, ShopBottomSheet, ItemCard를 만들어줘.
          @gorhom/bottom-sheet 사용. ItemCard에 '감정 기능' 1줄 표시 (예: '말을 줄이고 싶은 날')"

Agent 4 (FE-2): "stores/gameStore.ts, hooks/useCoinTimer.ts, lib/items.ts를 만들어줘.
          items.ts에 emotionalFunction 필드 포함. Zustand persist + AsyncStorage."
```

**Completion Criteria**:
- [ ] **3D 테라리움 자동 회전 표시**
- [ ] **아이템 4종 3D 렌더링 (이끼, 다육이, 버섯, 자갈)**
- [ ] 코인 카운터 표시 (10초마다 +1)
- [ ] 상점 열기/닫기 가능
- [ ] **아이템 카드에 감정 기능 표시**

**Commit Message**: `feat: implement 3D terrarium and emotional shop`

---

### Phase 3: AI 챗봇 + 정령 시스템 (12:40 ~ 14:00) — 1시간 20분

**담당**: AI-1 (챗봇) + AI-2 (콘텐츠) + FE-2 (정령 UI)

| Task | 담당 | Parallel Agent | 우선순위 |
|------|------|----------------|----------|
| **lib/openai.ts (클라이언트)** | AI-1 | Agent 1 | P0 |
| **hooks/useChat.ts (스트리밍)** | AI-1 | Agent 1 | P0 |
| **ChatBottomSheet.tsx** | AI-1 | Agent 2 | P0 |
| **ChatMessage.tsx** | AI-1 | Agent 2 | P0 |
| **ChatInput.tsx** | AI-1 | Agent 2 | P0 |
| **lib/prompts.ts (힐링 룰)** | AI-2 | Agent 3 | P0 |
| **lib/questions.ts (20개)** | AI-2 | Agent 3 | P0 |
| **lib/spiritResponses.ts (멘트 풀)** | AI-2 | Agent 3 | P0 |
| **SpiritStatus.tsx (3단계)** | FE-2 | Agent 4 | P0 |
| **SpiritGreeting.tsx** | FE-2 | Agent 4 | P0 |
| **useSpiritState.ts** | FE-2 | Agent 4 | P0 |

**Parallel Agent 전략 (4x 병렬)**:
```
Agent 1 (AI-1): "lib/openai.ts와 hooks/useChat.ts를 만들어줘.
          OpenAI GPT-4o-mini, 스트리밍 응답, max_tokens: 150, temperature: 0.8"

Agent 2 (AI-1): "components/Chat/ 폴더에 ChatBottomSheet, ChatMessage, ChatInput을 만들어줘.
          사용자 메시지 오른쪽 초록색, 정령 메시지 왼쪽 회색, 타이핑 인디케이터"

Agent 3 (AI-2): "lib/ 폴더에 prompts.ts, questions.ts, spiritResponses.ts를 만들어줘.
          PRD에 정의된 프롬프트(조언 금지, 부담 금지), 질문 20개, 상태별 인사, 구매 반응 멘트"

Agent 4 (FE-2): "components/Spirit/ 폴더에 SpiritStatus.tsx, SpiritGreeting.tsx를 만들어줘.
          상태 3단계 (고요/살짝 지침/반짝임), glow 효과, 말풍선 UI.
          hooks/useSpiritState.ts로 상태 계산 로직"
```

**점심 + 머지 (13:00 ~ 13:30)**:
```
□ 전원 feature 브랜치 → main 머지
□ Expo Go에서 빌드 확인
□ 3D 씬 + 상점 + 챗봇 통합 테스트
□ 정령 상태 표시 확인
□ AI 응답 스트리밍 확인
```

**Completion Criteria**:
- [ ] **AI 챗봇 대화 가능 (스트리밍)**
- [ ] **오늘의 질문 랜덤 표시**
- [ ] **정령 상태 3단계 UI 표시**
- [ ] **상태별 인사 멘트 동작**
- [ ] **구매 시 정령 반응 멘트**

**Commit Message**: `feat: implement AI chatbot and spirit state system`

---

### Phase 4: 감정 루틴 시스템 (14:00 ~ 15:00) — 1시간

**담당**: FE-2 (주도) + 전원 지원

| Task | 담당 | 우선순위 |
|------|------|----------|
| **EndSessionButton.tsx ("오늘은 여기까지")** | FE-2 | P0 |
| **DiaryModal.tsx (1줄 일기 입력)** | FE-2 | P0 |
| **DiarySuggestions.tsx (2개 후보)** | FE-2 | P0 |
| **useDiarySuggestions.ts** | FE-2 | P0 |
| **정령 마무리 멘트** | AI-2 | P0 |
| 아이템 구매 → 정령 반응 연결 | FE-2 | P0 |
| 정령 상태 변화 로직 완성 | FE-2 | P0 |
| 코인 추가 애니메이션 (Reanimated) | FE-1 | P1 |
| 아이템 적용 애니메이션 | FE-1 | P1 |
| 햅틱 피드백 | FE-2 | P1 |

**Completion Criteria**:
- [ ] **"오늘은 여기까지" 버튼 동작**
- [ ] **마무리 멘트 표시**
- [ ] **1줄 일기 후보 2개 표시**
- [ ] **일기 저장 후 앱 종료 플로우**
- [ ] 구매 시 정령 반응
- [ ] 코인 bounce 애니메이션 (P1)

**Commit Message**: `feat: implement emotional routine system (diary + end session)`

---

### Phase 5: 마무리 + 데모 준비 (15:00 ~ 15:30) — 30분

**담당**: 전원

| Task | 담당 | 시간 |
|------|------|------|
| 전체 플로우 테스트 | AI-2 | 10분 |
| 크리티컬 버그 수정 | FE-2 | 10분 |
| 데모 시나리오 3개 확인 | AI-2 | 10분 |
| EAS Build (Development Build) | FE-2 | 병렬 |

**데모 시나리오 체크리스트**:
- [ ] Scenario 1: 첫 만남 + 테라리움 감상 (1분)
  - 앱 실행 → 3D 로드 → 초록이 인사 → 정령 상태 (고요) → 코인 +1
- [ ] Scenario 2: 정령과 대화 (1분 30초)
  - 💬 대화 버튼 → 오늘의 질문 → "힘들었어" 입력 → 공감 응답 (조언 없이!)
- [ ] Scenario 3: 꾸미기 + 마무리 (1분)
  - 🛒 상점 → 버섯 구매 → 초록이 반응 → "오늘은 여기까지" → 1줄 일기 저장

**최종 체크리스트**:
- [ ] Expo Go에서 정상 동작
- [ ] 데모 3개 시나리오 100% 성공
- [ ] AI 응답: 조언 없음, 부담 주는 말 없음
- [ ] 정령 상태 변화 확인
- [ ] AsyncStorage 저장/로드 확인

**Commit Message**: `feat: finalize for hackathon demo`

---

## P0/P1/P2 Feature Matrix

### P0 - 해커톤 필수 (5시간 내)

| Feature | 감정적 가치 | Phase |
|---------|------------|-------|
| 3D 테라리움 + 아이템 4종 | 나만의 작은 세계 | 2 |
| AI 챗봇 (스트리밍) | 누군가 내 편 | 3 |
| 정령 상태 3단계 | "돌봐서 변했다" | 3 |
| 감정 기능 아이템 | 꾸미기 = 힐링 | 2 |
| "오늘은 여기까지" 버튼 | 부담 없음 | 4 |
| 1줄 일기 | 부담 없는 기록 | 4 |

### P1 - 시간 남으면

| Feature | Phase |
|---------|-------|
| 오늘의 질문 (대화 시작) | 3 |
| 코인/구매 애니메이션 | 4 |
| 햅틱 피드백 | 4 |
| 2D 폴백 | 2 |

### P2 - 해커톤 이후

| Feature |
|---------|
| 포토카드 공유 |
| 랜덤 미니 이벤트 (비/바람) |
| "좋은 말 보관함" |
| 시간대/계절 배경 |
| Crystal, FairyLight 아이템 |

---

## Progress Tracking

| Metric | Value |
|--------|-------|
| Total Tasks | 0/45 |
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

### 14:00 기준 판단

| 상황 | 대응 |
|------|------|
| 3D 씬 미완성 | 2D 이미지 + 이모지 오버레이 |
| AI 챗봇 미완성 | 하드코딩 인사 + 반응 멘트만 |
| 정령 상태 미완성 | 고정 "고요" 상태 |
| 일기 미완성 | 스킵, 마무리 멘트만 |

### 최소 데모 (Emergency)

1. 테라리움 화면 (2D/3D) + 코인 자동 수집
2. 버섯 1개 구매 → 정령 반응 (하드코딩)
3. 💬 대화 1회 (하드코딩 응답 OK)

---

## Notes for Cursor Agents

```
프로젝트: Healing Terrarium - 감정 루틴 힐링 앱
컨셉: "30초면 충분해" + "초록이가 내 편" + "내가 돌봐서 변했다"

핵심 기술:
- React Native + Expo (SDK 52)
- expo-three + expo-gl (3D)
- OpenAI GPT-4o-mini (스트리밍)
- NativeWind v4 (스타일링)
- Zustand + AsyncStorage (상태)

정령 "초록이" 룰:
- 조언 먼저 제시 금지
- "매일 해봐", "꾸준히" 같은 부담 주는 말 금지
- 50자 이내 짧은 응답
- 공감 + 질문 중심

감정 기능 아이템:
- 이끼: "말을 줄이고 싶은 날"
- 자갈: "정리하고 싶은 날"
- 버섯: "기운이 필요할 때"
- 다육이: "괜찮다고 확인받고 싶을 때"

PRD: docs/prd/PRD_stone-garden.md (v5.0)
```

---

## 기술 스택 요약

```json
{
  "runtime": "React Native 0.76.x + Expo SDK 52",
  "navigation": "Expo Router ~4.0.0",
  "3d": "expo-gl ~15.0.0 + expo-three ^8.0.0 + three ^0.160.0",
  "ai": "openai ^4.28.0 (GPT-4o-mini, streaming)",
  "styling": "nativewind ^4.0.0",
  "state": "zustand ^5.0.0 + @react-native-async-storage/async-storage ^2.0.0",
  "animation": "react-native-reanimated ^3.16.0",
  "ui": "@gorhom/bottom-sheet ^5.0.0"
}
```
