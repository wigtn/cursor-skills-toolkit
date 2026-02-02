# Healing Terrarium PRD

> **Version**: 4.0 (3D Mobile + AI Chatbot)
> **Created**: 2026-02-02
> **Updated**: 2026-02-02
> **Status**: Ready for Implementation
> **Features**: 3D 테라리움 + AI 힐링 챗봇
> **Platform**: **iOS/Android 모바일 앱**
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)
> **실제 코딩 시간**: 5시간 (11:00~16:00)

---

## 1. Overview

### 1.1 한 줄 정의

**"나만의 3D 테라리움을 키우며 AI와 힐링 대화를 나누는 모바일 앱"**

### 1.2 핵심 차별점

| 영역 | 기능 |
|------|------|
| **3D 테라리움** | 유리병 안의 미니 정원, 식물/돌/이끼 배치 |
| **AI 챗봇** | 테라리움 정령과 힐링 대화 (GPT-4o-mini) |
| **모바일 네이티브** | React Native + Expo로 iOS/Android 지원 |
| **게임** | 코인 수집 → 식물/장식 구매 → 테라리움 꾸미기 |

**핵심 기술**:
- **React Native + Expo** (크로스 플랫폼 모바일)
- **Three.js + expo-three** (모바일 3D 렌더링)
- **OpenAI Chat Completion API (GPT-4o-mini)**
- Streaming 응답 (실시간 타이핑 효과)

### 1.3 Problem Statement

현대인은 항상 무언가를 해야 한다는 압박감에 시달린다. 게임조차 클리어, 랭킹, 보상 획득에 쫓긴다. **작은 자연을 손 안에 담고, 누군가와 대화하고 싶은 욕구**가 있다.

### 1.4 Goals

| 목표 | 설명 |
|------|------|
| **힐링** | 테라리움을 바라보며 긴장을 풀고 편안함을 느끼게 한다 |
| **AI 대화** | 테라리움 정령과 대화하며 위로와 공감을 받는다 |
| **소유감** | 나만의 작은 정원을 키우는 성취감 |
| **모바일 경험** | 언제 어디서나 손 안의 힐링 |
| **해커톤 완성** | 5시간 내 데모 가능한 수준으로 완성 |

### 1.5 Non-Goals (Out of Scope)

- 멀티플레이어
- 리더보드/랭킹
- 복잡한 게임 메카닉
- 사운드 (시간 제약상 제외, 향후 추가)
- 웹 버전 (모바일 앱만)

### 1.6 Scope

| 포함 (MVP) | 제외 (Phase 2) |
|------------|----------------|
| **3D 테라리움 (유리병 + 식물)** | 배경음악/효과음 |
| **AI 힐링 챗봇 (GPT-4o-mini)** | 음성 대화 (TTS/STT) |
| **스트리밍 응답 (타이핑 효과)** | 대화 히스토리 저장 |
| 자동 코인 수집 (10초/1코인) | 테라리움 종류 선택 |
| 상점 (이끼, 다육식물, 돌, 버섯) | 시즌 이벤트 |
| 꾸미기 적용 | 식물 성장 시스템 |
| 로컬 저장 (AsyncStorage) | 클라우드 저장 |
| **iOS/Android 앱** | 태블릿 최적화 |

---

## 2. User Stories

### 2.1 Primary User

**페르소나**: 지친 직장인, 학생, 잠들기 전 핸드폰 보는 사람, 식물 키우기 좋아하는 사람

> As a **바쁜 일상 속 힐링이 필요한 현대인**,
> I want to **손 안의 작은 정원을 키우며 누군가와 대화하고 싶어서**,
> So that **마음의 평화와 위로를 얻고 싶다**.

### 2.2 Core User Scenarios

#### Scenario 1: 첫 실행
```gherkin
Given 사용자가 처음 Healing Terrarium 앱을 실행했을 때
When 메인 화면이 로드되면
Then 유리병 안의 3D 테라리움이 표시된다
And 코인 카운터가 0에서 시작한다
And 10초 후 첫 번째 코인이 추가된다
And 테라리움이 천천히 회전한다 (터치로 조작 가능)
```

#### Scenario 2: 상점에서 구매
```gherkin
Given 사용자가 10코인 이상 보유했을 때
When 상점 버튼을 누르고 "다육식물" 아이템을 선택하면
Then 10코인이 차감된다
And 테라리움에 다육식물이 추가된다
And "구매 완료" 피드백이 표시된다 (햅틱 진동)
```

#### Scenario 3: 테라리움 정령과 대화
```gherkin
Given 사용자가 메인 화면에서 채팅 버튼을 눌렀을 때
When 채팅 패널이 열리면
Then 정령이 먼저 인사를 건넨다 ("안녕, 오늘 하루는 어땠어?")
And 사용자가 메시지를 입력하면
Then 정령이 천천히 타이핑하며 공감하는 답변을 한다
And 답변은 따뜻하고 위로가 되는 톤이다
```

#### Scenario 4: 스트리밍 응답
```gherkin
Given 사용자가 긴 고민을 입력했을 때
When AI가 응답을 생성하면
Then 글자가 하나씩 타이핑되듯 나타난다 (스트리밍)
And 전체 응답이 완료되면 입력창이 다시 활성화된다
```

---

## 3. Functional Requirements

### 3.1 핵심 기능 (P0 - Must Have)

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| FR-001 | **3D 테라리움** | 유리병 + 식물/돌 표시, 터치 회전 | P0 |
| FR-002 | 자동 코인 수집 | 10초마다 1코인 자동 추가 | P0 |
| FR-003 | 코인 카운터 | 현재 보유 코인 표시 (우상단) | P0 |
| FR-004 | 상점 UI | 아이템 목록, 가격, 구매 버튼 (바텀시트) | P0 |
| FR-005 | 아이템 적용 | 구매한 아이템이 테라리움에 추가됨 | P0 |
| FR-006 | 로컬 저장 | 코인, 구매 아이템 AsyncStorage 저장 | P0 |
| **FR-007** | **AI 챗봇 UI** | **채팅 패널 (바텀시트), 메시지 입력** | **P0** |
| **FR-008** | **AI 응답 생성** | **OpenAI GPT-4o-mini로 힐링 응답** | **P0** |
| **FR-009** | **스트리밍 응답** | **타이핑 효과로 글자가 하나씩 나타남** | **P0** |

### 3.2 부가 기능 (P1 - Should Have)

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| FR-010 | 구매 애니메이션 | 아이템 적용 시 scale 0→1 효과 | P1 |
| FR-011 | 모바일 최적화 | dpr 제한, 성능 자동 조절 | P1 |
| FR-012 | 2D 폴백 | WebGL 미지원 시 2D 이미지 표시 | P1 |
| FR-013 | 대화 초기 인사 | 채팅 열면 돌이 먼저 인사 | P1 |

### 3.3 선택 기능 (P2 - Nice to Have)

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| FR-014 | 개미 이벤트 | 2분 방치 시 개미 애니메이션 | P2 |
| FR-015 | 시간대별 배경 | Environment preset 변경 | P2 |
| FR-016 | 대화 히스토리 저장 | 이전 대화 localStorage 저장 | P2 |

---

## 4. Non-Functional Requirements

### 4.1 Performance (3D + AI)

| 항목 | 목표 | 비고 |
|------|------|------|
| 초기 로딩 | < **4초** | 3D 씬 포함 (Three.js ~500KB) |
| 3D 씬 렌더 | < **3초** | lazy loading 적용 |
| **AI 첫 토큰** | < **1초** | 스트리밍 시작까지 |
| **AI 전체 응답** | < **5초** | 평균 응답 완료 |
| 코인 업데이트 | 정확히 10초 간격 | - |
| 애니메이션 | 60fps 유지 | 모바일: 30fps 허용 |

**로딩 최적화**:
- `dynamic import`로 Canvas lazy loading
- `<Suspense>`로 로딩 스피너 표시
- Environment preset: `studio` (경량)

**AI 최적화**:
- 스트리밍으로 체감 속도 향상
- GPT-4o-mini 사용 (빠르고 저렴)

### 4.2 Accessibility

| 항목 | 구현 |
|------|------|
| 색상 대비 | 4.5:1 이상 |
| 키보드 | Tab으로 상점 접근 가능 |
| 스크린리더 | 코인 수, 아이템 정보 읽기 가능 |

### 4.3 Browser Support

- Chrome 90+
- Safari 14+
- Firefox 90+
- Edge 90+

---

## 5. Technical Design

### 5.1 Tech Stack

| 영역 | 기술 | 이유 |
|------|------|------|
| **Framework** | **React Native + Expo** | **크로스 플랫폼 모바일 개발** |
| **3D Engine** | **expo-three + Three.js** | **모바일 3D 렌더링** |
| **3D View** | **expo-gl (GLView)** | **OpenGL 컨텍스트** |
| **AI** | **OpenAI GPT-4o-mini** | **빠르고 저렴한 힐링 대화** |
| **Navigation** | **Expo Router** | **파일 기반 라우팅** |
| Styling | NativeWind (Tailwind) | 유틸리티 기반 빠른 스타일링 |
| State | Zustand | 간단한 전역 상태 관리 |
| Animation | Reanimated 3 | 네이티브 성능 애니메이션 |
| Storage | AsyncStorage | 로컬 데이터 저장 |
| **Build** | **EAS Build** | **iOS/Android 빌드** |

### 5.2 핵심 패키지

```typescript
// Expo + React Native
"expo": "~52.0.0",
"react-native": "0.76.x",
"expo-router": "~4.0.0",

// 3D (모바일)
"expo-gl": "~15.0.0",              // OpenGL 컨텍스트
"expo-three": "^8.0.0",            // Three.js Expo 래퍼
"three": "^0.160.0",               // Three.js 코어

// AI 챗봇
"openai": "^4.28.0",               // OpenAI API 클라이언트

// 스타일 + 애니메이션
"nativewind": "^4.0.0",            // Tailwind for RN
"react-native-reanimated": "~3.16.0",

// 저장
"@react-native-async-storage/async-storage": "^2.0.0",
```

### 5.3 Folder Structure (Expo Router)

```
app/                          # Expo Router (파일 기반 라우팅)
├── (tabs)/
│   ├── _layout.tsx           # 탭 네비게이션 레이아웃
│   ├── index.tsx             # 메인 (3D 테라리움)
│   └── shop.tsx              # 상점 탭
├── chat.tsx                  # 채팅 화면 (모달)
└── _layout.tsx               # 루트 레이아웃

components/
├── Terrarium/                # 3D 테라리움
│   ├── TerrariumScene.tsx    # 메인 3D 씬 (GLView)
│   ├── GlassJar.tsx          # 유리병 모델
│   ├── Plant.tsx             # 식물 모델 (다육이 등)
│   ├── Rock.tsx              # 돌 모델
│   ├── Moss.tsx              # 이끼 모델
│   └── Soil.tsx              # 흙/모래 바닥
├── Chat/                     # AI 챗봇
│   ├── ChatBottomSheet.tsx   # 채팅 바텀시트
│   ├── ChatMessage.tsx       # 메시지 버블
│   ├── ChatInput.tsx         # 입력창 + 전송 버튼
│   └── TypingIndicator.tsx   # 타이핑 중... 표시
├── UI/
│   ├── CoinCounter.tsx       # 코인 표시
│   ├── ActionButton.tsx      # FAB 버튼들
│   ├── ShopBottomSheet.tsx   # 상점 바텀시트
│   └── ItemCard.tsx          # 상점 아이템 카드
└── common/
    └── SafeAreaView.tsx      # 안전 영역 래퍼

stores/
├── gameStore.ts              # 게임 상태 (코인, 아이템)
└── chatStore.ts              # 채팅 상태 (메시지 목록)

hooks/
├── useCoinTimer.ts           # 코인 타이머 훅
├── useAsyncStorage.ts        # AsyncStorage 동기화
└── useChat.ts                # AI 채팅 훅

lib/
├── items.ts                  # 아이템 데이터 (식물, 돌, 장식)
├── openai.ts                 # OpenAI 클라이언트
├── prompts.ts                # 시스템 프롬프트 (정령 캐릭터)
└── three/
    └── terrariumSetup.ts     # Three.js 씬 설정

types/
├── game.ts                   # 게임 타입
└── chat.ts                   # 채팅 타입
```

### 5.4 State Schema (Zustand)

```typescript
// stores/gameStore.ts
interface GameState {
  // 코인
  coins: number;
  addCoin: () => void;
  spendCoins: (amount: number) => boolean;

  // 테라리움 아이템
  ownedItems: string[];  // ['succulent', 'moss', 'rock']
  purchaseItem: (itemId: string) => boolean;

  // 저장/로드
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

// stores/chatStore.ts
interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
```

### 5.5 AI System Prompt (테라리움 정령)

```typescript
// lib/prompts.ts
export const TERRARIUM_SPIRIT_PROMPT = `
당신은 테라리움 속에 사는 작은 정령입니다.
이름은 "초록이"이고, 따뜻하고 공감 능력이 뛰어납니다.

성격:
- 항상 긍정적이고 따뜻한 말투
- 사용자의 감정에 깊이 공감
- 자연과 식물에 대한 애정
- 가끔 귀여운 이모지 사용 🌱✨

대화 스타일:
- 짧고 따뜻한 문장 (2-3문장)
- 질문으로 대화 이어가기
- 판단하지 않고 경청
- 힐링과 위로에 집중

금지:
- 의학/법률/재정 조언 하지 않기
- 부정적이거나 비판적인 말
- 너무 긴 답변

예시:
사용자: 오늘 너무 힘들었어
정령: 오늘 정말 수고 많았구나 🌿 네 이야기 들려줄래? 나는 여기서 네 옆에 있을게.
`;
```

### 5.6 Item Data (테라리움 아이템)

```typescript
// lib/items.ts
export const ITEMS = [
  {
    id: 'succulent',
    name: '다육이',
    nameEn: 'Succulent',
    price: 10,
    description: '작고 귀여운 다육식물',
    emoji: '🪴',
    position3D: { x: 0.3, y: 0.2, z: 0.2 },
    render3D: 'succulentPlant',  // 로제트 형태
    complexity: 1,  // ⭐ MVP
  },
  {
    id: 'moss',
    name: '이끼',
    nameEn: 'Moss',
    price: 8,
    description: '부드러운 초록 이끼',
    emoji: '🌿',
    position3D: { x: -0.2, y: 0.1, z: 0.3 },
    render3D: 'mossCluster',  // 여러 작은 구체
    complexity: 1,  // ⭐ MVP
  },
  {
    id: 'pebbles',
    name: '자갈',
    nameEn: 'Pebbles',
    price: 5,
    description: '예쁜 색깔 자갈',
    emoji: '🪨',
    position3D: { x: 0, y: 0.05, z: -0.2 },
    render3D: 'pebbleCluster',
    complexity: 1,  // ⭐ MVP
  },
  {
    id: 'mushroom',
    name: '버섯',
    nameEn: 'Mushroom',
    price: 15,
    description: '귀여운 빨간 버섯',
    emoji: '🍄',
    position3D: { x: -0.4, y: 0.15, z: 0 },
    render3D: 'mushroomShape',
    complexity: 1,  // ⭐ MVP
  },
  {
    id: 'crystal',
    name: '크리스탈',
    nameEn: 'Crystal',
    price: 25,
    description: '반짝이는 작은 수정',
    emoji: '💎',
    position3D: { x: 0.5, y: 0.1, z: -0.3 },
    render3D: 'crystalShape',
    complexity: 2,  // ⭐⭐ P2
  },
] as const;

// MVP 아이템 (P0): succulent, moss, pebbles, mushroom
// Phase 2 아이템: crystal
```

### 3D 테라리움 구현 가이드

| 아이템 | 3D 구현 | geometry | 복잡도 |
|--------|---------|----------|--------|
| 🪴 다육이 | 로제트 형태 (여러 타원) | sphereGeometry + scale | ⭐ |
| 🌿 이끼 | 초록 구체 클러스터 | sphereGeometry | ⭐ |
| 🪨 자갈 | 다양한 색 작은 구체 | sphereGeometry | ⭐ |
| 🍄 버섯 | 반구(갓) + 원기둥(줄기) | sphere + cylinder | ⭐ |
| 💎 크리스탈 | 다면체 | octahedronGeometry | ⭐⭐ |

### 5.7 Core Components (3D 모바일)

#### TerrariumScene.tsx (메인 3D 씬)
```typescript
// components/Terrarium/TerrariumScene.tsx
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';

export function TerrariumScene({ items }: { items: string[] }) {
  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 100);
    camera.position.set(0, 2, 5);

    // 조명
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 유리병 (투명 구체)
    const jarGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const jarMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      transmission: 0.9,
    });
    const jar = new THREE.Mesh(jarGeometry, jarMaterial);
    scene.add(jar);

    // 흙 바닥
    const soilGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 32);
    const soilMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const soil = new THREE.Mesh(soilGeometry, soilMaterial);
    soil.position.y = -1;
    scene.add(soil);

    // 아이템 추가
    items.forEach(itemId => {
      const itemMesh = createItemMesh(itemId);
      if (itemMesh) scene.add(itemMesh);
    });

    // 렌더 루프
    const animate = () => {
      requestAnimationFrame(animate);
      jar.rotation.y += 0.005;  // 자동 회전
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={onContextCreate}
    />
  );
}
```

#### GlassJar.tsx (유리병)
```typescript
// 투명한 구형 유리병
// MeshPhysicalMaterial로 유리 재질 표현
// transmission: 0.9 (투명도)
```

#### Succulent.tsx (다육식물)
```typescript
// 로제트 형태 - 여러 개의 납작한 구체
// 연두색 그라데이션
// 중앙이 높고 바깥이 낮음
```

### 5.8 AI Chat API (OpenAI)

#### useChat.ts (채팅 훅)
```typescript
// hooks/useChat.ts
import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { TERRARIUM_SPIRIT_PROMPT } from '@/lib/prompts';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // OpenAI API 호출 (스트리밍)
      const stream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: TERRARIUM_SPIRIT_PROMPT },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content },
        ],
        stream: true,
        max_tokens: 200,
      });

      // 스트리밍 응답 처리
      let assistantContent = '';
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        assistantContent += delta;
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMessage.id
              ? { ...m, content: assistantContent }
              : m
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, sendMessage, isLoading };
}
```

#### ChatBottomSheet.tsx (채팅 UI)
```typescript
// components/Chat/ChatBottomSheet.tsx
import BottomSheet from '@gorhom/bottom-sheet';
import { FlatList, TextInput, TouchableOpacity } from 'react-native';

export function ChatBottomSheet() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');

  return (
    <BottomSheet snapPoints={['50%', '90%']}>
      {/* 메시지 목록 */}
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        inverted
      />

      {/* 입력창 */}
      <View className="flex-row p-4 border-t">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2"
          value={input}
          onChangeText={setInput}
          placeholder="정령에게 말해보세요..."
        />
        <TouchableOpacity
          onPress={() => {
            sendMessage(input);
            setInput('');
          }}
          disabled={isLoading || !input.trim()}
        >
          <Text>전송</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
```

#### ChatMessage.tsx (메시지 버블)
```typescript
// 사용자: 오른쪽 정렬, 초록색 배경
// 정령: 왼쪽 정렬, 회색 배경, 아바타 🌱 표시
// 타이핑 중: "..." 애니메이션
```

#### 환경변수 설정
```bash
# .env
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

---

## 6. UI/UX Design

### 6.1 Design System

#### Color Palette (Terrarium)

```
배경:         #1A1A2E  - 딥 네이비 (테라리움 강조)
유리병:       rgba(255,255,255,0.2) - 투명 유리
흙:           #8B4513  - 갈색 흙
식물:         #228B22  - 포레스트 그린
다육이:       #90EE90  - 연두색
텍스트:       #FFFFFF  - 흰색
강조:         #7C9A6E  - 이끼 그린
코인:         #FFD700  - 골드
채팅 버블:    #E8F5E9  - 연한 초록 (정령)
```

#### Typography (Mobile)

```
제목: System Font (SF Pro / Roboto)
본문: System Font
숫자: Tabular Nums (코인 카운터)
채팅: System Font 16px
```

#### Spacing (8pt Grid)

```
기본 단위: 8px
Safe Area: 시스템 기본값
컨테이너 패딩: 16px
컴포넌트 간격: 12px
버튼 높이: 48px (터치 영역)
```

### 6.2 Main Screen Layout (Mobile)

```
┌─────────────────────────────────────┐
│ ◀ Safe Area Top ▶                  │
├─────────────────────────────────────┤
│  🌱 Healing Terrarium    🪙 42     │  ← 헤더
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────┐            │
│         │   🫙        │            │
│         │  ┌───────┐  │            │  ← 3D 테라리움
│         │  │🪴 🌿  │  │            │     (터치로 회전)
│         │  │  🍄🪨 │  │            │
│         │  └───────┘  │            │
│         └─────────────┘            │
│                                     │
├─────────────────────────────────────┤
│   [ 💬 대화 ]     [ 🛒 상점 ]      │  ← FAB 버튼들
└─────────────────────────────────────┘
```

### 6.3 Chat Bottom Sheet

```
┌─────────────────────────────────────┐
│ ────────── 드래그 핸들 ──────────  │
├─────────────────────────────────────┤
│ 🌱 초록이 (정령)                    │
│ "안녕! 오늘 하루는 어땠어?"         │
├─────────────────────────────────────┤
│                                     │
│   ┌───────────────────────┐         │
│   │ 힘들었어...           │ (User)  │
│   └───────────────────────┘         │
│                                     │
│ ┌───────────────────────┐           │
│ │ 많이 지쳤구나 🌿      │ (정령)   │
│ │ 네 이야기 들려줄래?   │          │
│ └───────────────────────┘           │
│                                     │
├─────────────────────────────────────┤
│ ┌───────────────────────────────┐   │
│ │ 정령에게 말해보세요...        │   │
│ └───────────────────────────────┘ ▶ │
└─────────────────────────────────────┘
```

### 6.4 Shop Bottom Sheet

```
┌─────────────────────────────────────┐
│ ────────── 드래그 핸들 ──────────  │
│           🛒 상점        🪙 42     │
├─────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐          │
│  │  🪴     │  │  🌿     │          │
│  │ 다육이  │  │  이끼   │          │
│  │  10🪙   │  │  8🪙    │          │
│  │ [구매]  │  │ [구매]  │          │
│  └─────────┘  └─────────┘          │
│  ┌─────────┐  ┌─────────┐          │
│  │  🪨     │  │  🍄     │          │
│  │  자갈   │  │  버섯   │          │
│  │  5🪙    │  │  15🪙   │          │
│  │ [구매]  │  │ [구매]  │          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
```

---

## 7. Implementation Phases (Mobile 3D + AI)

### Phase 1: 환경 설정 (20분)

- [ ] Expo 프로젝트 생성 (`npx create-expo-app`)
- [ ] expo-three, expo-gl 설치
- [ ] NativeWind (Tailwind) 설정
- [ ] Zustand, Reanimated 설치
- [ ] OpenAI 패키지 설치
- [ ] 폴더 구조 생성
- [ ] EAS 프로젝트 설정

**Commit**: `chore: initial Expo project setup`

### Phase 2: 3D 테라리움 + 핵심 UI (1시간 30분)

**Parallel Agents 활용**:

```
Agent 1: TerrariumScene + GlassJar + Soil (3D 핵심)
Agent 2: Succulent + Moss + Pebbles (3D 식물/장식)
Agent 3: CoinCounter + ActionButtons + 바텀시트 (UI)
Agent 4: gameStore + AsyncStorage + useCoinTimer (로직)
```

- [ ] **TerrariumScene.tsx (GLView 설정)**
- [ ] **GlassJar.tsx (투명 유리병)**
- [ ] **Soil.tsx (흙 바닥)**
- [ ] **Succulent.tsx, Moss.tsx, Pebbles.tsx**
- [ ] CoinCounter 컴포넌트
- [ ] ActionButton (대화, 상점)
- [ ] ShopBottomSheet
- [ ] gameStore (Zustand)
- [ ] AsyncStorage 연동

**Commit**: `feat: implement 3D terrarium and core UI`

### Phase 3: AI 챗봇 (1시간)

- [ ] OpenAI 클라이언트 설정
- [ ] 시스템 프롬프트 (초록이 정령)
- [ ] useChat 훅 (스트리밍)
- [ ] ChatBottomSheet
- [ ] ChatMessage 컴포넌트
- [ ] ChatInput 컴포넌트
- [ ] 타이핑 인디케이터

**Commit**: `feat: implement AI healing chatbot`

### Phase 4: 게임 로직 + 폴리싱 (45분)

- [ ] 코인 자동 수집 (10초/1코인)
- [ ] 아이템 구매 로직
- [ ] 구매 시 3D 아이템 추가
- [ ] 코인 추가 애니메이션
- [ ] 햅틱 피드백

**Commit**: `feat: implement game mechanics`

### Phase 5: 마무리 (30분)

- [ ] iOS/Android 테스트
- [ ] 전체 플로우 테스트
- [ ] 버그 수정
- [ ] EAS Build (개발 빌드)
- [ ] 데모 시나리오 확인

**Commit**: `feat: finalize for hackathon demo`

---

## 8. Demo Scenarios

### Scenario 1: 테라리움 감상 + 코인 수집 (1분)

1. 앱 실행
2. 3D 테라리움 표시 확인
3. 손가락으로 테라리움 회전
4. 10초 후 코인 +1 확인

### Scenario 2: AI 정령과 대화 (1분 30초)

1. 💬 대화 버튼 탭
2. 정령이 인사 ("안녕, 오늘 하루는 어땠어?")
3. "오늘 너무 힘들었어" 입력
4. 정령이 공감하는 답변 (스트리밍)
5. 추가 대화 1-2턴

### Scenario 3: 상점에서 꾸미기 (1분)

1. 코인 10개 이상 보유 상태
2. 🛒 상점 버튼 탭
3. "다육이" 아이템 구매
4. 테라리움에 다육이 추가 확인
5. 햅틱 피드백 느끼기

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 데모 완주 | 3개 시나리오 100% | 해커톤 당일 테스트 |
| 앱 로딩 | < 3초 | 실제 디바이스 |
| AI 응답 시작 | < 1초 | 스트리밍 첫 토큰 |
| 버그 없음 | 0 critical bugs | 수동 테스트 |
| iOS/Android | 둘 다 동작 | Expo Go 테스트 |

---

## 10. Risk & Mitigation (Mobile 3D + AI)

| Risk | 확률 | 영향 | 대응 |
|------|------|------|------|
| **🔴 OpenAI API 키 노출** | 중 | 고 | 환경변수 + .gitignore |
| **🔴 expo-three 호환성** | 중 | 고 | 단순 geometry만 사용 |
| **🟡 모바일 3D 성능** | 중 | 중 | LOD, 저해상도 옵션 |
| **🟡 스트리밍 구현** | 중 | 중 | 기본 fetch로 대체 가능 |
| AsyncStorage 용량 | 하 | 하 | 아이템 수 제한 |
| 시간 부족 | 중 | 고 | 챗봇 or 상점 중 하나만 |

### Fallback Plan (14:00 기준)

| 상황 | 대응 |
|------|------|
| **3D 테라리움 미완성** | **2D 이미지 + 이모지 오버레이** |
| **AI 챗봇 미완성** | **하드코딩된 인사말만** |
| **상점 미완성** | **테라리움 + 챗봇만 데모** |
| **빌드 실패** | **Expo Go로 데모** |

### API 키 보안

```typescript
// .env (gitignore에 추가)
EXPO_PUBLIC_OPENAI_API_KEY=sk-...

// ⚠️ 해커톤 데모용이므로 클라이언트 키 노출 허용
// 프로덕션에서는 서버 API 라우트 필수
```

---

## 11. Hackathon Presentation (3분 30초)

```
[0:00 - 0:30] 문제 제기
"바쁜 일상 속에서 잠깐이라도 쉬고 싶을 때,
누군가에게 힘들다고 말하고 싶을 때, 있지 않으셨나요?"

[0:30 - 1:00] 솔루션
"Healing Terrarium은 손 안의 작은 정원입니다.
3D 테라리움을 키우고, AI 정령 '초록이'와 힐링 대화를 나눠보세요."

[1:00 - 2:30] 라이브 데모
1. 앱 실행 → 3D 테라리움 (손가락으로 회전)
2. 💬 대화 버튼 → "오늘 힘들었어" 입력
3. 초록이 정령의 공감 응답 (스트리밍)
4. 🛒 상점 → 다육이 구매 → 테라리움에 추가

[2:30 - 3:00] 기술 스택 + 향후 계획
"React Native + Expo + Three.js + OpenAI GPT-4o-mini로
5시간 만에 크로스 플랫폼 3D AI 앱을 만들었습니다.
향후 ASMR 사운드, 식물 성장 시스템, AR 모드를 추가할 예정입니다."

[3:00 - 3:30] Q&A 대비
- "왜 테라리움?" → 돌봄과 힐링의 상징
- "AI 안전성?" → 의료/법률 조언 금지 프롬프트
- "수익 모델?" → 프리미엄 식물/테마 인앱 구매
```

---

## 12. Team Assignment (Mobile 3D + AI)

| 역할 | 담당자 | Phase 집중 | 핵심 기술 |
|------|--------|------------|-----------|
| **FE-1** | **3D 테라리움 리드** | Phase 2 | **expo-three, Three.js** |
| **FE-2** | 상태 관리, 게임 로직 | Phase 2, 4 | Zustand, AsyncStorage |
| **AI-1** | **AI 챗봇 리드** | Phase 3 | **OpenAI, 스트리밍** |
| **AI-2** | QA, 발표 준비 | Phase 4, 5 | 데모 시나리오 |

**사전 준비 필수**:
- FE-1: expo-three 공식 예제 실행 테스트
- AI-1: OpenAI API 스트리밍 테스트
- 참고: [expo-three GitHub](https://github.com/expo/expo-three)
- 참고: [OpenAI Node.js](https://github.com/openai/openai-node)

---

## Next Steps

1. **digging**: PRD 리뷰 및 개선점 분석
2. **Task Plan**: 상세 실행 계획 업데이트
3. **/implement**: 구현 시작

```
💡 PRD v4.0 (3D Mobile + AI Chatbot) 업데이트 완료

   → 바로 구현: "/implement healing-terrarium"
```
