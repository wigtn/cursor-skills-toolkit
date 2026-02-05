# AI-2: 타입 / 문서 / 규칙 / 통합 전체 태스크

## Phase 1: 타입 + 인터페이스 확정

### Task 1-1: shared/types.ts
- [ ] ROBOT_NAME, STONE_NAME 상수
- [ ] StoneEmotion, StoneState
- [ ] RobotAction, CommandIntent, CommandResult
- [ ] ACTION_TO_ANIMATION 매핑
- [ ] detectCommandIntent, detectStoneEmotion 헬퍼
- [ ] GameState
- [ ] RobotAnimation, ROBOT_ANIMATIONS
- [ ] ChatMessage (role: 'user' | 'robot')

### Task 1-2: shared/message-protocol.ts
- [ ] NativeToWebMessageType (TEXT_INPUT 추가)
- [ ] WebToNativeMessageType (ROBOT_RESPONSE, STONE_EMOTION_CHANGED 추가)
- [ ] BridgeMessage<T>
- [ ] VoiceResultPayload, TextInputPayload, RobotResponsePayload
- [ ] AppMessageState (PROCESSING_TEXT 추가)
- [ ] MESSAGE_STATE_TRANSITIONS (IDLE → PROCESSING_TEXT 전환 추가)
- [ ] 전송 방법 주석 문서화

### Task 1-3: shared/constants.ts
- [ ] ENV_KEYS
- [ ] OPENAI_CONFIG
- [ ] ROBOT_EMOJIS (기존 SPIRIT_EMOJIS 대체)
- [ ] ROBOT_FALLBACK_RESPONSES
- [ ] STONE_EMOTION_MESSAGES
- [ ] COMMAND_EXAMPLES
- [ ] DUMMY_STT_SENTENCES (명령 예시로 변경)
- [ ] WEB_URLS

## Phase 1: Cursor 설정

### Task 1-4: .cursor/rules/
- [ ] .cursorrules (마스터 규칙 - 돌돌이/또봇 컨셉)
- [ ] team-workflow.mdc (팀 워크플로우)
- [ ] fe1-expo-native.mdc (FE-1 규칙 - 텍스트 입력 가이드 추가)
- [ ] fe2-3d-web.mdc (FE-2 규칙 - Stone 감정 애니메이션 가이드)
- [ ] ai1-chat-state.mdc (AI-1 규칙 - 또봇 페르소나, JSON 응답)
- [ ] ai2-types-docs.mdc (AI-2 규칙)
- [ ] troubleshooting.mdc (트러블슈팅)

### Task 1-5: .cursor/commands/
- [ ] phase1-setup.md
- [ ] fe1-all-tasks.md
- [ ] fe2-all-tasks.md
- [ ] ai1-all-tasks.md
- [ ] ai2-all-tasks.md

### Task 1-6: .cursor/knowledge/
- [ ] error-solutions.md (템플릿 생성)

## Phase 2~3: 문서 관리

### Task 2-1: docs/
- [ ] PRD 최신화 (돌돌이/또봇 컨셉 반영)
- [ ] PLAN 진행 상황 업데이트
- [ ] 아키텍처 다이어그램 업데이트

### Task 3-1: 타입 확장 (요청 시)
- [ ] 다른 팀원의 타입 추가 요청 처리
- [ ] 인터페이스 변경 시 전원 알림
- [ ] 변경 사항 문서화

## Phase 4: 통합

### Task 4-1: 통합 테스트 가이드
- [ ] 실행 순서 문서화
- [ ] 환경별 URL 설정 가이드
- [ ] 에러 대응 체크리스트
- [ ] 돌돌이 감정 시스템 테스트 체크리스트

## Phase 5: 최종 문서

### Task 5-1: README.md
- [ ] 프로젝트 소개 (돌돌이/또봇 컨셉)
- [ ] 캐릭터 소개 (돌돌이 감정, 또봇 역할)
- [ ] 명령 시스템 설명
- [ ] 실행 방법
- [ ] 팀 구성
- [ ] 기술 스택
- [ ] 데모 스크린샷/GIF

### Task 5-2: 발표 준비
- [ ] 데모 시나리오 작성 (명령 → 또봇 → 돌돌이)
- [ ] 핵심 기술 포인트 정리
- [ ] 어려웠던 점 / 해결 과정
