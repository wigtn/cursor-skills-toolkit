# Phase 2: 상점 + 상태 관리 (FE-2)

**담당**: FE-2 (상태/로직)
**시간**: 11:20 ~ 12:40 (1시간 20분)
**선행 조건**: Phase 1 완료

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

타입 정의, 상태 관리, 상점 UI를 구현해줘.

### 1. 타입 정의 (가장 먼저! 다른 담당자가 참조함)

`types/game.ts`
```typescript
type SpiritState = 'calm' | 'tired' | 'sparkling';

interface GameState {
  coins: number;
  ownedItems: string[];
  lastVisit: number;
  consecutiveVisitDays: number;
  totalChatCount: number;
  diaryEntries: DiaryEntry[];
}

interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  spiritState: SpiritState;
  sessionDuration: number;
  createdAt: number;
}
```

`types/items.ts`
```typescript
interface TerrariumItem {
  id: string;
  name: string;
  price: number;
  emotionalFunction: string;
  emoji: string;
  color: string;
}
```

### 2. 아이템 데이터
`lib/items.ts`
- PRD Section 6 아이템 목록 그대로 구현
- emotionalFunction 필드 필수 (감정 기능)

### 3. 상태 관리
`stores/gameStore.ts`
- Zustand + AsyncStorage persist
- addCoin, purchaseItem, getSpiritState 액션

`hooks/useCoinTimer.ts`
- 10초마다 코인 +1
- useEffect + setInterval

### 4. 상점 UI
`components/Shop/ShopBottomSheet.tsx`
- @gorhom/bottom-sheet 사용
- 아이템 목록 표시

`components/Shop/ItemCard.tsx`
- 아이템 카드 UI
- **감정 기능 1줄 표시** (예: "말을 줄이고 싶은 날")
- 가격 + 구매 버튼

### 5. 공통 UI
`components/UI/CoinCounter.tsx`
- 현재 코인 표시 (🪙 123)

`components/UI/ActionButton.tsx`
- 하단 액션 버튼 (💬 대화, 🛒 상점)

### 6. 메인 화면
`app/(tabs)/index.tsx`
- TerrariumScene 배치
- CoinCounter 배치
- ActionButton 배치 (대화, 상점)
- ShopBottomSheet 연결

## 완료 기준
- [ ] 타입 정의 완료 (다른 담당자 사용 가능)
- [ ] 코인 카운터 표시 (10초마다 +1)
- [ ] 상점 열기/닫기 동작
- [ ] 아이템 카드에 감정 기능 표시
- [ ] 구매 시 코인 차감 + ownedItems 업데이트
- [ ] AsyncStorage 저장/로드 동작

## 커밋
```bash
git checkout -b feature/phase2-shop

# 타입 먼저 커밋 (다른 담당자 참조용)
git add types/
git commit -m "feat(phase2): add type definitions"
git push origin feature/phase2-shop

# 나머지 작업
git add stores/ hooks/ lib/items.ts components/Shop/ components/UI/ app/
git commit -m "feat(phase2): implement shop and state management"
```

## 다음 단계
→ 12:40에 main 머지 후 Phase 3 시작
