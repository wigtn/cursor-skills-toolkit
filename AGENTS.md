# Project: Cursor Seoul Hackathon

> AI를 활용한 웹 서비스 — 5시간 내 MVP 구축

## Architecture

- **Framework**: Next.js 16 (App Router, React 19, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS v4
- **Backend**: Supabase (Auth, PostgreSQL, Realtime, Storage)
- **AI**: OpenAI API (GPT-4o) + Anthropic API (Claude Sonnet 4)
- **Deploy**: Vercel (Edge Runtime 지원)
- **Package Manager**: pnpm

## Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── (auth)/             # Auth route group
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/          # Main dashboard
│   │   └── page.tsx
│   ├── result/             # Result display
│   │   └── [id]/page.tsx
│   └── api/                # API Routes
│       ├── analyze/route.ts
│       ├── results/route.ts
│       └── health/route.ts
├── components/             # React Components
│   ├── ui/                 # Primitives (Button, Input, Card, Modal, etc.)
│   ├── layout/             # Layout components (Header, Footer, Sidebar)
│   └── features/           # Feature-specific components
│       ├── Analysis/
│       ├── Dashboard/
│       └── Result/
├── lib/                    # Utilities & Clients
│   ├── supabase/
│   │   ├── client.ts       # Browser Supabase client
│   │   ├── server.ts       # Server Supabase client
│   │   └── middleware.ts   # Auth middleware helper
│   ├── ai/
│   │   ├── client.ts       # AI API client (OpenAI/Anthropic)
│   │   ├── prompts.ts      # Prompt templates
│   │   └── parser.ts       # Response parser
│   └── utils.ts            # General utilities (cn, formatDate, etc.)
├── hooks/                  # Custom React hooks
│   ├── useAnalysis.ts
│   └── useSupabase.ts
├── types/                  # TypeScript type definitions
│   ├── database.ts         # Supabase DB types
│   ├── api.ts              # API request/response types
│   └── ai.ts               # AI related types
└── styles/
    └── globals.css         # TailwindCSS imports + custom styles
```

## Conventions

### Naming
- **파일명**: kebab-case (`user-profile.tsx`)
- **컴포넌트**: PascalCase (`UserProfile`)
- **함수/변수**: camelCase (`getUserData`)
- **상수**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **타입/인터페이스**: PascalCase (`UserProfile`, `AnalysisResult`)
- **한국어 주석 OK**, 변수명은 영어

### Components
- 함수형 컴포넌트만 사용 (no class components)
- Props는 interface로 정의
- Server Components가 기본, 클라이언트 필요 시에만 `"use client"`
- `cn()` 유틸리티로 조건부 클래스 결합 (clsx + tailwind-merge)

### API Routes
- 모든 API 라우트는 try-catch 에러 핸들링
- 응답 형태: `{ data: T }` (성공) / `{ error: string }` (실패)
- Zod로 입력 검증

### State Management
- Server State: React Server Components + Supabase Realtime
- Client State: React useState/useReducer (가벼운 경우), Zustand (복잡한 경우)
- Form State: React Hook Form + Zod

### Error Handling
- API 에러는 표준 NextResponse로 반환
- 클라이언트 에러는 Error Boundary로 처리
- AI API 호출은 timeout + retry (최대 2회)

## Team Roles

| 역할 | 코드명 | 담당 영역 |
|---|---|---|
| AI 개발자 | **AI-1** | `src/lib/ai/`, `src/app/api/analyze/` — AI 파이프라인 구축 |
| AI 개발자 | **AI-2** | 프롬프트 엔지니어링, QA, 발표 준비 |
| 프론트엔드 | **FE-1** | `src/components/`, `src/app/(pages)/` — UI/UX 핵심 페이지 |
| 풀스택 | **FE-2** | `src/app/api/`, `src/lib/supabase/` — API + DB + 인증 |

## Development Workflow

```
1. Plan Mode (Shift+Tab) → 작업 계획 수립
2. 독립된 feature branch에서 작업
3. Parallel Agents로 독립 작업 병렬 실행
4. 완료 후 main에 머지
5. Vercel 자동 배포 확인
```

## Key Dependencies

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "typescript": "^5.7.0",
  "@supabase/supabase-js": "^2.x",
  "openai": "^4.x",
  "@anthropic-ai/sdk": "^0.x",
  "tailwindcss": "^4.0.0",
  "zod": "^3.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_URL=
```
