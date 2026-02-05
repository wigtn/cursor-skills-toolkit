# 에러 해결 지식 베이스

> 에러를 해결할 때마다 이 파일에 기록합니다.
> Cursor AI가 같은 에러를 만나면 이 파일을 참조합니다.

---

## expo-three: gl.endFrameEXP() 누락
- **날짜**: 2026-02-XX
- **상태**: 해결됨
- **증상**: 3D 씬이 검은 화면으로 표시
- **원인**: expo-three 사용 시 animate 루프에서 `gl.endFrameEXP()` 미호출
- **해결**: 렌더 루프 마지막에 `gl.endFrameEXP()` 추가
- **관련 파일**: 3D 렌더링 관련 파일
- **참고**: R3F(@react-three/fiber) 사용 시에는 불필요 (R3F가 렌더 루프 관리)

---

## OpenAI 401 Unauthorized
- **날짜**: 2026-02-XX
- **상태**: 해결됨
- **증상**: OpenAI API 호출 시 401 에러
- **원인**: API 키 미설정 또는 만료
- **해결**: .env에 EXPO_PUBLIC_OPENAI_API_KEY 설정, 키 없을 때 더미 폴백
- **관련 파일**: app/App.tsx (transcribeAudio), lib/openai.ts

---

## NativeWind 스타일 미적용
- **날짜**: 2026-02-XX
- **상태**: 해결됨
- **증상**: NativeWind className이 적용되지 않음
- **원인**: babel.config.js에 NativeWind 프리셋 누락
- **해결**: babel.config.js에 `presets: ['nativewind/babel']` 추가
- **관련 파일**: babel.config.js

---

## Response body null (OpenAI 스트리밍)
- **날짜**: 2026-02-XX
- **상태**: 해결됨 (회피)
- **증상**: OpenAI 스트리밍 응답에서 body가 null
- **원인**: React Native 환경에서 ReadableStream 지원 제한
- **해결**: 비스트리밍 모드 사용 (`stream: false` 또는 생략)
- **관련 파일**: lib/openai.ts
- **참고**: 해커톤에서는 스트리밍 구현 비추천

---

## [새 에러 템플릿]
- **날짜**:
- **상태**:
- **증상**:
- **원인**:
- **해결**:
- **관련 파일**:
- **참고**:

---

## WebView 메시지 수신 안됨 (Race Condition)
- **날짜**: 2026-02-05
- **상태**: 예방 조치
- **증상**: RECORDING_START와 VOICE_RESULT가 빠르게 연속 전송될 때 상태 불일치
- **원인**: 동시 메시지 처리 시 순서 보장 없음
- **해결**:
  1. shared/message-protocol.ts의 `AppMessageState` 상태 머신 사용
  2. `MESSAGE_STATE_TRANSITIONS`로 상태 전환 검증
  3. 버튼 디바운싱 (500ms)
- **관련 파일**: shared/message-protocol.ts, web/src/App.tsx, app/App.tsx
- **참고**: troubleshooting.mdc의 "메시지 동기화 문제" 섹션

---

## API 키 노출 위험
- **날짜**: 2026-02-05
- **상태**: 예방 조치
- **증상**: EXPO_PUBLIC_* 환경변수가 클라이언트 번들에 포함
- **원인**: Expo 환경변수 규칙 (PUBLIC 접두사는 클라이언트에 노출)
- **해결**:
  1. shared/constants.ts의 `isValidApiKey()` 함수로 검증
  2. 프로덕션에서는 백엔드 프록시 권장
  3. .gitignore에 .env 파일 추가 완료
- **관련 파일**: shared/constants.ts, .gitignore
- **참고**: 해커톤에서는 더미 폴백으로 진행, 프로덕션 전 백엔드 구축 필수

---

## Rate Limit 초과 (429)
- **날짜**: 2026-02-05
- **상태**: 예방 조치
- **증상**: OpenAI API 호출 시 429 Too Many Requests
- **원인**: 분당 요청 제한 초과
- **해결**:
  1. shared/constants.ts의 `RATE_LIMIT` 설정 적용
  2. 지수 백오프 재시도 (1s → 2s → 4s)
  3. 3회 실패 시 폴백 응답 사용
- **관련 파일**: shared/constants.ts, troubleshooting.mdc
- **참고**: 해커톤에서는 폴백 우선, 완벽한 구현보다 데모 안정성

---

## GLB 모델 로드 실패 (사전 검증 필수)
- **날짜**: 2026-02-05
- **상태**: 예방 조치
- **증상**: 3D 씬이 비어있거나 검은 화면
- **원인**: GLB 파일 누락 또는 손상
- **해결**:
  1. Phase 1에서 `ls -la web/public/models/` 확인
  2. RobotExpressive.glb 다운로드: https://github.com/mrdoob/three.js/raw/dev/examples/models/gltf/RobotExpressive/RobotExpressive.glb
  3. 파일 크기 10MB 이하 확인
- **관련 파일**: web/public/models/*.glb
- **참고**: HACKATHON-GUIDE.md의 "Phase 1 사전 체크리스트"

---

## 입력 검증 실패 (보안)
- **날짜**: 2026-02-05
- **상태**: 예방 조치
- **증상**: 악의적 STT 결과 또는 메시지로 인한 에러
- **원인**: 입력 검증 부재
- **해결**:
  1. shared/constants.ts의 `INPUT_VALIDATION` 설정 적용
  2. shared/message-protocol.ts의 타입 가드 함수 사용
  3. 텍스트 길이 500자 제한, 특수문자 필터링
- **관련 파일**: shared/constants.ts, shared/message-protocol.ts
- **참고**: 보안 분석 결과 INPUT-001~004 참조
