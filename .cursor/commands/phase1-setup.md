# Phase 1: 환경 설정 (전원)

**담당**: 전원 (FE-1 리드)
**시간**: 11:00 ~ 11:20 (20분)

## 1. 프로젝트 생성 (FE-1)

```bash
npx create-expo-app@latest healing-terrarium --template blank-typescript
cd healing-terrarium
```

## 2. 패키지 설치 (병렬 실행)

### FE-1: 3D 패키지
```bash
npx expo install expo-gl expo-three three
```

### FE-2: 상태 관리 + UI
```bash
npm install zustand
npx expo install @react-native-async-storage/async-storage
npm install @gorhom/bottom-sheet
npx expo install react-native-reanimated react-native-gesture-handler
```

### AI-1: AI 패키지
```bash
npm install openai
```

### 공통: 스타일링 + 네비게이션
```bash
npm install nativewind tailwindcss
npx expo install expo-router expo-linking expo-constants expo-haptics
```

## 3. 설정 파일 (FE-2)

### tailwind.config.js
```javascript
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### babel.config.js
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel', 'react-native-reanimated/plugin'],
  };
};
```

## 4. 폴더 구조 생성 (FE-2)

```bash
mkdir -p app/\(tabs\)
mkdir -p components/{Terrarium/items,Chat,Spirit,Shop,Diary,UI}
mkdir -p stores hooks lib types
```

## 5. 환경변수 설정 (AI-1)

```bash
cp .env.example .env
# EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here
```

## 6. Git 설정 (FE-2)

```bash
git init
git add -A
git commit -m "chore: initial project setup"
git remote add origin <repo-url>
git push -u origin main
```

## 7. 확인

- [ ] `npx expo start` 실행 성공
- [ ] Expo Go 앱에서 접속
- [ ] 전원 repo clone 완료

## 다음 단계

```
→ FE-1: fe1-all-tasks.md (Phase 2 시작)
→ FE-2: fe2-all-tasks.md (Phase 2 시작)
→ AI-1: ai1-all-tasks.md (Phase 2 준비)
→ AI-2: ai2-all-tasks.md (Phase 2 콘텐츠 작성)
```
