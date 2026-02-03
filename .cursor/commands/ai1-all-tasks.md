# AI-1: 전체 작업 (AI 리드)

**담당자**: AI-1
**핵심 역할**: OpenAI 연동, 챗봇 (비스트리밍 권장)

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

---

## ⚠️ 에러 없이 빠르게 구현하기 (교훈)

이전 구현에서 발생했던 에러와 해결책을 반영했습니다. **아래를 먼저 읽고 구현**하면 같은 실수를 반복하지 않습니다.

### 1. API 키 / 환경변수

| 현상 | 원인 | 해결 |
|------|------|------|
| "연결에 문제가 있어" | API 키가 플레이스홀더(`sk-your-api-key-here`) 또는 미설정 | `.env`에 실제 키 설정 후 **앱 재시작** (`npm start -- --clear`) |
| API 키 undefined | Expo는 `EXPO_PUBLIC_` 접두사만 노출, 빌드 타임 반영 | 변수명 `EXPO_PUBLIC_OPENAI_API_KEY` 사용, 변경 시 반드시 재시작 |
| 환경변수 안 먹힘 | Metro 캐시 | `npm start -- --clear` 로 캐시 클리어 후 재실행 |

**구현 시**: API 키 검증 함수에서 플레이스홀더 값(`your-api-key` 포함) 거부하고, 없으면 `openai`를 null로 두어 채팅 진입 전에 막기.

### 2. 스트리밍 관련 (Expo/React Native)

| 현상 | 원인 | 해결 |
|------|------|------|
| "Response body is null" | Expo/RN의 `fetch`는 `response.body`(ReadableStream) 미지원 | **비스트리밍(`stream: false`)으로 통일** 권장 |
| 스트리밍 미지원 에러 | 브라우저가 아닌 환경에서 SDK 스트리밍/for-await 호환 이슈 | 채팅은 **fetch + stream: false** 한 번에 응답 받아서 `onChunk(전체텍스트)` 한 번 호출 |

**권장**: 처음부터 **비스트리밍만** 구현. 인터페이스는 그대로 두고 `onChunk`에 응답 전체를 한 번 넘기면 UI는 그대로 사용 가능.

### 3. 에러 분류 / 사용자 메시지

| 현상 | 원인 | 해결 |
|------|------|------|
| "인터넷 연결을 확인해줘"가 실제로는 401/429 | 에러 메시지 문자열만 보고 network_error로 분류 | **HTTP status 우선** 분기 (429→rate_limit, 401/403→invalid_api_key, 5xx→network_error) |
| 에러 객체 구조 차이 | SDK/플랫폼마다 status가 `err.status` / `err.statusCode` / `err.response.status` 등 다름 | status 추출 시 위 후보를 순서대로 확인 |

**구현 시**: `getErrorMessage(error)`에서 먼저 `status`(또는 statusCode, response.status)로 분기하고, 없을 때만 메시지 문자열로 판단.

### 4. 체크리스트 (구현 전/중)

- [ ] `.env`에 `EXPO_PUBLIC_OPENAI_API_KEY` 설정 (실제 키, 플레이스홀더 X)
- [ ] 채팅 호출은 **fetch + stream: false** 한 경로만 사용
- [ ] 에러 분류는 HTTP status 우선, 그다음 code/type, 마지막에 message
- [ ] 환경변수 수정 후에는 `npm start -- --clear` 로 재시작

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
# .env (프로젝트 루트)
EXPO_PUBLIC_OPENAI_API_KEY=sk-실제키
```
- [ ] API 키 팀에 공유
- [ ] **주의**: 값 변경 후 `npm start -- --clear` 로 재시작

---

## Phase 2 (11:20~12:40) - OpenAI 연동 준비

**FE-1, FE-2가 메인 작업하는 동안 미리 준비**

### 2-1. OpenAI 클라이언트 + API 키 검증
`lib/openai.ts` 기본 구조 (API 키 검증 포함):
```typescript
import OpenAI from 'openai';
import Constants from 'expo-constants';

const getApiKey = () => {
  const envKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  const constantsKey = Constants.expoConfig?.extra?.openaiApiKey;
  const apiKey = envKey || constantsKey;
  if (!apiKey || apiKey.includes('your-api-key')) return undefined;
  return apiKey;
};

const apiKey = getApiKey();
const openai = apiKey ? new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
}) : null;

export async function testConnection() {
  if (!openai) throw new Error('OpenAI API 키가 설정되지 않았습니다.');
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hello' }],
    max_tokens: 10,
  });
  return response.choices[0].message.content;
}
```

### 2-2. 채팅은 비스트리밍으로 (권장)
Expo/RN에서 `response.body`가 null이 되는 문제를 피하려면 **처음부터 비스트리밍**으로 구현하는 것이 안전합니다.
- `stream: false` 로 한 번에 응답 받기
- 응답 본문에서 `choices[0].message.content` 추출 후 `onChunk(content)` 한 번, `onComplete()` 호출
- UI는 기존과 동일 (스트리밍이든 비스트리밍이든 onChunk/onComplete 인터페이스 유지)

### Phase 2 완료 기준
- [ ] OpenAI API 연결 테스트 성공
- [ ] (선택) 비스트리밍 채팅 한 번 호출 성공

### Phase 2 커밋 (선택)
```bash
git checkout -b feature/ai1-openai-test
git add lib/openai.ts
git commit -m "feat(ai1): add OpenAI client test"
```

---

## Phase 3 (12:40~14:00) - AI 챗봇 ⭐ 메인

**main 머지 후 시작**: `git checkout main && git pull`

### 3-1. OpenAI 채팅 구현 (비스트리밍 권장)
`lib/openai.ts` — **fetch + stream: false** 한 경로만 사용하면 에러 가능성이 적습니다.
```typescript
import { TERRARIUM_SPIRIT_PROMPT } from './prompts';

export interface StreamChatOptions {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  onChunk: (text: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
}

export async function streamChat({
  messages,
  onChunk,
  onComplete,
  onError,
}: StreamChatOptions) {
  if (!apiKey) {
    onError('invalid_api_key');
    return;
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: TERRARIUM_SPIRIT_PROMPT },
          ...messages,
        ],
        stream: false,
        max_tokens: 150,
        temperature: 0.8,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error?.message || response.statusText}`);
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    if (content) onChunk(content);
    onComplete();
  } catch (error) {
    onError(getErrorMessage(error));
  }
}

function getErrorMessage(error: unknown): string {
  const err = error as any;
  const status = err.status ?? err.statusCode ?? err.response?.status;
  if (status === 429) return 'rate_limit';
  if (status === 401 || status === 403) return 'invalid_api_key';
  if (status >= 500) return 'network_error';
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes('rate limit') || msg.includes('429')) return 'rate_limit';
    if (msg.includes('api key') || msg.includes('401') || msg.includes('403')) return 'invalid_api_key';
    if (msg.includes('fetch') || msg.includes('network')) return 'network_error';
  }
  return 'unknown';
}

export const ERROR_MESSAGES: Record<string, string> = {
  rate_limit: '잠시 후 다시 시도해줘 🌿',
  invalid_api_key: '연결에 문제가 있어. 나중에 다시 올래?',
  network_error: '인터넷 연결을 확인해줘.',
  unknown: '뭔가 잘못됐어... 다시 시도해볼래?',
};
```

### 3-2. 채팅 훅
`hooks/useChat.ts`
- 메시지 히스토리 관리
- 로딩/스트리밍 상태 (비스트리밍이어도 isStreaming 플래그로 UI 일관 유지)
- `streamChat` 호출 후 onChunk/onComplete/onError 연결

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
- `components/Chat/ChatBottomSheet.tsx` — @gorhom/bottom-sheet, 오늘의 질문 상단 (lib/questions.ts)
- `components/Chat/ChatMessage.tsx` — 사용자: 오른쪽/초록, 정령: 왼쪽/회색
- `components/Chat/ChatInput.tsx` — 텍스트 입력 + 전송
- `components/Chat/TypingIndicator.tsx` — 로딩 중 "..." 애니메이션

### 3-5. 에러 처리
- `getErrorMessage()`는 **HTTP status 우선**, 그다음 메시지 키워드
- `ERROR_MESSAGES`에 `invalid_api_key` 포함 (위 코드 참고)

### Phase 3 완료 기준
- [ ] AI 챗봇 대화 가능
- [ ] 응답 한 번에 표시 (비스트리밍)
- [ ] 오늘의 질문 표시
- [ ] 에러 시 폴백 메시지
- [ ] 채팅 바텀시트 열기/닫기

### Phase 3 커밋
```bash
git checkout -b feature/ai1-chatbot
git add lib/openai.ts hooks/useChat.ts stores/chatStore.ts components/Chat/
git commit -m "feat(ai1): implement AI chatbot (non-streaming)"
git push origin feature/ai1-chatbot
```

---

## Phase 4 (14:00~15:00) - 통합 테스트

**main 머지 후 시작**: `git checkout main && git pull`

### 4-1. AI 응답 품질 테스트
- [ ] "힘들었어" → 공감 응답 확인
- [ ] 조언 없음, 50자 이내, "매일 해봐" 등 부담 주는 말 없음

### 4-2. 안정성 테스트
- [ ] 연속 대화 3회
- [ ] 네트워크 끊김 시 에러 메시지 확인

### 4-3. 버그 수정
- 발견 시 즉시 수정

---

## Phase 5 (15:00~15:30) - 데모 지원

- [ ] 시나리오 2 (정령과 대화) 테스트
- [ ] AI 응답 품질 최종 확인
- [ ] 백업 하드코딩 응답 준비

---

## 규칙
- `.cursor/rules/spirit-ai.mdc` 참고
- AI-2가 만든 prompts.ts, questions.ts 사용
- **채팅**: 비스트리밍 권장 (Expo/RN에서 response.body null 방지)

## 최종 커밋
```bash
git checkout main && git pull
git add -A
git commit -m "feat(ai1): finalize AI chatbot"
git push origin main
```
