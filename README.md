# Healing Terrarium

> 나만의 3D 테라리움을 키우며, 정령 '초록이'와 힐링 대화를 나누는 감정 루틴 앱

**Cursor Seoul Hackathon 2026** | 팀 4명 | 5시간 개발

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **컨셉** | 3D 테라리움 + AI 정령 + 감정 루틴 |
| **플랫폼** | React Native + Expo (iOS/Android) |
| **핵심 기술** | expo-three, OpenAI GPT-4o-mini, Zustand |
| **PRD** | `docs/prd/PRD_stone-garden.md` |
| **Task Plan** | `docs/todo_plan/PLAN_stone-garden.md` |

---

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/wigtn/cursor-hackathon.git
cd cursor-hackathon
```

### 2. 환경변수 설정

```bash
cp .env.example .env
# .env 파일에 OpenAI API 키 입력
# EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here
```

### 3. Cursor로 구현 시작

각 담당자가 본인의 command 파일을 Cursor Composer에 붙여넣기:

```
1. Cursor 에디터 열기
2. Cmd+Shift+I (Agent Mode) 또는 Cmd+I (Composer)
3. 본인 담당 command 파일 내용 복사-붙여넣기
4. Enter
```

---

## 팀 역할 및 담당 Command

| 역할 | 담당자 | Command 파일 | Phase |
|------|--------|--------------|-------|
| **3D 리드** | FE-1 | `.cursor/commands/fe1-3d-terrarium.md` | Phase 2 |
| **상태/로직** | FE-2 | `.cursor/commands/fe2-state-shop.md` | Phase 2, 4 |
| **AI 리드** | AI-1 | `.cursor/commands/ai1-chatbot.md` | Phase 3 |
| **콘텐츠/QA** | AI-2 | `.cursor/commands/ai2-content.md` | Phase 3, 5 |

---

## Cursor 설정 구조

### Commands (`.cursor/commands/`)

담당자별로 Cursor에 복사-붙여넣기 할 프롬프트:

```
.cursor/commands/
├── fe1-3d-terrarium.md   # FE-1: 3D 테라리움 씬 + 아이템
├── fe2-state-shop.md     # FE-2: Zustand 상태 + 상점 + 일기
├── ai1-chatbot.md        # AI-1: OpenAI 챗봇 + 스트리밍
├── ai2-content.md        # AI-2: 프롬프트 + 질문 + 멘트
├── implement-phase.md    # 범용 Phase 구현 가이드
└── test-demo.md          # 데모 시나리오 테스트
```

### Rules (`.cursor/rules/`)

Cursor가 자동으로 적용하는 코딩 규칙:

```
.cursor/rules/
├── healing-terrarium.mdc   # 프로젝트 전체 규칙 (기술 스택, 폴더 구조)
├── spirit-ai.mdc           # 초록이 AI 성격 + 응답 규칙
├── expo-three-mobile.mdc   # expo-three 3D 렌더링 패턴
└── team-workflow.mdc       # Git 브랜치 전략 + 파일 충돌 방지
```

---

## 개발 타임라인

```
11:00 ─────────────────────────────────────────────────── 15:30
  │                                                         │
  │ P1  │    Phase 2      │    Phase 3      │  P4   │  P5  │
  │20m  │    1h 20m       │    1h 20m       │  1h   │ 30m  │
  │     │                 │                 │       │      │
  └─────┴─────────────────┴─────────────────┴───────┴──────┘
       11:20             12:40             14:00   15:00
```

| Phase | 시간 | 담당 | 내용 |
|-------|------|------|------|
| **1** | 11:00-11:20 | 전원 | 환경 설정, 패키지 설치 |
| **2** | 11:20-12:40 | FE-1, FE-2 | 3D 테라리움 + 상점 |
| **3** | 12:40-14:00 | AI-1, AI-2, FE-2 | AI 챗봇 + 정령 시스템 |
| **4** | 14:00-15:00 | FE-2 | 감정 루틴 (일기, 마무리) |
| **5** | 15:00-15:30 | 전원 | 테스트 + 버그 수정 |

---

## Git 브랜치 전략

```bash
# 각 담당자가 본인 브랜치 생성
git checkout main
git pull origin main
git checkout -b feature/phase2-3d  # 본인 담당 Phase

# 작업 완료 후 머지
git add .
git commit -m "feat: implement 3D terrarium scene"
git push origin feature/phase2-3d
# GitHub에서 PR 생성 → main 머지
```

### 머지 순서

1. `types/` → main (11:20, FE-2)
2. Phase 2 브랜치들 → main (12:40)
3. Phase 3 브랜치들 → main (14:00)
4. Phase 4 → main (15:00)

---

## 핵심 규칙

### 초록이 AI 응답 규칙

```
✅ 허용
- 공감 + 질문 ("많이 지쳤구나 🌿 무슨 일이었어?")
- 50자 이내 짧은 응답
- 이모지: 🌱 🌿 ✨ 🍄 💎 🥺 🌙

❌ 금지
- "매일 해봐", "꾸준히 하면 돼" (부담 주는 말)
- 해결책 먼저 제시 (조언 금지)
- 50자 초과
```

### 3D 렌더링 규칙

```
✅ 허용
- expo-three + GLView
- 단순 geometry (Sphere, Cylinder, Box)
- segment 수 16-32

❌ 금지
- drei 패키지 (모바일 미지원)
- 100+ 폴리곤 메시
- 실시간 그림자
```

---

## 데모 시나리오 (3분 30초)

### Scenario 1: 첫 만남 (1분)
앱 실행 → 3D 테라리움 → 초록이 인사 → 코인 +1

### Scenario 2: 정령과 대화 (1분 30초)
💬 버튼 → 오늘의 질문 → "힘들었어" 입력 → 공감 응답

### Scenario 3: 꾸미기 + 마무리 (1분)
🛒 상점 → 버섯 구매 → 정령 반응 → "오늘은 여기까지" → 1줄 일기

---

## 폴더 구조 (구현 후)

```
app/                        # Expo Router
├── (tabs)/
│   ├── index.tsx           # 메인 화면 (3D 테라리움)
│   └── diary.tsx           # 일기 목록 (P1)
components/
├── Terrarium/              # 3D 씬 + 아이템
├── Chat/                   # 채팅 UI
├── Spirit/                 # 정령 상태
├── Shop/                   # 상점
├── Diary/                  # 일기
└── UI/                     # 공통 UI
stores/                     # Zustand 상태
hooks/                      # Custom Hooks
lib/                        # 유틸리티 (OpenAI, 프롬프트)
types/                      # TypeScript 타입
```

---

## 문서

| 문서 | 경로 | 설명 |
|------|------|------|
| PRD | `docs/prd/PRD_stone-garden.md` | 전체 요구사항 (v5.0) |
| Task Plan | `docs/todo_plan/PLAN_stone-garden.md` | 실행 계획 |
| Archive | `docs/archive/` | 이전 문서들 |

---

## 기술 스택

```json
{
  "runtime": "React Native 0.76.x + Expo SDK 52",
  "3d": "expo-gl + expo-three + three.js",
  "ai": "OpenAI GPT-4o-mini (streaming)",
  "state": "Zustand + AsyncStorage",
  "styling": "NativeWind v4",
  "ui": "@gorhom/bottom-sheet"
}
```

---

## 라이선스

MIT License
