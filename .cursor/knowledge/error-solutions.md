# Error Solutions - 에러 해결 지식 베이스

> Cursor가 항상 참조하는 에러 해결 기록. 에러 발생 시 여기에 추가.

---

## 사용법

1. 에러 발생 시 아래 템플릿으로 기록
2. 해결 후 "해결됨" 체크
3. Cursor가 같은 에러 발생 시 이 파일 참조

---

## 템플릿

```markdown
### [YYYY-MM-DD] 에러 제목
- **상태**: [ ] 해결됨
- **증상**:
- **원인**:
- **해결**:
- **관련 파일**:
- **참고**:
```

---

## 기록된 에러들

<!-- 아래에 에러 기록 추가 -->

### [예시] expo-three GL 컨텍스트 생성 실패
- **상태**: [x] 해결됨
- **증상**: 3D 화면이 검은색으로만 표시됨
- **원인**: `gl.endFrameEXP()` 호출 누락
- **해결**: animate 함수 마지막에 `gl.endFrameEXP()` 추가
- **관련 파일**: `components/Terrarium/TerrariumScene.tsx`
- **참고**: expo-three 공식 문서 필수 패턴

---

### [예시] OpenAI 401 Unauthorized
- **상태**: [x] 해결됨
- **증상**: AI 응답이 안 오고 401 에러
- **원인**: `.env` 파일에 API 키 누락
- **해결**: `EXPO_PUBLIC_OPENAI_API_KEY=sk-xxx` 설정
- **관련 파일**: `.env`, `lib/openai.ts`
- **참고**: 환경변수는 반드시 `EXPO_PUBLIC_` 접두사 필요

---

### [예시] NativeWind 스타일 미적용
- **상태**: [x] 해결됨
- **증상**: `className` prop이 무시됨
- **원인**: babel.config.js에 플러그인 누락
- **해결**: `plugins: ['nativewind/babel']` 추가
- **관련 파일**: `babel.config.js`, `tailwind.config.js`
- **참고**: Metro 캐시 클리어 필요 (`npx expo start -c`)

---

### [예시] Response body is null (Expo/RN)
- **상태**: [x] 해결됨
- **증상**: 스트리밍 요청 시 "Response body is null" 에러
- **원인**: Expo/React Native의 fetch는 response.body(ReadableStream) 미지원
- **해결**: 채팅을 비스트리밍(stream: false)으로 통일
- **관련 파일**: `lib/openai.ts`
- **참고**: ai1-all-tasks.md "에러 없이 빠르게 구현하기" 참조

---

<!-- 새 에러는 여기 아래에 추가 -->
