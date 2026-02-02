# AI-2: 전체 작업 (콘텐츠/QA 리드)

**담당자**: AI-2
**핵심 역할**: 프롬프트, 질문, 멘트, QA 테스트

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

---

## Phase 1 (11:00~11:20) - 환경 설정

**전원 함께 진행**

AI-2 담당:
- [ ] PRD 최종 검토
- [ ] 프롬프트/질문/멘트 최종 확인
- [ ] 데모 시나리오 숙지

---

## Phase 2 (11:20~12:40) - 정령 콘텐츠 ⭐ 먼저 시작 가능

**의존성 없음! FE 작업과 동시에 시작**

### 2-1. 시스템 프롬프트
`lib/prompts.ts`
```typescript
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
사용자: 오늘 너무 힘들었어
정령: 많이 지쳤구나 🌿 오늘 하루 정말 수고했어. 얘기해줄래?

사용자: 회사에서 혼났어
정령: 속상했겠다... 네 잘못이 아닐 수도 있어. 무슨 일이었어?

사용자: 뭘 해야 할지 모르겠어
정령: 지금은 아무것도 안 해도 괜찮아 🌱 그냥 여기 있어.
`;
```

### 2-2. 오늘의 질문 20개
`lib/questions.ts`
```typescript
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

### 2-3. 정령 반응 멘트
`lib/spiritResponses.ts`
```typescript
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

// 아이템 구매 반응
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

// 마무리 멘트
export const CLOSING_MESSAGES = [
  "오늘도 수고했어. 푹 쉬어 🌙",
  "내일 또 보자. 잘 자 ✨",
  "오늘 여기 와줘서 고마워 🌿",
  "천천히 쉬어. 난 여기 있을게.",
  "오늘 하루도 잘 버텼어. 대단해 🌱",
];

export function getRandomGreeting(state: 'calm' | 'tired' | 'sparkling'): string {
  const messages = GREETING_BY_STATE[state];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getRandomClosing(): string {
  return CLOSING_MESSAGES[Math.floor(Math.random() * CLOSING_MESSAGES.length)];
}

export function getPurchaseReaction(itemId: string): string {
  const reactions = PURCHASE_REACTIONS[itemId] || ["새 친구가 왔네! 🌱"];
  return reactions[Math.floor(Math.random() * reactions.length)];
}
```

### Phase 2 완료 기준
- [ ] 시스템 프롬프트 작성 (조언 금지, 부담 금지 명시)
- [ ] 오늘의 질문 20개
- [ ] 상태별 인사 (각 3개 이상)
- [ ] 아이템별 구매 반응 (각 2개 이상)
- [ ] 마무리 멘트 5개 이상

### Phase 2 커밋 (AI-1보다 먼저!)
```bash
git checkout -b feature/ai2-content
git add lib/prompts.ts lib/questions.ts lib/spiritResponses.ts
git commit -m "feat(ai2): add spirit content (prompts, questions, responses)"
git push origin feature/ai2-content
# PR 생성 → main 머지 (AI-1이 사용)
```

---

## Phase 3 (12:40~14:00) - 콘텐츠 검토 + 테스트

**main 머지 후 시작**: `git checkout main && git pull`

### 3-1. AI 응답 품질 검토
AI-1이 만든 챗봇으로 테스트:
- [ ] "힘들었어" 입력 → 공감 응답?
- [ ] "회사에서 혼났어" → 조언 없이 공감?
- [ ] 50자 이내?
- [ ] "매일 해봐" 같은 말 없음?

### 3-2. 프롬프트 튜닝 (필요시)
응답이 마음에 안 들면 `lib/prompts.ts` 수정

### 3-3. 멘트 추가 (필요시)
반응이 부족하면 `lib/spiritResponses.ts`에 추가

---

## Phase 4 (14:00~15:00) - QA 시작

**main 머지 후 시작**: `git checkout main && git pull`

### 4-1. 시나리오 1 테스트: 첫 만남
- [ ] 앱 실행 → 3D 로드 (4초 내)
- [ ] 초록이 인사 표시
- [ ] 정령 상태 "고요" 표시
- [ ] 테라리움 터치 회전
- [ ] 10초 후 코인 +1

### 4-2. 시나리오 2 테스트: 정령과 대화
- [ ] 💬 대화 버튼 탭
- [ ] 바텀시트 열림
- [ ] 오늘의 질문 랜덤 표시
- [ ] "힘들었어" 입력 후 응답
- [ ] **응답에 조언 없음** ⚠️
- [ ] **"매일 해봐" 같은 말 없음** ⚠️
- [ ] 응답 50자 이내
- [ ] 스트리밍 (타이핑 효과)

### 4-3. 시나리오 3 테스트: 꾸미기 + 마무리
- [ ] 🛒 상점 버튼 탭
- [ ] 아이템 카드에 감정 기능 표시
- [ ] 버섯 구매 (12코인)
- [ ] 초록이 반응 "오늘 힘이 필요했구나 🍄"
- [ ] 테라리움에 버섯 3D 표시
- [ ] "오늘은 여기까지" 버튼
- [ ] 마무리 멘트 표시
- [ ] 1줄 일기 후보 2개
- [ ] 선택 후 저장

---

## Phase 5 (15:00~15:30) - 최종 QA ⭐ 메인

### 5-1. 최종 체크리스트
- [ ] Expo Go에서 정상 동작
- [ ] 데모 3개 시나리오 100% 성공
- [ ] AI 응답 품질 OK
- [ ] 정령 상태 변화 확인
- [ ] AsyncStorage 저장/로드 확인
- [ ] 크리티컬 버그 없음

### 5-2. 긴급 대응

**3D 렌더링 실패 시**
```
→ Terrarium2DFallback 사용 확인
→ 이모지로 표시되면 OK
```

**AI 응답 실패 시**
```
→ 하드코딩 폴백 메시지:
"지금은 말이 잘 안 나와... 조금만 기다려줘 🌿"
```

**앱 크래시 시**
```bash
npx expo start -c
```

### 5-3. 발표 준비
- [ ] 발표자 디바이스에서 앱 실행 확인
- [ ] 시나리오 순서 숙지
- [ ] 백업 디바이스 준비

---

## 규칙
- `.cursor/rules/spirit-ai.mdc` 반드시 참고
- 절대 금지: "매일 해봐", "꾸준히 하면 돼", "노력하면 달라질 거야"
- 이모지: 🌱 🌿 ✨ 🍄 💎 🥺 🌙 (문장 끝에 1개만)

## 최종 커밋
```bash
git checkout main && git pull
git add -A
git commit -m "feat(ai2): finalize spirit content and QA"
git push origin main
```
