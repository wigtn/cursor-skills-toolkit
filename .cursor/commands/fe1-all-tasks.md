# FE-1: Expo 네이티브 앱 전체 태스크

## Phase 2: Expo 앱 기본 구조

### Task 2-1: App.tsx 기본 구조
- [ ] SafeAreaProvider + SafeAreaView 래핑
- [ ] StatusBar style="dark"
- [ ] WebView 전체 화면 배치
- [ ] WEB_URL 상수 (iOS/Android/프로덕션 분기)

### Task 2-2: WebView 설정
- [ ] javaScriptEnabled, domStorageEnabled
- [ ] allowsInlineMediaPlayback, mediaPlaybackRequiresUserAction false
- [ ] originWhitelist={['*']}
- [ ] onLoadEnd → 로딩 오버레이 해제
- [ ] onMessage 핸들러 연결
- [ ] onError 에러 핸들링

### Task 2-3: 로딩 화면
- [ ] isLoading 상태 관리
- [ ] ActivityIndicator + "로딩 중..." 오버레이
- [ ] WebView 로드 완료 시 해제

### Task 2-4: 녹음 버튼 UI
- [ ] 하단 녹음 버튼 (TouchableOpacity)
- [ ] 상태별 아이콘/텍스트/색상 (기본/녹음중/처리중/권한없음)
- [ ] StyleSheet 스타일 정의

## Phase 2: 음성 녹음 + STT

### Task 2-5: 마이크 권한
- [ ] useEffect에서 requestRecordingPermissionsAsync
- [ ] 권한 허용 → setAudioModeAsync
- [ ] 권한 거부 → Alert 표시
- [ ] permissionGranted 상태 관리

### Task 2-6: 녹음 기능
- [ ] useAudioRecorder(RecordingPresets.HIGH_QUALITY)
- [ ] startRecording: prepareToRecordAsync → record
- [ ] stopRecording: stop → uri 확보
- [ ] isRecording 상태 관리

### Task 2-7: Whisper STT 연동
- [ ] transcribeAudio(audioUri) 함수
- [ ] FormData: file(m4a), model(whisper-1), language(ko)
- [ ] POST https://api.openai.com/v1/audio/transcriptions
- [ ] API 키 없을 때 더미 문장 폴백

### Task 2-8: WebView 메시지 전송
- [ ] sendToWebView(type, payload) 함수
- [ ] RECORDING_START 이벤트 전송 (녹음 시작 시)
- [ ] VOICE_RESULT 이벤트 전송 (STT 완료 시)

## Phase 4: 네이티브 기능 확장

### Task 4-1: 앱 생명주기
- [ ] AppState 감지 (foreground/background)
- [ ] 백그라운드 전환 시 APP_STATE_CHANGED 메시지

### Task 4-2: 에러 핸들링 강화
- [ ] try-catch 모든 비동기 함수
- [ ] 사용자 친화적 에러 메시지
- [ ] __DEV__ 조건부 디버그 텍스트

## Phase 5: 폴리싱

### Task 5-1: UI 개선
- [ ] 스플래시 화면 커스텀
- [ ] 앱 아이콘 교체
- [ ] 녹음 버튼 애니메이션 (pulse 등)

### Task 5-2: 안정성
- [ ] 메모리 누수 점검
- [ ] 녹음 파일 정리 (사용 후 삭제)
- [ ] WebView 크래시 복구
