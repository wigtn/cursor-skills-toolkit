# Task Plan: Stone Buddy (Healing Game Edition)

> **Generated from**: docs/prd/PRD_stone-garden.md v6.0
> **Created**: 2026-02-02
> **Updated**: 2026-02-05
> **Status**: pending
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (FE-1, FE-2, AI-1, AI-2)
> **Edition**: Healing Game — 돌 키우기 + 로봇 집사 + 코인 경제 + 음성 편지

## Core Concept

**"로봇 집사에게 채팅으로 명령 → 돌돌이를 돌보고 → 코인으로 테라리움 꾸미기 → 돌에게 말 걸면 편지가 오는 힐링 게임"**

핵심 게임 루프:
- **명령**: 채팅으로 또봇에게 10가지 워크플로우 요청
- **경제**: 1분/1코인 적립 → 상점에서 아이템 구매
- **적용**: 구매한 아이템을 또봇에게 "~해줘" 요청
- **편지**: 돌돌이에게 말 걸기 → 시간 후 우편함에 편지 도착

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

| 역할 | 담당 영역 | Phase 집중 | 핵심 기술 |
|------|-----------|-----------|-----------|
| **FE-1** | Expo WebView, 채팅 입력, 녹음/STT | Phase 2 | Expo, react-native-webview |
| **FE-2** | 3D 씬 (Robot, Stone, Background, Mailbox, Items) | Phase 2 | R3F, drei, Three.js |
| **AI-1** | 또봇 AI 명령 해석, 편지 LLM 생성, 상태 관리 | Phase 3 | OpenAI API, Zustand |
| **AI-2** | 타입 확정, 상점 UI, 코인 시스템, 문서/QA | Phase 3 | TypeScript, 프롬프트 |

---

## Timeline (6시간)

```
0:00 ─────────────────────────────────────────────────────────── 6:00
  │                                                                │
  │ P1 │      Phase 2       │      Phase 3       │  P4   │   P5  │
  │20m │     1h 40m          │     1h 30m          │  1h   │  30m  │
  │    │                     │                     │       │       │
  └────┴─────────────────────┴─────────────────────┴───────┴───────┘
       0:20                 2:00                  3:30   4:30    5:00
                             │                                  5:30~6:00 시연
                        통합 체크포인트
```

---

## Phases

### Phase 1: 환경 설정 (0:00 ~ 0:20) — 20분

**담당**: 전원 동시 작업

| Task | 담당 | 의존성 |
|------|------|--------|
| Expo 프로젝트 생성 (`app/`) | FE-1 | - |
| Vite + R3F 프로젝트 생성 (`web/`) | FE-2 | - |
| R3F 패키지 설치 (three, @react-three/fiber, @react-three/drei) | FE-2 | Task 2 |
| Zustand + AsyncStorage 설치 | AI-1 | Task 2 |
| OpenAI 패키지 설정 + .env | AI-1 | Task 1 |
| shared/ 타입 최종 확인 | AI-2 | - |
| GLB 모델 다운로드 + 배치 | FE-2 | Task 2 |
| Git 브랜치 생성 + 초기 커밋 | AI-2 | All |

**Completion Criteria**:
- [ ] `cd web && npm run dev` → http://localhost:5173 정상
- [ ] `cd app && npx expo start` → 시뮬레이터 정상
- [ ] GLB 파일 존재 확인 (`web/public/models/RobotExpressive.glb`)
- [ ] 전원 같은 repo clone 완료

**Commit**: `chore: initial project setup with Expo + Vite R3F`

---

### Phase 2: 3D 씬 + Expo 앱 (0:20 ~ 2:00) — 1시간 40분

**담당**: FE-1 (Expo 앱) + FE-2 (3D 씬) 병렬 작업

#### FE-1 Tasks (Expo 네이티브)

| Task | 우선순위 |
|------|----------|
| WebView 기본 설정 (전체 화면, 5173 연결) | P0 |
| 채팅 입력 UI (TextInput + 전송 버튼) | P0 |
| TEXT_INPUT 메시지 전송 로직 | P0 |
| 녹음 버튼 UI (탭하여 녹음) | P0 |
| expo-audio 녹음 로직 | P0 |
| Whisper STT API 연동 | P0 |
| VOICE_RESULT 메시지 전송 | P0 |
| 코인 카운터 표시 (네이티브 상단) | P1 |

#### FE-2 Tasks (3D 웹 씬)

| Task | 우선순위 |
|------|----------|
| Scene.tsx (전체 씬 조합) | P0 |
| Robot.tsx (또봇 GLB + 13 애니메이션) | P0 |
| Stone.tsx (돌돌이 + 5가지 감정 표현) | P0 |
| Background.tsx (테라리움 배경) | P0 |
| Mailbox.tsx (우편함 오브젝트) | P0 |
| EmotionBubble.tsx (감정 말풍선) | P1 |
| 환경 아이템 컴포넌트 (Moss, Flower 등) | P1 |
| 카메라 + 조명 설정 | P0 |

**2:00 통합 체크포인트**:
- [ ] WebView에 3D 씬 렌더링 확인
- [ ] 로봇(또봇) 애니메이션 동작 확인
- [ ] 돌돌이 감정별 표현 확인
- [ ] 채팅 입력 → WebView 전달 확인
- [ ] 녹음 → STT 변환 확인

**Commit**: `feat: 3D terrarium scene + Expo WebView + chat input`

---

### Phase 3: AI + 게임 로직 (2:00 ~ 3:30) — 1시간 30분

**담당**: AI-1 (AI 연동) + AI-2 (상점/코인) 병렬 작업

#### AI-1 Tasks (AI/상태 관리)

| Task | 우선순위 |
|------|----------|
| lib/openai.ts (API 클라이언트) | P0 |
| 또봇 명령 해석 로직 (GPT-4o-mini JSON 응답) | P0 |
| 10개 워크플로우 매핑 (action → animation) | P0 |
| web/src/App.tsx 메시지 수신 + 처리 | P0 |
| 돌돌이 편지 생성 로직 (LLM) | P0 |
| 편지 대기 → 도착 타이머 (데모 10초) | P0 |
| Zustand gameStore (코인, 인벤토리, 감정, 편지) | P0 |
| ROBOT_RESPONSE / STONE_EMOTION_CHANGED 전송 | P0 |
| LETTER_READY 메시지 전송 | P0 |

#### AI-2 Tasks (상점/코인/타입)

| Task | 우선순위 |
|------|----------|
| 코인 자동 적립 훅 (useCoinTimer) | P0 |
| 상점 UI (BottomSheet or 모달) | P0 |
| 아이템 카드 컴포넌트 (가격, 구매 버튼) | P0 |
| 구매 로직 (코인 차감 → 인벤토리 추가) | P0 |
| 인벤토리 UI (보유 아이템 목록) | P0 |
| 우편함 UI (편지 목록, 읽기) | P1 |
| AsyncStorage 저장/로드 | P0 |

**Completion Criteria**:
- [ ] 채팅 입력 → 또봇 AI 응답 (JSON) → 애니메이션 동작
- [ ] 10개 워크플로우 중 5개+ 동작
- [ ] 코인 자동 적립 (1분/1코인)
- [ ] 상점 열기 → 아이템 구매 가능
- [ ] 구매 후 "~해줘" 요청 → 적용
- [ ] 음성 → 편지 대기 → 도착

**Commit**: `feat: robot AI + coin economy + letter system`

---

### Phase 4: 통합 + 감정 시스템 (3:30 ~ 4:30) — 1시간

**담당**: 전원

| Task | 담당 | 우선순위 |
|------|------|----------|
| 전체 플로우 통합 테스트 | 전원 | P0 |
| 감정 변화 → 3D 표현 연결 | FE-2 | P0 |
| 워크플로우 → 감정 변화 연결 | AI-1 | P0 |
| 편지 도착 → 우편함 알림 | AI-1 | P0 |
| 에러 폴백 확인 (API 실패, 3D 실패) | 전원 | P0 |
| 아이템 장착 시각화 (모자 등) | FE-2 | P1 |
| 코인 적립 애니메이션 | FE-2 | P1 |
| 햅틱 피드백 | FE-1 | P1 |

**Completion Criteria**:
- [ ] 명령→수행→감정변화 전체 사이클 동작
- [ ] 편지 시스템 전체 플로우 동작
- [ ] 구매→적용 전체 플로우 동작
- [ ] 에러 시 앱 크래시 없음

**Commit**: `feat: integrate emotion system + letter delivery`

---

### Phase 5: 폴리싱 + 데모 준비 (4:30 ~ 5:00) — 30분

**담당**: 전원

| Task | 담당 | 시간 |
|------|------|------|
| 전체 플로우 최종 테스트 | AI-2 | 10분 |
| 크리티컬 버그 수정 | FE-2 | 10분 |
| 데모 3개 시나리오 리허설 | 전원 | 10분 |

**데모 시나리오 체크리스트**:
- [ ] Scenario 1: 첫 만남 + 명령 (1분 30초)
  - 앱 실행 → 3D 로드 → 또봇 인사 → "돌돌이 닦아줘" → 또봇 수행 → 돌돌이 happy
- [ ] Scenario 2: 상점 + 꾸미기 (1분)
  - 코인 확인 → 상점 → "작은 꽃" 구매 → "꽃 심어줘" → 또봇 수행 → 돌돌이 excited
- [ ] Scenario 3: 음성 편지 (1분)
  - 🎤 → "돌돌이야 오늘 좀 힘들었어" → 돌돌이 반응 → (10초) → 편지 도착 → 읽기

**5:30~6:00 시연**:
- [ ] 빌드 + 발표 준비
- [ ] 앱 크래시 없음
- [ ] 모든 폴백 정상 동작

**Commit**: `feat: finalize for hackathon demo`

---

## P0/P1/P2 Feature Matrix

### P0 - 해커톤 필수

| Feature | 감정적 가치 | Phase |
|---------|------------|-------|
| 3D 테라리움 씬 (또봇 + 돌돌이 + 배경) | 나만의 세계 | 2 |
| 채팅 인터페이스 (텍스트 입력) | 명령의 재미 | 2 |
| 10개 워크플로우 (AI 명령 해석) | 다양한 상호작용 | 3 |
| 코인 자동 적립 + 상점 | 기다림의 즐거움 | 3 |
| 아이템 구매 → 적용 루프 | 꾸미기 재미 | 3 |
| 돌돌이 5가지 감정 | 돌봄의 보람 | 2,4 |
| 음성 입력 (Whisper STT) | 음성 소통 | 2 |
| 편지 시스템 (LLM 생성) | 느린 소통의 따뜻함 | 3 |

### P1 - 시간 남으면

| Feature | Phase |
|---------|-------|
| 아이템 착용 시각화 (모자/안경) | 4 |
| 우편함 인터랙션 UI | 4 |
| 감정 파티클 효과 | 4 |
| 코인 적립 애니메이션 | 4 |
| 햅틱 피드백 | 4 |

### P2 - 해커톤 이후

| Feature |
|---------|
| 멀티플레이어 |
| 배경음악/사운드 효과 |
| 클라우드 저장 |
| 시간대/계절 배경 변화 |
| 랜덤 미니 이벤트 (비/바람) |

---

## Progress Tracking

| Metric | Value |
|--------|-------|
| Total Tasks | 0/42 |
| Current Phase | - |
| Status | pending |
| Last Updated | 2026-02-05 |

---

## Execution Log

| Timestamp | Phase | Task | Status | Notes |
|-----------|-------|------|--------|-------|
| - | - | - | - | - |

---

## Fallback Plan

### 3:30 기준 판단

| 상황 | 대응 |
|------|------|
| 3D 씬 미완성 | 2D 이미지 + 이모지 오버레이 |
| AI 명령 해석 미완성 | 하드코딩 5개 워크플로우 (키워드 매칭) |
| 편지 생성 미완성 | LETTER_FALLBACK_RESPONSES 사용 |
| 코인/상점 미완성 | 초기 코인 100개 + 구매 하드코딩 |
| 워크플로우 10개 미완성 | 최소 5개로 데모 |

### 최소 데모 (Emergency)

1. 테라리움 화면 (2D/3D) + 돌돌이 + 또봇
2. "닦아줘" 입력 → 또봇 Walking → 돌돌이 happy
3. 🎤 → 편지 도착 (폴백)

---

## Notes for Cursor Agents

```
프로젝트: Stone Buddy - 힐링 게임 (테라리움 돌 키우기)
컨셉: 로봇에게 명령 + 코인 경제 + 음성 편지

핵심 기술:
- Expo SDK 54 + react-native-webview (하이브리드)
- Vite 7 + React 19 + @react-three/fiber 9 (3D 씬)
- OpenAI GPT-4o-mini (명령 해석, 편지) + Whisper (STT)
- Zustand + AsyncStorage (게임 상태)

10개 워크플로우:
1. 돌 닦기 (clean) 2. 잡초 뽑기 (weed)
3. 물주기 (water) 4. 꽃 심기 (plant_flower)
5. 바닥 쓸기 (sweep) 6. 상태 확인 (check_status)
7. 꾸미기 (decorate) 8. 아이템 장착 (equip_item)
9. 춤추기 (dance) 10. 인사하기 (wave)

코인: 1분/1코인, 아이템 13종 (환경 6 + 도구 2 + 장식 5)
편지: 음성→대기(10초)→우편함 도착, LLM 생성
감정: calm/happy/sad/excited/sleepy

PRD: docs/prd/PRD_stone-garden.md (v6.0)
```

---

## 기술 스택 요약

```json
{
  "app": "Expo SDK 54 + react-native-webview + expo-audio",
  "web": "Vite 7 + React 19 + @react-three/fiber 9 + @react-three/drei 10",
  "ai": "OpenAI GPT-4o-mini (chat/letter) + Whisper (STT)",
  "state": "zustand + @react-native-async-storage/async-storage",
  "type": "TypeScript strict mode"
}
```
