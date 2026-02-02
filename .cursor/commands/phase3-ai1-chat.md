# Phase 3: AI 챗봇 (AI-1)

**담당**: AI-1 (AI 리드)
**시간**: 12:40 ~ 14:00 (1시간 20분)
**선행 조건**: Phase 2 완료 (main 머지 후 시작)

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

OpenAI 챗봇과 채팅 UI를 구현해줘.

### 1. OpenAI 클라이언트
`lib/openai.ts`
```typescript
import OpenAI from 'openai';
import { TERRARIUM_SPIRIT_PROMPT } from './prompts';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// 설정
{
  model: 'gpt-4o-mini',
  max_tokens: 150,
  temperature: 0.8,
  stream: true
}
```

### 2. 채팅 훅
`hooks/useChat.ts`
- 스트리밍 응답 처리
- 메시지 히스토리 관리
- 로딩/에러 상태
- AI-2가 만든 `lib/prompts.ts` 사용

### 3. 채팅 상태
`stores/chatStore.ts`
```typescript
interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
}
```

### 4. 채팅 UI (`components/Chat/`)

`ChatBottomSheet.tsx`
- @gorhom/bottom-sheet
- 오늘의 질문 상단 표시 (AI-2의 lib/questions.ts 사용)

`ChatMessage.tsx`
- 사용자: 오른쪽, 초록 배경
- 정령: 왼쪽, 회색 배경
- 스트리밍 시 타이핑 효과

`ChatInput.tsx`
- 텍스트 입력
- 전송 버튼

`TypingIndicator.tsx`
- 정령 응답 대기 중 표시 (...)

### 5. 에러 처리
```typescript
const ERROR_MESSAGES = {
  rate_limit: '잠시 후 다시 시도해줘 🌿',
  network_error: '인터넷 연결을 확인해줘.',
  unknown: '뭔가 잘못됐어... 다시 시도해볼래?',
};
```

## 규칙
- `.cursor/rules/spirit-ai.mdc` 참고
- 스트리밍으로 타이핑 효과 구현
- AI-2의 prompts.ts, questions.ts 사용

## 완료 기준
- [ ] AI 챗봇 대화 가능
- [ ] 스트리밍 응답 (타이핑 효과)
- [ ] 오늘의 질문 표시
- [ ] 에러 시 폴백 메시지
- [ ] 채팅 바텀시트 열기/닫기

## 커밋
```bash
git checkout main && git pull
git checkout -b feature/phase3-chat
git add lib/openai.ts hooks/useChat.ts stores/chatStore.ts components/Chat/
git commit -m "feat(phase3): implement AI chatbot with streaming"
git push origin feature/phase3-chat
```

## 다음 단계
→ 14:00에 main 머지 후 Phase 4 시작
