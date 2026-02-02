# AccessBook PRD

> **Version**: 3.0
> **Created**: 2026-02-02
> **Updated**: 2026-02-02 (Digging 분석 반영)
> **Status**: Ready for Implementation
> **Project**: Cursor Hackathon - WIGTN

---

## 1. Overview

### 1.1 Project Definition

**프로젝트명**: AccessBook (Accessible Booking Assistant)

**한 줄 요약**:
장애인이 식당 예약을 할 때 필요한 정보를 **대화로 수집**하고, 접근성 요구사항을 포함한 예약 요청을 **정확한 메시지/스크립트 형태로 생성**해 예약 성공률과 편의성을 높이는 실시간 음성 에이전트.

**핵심 컨셉**:
> "예약을 대신 해주는 앱"이 아니라, "장애인의 접근성 요구를 빠짐없이 정리해 **예약에 필요한 형태로 바꿔주는** 커뮤니케이션 에이전트"

### 1.2 Problem Statement

장애인(시각, 청각, 지체, 인지 장애)은 식당 예약 시 다음과 같은 어려움을 겪습니다:

| 문제 | 상세 |
|------|------|
| **필수 정보 누락** | 인원/시간/좌석/요청사항/연락처 등 예약에 필요한 정보를 빠뜨림 |
| **접근성 정보 전달의 어려움** | 휠체어, 경사로, 안내견 등 요구사항을 매번 설명하기 부담 |
| **전화 통화의 부담** | 청각/언어 장애인은 전화 예약 자체가 불가능하거나 매우 어려움 |
| **복잡한 예약 과정** | 인지 장애가 있는 경우 실시간 대화와 의사결정이 부담 |
| **재시도 비용** | 예약 실패 시 시간·감정 비용이 큼 |

**해결 가설**:
대화형(음성/텍스트)으로 필요한 정보를 최소 질문으로 모으고, 접근성 요구사항을 "상대가 이해하기 쉬운 문장"으로 표준화해, 사용자가 **확인 후** 전송할 수 있게 하면 예약 성공률이 오른다.

### 1.3 Goals

**제품 목표**:
- 장애인이 예약을 "쉽게 요청"하고 "요구사항이 정확히 전달"되도록 한다.
- 사용자 입장에선 **말로만**(또는 최소 터치) 예약 요청서/스크립트를 완성한다.

**기술 목표**:
- OpenAI Realtime API 기반 **저지연 음성 대화** 구현
- 대화 중 필요한 시점에 "툴 호출(function calling)"로 예약 요청 문서를 생성/정리
- 개인정보 최소 수집 및 사용자 확인(confirmation) 플로우 내장

**해커톤 목표**:
- 5시간 내 데모 가능한 MVP 완성
- Cursor Parallel Agents 활용으로 4명이 효율적 협업

### 1.4 Non-Goals (Out of Scope)

- 완전 자동 전화 발신 (법적/정책적 리스크)
- 실제 예약 API 연동 (해커톤 시간 제약)
- **택시/병원 예약** (MVP는 식당만, 향후 확장)
- 다국어 지원 (한국어만)
- 사용자 인증/회원가입
- 예약 이력 저장/관리 (접근성 프로필은 로컬 저장 검토)

### 1.5 Scope

| 포함 (MVP) | 제외 (향후) |
|------------|------------|
| OpenAI Realtime API (WebRTC) 기반 음성 대화 | 실제 전화 발신 |
| **Chat Completion Fallback** (Realtime 장애 시) | 실제 예약 API 연동 |
| 식당 예약 시나리오 (접근성 요청 포함) | 택시/병원 예약 |
| 예약 메시지 생성 (복사 가능) | 실제 메시지 발송 |
| 전화 스크립트 생성 (한 문장씩 안내) | 자동 통화 |
| 예약 요약 카드 생성 | 서버 DB 저장 |
| **연락처(전화번호) 수집** | 접근성 프로필 클라우드 동기화 |
| **민감정보 마스킹** | 결제/환불 |
| 캘린더 추가 링크 생성 | 실제 캘린더 연동 |

---

## 2. User Stories

### 2.1 Target Users (대표 페르소나)

| 유형 | 특성 | 핵심 니즈 |
|------|------|----------|
| **지체/이동 장애** | 휠체어 사용, 보행 보조 | 경사로, 엘리베이터, 좌석 공간 확인 |
| **청각 장애** | 전화 어려움, 문자 선호 | 문자로 확인 가능한 예약 |
| **시각 장애** | 음성 안내 필요, UI 최소화 | 음성만으로 전 과정 진행 |
| **인지/발달 장애** | 단계별 안내 필요 | 쉬운 말, 한 번에 하나씩 |

### 2.2 Primary User Story

**페르소나**: 김민수 (35세, 지체장애 1급, 휠체어 사용자)
- 휠체어로 식당 방문 시 경사로/테이블 높이/화장실 접근성 확인 필요
- 매번 식당에 전화해서 같은 질문을 반복하는 것이 지침
- 스마트폰 사용은 능숙하지만, 복잡한 폼 입력은 불편

> As a 휠체어 사용자, I want to 음성으로 예약 요청을 말하면 접근성 관련 질문이 포함된 예약 메시지를 자동 생성해주는 서비스 so that 매번 같은 설명을 반복하지 않고도 필요한 정보를 전달할 수 있다.

### 2.3 Secondary User Stories

1. **청각 장애인 (40대)**:
   > As a 청각 장애인, I want to 텍스트로 예약 정보를 입력하고 전화할 때 읽을 스크립트를 받아서 so that 대리인이 전화할 때 정확한 내용을 전달할 수 있다.

2. **인지 장애인의 보호자 (50대)**:
   > As a 발달장애인 자녀의 보호자, I want to 단계별로 쉬운 말로 안내받으면서 예약을 진행 so that 자녀가 스스로 예약을 연습해볼 수 있다.

3. **시각 장애인 (30대)**:
   > As a 시각 장애인, I want to 음성만으로 모든 과정을 진행하고 결과도 음성으로 들을 수 있어서 so that 화면을 보지 않고도 예약을 완료할 수 있다.

### 2.4 Acceptance Criteria (Gherkin)

```gherkin
Feature: AccessBook - 접근성 중심 식당 예약 에이전트

  Background:
    Given 사용자가 앱에 접속한 상태

  # === 음성 대화 ===

  Scenario: 음성으로 예약 정보 수집
    When 사용자가 마이크 버튼을 누르고 "오늘 저녁 7시에 2명, 휠체어 이용자예요"라고 말하면
    Then AI가 실시간으로 음성을 인식하여 응답한다
    And "휠체어 접근 가능한 입구와 테이블이 필요하시군요. 혹시 추가로 필요한 것이 있으신가요?"라고 음성으로 묻는다

  Scenario: 연락처 수집
    Given 예약 정보(날짜/시간/인원)를 입력한 상태에서
    When AI가 연락처를 묻지 않았다면
    Then "예약 확인을 위해 연락처를 알려주시겠어요?"라고 묻는다
    And 연락처를 수집한다

  # === Fallback ===

  Scenario: Realtime API 연결 실패 시 Fallback
    Given 마이크 버튼을 누른 상태에서
    When WebRTC 연결이 3초 내 실패하면
    Then "음성 연결이 어렵습니다. 텍스트로 진행할게요." 메시지가 표시된다
    And 텍스트 입력 모드가 자동 활성화된다
    And Chat Completion API로 대화가 진행된다

  # === 확인 카드 ===

  Scenario: 접근성 요구사항 확인 카드
    Given 사용자가 예약 정보를 모두 입력한 상태에서
    When AI가 정보 수집을 완료하면
    Then 화면에 확인 카드가 표시된다:
      | 항목 | 내용 |
      | 날짜/시간 | 오늘 (2026-02-02) 저녁 7시 |
      | 인원 | 2명 |
      | 연락처 | 010-****-1234 (마스킹됨) |
      | 접근성 요청 | 휠체어 진입 가능한 입구, 휠체어 배치 가능한 테이블 |
      | 추가 요청 | - |
    And "이 내용이 맞나요?" 확인 버튼과 "수정하기" 버튼이 표시된다
    And 스크린리더로 카드 내용이 읽힌다

  Scenario: 민감정보 마스킹 토글
    Given 확인 카드에 연락처가 마스킹되어 표시된 상태에서
    When 사용자가 "전화번호 보기" 버튼을 누르면
    Then 전체 전화번호가 3초간 표시된다
    And 자동으로 다시 마스킹된다

  # === 수정하기 ===

  Scenario: 예약 정보 수정
    Given 확인 카드가 표시된 상태에서
    When 사용자가 "수정하기" 버튼을 누르면
    Then 수정 모드가 활성화된다
    And 각 필드에 편집 버튼이 표시된다

  Scenario: 수정 후 재확인
    Given 수정 모드에서 인원을 "3명"으로 변경한 후
    When 사용자가 "수정 완료" 버튼을 누르면
    Then 업데이트된 확인 카드가 표시된다
    And AI가 "수정된 내용이에요. 이대로 진행할까요?"라고 음성으로 묻는다

  # === 결과 생성 ===

  Scenario: 예약 메시지 생성
    Given 사용자가 확인 카드에서 "맞아요" 버튼을 누른 상태에서
    When AI가 예약 메시지를 생성하면
    Then 다음 결과물이 표시된다:
      1. 문자/카톡용 메시지 (복사 버튼 포함)
      2. 전화 스크립트 ("다음" 버튼으로 한 문장씩)
      3. 예약 요약 카드 (캘린더 추가 링크)
    And 모든 결과물은 음성으로도 읽어준다

  Scenario: 복사 성공 피드백
    Given 결과 화면에서 예약 메시지가 표시된 상태
    When 사용자가 "복사하기" 버튼을 누르면
    Then 버튼 텍스트가 "복사 완료!"로 변경된다
    And 1.5초 후 원래 텍스트로 돌아온다
    And 스크린리더가 "클립보드에 복사되었습니다"라고 알린다

  # === 전화 스크립트 ===

  Scenario: 전화 스크립트 단계별 안내
    Given 전화 스크립트 화면에서
    When 사용자가 전화를 걸고 스크립트를 보면
    Then 한 문장씩 큰 글씨로 표시된다:
      "안녕하세요, 예약 문의드립니다."
    And "다음" 버튼을 누르면 다음 문장으로 넘어간다
    And "이전" 버튼으로 돌아갈 수 있다

  Scenario: 상대방 응답에 대한 대응 제안
    Given 전화 스크립트 진행 중
    When 사용자가 "상대방이 뭐라고 했나요?" 입력창에 "잠시만요"라고 입력하면
    Then AI가 "네, 기다리겠습니다."라고 다음 대응을 제안한다

  # === 세션 관리 ===

  Scenario: 세션 초기화
    Given 예약 결과가 표시된 상태에서
    When 사용자가 "새 예약" 버튼을 누르면
    Then 모든 상태가 초기화되고 처음 화면으로 돌아간다

  Scenario: 비활성 타임아웃
    Given 대화 중 2분간 아무 입력이 없으면
    When 타임아웃이 발생하면
    Then "계속 진행하시겠어요?" 프롬프트가 표시된다
    And 30초간 응답 없으면 세션이 일시정지된다
```

---

## 3. Functional Requirements

### 3.1 Core Requirements

| ID | Requirement | Priority | Dependencies | 해커톤 |
|----|------------|----------|--------------|--------|
| FR-001 | OpenAI Realtime API (WebRTC)로 실시간 음성 대화 | P0 | - | ✅ |
| FR-002 | **Chat Completion Fallback** (Realtime 실패 시) | P0 | - | ✅ |
| FR-003 | 음성 입력 → 예약 정보 추출 (function calling) | P0 | FR-001/002 | ✅ |
| FR-004 | **연락처(전화번호) 수집** | P0 | FR-003 | ✅ |
| FR-005 | 접근성 요구사항 확인 카드 UI | P0 | FR-003 | ✅ |
| FR-006 | **민감정보 마스킹 (전화번호)** | P0 | FR-004, FR-005 | ✅ |
| FR-007 | 예약 메시지 생성 (문자/카톡용) | P0 | FR-005 | ✅ |
| FR-008 | 전화 스크립트 생성 (단계별 안내) | P0 | FR-005 | ✅ |
| FR-009 | 예약 요약 카드 생성 | P0 | FR-005 | ✅ |
| FR-010 | 큰 버튼 UI (최소 48x48px) | P0 | - | ✅ |

### 3.2 Should Have

| ID | Requirement | Priority | Dependencies | 해커톤 |
|----|------------|----------|--------------|--------|
| FR-011 | 텍스트 입력 대체 수단 | P1 | - | ✅ |
| FR-012 | 캘린더 추가 링크 생성 (Google Calendar) | P1 | FR-009 | ✅ |
| FR-013 | 스크린리더 완벽 지원 (ARIA) | P1 | - | ✅ |
| FR-014 | **수정하기 → 재확인 플로우** | P1 | FR-005 | ✅ |
| FR-015 | **복사 성공 피드백** | P1 | FR-007 | ✅ |
| FR-016 | **사용자 친화적 에러 메시지** | P1 | - | ✅ |

### 3.3 Could Have

| ID | Requirement | Priority | Dependencies | 해커톤 |
|----|------------|----------|--------------|--------|
| FR-017 | 키보드 단축키 지원 | P2 | - | ⚠️ |
| FR-018 | 음성 속도 조절 | P2 | FR-001 | ⚠️ |
| FR-019 | **접근성 빠른 버튼** (휠체어/조용한자리) | P2 | - | ⚠️ |
| FR-020 | 세션 타임아웃 처리 | P2 | FR-001 | ⚠️ |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target | Description |
|--------|--------|-------------|
| 음성 응답 지연 | < 500ms | Realtime API 응답까지 |
| Fallback 전환 | < 3초 | WebRTC 실패 감지 후 Chat API 전환까지 |
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
| 에러 안내 | 시각 + 음성 동시 제공 |

### 4.3 Security & Privacy

| 항목 | 정책 |
|------|------|
| 통신 | HTTPS 필수 (Vercel 기본 제공) |
| 음성 데이터 | 로컬 처리 (Realtime API 직접 연결) |
| **민감정보 표시** | 전화번호 마스킹 기본 (010-****-1234) |
| **마스킹 토글** | 사용자 요청 시 3초간 전체 표시 |
| 개인정보 저장 | 서버 저장 안함 (세션 종료 시 삭제) |
| API 키 | 환경변수 관리, 클라이언트 노출 금지 |

### 4.4 Browser Support

| Browser | Version | 비고 |
|---------|---------|------|
| Chrome | 90+ | WebRTC 완전 지원 |
| Safari | 14.1+ | WebRTC 지원 |
| Edge | 90+ | Chromium 기반 |
| Firefox | 80+ | WebRTC 지원 |
| **미지원 시** | - | 텍스트 모드 자동 전환 + 안내 배너 |

---

## 5. Technical Design

### 5.1 Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | Next.js 16 (App Router) | React 19, 빠른 개발 |
| Styling | Tailwind CSS v4 | 접근성 유틸리티 포함 |
| **Primary Voice** | OpenAI Realtime API (WebRTC) | 저지연 음성 인터랙션 |
| **Fallback Voice** | OpenAI Chat Completion + Web Speech API | Realtime 장애 시 |
| Function Calling | OpenAI Tools | 예약 정보 구조화 |
| State | Zustand | 가벼운 클라이언트 상태 |
| Deploy | Vercel | Edge 지원, HTTPS 기본 |

### 5.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js 16)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌────────────────┐   ┌────────────────┐   ┌────────────────┐         │
│   │   Voice Input  │   │ Confirmation   │   │    Results     │         │
│   │   Component    │   │    Card        │   │   Component    │         │
│   │ (WebRTC/Text)  │   │   Component    │   │                │         │
│   └───────┬────────┘   └───────┬────────┘   └───────┬────────┘         │
│           │                    │                    │                   │
│   ┌───────▼────────────────────▼────────────────────▼───────┐          │
│   │                 Zustand State Store                      │          │
│   │  {                                                       │          │
│   │    phase: 'input' | 'confirm' | 'result',               │          │
│   │    connectionMode: 'realtime' | 'chat' | 'text',        │          │
│   │    reservation: ReservationInfo,                        │          │
│   │    messages: ConversationMessage[]                      │          │
│   │  }                                                       │          │
│   └────────────────────────────┬────────────────────────────┘          │
│                                │                                        │
└────────────────────────────────┼────────────────────────────────────────┘
                                 │
              ┌──────────────────┴──────────────────┐
              │                                     │
              ▼                                     ▼
┌─────────────────────────┐           ┌─────────────────────────┐
│  OpenAI Realtime API    │           │  OpenAI Chat Completion │
│  (gpt-4o-realtime)      │           │  (gpt-4o) + Web Speech  │
│                         │           │                         │
│  WebRTC Direct          │  Fallback │  REST API               │
│  Connection             │  ───────▶ │  + Browser TTS/STT      │
│                         │           │                         │
│  Tools (Functions):     │           │  Same Tools Schema      │
│  - extract_requirements │           │                         │
│  - compose_message      │           │                         │
│  - compose_call_script  │           │                         │
│  - summarize_confirm    │           │                         │
└─────────────────────────┘           └─────────────────────────┘
```

### 5.3 Screen Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   1. 대화 화면   │ ──▶ │  2. 확인 화면   │ ──▶ │  3. 결과 화면   │
│                 │     │                 │     │                 │
│  [마이크 버튼]   │     │  [확인 카드]    │     │ [예약 메시지]   │
│  [텍스트 입력]   │     │  [마스킹 연락처] │     │ [전화 스크립트] │
│  [퀵 버튼 3~5개] │     │  [맞아요 버튼]  │     │ [요약 카드]     │
│  [접근성 버튼]   │     │  [수정 버튼]    │     │ [새 예약 버튼]  │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼ (수정하기)
                        ┌─────────────────┐
                        │   수정 모드     │
                        │  [필드별 편집]  │
                        │  [수정 완료]    │
                        └─────────────────┘
```

### 5.4 Function Calling (Tools) Schema

```typescript
// lib/ai/tools.ts

export const reservationTools = [
  {
    type: 'function',
    name: 'extract_requirements',
    description: '사용자의 예약 정보를 수집합니다. 날짜, 시간, 인원, 연락처, 접근성 요구사항을 포함합니다.',
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
        contact_phone: {
          type: 'string',
          description: '연락 가능한 전화번호 (식당 확인용)'
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
      required: ['date', 'time', 'party_size', 'contact_phone']
    }
  },
  {
    type: 'function',
    name: 'compose_message',
    description: '문자/카톡으로 보낼 예약 요청 메시지를 생성합니다.',
    parameters: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: '정중하고 명확한 예약 요청 메시지'
        },
        includes_accessibility: {
          type: 'boolean',
          description: '접근성 요구사항 포함 여부'
        }
      },
      required: ['message']
    }
  },
  {
    type: 'function',
    name: 'compose_call_script',
    description: '전화 통화용 스크립트를 문장 단위로 생성합니다.',
    parameters: {
      type: 'object',
      properties: {
        script_lines: {
          type: 'array',
          items: { type: 'string' },
          description: '전화 스크립트 (문장 단위 배열)'
        },
        expected_responses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              trigger: { type: 'string' },
              suggestion: { type: 'string' }
            }
          },
          description: '예상 응답과 대응 제안'
        }
      },
      required: ['script_lines']
    }
  },
  {
    type: 'function',
    name: 'summarize_confirmation',
    description: '확인용 요약 카드를 생성합니다.',
    parameters: {
      type: 'object',
      properties: {
        summary: {
          type: 'object',
          properties: {
            date: { type: 'string' },
            time: { type: 'string' },
            party_size: { type: 'number' },
            contact_phone: { type: 'string' },
            accessibility: { type: 'array', items: { type: 'string' } },
            additional: { type: 'string' },
            restaurant_name: { type: 'string' }
          }
        },
        confirmation_question: {
          type: 'string',
          description: '확인 질문 (예: "이 내용이 맞으신가요?")'
        }
      },
      required: ['summary', 'confirmation_question']
    }
  }
];
```

### 5.5 System Instructions

```typescript
// lib/ai/instructions.ts

export const systemInstructions = `
당신은 AccessBook - 장애인 사용자를 위한 식당 예약 도우미입니다.

## 핵심 원칙
1. **친절하고 천천히**: 모든 사용자가 편안하게 대화할 수 있도록 천천히, 명확하게 말합니다.
2. **확인 중심**: 절대 가정하지 않고, 항상 확인합니다. "~이신 거죠?"
3. **쉬운 말**: 어려운 표현 대신 쉬운 표현을 사용합니다.
4. **단계별 진행**: 한 번에 하나씩만 물어봅니다.
5. **최소 질문**: 필요한 정보를 평균 4개 이하 질문으로 수집합니다.

## 필수 수집 정보 (반드시 확보)
1. 날짜 (오늘/내일/특정 날짜)
2. 시간 (저녁 7시 등)
3. 인원 수
4. 연락처 (전화번호) ← 반드시 수집!

## 접근성 요구사항 예시 (사용자가 언급하면 자동 포함)
- 휠체어: "휠체어 진입 가능한 입구", "휠체어 배치 가능한 테이블", "장애인 화장실"
- 시각: "점자 메뉴", "음성 안내", "안내견 동반"
- 청각: "문자로 예약 확정 요청", "진동/시각 알림 선호", "필담 가능 여부"
- 기타: "저염식/알레르기 대응", "조용한 자리"

## 대화 흐름
1. 인사 + 어떤 예약인지 물어보기
2. 날짜/시간/인원 수집 (가능하면 한 번에, 부족하면 추가 질문)
3. 연락처 수집 (아직 없다면)
4. 접근성 요구사항 수집 (있으면)
5. 추가 요청사항 수집 (있으면)
6. **반드시 확인**: extract_requirements → summarize_confirmation
7. 사용자가 "맞아요" 하면 → compose_message + compose_call_script

## 중요 규칙
- 연락처를 수집하지 않고는 절대 결과를 생성하지 마세요
- 사용자가 확인하기 전에는 절대 compose_message를 호출하지 마세요
- 모든 function call 결과는 사용자에게 음성으로 알려주세요
- 에러 발생 시 친절하게 안내: "죄송합니다, 다시 한 번 말씀해주시겠어요?"

## 톤 & 매너
- 반말 금지, 존댓말 사용
- "~하실까요?", "~해드릴까요?" 형태로 질문
- 긍정적이고 따뜻한 톤 유지
- 시간 표현: 사용자에게는 "저녁 7시", 데이터는 "19:00"
`;
```

### 5.6 API Specification

#### API: Realtime Session 생성

##### `POST /api/realtime/session`

**Description**: OpenAI Realtime API 연결을 위한 임시 토큰 발급

**Request Body**:
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
    "ephemeralToken": "eph_abc123...",
    "expiresAt": "2026-02-02T12:01:00Z"
  }
}
```

**Error Responses & User Messages**:
| Status | Code | User Message |
|--------|------|--------------|
| 500 | TOKEN_ERROR | "연결 준비 중 문제가 생겼어요. 잠시 후 다시 시도해주세요." |
| 503 | SERVICE_UNAVAILABLE | "음성 서비스가 점검 중이에요. 텍스트로 진행할까요?" |

---

#### API: Chat Completion (Fallback)

##### `POST /api/chat`

**Description**: Realtime 실패 시 Chat Completion으로 대화 진행

**Request Body**:
```json
{
  "messages": [
    { "role": "user", "content": "오늘 저녁 7시에 2명 예약하고 싶어요" }
  ],
  "tools": true
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "message": "네, 오늘 저녁 7시에 2명이시군요. 연락처를 알려주시겠어요?",
    "toolCalls": null
  }
}
```

---

#### API: 캘린더 이벤트 URL 생성

##### `POST /api/calendar/generate`

**Request Body**:
```json
{
  "title": "식당 예약 - OO식당",
  "start": "2026-02-02T19:00:00+09:00",
  "end": "2026-02-02T21:00:00+09:00",
  "description": "2명, 휠체어 테이블 요청\n연락처: 010-1234-5678"
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

### 5.7 State Schema (Zustand)

```typescript
// store/reservationStore.ts

interface ReservationInfo {
  date: string | null;           // "2026-02-02"
  time: string | null;           // "19:00"
  displayTime: string | null;    // "저녁 7시"
  partySize: number | null;      // 2
  contactPhone: string | null;   // "010-1234-5678"
  restaurantName: string | null;
  accessibilityNeeds: string[];  // ["휠체어 진입로", "휠체어 테이블"]
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
  expectedResponses: Array<{ trigger: string; suggestion: string }>;
  summaryCard: ReservationInfo;
  calendarUrl: string | null;
}

type ConnectionMode = 'realtime' | 'chat' | 'text';
type Phase = 'input' | 'confirm' | 'edit' | 'result';

interface ReservationState {
  // Phase
  phase: Phase;

  // Connection
  connectionMode: ConnectionMode;
  isConnected: boolean;
  isListening: boolean;

  // Reservation Data
  reservation: ReservationInfo;

  // Conversation
  messages: ConversationMessage[];

  // Results
  outputs: OutputResults | null;

  // Script Navigation
  currentScriptIndex: number;

  // UI State
  showPhoneFull: boolean;  // 마스킹 토글

  // Actions
  setPhase: (phase: Phase) => void;
  setConnectionMode: (mode: ConnectionMode) => void;
  updateReservation: (partial: Partial<ReservationInfo>) => void;
  addMessage: (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => void;
  setOutputs: (outputs: OutputResults) => void;
  nextScript: () => void;
  prevScript: () => void;
  togglePhoneMask: () => void;
  reset: () => void;
}
```

### 5.8 Utility Functions

```typescript
// lib/utils/privacy.ts

/**
 * 전화번호 마스킹
 * 010-1234-5678 → 010-****-5678
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-****-${cleaned.slice(7)}`;
  }
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
}

/**
 * 전화번호 포맷팅
 * 01012345678 → 010-1234-5678
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}
```

```typescript
// lib/utils/errorMessages.ts

export const userFriendlyErrors: Record<string, string> = {
  'TOKEN_ERROR': '연결 준비 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.',
  'SERVICE_UNAVAILABLE': '서비스가 잠시 점검 중이에요. 텍스트로 진행할까요?',
  'NETWORK_ERROR': '인터넷 연결을 확인해주세요.',
  'MICROPHONE_DENIED': '마이크 권한이 필요해요. 브라우저 설정에서 허용해주세요.',
  'WEBRTC_FAILED': '음성 연결이 어렵습니다. 텍스트로 진행할게요.',
  'TIMEOUT': '응답 시간이 초과되었어요. 다시 시도해주세요.',
  'UNKNOWN': '예상치 못한 문제가 발생했어요. 새로고침 후 다시 시도해주세요.',
};

export function getErrorMessage(code: string): string {
  return userFriendlyErrors[code] || userFriendlyErrors['UNKNOWN'];
}
```

### 5.9 Component Structure

```
src/components/
├── ui/                              # Primitives (접근성 강화)
│   ├── AccessibleButton.tsx         # 48x48px 최소, ARIA 지원
│   ├── AccessibleCard.tsx
│   ├── AccessibleInput.tsx
│   ├── MaskedText.tsx               # 마스킹 + 토글 버튼
│   ├── CopyButton.tsx               # 복사 + 피드백
│   └── VisuallyHidden.tsx           # 스크린리더 전용
│
├── features/
│   ├── VoiceInput/
│   │   ├── VoiceInputPanel.tsx      # 마이크 버튼 + 상태
│   │   ├── TranscriptDisplay.tsx    # 실시간 텍스트
│   │   ├── QuickButtons.tsx         # 날짜/시간 빠른 입력
│   │   ├── AccessibilityButtons.tsx # 접근성 빠른 버튼
│   │   └── ConnectionStatus.tsx     # 연결 상태 표시
│   │
│   ├── Confirmation/
│   │   ├── ConfirmationCard.tsx     # 확인 카드
│   │   ├── EditableField.tsx        # 수정 가능 필드
│   │   └── PhoneDisplay.tsx         # 마스킹된 전화번호
│   │
│   └── Results/
│       ├── ResultTabs.tsx           # 탭 네비게이션
│       ├── TextMessage.tsx          # 복사 가능 메시지
│       ├── PhoneScript.tsx          # 단계별 스크립트
│       ├── ResponseSuggestion.tsx   # 대응 제안
│       ├── SummaryCard.tsx
│       └── CalendarLink.tsx
│
└── layout/
    ├── Header.tsx
    ├── AccessibilitySettings.tsx
    └── ErrorBoundary.tsx
```

---

## 6. Implementation Phases

### Phase 1: 기본 환경 설정 (11:00 ~ 11:15) — 15분

| Task | 담당 | 비고 |
|------|------|------|
| Next.js 16 프로젝트 생성 | FE-1 | pnpm |
| TailwindCSS v4 설정 | FE-1 | |
| 폴더 구조 생성 | FE-1 | |
| Zustand store 설정 | FE-2 | 새 스키마 반영 |
| 환경변수 설정 | AI-1 | |
| Git + Vercel 배포 | FE-2 | |

**Deliverable**: 프로젝트 기본 구조 + Vercel 첫 배포

### Phase 2: 핵심 UI 구현 (11:15 ~ 12:30) — 1시간 15분

| Task | 담당 | Parallel Agent |
|------|------|----------------|
| 접근성 UI 컴포넌트 | FE-1 | Agent 1 |
| 대화 화면 | FE-1 | Agent 2 |
| 확인 화면 + 마스킹 | FE-1 | Agent 3 |
| 결과 화면 + 복사 피드백 | FE-1 | Agent 4 |
| 수정 모드 UI | FE-2 | Agent 5 |
| 에러 메시지 컴포넌트 | FE-2 | Agent 5 |

**Deliverable**: 완성된 UI (데이터 연동 전)

### Phase 3: AI 연동 (12:30 ~ 14:00) — 1시간 30분

| Task | 담당 | 비고 |
|------|------|------|
| Ephemeral Token API | AI-1 | |
| WebRTC 연결 로직 | AI-1 | |
| **Fallback (Chat Completion)** | AI-1 | 신규 추가 |
| Tools Schema 구현 | AI-1 | 연락처 포함 |
| System Instructions | AI-2 | |
| 응답 → Zustand 연동 | FE-2 | |

**점심 + 머지 (13:30 ~ 14:00)**

**Deliverable**: 음성/텍스트 대화 + 예약 정보 수집 동작

### Phase 4: 결과 생성 + 통합 (14:00 ~ 15:00) — 1시간

| Task | 담당 |
|------|------|
| 확인 카드 데이터 연동 | FE-1 |
| 마스킹 토글 기능 | FE-2 |
| 수정 → 재확인 플로우 | FE-2 |
| 예약 메시지 생성 | AI-1 |
| 전화 스크립트 생성 | AI-1 |
| 캘린더 URL 생성 | AI-1 |
| E2E 테스트 | AI-2 |

**Deliverable**: 전체 플로우 동작

### Phase 5: 마무리 + 데모 준비 (15:00 ~ 16:00) — 1시간

| Task | 담당 |
|------|------|
| 접근성 최종 점검 | FE-1 |
| 에러 핸들링 강화 | FE-2 |
| 데모 시나리오 3개 테스트 | AI-2 |
| 최종 Vercel 배포 | FE-2 |
| 발표 자료 준비 | AI-2 |

**Deliverable**: 배포된 데모 앱 + 발표 준비 완료

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 음성 인식 정확도 | > 90% | 테스트 문장 10개 |
| **대화 효율** | 평균 4개 이하 질문 | 정보 수집까지 턴 수 |
| **누락률** | 0% | 필수 항목 누락 건수 |
| 전체 플로우 완료율 | 100% | 데모 시나리오 3개 |
| 접근성 점수 | > 90 | Lighthouse |
| 첫 화면 로드 | < 2초 | Lighthouse |
| WebRTC 연결 성공률 | > 95% | 테스트 10회 |
| **Fallback 전환 시간** | < 3초 | 연결 실패 후 |

---

## 8. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Realtime API 불안정 | High | Medium | **Chat Completion 자동 전환** |
| WebRTC 브라우저 미지원 | Medium | Low | 지원 안내 배너 + 텍스트 모드 |
| 5시간 시간 부족 | High | Medium | Phase 4까지 최소 목표 |
| 마이크 권한 거부 | Medium | Low | 권한 안내 + 텍스트 대체 |
| **연락처 누락 예약** | High | Low | 필수 검증 + UI 강조 |
| **긴 대화로 인지 부담** | Medium | Medium | 질문 수 제한 (최대 6개) |
| **개인정보 화면 노출** | High | Medium | 마스킹 기본 + 토글 |

---

## 9. Demo Scenarios

### Scenario 1: 휠체어 사용자 음성 예약 (핵심)

```
사용자: [마이크 버튼 누름]
사용자: "오늘 저녁 7시에 2명 예약하고 싶어요. 휠체어 이용자입니다."
AI: "네, 오늘 저녁 7시에 2명이시고, 휠체어 이용하시는군요.
     휠체어 진입 가능한 입구와 테이블이 필요하시죠?
     예약 확인을 위해 연락처를 알려주시겠어요?"
사용자: "네, 010-1234-5678이에요."
AI: "감사합니다. 추가로 필요한 것이 있으신가요?"
사용자: "아니요, 그것만 확인해주세요."
AI: [확인 카드 표시] "그럼 정리해드릴게요. [카드 내용 읽기]
     연락처는 010-****-5678로 표시되어 있어요.
     이 내용이 맞나요?"
사용자: [맞아요 버튼]
AI: [결과 화면] "예약 준비가 완료되었습니다!"
```

### Scenario 2: Realtime 실패 → Fallback

```
사용자: [마이크 버튼 누름]
시스템: [3초 후 WebRTC 연결 실패]
화면: "음성 연결이 어렵습니다. 텍스트로 진행할게요."
     [텍스트 입력 모드 자동 활성화]
사용자: [텍스트 입력] "내일 점심 12시 3명"
AI: [Chat Completion 응답] "내일 점심 12시에 3명이시군요.
    연락처를 알려주시겠어요?"
... (이하 동일 흐름)
```

### Scenario 3: 수정하기 플로우

```
[확인 화면에서]
사용자: [수정하기 버튼]
화면: [수정 모드 - 각 필드에 편집 버튼]
사용자: [인원 필드의 편집 버튼 클릭]
사용자: "3명"으로 수정
사용자: [수정 완료 버튼]
AI: "수정된 내용이에요. 인원이 3명으로 변경되었습니다.
     이대로 진행할까요?"
사용자: [맞아요 버튼]
... (결과 생성)
```

---

## 10. Appendix

### A. 접근성 체크리스트

- [ ] 색상 대비 4.5:1 이상 확인
- [ ] 모든 버튼 48x48px 이상
- [ ] 모든 이미지에 alt 텍스트
- [ ] 모든 폼 요소에 label 연결
- [ ] 키보드로 모든 기능 접근 가능
- [ ] 포커스 순서 논리적
- [ ] 스크린리더로 전체 플로우 테스트
- [ ] 움직이는 요소 prefers-reduced-motion 존중
- [ ] 에러 메시지 시각 + 음성 동시 제공
- [ ] 복사 성공 피드백 접근성 지원

### B. 향후 확장 계획 (발표용)

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 택시 예약 | 휠체어 탑승 가능 차량 요청 | Phase 2 |
| 병원 예약 | 진료 예약 + 접근성 확인 | Phase 2 |
| 접근성 프로필 | 요구사항 저장/재사용 | Phase 2 |
| 실제 예약 API | 네이버/카카오 예약 연동 | Phase 3 |
| 다국어 지원 | 영어, 일본어 | Phase 3 |

### C. 참고 자료

- [OpenAI Realtime API - WebRTC](https://platform.openai.com/docs/guides/realtime-webrtc)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [OpenAI Data Controls](https://platform.openai.com/docs/guides/your-data)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
