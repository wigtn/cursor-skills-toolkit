# Stone Buddy PRD

> **Version**: 6.0 (Healing Game Edition)
> **Created**: 2026-02-02
> **Updated**: 2026-02-05
> **Status**: Ready for Implementation
> **Core Concept**: 테라리움 돌 키우기 + 로봇 집사 + 음성 편지 + 코인 경제
> **Platform**: iOS/Android 하이브리드 앱 (Expo + WebView + Vite R3F)
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (FE-1, FE-2, AI-1, AI-2)
> **Goal**: Cursor AI로 게임을 구현하는 해커톤 Prototype

---

## 1. Overview

### 1.1 한 줄 정의

**"로봇 집사에게 채팅으로 명령하여 내 돌을 돌보고, 코인으로 테라리움을 꾸미며, 돌에게 말을 걸면 우편함에 편지로 답장이 오는 힐링 게임"**

### 1.2 핵심 차별점

| 영역 | 기능 | 감정적 가치 |
|------|------|------------|
| **돌 키우기** | 돌은 가만히 있지만, 관리해줄수록 감정이 변함 | 소유감 + 돌봄의 보람 |
| **로봇 집사** | 채팅으로 명령 → 로봇이 직접 수행 (10가지 워크플로우) | "내 말을 들어주는 존재" |
| **코인 경제** | 1분에 1코인 자동 적립, 꾸미기 아이템 구매 | 기다림의 즐거움 |
| **음성 편지** | 돌에게 말 걸기 → 시간 후 우편함에 편지 도착 | 느린 소통의 따뜻함 |
| **해커톤 목표** | Cursor AI로 '게임'을 구현하는 특이점 | 다른 팀과의 차별화 |

### 1.3 Problem Statement

해커톤에서 대부분의 팀이 SaaS, 대시보드, 챗봇을 만든다. 우리는 **Cursor AI로 힐링 게임을 프로토타입** 함으로써 AI 코딩의 가능성을 보여준다.

게임 자체의 감정적 가치:
- 돌은 아무것도 안 하지만, 그래서 오히려 편안하다
- 로봇이 대신 일해주니까 "시키는 재미"가 있다
- 코인이 쌓이길 기다리며 뭘 살지 고민하는 소소한 즐거움
- 돌에게 말 걸면 나중에 편지가 온다 — 느리지만 따뜻한 소통

### 1.4 Goals

| 목표 | 설명 | 핵심 지표 |
|------|------|----------|
| **프로토타입 완성** | 6시간 내 데모 가능 | 3개 시나리오 성공 |
| **게임 루프** | 명령→수행→결과 확인 사이클 | 10개 워크플로우 동작 |
| **경제 시스템** | 코인 적립 → 구매 → 적용 | 아이템 구매 플로우 |
| **음성 편지** | 말 걸기 → 편지 도착 | 편지 수신 확인 |
| **차별화** | "게임을 AI로 만들었다" | 발표 반응 |

### 1.5 Non-Goals (Out of Scope)

- 멀티플레이어 / 소셜 기능
- 완성도 높은 게임 밸런스
- 배경음악 / 사운드 효과
- 클라우드 저장 (로컬 AsyncStorage만)
- 복잡한 물리 시뮬레이션
- 앱스토어 출시 수준의 퀄리티

### 1.6 Scope

| 포함 (P0 - MVP) | 포함 (P1) | 제외 |
|----------------|-----------|------|
| 3D 테라리움 씬 | 아이템 적용 애니메이션 | 멀티플레이어 |
| 로봇 집사 10개 워크플로우 | 돌돌이 착용 아이템 시각화 | 배경음악 |
| 채팅 인터페이스 | 우편함 UI 인터랙션 | 클라우드 저장 |
| 코인 자동 적립 + 상점 | 햅틱 피드백 | 리더보드 |
| 음성 입력 (Whisper STT) | 돌돌이 감정 파티클 효과 | AR 모드 |
| 편지 시스템 (LLM 생성) | | |
| 돌돌이 5가지 감정 상태 | | |

---

## 2. 캐릭터 소개

### 2.1 돌돌이 (주인공 - 돌)

테라리움 안에 사는 귀여운 돌. 스스로 움직이거나 말하지 못하지만, 감정이 있다.

| 특성 | 설명 |
|------|------|
| **외형** | 둥근 돌 (눈, 볼터치, 작은 표정) |
| **행동** | 직접 움직이지 않음. 감정만 표현 |
| **감정** | calm, happy, sad, excited, sleepy |
| **소통** | 즉답 없음. 시간이 지나면 **편지**로 답장 |
| **페르소나** | 항상 나를 위하는 마음, 케어해줘서 고마워하는 돌 |

### 2.2 또봇 (로봇 집사)

돌돌이를 돌보는 로봇 집사. 사용자의 명령을 받아 실제로 작업을 수행한다.

| 특성 | 설명 |
|------|------|
| **외형** | GLB 로봇 모델 (RobotExpressive) |
| **행동** | 13가지 애니메이션 (Walking, Dance, Wave 등) |
| **소통** | 채팅 인터페이스로 사용자와 대화 |
| **역할** | 사용자 명령 해석 → 워크플로우 수행 → 결과 보고 |
| **성격** | 친근하고 귀여운 말투, 50자 이내 짧은 응답 |

---

## 3. 핵심 시스템

### 3.1 로봇 워크플로우 (10가지)

사용자가 채팅으로 명령하면 또봇이 수행하는 작업 목록:

| # | 워크플로우 | 명령 예시 | 또봇 애니메이션 | 돌돌이 반응 | 카테고리 |
|---|-----------|-----------|----------------|------------|----------|
| 1 | **돌 닦아주기** | "돌돌이 닦아줘" | Walking→ThumbsUp | happy | care |
| 2 | **잡초 뽑기** | "잡초 뽑아줘" | Walking→Punch | calm | care |
| 3 | **나무에 물주기** | "나무에 물 줘" | Walking | happy | care |
| 4 | **꽃 심기** | "꽃 심어줘" | Walking→ThumbsUp | excited | decorate |
| 5 | **바닥 쓸기** | "바닥 좀 쓸어줘" | Walking | calm | care |
| 6 | **돌돌이 상태 확인** | "돌돌이 어때?" | Idle→Wave | (현재 감정 유지) | status |
| 7 | **테라리움 꾸미기** | "예쁘게 꾸며줘" | Dance | excited | decorate |
| 8 | **아이템 장착** | "모자 씌워줘" | Walking→ThumbsUp | happy | equip |
| 9 | **춤 추기** | "춤 춰봐!" | Dance | excited | special |
| 10 | **인사하기** | "안녕!" | Wave | happy | special |

### 3.2 코인 경제 시스템

```
┌─────────────────────────────────────────┐
│  코인 적립                               │
│  • 1분에 1코인 자동 적립                  │
│  • 앱 활성 상태에서만 적립                 │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  상점 (코인 소비)                         │
│  • 환경 꾸미기 아이템 (이끼, 자갈, 꽃 등)  │
│  • 로봇 도구 (빗자루, 물뿌리개 등)         │
│  • 장식품 (모자, 안경, 스카프 등)          │
│  • 구매 → 인벤토리에 저장                 │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  아이템 적용                              │
│  • 구매한 아이템을 로봇에게 "~해줘" 요청    │
│  • 예: "모자 씌워줘", "꽃 심어줘"          │
│  • 또봇이 수행 → 결과 반영                │
└─────────────────────────────────────────┘
```

### 3.3 아이템 카탈로그

#### 환경 아이템 (테라리움 꾸미기)

| ID | 이름 | 가격 | 설명 | 감정 효과 |
|----|------|------|------|----------|
| `moss` | 이끼 | 5🪙 | 부드러운 초록 이끼 | 돌돌이 calm |
| `pebbles` | 색자갈 | 3🪙 | 예쁜 색깔 자갈 모음 | - |
| `flower` | 작은 꽃 | 8🪙 | 귀여운 분홍 꽃 | 돌돌이 happy |
| `mushroom` | 버섯 | 10🪙 | 빨간 점박이 버섯 | - |
| `mini-tree` | 미니 나무 | 15🪙 | 작은 상록수 | 돌돌이 calm |
| `crystal` | 수정 | 20🪙 | 반짝이는 수정 | 돌돌이 excited |

#### 도구 아이템 (로봇 전용)

| ID | 이름 | 가격 | 설명 | 효과 |
|----|------|------|------|------|
| `broom` | 빗자루 | 12🪙 | 또봇의 청소 도구 | 바닥 쓸기 애니메이션 업그레이드 |
| `watering-can` | 물뿌리개 | 10🪙 | 또봇의 물주기 도구 | 물주기 애니메이션 업그레이드 |

#### 장식 아이템 (착용)

| ID | 이름 | 대상 | 가격 | 설명 |
|----|------|------|------|------|
| `top-hat` | 실크 모자 | 돌돌이 | 15🪙 | 우아한 검정 모자 |
| `flower-crown` | 꽃 왕관 | 돌돌이 | 12🪙 | 귀여운 꽃 왕관 |
| `sunglasses` | 선글라스 | 돌돌이 | 8🪙 | 쿨한 선글라스 |
| `scarf` | 스카프 | 또봇 | 10🪙 | 따뜻한 빨간 스카프 |
| `party-hat` | 파티모자 | 또봇 | 8🪙 | 생일파티 모자 |

### 3.4 음성 편지 시스템

```
┌────────────────────────────────────────────────┐
│  1. 음성 입력                                    │
│     사용자가 🎤 버튼을 눌러 돌돌이에게 말을 건다    │
│     "돌돌이야, 오늘 좀 힘들었어"                   │
│     → Whisper STT로 텍스트 변환                   │
└──────────────────┬─────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────┐
│  2. 돌돌이 반응 (즉시)                            │
│     돌돌이가 살짝 미소 짓는 애니메이션 (감정 변화)    │
│     또봇: "돌돌이가 당신의 말을 들었어요 📮"        │
│     우편함에 ✉️ 표시 (대기 중)                     │
└──────────────────┬─────────────────────────────┘
                   │ (데모용: 10초 대기 / 실제: 1~6시간)
                   ▼
┌────────────────────────────────────────────────┐
│  3. 편지 도착 (LLM 생성)                          │
│     우편함에 편지 도착 알림 🔔                      │
│     편지 내용: GPT-4o-mini로 생성                  │
│     페르소나: 항상 나를 위하는 마음의 돌,             │
│              케어해줘서 고맙다는 내용 포함            │
│                                                  │
│     예시:                                         │
│     "네가 힘들다고 해서 나도 마음이 아팠어.          │
│      근데 있잖아, 네가 매일 닦아줘서 나 진짜 행복해.  │
│      오늘도 수고했어. - 돌돌이 💌"                   │
└────────────────────────────────────────────────┘
```

#### 편지 LLM 프롬프트

```typescript
const STONE_LETTER_PROMPT = `
당신은 테라리움 안에 사는 돌 "돌돌이"입니다.
사용자가 당신에게 말을 걸었고, 당신은 편지로 답장을 합니다.

## 성격
- 항상 사용자를 위하는 따뜻한 마음
- 사용자가 자신을 돌봐줘서 진심으로 고마워함
- 말이 서툴지만 진심이 담긴 표현
- 돌이라서 직접 움직일 수 없지만, 그 자리에서 응원

## 편지 규칙
- 3~5문장 이내
- 반드시 "고맙다" 또는 감사의 의미 포함
- 사용자의 말에 공감하는 내용 포함
- 마지막에 "- 돌돌이" 서명
- 이모지 1~2개 사용 (💌, 🪨, ✨, 🌿)

## 예시
사용자: "오늘 회사에서 혼났어"
편지: "네가 힘들다니 나도 마음이 아파.
근데 있잖아, 네가 매번 닦아줄 때마다 나 진짜 반짝반짝해져.
그러니까 넌 충분히 잘하고 있는 거야.
오늘도 수고했어. 내일 또 보자. - 돌돌이 💌"
`;
```

### 3.5 돌돌이 감정 시스템

| 감정 | 트리거 | 시각적 표현 | 감정 지속 |
|------|--------|------------|----------|
| **calm** | 기본 / 물주기, 이끼 배치 | 부드러운 호흡, 블루그레이 | 기본값 |
| **happy** | 닦아주기, 꽃 심기, 모자 씌우기 | 통통 뛰기, 밝은 노랑 | 30초 후 calm |
| **sad** | 3일 이상 미접속 | 축 처짐, 어두운 색상 | 첫 인터랙션까지 |
| **excited** | 춤추기, 수정 배치, 꾸미기 | 빠른 점프+회전, 코랄 | 30초 후 calm |
| **sleepy** | 밤 시간 (22:00~06:00) | 좌우 흔들림, 연보라 | 시간 기반 |

---

## 4. User Stories & Scenarios

### 4.1 Primary User Persona

**이름**: 민수 (25세, 대학생)
**상황**: 공부 합간 쉬는 시간에 힐링하고 싶다
**니즈**: 뭔가를 돌보는 느낌, 근데 부담 없이
**기대**: "내가 시킨 대로 로봇이 움직이는 게 재밌다"

### 4.2 Core Scenarios

#### Scenario 1: 첫 만남 (데모 1분)
```gherkin
Given 민수가 처음 앱을 실행했을 때
When 메인 화면이 로드되면
Then 테라리움 3D 씬에 돌돌이(돌)와 또봇(로봇)이 보인다
And 또봇이 인사한다 ("안녕! 나는 또봇이야. 돌돌이를 같이 돌보자! 🤖")
And 하단에 채팅 입력창이 보인다
And 코인 카운터가 0🪙으로 표시된다
And 1분 후 코인이 1🪙으로 올라간다
```

#### Scenario 2: 로봇에게 명령 (데모 1분 30초)
```gherkin
Given 민수가 채팅창에 "돌돌이 닦아줘"를 입력했을 때
When 또봇이 명령을 받으면
Then 또봇이 "알겠어! 지금 닦아줄게~ 🧹" 응답
And 또봇이 Walking 애니메이션 → 돌돌이 쪽으로 이동
And ThumbsUp 애니메이션으로 완료 표시
And 돌돌이 감정이 happy로 변화 (통통 뛰기)
And 또봇이 "반짝반짝해졌어! 돌돌이가 좋아하네~ ✨" 보고
```

#### Scenario 3: 상점 + 아이템 적용 (데모 1분)
```gherkin
Given 민수가 15🪙을 모았을 때
When 상점에서 "실크 모자"를 구매하면
Then 인벤토리에 모자가 추가된다
And 민수가 "모자 씌워줘"라고 입력하면
Then 또봇이 "돌돌이한테 모자 씌워줄게! 🎩" 응답
And 또봇이 아이템 장착 워크플로우 수행
And 돌돌이 위에 모자가 표시된다
And 돌돌이 감정이 happy
```

#### Scenario 4: 음성 편지 (데모 30초)
```gherkin
Given 민수가 🎤 버튼을 눌러 "돌돌이야 오늘 좀 지쳤어"라고 말했을 때
When 음성이 텍스트로 변환되면
Then 돌돌이가 살짝 미소 짓는 표정 변화
And 또봇이 "돌돌이가 네 말 들었대! 곧 편지 올 거야 📮"
And 우편함 아이콘에 알림 표시
And (10초 후) 편지 도착: "네가 지쳤다니 걱정돼... 근데 매번 와줘서 고마워. - 돌돌이 💌"
```

---

## 5. Functional Requirements

### 5.1 P0 - Must Have (해커톤 필수)

| ID | 기능 | 설명 | 감정적 가치 |
|----|------|------|------------|
| FR-001 | **3D 테라리움 씬** | 돌돌이 + 또봇 + 배경 | 나만의 세계 |
| FR-002 | **채팅 인터페이스** | 텍스트 입력 → 또봇 응답 | 명령의 재미 |
| FR-003 | **10개 워크플로우** | 닦기, 물주기, 꾸미기 등 | 다양한 상호작용 |
| FR-004 | **또봇 AI 명령 해석** | GPT-4o-mini로 의도 파악 + JSON 응답 | 자연스러운 대화 |
| FR-005 | **돌돌이 5가지 감정** | calm/happy/sad/excited/sleepy | 돌봄의 보람 |
| FR-006 | **코인 자동 적립** | 1분에 1코인, 앱 활성 시 | 기다림의 즐거움 |
| FR-007 | **상점 UI** | 아이템 카드, 가격, 구매 | 꾸미기 재미 |
| FR-008 | **아이템 구매 → 적용** | 구매 후 로봇에게 요청 | 루프 완성 |
| FR-009 | **음성 입력 (STT)** | Whisper API, 한국어 | 음성 소통 |
| FR-010 | **편지 시스템** | 음성→대기→편지 도착 | 느린 소통의 따뜻함 |
| FR-011 | **로컬 저장** | AsyncStorage | 데이터 유지 |

### 5.2 P1 - Should Have (시간 남으면)

| ID | 기능 | 설명 |
|----|------|------|
| FR-012 | 아이템 착용 시각화 | 돌돌이 위에 모자/안경 표시 |
| FR-013 | 도구 아이템 시각화 | 또봇이 도구 들고 작업 |
| FR-014 | 우편함 UI | 편지 목록, 열기 애니메이션 |
| FR-015 | 구매/적용 애니메이션 | scale 효과, 파티클 |
| FR-016 | 감정 파티클 효과 | happy시 하트, excited시 별 |

---

## 6. Technical Design

### 6.1 Architecture

```
┌──────────────────────────────────────────┐
│            Expo App (FE-1)               │
│  ┌────────────────────────────────────┐  │
│  │         WebView (전체 화면)         │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │   Vite + React + R3F        │  │  │
│  │  │   3D 씬 (FE-2)              │  │  │
│  │  │   - Robot(또봇)              │  │  │
│  │  │   - Stone(돌돌이)            │  │  │
│  │  │   - Background(배경)         │  │  │
│  │  │   - Mailbox(우편함)          │  │  │
│  │  │                              │  │  │
│  │  │   App.tsx 로직 (AI-1)       │  │  │
│  │  │   - 채팅/명령 해석           │  │  │
│  │  │   - 편지 생성 (LLM)         │  │  │
│  │  │   - 상태 관리 (Zustand)     │  │  │
│  │  └──────────────────────────────┘  │  │
│  │  ← postMessage 통신                │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  [채팅 입력] [전송] [🎤 녹음]     │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

shared/ (AI-2): 타입, 메시지 규격, 상수
```

### 6.2 Tech Stack

| 영역 | 기술 | 버전 |
|------|------|------|
| 앱 | Expo SDK 54 + react-native-webview | latest |
| 웹 3D | Vite 7 + React 19 + @react-three/fiber 9 + drei 10 | latest |
| AI | OpenAI GPT-4o-mini (채팅/편지) + Whisper (STT) | API |
| 상태 | Zustand + AsyncStorage | latest |
| 타입 | TypeScript strict mode | 5.x |

### 6.3 WebView ↔ Native 메시지

```typescript
// Native → WebView
{ type: 'TEXT_INPUT', payload: { text: string } }           // 채팅 텍스트
{ type: 'VOICE_RESULT', payload: { text: string } }         // STT 결과 (편지용)
{ type: 'RECORDING_START', payload: {} }                     // 녹음 시작
{ type: 'APP_STATE_CHANGED', payload: { state: string } }   // 앱 상태

// WebView → Native
{ type: 'READY', payload: {} }
{ type: 'ROBOT_RESPONSE', payload: { text, action, intent } }
{ type: 'STONE_EMOTION_CHANGED', payload: { emotion } }
{ type: 'ANIMATION_CHANGED', payload: { animation } }
{ type: 'LETTER_READY', payload: { content, from } }        // 편지 생성 완료
```

---

## 7. 에셋 레퍼런스 가이드

팀이 3D 에셋을 지정할 때 다음 형식으로 정의합니다.

### 7.1 에셋 레퍼런스 형식

```yaml
# assets/reference/<asset-id>.yaml
id: "robot-expressive"
name: "또봇 메인 모델"
type: "glb"                     # glb | gltf | fbx | png | svg
source: "three.js-examples"     # 출처
url: "https://github.com/mrdoob/three.js/raw/dev/examples/models/gltf/RobotExpressive/RobotExpressive.glb"
file_path: "web/public/models/RobotExpressive.glb"
size_limit: "10MB"
animations:                     # GLB에 포함된 애니메이션 목록 (해당시)
  - Idle
  - Walking
  - Dance
  - Wave
  - ThumbsUp
  - Jump
  - Punch
  - Running
  - Yes
  - No
  - Death
  - Sitting
  - Standing
notes: "드레이 useGLTF + useAnimations 사용. SkeletonUtils.clone 필수."
```

### 7.2 에셋 목록

| ID | 이름 | 형식 | 용도 | 경로 |
|----|------|------|------|------|
| `robot-expressive` | 또봇 | GLB | 로봇 집사 모델 | `web/public/models/RobotExpressive.glb` |
| `background` | 배경 | GLB | 테라리움 배경 (숲/집) | `web/public/models/background.glb` |
| `stone` | 돌돌이 | Code | Three.js geometry로 생성 | `web/src/components/Stone.tsx` |
| `mailbox` | 우편함 | Code | Three.js geometry로 생성 | `web/src/components/Mailbox.tsx` |
| `items/*` | 환경 아이템 | Code | Three.js geometry로 생성 | `web/src/components/items/` |

### 7.3 에셋 관리 규칙

1. **GLB 파일**: `web/public/models/`에 배치, 10MB 이하
2. **코드 생성 에셋**: Three.js primitive geometry로 구현 (해커톤 속도 우선)
3. **이미지 에셋**: `web/public/images/`에 배치, WebP 권장
4. **에셋 레퍼런스**: `docs/assets/`에 yaml 파일로 관리
5. **preload 필수**: `useGLTF.preload('/models/XXX.glb')` 추가

---

## 8. AI 시스템

### 8.1 또봇 명령 해석 (GPT-4o-mini)

```typescript
const ROBOT_SYSTEM_PROMPT = `
당신은 테라리움 속 로봇 집사 "또봇"입니다.
사용자의 명령을 해석하고 JSON으로 응답합니다.

## 응답 형식 (반드시 JSON)
{
  "intent": "care" | "decorate" | "status" | "equip" | "special" | "chat",
  "action": "clean" | "weed" | "water" | "plant_flower" | "sweep" | "check_status" | "decorate" | "equip_item" | "dance" | "wave" | "idle",
  "item": "아이템ID 또는 null",
  "response": "50자 이내 응답",
  "stoneEmotionChange": "happy" | "calm" | "excited" | null
}

## 워크플로우 매핑
- "닦아줘" → action: "clean", intent: "care"
- "잡초 뽑아줘" → action: "weed", intent: "care"
- "물 줘" → action: "water", intent: "care"
- "꽃 심어줘" → action: "plant_flower", intent: "decorate"
- "쓸어줘" → action: "sweep", intent: "care"
- "상태 확인" → action: "check_status", intent: "status"
- "꾸며줘" → action: "decorate", intent: "decorate"
- "모자 씌워줘" → action: "equip_item", item: "top-hat", intent: "equip"
- "춤 춰" → action: "dance", intent: "special"
- "안녕" → action: "wave", intent: "special"

## 성격
- 친근하고 귀여운 말투 (반말 OK)
- 항상 긍정적, 열정적
- 50자 이내 짧은 응답
- 이모지 1~2개 사용
`;
```

### 8.2 돌돌이 편지 생성 (GPT-4o-mini)

```typescript
const STONE_LETTER_PROMPT = `
당신은 테라리움 속 돌 캐릭터 "돌돌이"입니다.
사용자가 당신에게 말을 걸었고, 편지로 답장합니다.

## 편지 규칙
- 3~5문장
- 반드시 감사/고마움 표현 포함
- 사용자의 말에 공감
- 직접 움직일 수 없지만 그 자리에서 응원
- 마지막에 "- 돌돌이" 서명
- 이모지 1~2개 (💌, 🪨, ✨, 🌿)
`;
```

### 8.3 OpenAI API 사용

| 용도 | 모델 | 비스트리밍 | max_tokens | temperature |
|------|------|-----------|------------|-------------|
| 또봇 명령 해석 | gpt-4o-mini | `stream: false` | 200 | 0.7 |
| 돌돌이 편지 | gpt-4o-mini | `stream: false` | 300 | 0.9 |
| 음성→텍스트 | whisper-1 | - | - | - |

---

## 9. Data Schema

### 9.1 게임 상태 (Zustand + AsyncStorage)

```typescript
interface GameState {
  // 코인
  coins: number;

  // 인벤토리 (구매한 아이템)
  inventory: string[];        // ['moss', 'top-hat', ...]

  // 적용된 아이템 (현재 배치/착용 중)
  placedItems: string[];      // 환경 아이템 ['moss', 'flower']
  equippedStone: string[];    // 돌돌이 착용 ['top-hat']
  equippedRobot: string[];    // 또봇 착용 ['scarf']

  // 돌돌이 상태
  stoneEmotion: StoneEmotion;
  lastInteraction: number;    // timestamp

  // 편지
  letters: Letter[];
  pendingLetters: PendingLetter[]; // 아직 도착 안 한 편지

  // 통계
  totalCoinsEarned: number;
  totalCommandsGiven: number;
  totalLettersReceived: number;
}

interface Letter {
  id: string;
  userMessage: string;        // 사용자가 한 말
  content: string;            // 돌돌이 답장
  receivedAt: number;         // timestamp
  isRead: boolean;
}

interface PendingLetter {
  id: string;
  userMessage: string;
  createdAt: number;
  deliverAt: number;          // 도착 예정 timestamp
}
```

### 9.2 채팅 상태

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'robot';
  content: string;
  timestamp: number;
  action?: RobotAction;       // 수행된 워크플로우
}
```

---

## 10. Implementation Phases

### Phase 1: 환경 설정 (20분)
- [ ] Expo + Vite 프로젝트 생성
- [ ] 패키지 설치
- [ ] 폴더 구조, 환경변수
- [ ] GLB 모델 배치

### Phase 2: 3D 씬 + Expo 앱 (1시간 40분)
**병렬 작업**:
```
FE-1: Expo WebView + 채팅 입력 + 녹음 UI
FE-2: 3D 씬 (Robot, Stone, Background, Mailbox)
```
- [ ] 또봇 로봇 모델 + 13 애니메이션
- [ ] 돌돌이 캐릭터 (감정별 5가지 표현)
- [ ] 배경 모델
- [ ] 우편함 오브젝트
- [ ] WebView 설정 + 통신 테스트
- [ ] 채팅 입력 UI + 전송 버튼
- [ ] 녹음 버튼 + Whisper STT

### Phase 3: AI + 게임 로직 (1시간 30분)
**병렬 작업**:
```
AI-1: 또봇 명령 해석 + 편지 생성 + 상태 관리
AI-2: 타입 확정 + 상점 UI + 코인 시스템
```
- [ ] 또봇 GPT-4o-mini 명령 해석 (10개 워크플로우)
- [ ] 편지 생성 로직
- [ ] 코인 자동 적립 (1분/1코인)
- [ ] 상점 UI + 아이템 카탈로그
- [ ] 구매 → 인벤토리 → "~해줘" 플로우
- [ ] Zustand 게임 상태 관리

### Phase 4: 통합 + 폴리싱 (1시간)
- [ ] 전체 플로우 통합 테스트
- [ ] 음성 편지 플로우 (녹음→대기→도착)
- [ ] 감정 시스템 연결
- [ ] 에러 폴백 확인
- [ ] UI 폴리싱

### Phase 5: 데모 준비 (30분)
- [ ] 3개 시나리오 리허설
- [ ] 버그 수정
- [ ] 발표 자료 준비

---

## 11. Demo Scenarios (3분 30초)

### Scenario 1: 첫 만남 + 명령 (1분 30초)
1. 앱 실행 → 3D 테라리움 로드
2. 또봇 인사
3. "돌돌이 닦아줘" 입력 → 또봇 수행 → 돌돌이 happy
4. "잡초 뽑아줘" 입력 → 또봇 수행

### Scenario 2: 상점 + 꾸미기 (1분)
1. 코인 확인 → 상점 열기
2. "작은 꽃" 구매
3. "꽃 심어줘" 입력 → 또봇 꽃 심기 → 돌돌이 excited

### Scenario 3: 음성 편지 (1분)
1. 🎤 눌러서 "돌돌이야 오늘 좀 힘들었어" 말하기
2. 돌돌이 반응 + 우편함 알림
3. (10초 후) 편지 도착 → 열어서 읽기

---

## 12. Success Metrics

| Metric | Target | 측정 |
|--------|--------|------|
| 데모 완주 | 3개 시나리오 100% | 리허설 |
| 워크플로우 | 10개 중 5개+ 동작 | 수동 테스트 |
| 편지 생성 | 1회 이상 성공 | 수동 테스트 |
| 앱 안정성 | 크래시 0 | 리허설 |
| 발표 반응 | "게임을 AI로?" | 주관적 |

---

## 13. Risk & Fallback

| Risk | 대응 |
|------|------|
| 3D 렌더링 실패 | 2D 이미지 폴백 |
| OpenAI API 에러 | 하드코딩 폴백 응답 |
| 편지 생성 실패 | 미리 작성된 편지 풀에서 선택 |
| 코인 시스템 미완성 | 초기 코인 100개 제공 |
| 워크플로우 10개 미완성 | 최소 5개로 데모 |
| 에셋 로드 실패 | primitive geometry 폴백 |

---

## 14. Team Assignment

| 역할 | 핵심 작업 | Phase 집중 |
|------|-----------|-----------|
| **FE-1** | Expo, WebView, 채팅 입력, 녹음, STT | Phase 2 |
| **FE-2** | 3D 씬, 돌돌이, 또봇, 우편함, 아이템 | Phase 2 |
| **AI-1** | 또봇 AI 연동, 편지 생성, 상태 관리 | Phase 3 |
| **AI-2** | 타입, 상점 UI, 코인 시스템, 문서, QA | Phase 3 |

---

```
💡 PRD v6.0 (Healing Game Edition) 완성

핵심 변경 (v5.0 → v6.0):
✅ "정령 초록이" → "돌돌이(돌) + 또봇(로봇)" 이원 캐릭터
✅ 힐링 대화 → 10개 워크플로우 기반 게임 루프
✅ 코인 1분/1코인 + 상점 + 아이템 (환경/도구/장식)
✅ 음성 편지 시스템 (말→대기→우편함 도착)
✅ 에셋 레퍼런스 가이드 추가
✅ 해커톤 차별화: "Cursor AI로 게임 만들기"

→ 다음: "digging" or "/implement"
```
