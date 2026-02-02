# FE-2: 전체 작업 (상태/로직 리드)

**담당자**: FE-2
**핵심 역할**: 타입 정의, 상태 관리, 상점, 정령 UI, 감정 루틴

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

---

## Phase 1 (11:00~11:20) - 환경 설정

**전원 함께 진행**

FE-2 담당:
- [ ] 상태 관리 패키지 설치
```bash
npm install zustand
npx expo install @react-native-async-storage/async-storage
npm install @gorhom/bottom-sheet
npx expo install react-native-reanimated react-native-gesture-handler
```
- [ ] 폴더 구조 생성
- [ ] Git 초기화 + push

---

## Phase 2 (11:20~12:40) - 상태 + 상점 ⭐ 메인

### 2-1. 타입 정의 (가장 먼저! 다른 담당자 참조)

`types/game.ts`
```typescript
export type SpiritState = 'calm' | 'tired' | 'sparkling';

export interface GameState {
  coins: number;
  ownedItems: string[];
  lastVisit: number;
  consecutiveVisitDays: number;
  totalChatCount: number;
  diaryEntries: DiaryEntry[];
}

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  spiritState: SpiritState;
  sessionDuration: number;
  createdAt: number;
}

export interface SessionContext {
  startTime: number;
  chatCount: number;
  purchasedItem: string | null;
  viewDuration: number;
}
```

`types/items.ts`
```typescript
export interface TerrariumItem {
  id: string;
  name: string;
  price: number;
  emotionalFunction: string;
  emoji: string;
  color: string;
}
```

`types/chat.ts`
```typescript
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
```

### 2-2. 아이템 데이터
`lib/items.ts` - PRD Section 6 그대로 구현

### 2-3. 상태 관리
`stores/gameStore.ts` - Zustand + AsyncStorage persist

`hooks/useCoinTimer.ts` - 10초마다 코인 +1

### 2-4. 상점 UI
`components/Shop/ShopBottomSheet.tsx`
`components/Shop/ItemCard.tsx` - 감정 기능 1줄 표시

### 2-5. 공통 UI
`components/UI/CoinCounter.tsx`
`components/UI/ActionButton.tsx`

### 2-6. 메인 화면
`app/(tabs)/index.tsx` - TerrariumScene + 버튼 배치

### Phase 2 완료 기준
- [ ] 타입 정의 완료
- [ ] 코인 카운터 (10초마다 +1)
- [ ] 상점 열기/닫기
- [ ] 아이템 카드에 감정 기능 표시
- [ ] 구매 시 코인 차감

### Phase 2 커밋
```bash
git checkout -b feature/fe2-shop

# 타입 먼저 (다른 담당자 참조용)
git add types/
git commit -m "feat(fe2): add type definitions"
git push origin feature/fe2-shop

# 나머지
git add stores/ hooks/ lib/items.ts components/Shop/ components/UI/ app/
git commit -m "feat(fe2): implement shop and state management"
```

---

## Phase 3 (12:40~14:00) - 정령 상태 UI

**main 머지 후 시작**: `git checkout main && git pull`

### 3-1. 정령 상태 UI
`components/Spirit/SpiritStatus.tsx`
- 상태 3단계 표시 (고요/살짝 지침/반짝임)
- 상태별 glow 효과
- 상태 텍스트 배지

`components/Spirit/SpiritGreeting.tsx`
- 인사 말풍선 UI
- AI-2가 만든 lib/spiritResponses.ts 사용

`hooks/useSpiritState.ts`
- 상태 계산 로직:
  - 3일 미접속 → tired
  - 3일 연속 OR 대화 5회 → sparkling
  - 기본 → calm

### 3-2. 세션 상태
`stores/sessionStore.ts`
- 세션 시작 시간, 대화 횟수, 구매 아이템, 체류 시간

### Phase 3 커밋
```bash
git add components/Spirit/ hooks/useSpiritState.ts stores/sessionStore.ts
git commit -m "feat(fe2): implement spirit status UI"
```

---

## Phase 4 (14:00~15:00) - 감정 루틴 ⭐ 메인

**main 머지 후 시작**: `git checkout main && git pull`

### 4-1. "오늘은 여기까지" 버튼
`components/UI/EndSessionButton.tsx`
- 탭 시 DiaryModal 열기
- AI-2가 만든 CLOSING_MESSAGES 사용

### 4-2. 1줄 일기 모달
`components/Diary/DiaryModal.tsx`
- 마무리 멘트 표시
- 일기 후보 2개 버튼

`components/Diary/DiarySuggestions.tsx`
- 2개 후보 버튼 UI

`hooks/useDiarySuggestions.ts`
- 오늘 활동 기반 후보 생성:
  - 대화 → "오늘은 마음을 나눴다"
  - 구매 → "작은 변화가 기분을 바꿨다"
  - 짧게 → "잠깐이라도 쉬었다"

### 4-3. 정령 구매 반응 연결
- 아이템 구매 시 SpiritGreeting에 반응 표시
- AI-2가 만든 PURCHASE_REACTIONS 사용

### Phase 4 완료 기준
- [ ] "오늘은 여기까지" 버튼 동작
- [ ] 마무리 멘트 표시
- [ ] 1줄 일기 후보 2개
- [ ] 일기 저장 (AsyncStorage)
- [ ] 정령 구매 반응

### Phase 4 커밋
```bash
git add components/Diary/ components/UI/EndSessionButton.tsx hooks/useDiarySuggestions.ts
git commit -m "feat(fe2): implement emotional routine system"
```

---

## Phase 5 (15:00~15:30) - 통합 테스트

- [ ] 전체 플로우 테스트
- [ ] AsyncStorage 저장/로드 확인
- [ ] 크리티컬 버그 수정

---

## 최종 커밋
```bash
git checkout main && git pull
git add -A
git commit -m "feat(fe2): finalize state management and emotional routine"
git push origin main
```
