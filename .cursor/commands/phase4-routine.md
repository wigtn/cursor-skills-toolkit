# Phase 4: 감정 루틴 시스템 (FE-2)

**담당**: FE-2
**시간**: 14:00 ~ 15:00 (1시간)
**선행 조건**: Phase 3 완료 (main 머지 후 시작)

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

"오늘은 여기까지" 버튼, 1줄 일기, 정령 상태 UI를 구현해줘.

### 1. "오늘은 여기까지" 버튼
`components/UI/EndSessionButton.tsx`
- 하단에 배치
- 탭 시 DiaryModal 열기
- 마무리 멘트 표시 (lib/spiritResponses.ts의 CLOSING_MESSAGES)

### 2. 1줄 일기 모달
`components/Diary/DiaryModal.tsx`
- 마무리 멘트 표시
- 일기 후보 2개 버튼으로 표시
- 선택 시 저장 후 모달 닫기

`components/Diary/DiarySuggestions.tsx`
- 2개 후보 버튼 UI

`hooks/useDiarySuggestions.ts`
- 오늘 활동 기반 후보 생성
- 대화했으면: "오늘은 마음을 나눴다"
- 구매했으면: "작은 변화가 기분을 바꿨다"
- 짧게 있었으면: "잠깐이라도 쉬었다"

### 3. 정령 상태 UI
`components/Spirit/SpiritStatus.tsx`
- 상태 3단계 표시 (고요/살짝 지침/반짝임)
- 상태별 glow 효과
- 상태 텍스트 배지

`components/Spirit/SpiritGreeting.tsx`
- 인사 말풍선 UI
- 상태별 인사 (lib/spiritResponses.ts의 GREETING_BY_STATE)

`hooks/useSpiritState.ts`
- 상태 계산 로직
- 3일 미접속 → tired
- 3일 연속 OR 대화 5회 → sparkling
- 기본 → calm

### 4. 세션 상태
`stores/sessionStore.ts`
- 세션 시작 시간
- 대화 횟수
- 구매한 아이템
- 체류 시간

### 5. 정령 구매 반응 연결
- 아이템 구매 시 SpiritGreeting에 반응 멘트 표시
- lib/spiritResponses.ts의 PURCHASE_REACTIONS 사용

## 완료 기준
- [ ] "오늘은 여기까지" 버튼 동작
- [ ] 마무리 멘트 표시
- [ ] 1줄 일기 후보 2개 표시
- [ ] 일기 선택 후 AsyncStorage 저장
- [ ] 정령 상태 3단계 UI 표시
- [ ] 상태별 인사 멘트 동작
- [ ] 구매 시 정령 반응 멘트

## 커밋
```bash
git checkout main && git pull
git checkout -b feature/phase4-routine
git add components/Diary/ components/Spirit/ components/UI/EndSessionButton.tsx hooks/useDiarySuggestions.ts hooks/useSpiritState.ts stores/sessionStore.ts
git commit -m "feat(phase4): implement emotional routine system"
git push origin feature/phase4-routine
```

## 다음 단계
→ 15:00에 main 머지 후 Phase 5 테스트
