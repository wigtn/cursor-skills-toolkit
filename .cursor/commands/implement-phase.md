# Implement Phase

PRD와 Task Plan을 기반으로 특정 Phase를 구현합니다.

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## Phase 목록

### Phase 1: 환경 설정 (20분)
- Expo 프로젝트 생성
- 패키지 설치 (expo-three, openai, zustand, nativewind)
- 폴더 구조 생성
- 환경변수 설정

### Phase 2: 3D 테라리움 + 상점 (1시간 20분)
- TerrariumScene.tsx (GLView)
- GlassJar.tsx, Soil.tsx
- 아이템 4종 (Moss, Succulent, Mushroom, Pebbles)
- CoinCounter, ShopBottomSheet
- gameStore + useCoinTimer

### Phase 3: AI 챗봇 + 정령 시스템 (1시간 20분)
- OpenAI 클라이언트 (lib/openai.ts)
- useChat 훅 (스트리밍)
- ChatBottomSheet, ChatMessage, ChatInput
- prompts.ts, questions.ts, spiritResponses.ts
- SpiritStatus, SpiritGreeting

### Phase 4: 감정 루틴 시스템 (1시간)
- "오늘은 여기까지" 버튼
- DiaryModal (1줄 일기)
- 일기 후보 생성 (useDiarySuggestions)
- 정령 상태 변화 로직

### Phase 5: 마무리 (30분)
- 전체 플로우 테스트
- 데모 시나리오 확인
- 버그 수정

## 구현 규칙

1. **PRD의 Completion Criteria 확인**: 해당 Phase의 모든 체크리스트 충족
2. **기존 패턴 따르기**: 이미 생성된 파일의 코드 스타일 유지
3. **에러 핸들링**: 모든 비동기 작업에 try-catch
4. **TypeScript**: strict mode 준수
5. **테스트**: 구현 후 Expo Go에서 확인

## 커밋 메시지
Phase 완료 시 아래 형식으로 커밋:
```
feat: implement Phase N - [설명]
```
