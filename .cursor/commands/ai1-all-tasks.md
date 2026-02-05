# AI-1: AI 연동 / 채팅 / 상태 관리 전체 태스크 (또봇 로봇 집사)

## Phase 2: App.tsx 기본 구조

### Task 2-1: Canvas + Scene 연결
- [ ] useState<RobotAnimation>('Idle')
- [ ] useState<StoneEmotion>('calm')
- [ ] Canvas: shadows, camera [0,3,8] fov 45, 배경 그라데이션
- [ ] Suspense fallback={null}
- [ ] Scene에 animation, stoneEmotion prop 전달

### Task 2-2: 애니메이션 버튼 UI
- [ ] ROBOT_ANIMATIONS.map → button 렌더링
- [ ] ANIMATION_INFO 매핑 (emoji + 한글 이름)
- [ ] active 상태 스타일링

## Phase 3: 메시지 수신 + 또봇 AI

### Task 3-1: WebView 메시지 리스너
- [ ] window.addEventListener('message', handler)
- [ ] RECORDING_START → 시각 피드백 (Wave 등)
- [ ] VOICE_RESULT → handleUserInput(text, 'voice') 호출
- [ ] TEXT_INPUT → handleUserInput(text, 'text') 호출
- [ ] cleanup: removeEventListener

### Task 3-2: 또봇 OpenAI 채팅 연동
- [ ] lib/openai.ts: chatWithRobot(userMessage) 함수
- [ ] 시스템 프롬프트: 또봇 로봇 집사 설정
- [ ] GPT-4o-mini, max_tokens 150, temperature 0.8
- [ ] response_format: { type: 'json_object' } (JSON 강제)
- [ ] API 키 없을 때 폴백 응답 (ROBOT_FALLBACK_RESPONSES)

### Task 3-3: AI 응답 → 애니메이션 매핑
- [ ] handleUserInput(text, source) 통합 함수
- [ ] CommandResult 파싱
- [ ] result.action → ACTION_TO_ANIMATION → setAnimation
- [ ] result.stoneEmotionChange → setStoneEmotion

### Task 3-4: 또봇 시스템 프롬프트
- [ ] lib/prompts.ts: ROBOT_SYSTEM_PROMPT
- [ ] JSON 응답 형식 강제
- [ ] 50자 이내 응답 규칙
- [ ] 이모지 제한 목록 (ROBOT_EMOJIS)
- [ ] 명령 유형별 응답 예시

## Phase 4: 상태 관리

### Task 4-1: 게임 상태 스토어
- [ ] stores/game-state.ts (Zustand)
- [ ] stone: StoneState (emotion, lastInteraction, name)
- [ ] currentAnimation: RobotAnimation
- [ ] lastInputText: string | null
- [ ] interactionCount: number
- [ ] setAnimation, setStoneEmotion, incrementInteraction 액션

### Task 4-2: 채팅 히스토리
- [ ] ChatMessage[] 관리 (role: 'user' | 'robot')
- [ ] 최근 N개만 유지 (메모리 절약)
- [ ] 화면에 채팅 UI 표시 (선택)

### Task 4-3: 돌돌이 감정 연동
- [ ] stoneEmotion state → Scene → Stone 컴포넌트 전달
- [ ] 감정 변화 시 애니메이션 전환 확인

## Phase 5: 폴리싱

### Task 5-1: AI 품질
- [ ] 프롬프트 튜닝 (JSON 파싱 안정성)
- [ ] 폴백 응답 다양화
- [ ] 에러 메시지 사용자 친화적으로
- [ ] 돌돌이 감정 변화 자연스럽게 조정
