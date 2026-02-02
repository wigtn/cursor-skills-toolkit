# Accessible Reservation Agent PRD

> **Version**: 2.0
> **Created**: 2026-02-02
> **Status**: Draft
> **Project**: Cursor Hackathon - WIGTN

---

## 1. Overview

### 1.1 Problem Statement

장애인(시각, 청각, 지체, 인지 장애)은 식당 예약 시 다음과 같은 어려움을 겪습니다:

- **접근성 정보 전달의 어려움**: "휠체어 진입 가능한가요?", "경사로가 있나요?", "휠체어 자리가 있나요?" 같은 질문을 매번 직접 설명해야 함
- **전화 통화의 부담**: 청각/언어 장애인은 전화 예약 자체가 불가능하거나 매우 어려움
- **복잡한 예약 과정**: 인지 장애가 있는 경우 실시간 대화와 의사결정이 부담
- **대리 예약 의존**: 가족이나 활동보조인에게 항상 부탁해야 하는 종속성

**핵심 가치 제안**:
> "접근성 요구사항을 정확히 전달해 예약 성공률을 높이는 에이전트"

### 1.2 Goals

- **접근성 중심 UX**: 음성(Realtime) + 큰 버튼(3~5개) + 텍스트(보조) 입력 방식
- **확인 기반 안전성**: "제가 이해한 내용이 맞나요?"를 항상 거침
- **반자동 방식**: 예약 메시지/스크립트 생성 → 사용자 확인 후 전송/통화
- **해커톤 완성도**: 5시간 내 데모 가능한 MVP

### 1.3 Non-Goals (Out of Scope)

- 완전 자동 전화 발신 (법적/정책적 리스크)
- 실제 예약 API 연동 (해커톤 시간 제약)
- 다국어 지원 (한국어만)
- 사용자 인증/회원가입
- 예약 이력 저장/관리

### 1.4 Scope

| 포함 | 제외 |
|------|------|
| OpenAI Realtime API (WebRTC) 기반 음성 대화 | 실제 전화 발신 |
| 식당 예약 시나리오 (접근성 요청 포함) | 택시/병원 등 다른 예약 |
| 예약 메시지 생성 (복사 가능) | 실제 메시지 발송 |
| 전화 스크립트 생성 (한 문장씩 안내) | 자동 통화 |
| 예약 요약 카드 생성 | DB 저장 |
| 캘린더 추가 링크 생성 | 실제 캘린더 연동 |

---

## 2. User Stories

### 2.1 Primary User Persona

**페르소나**: 김민수 (35세, 지체장애 1급, 휠체어 사용자)
- 휠체어로 식당 방문 시 경사로/테이블 높이/화장실 접근성 확인 필요
- 매번 식당에 전화해서 같은 질문을 반복하는 것이 지침
- 스마트폰 사용은 능숙하지만, 복잡한 폼 입력은 불편

**User Story**:
> As a 휠체어 사용자, I want to 음성으로 예약 요청을 말하면 접근성 관련 질문이 포함된 예약 메시지를 자동 생성해주는 서비스 so that 매번 같은 설명을 반복하지 않고도 필요한 정보를 전달할 수 있다.

### 2.2 Secondary User Stories

1. **청각 장애인 (40대, 중증 청각장애)**:
   > As a 청각 장애인, I want to 텍스트로 예약 정보를 입력하고 전화할 때 읽을 스크립트를 받아서 so that 대리인이 전화할 때 정확한 내용을 전달할 수 있다.

2. **인지 장애인의 보호자 (50대)**:
   > As a 발달장애인 자녀의 보호자, I want to 단계별로 쉬운 말로 안내받으면서 예약을 진행 so that 자녀가 스스로 예약을 연습해볼 수 있다.

3. **시각 장애인 (30대)**:
   > As a 시각 장애인, I want to 음성만으로 모든 과정을 진행하고 결과도 음성으로 들을 수 있어서 so that 화면을 보지 않고도 예약을 완료할 수 있다.

### 2.3 Acceptance Criteria (Gherkin)

```gherkin
Feature: 접근성 중심 식당 예약 에이전트

  Background:
    Given 사용자가 앱에 접속한 상태

  Scenario: 음성으로 예약 정보 수집
    When 사용자가 마이크 버튼을 누르고 "오늘 저녁 7시에 2명, 휠체어 이용자예요"라고 말하면
    Then AI가 실시간으로 음성을 인식하여 응답한다
    And "휠체어 접근 가능한 입구와 테이블이 필요하시군요. 혹시 추가로 필요한 것이 있으신가요?"라고 음성으로 묻는다

  Scenario: 접근성 요구사항 확인 카드
    Given 사용자가 예약 정보를 모두 입력한 상태에서
    When AI가 정보 수집을 완료하면
    Then 화면에 확인 카드가 표시된다:
      | 항목 | 내용 |
      | 날짜/시간 | 오늘 (2026-02-02) 19:00 |
      | 인원 | 2명 |
      | 접근성 요청 | 휠체어 진입 가능한 입구, 휠체어 배치 가능한 테이블 |
      | 추가 요청 | - |
    And "이 내용이 맞나요?" 확인 버튼과 "수정하기" 버튼이 표시된다
    And 스크린리더로 카드 내용이 읽힌다

  Scenario: 예약 메시지 생성
    Given 사용자가 확인 카드에서 "맞아요" 버튼을 누른 상태에서
    When AI가 예약 메시지를 생성하면
    Then 다음 결과물이 표시된다:
      1. 문자/카톡용 메시지 (복사 버튼 포함)
      2. 전화 스크립트 ("다음" 버튼으로 한 문장씩)
      3. 예약 요약 카드 (캘린더 추가 링크)
    And 모든 결과물은 음성으로도 읽어준다

  Scenario: 전화 스크립트 단계별 안내
    Given 전화 스크립트 화면에서
    When 사용자가 전화를 걸고 스크립트를 보면
    Then 한 문장씩 큰 글씨로 표시된다:
      "안녕하세요, 예약 문의드립니다."
    And "다음" 버튼을 누르면 다음 문장으로 넘어간다:
      "오늘 저녁 7시에 2명 예약하고 싶은데요."
    And "상대방이 뭐라고 했나요?" 입력창에 상대방 말을 적으면 다음 대응 문장을 제안한다

  Scenario: 세션 초기화
    Given 예약 결과가 표시된 상태에서
    When 사용자가 "새 예약" 버튼을 누르면
    Then 모든 상태가 초기화되고 처음 화면으로 돌아간다
```

---

## 3. Functional Requirements

| ID | Requirement | Priority | Dependencies |
|----|------------|----------|--------------|
| FR-001 | OpenAI Realtime API (WebRTC)로 실시간 음성 대화 | P0 (Must) | - |
| FR-002 | 음성 입력 → 예약 정보 추출 (function calling) | P0 (Must) | FR-001 |
| FR-003 | 접근성 요구사항 확인 카드 UI | P0 (Must) | FR-002 |
| FR-004 | 예약 메시지 생성 (문자/카톡용) | P0 (Must) | FR-003 |
| FR-005 | 전화 스크립트 생성 (단계별 안내) | P0 (Must) | FR-003 |
| FR-006 | 예약 요약 카드 생성 | P0 (Must) | FR-003 |
| FR-007 | 큰 버튼 UI (최소 48x48px, 3~5개 선택지) | P0 (Must) | - |
| FR-008 | 텍스트 입력 대체 수단 | P1 (Should) | - |
| FR-009 | 캘린더 추가 링크 생성 (Google Calendar) | P1 (Should) | FR-006 |
| FR-010 | 스크린리더 완벽 지원 (ARIA) | P1 (Should) | - |
| FR-011 | 키보드 단축키 지원 | P2 (Could) | - |
| FR-012 | 음성 속도 조절 | P2 (Could) | FR-001 |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target | Description |
|--------|--------|-------------|
| 음성 응답 지연 | < 500ms | Realtime API 응답까지 |
| 첫 화면 로드 | < 2초 | LCP (Largest Contentful Paint) |
| WebRTC 연결 | < 3초 | 마이크 활성화 후 연결까지 |

### 4.2 Accessibility (WCAG 2.2 AA 기준)

| Feature | Requirement |
|---------|-------------|
| 글씨 크기 | 최소 18px, 조절 가능 (최대 32px) |
| 대비율 | 최소 4.5:1 (일반 텍스트), 3:1 (큰 텍스트) |
| 버튼 크기 | 최소 48x48px 터치 영역 |
| 포커스 표시 | 명확한 아웃라인 (3px, 고대비 색상) |
| 스크린리더 | ARIA 레이블 완전 지원 |
| 키보드 접근 | 모든 기능 키보드로 접근 가능 |
| 모션 | `prefers-reduced-motion` 존중 |

### 4.3 Security

- HTTPS 필수 (Vercel 기본 제공)
- 음성 데이터 로컬 처리 (Realtime API 직접 연결)
- 개인정보 서버 저장 안함
- API 키 환경변수 관리

### 4.4 Browser Support

| Browser | Version | 비고 |
|---------|---------|------|
| Chrome | 90+ | WebRTC 완전 지원 |
| Safari | 14.1+ | WebRTC 지원 |
| Edge | 90+ | Chromium 기반 |
| Firefox | 80+ | WebRTC 지원 |

---

## 5. Technical Design

### 5.1 Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | Next.js 16 (App Router) | React 19, 빠른 개발 |
| Styling | Tailwind CSS v4 | 접근성 유틸리티 포함 |
| Realtime Voice | OpenAI Realtime API (WebRTC) | 저지연 음성 인터랙션 |
| Function Calling | OpenAI Tools | 예약 정보 구조화 |
| State | Zustand | 가벼운 클라이언트 상태 |
| Deploy | Vercel | Edge 지원, HTTPS 기본 |

### 5.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Frontend (Next.js 16)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌────────────────┐   ┌────────────────┐   ┌────────────────┐         │
│   │   Voice Input  │   │ Confirmation   │   │    Results     │         │
│   │   Component    │   │    Card        │   │   Component    │         │
│   │   (WebRTC)     │   │   Component    │   │                │         │
│   └───────┬────────┘   └───────┬────────┘   └───────┬────────┘         │
│           │                    │                    │                   │
│   ┌───────▼────────────────────▼────────────────────▼───────┐          │
│   │                 Zustand State Store                      │          │
│   │  {                                                       │          │
│   │    phase: 'input' | 'confirm' | 'result',               │          │
│   │    reservation: ReservationInfo,                        │          │
│   │    isListening: boolean,                                │          │
│   │    messages: ConversationMessage[]                      │          │
│   │  }                                                       │          │
│   └────────────────────────────┬────────────────────────────┘          │
│                                │                                        │
└────────────────────────────────┼────────────────────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │                         │
         WebRTC     │   OpenAI Realtime API   │
         Direct     │   (gpt-4o-realtime)     │
         Connection │                         │
                    │   Tools (Functions):    │
                    │   - collect_reservation │
                    │   - confirm_details     │
                    │   - generate_outputs    │
                    │                         │
                    └─────────────────────────┘
```

### 5.3 Screen Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   1. 대화 화면   │ ──▶ │  2. 확인 화면   │ ──▶ │  3. 결과 화면   │
│                 │     │                 │     │                 │
│  [마이크 버튼]   │     │  [확인 카드]    │     │ [예약 메시지]   │
│  [텍스트 입력]   │     │  [맞아요 버튼]  │     │ [전화 스크립트] │
│  [퀵 버튼 3개]   │     │  [수정 버튼]    │     │ [요약 카드]     │
│                 │     │                 │     │ [새 예약 버튼]  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 5.4 OpenAI Realtime API Integration

#### WebRTC 연결 설정

```typescript
// lib/realtime/client.ts

interface RealtimeConfig {
  model: 'gpt-4o-realtime-preview-2024-12-17';
  voice: 'alloy' | 'echo' | 'shimmer';
  instructions: string;
  tools: RealtimeTool[];
}

// 1. Ephemeral Token 발급 (서버 사이드)
// POST /api/realtime/session

// 2. WebRTC 연결 (클라이언트)
const pc = new RTCPeerConnection();

// 3. 오디오 트랙 설정
const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
pc.addTrack(mediaStream.getTracks()[0]);

// 4. Data Channel로 이벤트 수신
const dc = pc.createDataChannel('oai-events');
dc.addEventListener('message', handleRealtimeEvent);

// 5. Offer/Answer 교환
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

const response = await fetch('https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${ephemeralToken}`,
    'Content-Type': 'application/sdp'
  },
  body: offer.sdp
});

const answer = { type: 'answer', sdp: await response.text() };
await pc.setRemoteDescription(answer);
```

#### Function Calling (Tools) Schema

```typescript
// lib/realtime/tools.ts

export const realtimeTools = [
  {
    type: 'function',
    name: 'collect_reservation',
    description: '사용자의 예약 정보를 수집합니다. 날짜, 시간, 인원, 접근성 요구사항을 포함합니다.',
    parameters: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: '예약 날짜 (YYYY-MM-DD 형식)'
        },
        time: {
          type: 'string',
          description: '예약 시간 (HH:MM 형식, 24시간제)'
        },
        party_size: {
          type: 'number',
          description: '예약 인원 수'
        },
        accessibility_needs: {
          type: 'array',
          items: { type: 'string' },
          description: '접근성 요구사항 목록 (예: 휠체어 진입로, 휠체어 테이블, 점자 메뉴, 수어 통역 등)'
        },
        restaurant_name: {
          type: 'string',
          description: '예약하려는 식당 이름 (선택)'
        },
        additional_requests: {
          type: 'string',
          description: '추가 요청사항 (알레르기, 특별 요청 등)'
        }
      },
      required: ['date', 'time', 'party_size']
    }
  },
  {
    type: 'function',
    name: 'confirm_details',
    description: '수집된 예약 정보를 사용자에게 확인받습니다.',
    parameters: {
      type: 'object',
      properties: {
        confirmation_message: {
          type: 'string',
          description: '확인 메시지 (예: "오늘 저녁 7시에 2명, 휠체어 접근 가능한 테이블로 예약하시는 게 맞으시죠?")'
        },
        reservation_summary: {
          type: 'object',
          description: '예약 정보 요약'
        }
      },
      required: ['confirmation_message', 'reservation_summary']
    }
  },
  {
    type: 'function',
    name: 'generate_outputs',
    description: '확인된 예약 정보로 최종 결과물(메시지, 스크립트, 요약)을 생성합니다.',
    parameters: {
      type: 'object',
      properties: {
        message_for_text: {
          type: 'string',
          description: '문자/카톡으로 보낼 예약 요청 메시지'
        },
        phone_script: {
          type: 'array',
          items: { type: 'string' },
          description: '전화 스크립트 (문장 단위 배열)'
        },
        summary_card: {
          type: 'object',
          properties: {
            date: { type: 'string' },
            time: { type: 'string' },
            party_size: { type: 'number' },
            accessibility: { type: 'array', items: { type: 'string' } },
            additional: { type: 'string' }
          }
        },
        calendar_event: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            start: { type: 'string' },
            end: { type: 'string' },
            description: { type: 'string' }
          }
        }
      },
      required: ['message_for_text', 'phone_script', 'summary_card']
    }
  }
];
```

#### System Instructions (프롬프트)

```typescript
// lib/realtime/instructions.ts

export const systemInstructions = `
당신은 장애인 사용자를 위한 식당 예약 도우미입니다.

## 핵심 원칙
1. **친절하고 천천히**: 모든 사용자가 편안하게 대화할 수 있도록 천천히, 명확하게 말합니다.
2. **확인 중심**: 절대 가정하지 않고, 항상 확인합니다. "~이신 거죠?"
3. **쉬운 말**: 어려운 표현 대신 쉬운 표현을 사용합니다.
4. **단계별 진행**: 한 번에 하나씩만 물어봅니다.

## 접근성 요구사항 예시 (사용자가 말하면 자동 포함)
- 휠체어: "휠체어 진입 가능한 입구", "휠체어 배치 가능한 테이블", "장애인 화장실"
- 시각: "점자 메뉴", "음성 안내", "안내견 동반"
- 청각: "필담 가능 여부", "수어 통역 요청"
- 기타: "저염식/알레르기 대응", "조용한 자리"

## 대화 흐름
1. 인사 + 어떤 예약인지 물어보기
2. 날짜/시간/인원 수집 (하나씩)
3. 접근성 요구사항 수집 (있으면)
4. 추가 요청사항 수집 (있으면)
5. **반드시 확인**: collect_reservation → confirm_details
6. 사용자가 "맞아요" 하면 → generate_outputs

## 중요 규칙
- 사용자가 확인하기 전에는 절대 generate_outputs를 호출하지 마세요
- 모든 function call 결과는 사용자에게 음성으로 알려주세요
- 에러 발생 시 "죄송합니다, 다시 한 번 말씀해주시겠어요?"

## 톤 & 매너
- 반말 금지, 존댓말 사용
- "~하실까요?", "~해드릴까요?" 형태로 질문
- 긍정적이고 따뜻한 톤 유지
`;
```

### 5.5 API Specification

---

#### API: Realtime Session 생성 (Ephemeral Token)

##### `POST /api/realtime/session`

**Description**: OpenAI Realtime API 연결을 위한 임시 토큰 발급

**Authentication**: None (해커톤 데모)

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Content-Type | Yes | application/json |

**Request Body**:
```json
{
  "voice": "string (optional) - 음성 종류: 'alloy' | 'echo' | 'shimmer', default: 'alloy'"
}
```

**Request Example**:
```json
{
  "voice": "alloy"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "ephemeralToken": "string - 60초 유효 토큰",
    "expiresAt": "string (ISO 8601) - 만료 시간"
  }
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "ephemeralToken": "eph_abc123...",
    "expiresAt": "2026-02-02T12:01:00Z"
  }
}
```

**Error Responses**:
| Status | Code | Message | When |
|--------|------|---------|------|
| 500 | TOKEN_ERROR | Failed to create session | OpenAI API 오류 |
| 503 | SERVICE_UNAVAILABLE | Realtime API not available | 서비스 불가 |

---

#### API: 캘린더 이벤트 URL 생성

##### `POST /api/calendar/generate`

**Description**: Google Calendar 추가 URL 생성

**Request Body**:
```json
{
  "title": "string (required) - 이벤트 제목",
  "start": "string (required) - 시작 시간 (ISO 8601)",
  "end": "string (required) - 종료 시간 (ISO 8601)",
  "description": "string (optional) - 설명",
  "location": "string (optional) - 장소"
}
```

**Request Example**:
```json
{
  "title": "식당 예약 - OO식당",
  "start": "2026-02-02T19:00:00+09:00",
  "end": "2026-02-02T21:00:00+09:00",
  "description": "2명, 휠체어 테이블 요청",
  "location": "서울시 강남구"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "googleCalendarUrl": "https://calendar.google.com/calendar/render?action=TEMPLATE&..."
  }
}
```

---

### 5.6 State Schema (Zustand)

```typescript
// store/reservationStore.ts

interface ReservationInfo {
  date: string | null;          // "2026-02-02"
  time: string | null;          // "19:00"
  partySize: number | null;     // 2
  restaurantName: string | null;
  accessibilityNeeds: string[]; // ["휠체어 진입로", "휠체어 테이블"]
  additionalRequests: string | null;
}

interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface OutputResults {
  messageForText: string;
  phoneScript: string[];
  summaryCard: ReservationInfo;
  calendarUrl: string | null;
}

interface ReservationState {
  // Phase
  phase: 'input' | 'confirm' | 'result';

  // Reservation Data
  reservation: ReservationInfo;

  // Realtime State
  isConnected: boolean;
  isListening: boolean;

  // Conversation
  messages: ConversationMessage[];

  // Results
  outputs: OutputResults | null;

  // Script Navigation
  currentScriptIndex: number;

  // Actions
  setPhase: (phase: 'input' | 'confirm' | 'result') => void;
  updateReservation: (partial: Partial<ReservationInfo>) => void;
  addMessage: (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => void;
  setOutputs: (outputs: OutputResults) => void;
  nextScript: () => void;
  prevScript: () => void;
  reset: () => void;
}
```

### 5.7 Component Structure

```
src/components/
├── ui/                              # Primitives (접근성 강화)
│   ├── AccessibleButton.tsx         # 48x48px 최소, ARIA 완전 지원
│   ├── AccessibleCard.tsx           # 카드 컴포넌트
│   ├── AccessibleInput.tsx          # 라벨 연결, 에러 상태
│   └── VisuallyHidden.tsx           # 스크린리더 전용 텍스트
│
├── features/
│   ├── VoiceInput/
│   │   ├── VoiceInputPanel.tsx      # 마이크 버튼 + 상태 표시
│   │   ├── TranscriptDisplay.tsx    # 실시간 텍스트 표시
│   │   └── QuickButtons.tsx         # 빠른 입력 버튼 (3~5개)
│   │
│   ├── Confirmation/
│   │   ├── ConfirmationCard.tsx     # 확인 카드 UI
│   │   └── EditableField.tsx        # 수정 가능한 필드
│   │
│   └── Results/
│       ├── ResultTabs.tsx           # 탭 네비게이션
│       ├── TextMessage.tsx          # 복사 가능한 메시지
│       ├── PhoneScript.tsx          # 단계별 스크립트
│       ├── SummaryCard.tsx          # 요약 카드
│       └── CalendarLink.tsx         # 캘린더 추가 버튼
│
└── layout/
    ├── Header.tsx                   # 헤더 (접근성 설정 버튼)
    └── AccessibilitySettings.tsx    # 글씨 크기, 대비 설정
```

### 5.8 UI/UX Wireframe

#### Screen 1: 대화 화면

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     🎙️ 예약 도우미          [⚙️ 설정]                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │  💬 대화                                          │  │
│   │                                                  │  │
│   │  ┌────────────────────────────────────────────┐  │  │
│   │  │ AI: 안녕하세요! 식당 예약을 도와드릴게요.   │  │  │
│   │  │     어떤 날짜에 예약하시겠어요?             │  │  │
│   │  └────────────────────────────────────────────┘  │  │
│   │                                                  │  │
│   │        ┌────────────────────────────────────┐   │  │
│   │        │ 나: 오늘 저녁 7시에 2명이요.       │   │  │
│   │        │     휠체어 이용자예요.              │   │  │
│   │        └────────────────────────────────────┘   │  │
│   │                                                  │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │  🚀 빠른 입력                                    │  │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │  │
│   │  │  오늘    │ │  내일    │ │ 이번 주말 │          │  │
│   │  │  저녁    │ │  점심    │ │          │          │  │
│   │  └──────────┘ └──────────┘ └──────────┘          │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │  [    텍스트로 입력하기...               ] [전송] │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
│              ┌────────────────────┐                      │
│              │                    │                      │
│              │   🎤 말하기        │                      │
│              │   (크게 누르세요)   │                      │
│              │                    │                      │
│              └────────────────────┘                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Screen 2: 확인 화면

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     ✅ 예약 정보 확인                                    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │                                                  │  │
│   │   📅 날짜/시간                                   │  │
│   │   ─────────────────────────────────────────────  │  │
│   │   2026년 2월 2일 (일) 저녁 7시                   │  │
│   │                                                  │  │
│   │   👥 인원                                        │  │
│   │   ─────────────────────────────────────────────  │  │
│   │   2명                                            │  │
│   │                                                  │  │
│   │   ♿ 접근성 요청                                  │  │
│   │   ─────────────────────────────────────────────  │  │
│   │   • 휠체어 진입 가능한 입구                      │  │
│   │   • 휠체어 배치 가능한 테이블                    │  │
│   │                                                  │  │
│   │   📝 추가 요청                                   │  │
│   │   ─────────────────────────────────────────────  │  │
│   │   (없음)                                         │  │
│   │                                                  │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │                                                  │  │
│   │    이 내용이 맞나요?                             │  │
│   │                                                  │  │
│   │    ┌─────────────┐      ┌─────────────┐         │  │
│   │    │             │      │             │         │  │
│   │    │   ✅ 맞아요  │      │  ✏️ 수정하기 │         │  │
│   │    │             │      │             │         │  │
│   │    └─────────────┘      └─────────────┘         │  │
│   │                                                  │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Screen 3: 결과 화면

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     🎉 예약 준비 완료!                                   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │  [📱 메시지] [📞 전화] [📋 요약]                  │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
│   ─────────────────────────────────────────────────────  │
│                                                          │
│   📱 문자/카톡으로 보낼 메시지                           │
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │                                                  │  │
│   │  안녕하세요, 예약 문의드립니다.                  │  │
│   │                                                  │  │
│   │  - 날짜: 2026년 2월 2일 (일)                     │  │
│   │  - 시간: 저녁 7시                                │  │
│   │  - 인원: 2명                                     │  │
│   │                                                  │  │
│   │  추가로 확인 부탁드립니다:                        │  │
│   │  ✓ 휠체어로 진입 가능한 입구가 있나요?          │  │
│   │  ✓ 휠체어 배치가 가능한 테이블이 있나요?        │  │
│   │                                                  │  │
│   │  확인 후 연락 부탁드립니다. 감사합니다.          │  │
│   │                                                  │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
│              ┌────────────────────┐                      │
│              │   📋 복사하기      │                      │
│              └────────────────────┘                      │
│                                                          │
│   ─────────────────────────────────────────────────────  │
│                                                          │
│              ┌────────────────────┐                      │
│              │   🔄 새 예약 시작   │                      │
│              └────────────────────┘                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 6. Implementation Phases

### Phase 1: 기본 환경 설정 (11:00 ~ 11:15) — 15분

- [ ] Next.js 16 프로젝트 생성 (pnpm)
- [ ] TailwindCSS v4 설정
- [ ] 폴더 구조 생성
- [ ] Zustand store 기본 설정
- [ ] 환경변수 설정 (.env.local)

**Deliverable**: 프로젝트 기본 구조 + Vercel 첫 배포

### Phase 2: 핵심 UI 구현 (11:15 ~ 12:30) — 1시간 15분

- [ ] 접근성 UI 컴포넌트 (AccessibleButton, Card, Input)
- [ ] 3개 화면 레이아웃 (대화, 확인, 결과)
- [ ] 빠른 입력 버튼 UI
- [ ] 탭 네비게이션 (메시지/전화/요약)
- [ ] 반응형 스타일링

**Deliverable**: 완성된 UI (데이터 연동 전)

### Phase 3: OpenAI Realtime 연동 (12:30 ~ 14:00) — 1시간 30분

- [ ] Ephemeral Token 발급 API
- [ ] WebRTC 연결 로직
- [ ] 마이크 입력 → Realtime API
- [ ] Function Calling (tools) 설정
- [ ] 응답 → UI 연동

**Deliverable**: 음성 대화 + 예약 정보 수집 동작

### Phase 4: 결과 생성 + 통합 (14:00 ~ 15:00) — 1시간

- [ ] 확인 카드 데이터 연동
- [ ] 예약 메시지 생성 로직
- [ ] 전화 스크립트 단계별 표시
- [ ] 캘린더 URL 생성
- [ ] 전체 플로우 E2E 테스트

**Deliverable**: 전체 플로우 동작

### Phase 5: 마무리 + 데모 준비 (15:00 ~ 16:00) — 1시간

- [ ] 접근성 최종 점검 (스크린리더, 키보드)
- [ ] 에러 핸들링 강화
- [ ] 데모 시나리오 3개 준비
- [ ] 최종 Vercel 배포
- [ ] 발표 자료 준비

**Deliverable**: 배포된 데모 앱 + 발표 준비 완료

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 음성 인식 정확도 | > 90% | 테스트 문장 10개 |
| 전체 플로우 완료율 | 100% | 데모 시나리오 3개 |
| 접근성 점수 | > 90 | Lighthouse Accessibility |
| 첫 화면 로드 | < 2초 | Lighthouse Performance |
| WebRTC 연결 성공률 | > 95% | 테스트 10회 |

---

## 8. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Realtime API 불안정 | High | Medium | 텍스트 입력 fallback 구현 |
| WebRTC 브라우저 호환성 | Medium | Low | Chrome 기준, Safari 테스트 |
| 5시간 시간 부족 | High | Medium | Phase 4까지 최소 목표 |
| 마이크 권한 거부 | Medium | Low | 권한 안내 + 텍스트 대체 |

---

## 9. Demo Scenarios

### Scenario 1: 휠체어 사용자 예약 (핵심)

```
사용자: [마이크 버튼 누름]
사용자: "오늘 저녁 7시에 2명 예약하고 싶어요. 휠체어 이용자입니다."
AI: "네, 오늘 저녁 7시에 2명이시고, 휠체어 이용하시는군요.
     휠체어 진입 가능한 입구와 테이블이 필요하시죠?"
사용자: "네, 맞아요."
AI: "혹시 추가로 필요한 것이 있으신가요? 예를 들어 장애인 화장실이나 다른 요청사항이요."
사용자: "아니요, 그것만 확인해주세요."
AI: [확인 카드 표시] "그럼 정리해드릴게요. [카드 내용 읽기] 이 내용이 맞나요?"
사용자: [맞아요 버튼]
AI: [결과 화면] "예약 준비가 완료되었습니다! 메시지를 복사해서 식당에 보내시거나,
    전화하실 때 스크립트를 보면서 말씀하시면 됩니다."
```

### Scenario 2: 텍스트로 입력

```
사용자: [텍스트 입력] "내일 점심 12시 3명, 시각장애인 동행합니다"
AI: [음성 응답] "내일 점심 12시에 3명이시고, 시각장애인 분이 함께 하시는군요.
    점자 메뉴가 필요하신가요?"
... (이하 동일 흐름)
```

### Scenario 3: 전화 스크립트 사용

```
[결과 화면에서 "전화" 탭 선택]
화면: "안녕하세요, 예약 문의드립니다."
     [다음] 버튼
사용자: [다음 클릭]
화면: "오늘 저녁 7시에 2명 예약하고 싶은데요."
     [다음] 버튼
사용자: [상대방 응답 입력] "잠시만요, 확인해볼게요"
AI 제안: "네, 기다리겠습니다."
... (단계별 진행)
```

---

## 10. Open Questions

1. **음성 선택**: 남성/여성/중성 음성 선택이 필요한가?
2. **식당 검색**: 식당 이름 검색/추천 기능이 필요한가?
3. **이력 저장**: 이전 예약 정보 저장이 필요한가? (개인정보 이슈)

---

## 11. Appendix

### A. 접근성 체크리스트

- [ ] 색상 대비 4.5:1 이상 확인
- [ ] 모든 버튼 48x48px 이상
- [ ] 모든 이미지에 alt 텍스트
- [ ] 모든 폼 요소에 label 연결
- [ ] 키보드로 모든 기능 접근 가능
- [ ] 포커스 순서 논리적
- [ ] 스크린리더로 전체 플로우 테스트
- [ ] 움직이는 요소 prefers-reduced-motion 존중

### B. 참고 자료

- [OpenAI Realtime API - WebRTC](https://platform.openai.com/docs/guides/realtime-webrtc)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
