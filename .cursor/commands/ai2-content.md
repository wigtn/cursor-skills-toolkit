# AI-2: 정령 콘텐츠 구현

담당자: **AI-2 (콘텐츠/QA)**
Phase: **Phase 3, 5**
예상 시간: Phase 3 (12:40~14:00), Phase 5 (15:00~15:30)

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## Phase 3 구현 요청

정령 '초록이' 콘텐츠를 구현해줘.

PRD Section 7 AI 정령 대화 시스템 참고해서 아래 파일들을 만들어줘:

### 1. 시스템 프롬프트
- `lib/prompts.ts`
  - TERRARIUM_SPIRIT_PROMPT 상수
  - PRD Section 7.1 내용 그대로

### 2. 오늘의 질문
- `lib/questions.ts`
  - DAILY_QUESTIONS 배열 (20개)
  - getRandomQuestion() 함수
  - PRD Section 7.2 내용 그대로

### 3. 정령 반응 멘트
- `lib/spiritResponses.ts`
  - GREETING_BY_STATE (상태별 인사)
  - PURCHASE_REACTIONS (아이템별 구매 반응)
  - CLOSING_MESSAGES (마무리 멘트)
  - PRD Section 7.3 내용 그대로

## 규칙 (매우 중요!)
- `.cursor/rules/spirit-ai.mdc` 반드시 참고

### 절대 금지 (MUST NOT)
```
❌ "매일 해봐"
❌ "꾸준히 하면 돼"
❌ "노력하면 달라질 거야"
❌ "긍정적으로 생각해"
❌ 해결책 먼저 제시
❌ 50자 초과 응답
```

### 좋은 응답 패턴
```
✅ "많이 지쳤구나 🌿 오늘 하루 정말 수고했어."
✅ "속상했겠다... 무슨 일이었어?"
✅ "지금은 아무것도 안 해도 괜찮아 🌱"
```

### 이모지 규칙
- 허용: 🌱 🌿 ✨ 🍄 💎 🥺 🌙
- 문장 끝에 1개만
- 과하게 사용 금지

## 완료 기준
- [ ] 시스템 프롬프트에 조언 금지/부담 금지 명시
- [ ] 오늘의 질문 20개 (가벼운/감정 탐색/부드러운/열린)
- [ ] 상태별 인사 (고요/살짝 지침/반짝임)
- [ ] 아이템별 구매 반응 (감정 기능에 맞춤)
- [ ] 마무리 멘트 5개 이상

## 커밋
```bash
git checkout -b feature/phase3-content
# 작업 완료 후 (AI-1보다 먼저 머지!)
git add lib/prompts.ts lib/questions.ts lib/spiritResponses.ts
git commit -m "feat: add spirit content (prompts, questions, responses)"
git push origin feature/phase3-content
# PR 생성 후 main 머지
```

---

## Phase 5: QA 체크리스트 (15:00~)

### 데모 시나리오 테스트

#### Scenario 1: 첫 만남 + 테라리움 감상 (1분)
- [ ] 앱 실행 → 3D 로드 (4초 내)
- [ ] 초록이 인사 표시
- [ ] 정령 상태 "고요" 표시
- [ ] 테라리움 터치 회전
- [ ] 10초 후 코인 +1

#### Scenario 2: 정령과 대화 (1분 30초)
- [ ] 💬 대화 버튼 탭
- [ ] 바텀시트 부드럽게 열림
- [ ] 오늘의 질문 랜덤 표시
- [ ] "힘들었어" 입력 후 응답 확인
- [ ] **응답에 조언 없음** ⚠️
- [ ] **"매일 해봐" 같은 말 없음** ⚠️
- [ ] 응답 50자 이내
- [ ] 스트리밍 (타이핑 효과)

#### Scenario 3: 꾸미기 + 마무리 (1분)
- [ ] 🛒 상점 버튼 탭
- [ ] 아이템 카드에 감정 기능 표시
- [ ] 버섯 구매 (12코인)
- [ ] 초록이 반응 "오늘 힘이 필요했구나 🍄"
- [ ] 테라리움에 버섯 3D 표시
- [ ] "오늘은 여기까지" 버튼
- [ ] 마무리 멘트 표시
- [ ] 1줄 일기 후보 2개 표시
- [ ] 선택 후 저장

### 긴급 대응
- 3D 실패 → 2D 폴백 확인
- AI 실패 → 하드코딩 응답 확인
- 앱 크래시 → `npx expo start -c`
