# Phase 1: 환경 설정 (전원)

## 실행 조건
- 모든 팀원이 같은 Node.js 버전 사용 (v20+)
- Git 레포 클론 완료

## Step 1: 모노레포 구조 생성
```bash
mkdir stone-buddy && cd stone-buddy
git init
mkdir -p app web shared docs .cursor/rules .cursor/commands .cursor/knowledge
```

## Step 2: Expo 앱 설정 (FE-1)
```bash
cd app
npx create-expo-app@latest . --template blank-typescript
npm install react-native-webview react-native-safe-area-context expo-audio expo-av expo-status-bar
cd ..
```

## Step 3: Vite 웹 프로젝트 설정 (FE-2)
```bash
cd web
npm create vite@latest . -- --template react-ts
npm install three @react-three/fiber @react-three/drei @types/three
mkdir -p public/models src/components
cd ..
```

## Step 4: 공유 타입 설정 (AI-2)
```bash
cd shared
# types.ts, message-protocol.ts, constants.ts 생성
# .cursorrules에 정의된 내용 기반으로
cd ..
```

## Step 5: 환경변수 설정
```bash
# .env.example 생성
cat > .env.example << 'EOF'
# OpenAI API Key (필수)
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here

# 게임 설정 (선택)
EXPO_PUBLIC_COIN_INTERVAL=300000
EXPO_PUBLIC_MAX_TOKENS=150
EXPO_PUBLIC_DEBUG=false
EXPO_PUBLIC_FORCE_2D_FALLBACK=false
EOF

# 실제 .env 생성 (gitignore 대상)
cp .env.example .env
# → API 키 입력
```

## Step 6: Git 설정
```bash
# .gitignore 설정
cat > .gitignore << 'EOF'
node_modules/
.expo/
dist/
.env
.env.local
*.tsbuildinfo
.DS_Store
ios/
android/
EOF

# 첫 커밋
git add .
git commit -m "[setup] Phase 1: 프로젝트 초기 구조"

# 브랜치 생성
git checkout -b feature/phase1-setup
```

## Step 7: GLB 모델 준비
```
web/public/models/ 에 배치:
- RobotExpressive.glb (Three.js 공식 예제)
- forest_house.glb (무료 GLB)
```
출처: https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf

## Step 8: 확인
```bash
# 웹 실행 테스트
cd web && npm run dev  # → localhost:5173 확인

# Expo 실행 테스트
cd ../app && npx expo start  # → 시뮬레이터/기기 확인
```

## 완료 조건
- [ ] web/ dev 서버 정상 실행
- [ ] app/ Expo 정상 실행
- [ ] shared/ 타입 파일 생성 완료
- [ ] .env 설정 완료
- [ ] GLB 모델 배치 완료
- [ ] Git 첫 커밋 완료
