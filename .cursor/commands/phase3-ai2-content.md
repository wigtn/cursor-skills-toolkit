# Phase 3: 정령 콘텐츠 (AI-2)

**담당**: AI-2 (콘텐츠)
**시간**: 12:40 ~ 14:00 (1시간 20분)
**선행 조건**: Phase 2 완료 (main 머지 후 시작)

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

정령 '초록이'의 프롬프트, 질문, 반응 멘트를 구현해줘.
**AI-1보다 먼저 머지해야 함** (AI-1이 이 파일들을 사용)

### 1. 시스템 프롬프트
`lib/prompts.ts`
- TERRARIUM_SPIRIT_PROMPT 상수
- PRD Section 7.1 내용 그대로

### 2. 오늘의 질문 20개
`lib/questions.ts`
- DAILY_QUESTIONS 배열
- getRandomQuestion() 함수
- PRD Section 7.2 내용 그대로

### 3. 정령 반응 멘트
`lib/spiritResponses.ts`
- GREETING_BY_STATE: 상태별 인사 (calm/tired/sparkling)
- PURCHASE_REACTIONS: 아이템별 구매 반응
- CLOSING_MESSAGES: 마무리 멘트

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

## 완료 기준
- [ ] 시스템 프롬프트에 조언 금지/부담 금지 명시
- [ ] 오늘의 질문 20개
- [ ] 상태별 인사 (calm/tired/sparkling 각 3개 이상)
- [ ] 아이템별 구매 반응 (6종 각 2개 이상)
- [ ] 마무리 멘트 5개 이상

## 커밋 (AI-1보다 먼저!)
```bash
git checkout main && git pull
git checkout -b feature/phase3-content
git add lib/prompts.ts lib/questions.ts lib/spiritResponses.ts
git commit -m "feat(phase3): add spirit content (prompts, questions, responses)"
git push origin feature/phase3-content
# PR 생성 → main 머지 (AI-1이 사용할 수 있도록)
```

## 다음 단계
→ 14:00에 main 머지 후 Phase 4 시작
→ Phase 5에서 QA 테스트 담당
