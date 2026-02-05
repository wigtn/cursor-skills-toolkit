# Auto CallBot PRD

> **Version**: 1.1
> **Created**: 2026-02-05
> **Updated**: 2026-02-05 (Digging Review 반영)
> **Status**: Draft

## 1. Overview

### 1.1 Problem Statement

예약 확인, 리마인더, 스케줄 안내 등의 전화 업무는 반복적이고 시간이 많이 소요됩니다. 소규모 비즈니스나 개인 사용자가 이러한 전화를 자동화하여 시간을 절약하고, 사용자의 자연어 지시에 따라 AI가 전화를 수행할 수 있는 솔루션이 필요합니다.

### 1.2 Goals

- ElevenLabs MCP를 활용한 자연스러운 AI 음성 통화 구현
- 사용자가 자연어로 통화 목적과 시나리오를 설정할 수 있는 인터페이스 제공
- 실시간 통화 현황 대시보드 및 결과 리포트 생성
- 소규모 사용자(1-10명)를 위한 간편한 사용성

### 1.3 Non-Goals (Out of Scope)

- 대규모 콜센터 수준의 동시 통화 처리 (100+ 동시 통화)
- 복잡한 조직 권한 관리 및 감사 로그
- CRM 시스템 연동
- 인바운드 전화 수신 기능

### 1.4 Scope

| 포함 | 제외 |
|------|------|
| 자연어 기반 통화 시나리오 설정 | 플로우차트 빌더 |
| ElevenLabs MCP 통화 연동 | 다른 TTS/STT 엔진 지원 |
| 실시간 통화 상태 대시보드 | 실시간 통화 개입 기능 |
| 통화 결과 리포트 (PDF/CSV) | 고급 분석/BI 기능 |
| 예약/알림 시나리오 | 영업/마케팅 자동화 |
| 통화 녹음 및 요약 (동의 후) | 법적 동의 관리 시스템 (고급) |
| Twilio 전화 발신 연동 | 다른 통신 사업자 지원 |

---

## 2. User Stories

### 2.1 Primary User

**페르소나**: 소규모 병원/클리닉 운영자, 개인 서비스 제공자

As a **소규모 비즈니스 운영자**,
I want to **자연어로 전화 목적을 설명하면 AI가 자동으로 전화를 걸어주길**
so that **반복적인 예약 확인 전화 업무 시간을 절약할 수 있다**.

### 2.2 User Stories

| ID | Story | Priority |
|----|-------|----------|
| US-001 | 사용자로서, 자연어로 통화 목적을 입력하면 AI가 통화 스크립트를 생성해준다 | P0 |
| US-002 | 사용자로서, 생성된 스크립트를 검토하고 수정할 수 있다 | P0 |
| US-003 | 사용자로서, 전화번호 목록을 입력하면 순차적으로 전화가 진행된다 | P0 |
| US-004 | 사용자로서, 실시간으로 통화 진행 상황을 확인할 수 있다 | P0 |
| US-005 | 사용자로서, 통화 완료 후 결과 리포트를 다운로드할 수 있다 | P1 |
| US-006 | 사용자로서, 통화 녹음을 다시 들을 수 있다 | P1 |
| US-007 | 사용자로서, 통화 내용의 AI 요약을 확인할 수 있다 | P1 |
| US-008 | 사용자로서, 자주 사용하는 시나리오를 저장하고 재사용할 수 있다 | P2 |

### 2.3 Acceptance Criteria (Gherkin)

```gherkin
Scenario: 자연어로 통화 시나리오 생성
  Given 사용자가 주문 설정 페이지에 있다
  When "내일 오후 2시 예약 고객들에게 전화해서 예약 확인하고, 변경 원하면 다른 시간 제안해줘"라고 입력한다
  Then AI가 통화 스크립트를 생성하여 미리보기를 보여준다
  And 스크립트에는 인사, 예약 확인, 변경 처리 흐름이 포함된다

Scenario: 대시보드에서 실시간 통화 현황 확인
  Given 통화 캠페인이 진행 중이다
  When 사용자가 대시보드를 확인한다
  Then 전체 대상 수, 완료 수, 진행 중, 대기 중 현황이 표시된다
  And 각 통화의 상태(성공/실패/부재중)가 실시간 업데이트된다

Scenario: 통화 완료 후 리포트 다운로드
  Given 통화 캠페인이 완료되었다
  When 사용자가 "리포트 다운로드" 버튼을 클릭한다
  Then PDF 또는 CSV 형식의 리포트가 다운로드된다
  And 리포트에는 각 통화의 결과, 소요 시간, AI 요약이 포함된다
```

---

## 3. Functional Requirements

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| **주문 설정** | | | |
| FR-001 | 자연어 입력으로 통화 목적 및 시나리오 설정 | P0 | - |
| FR-002 | AI가 자연어를 분석하여 구조화된 통화 스크립트 생성 | P0 | FR-001 |
| FR-003 | 생성된 스크립트 미리보기 및 수정 기능 | P0 | FR-002 |
| FR-004 | 스크립트 저장 및 재사용 | P2 | FR-002 |
| **전화번호 관리** | | | |
| FR-005 | 전화번호 직접 입력 (단건/다건) | P0 | - |
| FR-005-1 | 전화번호 형식 검증 (E.164, 한국 번호 패턴) | P0 | FR-005 |
| FR-006 | CSV 파일로 전화번호 일괄 업로드 | P1 | - |
| FR-007 | 전화번호별 추가 컨텍스트 정보 입력 (이름, 예약 시간 등) | P0 | FR-005 |
| **통화 실행** | | | |
| FR-008 | Twilio + ElevenLabs를 통한 아웃바운드 전화 발신 | P0 | FR-002, FR-005 |
| FR-008-1 | 발신자 번호 설정 (사업자 번호 등록) | P1 | FR-008 |
| FR-009 | 통화 중 AI의 실시간 응답 처리 | P0 | FR-008 |
| FR-009-1 | 통화 예외 처리 (끊김, 음성 인식 실패, 음성메일) | P0 | FR-009 |
| FR-010 | 통화 녹음 동의 안내 및 저장 | P0 | FR-008 |
| FR-011 | 통화 실패 시 자동 재시도 (최대 3회) | P1 | FR-008 |
| **캠페인 관리** | | | |
| FR-012 | 캠페인별 통화 현황 실시간 표시 | P0 | FR-008 |
| FR-013 | 개별 통화 상태 (대기/진행중/성공/실패/부재중) 표시 | P0 | FR-008 |
| FR-014 | 통화 진행률 및 예상 완료 시간 표시 | P1 | FR-012 |
| FR-014-1 | 캠페인 취소 및 삭제 | P0 | FR-012 |
| **리포트** | | | |
| FR-015 | 캠페인 완료 후 결과 요약 리포트 생성 | P1 | FR-008 |
| FR-016 | 개별 통화 AI 요약 생성 | P1 | FR-010 |
| FR-017 | PDF/CSV 형식 리포트 다운로드 | P1 | FR-015 |
| FR-018 | 통화 비용 추적 및 표시 | P1 | FR-008 |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target | Description |
|--------|--------|-------------|
| 스크립트 생성 시간 | < 5초 | 자연어 입력 후 스크립트 생성까지 |
| 대시보드 업데이트 | < 2초 | 통화 상태 변경 반영 |
| 동시 통화 | 최대 5건 | 소규모 사용자 대상 |
| 페이지 로드 | < 3초 | 초기 페이지 로딩 |

### 4.2 Security

| Item | Requirement |
|------|-------------|
| 인증 | 이메일/비밀번호 기반 로그인 |
| API 키 관리 | ElevenLabs/Twilio API 키 서버 환경변수 관리 |
| 통화 녹음 | 암호화 저장 (AES-256) |
| 데이터 전송 | HTTPS (TLS 1.3) |

### 4.2.1 비밀번호 정책

| 항목 | 정책 |
|------|------|
| 최소 길이 | 8자 이상 |
| 복잡도 | 영문 + 숫자 필수 |
| 로그인 실패 | 5회 실패 시 15분 계정 잠금 |

### 4.2.2 Rate Limiting

| API | Limit | Window |
|-----|-------|--------|
| POST /scripts/generate | 10회 | 분당 |
| POST /campaigns/start | 5회 | 분당 |
| 전체 API | 100회 | 분당 |

### 4.2.3 세션 관리

| 항목 | 정책 |
|------|------|
| 세션 만료 | 24시간 (활동 시 갱신) |
| 동시 로그인 | 최대 3개 디바이스 |
| 강제 로그아웃 | 비밀번호 변경 시 전체 세션 무효화 |

### 4.3 Usability

- 5분 내 첫 통화 캠페인 생성 가능 (온보딩)
- 기술 지식 없이 자연어만으로 시나리오 설정
- 모바일 반응형 대시보드

### 4.4 Reliability

- 서비스 가용성: 99% (계획된 점검 제외)
- 통화 녹음 보관: 30일

---

## 5. Technical Design

### 5.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌─────────┐  ┌─────────────┐  ┌───────────┐  ┌──────────┐ │
│  │ 주문설정 │  │  대시보드    │  │  리포트   │  │  설정    │ │
│  └────┬────┘  └──────┬──────┘  └─────┬─────┘  └────┬─────┘ │
└───────┼──────────────┼───────────────┼─────────────┼───────┘
        │              │               │             │
        ▼              ▼               ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Next.js API Routes)          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Order API   │  │ Call API    │  │ Report API          │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
└─────────┼────────────────┼────────────────────┼─────────────┘
          │                │                    │
          ▼                ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐
│   LLM Service   │  │ ElevenLabs MCP  │  │    Database      │
│ (Script Gen)    │  │ (Voice Call)    │  │   (SQLite/       │
│                 │  │                 │  │    PostgreSQL)   │
└─────────────────┘  └─────────────────┘  └──────────────────┘
```

### 5.2 Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | Next.js 14 (App Router) | SSR, React Server Components |
| Styling | Tailwind CSS + shadcn/ui | 빠른 개발, 일관된 디자인 |
| Backend | Next.js API Routes | 풀스택 단일 배포 |
| Database | SQLite (개발) / PostgreSQL (운영) | 소규모에 적합 |
| ORM | Prisma | 타입 안전성, 마이그레이션 |
| 인증 | NextAuth.js | 간편한 인증 구현 |
| AI/LLM | OpenAI GPT-4 | 자연어 → 스크립트 변환 |
| 전화 발신 | Twilio Programmable Voice | PSTN 전화 발신/수신 |
| Voice AI | ElevenLabs Conversational AI | 실시간 음성 합성/인식 |
| Voice 연동 | Twilio Media Streams + ElevenLabs | 실시간 양방향 음성 처리 |
| Real-time | Server-Sent Events (SSE) | 대시보드 실시간 업데이트 |

### 5.3 Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // hashed
  elevenLabsKey String?   // encrypted
  createdAt     DateTime  @default(now())
  campaigns     Campaign[]
  scripts       Script[]
}

model Script {
  id          String    @id @default(cuid())
  name        String
  naturalInput String   // 사용자 원본 입력
  generatedScript Json  // AI 생성 스크립트
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  campaigns   Campaign[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Campaign {
  id          String    @id @default(cuid())
  name        String
  status      CampaignStatus @default(DRAFT)
  scriptId    String
  script      Script    @relation(fields: [scriptId], references: [id])
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  calls       Call[]
  createdAt   DateTime  @default(now())
  startedAt   DateTime?
  completedAt DateTime?
}

model Call {
  id              String    @id @default(cuid())
  campaignId      String
  campaign        Campaign  @relation(fields: [campaignId], references: [id])
  phoneNumber     String
  contactName     String?
  context         Json?     // 추가 컨텍스트 (예약 시간 등)
  status          CallStatus @default(PENDING)
  result          CallResult?
  duration        Int?      // 초 단위
  recordingUrl    String?
  recordingConsent Boolean  @default(false) // 녹음 동의 여부
  summary         String?   // AI 요약
  transcript      String?   // 통화 전문
  cost            Float?    // 통화 비용 (USD)
  twilioCallSid   String?   // Twilio Call SID
  attempts        Int       @default(0)
  createdAt       DateTime  @default(now())
  startedAt       DateTime?
  endedAt         DateTime?
}

enum CampaignStatus {
  DRAFT
  SCHEDULED
  RUNNING
  PAUSED
  COMPLETED
  CANCELLED
}

enum CallStatus {
  PENDING
  CALLING
  IN_PROGRESS
  COMPLETED
  FAILED
  NO_ANSWER
}

enum CallResult {
  SUCCESS
  VOICEMAIL
  DECLINED
  RESCHEDULED
  CALLBACK_REQUESTED
  OTHER
}
```

### 5.4 API Specification

---

#### API: 자연어로 스크립트 생성

##### `POST /api/v1/scripts/generate`

**Description**: 사용자의 자연어 입력을 분석하여 구조화된 통화 스크립트 생성

**Authentication**: Required (Bearer Token)

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | Bearer {accessToken} |
| Content-Type | Yes | application/json |

**Request Body**:
```json
{
  "naturalInput": "string (required) - 자연어 통화 목적 설명, 최소 10자",
  "context": {
    "businessType": "string (optional) - 비즈니스 유형 (clinic, restaurant, etc.)",
    "language": "string (optional) - 통화 언어, default: ko"
  }
}
```

**Request Example**:
```json
{
  "naturalInput": "내일 오후 2시에 예약된 고객들에게 전화해서 예약 확인하고, 변경 원하면 다른 시간 제안해줘. 취소하면 취소 사유도 물어봐줘.",
  "context": {
    "businessType": "clinic",
    "language": "ko"
  }
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "scriptId": "string - 임시 스크립트 ID",
    "naturalInput": "string - 원본 입력",
    "generatedScript": {
      "greeting": "string - 인사말",
      "purpose": "string - 통화 목적 설명",
      "mainFlow": [
        {
          "step": "number",
          "action": "string - AI 행동",
          "expectedResponses": ["string - 예상 응답들"],
          "nextStep": {
            "positive": "number",
            "negative": "number"
          }
        }
      ],
      "closing": "string - 마무리 멘트",
      "variables": ["string - 동적 변수 목록 (예: {customerName}, {appointmentTime})"]
    },
    "preview": "string - 스크립트 미리보기 텍스트"
  },
  "meta": {
    "timestamp": "string (ISO 8601)"
  }
}
```

**Error Responses**:
| Status | Code | Message | Description |
|--------|------|---------|-------------|
| 400 | INVALID_INPUT | Natural input too short | 입력이 10자 미만 |
| 400 | GENERATION_FAILED | Failed to generate script | AI 스크립트 생성 실패 |
| 401 | UNAUTHORIZED | Authentication required | 인증 토큰 누락/만료 |
| 429 | RATE_LIMITED | Too many requests | 분당 요청 제한 초과 |

---

#### API: 스크립트 저장

##### `POST /api/v1/scripts`

**Description**: 생성된 스크립트를 저장 (선택적 수정 포함)

**Authentication**: Required

**Request Body**:
```json
{
  "name": "string (required) - 스크립트 이름",
  "naturalInput": "string (required) - 원본 자연어 입력",
  "generatedScript": "object (required) - 스크립트 객체 (수정된 경우 수정본)"
}
```

**Response 201 Created**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "createdAt": "string (ISO 8601)"
  }
}
```

---

#### API: 캠페인 생성

##### `POST /api/v1/campaigns`

**Description**: 새로운 통화 캠페인 생성

**Authentication**: Required

**Request Body**:
```json
{
  "name": "string (required) - 캠페인 이름",
  "scriptId": "string (required) - 사용할 스크립트 ID",
  "contacts": [
    {
      "phoneNumber": "string (required) - 전화번호 (E.164 형식)",
      "name": "string (optional) - 연락처 이름",
      "context": {
        "appointmentTime": "string (optional) - 예약 시간",
        "additionalInfo": "string (optional) - 추가 정보"
      }
    }
  ]
}
```

**Request Example**:
```json
{
  "name": "2월 5일 예약 확인",
  "scriptId": "script_abc123",
  "contacts": [
    {
      "phoneNumber": "+821012345678",
      "name": "김철수",
      "context": {
        "appointmentTime": "2026-02-06T14:00:00+09:00"
      }
    },
    {
      "phoneNumber": "+821087654321",
      "name": "이영희",
      "context": {
        "appointmentTime": "2026-02-06T15:30:00+09:00"
      }
    }
  ]
}
```

**Response 201 Created**:
```json
{
  "success": true,
  "data": {
    "id": "string - 캠페인 ID",
    "name": "string",
    "status": "DRAFT",
    "totalCalls": "number - 총 전화 수",
    "createdAt": "string (ISO 8601)"
  }
}
```

---

#### API: 캠페인 시작

##### `POST /api/v1/campaigns/{campaignId}/start`

**Description**: 캠페인 실행 시작 (전화 발신 시작)

**Authentication**: Required

**Path Parameters**:
| Parameter | Description |
|-----------|-------------|
| campaignId | 캠페인 ID |

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "status": "RUNNING",
    "startedAt": "string (ISO 8601)"
  }
}
```

**Error Responses**:
| Status | Code | Message | Description |
|--------|------|---------|-------------|
| 400 | INVALID_STATE | Campaign already running | 이미 실행 중 |
| 400 | NO_CONTACTS | No contacts in campaign | 연락처 없음 |
| 402 | INSUFFICIENT_CREDITS | Not enough ElevenLabs/Twilio credits | 크레딧 부족 |

---

#### API: 캠페인 취소

##### `POST /api/v1/campaigns/{campaignId}/cancel`

**Description**: 진행 중인 캠페인 취소 (현재 통화 완료 후 중단)

**Authentication**: Required

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "status": "CANCELLED",
    "completedCalls": "number",
    "cancelledCalls": "number"
  }
}
```

---

#### API: 캠페인 삭제

##### `DELETE /api/v1/campaigns/{campaignId}`

**Description**: 캠페인 삭제 (DRAFT 또는 COMPLETED/CANCELLED 상태만 가능)

**Authentication**: Required

**Response 204 No Content**

**Error Responses**:
| Status | Code | Message | Description |
|--------|------|---------|-------------|
| 400 | INVALID_STATE | Cannot delete running campaign | 실행 중인 캠페인 삭제 불가 |

---

#### API: 캠페인 상태 조회 (SSE)

##### `GET /api/v1/campaigns/{campaignId}/status`

**Description**: Server-Sent Events로 캠페인 실시간 상태 스트리밍

**Authentication**: Required

**Response**: SSE Stream

```
event: status
data: {"campaignId":"camp_123","status":"RUNNING","progress":{"total":10,"completed":3,"inProgress":1,"pending":6,"failed":0}}

event: call_update
data: {"callId":"call_456","status":"COMPLETED","result":"SUCCESS","duration":45}

event: call_update
data: {"callId":"call_789","status":"IN_PROGRESS"}

event: completed
data: {"campaignId":"camp_123","status":"COMPLETED","summary":{"total":10,"success":8,"failed":1,"noAnswer":1}}
```

---

#### API: 리포트 생성

##### `POST /api/v1/campaigns/{campaignId}/report`

**Description**: 캠페인 결과 리포트 생성

**Authentication**: Required

**Request Body**:
```json
{
  "format": "string (required) - 리포트 형식 (pdf | csv)",
  "includeTranscripts": "boolean (optional) - 통화 전문 포함, default: false",
  "includeSummaries": "boolean (optional) - AI 요약 포함, default: true"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "reportId": "string",
    "downloadUrl": "string - 다운로드 URL (24시간 유효)",
    "expiresAt": "string (ISO 8601)"
  }
}
```

---

#### API: 통화 녹음 조회

##### `GET /api/v1/calls/{callId}/recording`

**Description**: 개별 통화 녹음 파일 URL 조회

**Authentication**: Required

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "recordingUrl": "string - 스트리밍 URL",
    "duration": "number - 초 단위",
    "transcript": "string - 통화 전문",
    "summary": "string - AI 요약"
  }
}
```

---

### 5.5 Twilio + ElevenLabs 통화 아키텍처

Twilio로 전화를 발신하고, ElevenLabs로 음성을 처리하는 하이브리드 아키텍처:

```
┌─────────────────────────────────────────────────────────────────┐
│                        Call Flow                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 캠페인 시작                                                  │
│     ↓                                                           │
│  2. Twilio로 전화 발신 (Programmable Voice API)                  │
│     ↓                                                           │
│  3. 통화 연결 시 Twilio Media Streams 활성화                     │
│     ↓                                                           │
│  4. 녹음 동의 안내 재생                                          │
│     "이 통화는 서비스 품질 향상을 위해 녹음될 수 있습니다"        │
│     ↓                                                           │
│  5. 양방향 오디오 스트리밍                                       │
│     ┌─────────────────────────────────────────┐                 │
│     │  상대방 음성 → Twilio → ElevenLabs STT  │                 │
│     │                    ↓                    │                 │
│     │            AI 응답 생성 (GPT-4)         │                 │
│     │                    ↓                    │                 │
│     │  ElevenLabs TTS → Twilio → 상대방      │                 │
│     └─────────────────────────────────────────┘                 │
│     ↓                                                           │
│  6. 통화 종료                                                    │
│     - Twilio 녹음 저장                                          │
│     - 통화 결과 및 비용 기록                                     │
│     - AI 요약 생성                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**통화 예외 처리**:
| 상황 | 처리 방식 |
|------|----------|
| 상대방 끊음 | CallResult=DECLINED, 통화 종료 |
| 음성 인식 실패 (3회) | "죄송합니다, 다시 말씀해 주시겠어요?" 재시도 |
| 5회 연속 인식 실패 | CallResult=FAILED, 통화 종료 |
| 음성메일 감지 | 메시지 남기기 또는 통화 종료 (설정에 따라) |
| 부재중 (30초 무응답) | CallResult=NO_ANSWER, 재시도 큐에 추가 |

**구현 코드 예시**:
```typescript
// 1. Twilio로 전화 발신
const twilioCall = await twilioClient.calls.create({
  to: contact.phoneNumber,
  from: process.env.TWILIO_PHONE_NUMBER,
  url: `${process.env.BASE_URL}/api/twilio/voice/${callId}`,
  statusCallback: `${process.env.BASE_URL}/api/twilio/status/${callId}`,
  record: true,
});

// 2. TwiML로 Media Stream 설정
const twiml = new VoiceResponse();
twiml.say({ language: 'ko-KR' }, '이 통화는 서비스 품질 향상을 위해 녹음될 수 있습니다.');
twiml.connect().stream({
  url: `wss://${process.env.BASE_URL}/api/media-stream/${callId}`,
});

// 3. WebSocket에서 ElevenLabs 연동
wsServer.on('connection', (ws, callId) => {
  const elevenLabsWs = new WebSocket(ELEVENLABS_WS_URL);

  // Twilio → ElevenLabs (상대방 음성)
  ws.on('message', (data) => {
    elevenLabsWs.send(data);
  });

  // ElevenLabs → Twilio (AI 음성)
  elevenLabsWs.on('message', (data) => {
    ws.send(data);
  });
});
```

**비용 구조**:
| 항목 | 예상 비용 |
|------|----------|
| Twilio 발신 (한국) | ~$0.04/분 |
| Twilio 녹음 | ~$0.0025/분 |
| ElevenLabs TTS | ~$0.30/1K 문자 |
| ElevenLabs STT | ~$0.10/분 |
| OpenAI GPT-4 | ~$0.03/1K 토큰 |
| **예상 통화당 비용** | **~$0.15-0.30/분** |

---

## 6. UI/UX Design

### 6.1 주요 화면

#### 화면 1: 주문 설정 (Order Setup)

```
┌─────────────────────────────────────────────────────────────┐
│  CallBot                                    [설정] [로그아웃]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📞 새 캠페인 만들기                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 어떤 전화를 해드릴까요?                               │   │
│  │                                                     │   │
│  │ "내일 오후 2시 예약 고객들에게 전화해서 예약          │   │
│  │  확인하고, 변경 원하면 다른 시간 제안해줘. 취소하면   │   │
│  │  취소 사유도 물어봐줘."                               │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                         [스크립트 생성 →]    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  💡 예시:                                                   │
│  • "예약 확인 전화해줘. 변경하고 싶으면 다른 시간 제안해"    │
│  • "결제 리마인더 보내줘. 기한이 내일까지야"                 │
│  • "내일 행사 참석 여부 확인해줘"                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 화면 2: 스크립트 미리보기 & 연락처 입력

```
┌─────────────────────────────────────────────────────────────┐
│  CallBot                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📝 생성된 스크립트                          [수정] [재생성] │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 인사: "안녕하세요, {businessName}입니다."           │   │
│  │                                                     │   │
│  │ 목적: "{customerName}님, 내일 {appointmentTime}에   │   │
│  │       예약이 있으셔서 확인차 연락드렸습니다."        │   │
│  │                                                     │   │
│  │ 흐름:                                               │   │
│  │ 1. 예약 확인 → "예" → 마무리                        │   │
│  │            → "변경" → 다른 시간 제안                │   │
│  │            → "취소" → 취소 사유 확인 → 마무리       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📱 연락처 추가                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 이름          │ 전화번호        │ 예약 시간         │   │
│  │───────────────┼─────────────────┼──────────────────│   │
│  │ 김철수        │ 010-1234-5678   │ 14:00            │   │
│  │ 이영희        │ 010-8765-4321   │ 15:30            │   │
│  │ [+ 연락처 추가]                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                             [CSV 업로드]                    │
│                                                             │
│  캠페인 이름: [2월 5일 예약 확인          ]                 │
│                                                             │
│                          [← 뒤로]  [캠페인 시작 →]          │
└─────────────────────────────────────────────────────────────┘
```

#### 화면 3: 대시보드 (실시간 현황)

```
┌─────────────────────────────────────────────────────────────┐
│  CallBot > 2월 5일 예약 확인                   [일시정지] ⏸ │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  📊 진행 현황                                         │  │
│  │  ████████████░░░░░░░░  60% (6/10)                    │  │
│  │                                                      │  │
│  │  ✅ 완료: 5    📞 진행중: 1    ⏳ 대기: 4    ❌ 실패: 0 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  📋 통화 목록                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 상태  │ 이름    │ 전화번호       │ 결과    │ 시간   │  │
│  │───────┼─────────┼────────────────┼─────────┼────────│  │
│  │ ✅    │ 김철수  │ 010-1234-5678  │ 확인    │ 0:45   │  │
│  │ ✅    │ 이영희  │ 010-8765-4321  │ 변경    │ 1:23   │  │
│  │ ✅    │ 박민수  │ 010-1111-2222  │ 취소    │ 0:58   │  │
│  │ ✅    │ 최지현  │ 010-3333-4444  │ 확인    │ 0:32   │  │
│  │ ✅    │ 정수진  │ 010-5555-6666  │ 부재중  │ -      │  │
│  │ 🔵    │ 한상우  │ 010-7777-8888  │ 통화중...│ 0:15  │  │
│  │ ⏳    │ 오세진  │ 010-9999-0000  │ 대기    │ -      │  │
│  │ ...                                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│                                        [리포트 다운로드 📥] │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Phases

### Phase 1: MVP Core (P0)

- [ ] 프로젝트 초기 설정 (Next.js, Prisma, Tailwind)
- [ ] 사용자 인증 (NextAuth.js + 비밀번호 정책)
- [ ] 자연어 → 스크립트 변환 API (GPT-4)
- [ ] 스크립트 미리보기 UI
- [ ] 연락처 입력 (수동) + 전화번호 검증
- [ ] **Twilio + ElevenLabs 통화 연동**
- [ ] **통화 녹음 동의 안내 자동 재생**
- [ ] 대시보드 (실시간 상태)
- [ ] 캠페인 취소/삭제 기능
- [ ] 통화 예외 처리 (끊김, 인식 실패)
- [ ] Rate Limiting 적용

**Deliverable**: 자연어로 시나리오 설정 → 전화 발신 → 실시간 모니터링 가능

### Phase 2: Enhancement (P1)

- [ ] CSV 연락처 업로드
- [ ] 통화 녹음 저장 및 재생
- [ ] AI 통화 요약
- [ ] PDF/CSV 리포트 다운로드
- [ ] 통화 실패 자동 재시도
- [ ] 진행률 및 예상 완료 시간
- [ ] **발신자 번호 설정**
- [ ] **통화 비용 추적 및 표시**

**Deliverable**: 완전한 통화 캠페인 관리 및 결과 분석 기능

### Phase 3: Polish (P2)

- [ ] 스크립트 저장 및 재사용
- [ ] 대시보드 고급 필터링
- [ ] 통화 통계 및 분석
- [ ] 다크 모드
- [ ] 모바일 최적화

**Deliverable**: 완성도 높은 사용자 경험

---

## 8. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 스크립트 생성 성공률 | > 95% | 자연어 입력 → 유효한 스크립트 생성 비율 |
| 통화 연결 성공률 | > 70% | 전화 발신 → 실제 통화 연결 비율 |
| 평균 통화 완료 시간 | < 2분 | 통화 시작 ~ 종료 평균 시간 |
| 사용자 만족도 | > 4.0/5.0 | 인앱 피드백 |
| 첫 캠페인 완료율 | > 80% | 가입 후 7일 내 첫 캠페인 완료 비율 |

---

## 9. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Twilio/ElevenLabs API 장애 | High | Low | 재시도 로직, 상태 알림, 대기열 보존 |
| 자연어 해석 오류 | Medium | Medium | 스크립트 미리보기 및 수정 기능 |
| 통화 품질 이슈 | Medium | Low | 녹음 저장, 피드백 수집 |
| 스팸 전화 오인 | Medium | Medium | 발신자 번호 인증, 안내 멘트 추가 |
| 통화 비용 폭증 | High | Low | Rate Limiting, 일일/월간 비용 한도, 알림 |
| 한국어 음성 인식 오류 | Medium | Medium | ElevenLabs 한국어 모델 테스트, Fallback 멘트 |

---

## 10. Resolved Questions

| 질문 | 결정 | 사유 |
|------|------|------|
| 통화 녹음 법적 동의 | 통화 시작 시 자동 안내 멘트 재생 | 한국 통신비밀보호법 준수 |
| 국제 전화 지원 | MVP 제외, 한국 번호만 지원 | 소규모 타겟 사용자 |
| 예약 통화 기능 | P2로 연기 | MVP 범위 축소 |
| 통화 중 사용자 개입 | Non-Goal 유지 | 복잡도 증가 |

## 11. Open Questions

1. Twilio 한국 발신 번호 인증 절차 확인 필요
2. ElevenLabs 한국어 음성 품질 테스트 필요
3. 통화 비용 알림 임계값 설정 (예: 월 $50 초과 시 알림)

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| Campaign | 동일한 스크립트로 여러 연락처에 전화하는 단위 |
| Script | AI가 통화 중 따르는 대화 시나리오 |
| MCP | Model Context Protocol - AI 에이전트 도구 연동 프로토콜 |
| SSE | Server-Sent Events - 서버→클라이언트 실시간 스트리밍 |

### B. References

- [ElevenLabs Conversational AI Docs](https://elevenlabs.io/docs/conversational-ai)
- [ElevenLabs MCP Server](https://github.com/elevenlabs/elevenlabs-mcp)
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
