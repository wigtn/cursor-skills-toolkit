# BE1: API + DB 개발 지시서

> **프로젝트**: AI Call Agent (4시간 해커톤)
> **역할**: BE1 - API + DB 담당
> **담당 시간**: Phase 0 리드 + Phase 1 (0:00-2:00)

## 역할 요약

프로젝트 초기 설정을 리드하고, **DB 스키마**와 **핵심 API**를 개발합니다.

```
[당신이 만드는 부분]

┌─────────────────────────────────────────────────────────────────────┐
│                           API Layer                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  POST /api/calls                                                    │
│  ├── 요청 텍스트 받기                                                │
│  ├── GPT-4로 파싱 (장소, 날짜, 시간, 서비스)                          │
│  └── DB에 저장 후 ID 반환                                            │
│                                                                     │
│  GET /api/calls/[id]                                                │
│  └── 통화 상태 및 결과 조회                                          │
│                                                                     │
│  GET /api/calls                                                     │
│  └── 통화 기록 목록 조회                                             │
│                                                                     │
│  POST /api/calls/[id]/start                                         │
│  └── status를 CALLING으로 변경 (BE2가 실제 통화 시작)                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Database (SQLite)                            │
├─────────────────────────────────────────────────────────────────────┤
│  Call                                                               │
│  ├── id, requestText, requestType                                   │
│  ├── targetName, targetPhone                                        │
│  ├── parsedDate, parsedTime, parsedService                          │
│  ├── status, result, summary                                        │
│  └── conversationId, createdAt, completedAt                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: 프로젝트 셋업 (0:00-0:30)

> **당신이 리드** - 다른 팀원들은 환경 설정

### 0.1 Next.js 프로젝트 생성

```bash
npx create-next-app@latest ai-call-agent --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd ai-call-agent
```

### 0.2 shadcn/ui 설치

```bash
npx shadcn-ui@latest init
# Style: Default
# Base color: Slate
# CSS variables: Yes

npx shadcn-ui@latest add button input card
```

### 0.3 Prisma 설정

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite
```

### 0.4 필수 패키지 설치

```bash
npm install openai
```

### 0.5 디렉토리 구조 생성

```bash
mkdir -p app/api/calls
mkdir -p app/api/calls/[id]
mkdir -p app/api/webhooks
mkdir -p components/call
mkdir -p components/layout
mkdir -p lib
mkdir -p shared
```

### 0.6 환경 변수 템플릿

```bash
# .env.example
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
ELEVENLABS_AGENT_ID=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 0.7 공유 타입 파일

**파일**: `shared/types.ts`

```typescript
// shared/types.ts
export interface Call {
  id: string
  requestText: string
  requestType: 'RESERVATION' | 'INQUIRY'
  targetName: string
  targetPhone: string
  parsedDate?: string
  parsedTime?: string
  parsedService?: string
  status: 'PENDING' | 'CALLING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  result?: 'SUCCESS' | 'NO_ANSWER' | 'REJECTED' | 'ERROR'
  summary?: string
  conversationId?: string
  createdAt: string
  completedAt?: string
}

export interface CreateCallRequest {
  requestText: string
  targetPhone: string
  targetName?: string
}

export interface ParsedRequest {
  type: 'RESERVATION' | 'INQUIRY'
  targetName: string
  date?: string
  time?: string
  service?: string
  question?: string
}
```

### 0.8 Git 초기 커밋

```bash
git init
git add .
git commit -m "chore: Initial project setup"
git push origin main
```

---

## Phase 1: 핵심 기능 개발 (0:30-2:00)

### BE1-1: Prisma 스키마 작성 (15분)

**파일**: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Call {
  id            String    @id @default(cuid())

  // 요청
  requestText   String
  requestType   String    @default("RESERVATION")
  targetName    String
  targetPhone   String

  // 파싱 결과
  parsedDate    String?
  parsedTime    String?
  parsedService String?

  // 통화 결과
  status        String    @default("PENDING")
  result        String?
  summary       String?

  // ElevenLabs
  conversationId String?

  // 시간
  createdAt     DateTime  @default(now())
  completedAt   DateTime?
}
```

### BE1-2: DB 마이그레이션 (5분)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

**파일**: `lib/prisma.ts`

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

### BE1-3: POST /api/calls - 통화 요청 생성 (25분)

**파일**: `app/api/calls/route.ts`

```typescript
// app/api/calls/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseRequest } from '@/lib/parser'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { requestText, targetPhone, targetName } = body

    // 유효성 검사
    if (!requestText || !targetPhone) {
      return NextResponse.json(
        { error: 'requestText and targetPhone are required' },
        { status: 400 }
      )
    }

    // GPT-4로 요청 파싱
    const parsed = await parseRequest(requestText)

    // DB에 저장
    const call = await prisma.call.create({
      data: {
        requestText,
        requestType: parsed.type,
        targetName: targetName || parsed.targetName,
        targetPhone,
        parsedDate: parsed.date,
        parsedTime: parsed.time,
        parsedService: parsed.service,
        status: 'PENDING'
      }
    })

    return NextResponse.json(call, { status: 201 })
  } catch (error) {
    console.error('Error creating call:', error)
    return NextResponse.json(
      { error: 'Failed to create call' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const calls = await prisma.call.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    })
    return NextResponse.json({ calls })
  } catch (error) {
    console.error('Error fetching calls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calls' },
      { status: 500 }
    )
  }
}
```

---

### BE1-4: GET /api/calls/[id] - 상태 조회 (15분)

**파일**: `app/api/calls/[id]/route.ts`

```typescript
// app/api/calls/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const call = await prisma.call.findUnique({
      where: { id: params.id }
    })

    if (!call) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(call)
  } catch (error) {
    console.error('Error fetching call:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call' },
      { status: 500 }
    )
  }
}
```

**파일**: `app/api/calls/[id]/start/route.ts`

```typescript
// app/api/calls/[id]/start/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const call = await prisma.call.update({
      where: { id: params.id },
      data: { status: 'CALLING' }
    })

    // BE2의 ElevenLabs 통화 시작 로직이 여기서 호출됨
    // 또는 BE2가 별도로 폴링해서 CALLING 상태를 감지

    return NextResponse.json(call)
  } catch (error) {
    console.error('Error starting call:', error)
    return NextResponse.json(
      { error: 'Failed to start call' },
      { status: 500 }
    )
  }
}
```

---

### BE1-5: GET /api/calls - 목록 조회 (15분)

**BE1-3의 GET 함수에 포함됨**

---

### BE1-6: 자연어 파싱 로직 (15분)

**파일**: `lib/parser.ts`

```typescript
// lib/parser.ts
import OpenAI from 'openai'
import { ParsedRequest } from '@/shared/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function parseRequest(requestText: string): Promise<ParsedRequest> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a parser that extracts structured information from Korean natural language requests.
Extract the following information and return as JSON:
- type: "RESERVATION" or "INQUIRY"
- targetName: name of the place/business
- date: date in YYYY-MM-DD format (interpret "내일" as tomorrow, "모레" as day after tomorrow)
- time: time in HH:MM format (interpret "오후 3시" as 15:00)
- service: type of service requested (for reservations)
- question: the question being asked (for inquiries)

Today's date is ${new Date().toISOString().split('T')[0]}.
Return only valid JSON, no explanation.`
      },
      {
        role: 'user',
        content: requestText
      }
    ],
    response_format: { type: 'json_object' }
  })

  const result = JSON.parse(completion.choices[0].message.content || '{}')

  return {
    type: result.type || 'RESERVATION',
    targetName: result.targetName || '알 수 없음',
    date: result.date,
    time: result.time,
    service: result.service,
    question: result.question
  }
}
```

---

## 파일 구조

```
prisma/
└── schema.prisma        ← DB 스키마

app/
└── api/
    ├── calls/
    │   ├── route.ts     ← POST (생성), GET (목록)
    │   └── [id]/
    │       ├── route.ts ← GET (상세)
    │       └── start/
    │           └── route.ts ← POST (통화 시작)
    └── webhooks/
        └── elevenlabs/
            └── route.ts ← (BE2가 작성)

lib/
├── prisma.ts            ← Prisma 클라이언트
└── parser.ts            ← GPT-4 파싱

shared/
└── types.ts             ← 공유 타입
```

---

## API 명세 요약

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/calls` | 통화 요청 생성 |
| GET | `/api/calls` | 통화 목록 조회 |
| GET | `/api/calls/[id]` | 통화 상세 조회 |
| POST | `/api/calls/[id]/start` | 통화 시작 |

---

## 의존성

- **주는 것**:
  - FE1, FE2에게 API 제공
  - BE2에게 Call 모델과 Prisma 클라이언트 제공
- **받는 것**:
  - BE2가 웹훅에서 상태 업데이트

---

## 체크포인트

| 시간 | 체크 |
|------|------|
| 0:30 | 프로젝트 셋업 완료, npm run dev 동작 |
| 0:45 | Prisma 스키마 + 마이그레이션 완료 |
| 1:10 | POST /api/calls 동작 (Postman 테스트) |
| 1:25 | GET /api/calls/[id] 동작 |
| 1:40 | GET /api/calls 동작 |
| 1:55 | GPT-4 파싱 동작 |

---

## 테스트 명령어

```bash
# POST - 통화 생성
curl -X POST http://localhost:3000/api/calls \
  -H "Content-Type: application/json" \
  -d '{"requestText": "내일 오후 3시에 OO미용실 커트 예약해줘", "targetPhone": "010-1234-5678"}'

# GET - 상세 조회
curl http://localhost:3000/api/calls/{id}

# GET - 목록 조회
curl http://localhost:3000/api/calls
```

---

## 주의사항

1. **SQLite 사용**: 해커톤용 간소화, PostgreSQL 전환은 나중에
2. **에러 핸들링**: 기본적인 try-catch만
3. **타입 공유**: `shared/types.ts`를 FE와 공유
4. **환경 변수**: `.env.local`에 API 키 필수

---

## Phase 2 통합 시 할 일

- FE1과 API 연결 테스트
- BE2와 웹훅 연동 테스트
- 실제 데이터로 파싱 결과 확인
