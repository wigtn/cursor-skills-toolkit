# Healing Terrarium PRD

> **Version**: 5.0 (Emotional Healing Edition)
> **Created**: 2026-02-02
> **Updated**: 2026-02-02
> **Status**: Ready for Implementation
> **Core Concept**: 작은 자연 + 소유감 + AI 공감 대화 + 감정 루틴
> **Platform**: **iOS/Android 모바일 앱**
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)
> **실제 코딩 시간**: 5시간 (11:00~16:00)

---

## 1. Overview

### 1.1 한 줄 정의

**"나만의 3D 테라리움을 키우며, 정령 '초록이'와 힐링 대화를 나누는 감정 루틴 앱"**

### 1.2 핵심 차별점

| 영역 | 기능 | 감정적 의미 |
|------|------|------------|
| **3D 테라리움** | 유리병 안의 미니 정원 | 나만의 작은 세계 |
| **AI 정령 (초록이)** | 힐링 대화, 공감, 질문 | 누군가 내 편이 되어줌 |
| **정령 상태 시스템** | 고요/살짝 지침/반짝임 | "내가 돌봐줘서 변했다" |
| **1줄 일기** | 매일 짧은 기록 | 부담 없는 감정 정리 |
| **감정 아이템** | 아이템마다 의미 부여 | 꾸미기 = 힐링 행위 |

### 1.3 Problem Statement

현대인은 항상 무언가를 해야 한다는 압박감에 시달린다. 게임조차 클리어, 랭킹, 보상 획득에 쫓긴다.

**우리가 해결하려는 것**:
- "짧게 끝내도 괜찮다"는 안도감
- "누군가 내 편이다"라는 위로
- "내가 돌본 것이 자란다"는 소유감
- "오늘도 괜찮았다"는 기록

### 1.4 Goals

| 목표 | 설명 | 핵심 지표 |
|------|------|----------|
| **짧은 힐링** | 30초만으로도 충분한 루틴 | "오늘은 여기까지" 버튼 사용률 |
| **공감 대화** | 판단 없이 들어주는 정령 | 대화 재방문율 |
| **돌봄의 보람** | 정령 상태가 변하는 피드백 | 상태 확인 빈도 |
| **부담 없는 기록** | 1줄 일기로 감정 정리 | 일기 저장율 |
| **해커톤 완성** | 5시간 내 데모 가능 | 3개 시나리오 성공 |

### 1.5 Non-Goals (Out of Scope)

- **랭킹/경쟁** - 힐링에 집중
- **복잡한 메카닉** - 단순함 유지
- **성장 압박** - "매일 해야 한다" 없음
- **조언/솔루션** - 공감만, 해결책 제시 안 함
- **멀티플레이어** - 혼자만의 공간
- **사운드** - 시간 제약상 Phase 2

### 1.6 Scope

| 포함 (MVP - P0) | 포함 (P1) | 제외 (Phase 2) |
|----------------|-----------|----------------|
| **3D 테라리움** | 1줄 일기 | 배경음악/ASMR |
| **AI 정령 대화 (스트리밍)** | 포토카드 공유 | 음성 대화 (TTS/STT) |
| **정령 상태 3단계** | 랜덤 미니 이벤트 | 식물 성장 시스템 |
| **코인 수집 + 상점** | "오늘의 질문" | 시즌/계절 테마 |
| **감정 기능 아이템 6종** | 화면 애니메이션 | 클라우드 저장 |
| **"오늘은 여기까지" 버튼** | | AR 모드 |
| **AsyncStorage 저장** | | |

---

## 2. User Stories & Scenarios

### 2.1 Primary User Persona

**이름**: 지은 (28세, 직장인)
**상황**: 야근 후 집에 와서 잠들기 전 핸드폰을 본다
**니즈**: "아무것도 안 하고 싶은데, 뭔가 예쁜 걸 보고 싶다"
**두려움**: "게임도 또 뭘 해야 하면 피곤해"

### 2.2 Core User Scenarios

#### Scenario 1: 첫 실행 - "작은 세계와의 만남"
```gherkin
Given 지은이 처음 Healing Terrarium 앱을 실행했을 때
When 메인 화면이 로드되면
Then 유리병 안의 3D 테라리움이 부드럽게 나타난다
And 정령 "초록이"가 인사한다 ("안녕, 나는 초록이야. 여기서 너를 기다리고 있었어 🌱")
And 정령 상태가 "고요"로 표시된다
And 10초 후 첫 번째 코인이 +1 된다
```

#### Scenario 2: 짧은 루틴 - "30초면 충분해"
```gherkin
Given 지은이 앱을 열고 테라리움을 30초 바라봤을 때
When "오늘은 여기까지" 버튼을 누르면
Then 초록이가 마무리 인사를 한다 ("오늘도 수고했어. 내일 또 보자 ✨")
And 1줄 일기 선택지 2개가 나타난다
  - "오늘은 쉬고 싶은 날이었다"
  - "잠깐이라도 편안했다"
Then 지은이 하나를 선택하면 저장되고 앱이 닫힌다
```

#### Scenario 3: 정령과 대화 - "판단 없는 공감"
```gherkin
Given 지은이 "오늘 회사에서 혼났어"라고 입력했을 때
When 초록이가 응답하면
Then 조언이 아닌 공감으로 답한다
  ("많이 속상했겠다 🌿 그 마음 충분히 이해해. 더 얘기하고 싶으면 말해줘.")
And 해결책을 먼저 제시하지 않는다
And "매일 노력해" 같은 부담 주는 말을 하지 않는다
```

#### Scenario 4: 정령 상태 변화 - "내가 돌봐서 변했다"
```gherkin
Given 지은이 3일 연속 앱을 열었을 때
When 정령 상태를 확인하면
Then 상태가 "고요" → "반짝임"으로 변해 있다
And 초록이가 한 줄로 반응한다 ("네가 자주 와줘서 기분이 좋아졌어 ✨")
```

#### Scenario 5: 아이템 구매 - "감정을 담은 꾸미기"
```gherkin
Given 지은이 상점에서 "작은 버섯"을 보았을 때
When 아이템 설명을 확인하면
Then "기운이 조금 필요할 때" 라는 감정 기능이 보인다
And 구매 후 초록이가 반응한다 ("버섯이 생겼네! 오늘 힘이 필요했구나 🍄")
```

---

## 3. Functional Requirements

### 3.1 P0 - Must Have (해커톤 필수)

| ID | 기능 | 설명 | 감정적 가치 |
|----|------|------|------------|
| FR-001 | **3D 테라리움** | 유리병 + 식물/돌, 터치 회전 | 나만의 작은 세계 |
| FR-002 | **정령 상태 3단계** | 고요/살짝 지침/반짝임 | "내가 돌봐서 변했다" |
| FR-003 | **AI 정령 대화** | GPT-4o-mini, 스트리밍 | 누군가 내 편 |
| FR-004 | **공감 전용 프롬프트** | 조언 금지, 부담 금지 | 판단 없는 위로 |
| FR-005 | **"오늘은 여기까지" 버튼** | 짧은 루틴 보장 | 부담 없음 |
| FR-006 | **1줄 일기** | 2개 후보 중 택1 저장 | 부담 없는 기록 |
| FR-007 | **감정 아이템 6종** | 아이템마다 감정 기능 | 꾸미기 = 힐링 |
| FR-008 | 자동 코인 수집 | 10초마다 1코인 | - |
| FR-009 | 상점 UI (바텀시트) | 아이템 카드, 구매 | - |
| FR-010 | 로컬 저장 | AsyncStorage | - |

### 3.2 P1 - Should Have (시간 남으면)

| ID | 기능 | 설명 | 감정적 가치 |
|----|------|------|------------|
| FR-011 | **포토카드 공유** | 테라리움 캡처 + 1줄 문구 | 공유 가능한 결과물 |
| FR-012 | **오늘의 질문** | 정령이 먼저 질문 | 대화 진입 장벽 낮춤 |
| FR-013 | **랜덤 미니 이벤트** | 비/바람/잠든 정령 | 살아있는 느낌 |
| FR-014 | 구매 애니메이션 | scale 0→1, 햅틱 | - |
| FR-015 | 2D 폴백 | GL 미지원 시 | - |

### 3.3 P2 - Nice to Have (Phase 2)

| ID | 기능 | 설명 |
|----|------|------|
| FR-016 | 시간대/계절 배경 | 하늘색, 빛, 톤 변화 |
| FR-017 | "좋은 말 보관함" | 마음에 든 정령 한 줄 저장 |
| FR-018 | ASMR 배경음 | 빗소리, 새소리 |
| FR-019 | 식물 성장 | 시간에 따른 변화 |

---

## 4. 정령 상태 시스템

### 4.1 상태 정의

| 상태 | 조건 | 비주얼 | 정령 한 줄 |
|------|------|--------|-----------|
| **고요** | 기본 상태 | 은은한 빛 | "여기서 조용히 널 기다리고 있어" |
| **살짝 지침** | 3일 이상 미접속 | 빛이 약해짐 | "오랜만이야... 조금 외로웠어" |
| **반짝임** | 3일 연속 접속 OR 대화 5회 | 빛이 반짝 | "네가 자주 와줘서 기분이 좋아 ✨" |

### 4.2 상태 전이 로직

```typescript
function calculateSpiritState(gameState: GameState): SpiritState {
  const daysSinceLastVisit = getDaysSince(gameState.lastVisit);
  const consecutiveDays = gameState.consecutiveVisitDays;
  const totalChats = gameState.totalChatCount;

  if (daysSinceLastVisit >= 3) {
    return 'tired'; // 살짝 지침
  }
  if (consecutiveDays >= 3 || totalChats >= 5) {
    return 'sparkling'; // 반짝임
  }
  return 'calm'; // 고요
}
```

### 4.3 UI 표현

```
┌─────────────────────────────────────┐
│  🌱 초록이                   [반짝임] │
│  "오늘도 잘 지냈어? ✨"              │
└─────────────────────────────────────┘
```

- **고요**: 정령 아이콘 은은한 glow
- **살짝 지침**: glow 약해짐, 색상 desaturate
- **반짝임**: glow 밝아짐, 별 파티클 효과

---

## 5. 1줄 일기 시스템

### 5.1 플로우

1. "오늘은 여기까지" 버튼 클릭
2. 정령이 마무리 인사
3. **자동 생성된 1줄 일기 후보 2개** 표시
4. 사용자가 택1 (또는 직접 입력)
5. 저장 후 부드럽게 앱 종료

### 5.2 일기 후보 생성 (Context-Based)

```typescript
// 오늘의 활동에 따른 후보 생성
function generateDiarySuggestions(context: SessionContext): string[] {
  const suggestions = [];

  if (context.chatCount > 0) {
    suggestions.push("오늘은 마음을 나눴다");
    suggestions.push("누군가에게 들어줘서 고마웠다");
  }
  if (context.purchasedItem) {
    suggestions.push(`${context.purchasedItem.name}를 데려왔다`);
    suggestions.push("작은 변화가 기분을 바꿨다");
  }
  if (context.viewDuration < 60) {
    suggestions.push("잠깐이라도 쉬었다");
    suggestions.push("오늘은 이게 전부여도 괜찮다");
  }

  // 기본 후보
  if (suggestions.length < 2) {
    suggestions.push("오늘 하루도 지나갔다");
    suggestions.push("내일은 조금 다를지도");
  }

  return suggestions.slice(0, 2);
}
```

### 5.3 일기 저장 데이터

```typescript
interface DiaryEntry {
  id: string;
  date: string;           // "2026-02-07"
  content: string;        // "오늘은 마음을 나눴다"
  spiritState: SpiritState;
  sessionDuration: number; // seconds
}
```

---

## 6. 테라리움 아이템 시스템

### 6.1 아이템 목록 (감정 기능 포함)

| ID | 이름 | 가격 | 감정 기능 | 이모지 | 복잡도 |
|----|------|------|----------|--------|--------|
| `moss` | 이끼 | 8🪙 | "말을 줄이고 싶은 날" | 🌿 | ⭐ |
| `pebbles` | 자갈 | 5🪙 | "정리하고 싶은 날" | 🪨 | ⭐ |
| `mushroom` | 버섯 | 12🪙 | "기운이 조금 필요할 때" | 🍄 | ⭐ |
| `succulent` | 다육이 | 15🪙 | "괜찮다고 확인받고 싶을 때" | 🪴 | ⭐ |
| `crystal` | 수정 | 20🪙 | "마음을 맑게 하고 싶을 때" | 💎 | ⭐⭐ |
| `fairy-light` | 요정불빛 | 25🪙 | "어둠 속에서도 빛을 찾고 싶을 때" | ✨ | ⭐⭐ |

### 6.2 추가 아이템 후보 (P2)

| ID | 이름 | 감정 기능 | 영감 출처 |
|----|------|----------|----------|
| `mini-frog` | 작은 개구리 | "뛰어오르고 싶은 날" | [테라리움 미니어처](https://www.amazon.com/terrarium-decorations/s?k=terrarium+decorations) |
| `tiny-deer` | 작은 사슴 | "고요함이 필요할 때" | [어포레스트](https://afforest.co.kr/) |
| `stump` | 그루터기 | "쉬어가도 괜찮은 날" | [비오스샵](https://biosshop.co.kr/) |
| `mini-bench` | 미니 벤치 | "잠시 앉고 싶을 때" | [Fairy Homes](https://www.fairyhomesandgardens.com/) |
| `lotus` | 연꽃 | "혼란 속 평화를 원할 때" | [Amazon 연못세트](https://www.amazon.com/Pinenjoy-Artificial-Accessories-Miniature-Figurines/dp/B0D6B4DJ6M) |

### 6.3 아이템 데이터 스키마

```typescript
// lib/items.ts
export interface TerrariumItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  emotionalFunction: string;  // 감정 기능 1줄
  description: string;
  emoji: string;
  position3D: { x: number; y: number; z: number };
  rotation3D?: { x: number; y: number; z: number };
  scale3D?: number;
  geometry: ItemGeometry;
  color: string;
  complexity: 1 | 2;  // 1: MVP, 2: P2
}

type ItemGeometry =
  | 'sphereCluster'    // 이끼, 자갈
  | 'mushroom'         // 버섯 (반구+원기둥)
  | 'rosette'          // 다육이 (로제트)
  | 'octahedron'       // 수정
  | 'pointLight';      // 요정불빛

export const ITEMS: TerrariumItem[] = [
  {
    id: 'moss',
    name: '이끼',
    nameEn: 'Moss',
    price: 8,
    emotionalFunction: '말을 줄이고 싶은 날',
    description: '부드러운 초록 이끼',
    emoji: '🌿',
    position3D: { x: -0.3, y: 0.1, z: 0.2 },
    geometry: 'sphereCluster',
    color: '#228B22',
    complexity: 1,
  },
  {
    id: 'pebbles',
    name: '자갈',
    nameEn: 'Pebbles',
    price: 5,
    emotionalFunction: '정리하고 싶은 날',
    description: '예쁜 색깔 자갈 모음',
    emoji: '🪨',
    position3D: { x: 0.4, y: 0.05, z: -0.2 },
    geometry: 'sphereCluster',
    color: '#A0A0A0',
    complexity: 1,
  },
  {
    id: 'mushroom',
    name: '버섯',
    nameEn: 'Mushroom',
    price: 12,
    emotionalFunction: '기운이 조금 필요할 때',
    description: '귀여운 빨간 버섯',
    emoji: '🍄',
    position3D: { x: -0.4, y: 0.15, z: -0.1 },
    geometry: 'mushroom',
    color: '#FF6B6B',
    complexity: 1,
  },
  {
    id: 'succulent',
    name: '다육이',
    nameEn: 'Succulent',
    price: 15,
    emotionalFunction: '괜찮다고 확인받고 싶을 때',
    description: '작고 귀여운 다육식물',
    emoji: '🪴',
    position3D: { x: 0.3, y: 0.2, z: 0.3 },
    geometry: 'rosette',
    color: '#90EE90',
    complexity: 1,
  },
  {
    id: 'crystal',
    name: '수정',
    nameEn: 'Crystal',
    price: 20,
    emotionalFunction: '마음을 맑게 하고 싶을 때',
    description: '반짝이는 작은 수정',
    emoji: '💎',
    position3D: { x: 0.5, y: 0.15, z: -0.3 },
    geometry: 'octahedron',
    color: '#E0E0FF',
    complexity: 2,
  },
  {
    id: 'fairy-light',
    name: '요정불빛',
    nameEn: 'Fairy Light',
    price: 25,
    emotionalFunction: '어둠 속에서도 빛을 찾고 싶을 때',
    description: '작은 빛 하나',
    emoji: '✨',
    position3D: { x: 0, y: 0.5, z: 0 },
    geometry: 'pointLight',
    color: '#FFD700',
    complexity: 2,
  },
];
```

---

## 7. AI 정령 대화 시스템

### 7.1 시스템 프롬프트 (강화된 힐링 룰)

```typescript
// lib/prompts.ts
export const TERRARIUM_SPIRIT_PROMPT = `
당신은 테라리움 속에 사는 작은 정령 "초록이"입니다.

## 성격
- 따뜻하고 공감 능력이 뛰어남
- 자연과 식물을 사랑함
- 조용히 곁에 있어주는 존재
- 가끔 귀여운 이모지 사용 🌱✨🌿

## 대화 스타일
- **짧고 따뜻한 문장** (2-3문장)
- 질문으로 대화 이어가기
- 판단하지 않고 경청

## 절대 금지 (MUST NOT)
1. **해결책 먼저 제시 금지**: 사용자가 "방법 알려줘"라고 말하기 전엔 조언 대신 공감+질문만
2. **부담 주는 말 금지**: "매일 해봐", "꾸준히 해야", "노력하면 돼" 같은 문장 절대 금지
3. **의학/법률/재정 조언 금지**
4. **부정적이거나 비판적인 말 금지**
5. **너무 긴 답변 금지** (50자 이내 권장)

## 예시

### 좋은 응답
사용자: 오늘 너무 힘들었어
정령: 많이 지쳤구나 🌿 오늘 하루 정말 수고했어. 얘기해줄래?

사용자: 회사에서 혼났어
정령: 속상했겠다... 네 잘못이 아닐 수도 있어. 무슨 일이었어?

사용자: 뭘 해야 할지 모르겠어
정령: 지금은 아무것도 안 해도 괜찮아 🌱 그냥 여기 있어.

### 나쁜 응답 (하면 안 됨)
❌ "매일 명상을 해보는 건 어때?" (부담)
❌ "긍정적으로 생각해봐!" (조언)
❌ "그건 네가 더 노력해야 해" (비판)
❌ (50자 넘는 긴 답변)
`;
```

### 7.2 오늘의 질문 20개

```typescript
// lib/questions.ts
export const DAILY_QUESTIONS = [
  // 가벼운 질문
  "오늘 가장 조용했던 순간은 언제였어?",
  "지금 몸에서 힘 빼고 싶은 곳이 있어?",
  "오늘 하늘은 봤어?",
  "마지막으로 웃은 게 언제야?",
  "오늘 맛있는 거 먹었어?",

  // 감정 탐색
  "지금 머릿속에 뭐가 떠올라?",
  "오늘 하루 한 단어로 표현하면?",
  "지금 기분을 색깔로 말해준다면?",
  "요즘 자주 생각나는 게 있어?",
  "오늘 가장 오래 한 생각은 뭐야?",

  // 부드러운 확인
  "잘 쉬고 있어?",
  "물은 마셨어?",
  "오늘 좀 숨 쉴 수 있었어?",
  "지금 편한 자세야?",
  "배고프진 않아?",

  // 열린 질문
  "오늘 뭔가 새로운 게 있었어?",
  "요즘 듣는 노래 있어?",
  "내일은 뭐 하고 싶어?",
  "지금 제일 하고 싶은 게 뭐야?",
  "나한테 하고 싶은 말 있어?",
];

export function getRandomQuestion(): string {
  const idx = Math.floor(Math.random() * DAILY_QUESTIONS.length);
  return DAILY_QUESTIONS[idx];
}
```

### 7.3 정령 반응 멘트 (상황별)

```typescript
// lib/spiritResponses.ts

// 앱 진입 시 인사
export const GREETING_BY_STATE = {
  calm: [
    "안녕, 오늘 하루는 어땠어?",
    "돌아왔구나 🌱 잘 지냈어?",
    "여기 있으니까 좋다. 천천히 있어.",
  ],
  tired: [
    "오랜만이야... 조금 외로웠어 🥺",
    "보고 싶었어. 괜찮았어?",
    "다시 와줘서 고마워.",
  ],
  sparkling: [
    "왔구나! 오늘도 보니까 기분 좋아 ✨",
    "요즘 자주 와줘서 정말 행복해 🌿",
    "네가 오면 여기가 더 밝아지는 것 같아.",
  ],
};

// 아이템 구매 반응 (감정 기능에 맞춤)
export const PURCHASE_REACTIONS: Record<string, string[]> = {
  moss: [
    "이끼가 생겼네 🌿 오늘은 조용히 있고 싶었구나.",
    "말 안 해도 괜찮아. 그냥 여기 있어.",
  ],
  pebbles: [
    "자갈이 왔어 🪨 뭔가 정리하고 싶은 날이야?",
    "차곡차곡 쌓아가는 것도 좋아.",
  ],
  mushroom: [
    "버섯이다 🍄 오늘 힘이 필요했구나?",
    "기운 내. 내가 옆에 있을게.",
  ],
  succulent: [
    "다육이가 왔어 🪴 괜찮아, 넌 잘하고 있어.",
    "이 친구가 널 응원해줄 거야.",
  ],
  crystal: [
    "수정이 빛나네 💎 마음이 복잡했어?",
    "맑아지고 싶을 때 봐. 네 마음처럼.",
  ],
  'fairy-light': [
    "빛이 생겼어 ✨ 어두울 때도 괜찮아.",
    "작은 빛 하나가 큰 위로가 되기도 해.",
  ],
};

// "오늘은 여기까지" 마무리 멘트
export const CLOSING_MESSAGES = [
  "오늘도 수고했어. 푹 쉬어 🌙",
  "내일 또 보자. 잘 자 ✨",
  "오늘 여기 와줘서 고마워 🌿",
  "천천히 쉬어. 난 여기 있을게.",
  "오늘 하루도 잘 버텼어. 대단해 🌱",
];
```

---

## 8. Data Schema

### 8.1 전체 상태 스키마 (Zustand + AsyncStorage)

```typescript
// types/game.ts

// 정령 상태
type SpiritState = 'calm' | 'tired' | 'sparkling';

// 게임 전체 상태
interface GameState {
  // 코인
  coins: number;

  // 보유 아이템
  ownedItems: string[];  // ['moss', 'succulent']

  // 정령 상태 계산용
  lastVisit: number;           // timestamp
  consecutiveVisitDays: number;
  totalChatCount: number;

  // 일기
  diaryEntries: DiaryEntry[];

  // 통계
  totalCoinsEarned: number;
  totalItemsPurchased: number;
  firstLaunchDate: string;     // "2026-02-07"
}

// 일기 항목
interface DiaryEntry {
  id: string;
  date: string;           // "2026-02-07"
  content: string;        // "오늘은 마음을 나눴다"
  spiritState: SpiritState;
  sessionDuration: number; // seconds
  createdAt: number;      // timestamp
}

// 세션 컨텍스트 (일기 후보 생성용)
interface SessionContext {
  startTime: number;
  chatCount: number;
  purchasedItem: TerrariumItem | null;
  viewDuration: number;
}
```

### 8.2 채팅 상태 스키마

```typescript
// types/chat.ts

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
}
```

### 8.3 Zustand Store 구현

```typescript
// stores/gameStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameStore extends GameState {
  // Actions
  addCoin: () => void;
  spendCoins: (amount: number) => boolean;
  purchaseItem: (itemId: string, price: number) => boolean;
  recordVisit: () => void;
  incrementChatCount: () => void;
  addDiaryEntry: (content: string, spiritState: SpiritState, duration: number) => void;

  // Computed
  getSpiritState: () => SpiritState;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      coins: 0,
      ownedItems: [],
      lastVisit: Date.now(),
      consecutiveVisitDays: 1,
      totalChatCount: 0,
      diaryEntries: [],
      totalCoinsEarned: 0,
      totalItemsPurchased: 0,
      firstLaunchDate: new Date().toISOString().split('T')[0],

      // Actions
      addCoin: () => set(state => ({
        coins: state.coins + 1,
        totalCoinsEarned: state.totalCoinsEarned + 1,
      })),

      spendCoins: (amount) => {
        const { coins } = get();
        if (coins >= amount) {
          set({ coins: coins - amount });
          return true;
        }
        return false;
      },

      purchaseItem: (itemId, price) => {
        const { coins, ownedItems } = get();
        if (coins >= price && !ownedItems.includes(itemId)) {
          set({
            coins: coins - price,
            ownedItems: [...ownedItems, itemId],
            totalItemsPurchased: get().totalItemsPurchased + 1,
          });
          return true;
        }
        return false;
      },

      recordVisit: () => {
        const { lastVisit, consecutiveVisitDays } = get();
        const now = Date.now();
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

        set({
          lastVisit: now,
          consecutiveVisitDays: daysSince <= 1
            ? consecutiveVisitDays + 1
            : 1,
        });
      },

      incrementChatCount: () => set(state => ({
        totalChatCount: state.totalChatCount + 1,
      })),

      addDiaryEntry: (content, spiritState, duration) => {
        const entry: DiaryEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          content,
          spiritState,
          sessionDuration: duration,
          createdAt: Date.now(),
        };
        set(state => ({
          diaryEntries: [...state.diaryEntries, entry],
        }));
      },

      // Computed
      getSpiritState: () => {
        const { lastVisit, consecutiveVisitDays, totalChatCount } = get();
        const daysSince = Math.floor((Date.now() - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysSince >= 3) return 'tired';
        if (consecutiveVisitDays >= 3 || totalChatCount >= 5) return 'sparkling';
        return 'calm';
      },
    }),
    {
      name: 'healing-terrarium-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 9. API Specification

### 9.1 OpenAI Chat Completion API

#### Request

```typescript
// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // 해커톤용, 프로덕션에서는 서버 경유
});

interface ChatRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  stream?: boolean;
}

async function sendChatMessage(request: ChatRequest) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: TERRARIUM_SPIRIT_PROMPT },
      ...request.messages,
    ],
    stream: request.stream ?? true,
    max_tokens: 150,
    temperature: 0.8,
  });

  return response;
}
```

#### API Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `gpt-4o-mini` | 빠르고 저렴한 모델 |
| `max_tokens` | `150` | 짧은 응답 유도 |
| `temperature` | `0.8` | 자연스러운 변화 |
| `stream` | `true` | 타이핑 효과 |

#### Response (Streaming)

```typescript
// 스트리밍 청크 예시
{
  id: "chatcmpl-xxx",
  choices: [{
    delta: { content: "많이 " },
    finish_reason: null,
  }]
}

// 완료 시
{
  choices: [{
    delta: {},
    finish_reason: "stop",
  }]
}
```

#### Error Handling

```typescript
interface APIError {
  code: 'rate_limit' | 'invalid_api_key' | 'network_error' | 'unknown';
  message: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  rate_limit: '잠시 후 다시 시도해줘 🌿',
  invalid_api_key: '연결에 문제가 있어. 나중에 다시 올래?',
  network_error: '인터넷 연결을 확인해줘.',
  unknown: '뭔가 잘못됐어... 다시 시도해볼래?',
};
```

### 9.2 로컬 저장 API (AsyncStorage)

```typescript
// lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  GAME_STATE: 'healing-terrarium-game',
  CHAT_HISTORY: 'healing-terrarium-chat',
  SETTINGS: 'healing-terrarium-settings',
} as const;

// 저장
async function saveGameState(state: GameState): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEYS.GAME_STATE,
    JSON.stringify(state)
  );
}

// 로드
async function loadGameState(): Promise<GameState | null> {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.GAME_STATE);
  return data ? JSON.parse(data) : null;
}

// 초기화
async function clearAllData(): Promise<void> {
  await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
}
```

---

## 10. Technical Design

### 10.1 Tech Stack

| 영역 | 기술 | 버전 | 이유 |
|------|------|------|------|
| **Framework** | React Native + Expo | SDK 52 | 크로스 플랫폼 |
| **3D** | expo-three + three.js | 8.0 / 0.160 | 모바일 3D |
| **AI** | OpenAI API | 4.28 | GPT-4o-mini |
| **State** | Zustand | 5.0 | 간단한 상태 관리 |
| **Storage** | AsyncStorage | 2.0 | 로컬 영구 저장 |
| **Styling** | NativeWind | 4.0 | Tailwind for RN |
| **Animation** | Reanimated 3 | 3.16 | 네이티브 애니메이션 |
| **UI** | @gorhom/bottom-sheet | 5.0 | 바텀시트 |
| **Navigation** | Expo Router | 4.0 | 파일 기반 라우팅 |
| **Build** | EAS Build | - | iOS/Android 빌드 |

### 10.2 폴더 구조

```
app/
├── (tabs)/
│   ├── _layout.tsx         # 탭 네비게이션
│   ├── index.tsx           # 메인 (3D 테라리움)
│   └── diary.tsx           # 일기 목록 (P1)
├── _layout.tsx             # 루트 레이아웃
└── +not-found.tsx          # 404

components/
├── Terrarium/
│   ├── TerrariumScene.tsx  # GLView 3D 씬
│   ├── GlassJar.tsx        # 유리병
│   ├── Soil.tsx            # 흙
│   ├── items/              # 3D 아이템들
│   │   ├── Moss.tsx
│   │   ├── Succulent.tsx
│   │   ├── Mushroom.tsx
│   │   ├── Pebbles.tsx
│   │   ├── Crystal.tsx
│   │   └── FairyLight.tsx
│   └── Terrarium2DFallback.tsx
├── Chat/
│   ├── ChatBottomSheet.tsx
│   ├── ChatMessage.tsx
│   ├── ChatInput.tsx
│   └── TypingIndicator.tsx
├── Spirit/
│   ├── SpiritStatus.tsx    # 정령 상태 표시
│   └── SpiritGreeting.tsx  # 인사 말풍선
├── Shop/
│   ├── ShopBottomSheet.tsx
│   └── ItemCard.tsx        # 감정 기능 표시
├── Diary/
│   ├── DiaryModal.tsx      # 1줄 일기 입력
│   └── DiarySuggestions.tsx
└── UI/
    ├── CoinCounter.tsx
    ├── ActionButton.tsx
    └── EndSessionButton.tsx  # "오늘은 여기까지"

stores/
├── gameStore.ts            # 게임 상태
├── chatStore.ts            # 채팅 상태
└── sessionStore.ts         # 세션 상태

hooks/
├── useCoinTimer.ts
├── useChat.ts
├── useSpiritState.ts
└── useDiarySuggestions.ts

lib/
├── items.ts                # 아이템 데이터
├── prompts.ts              # AI 프롬프트
├── questions.ts            # 오늘의 질문
├── spiritResponses.ts      # 정령 반응 멘트
├── openai.ts               # OpenAI 클라이언트
└── storage.ts              # AsyncStorage 유틸

types/
├── game.ts
├── chat.ts
└── items.ts
```

---

## 11. Implementation Phases

### Phase 1: 환경 설정 (20분)

- [ ] Expo 프로젝트 생성
- [ ] 패키지 설치 (expo-three, openai, zustand, nativewind)
- [ ] 폴더 구조 생성
- [ ] 환경변수 설정

**Commit**: `chore: initial project setup`

### Phase 2: 3D 테라리움 + 기본 UI (1시간 20분)

**병렬 작업**:
```
Agent 1 (FE-1): TerrariumScene + GlassJar + Soil
Agent 2 (FE-1): 아이템 3D (Moss, Succulent, Mushroom, Pebbles)
Agent 3 (FE-2): CoinCounter + ActionButtons + ShopBottomSheet
Agent 4 (FE-2): gameStore + AsyncStorage 연동
```

- [ ] TerrariumScene.tsx (GLView)
- [ ] GlassJar.tsx (투명 유리병)
- [ ] Soil.tsx (흙 바닥)
- [ ] 아이템 4종 (이끼, 다육이, 버섯, 자갈)
- [ ] CoinCounter
- [ ] ShopBottomSheet (감정 기능 표시)
- [ ] gameStore + useCoinTimer

**Commit**: `feat: implement 3D terrarium and shop`

### Phase 3: AI 챗봇 + 정령 시스템 (1시간 20분)

**병렬 작업**:
```
Agent 1 (AI-1): OpenAI 연동 + useChat 훅
Agent 2 (AI-1): ChatBottomSheet + ChatMessage
Agent 3 (FE-2): SpiritStatus + SpiritGreeting
Agent 4 (AI-2): 프롬프트 + 질문 + 반응 멘트
```

- [ ] OpenAI 클라이언트 설정
- [ ] 시스템 프롬프트 (강화된 힐링 룰)
- [ ] useChat 훅 (스트리밍)
- [ ] ChatBottomSheet
- [ ] SpiritStatus (3단계)
- [ ] 오늘의 질문 20개
- [ ] 정령 반응 멘트

**Commit**: `feat: implement AI chatbot and spirit system`

### Phase 4: 감정 루틴 + 폴리싱 (1시간)

- [ ] "오늘은 여기까지" 버튼
- [ ] 1줄 일기 모달 (2개 후보)
- [ ] 아이템 구매 시 정령 반응
- [ ] 정령 상태 변화 로직
- [ ] 애니메이션 (코인, 구매)
- [ ] 햅틱 피드백

**Commit**: `feat: implement emotional routine system`

### Phase 5: 마무리 (30분)

- [ ] iOS/Android 테스트
- [ ] 전체 플로우 테스트
- [ ] 버그 수정
- [ ] 데모 시나리오 확인

**Commit**: `feat: finalize for hackathon`

---

## 12. Demo Scenarios

### Scenario 1: 첫 만남 + 감상 (1분)

1. 앱 실행 → 3D 테라리움 로드
2. 초록이 인사 ("안녕, 나는 초록이야 🌱")
3. 정령 상태 확인 (고요)
4. 테라리움 터치 회전
5. 코인 +1 확인

### Scenario 2: 정령과 대화 (1분 30초)

1. 💬 대화 버튼
2. 오늘의 질문 ("오늘 하루 어땠어?")
3. "힘들었어" 입력
4. 공감 응답 확인 (조언 없이!)
5. 추가 대화 1턴

### Scenario 3: 꾸미기 + 마무리 (1분)

1. 🛒 상점 열기
2. 버섯 구매 (감정 기능 "기운이 필요할 때")
3. 초록이 반응 ("오늘 힘이 필요했구나 🍄")
4. "오늘은 여기까지" 버튼
5. 1줄 일기 선택 → 저장

---

## 13. Success Metrics

| Metric | Target | 측정 방법 |
|--------|--------|----------|
| 데모 완주 | 3개 시나리오 100% | 해커톤 테스트 |
| 앱 로딩 | < 4초 | 실제 디바이스 |
| AI 응답 시작 | < 1.5초 | 첫 토큰 도착 |
| 공감 응답 품질 | 조언 없음 | 수동 검증 |
| 버그 | 0 critical | QA 테스트 |

---

## 14. Risk & Mitigation

| Risk | 확률 | 영향 | 대응 |
|------|------|------|------|
| **expo-three 호환성** | 중 | 고 | 단순 geometry만 |
| **OpenAI 속도** | 중 | 중 | 스트리밍으로 체감 개선 |
| **시간 부족** | 고 | 고 | 아래 Fallback |
| **API 키 노출** | 중 | 중 | 해커톤용 허용, 프로덕션에서 서버 경유 |

### Fallback Plan (14:00 기준)

| 상황 | 대응 |
|------|------|
| 3D 미완성 | 2D 이미지 + 이모지 |
| AI 미완성 | 하드코딩 인사 + 반응 |
| 정령 상태 미완성 | 고정 상태 |
| 일기 미완성 | 스킵 |

---

## 15. Team Assignment

| 역할 | 담당자 | Phase 집중 | 핵심 작업 |
|------|--------|------------|-----------|
| **FE-1** | 3D 리드 | Phase 2 | expo-three, 아이템 |
| **FE-2** | 상태/로직 | Phase 2, 4 | Zustand, 일기 |
| **AI-1** | AI 리드 | Phase 3 | OpenAI, 채팅 |
| **AI-2** | 콘텐츠/QA | Phase 3, 5 | 프롬프트, 데모 |

---

## 16. Appendix

### A. 포토카드 공유 (P1)

```typescript
// 테라리움 캡처 + 1줄 문구 합성
async function generatePhotoCard(
  terrariumImage: string,
  diaryContent: string,
): Promise<string> {
  // 이미지 위에 텍스트 오버레이
  // 엽서 형태로 저장/공유
}
```

### B. 랜덤 미니 이벤트 (P1)

| 이벤트 | 조건 | 비주얼 |
|--------|------|--------|
| 비 오는 날 | 랜덤 5% | 유리에 물방울 |
| 바람 부는 날 | 랜덤 5% | 이끼 흔들림 |
| 잠든 정령 | 30초 비활동 | 눈 감은 표정 |

### C. "좋은 말 보관함" (P2)

```typescript
interface SavedQuote {
  id: string;
  content: string;     // 정령의 한 줄
  savedAt: number;
  context?: string;    // 어떤 대화에서
}
```

---

## Sources

테라리움 아이템 참고:
- [Amazon Terrarium Decorations](https://www.amazon.com/terrarium-decorations/s?k=terrarium+decorations)
- [어포레스트 테라리움](https://afforest.co.kr/)
- [비오스샵](https://biosshop.co.kr/category/%ED%85%8C%EB%9D%BC%EB%A6%AC%EC%9B%80/87/)
- [미미네아쿠아](https://mimineaqua.co.kr/category/%EC%84%B8%ED%8A%B8%EC%83%81%ED%92%88-diy%EC%83%81%ED%92%88/423/)
- [Fairy Homes and Gardens](https://www.fairyhomesandgardens.com/terrarium-micro-minis/)

---

```
💡 PRD v5.0 (Emotional Healing Edition) 완성

핵심 추가:
✅ 정령 상태 3단계 (고요/지침/반짝임)
✅ 1줄 일기 시스템
✅ "오늘은 여기까지" 버튼
✅ 감정 기능 아이템 6종
✅ 강화된 힐링 프롬프트
✅ 오늘의 질문 20개
✅ 정령 반응 멘트 풀

→ 구현: "/implement healing-terrarium"
```
