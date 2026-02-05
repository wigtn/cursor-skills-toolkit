# Voice Proxy PRD

> **Version**: 1.1
> **Created**: 2026-02-05
> **Updated**: 2026-02-05 (Digging Review 반영)
> **Status**: Draft

## 1. Overview

### 1.1 Problem Statement

말이 불편하거나 발화가 어려운 사람들은 전화 통화에 큰 불편함을 겪습니다. 예약, 문의, 민원 등 일상적인 전화 업무를 수행하기 어렵고, 대리인에게 의존해야 하는 상황이 발생합니다. 이러한 분들이 **직접 대화 내용을 입력하면 AI 음성이 실시간으로 대신 말해주는** 접근성 솔루션이 필요합니다.

### 1.2 Goals

- 실시간 채팅 입력 → TTS 음성 변환으로 대리 통화 구현
- 상대방 음성 → STT → 텍스트 표시로 양방향 소통 지원
- 말이 불편한 사용자를 위한 직관적이고 빠른 UI/UX
- Twilio + ElevenLabs MCP를 활용한 고품질 음성 통화

### 1.3 Non-Goals (Out of Scope)

- 자동화된 스크립트 기반 통화 (기존 auto-callbot 영역)
- AI가 대신 응답하는 기능 (사용자가 직접 입력)
- 영상 통화 지원
- 다국어 동시 통역

### 1.4 Scope

| 포함 | 제외 |
|------|------|
| 실시간 텍스트 → TTS 음성 전달 | AI 자동 응답 |
| 상대방 음성 → STT → 텍스트 표시 | 영상 통화 |
| 전화 발신 (아웃바운드) | 전화 수신 (인바운드) |
| 빠른 응답 템플릿 (자주 쓰는 문장) | 복잡한 시나리오 빌더 |
| 통화 기록 및 요약 | 장기 보관 (30일 이상) |
| 한국어 지원 | 다국어 동시 지원 |

---

## 2. User Stories

### 2.1 Primary User

**페르소나**: 발화 장애가 있는 사용자, 청각 장애인 (TTY 대체), 선택적 함묵증 환자

As a **말이 불편한 사용자**,
I want to **텍스트를 입력하면 AI 음성이 대신 전화로 말해주길**
so that **직접 전화 통화를 할 수 있다**.

### 2.2 User Stories

| ID | Story | Priority |
|----|-------|----------|
| US-001 | 사용자로서, 전화번호를 입력하고 통화를 시작할 수 있다 | P0 |
| US-002 | 사용자로서, 채팅으로 입력한 내용이 즉시 음성으로 전달된다 | P0 |
| US-003 | 사용자로서, 상대방의 말이 실시간으로 텍스트로 표시된다 | P0 |
| US-004 | 사용자로서, 자주 쓰는 문장을 빠르게 선택하여 전송할 수 있다 | P0 |
| US-005 | 사용자로서, 통화 내용 전체를 텍스트로 확인할 수 있다 | P1 |
| US-006 | 사용자로서, 통화 종료 후 요약을 받을 수 있다 | P1 |
| US-007 | 사용자로서, 이전 통화 기록을 확인할 수 있다 | P2 |

### 2.3 Acceptance Criteria (Gherkin)

```gherkin
Scenario: 실시간 텍스트 → 음성 전달
  Given 통화가 연결되어 있다
  When 사용자가 "안녕하세요, 예약 확인하려고 전화드렸습니다"를 입력한다
  Then 2초 이내에 AI 음성으로 상대방에게 전달된다
  And 전송된 메시지가 채팅 화면에 표시된다

Scenario: 실시간 상대방 음성 → 텍스트 표시
  Given 통화가 연결되어 있다
  When 상대방이 "네, 성함이 어떻게 되시나요?"라고 말한다
  Then 2초 이내에 텍스트로 화면에 표시된다
  And 음성 인식 중임을 나타내는 시각적 피드백이 제공된다

Scenario: 빠른 응답 템플릿 사용
  Given 통화가 연결되어 있다
  When 사용자가 "예" 빠른 응답 버튼을 누른다
  Then 즉시 "네, 맞습니다" 음성이 전달된다
```

---

## 3. Functional Requirements

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| **전화 연결** | | | |
| FR-001 | 전화번호 입력 및 발신 기능 | P0 | - |
| FR-001-1 | 전화번호 형식 검증 (E.164, 한국 번호) | P0 | FR-001 |
| FR-001-2 | 긴급 전화번호 차단 (112, 119, 110, 111) | P0 | FR-001 |
| FR-002 | 통화 연결 상태 표시 (발신중/연결됨/종료) | P0 | FR-001 |
| FR-003 | 통화 종료 기능 | P0 | FR-001 |
| FR-003-1 | 상대방이 먼저 끊었을 때 알림 및 자동 종료 | P0 | FR-003 |
| **실시간 통화** | | | |
| FR-004 | 텍스트 입력 → TTS → 상대방 전달 (< 2초) | P0 | FR-001 |
| FR-004-1 | 텍스트 최대 길이 200자 제한 | P0 | FR-004 |
| FR-004-2 | TTS 변환 실패 시 에러 표시 및 재시도 | P0 | FR-004 |
| FR-004-3 | 음성 출력 중 새 메시지는 큐에 추가 | P1 | FR-004 |
| FR-005 | 상대방 음성 → STT → 텍스트 표시 (< 2초) | P0 | FR-001 |
| FR-005-1 | STT 인식 실패 시 "음성을 인식하지 못했습니다" 표시 | P0 | FR-005 |
| FR-005-2 | 5초 이상 무음 시 "[상대방이 말하지 않고 있습니다]" 표시 | P1 | FR-005 |
| FR-006 | 음성 변환 중 시각적 피드백 (진행 표시) | P0 | FR-004, FR-005 |
| FR-007 | 빠른 응답 템플릿 (예/아니오/잠시만요 등) | P0 | FR-004 |
| FR-008 | 커스텀 빠른 응답 저장 (사용자 정의) | P1 | FR-007 |
| **채팅 인터페이스** | | | |
| FR-009 | 대화 내역 실시간 표시 (나/상대방 구분) | P0 | FR-004, FR-005 |
| FR-010 | 메시지 타임스탬프 표시 | P0 | FR-009 |
| FR-011 | 입력 중/음성 인식 중 상태 표시 | P0 | FR-005 |
| **녹음 및 기록** | | | |
| FR-012 | 통화 녹음 동의 안내 자동 재생 | P0 | FR-001 |
| FR-013 | 통화 내역 저장 (텍스트 transcript) | P1 | FR-009 |
| FR-014 | 통화 종료 후 AI 요약 생성 | P1 | FR-013 |
| FR-015 | 통화 기록 목록 조회 | P2 | FR-013 |
| **접근성** | | | |
| FR-016 | 키보드 단축키 지원 (Enter: 전송, Esc: 종료) | P0 | - |
| FR-017 | 고대비 모드 지원 | P1 | - |
| FR-018 | 큰 글자 모드 지원 | P1 | - |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target | Description |
|--------|--------|-------------|
| TTS 변환 지연 | < 2초 | 텍스트 입력 → 음성 출력 |
| STT 변환 지연 | < 2초 | 상대방 음성 → 텍스트 표시 |
| 통화 연결 시간 | < 10초 | 발신 → 상대방 벨소리 |
| 동시 통화 | 1건/사용자 | 개인 사용자 대상 |

### 4.2 Security

| Item | Requirement |
|------|-------------|
| 인증 | 이메일/비밀번호 기반 로그인 |
| API 키 관리 | Twilio/ElevenLabs API 키 서버 환경변수 |
| 통화 녹음 | 암호화 저장 (AES-256), 동의 후에만 |
| 데이터 전송 | HTTPS (TLS 1.3), WebSocket Secure |

#### 4.2.1 비밀번호 정책

| 항목 | 정책 |
|------|------|
| 최소 길이 | 8자 이상 |
| 복잡도 | 영문 + 숫자 필수 |
| 로그인 실패 | 5회 실패 시 15분 계정 잠금 |

#### 4.2.2 Rate Limiting

| API | Limit | Window |
|-----|-------|--------|
| POST /api/v1/calls | 10회 | 시간당 |
| WebSocket 메시지 | 60회 | 분당 |
| 전체 API | 100회 | 분당 |

#### 4.2.3 세션 관리

| 항목 | 정책 |
|------|------|
| 세션 만료 | 24시간 (활동 시 갱신) |
| 동시 로그인 | 최대 3개 디바이스 |
| 통화 중 세션 | 통화 종료까지 유지 |

### 4.3 Usability

- 3단계 이내 통화 시작 (전화번호 입력 → 발신 → 대화)
- 입력 필드 자동 포커스
- 시각적 피드백 (음성 변환 중, 상대방 말하는 중)
- 모바일 반응형 지원

### 4.4 Reliability

- 서비스 가용성: 99%
- 통화 중 연결 끊김 복구: 자동 재연결 시도 (3회)
- 통화 기록 보관: 30일

#### 4.4.1 네트워크 복구 전략

| 단계 | 동작 |
|------|------|
| 1 | WebSocket 끊김 감지 (heartbeat 5초 간격) |
| 2 | 3초 간격으로 재연결 시도 (최대 3회) |
| 3 | 재연결 성공 시 통화 상태 동기화 |
| 4 | 실패 시 "연결이 끊어졌습니다" 알림 |
| 5 | 서버에서 30초 후 통화 자동 종료 |

---

## 5. Technical Design

### 5.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   실시간 채팅 인터페이스                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │   │
│  │  │ 전화번호 입력  │  │  채팅 영역   │  │  빠른 응답 패널   │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│                              │ WebSocket                            │
│                              ▼                                      │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Backend (Next.js API Routes)                     │
│  ┌───────────────┐  ┌─────────────────┐  ┌───────────────────┐    │
│  │  Call Manager │  │ Message Bridge   │  │  Record Service   │    │
│  │  (발신/종료)   │  │ (TTS/STT 중계)  │  │  (녹음/저장)      │    │
│  └───────┬───────┘  └────────┬────────┘  └─────────┬─────────┘    │
└──────────┼───────────────────┼─────────────────────┼────────────────┘
           │                   │                     │
           ▼                   ▼                     ▼
    ┌──────────────┐   ┌──────────────┐      ┌──────────────┐
    │    Twilio    │   │  ElevenLabs  │      │   Database   │
    │ (전화 발신)   │◄─►│  (TTS/STT)   │      │  (SQLite/    │
    │              │   │              │      │   Postgres)  │
    └──────────────┘   └──────────────┘      └──────────────┘
```

### 5.2 Real-time Communication Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        실시간 통화 흐름                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [사용자 → 상대방]                                                   │
│  ┌────────┐    ┌─────────┐    ┌───────────┐    ┌─────────┐         │
│  │ 텍스트  │ →  │ Backend │ →  │ ElevenLabs│ →  │ Twilio  │ → 상대방 │
│  │ 입력   │    │ (WS)    │    │ TTS       │    │ Media   │         │
│  └────────┘    └─────────┘    └───────────┘    └─────────┘         │
│                                                                     │
│  [상대방 → 사용자]                                                   │
│  ┌─────────┐    ┌───────────┐    ┌─────────┐    ┌────────┐         │
│  │ Twilio  │ →  │ ElevenLabs│ →  │ Backend │ →  │ 텍스트  │         │
│  │ Media   │    │ STT       │    │ (WS)    │    │ 표시   │         │
│  └─────────┘    └───────────┘    └─────────┘    └────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.3 Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | Next.js 16 (App Router) | SSR, React Server Components |
| Styling | Tailwind CSS + shadcn/ui | 빠른 개발, 접근성 컴포넌트 |
| Real-time | WebSocket (Socket.io) | 양방향 실시간 통신 |
| Backend | Next.js API Routes | 풀스택 단일 배포 |
| Database | SQLite (개발) / PostgreSQL (운영) | 소규모에 적합 |
| ORM | Prisma | 타입 안전성, 마이그레이션 |
| 인증 | NextAuth.js | 간편한 인증 구현 |
| 전화 발신 | Twilio Programmable Voice | PSTN 전화 발신 |
| 음성 처리 | Twilio Media Streams + ElevenLabs | 양방향 실시간 오디오 |
| TTS | ElevenLabs Text-to-Speech | 자연스러운 한국어 음성 |
| STT | ElevenLabs Speech-to-Text | 실시간 음성 인식 |
| AI 요약 | OpenAI GPT-4 | 통화 요약 생성 |

### 5.4 Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // hashed
  createdAt     DateTime  @default(now())
  calls         Call[]
  quickReplies  QuickReply[]
  settings      UserSettings?
}

model UserSettings {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  voiceId       String    @default("korean_female_1") // ElevenLabs voice
  highContrast  Boolean   @default(false)
  largeFont     Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model QuickReply {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  label     String    // 버튼 라벨 (예: "예")
  text      String    // 전송될 텍스트 (예: "네, 맞습니다")
  order     Int       @default(0)
  isDefault Boolean   @default(false) // 기본 제공 템플릿
  createdAt DateTime  @default(now())
}

model Call {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  phoneNumber     String
  contactName     String?   // 선택적 연락처 이름
  status          CallStatus @default(PENDING)
  duration        Int?      // 초 단위
  recordingUrl    String?
  recordingConsent Boolean  @default(false)
  twilioCallSid   String?
  cost            Float?    // 통화 비용 (USD)
  costBreakdown   Json?     // { twilio: 0.04, elevenlabs: 0.10 }
  endReason       EndReason? // 통화 종료 사유
  createdAt       DateTime  @default(now())
  connectedAt     DateTime?
  endedAt         DateTime?
  messages        Message[]
  summary         String?   // AI 요약
}

enum EndReason {
  USER_ENDED      // 사용자가 종료
  CALLEE_ENDED    // 상대방이 종료
  TIMEOUT         // 타임아웃
  ERROR           // 에러
}

model Message {
  id        String      @id @default(cuid())
  callId    String
  call      Call        @relation(fields: [callId], references: [id])
  role      MessageRole // USER or CALLEE
  content   String
  timestamp DateTime    @default(now())
}

enum CallStatus {
  PENDING     // 발신 준비
  DIALING     // 발신 중
  RINGING     // 벨소리
  CONNECTED   // 통화 연결됨
  ENDED       // 정상 종료
  FAILED      // 실패
  NO_ANSWER   // 부재중
  BUSY        // 통화중
}

enum MessageRole {
  USER    // 사용자 (TTS로 전달)
  CALLEE  // 상대방 (STT로 인식)
}
```

### 5.5 API Specification

---

#### API: 통화 시작

##### `POST /api/v1/calls`

**Description**: 새로운 전화 통화 시작

**Authentication**: Required (Bearer Token)

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | Bearer {accessToken} |
| Content-Type | Yes | application/json |

**Request Body**:
```json
{
  "phoneNumber": "string (required) - 전화번호 (E.164 형식 또는 한국 번호)",
  "contactName": "string (optional) - 연락처 이름"
}
```

**Request Example**:
```json
{
  "phoneNumber": "+821012345678",
  "contactName": "병원"
}
```

**Response 201 Created**:
```json
{
  "success": true,
  "data": {
    "callId": "string - 통화 ID",
    "status": "DIALING",
    "websocketUrl": "string - 실시간 통신용 WebSocket URL"
  },
  "meta": {
    "timestamp": "string (ISO 8601)"
  }
}
```

**Error Responses**:
| Status | Code | Message | Description |
|--------|------|---------|-------------|
| 400 | INVALID_PHONE | Invalid phone number format | 전화번호 형식 오류 |
| 400 | EMERGENCY_NUMBER | Emergency numbers not allowed | 긴급 전화번호 차단 |
| 400 | CALL_IN_PROGRESS | Already have an active call | 이미 통화 중 |
| 400 | TEXT_TOO_LONG | Text exceeds 200 characters | 텍스트 길이 초과 |
| 402 | INSUFFICIENT_CREDITS | Not enough credits | 크레딧 부족 |
| 401 | UNAUTHORIZED | Authentication required | 인증 필요 |
| 429 | RATE_LIMITED | Too many requests | Rate limit 초과 |

---

#### API: 메시지 전송 (TTS)

##### WebSocket Event: `send_message`

**Description**: 텍스트 메시지를 TTS로 변환하여 상대방에게 전달

**WebSocket URL**: `wss://{host}/api/v1/calls/{callId}/stream`

**Client → Server**:
```json
{
  "event": "send_message",
  "data": {
    "text": "string - 전송할 텍스트"
  }
}
```

**Server → Client (확인)**:
```json
{
  "event": "message_sent",
  "data": {
    "messageId": "string",
    "text": "string",
    "timestamp": "string (ISO 8601)"
  }
}
```

**Server → Client (에러)**:
```json
{
  "event": "message_error",
  "data": {
    "originalText": "string - 원본 텍스트",
    "errorCode": "TTS_FAILED | SEND_FAILED | TIMEOUT | TEXT_TOO_LONG",
    "message": "string - 사용자 친화적 에러 메시지",
    "canRetry": "boolean - 재시도 가능 여부"
  }
}
```

---

#### API: 상대방 음성 수신 (STT)

##### WebSocket Event: `transcription`

**Description**: 상대방의 음성이 텍스트로 변환되어 전달됨

**Server → Client**:
```json
{
  "event": "transcription",
  "data": {
    "messageId": "string",
    "text": "string - 인식된 텍스트",
    "isFinal": "boolean - 최종 결과 여부",
    "timestamp": "string (ISO 8601)"
  }
}
```

**Server → Client (인식 실패)**:
```json
{
  "event": "transcription_error",
  "data": {
    "errorCode": "STT_FAILED | NO_SPEECH",
    "message": "음성을 인식하지 못했습니다"
  }
}
```

**Server → Client (무음 감지)**:
```json
{
  "event": "silence_detected",
  "data": {
    "duration": "number - 무음 시간 (초)",
    "message": "상대방이 말하지 않고 있습니다"
  }
}
```

---

#### API: 통화 상태 업데이트

##### WebSocket Event: `call_status`

**Description**: 통화 상태 변경 알림

**Server → Client**:
```json
{
  "event": "call_status",
  "data": {
    "callId": "string",
    "status": "DIALING | RINGING | CONNECTED | ENDED | FAILED | NO_ANSWER | BUSY",
    "timestamp": "string (ISO 8601)"
  }
}
```

**Server → Client (상대방 종료)**:
```json
{
  "event": "call_ended_by_callee",
  "data": {
    "callId": "string",
    "message": "상대방이 전화를 끊었습니다",
    "duration": "number - 통화 시간 (초)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

#### API: 통화 종료

##### `POST /api/v1/calls/{callId}/end`

**Description**: 진행 중인 통화 종료

**Authentication**: Required

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "ENDED",
    "duration": "number - 통화 시간 (초)",
    "summary": "string (optional) - AI 요약"
  }
}
```

---

#### API: 빠른 응답 목록 조회

##### `GET /api/v1/quick-replies`

**Description**: 사용자의 빠른 응답 템플릿 목록 조회

**Authentication**: Required

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "quickReplies": [
      {
        "id": "string",
        "label": "예",
        "text": "네, 맞습니다",
        "order": 0,
        "isDefault": true
      },
      {
        "id": "string",
        "label": "아니오",
        "text": "아니요, 그렇지 않습니다",
        "order": 1,
        "isDefault": true
      }
    ]
  }
}
```

---

#### API: 통화 기록 조회

##### `GET /api/v1/calls`

**Description**: 사용자의 통화 기록 목록 조회

**Authentication**: Required

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | 페이지 번호 (default: 1) |
| limit | number | 페이지당 개수 (default: 20) |

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "calls": [
      {
        "id": "string",
        "phoneNumber": "string",
        "contactName": "string | null",
        "status": "ENDED",
        "duration": 180,
        "createdAt": "string (ISO 8601)",
        "summary": "string | null"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

#### API: 통화 상세 조회 (Transcript)

##### `GET /api/v1/calls/{callId}`

**Description**: 특정 통화의 상세 정보 및 대화 내역 조회

**Authentication**: Required

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "call": {
      "id": "string",
      "phoneNumber": "string",
      "contactName": "string | null",
      "status": "ENDED",
      "duration": 180,
      "createdAt": "string (ISO 8601)",
      "connectedAt": "string (ISO 8601)",
      "endedAt": "string (ISO 8601)",
      "summary": "string | null",
      "recordingUrl": "string | null"
    },
    "messages": [
      {
        "id": "string",
        "role": "USER | CALLEE",
        "content": "string",
        "timestamp": "string (ISO 8601)"
      }
    ]
  }
}
```

---

### 5.6 Twilio + ElevenLabs Integration

```
┌─────────────────────────────────────────────────────────────────────┐
│                     통화 연결 및 미디어 처리                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. 통화 시작 요청                                                   │
│     사용자 → Backend → Twilio (전화 발신)                            │
│     ↓                                                               │
│  2. 통화 연결                                                        │
│     Twilio → 상대방 (벨소리) → 연결                                   │
│     ↓                                                               │
│  3. 녹음 동의 안내 (자동)                                            │
│     "이 통화는 서비스 품질 향상을 위해 녹음될 수 있습니다"              │
│     ↓                                                               │
│  4. Media Streams 활성화                                            │
│     Twilio Media Streams ◄─► Backend WebSocket                     │
│     ↓                                                               │
│  5. 양방향 음성 처리                                                 │
│     ┌────────────────────────────────────────────────────┐         │
│     │                                                    │         │
│     │  [사용자 입력]                                      │         │
│     │  Frontend → Backend → ElevenLabs TTS → Twilio     │         │
│     │                                                    │         │
│     │  [상대방 음성]                                      │         │
│     │  Twilio → ElevenLabs STT → Backend → Frontend     │         │
│     │                                                    │         │
│     └────────────────────────────────────────────────────┘         │
│     ↓                                                               │
│  6. 통화 종료                                                        │
│     - 녹음 저장 (동의 시)                                            │
│     - 대화 내역 저장                                                 │
│     - AI 요약 생성                                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**구현 코드 예시**:

```typescript
// 1. 통화 시작 (Twilio 발신)
const twilioCall = await twilioClient.calls.create({
  to: phoneNumber,
  from: process.env.TWILIO_PHONE_NUMBER,
  url: `${BASE_URL}/api/twilio/voice/${callId}`,
  statusCallback: `${BASE_URL}/api/twilio/status/${callId}`,
});

// 2. TwiML (녹음 동의 + Media Stream 설정)
const twiml = new VoiceResponse();
twiml.say(
  { language: 'ko-KR' },
  '이 통화는 서비스 품질 향상을 위해 녹음될 수 있습니다.'
);
const connect = twiml.connect();
connect.stream({
  url: `wss://${BASE_URL}/api/media-stream/${callId}`,
});

// 3. Media Stream WebSocket 처리
wss.on('connection', (ws, callId) => {
  // ElevenLabs WebSocket 연결
  const elevenLabsWs = connectElevenLabs();

  // 상대방 음성 → STT
  ws.on('message', (audioData) => {
    elevenLabsWs.send(audioData); // STT 처리
  });

  // STT 결과 → 프론트엔드
  elevenLabsWs.on('transcription', (text) => {
    broadcastToUser(callId, {
      event: 'transcription',
      data: { text, isFinal: true }
    });
  });

  // 사용자 텍스트 → TTS → 상대방
  userWs.on('send_message', async ({ text }) => {
    const audioBuffer = await elevenLabsTTS(text);
    ws.send(audioBuffer); // Twilio로 전송
  });
});
```

---

## 6. UI/UX Design

### 6.1 주요 화면

#### 화면 1: 통화 시작

```
┌─────────────────────────────────────────────────────────────┐
│  Voice Proxy                                    [설정] [로그아웃]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    📞 새 통화 시작                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │         전화번호를 입력하세요                         │   │
│  │                                                     │   │
│  │  ┌───────────────────────────────────────────┐     │   │
│  │  │  010-1234-5678                            │     │   │
│  │  └───────────────────────────────────────────┘     │   │
│  │                                                     │   │
│  │  연락처 이름 (선택)                                  │   │
│  │  ┌───────────────────────────────────────────┐     │   │
│  │  │  병원                                      │     │   │
│  │  └───────────────────────────────────────────┘     │   │
│  │                                                     │   │
│  │                   [ 📞 전화 걸기 ]                   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  📋 최근 통화                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 병원 (010-1234-5678)          2분 전    3분 12초    │   │
│  │ 피자집 (02-123-4567)          어제      1분 45초    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 화면 2: 실시간 통화 (핵심 화면)

```
┌─────────────────────────────────────────────────────────────┐
│  📞 병원 (010-1234-5678)                    🔴 통화중 03:24 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                     대화 내역                         │   │
│  │─────────────────────────────────────────────────────│   │
│  │                                                     │   │
│  │  🟢 나 (10:23)                                       │   │
│  │  안녕하세요, 예약 확인하려고 전화드렸습니다.           │   │
│  │                                                     │   │
│  │                              🔵 상대방 (10:23)       │   │
│  │              네, 안녕하세요. 성함이 어떻게 되시나요?   │   │
│  │                                                     │   │
│  │  🟢 나 (10:24)                                       │   │
│  │  홍길동입니다.                                        │   │
│  │                                                     │   │
│  │                              🔵 상대방 (10:24)       │   │
│  │              네, 홍길동님. 내일 오후 2시 예약이       │   │
│  │              확인됩니다. 오실 수 있으시죠?             │   │
│  │                                                     │   │
│  │                                       🎤 듣는 중...  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  빠른 응답                                           │   │
│  │  [ 예 ] [ 아니오 ] [ 잠시만요 ] [ 다시 말씀해주세요 ]   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  네, 맞습니다. 감사합니다.                     [전송] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│                        [ 🔴 통화 종료 ]                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 화면 3: 통화 종료 / 요약

```
┌─────────────────────────────────────────────────────────────┐
│  Voice Proxy                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ✅ 통화가 종료되었습니다                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  📞 병원 (010-1234-5678)                            │   │
│  │  통화 시간: 3분 24초                                 │   │
│  │  일시: 2026-02-05 10:23                              │   │
│  │                                                     │   │
│  │  ─────────────────────────────────────────────────  │   │
│  │                                                     │   │
│  │  📝 AI 요약                                          │   │
│  │                                                     │   │
│  │  홍길동님이 병원에 전화하여 내일(2월 6일) 오후 2시    │   │
│  │  예약을 확인했습니다. 예약이 정상적으로 확인되었으며,  │   │
│  │  방문 예정입니다.                                    │   │
│  │                                                     │   │
│  │  ─────────────────────────────────────────────────  │   │
│  │                                                     │   │
│  │  [ 📋 전체 대화 보기 ]  [ 🔊 녹음 듣기 ]             │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│                      [ 🏠 홈으로 ]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 접근성 고려사항

| 항목 | 구현 |
|------|------|
| 키보드 네비게이션 | Tab 순서 최적화, Enter로 전송, Esc로 종료 |
| 화면 읽기 | ARIA labels, 실시간 알림 (aria-live) |
| 시각적 피드백 | 음성 변환 중 애니메이션, 상대방 말하는 중 표시 |
| 고대비 모드 | 설정에서 활성화 가능 |
| 큰 글자 | 설정에서 폰트 크기 조절 |
| 자동 포커스 | 통화 연결 시 입력 필드 자동 포커스 |

### 6.3 기본 빠른 응답 템플릿

| 라벨 | 전송 텍스트 |
|------|------------|
| 예 | 네, 맞습니다 |
| 아니오 | 아니요, 그렇지 않습니다 |
| 잠시만요 | 잠시만 기다려 주세요 |
| 다시요 | 다시 한 번 말씀해 주시겠어요? |
| 감사합니다 | 감사합니다 |
| 안녕히 | 네, 안녕히 계세요 |

---

## 7. Implementation Phases

### Phase 1: MVP Core (P0)

- [ ] 프로젝트 초기 설정 (Next.js, Prisma, Tailwind)
- [ ] 사용자 인증 (NextAuth.js)
- [ ] 전화번호 입력 및 검증 UI
- [ ] Twilio 전화 발신 연동
- [ ] Twilio Media Streams + ElevenLabs 연동
- [ ] 녹음 동의 안내 자동 재생
- [ ] 실시간 채팅 인터페이스 (WebSocket)
- [ ] 텍스트 → TTS → 상대방 전달
- [ ] 상대방 음성 → STT → 텍스트 표시
- [ ] 빠른 응답 버튼 (기본 6개)
- [ ] 통화 종료 기능
- [ ] 키보드 단축키 지원

**Deliverable**: 텍스트로 대리 통화 가능한 MVP

### Phase 2: Enhanced Features (P1)

- [ ] 커스텀 빠른 응답 저장
- [ ] 통화 기록 저장 (transcript)
- [ ] AI 통화 요약 생성
- [ ] 통화 기록 목록 조회
- [ ] 통화 상세 페이지 (대화 내역)
- [ ] 녹음 저장 및 재생
- [ ] 고대비 모드
- [ ] 큰 글자 모드

**Deliverable**: 완전한 통화 기록 관리 및 접근성 향상

### Phase 3: Polish (P2)

- [ ] 최근 통화 목록
- [ ] 연락처 저장 기능
- [ ] 통화 검색 및 필터링
- [ ] 음성 설정 (목소리 선택)
- [ ] 다크 모드
- [ ] 모바일 최적화
- [ ] PWA 지원

**Deliverable**: 완성도 높은 사용자 경험

---

## 8. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| TTS 변환 성공률 | > 99% | 텍스트 전송 → 음성 출력 성공 비율 |
| STT 인식 정확도 | > 90% | 상대방 발화 → 텍스트 정확도 |
| 평균 지연 시간 | < 2초 | 입력/발화 → 출력/표시 |
| 통화 연결 성공률 | > 80% | 발신 → 실제 통화 연결 |
| 사용자 만족도 | > 4.0/5.0 | 인앱 피드백 |

---

## 9. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| TTS/STT 지연 | High | Medium | 스트리밍 방식 구현, 버퍼 최적화 |
| 음성 인식 오류 | Medium | Medium | "다시 말씀해주세요" 빠른 응답 제공 |
| 통화 품질 이슈 | High | Low | 녹음 저장, 재시도 기능 |
| ElevenLabs 장애 | High | Low | 상태 모니터링, 사용자 알림 |
| 사용자 오입력 | Low | High | 전송 전 확인, 실행 취소 (1초 내) |

---

## 10. Resolved Questions (Digging Review)

| 질문 | 결정 | 사유 |
|------|------|------|
| 비밀번호 정책 | 8자+, 영문+숫자, 5회 실패 시 잠금 | 보안 강화 |
| Rate Limiting | 통화 시간당 10회, 메시지 분당 60회 | 비용 제어 |
| 긴급 전화 처리 | 112/119/110/111 차단 | TTS 통화 부적합 |
| 네트워크 복구 | 3초 간격 3회 재시도, 30초 후 종료 | 사용자 경험 |
| 긴 텍스트 처리 | 200자 제한 | TTS 지연 방지 |
| 메시지 큐잉 | 음성 출력 중 새 메시지 큐에 추가 | 순서 보장 |

## 11. Open Questions

1. ElevenLabs 한국어 음성 품질 테스트 필요 (어떤 음성이 가장 자연스러운지)
2. 월간 통화 제한 또는 과금 모델 결정 필요
3. 통화 비용 알림 임계값 설정 (예: 통화당 $1 초과 시 경고)

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| TTS | Text-to-Speech - 텍스트를 음성으로 변환 |
| STT | Speech-to-Text - 음성을 텍스트로 변환 |
| Media Streams | Twilio의 실시간 양방향 오디오 스트리밍 |
| Quick Reply | 빠른 응답 - 자주 쓰는 문장 템플릿 |

### B. Related Documents

- [PRD_auto-callbot.md](./PRD_auto-callbot.md) - 자동화 기반 아웃바운드 콜봇
- [ADR_voice-proxy-architecture.md](../adr/ADR_voice-proxy-architecture.md) - 아키텍처 결정 기록 (Twilio + ElevenLabs TTS/STT vs ElevenLabs Conversational AI 비교)

### C. References

- [Twilio Media Streams](https://www.twilio.com/docs/voice/media-streams)
- [ElevenLabs Conversational AI](https://elevenlabs.io/docs/conversational-ai)
- [ElevenLabs MCP Server](https://github.com/elevenlabs/elevenlabs-mcp)
- [WCAG 2.1 접근성 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
