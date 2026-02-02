# FE-2: 상태 관리 + 상점 구현

담당자: **FE-2 (상태/로직)**
Phase: **Phase 2, 4**
예상 시간: Phase 2 (11:20~12:40), Phase 4 (14:00~15:00)

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## Phase 2 구현 요청

상점과 상태 관리를 구현해줘.

PRD Section 8 Data Schema와 Plan Phase 2 참고해서 아래 파일들을 만들어줘:

### 1. 타입 정의 (다른 담당자보다 먼저!)
- `types/game.ts` - GameState, SpiritState, DiaryEntry
- `types/chat.ts` - ChatMessage, ChatState
- `types/items.ts` - TerrariumItem, ItemGeometry

### 2. 상태 관리
- `stores/gameStore.ts` - Zustand + AsyncStorage persist
  - coins, ownedItems, lastVisit, consecutiveVisitDays
  - addCoin, purchaseItem, getSpiritState

### 3. 훅
- `hooks/useCoinTimer.ts` - 10초마다 코인 +1

### 4. 데이터
- `lib/items.ts` - 아이템 6종 (emotionalFunction 필드 포함)

### 5. 상점 UI
- `components/Shop/ShopBottomSheet.tsx` - @gorhom/bottom-sheet
- `components/Shop/ItemCard.tsx` - 감정 기능 1줄 표시

### 6. 공통 UI
- `components/UI/CoinCounter.tsx` - 코인 표시
- `components/UI/ActionButton.tsx` - 하단 버튼들

### 7. 메인 화면
- `app/(tabs)/index.tsx` - 3D 씬 + 버튼들 배치

## 규칙
- PRD Section 6 아이템 목록의 emotionalFunction 그대로 사용
- Zustand persist로 AsyncStorage 연동
- 타입 정의는 Phase 2 시작 직후 main에 먼저 머지

## 완료 기준
- [ ] 코인 카운터 표시 (10초마다 +1)
- [ ] 상점 열기/닫기 가능
- [ ] 아이템 카드에 감정 기능 표시
- [ ] 구매 시 코인 차감 + ownedItems 업데이트
- [ ] AsyncStorage 저장/로드 동작

## 커밋
```bash
git checkout -b feature/phase2-shop
# 타입 먼저 머지
git add types/
git commit -m "feat: add type definitions for game state"
git push origin feature/phase2-shop
# PR 생성 후 main 머지

# 나머지 작업
git add stores/ hooks/ lib/items.ts components/Shop/ components/UI/ app/
git commit -m "feat: implement shop and state management"
```

---

## Phase 4 구현 요청 (14:00~)

감정 루틴 시스템을 구현해줘.

### 1. "오늘은 여기까지" 버튼
- `components/UI/EndSessionButton.tsx`

### 2. 1줄 일기
- `components/Diary/DiaryModal.tsx` - 모달 UI
- `components/Diary/DiarySuggestions.tsx` - 2개 후보 표시
- `hooks/useDiarySuggestions.ts` - 컨텍스트 기반 후보 생성

### 3. 정령 UI
- `components/Spirit/SpiritStatus.tsx` - 상태 3단계 표시
- `components/Spirit/SpiritGreeting.tsx` - 인사 말풍선
- `hooks/useSpiritState.ts` - 상태 계산 로직

### 4. 세션 상태
- `stores/sessionStore.ts` - 세션 시작 시간, 대화 횟수 등

## Phase 4 완료 기준
- [ ] "오늘은 여기까지" 버튼 동작
- [ ] 마무리 멘트 표시
- [ ] 1줄 일기 후보 2개 표시
- [ ] 일기 저장 후 앱 종료 플로우
- [ ] 정령 상태 3단계 UI
