# BE2: ElevenLabs 연동 개발 지시서

> **프로젝트**: AI Call Agent (4시간 해커톤)
> **역할**: BE2 - ElevenLabs 연동 담당
> **담당 시간**: Phase 1 (0:30-2:00)

## 역할 요약

**ElevenLabs Conversational AI**를 사용하여 실제 전화를 거는 기능을 개발합니다.

```
[당신이 만드는 부분]

┌─────────────────────────────────────────────────────────────────────┐
│                     ElevenLabs Integration                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Agent 설정 (ElevenLabs 대시보드)                                 │
│     └── 예약 대행 프롬프트 작성                                      │
│                                                                     │
│  2. Outbound Call API 호출                                          │
│     └── 전화번호로 AI 통화 시작                                      │
│                                                                     │
│  3. Webhook 수신                                                    │
│     └── 통화 완료 시 결과 저장                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Call Flow                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FE: [전화 걸기] 클릭                                                │
│       ↓                                                             │
│  BE1: status = CALLING                                              │
│       ↓                                                             │
│  BE2: ElevenLabs Outbound Call API 호출                             │
│       ↓                                                             │
│  ElevenLabs: AI가 상대방에게 전화                                    │
│       ↓                                                             │
│  ElevenLabs: 통화 완료 → Webhook 전송                                │
│       ↓                                                             │
│  BE2: Webhook 수신 → DB 업데이트                                     │
│       ↓                                                             │
│  FE: 폴링으로 결과 확인 → 결과 화면                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 사전 준비

### ElevenLabs 계정 설정

1. [ElevenLabs](https://elevenlabs.io) 로그인
2. Conversational AI 섹션으로 이동
3. Agent 생성 (아래 프롬프트 사용)
4. Twilio 연동 설정 (전화 발신용)
5. API Key 복사

### 환경 변수

```bash
# .env.local
ELEVENLABS_API_KEY=your_api_key
ELEVENLABS_AGENT_ID=your_agent_id
ELEVENLABS_PHONE_NUMBER_ID=your_phone_number_id  # Twilio 연동 번호
```

---

## 태스크 목록

### BE2-1: ElevenLabs SDK 설정 (15분)

**파일**: `lib/elevenlabs.ts`

```typescript
// lib/elevenlabs.ts

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!
const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID!
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1'

interface OutboundCallRequest {
  agent_id: string
  customer_phone_number: string
  agent_phone_number_id: string
  conversation_initiation_client_data?: {
    dynamic_variables?: Record<string, string>
  }
}

interface OutboundCallResponse {
  conversation_id: string
  status: string
}

export async function startOutboundCall(
  phoneNumber: string,
  dynamicVariables: Record<string, string>
): Promise<OutboundCallResponse> {
  const response = await fetch(
    `${ELEVENLABS_BASE_URL}/convai/conversations/outbound-call`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: ELEVENLABS_AGENT_ID,
        customer_phone_number: phoneNumber,
        agent_phone_number_id: process.env.ELEVENLABS_PHONE_NUMBER_ID,
        conversation_initiation_client_data: {
          dynamic_variables: dynamicVariables
        }
      } as OutboundCallRequest)
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`ElevenLabs API error: ${error}`)
  }

  return response.json()
}

export async function getConversation(conversationId: string) {
  const response = await fetch(
    `${ELEVENLABS_BASE_URL}/convai/conversations/${conversationId}`,
    {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to get conversation')
  }

  return response.json()
}
```

---

### BE2-2: Agent 생성 (20분)

**ElevenLabs 대시보드에서 설정**

#### 예약 Agent 프롬프트

```
You are a friendly phone assistant making a reservation call on behalf of a customer.

## Your Goal
Make a reservation at {{target_name}} with the following details:
- Date: {{date}}
- Time: {{time}}
- Service: {{service}}
- Customer Name: {{customer_name}}

## Instructions
1. Greet politely: "안녕하세요, 예약 문의 드립니다."
2. State your request: "{{date}} {{time}}에 {{service}} 예약하고 싶은데 가능할까요?"
3. If the slot is unavailable, ask: "그러면 다른 시간은 언제 가능할까요?"
4. Confirm the final booking: "그럼 {{date}} {{time}}에 {{service}} 예약으로 확정해 주세요."
5. Provide customer name when asked: "예약자 이름은 {{customer_name}}입니다."
6. End politely: "감사합니다. 좋은 하루 되세요."

## Important Rules
- Speak naturally in Korean (해요체)
- Be polite and professional
- Always confirm the final reservation details before ending
- If you can't understand something, politely ask to repeat

## Language
Korean (한국어)
```

#### Agent 설정

| 설정 | 값 |
|------|-----|
| Voice | Korean voice (예: "Rachel - Korean") |
| Model | Turbo v2.5 |
| First Message | "안녕하세요, 예약 문의 드립니다." |
| End Call Phrases | "감사합니다", "안녕히 계세요" |

---

### BE2-3: Outbound Call API 호출 (25분)

**파일**: `app/api/calls/[id]/start/route.ts` (BE1이 만든 파일 수정)

```typescript
// app/api/calls/[id]/start/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOutboundCall } from '@/lib/elevenlabs'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Call 정보 조회
    const call = await prisma.call.findUnique({
      where: { id: params.id }
    })

    if (!call) {
      return NextResponse.json({ error: 'Call not found' }, { status: 404 })
    }

    // 2. 상태를 CALLING으로 변경
    await prisma.call.update({
      where: { id: params.id },
      data: { status: 'CALLING' }
    })

    // 3. ElevenLabs Outbound Call 시작
    const phoneNumber = formatPhoneNumber(call.targetPhone)

    const result = await startOutboundCall(phoneNumber, {
      target_name: call.targetName,
      date: call.parsedDate || '오늘',
      time: call.parsedTime || '',
      service: call.parsedService || '예약',
      customer_name: '고객', // 실제로는 사용자 이름
      call_id: call.id // 웹훅에서 사용
    })

    // 4. conversationId 저장
    await prisma.call.update({
      where: { id: params.id },
      data: {
        conversationId: result.conversation_id,
        status: 'IN_PROGRESS'
      }
    })

    return NextResponse.json({
      success: true,
      conversationId: result.conversation_id
    })

  } catch (error) {
    console.error('Error starting call:', error)

    // 실패 시 상태 업데이트
    await prisma.call.update({
      where: { id: params.id },
      data: {
        status: 'FAILED',
        result: 'ERROR'
      }
    })

    return NextResponse.json(
      { error: 'Failed to start call' },
      { status: 500 }
    )
  }
}

// 전화번호 포맷팅 (한국 → E.164)
function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '')
  if (cleaned.startsWith('010')) {
    return `+82${cleaned.slice(1)}`
  }
  return `+82${cleaned}`
}
```

---

### BE2-4: 웹훅 엔드포인트 (20분)

**파일**: `app/api/webhooks/elevenlabs/route.ts`

```typescript
// app/api/webhooks/elevenlabs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface ElevenLabsWebhook {
  conversation_id: string
  status: 'completed' | 'failed' | 'cancelled'
  transcript?: string
  summary?: string
  duration_seconds?: number
  metadata?: {
    call_id?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ElevenLabsWebhook = await request.json()

    console.log('Received webhook:', body)

    // conversation_id로 Call 찾기
    const call = await prisma.call.findFirst({
      where: { conversationId: body.conversation_id }
    })

    if (!call) {
      console.error('Call not found for conversation:', body.conversation_id)
      return NextResponse.json({ error: 'Call not found' }, { status: 404 })
    }

    // 결과 결정
    let result: string
    if (body.status === 'completed') {
      // transcript 분석해서 성공 여부 판단 (간단 버전)
      const transcript = body.transcript?.toLowerCase() || ''
      if (transcript.includes('예약') && (transcript.includes('완료') || transcript.includes('확정'))) {
        result = 'SUCCESS'
      } else if (transcript.includes('불가') || transcript.includes('안 됩니다')) {
        result = 'REJECTED'
      } else {
        result = 'SUCCESS' // 기본적으로 성공으로 처리
      }
    } else if (body.status === 'failed') {
      result = 'ERROR'
    } else {
      result = 'NO_ANSWER'
    }

    // DB 업데이트
    await prisma.call.update({
      where: { id: call.id },
      data: {
        status: 'COMPLETED',
        result,
        summary: body.summary || generateSummary(call, result),
        completedAt: new Date()
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

function generateSummary(call: any, result: string): string {
  if (result === 'SUCCESS') {
    return `${call.targetName}에 ${call.parsedDate || ''} ${call.parsedTime || ''} ${call.parsedService || '예약'}이 완료되었습니다.`
  } else if (result === 'REJECTED') {
    return `${call.targetName}에서 요청하신 시간에 예약이 불가능합니다.`
  } else if (result === 'NO_ANSWER') {
    return `${call.targetName}에서 전화를 받지 않았습니다.`
  } else {
    return '통화 중 오류가 발생했습니다.'
  }
}
```

---

### BE2-5: Mock 모드 (선택사항 - ElevenLabs 연동 실패 시)

**파일**: `lib/elevenlabs.ts`에 추가

```typescript
// Mock 모드 (개발/테스트용)
const MOCK_MODE = process.env.ELEVENLABS_MOCK === 'true'

export async function startOutboundCall(
  phoneNumber: string,
  dynamicVariables: Record<string, string>
): Promise<OutboundCallResponse> {

  // Mock 모드: 실제 API 호출 없이 가짜 결과 반환
  if (MOCK_MODE) {
    console.log('Mock mode: Simulating call to', phoneNumber)

    const mockConversationId = `mock_${Date.now()}`

    // 3초 후 웹훅 시뮬레이션
    setTimeout(async () => {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/elevenlabs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: mockConversationId,
          status: 'completed',
          summary: `${dynamicVariables.target_name}에 ${dynamicVariables.date} ${dynamicVariables.time} ${dynamicVariables.service} 예약이 완료되었습니다.`
        })
      })
    }, 5000) // 5초 후 완료

    return {
      conversation_id: mockConversationId,
      status: 'initiated'
    }
  }

  // 실제 API 호출
  const response = await fetch(/* ... */)
  // ...
}
```

---

## 파일 구조

```
lib/
└── elevenlabs.ts        ← ElevenLabs API 래퍼

app/
└── api/
    ├── calls/
    │   └── [id]/
    │       └── start/
    │           └── route.ts  ← 통화 시작 (BE1과 협업)
    └── webhooks/
        └── elevenlabs/
            └── route.ts      ← 웹훅 수신
```

---

## ElevenLabs 웹훅 설정

ElevenLabs 대시보드에서:

1. Agent 설정 → Webhooks
2. URL: `https://your-domain.com/api/webhooks/elevenlabs`
3. Events: `conversation.completed`, `conversation.failed`

**로컬 테스트 시**: ngrok 사용

```bash
ngrok http 3000
# https://xxxx.ngrok.io/api/webhooks/elevenlabs
```

---

## 체크포인트

| 시간 | 체크 |
|------|------|
| 0:45 | ElevenLabs SDK 설정 완료 |
| 1:05 | Agent 프롬프트 작성 완료 |
| 1:30 | Outbound Call API 동작 |
| 1:50 | 웹훅 엔드포인트 동작 |
| 2:00 | Mock 모드 준비 (백업) |

---

## 테스트 명령어

```bash
# 웹훅 테스트 (수동)
curl -X POST http://localhost:3000/api/webhooks/elevenlabs \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": "test_123",
    "status": "completed",
    "summary": "테스트 예약이 완료되었습니다."
  }'
```

---

## 주의사항

1. **전화번호 형식**: E.164 형식 필수 (+821012345678)
2. **웹훅 URL**: 로컬에서는 ngrok 필요
3. **Mock 모드**: ElevenLabs 연동 실패 시 데모용으로 활용
4. **비용**: 실제 통화는 비용 발생 → 테스트는 팀원 번호로

---

## Phase 2 통합 시 할 일

- BE1과 `/api/calls/[id]/start` 통합
- FE2와 폴링 ↔ 웹훅 타이밍 확인
- 실제 전화 테스트 (팀원 번호)
- ngrok URL을 ElevenLabs에 등록
