#!/bin/bash
# Stone Buddy 프로젝트 초기화 스크립트
# 해커톤 시작 시 이 스크립트를 실행하면 전체 폴더 구조가 만들어집니다.

echo "🌿 Stone Buddy 힐링 테라리움 - 프로젝트 구조 생성 중..."

# ============================================
# 1. 앱 프로젝트 (FE-1)
# ============================================
mkdir -p app/assets

# ============================================
# 2. 웹 프로젝트 (FE-2 + AI-1)
# ============================================
mkdir -p web/src/components
mkdir -p web/src/hooks
mkdir -p web/src/stores
mkdir -p web/src/lib
mkdir -p web/public/models

# ============================================
# 3. 공유 모듈 (AI-2)
# ============================================
mkdir -p shared

# ============================================
# 4. 문서 (AI-2)
# ============================================
mkdir -p docs/prd
mkdir -p docs/todo_plan
mkdir -p docs/archive

# ============================================
# 5. Cursor 설정 (AI-2)
# ============================================
mkdir -p .cursor/rules
mkdir -p .cursor/commands
mkdir -p .cursor/knowledge

# ============================================
# 6. 환경변수 예시
# ============================================
cat > .env.example << 'ENVEOF'
# === OpenAI ===
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here

# === 게임 설정 ===
EXPO_PUBLIC_COIN_INTERVAL=300000
EXPO_PUBLIC_MAX_TOKENS=150
EXPO_PUBLIC_DEBUG=false
EXPO_PUBLIC_FORCE_2D_FALLBACK=false
ENVEOF

# ============================================
# 7. .gitignore
# ============================================
cat > .gitignore << 'GIEOF'
# Dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
ios/
android/

# Vite
web/dist/

# Environment
.env
.env.local
.env*.local

# TypeScript
*.tsbuildinfo

# OS
.DS_Store

# Debug
npm-debug.*

# Metro
.metro-health-check*
GIEOF

echo ""
echo "✅ 프로젝트 구조 생성 완료!"
echo ""
echo "📁 구조:"
echo "  app/                → FE-1 (Expo 네이티브)"
echo "  web/src/components/ → FE-2 (3D 씬)"
echo "  web/src/App.tsx     → AI-1 (채팅/상태)"
echo "  shared/             → AI-2 (타입/규격)"
echo "  docs/               → AI-2 (문서)"
echo "  .cursor/            → AI-2 (규칙/커맨드)"
echo ""
echo "🚀 다음 단계:"
echo "  1. cd app && npx create-expo-app@latest . --template blank-typescript"
echo "  2. cd web && npm create vite@latest . -- --template react-ts"
echo "  3. 각자 역할 확인 후 HACKATHON-GUIDE.md 참고!"
echo "  4. cp .env.example .env && API 키 입력"
