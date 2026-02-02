# Phase 1: 환경 설정

**담당**: 전원 (FE-1 리드)
**시간**: 11:00 ~ 11:20 (20분)
**선행 조건**: 없음

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

Expo 프로젝트를 생성하고 필요한 패키지를 설치해줘.

### 1. Expo 프로젝트 생성
```bash
npx create-expo-app@latest healing-terrarium --template blank-typescript
cd healing-terrarium
```

### 2. 패키지 설치
```bash
# 3D
npx expo install expo-gl expo-three three

# 상태 관리
npm install zustand
npx expo install @react-native-async-storage/async-storage

# AI
npm install openai

# UI
npm install nativewind tailwindcss
npx expo install react-native-reanimated react-native-gesture-handler
npm install @gorhom/bottom-sheet

# Navigation
npx expo install expo-router expo-linking expo-constants
```

### 3. NativeWind 설정
- `tailwind.config.js` 생성
- `babel.config.js` 수정
- `global.css` 생성

### 4. 폴더 구조 생성
```
app/
├── (tabs)/
│   ├── _layout.tsx
│   └── index.tsx
├── _layout.tsx
components/
├── Terrarium/
│   └── items/
├── Chat/
├── Spirit/
├── Shop/
├── Diary/
└── UI/
stores/
hooks/
lib/
types/
```

### 5. 환경변수 설정
```bash
cp .env.example .env
# EXPO_PUBLIC_OPENAI_API_KEY 입력
```

## 완료 기준
- [ ] `npx expo start` 실행 성공
- [ ] Expo Go 앱에서 접속 확인
- [ ] 폴더 구조 생성 완료
- [ ] 전원 같은 repo clone 완료

## 커밋
```bash
git add -A
git commit -m "chore: initial project setup with Expo SDK 52"
git push origin main
```

## 다음 단계
→ Phase 2 시작 (FE-1: phase2-fe1-3d.md, FE-2: phase2-fe2-shop.md)
