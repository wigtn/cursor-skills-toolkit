# AI-1: 전체 작업 (AI 리드)

**담당자**: AI-1
**핵심 역할**: OpenAI 연동, 챗봇, 스트리밍

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

---

## Phase 1 (11:00~11:20) - 환경 설정

**전원 함께 진행**

AI-1 담당:
- [ ] OpenAI 패키지 설치
```bash
npm install openai
```
- [ ] 환경변수 설정
```bash
# .env
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here
```
- [ ] API 키 팀에 공유

---

## Phase 2 (11:20~12:40) - OpenAI 연동 준비

**FE-1, FE-2가 메인 작업하는 동안 미리 준비**

### 2-1. OpenAI 클라이언트 테스트
`lib/openai.ts` 기본 구조 작성:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function testConnection() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hello' }],
    max_tokens: 10,
  });
  console.log('OpenAI connected:', response.choices[0].message.content);
}
```

### 2-2. 스트리밍 테스트
스트리밍 응답 처리 패턴 테스트:
```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [...],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  // 실시간 표시
}
```

### Phase 2 완료 기준
- [ ] OpenAI API 연결 테스트 성공
- [ ] 스트리밍 응답 테스트 성공

### Phase 2 커밋 (선택)
```bash
git checkout -b feature/ai1-openai-test
git add lib/openai.ts
git commit -m "feat(ai1): add OpenAI client test"
```

---

## Phase 3 (12:40~14:00) - AI 챗봇 ⭐ 메인

**main 머지 후 시작**: `git checkout main && git pull`

### 3-1. OpenAI 클라이언트 완성
`lib/openai.ts`
```typescript
import OpenAI from 'openai';
import { TERRARIUM_SPIRIT_PROMPT } from './prompts'; // AI-2가 만든 것

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function streamChat(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  onChunk: (text: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: TERRARIUM_SPIRIT_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 150,
      temperature: 0.8,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) onChunk(content);
    }
    onComplete();
  } catch (error) {
    onError(getErrorMessage(error));
  }
}
```

### 3-2. 채팅 훅
`hooks/useChat.ts`
- 메시지 히스토리 관리
- 스트리밍 상태 (isStreaming)
- 에러 처리

### 3-3. 채팅 상태
`stores/chatStore.ts`
```typescript
interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
}
```

### 3-4. 채팅 UI
`components/Chat/ChatBottomSheet.tsx`
- @gorhom/bottom-sheet
- 오늘의 질문 상단 표시 (AI-2의 lib/questions.ts)

`components/Chat/ChatMessage.tsx`
- 사용자: 오른쪽, 초록 배경
- 정령: 왼쪽, 회색 배경

`components/Chat/ChatInput.tsx`
- 텍스트 입력 + 전송 버튼

`components/Chat/TypingIndicator.tsx`
- "..." 애니메이션

### 3-5. 에러 처리
```typescript
const ERROR_MESSAGES: Record<string, string> = {
  rate_limit: '잠시 후 다시 시도해줘 🌿',
  network_error: '인터넷 연결을 확인해줘.',
  unknown: '뭔가 잘못됐어... 다시 시도해볼래?',
};
```

### Phase 3 완료 기준
- [ ] AI 챗봇 대화 가능
- [ ] 스트리밍 응답 (타이핑 효과)
- [ ] 오늘의 질문 표시
- [ ] 에러 시 폴백 메시지
- [ ] 채팅 바텀시트 열기/닫기

### Phase 3 커밋
```bash
git checkout -b feature/ai1-chatbot
git add lib/openai.ts hooks/useChat.ts stores/chatStore.ts components/Chat/
git commit -m "feat(ai1): implement AI chatbot with streaming"
git push origin feature/ai1-chatbot
```

---

## Phase 4 (14:00~15:00) - 통합 테스트

**main 머지 후 시작**: `git checkout main && git pull`

### 4-1. AI 응답 품질 테스트
- [ ] "힘들었어" → 공감 응답 확인
- [ ] 조언 없는지 확인
- [ ] 50자 이내 확인
- [ ] "매일 해봐" 같은 말 없는지 확인

### 4-2. 스트리밍 안정성 테스트
- [ ] 연속 대화 3회 테스트
- [ ] 네트워크 끊김 시 에러 처리

### 4-3. 버그 수정
- 발견된 버그 즉시 수정

---

## Phase 5 (15:00~15:30) - 데모 지원

- [ ] 시나리오 2 (정령과 대화) 테스트
- [ ] AI 응답 품질 최종 확인
- [ ] 백업 하드코딩 응답 준비

---

## 규칙
- `.cursor/rules/spirit-ai.mdc` 참고
- AI-2가 만든 prompts.ts, questions.ts 사용
- 스트리밍 필수

## 최종 커밋
```bash
git checkout main && git pull
git add -A
git commit -m "feat(ai1): finalize AI chatbot"
git push origin main
```
