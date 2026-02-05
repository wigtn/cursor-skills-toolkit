# AI Call Agent - 4시간 해커톤 퀵스타트

> **4명이 4시간 안에 AI 전화 대행 서비스 만들기**

## 시작하기 전 체크리스트

### 필수 API 키 확인

| 서비스 | 용도 | 발급 |
|--------|------|------|
| OpenAI | 자연어 파싱 | [platform.openai.com](https://platform.openai.com) |
| ElevenLabs | AI 통화 | [elevenlabs.io](https://elevenlabs.io) |

### 팀 역할 배정

| 역할 | 담당 | 지시서 |
|------|------|--------|
| **FE1** | 입력/확인 UI | `.cursor/commands/fe1-call-agent.md` |
| **FE2** | 결과/상태 UI | `.cursor/commands/fe2-call-agent.md` |
| **BE1** | API + DB + 셋업 리드 | `.cursor/commands/be1-call-agent.md` |
| **BE2** | ElevenLabs 연동 | `.cursor/commands/be2-call-agent.md` |

---

## Phase 0: 프로젝트 셋업 (30분)

### BE1이 실행 (다른 팀원은 대기)

```bash
# 1. 프로젝트 생성
npx create-next-app@latest ai-call-agent --typescript --tailwind --eslint --app
cd ai-call-agent

# 2. 의존성 설치
npm install prisma @prisma/client openai
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card

# 3. Prisma 설정
npx prisma init --datasource-provider sqlite

# 4. Git 설정
git init
git add .
git commit -m "chore: Initial setup"
```

### 모든 팀원

```bash
# 저장소 클론
git clone <repo-url>
cd ai-call-agent
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 편집해서 API 키 입력
```

### .env.local 내용

```bash
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
ELEVENLABS_AGENT_ID=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Phase 1: 개발 시작 (90분)

### 각자 브랜치 생성 후 작업

```bash
# FE1
git checkout -b feat/fe1-input-ui

# FE2
git checkout -b feat/fe2-result-ui

# BE1
git checkout -b feat/be1-api

# BE2
git checkout -b feat/be2-elevenlabs
```

### 각자 지시서 열기

Cursor에서 해당 지시서 파일을 열고 Cursor에게 지시:

```
이 지시서를 따라 개발해줘. FE1-1부터 시작해.
```

---

## Phase 2: 통합 (60분)

### 브랜치 머지

```bash
# 모든 팀원이 작업 커밋
git add .
git commit -m "feat: Complete my tasks"
git push origin <branch-name>

# BE1이 머지 리드
git checkout main
git merge feat/be1-api
git merge feat/fe1-input-ui
git merge feat/fe2-result-ui
git merge feat/be2-elevenlabs
git push origin main
```

### 통합 테스트

1. `npm run dev` 실행
2. http://localhost:3000 접속
3. 요청 입력 → 확인 → 전화 걸기 → 결과 확인

---

## 트러블슈팅

### Prisma 에러

```bash
npx prisma generate
npx prisma migrate dev --name fix
```

### ElevenLabs 연동 실패

`.env.local`에 추가:
```bash
ELEVENLABS_MOCK=true
```

### 포트 충돌

```bash
npx kill-port 3000
npm run dev
```

---

## 데모 준비 (15분)

### 테스트 시나리오

```
입력: "내일 오후 3시에 OO미용실 커트 예약해줘"
전화번호: 팀원 실제 번호

예상 결과: AI가 전화 → 예약 완료 → 결과 화면
```

### 백업 계획

1. ElevenLabs 실패 시 → Mock 모드로 데모
2. 화면 녹화해두기
3. 스크린샷 준비

---

## 파일 구조 최종

```
ai-call-agent/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # 입력 화면
│   ├── confirm/[id]/page.tsx    # 확인 화면
│   ├── calling/[id]/page.tsx    # 통화 중
│   ├── result/[id]/page.tsx     # 결과
│   ├── history/page.tsx         # 기록
│   └── api/
│       ├── calls/
│       │   ├── route.ts         # POST, GET
│       │   └── [id]/
│       │       ├── route.ts     # GET
│       │       └── start/route.ts
│       └── webhooks/
│           └── elevenlabs/route.ts
├── components/
│   ├── layout/Header.tsx
│   └── call/
│       ├── RequestForm.tsx
│       ├── ConfirmCard.tsx
│       ├── CallingStatus.tsx
│       ├── ResultCard.tsx
│       └── HistoryList.tsx
├── lib/
│   ├── prisma.ts
│   ├── parser.ts
│   ├── elevenlabs.ts
│   ├── api.ts
│   └── validation.ts
├── shared/
│   └── types.ts
└── prisma/
    └── schema.prisma
```

---

## 성공 기준 체크

- [ ] 입력 화면에서 요청 입력 가능
- [ ] 확인 화면에서 파싱 결과 표시
- [ ] 전화 걸기 버튼 동작
- [ ] 통화 중 화면 표시
- [ ] 결과 화면 표시
- [ ] (보너스) 실제 ElevenLabs 통화 성공

---

## 발표 스크립트 (2분)

```
안녕하세요, AI Call Agent입니다.

[문제]
전화 통화가 불편한 분들을 위해, AI가 대신 전화해주는 서비스입니다.

[데모]
1. 사용자가 "내일 오후 3시 미용실 예약"이라고 입력합니다.
2. AI가 이를 파싱해서 확인 화면을 보여줍니다.
3. 전화 걸기를 누르면, AI가 실제로 전화를 겁니다.
4. 통화가 끝나면 결과를 보여줍니다.

[기술 스택]
- Next.js 16 + Tailwind CSS
- ElevenLabs Conversational AI
- OpenAI GPT-4 (파싱)

감사합니다.
```
