# Stone Garden PRD

> **Version**: 2.1 (3D Edition + Digging 반영)
> **Created**: 2026-02-02
> **Updated**: 2026-02-02
> **Status**: Ready for Implementation
> **Digging**: ✅ 완료 (Critical 4개, Major 8개 반영)
> **Hackathon**: Cursor Seoul Hackathon (2026-02-07)
> **Team**: 4명 (AI-1, AI-2, FE-1, FE-2)
> **실제 코딩 시간**: 5시간 (11:00~16:00)

---

## 1. Overview

### 1.1 한 줄 정의

**"3D 돌을 바라보며 힐링하는 게임. 천천히 회전하는 돌, 코인을 모아 이끼로 꾸미세요."**

### 1.2 핵심 차별점 (3D)

| 기존 (2D) | 변경 (3D) |
|-----------|-----------|
| 정적 돌 이미지 | **Three.js 3D 돌 모델** |
| CSS 애니메이션 | **WebGL 기반 부드러운 회전** |
| 이모지 데코레이션 | **3D 오브젝트 (이끼, 꽃 등)** |
| 단순 배경 | **3D 환경 (모래, 조명)** |

**기술**: React Three Fiber (R3F) + Three.js + @react-three/drei

### 1.2 Problem Statement

현대인은 항상 무언가를 해야 한다는 압박감에 시달린다. 게임조차 클리어, 랭킹, 보상 획득에 쫓긴다. **"아무것도 안 해도 되는" 경험**이 필요하다.

### 1.3 Goals

| 목표 | 설명 |
|------|------|
| **힐링** | 플레이어가 긴장을 풀고 편안함을 느끼게 한다 |
| **미니멀** | 복잡한 조작 없이 바라보는 것만으로 만족감 제공 |
| **성취감** | 느린 속도로 쌓이는 코인과 꾸미기로 작은 성취감 |
| **해커톤 완성** | 5시간 내 데모 가능한 수준으로 완성 |

### 1.4 Non-Goals (Out of Scope)

- 멀티플레이어
- 리더보드/랭킹
- 복잡한 게임 메카닉
- 사운드 (시간 제약상 제외, 향후 추가)
- 모바일 앱 (웹만)

### 1.5 Scope

| 포함 (MVP) | 제외 (Phase 2) |
|------------|----------------|
| 돌 화면 (메인) | 배경음악/효과음 |
| 자동 코인 수집 (10초/1코인) | 돌 종류 선택 |
| 상점 (이끼, 꽃, 나비) | 시즌 이벤트 |
| 꾸미기 적용 | 돌 성장 시스템 |
| 개미 이벤트 (장시간 방치) | 소셜 공유 |
| 로컬 저장 (localStorage) | 클라우드 저장 |

---

## 2. User Stories

### 2.1 Primary User

**페르소나**: 지친 직장인, 학생, 잠들기 전 핸드폰 보는 사람

> As a **스트레스 받는 현대인**,
> I want to **아무것도 안 해도 되는 화면을 바라보고 싶어서**,
> So that **마음의 평화를 얻고 싶다**.

### 2.2 Core User Scenarios

#### Scenario 1: 첫 방문
```gherkin
Given 사용자가 처음 Stone Garden에 접속했을 때
When 메인 화면이 로드되면
Then 화면 중앙에 돌이 표시된다
And 코인 카운터가 0에서 시작한다
And 10초 후 첫 번째 코인이 추가된다
```

#### Scenario 2: 상점에서 구매
```gherkin
Given 사용자가 10코인 이상 보유했을 때
When 상점 버튼을 누르고 "이끼" 아이템을 선택하면
Then 10코인이 차감된다
And 돌에 이끼가 표시된다
And "구매 완료" 피드백이 표시된다
```

#### Scenario 3: 개미 이벤트
```gherkin
Given 사용자가 2분 이상 화면을 터치하지 않았을 때
When 개미 이벤트가 트리거되면
Then 화면 하단에서 개미가 천천히 지나간다
And 개미가 화면을 벗어나면 이벤트가 종료된다
```

---

## 3. Functional Requirements

### 3.1 핵심 기능 (P0 - Must Have)

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| FR-001 | 돌 화면 | 화면 중앙에 돌 이미지 표시 | P0 |
| FR-002 | 자동 코인 수집 | 10초마다 1코인 자동 추가 | P0 |
| FR-003 | 코인 카운터 | 현재 보유 코인 표시 (우상단) | P0 |
| FR-004 | 상점 UI | 아이템 목록, 가격, 구매 버튼 | P0 |
| FR-005 | 아이템 적용 | 구매한 아이템이 돌에 표시됨 | P0 |
| FR-006 | 로컬 저장 | 코인, 구매 아이템 localStorage 저장 | P0 |

### 3.2 부가 기능 (P1 - Should Have)

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| FR-007 | 구매 애니메이션 | 아이템 적용 시 scale 0→1 효과 | P1 |
| FR-008 | 모바일 최적화 | dpr 제한, 성능 자동 조절 | P1 |
| FR-009 | 2D 폴백 | WebGL 미지원 시 2D 이미지 표시 | P1 |

### 3.3 선택 기능 (P2 - Nice to Have)

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| FR-010 | 개미 이벤트 | 2분 방치 시 개미 애니메이션 | **P2** ⬇️ |
| FR-011 | 시간대별 배경 | Environment preset 변경 | **P2** ⬇️ |
| FR-012 | 클릭 이펙트 | 돌 클릭 시 작은 파동 효과 | P2 |

---

## 4. Non-Functional Requirements

### 4.1 Performance (3D 조정)

| 항목 | 목표 | 비고 |
|------|------|------|
| 초기 로딩 | < **4초** | 3D 씬 포함 (Three.js ~500KB) |
| 3D 씬 렌더 | < **3초** | lazy loading 적용 |
| 코인 업데이트 | 정확히 10초 간격 | - |
| 애니메이션 | 60fps 유지 | 모바일: 30fps 허용 |

**로딩 최적화**:
- `dynamic import`로 Canvas lazy loading
- `<Suspense>`로 로딩 스피너 표시
- Environment preset: `studio` (경량)

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
| Framework | Next.js 16 (App Router) | 빠른 개발, Vercel 배포 |
| **3D Engine** | **React Three Fiber (R3F)** | **React 친화적 Three.js 래퍼** |
| **3D Helpers** | **@react-three/drei** | **OrbitControls, 조명, 프리셋** |
| Styling | TailwindCSS v4 | 유틸리티 기반 빠른 스타일링 |
| State | Zustand | 간단한 전역 상태 관리 |
| Animation | Framer Motion (UI) | 선언적 UI 애니메이션 |
| Storage | localStorage | 서버 불필요, 즉시 저장 |
| Deploy | Vercel | 원클릭 배포 |

### 5.2 3D 기술 상세

```typescript
// 핵심 패키지
"@react-three/fiber": "^8.15.0",   // React Three Fiber
"@react-three/drei": "^9.88.0",    // 유틸리티 (OrbitControls, Environment 등)
"three": "^0.160.0",               // Three.js 코어

// 선택 (시간 여유 시)
"@react-three/postprocessing": "^2.15.0"  // 후처리 효과
```

### 5.3 Folder Structure

```
src/
├── app/
│   ├── page.tsx              # 메인 (3D 돌 화면)
│   ├── shop/
│   │   └── page.tsx          # 상점 페이지
│   └── layout.tsx
├── components/
│   ├── Scene/                # 🆕 3D 씬 관련
│   │   ├── StoneScene.tsx    # 메인 3D 씬 (Canvas)
│   │   ├── Stone3D.tsx       # 3D 돌 모델
│   │   ├── Decorations3D.tsx # 3D 데코레이션 (이끼, 꽃 등)
│   │   ├── Ground.tsx        # 모래/바닥
│   │   ├── Lighting.tsx      # 조명 설정
│   │   └── CameraController.tsx # 카메라 컨트롤
│   ├── UI/
│   │   ├── CoinCounter.tsx   # 코인 표시 (HTML)
│   │   ├── ShopButton.tsx    # 상점 버튼 (HTML)
│   │   └── ItemCard.tsx      # 상점 아이템 카드
│   └── Events/
│       └── AntEvent.tsx      # 개미 애니메이션 (2D 오버레이)
├── stores/
│   └── gameStore.ts          # Zustand store
├── hooks/
│   ├── useCoinTimer.ts       # 코인 타이머 훅
│   ├── useLocalStorage.ts    # localStorage 동기화
│   └── useStoneRotation.ts   # 🆕 돌 자동 회전 훅
├── lib/
│   ├── items.ts              # 아이템 데이터
│   └── stoneGeometry.ts      # 🆕 돌 지오메트리 생성
└── types/
    └── game.ts               # 타입 정의
```

### 5.3 State Schema (Zustand)

```typescript
interface GameState {
  // 코인
  coins: number;
  addCoin: () => void;
  spendCoins: (amount: number) => boolean;

  // 아이템
  ownedItems: string[];  // ['moss', 'flower']
  purchaseItem: (itemId: string) => boolean;

  // 이벤트
  lastInteraction: number;  // timestamp
  updateInteraction: () => void;

  // 저장/로드
  loadFromStorage: () => void;
  saveToStorage: () => void;
}
```

### 5.4 Item Data (3D + 2D 좌표)

```typescript
// lib/items.ts
export const ITEMS = [
  {
    id: 'moss',
    name: '이끼',
    nameEn: 'Moss',
    price: 10,
    description: '돌에 부드러운 이끼가 자랍니다',
    emoji: '🌿',
    // 3D 좌표 (돌 표면 기준)
    position3D: { x: 0.5, y: 0.8, z: 0.3 },
    // 2D 폴백용 좌표
    position2D: { top: '55%', left: '25%' },
    // 3D 구현 가이드
    render3D: 'sphereCluster',  // 여러 작은 구체
    complexity: 1,  // ⭐ 쉬움
  },
  {
    id: 'mushroom',
    name: '버섯',
    nameEn: 'Mushroom',
    price: 20,
    description: '귀여운 버섯이 자랍니다',
    emoji: '🍄',
    position3D: { x: -0.6, y: 0.3, z: 0.5 },
    position2D: { top: '70%', left: '20%' },
    render3D: 'mushroomShape',  // sphere + cylinder
    complexity: 1,  // ⭐ 쉬움
  },
  {
    id: 'pebbles',
    name: '자갈',
    nameEn: 'Pebbles',
    price: 15,
    description: '작은 자갈들이 주변에 놓입니다',
    emoji: '🪨',
    position3D: { x: 0, y: 0.05, z: 0.8 },
    position2D: { top: '85%', left: '50%' },
    render3D: 'pebbleCluster',  // 작은 구체들
    complexity: 1,  // ⭐ 쉬움
  },
  {
    id: 'flower',
    name: '작은 꽃',
    nameEn: 'Small Flower',
    price: 30,
    description: '돌 옆에 작은 꽃이 핍니다',
    emoji: '🌸',
    position3D: { x: 0.7, y: 0.2, z: -0.3 },
    position2D: { top: '65%', left: '65%' },
    render3D: 'flowerShape',  // cone + cylinder
    complexity: 2,  // ⭐⭐ P2
  },
] as const;

// MVP 아이템 (P0): moss, mushroom, pebbles (complexity: 1)
// Phase 2 아이템: flower (complexity: 2)
// 제외: butterfly (complexity: 3, 애니메이션 필요)
```

### 3D 데코레이션 구현 가이드

| 아이템 | 3D 구현 | geometry | 복잡도 |
|--------|---------|----------|--------|
| 🌿 이끼 | 5-7개 작은 녹색 구체 클러스터 | sphereGeometry | ⭐ |
| 🍄 버섯 | 빨간 반구(갓) + 흰 원기둥(줄기) | sphere + cylinder | ⭐ |
| 🪨 자갈 | 3-5개 작은 회색 구체 | sphereGeometry | ⭐ |
| 🌸 꽃 | 분홍 원뿔(꽃잎) + 초록 원기둥(줄기) | cone + cylinder | ⭐⭐ |

### 5.5 Core Components (3D)

#### StoneScene.tsx (메인 3D 씬)
```typescript
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export function StoneScene({ decorations }: { decorations: string[] }) {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      {/* 환경 조명 */}
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* 3D 돌 */}
      <Stone3D decorations={decorations} />

      {/* 바닥 (모래) */}
      <Ground />

      {/* 카메라 컨트롤 (드래그로 회전) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
```

#### Stone3D.tsx (3D 돌 모델)
```typescript
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

export function Stone3D({ decorations }: { decorations: string[] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // 부드러운 자동 회전
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* 메인 돌 - 둥근 형태 */}
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#8B7355"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 데코레이션 */}
      {decorations.includes('moss') && <Moss3D />}
      {decorations.includes('flower') && <Flower3D />}
    </group>
  );
}
```

#### Moss3D.tsx (이끼 데코레이션)
```typescript
// 돌 표면에 붙는 녹색 반구/불규칙 형태
// 여러 개의 작은 구체로 이끼 표현
<mesh position={[0.5, 0.8, 0.3]}>
  <sphereGeometry args={[0.15, 16, 16]} />
  <meshStandardMaterial color="#7C9A6E" roughness={1} />
</mesh>
```

#### Ground.tsx (바닥 - 젠 가든 모래)
```typescript
// 원형 평면 + 모래 텍스처
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
  <circleGeometry args={[5, 64]} />
  <meshStandardMaterial color="#E8DFD0" roughness={1} />
</mesh>
```

#### CoinCounter.tsx (HTML 오버레이)
```typescript
// HTML로 Canvas 위에 오버레이
// 우상단 고정, 코인 아이콘 + 숫자
// Framer Motion으로 bounce 애니메이션
```

#### 🆕 Next.js SSR 처리 (Critical)
```typescript
// app/page.tsx - dynamic import로 SSR 회피
import dynamic from 'next/dynamic';

const StoneScene = dynamic(
  () => import('@/components/Scene/StoneScene'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-gradient-to-b from-amber-50 to-stone-100
                      flex items-center justify-center animate-pulse">
        <span className="text-stone-400">3D 씬 로딩 중...</span>
      </div>
    )
  }
);
```

#### 🆕 Stone2DFallback.tsx (WebGL 미지원 폴백)
```typescript
// components/Stone/Stone2DFallback.tsx
import { ITEMS } from '@/lib/items';

const ITEM_POSITIONS: Record<string, React.CSSProperties> = {
  moss: { top: '55%', left: '25%' },
  flower: { top: '40%', left: '65%' },
  mushroom: { top: '70%', left: '20%' },
  pebbles: { top: '80%', left: '50%' },
};

export function Stone2DFallback({ decorations }: { decorations: string[] }) {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* 돌 이미지 (SVG 또는 이모지) */}
      <div className="w-full h-full flex items-center justify-center text-9xl">
        🪨
      </div>
      {/* 데코레이션 오버레이 */}
      {decorations.map(id => {
        const item = ITEMS.find(i => i.id === id);
        return item ? (
          <span
            key={id}
            className="absolute text-3xl transition-all duration-500"
            style={ITEM_POSITIONS[id]}
          >
            {item.emoji}
          </span>
        ) : null;
      })}
    </div>
  );
}
```

#### 🆕 WebGL 감지 + 조건부 렌더링
```typescript
// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Stone2DFallback } from '@/components/Stone/Stone2DFallback';

export default function HomePage() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const decorations = useGameStore(state => state.ownedItems);

  useEffect(() => {
    // WebGL 지원 여부 확인
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglSupported(supported);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <main>
      {webglSupported === null && <LoadingSpinner />}
      {webglSupported === true && <StoneScene decorations={decorations} />}
      {webglSupported === false && <Stone2DFallback decorations={decorations} />}
    </main>
  );
}
```

---

## 6. UI/UX Design

### 6.1 Design System

#### Color Palette (Zen Garden)

```
배경 (낮):    #F5F5F0  - 부드러운 베이지
배경 (저녁):  #E8DFD0  - 따뜻한 베이지
배경 (밤):    #2D3436  - 어두운 차콜

돌 색상:      #8B7355  - 자연스러운 갈색
텍스트:       #4A4A4A  - 부드러운 검정
강조:         #7C9A6E  - 이끼 그린
코인:         #D4AF37  - 골드
```

#### Typography

```
제목: Noto Serif KR (세리프, 고급스러움)
본문: Pretendard (산세리프, 가독성)
숫자: SF Mono (코인 카운터)
```

#### Spacing

```
기본 단위: 8px
컨테이너 패딩: 24px
컴포넌트 간격: 16px
```

### 6.2 Layout

```
┌─────────────────────────────────────┐
│  Stone Garden            🪙 42     │  ← 헤더 (로고 + 코인)
├─────────────────────────────────────┤
│                                     │
│                                     │
│              🪨                     │  ← 돌 (중앙)
│            🌿 🌸                    │  ← 데코레이션
│                                     │
│                                     │
│   🐜 ─────────────→                │  ← 개미 이벤트 (방치 시)
├─────────────────────────────────────┤
│         [ 🛒 상점 ]                 │  ← 하단 버튼
└─────────────────────────────────────┘
```

### 6.3 Shop Layout

```
┌─────────────────────────────────────┐
│  ← 돌아가기              🪙 42     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │  🌿     │  │  🌸     │          │
│  │  이끼   │  │ 작은 꽃  │          │
│  │  10🪙   │  │  25🪙   │          │
│  │ [구매]  │  │ [구매]  │          │
│  └─────────┘  └─────────┘          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │  🦋     │  │  🍄     │          │
│  │  나비   │  │  버섯   │          │
│  │  50🪙   │  │  30🪙   │          │
│  │ [구매]  │  │ [구매]  │          │
│  └─────────┘  └─────────┘          │
│                                     │
└─────────────────────────────────────┘
```

---

## 7. Implementation Phases (3D 버전)

### Phase 1: 환경 설정 (15분)

- [ ] Next.js 16 프로젝트 생성
- [ ] TailwindCSS v4 설정
- [ ] **React Three Fiber + drei 설치**
- [ ] Zustand + Framer Motion 설치
- [ ] 폴더 구조 생성
- [ ] Vercel 첫 배포

**Commit**: `chore: initial project setup with R3F`

### Phase 2: 3D 씬 + 핵심 UI (1시간 30분) ⚠️ 시간 증가

**Parallel Agents 활용**:

```
Agent 1: StoneScene + Stone3D + Ground (3D 핵심)
Agent 2: Lighting + CameraController (3D 환경)
Agent 3: CoinCounter + ShopButton + 상점 페이지 (UI)
Agent 4: gameStore + localStorage + useCoinTimer (로직)
```

- [ ] **StoneScene.tsx (Canvas 설정)**
- [ ] **Stone3D.tsx (3D 돌 모델)**
- [ ] **Ground.tsx (모래 바닥)**
- [ ] **Lighting.tsx (조명)**
- [ ] **OrbitControls (자동 회전)**
- [ ] CoinCounter 컴포넌트 (HTML 오버레이)
- [ ] 상점 페이지
- [ ] ItemCard 컴포넌트
- [ ] gameStore (Zustand)
- [ ] localStorage 연동

**Commit**: `feat: implement 3D scene and core UI`

### Phase 3: 게임 로직 + 3D 데코레이션 (1시간)

- [ ] 코인 자동 수집 (10초/1코인)
- [ ] 아이템 구매 로직
- [ ] **Moss3D.tsx (3D 이끼)**
- [ ] **Flower3D.tsx (3D 꽃)**
- [ ] **Decorations3D.tsx (데코 그룹)**
- [ ] 구매 시 돌에 3D 아이템 적용
- [ ] 구매 불가 시 피드백

**Commit**: `feat: implement game mechanics with 3D decorations`

### Phase 4: 이벤트 + 폴리싱 (45분)

- [ ] 개미 이벤트 (2D 오버레이, 2분 방치)
- [ ] 3D 데코 등장 애니메이션 (scale 0→1)
- [ ] 코인 추가 애니메이션
- [ ] 반응형 처리 (Canvas 크기)
- [ ] 모바일 터치 지원

**Commit**: `feat: add events and animations`

### Phase 5: 마무리 (30분)

- [ ] WebGL 호환성 테스트
- [ ] 전체 플로우 테스트
- [ ] 버그 수정
- [ ] 최종 Vercel 배포
- [ ] 데모 시나리오 확인

**Commit**: `feat: finalize for hackathon demo`

---

## 8. Demo Scenarios

### Scenario 1: 첫 방문 → 코인 수집 (1분)

1. Stone Garden 접속
2. 돌 화면 표시 확인
3. 10초 후 코인 +1 확인
4. 계속 코인 쌓이는 모습

### Scenario 2: 상점 구매 (1분)

1. 코인 10개 이상 보유 상태
2. 상점 버튼 클릭
3. "이끼" 아이템 구매
4. 돌 화면으로 돌아가서 이끼 확인

### Scenario 3: 방치 이벤트 (30초)

1. 2분간 화면 방치 (데모용: 30초로 조정)
2. 개미가 화면 하단을 지나감
3. "아무것도 안 해도 이벤트가 발생해요" 설명

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 데모 완주 | 3개 시나리오 100% | 해커톤 당일 테스트 |
| 로딩 시간 | < 2초 | Lighthouse |
| 버그 없음 | 0 critical bugs | 수동 테스트 |

---

## 10. Risk & Mitigation (3D 버전)

| Risk | 확률 | 영향 | 대응 |
|------|------|------|------|
| **🔴 WebGL 미지원 브라우저** | 중 | 고 | 2D 폴백 UI 준비 |
| **🔴 3D 렌더링 성능 이슈** | 중 | 고 | geometry 단순화, LOD 적용 |
| **🟡 R3F 학습 곡선** | 중 | 중 | drei 프리셋 최대 활용 |
| **🟡 3D 데코 위치 조정** | 중 | 중 | 하드코딩 좌표 사용 |
| localStorage 용량 초과 | 하 | 하 | 아이템 수 제한 |
| 시간 부족 | 중 | 고 | 3D 데코 2개만 구현 |

### 3D 특화 Fallback

| 상황 | 대응 |
|------|------|
| **3D 렌더링 실패** | **2D 이미지 돌로 폴백** |
| **OrbitControls 버그** | **자동 회전만, 드래그 비활성화** |
| **3D 데코 미완성** | **이모지 오버레이로 대체** |

### Fallback Plan (14:00 기준)

| 상황 | 대응 |
|------|------|
| 3D 씬 미완성 | 2D 버전으로 전환 (이미지 돌) |
| 상점 미완성 | 하드코딩으로 아이템 1개 표시 |
| 개미 이벤트 미완성 | MVP에서 제외, 핵심 기능만 |

### WebGL 미지원 감지

```typescript
// lib/webglCheck.ts
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
```

---

## 11. Hackathon Presentation (3분)

```
[0:00 - 0:30] 문제 제기
"매일 무언가를 해야 한다는 압박감... 게임조차 클리어, 랭킹에 쫓깁니다.
아무것도 안 해도 되는 경험이 필요하지 않으셨나요?"

[0:30 - 0:50] 솔루션
"Stone Garden은 아무것도 안 해도 되는 힐링 게임입니다.
돌을 바라보고, 코인을 모으고, 이끼로 꾸미세요."

[0:50 - 2:30] 라이브 데모
- 돌 화면 + 코인 자동 수집
- 상점에서 이끼 구매
- 돌에 이끼 적용된 모습
- (시간 되면) 개미 이벤트

[2:30 - 3:00] 마무리
"Next.js + React Three Fiber로 5시간 만에 3D 힐링 게임을 만들었습니다.
Cursor Parallel Agents로 3D 씬과 UI를 동시에 개발했습니다.
향후 ASMR 사운드, 다양한 돌 모델, AR 모드를 추가할 예정입니다."
```

---

## 12. Team Assignment (3D 전문성 반영)

| 역할 | 담당자 | Phase 집중 | 핵심 기술 |
|------|--------|------------|-----------|
| **FE-1** | **3D 씬 리드** + UI | Phase 2, 4 | **R3F, Three.js** |
| **FE-2** | 상태 관리, 게임 로직 | Phase 2, 3 | Zustand, localStorage |
| **AI-1** | **3D 데코레이션** | Phase 3, 4 | **R3F geometry** |
| **AI-2** | QA, 발표 준비 | Phase 4, 5 | 데모 시나리오 |

**사전 준비 필수**:
- FE-1, AI-1: React Three Fiber 기본 튜토리얼 숙지
- 참고: [R3F 공식 문서](https://docs.pmnd.rs/react-three-fiber)
- 참고: [drei 예제](https://github.com/pmndrs/drei)

---

## Next Steps

1. **digging**: PRD 리뷰 및 개선점 분석
2. **Task Plan**: 상세 실행 계획 생성
3. **/implement**: 구현 시작

```
💡 PRD 작성이 완료되었습니다.

   → PRD 검토: "digging" 또는 "PRD 검토해줘"
   → 바로 구현: "/implement stone-garden"
```
