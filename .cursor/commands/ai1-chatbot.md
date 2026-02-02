# AI-1: AI 챗봇 구현

담당자: **AI-1 (AI 리드)**
Phase: **Phase 3**
예상 시간: 12:40 ~ 14:00

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

Phase 3 AI 챗봇을 구현해줘.

PRD Section 9 API Specification과 Plan Phase 3 참고해서 아래 파일들을 만들어줘:

### 1. OpenAI 클라이언트
- `lib/openai.ts`
  - OpenAI SDK 사용
  - GPT-4o-mini 모델
  - 스트리밍 응답 지원
  - 에러 핸들링 (rate_limit, network_error 등)

```typescript
// 설정값
{
  model: 'gpt-4o-mini',
  max_tokens: 150,
  temperature: 0.8,
  stream: true
}
```

### 2. 채팅 훅
- `hooks/useChat.ts`
  - 스트리밍 응답 처리
  - 메시지 히스토리 관리
  - 로딩/에러 상태

### 3. 채팅 UI (components/Chat/)
- `ChatBottomSheet.tsx` - @gorhom/bottom-sheet
- `ChatMessage.tsx` - 사용자(오른쪽 초록), 정령(왼쪽 회색)
- `ChatInput.tsx` - 텍스트 입력 + 전송 버튼
- `TypingIndicator.tsx` - 정령 타이핑 중 표시

### 4. 채팅 상태
- `stores/chatStore.ts` - messages, isLoading, isStreaming

## 규칙
- `.cursor/rules/spirit-ai.mdc` 참고
- 시스템 프롬프트는 AI-2가 만든 `lib/prompts.ts` 사용
- 스트리밍으로 타이핑 효과 구현
- 에러 시 친근한 메시지 표시

## API 키 설정
```bash
# .env 파일에 추가
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here
```

## 완료 기준
- [ ] AI 챗봇 대화 가능
- [ ] 스트리밍 응답 (타이핑 효과)
- [ ] 에러 시 폴백 메시지
- [ ] 채팅 바텀시트 열기/닫기

## 커밋
```bash
git checkout -b feature/phase3-chat
# 작업 완료 후
git add lib/openai.ts hooks/useChat.ts stores/chatStore.ts components/Chat/
git commit -m "feat: implement AI chatbot with streaming"
```

## 주의사항
- AI-2의 `lib/prompts.ts`가 먼저 머지되어야 함
- 해커톤용으로 클라이언트에서 직접 API 호출 (프로덕션에서는 서버 경유)
