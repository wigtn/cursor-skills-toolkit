# Stone Buddy 해커톤 퀵 레퍼런스

## 아키텍처 한눈에

```
┌──────────────────────────────────────────┐
│            Expo App (FE-1)               │
│  ┌────────────────────────────────────┐  │
│  │         WebView (전체 화면)         │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │   Vite + React + R3F        │  │  │
│  │  │                              │  │  │
│  │  │   3D 씬 (FE-2)              │  │  │
│  │  │   - Robot(또봇) + Stone(돌돌이)│  │  │
│  │  │   - Background + Mailbox    │  │  │
│  │  │   - Items (환경/장식)        │  │  │
│  │  │                              │  │  │
│  │  │   App.tsx 로직 (AI-1)       │  │  │
│  │  │   - 또봇 AI 명령 해석        │  │  │
│  │  │   - 돌돌이 편지 생성 (LLM)   │  │  │
│  │  │   - 게임 상태 관리 (Zustand) │  │  │
│  │  └──────────────────────────────┘  │  │
│  │                                    │  │
│  │  ← injectJavaScript(postMessage)   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  [채팅 입력] [전송] [🎤 녹음]     │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

shared/ (AI-2): 타입, 메시지 규격, 상수, 아이템 카탈로그
```

## 핵심 게임 루프

```
1. 채팅 명령 → 또봇 AI 해석 → 10개 워크플로우 수행 → 돌돌이 감정 변화
2. 코인 적립 (1분/1코인) → 상점에서 아이템 구매 → "~해줘" 요청 → 적용
3. 음성으로 돌에게 말 걸기 → 대기(10초) → 우편함에 편지 도착
```

## 역할별 요약

### FE-1: Expo 네이티브 앱
- **폴더**: `app/`
- **핵심**: WebView + 채팅 입력 + 녹음 버튼 + Whisper STT
- **규칙**: `.cursor/rules/fe1-expo-native.mdc`
- **출력**: TEXT_INPUT, RECORDING_START, VOICE_RESULT → WebView에 전달

### FE-2: 3D 웹 씬
- **폴더**: `web/src/components/`, `web/public/`, CSS
- **핵심**: Robot(또봇 GLB), Stone(돌돌이 5감정), Background, Mailbox, Items
- **규칙**: `.cursor/rules/fe2-3d-web.mdc`
- **주의**: SkeletonUtils.clone, useGLTF.preload, fadeOut/fadeIn 전환

### AI-1: AI 연동 / 명령 해석 / 편지 생성
- **폴더**: `web/src/App.tsx`, hooks, stores, lib
- **핵심**: 또봇 GPT-4o-mini 명령 해석 (JSON), 돌돌이 편지 LLM 생성, Zustand 상태 관리
- **규칙**: `.cursor/rules/ai1-chat-state.mdc`
- **메시지**: ROBOT_RESPONSE, STONE_EMOTION_CHANGED, LETTER_READY

### AI-2: 타입 / 상점 / 코인 / 문서
- **폴더**: `shared/`, `docs/`, `.cursor/`
- **핵심**: 타입 정의, 아이템 카탈로그 (13종), 코인 시스템, 상점 UI
- **규칙**: `.cursor/rules/ai2-types-docs.mdc`
- **주의**: shared/ 변경 시 전원 합의

---

## 10개 워크플로우

| # | 워크플로우 | 명령 예시 | action | 돌돌이 반응 |
|---|-----------|-----------|--------|------------|
| 1 | 돌 닦아주기 | "돌돌이 닦아줘" | clean | happy |
| 2 | 잡초 뽑기 | "잡초 뽑아줘" | weed | calm |
| 3 | 물주기 | "나무에 물 줘" | water | happy |
| 4 | 꽃 심기 | "꽃 심어줘" | plant_flower | excited |
| 5 | 바닥 쓸기 | "바닥 쓸어줘" | sweep | calm |
| 6 | 상태 확인 | "돌돌이 어때?" | check_status | (유지) |
| 7 | 꾸미기 | "예쁘게 꾸며줘" | decorate | excited |
| 8 | 아이템 장착 | "모자 씌워줘" | equip_item | happy |
| 9 | 춤추기 | "춤 춰봐!" | dance | excited |
| 10 | 인사하기 | "안녕!" | wave | happy |

---

## 코인 경제 & 아이템

**코인**: 1분에 1코인 자동 적립 (앱 활성 시), 초기 10코인

| 카테고리 | 아이템 | 가격 |
|----------|--------|------|
| 환경 | 이끼(5), 색자갈(3), 작은 꽃(8), 버섯(10), 미니나무(15), 수정(20) |
| 도구 | 빗자루(12), 물뿌리개(10) |
| 장식 | 실크모자(15), 꽃왕관(12), 선글라스(8), 스카프(10), 파티모자(8) |

---

## Cursor AI 프롬프트 템플릿

### FE-1
```
나는 FE-1 (Expo 네이티브 담당)이야.
.cursorrules와 .cursor/rules/fe1-expo-native.mdc 규칙을 따라줘.
app/ 폴더만 수정해. web/, shared/ 절대 건드리지 마.

[요청 내용]
```

### FE-2
```
나는 FE-2 (3D 웹 씬 담당)이야.
.cursorrules와 .cursor/rules/fe2-3d-web.mdc 규칙을 따라줘.
web/src/components/와 CSS 파일만 수정해.
web/src/App.tsx는 AI-1 담당이니까 건드리지 마.

[요청 내용]
```

### AI-1
```
나는 AI-1 (AI/채팅/상태 담당)이야.
.cursorrules와 .cursor/rules/ai1-chat-state.mdc 규칙을 따라줘.
web/src/App.tsx와 hooks, stores, lib 폴더만 수정해.
web/src/components/는 FE-2 담당이니까 건드리지 마.

[요청 내용]
```

### AI-2
```
나는 AI-2 (타입/문서/통합 담당)이야.
.cursorrules와 .cursor/rules/ai2-types-docs.mdc 규칙을 따라줘.
shared/, docs/, .cursor/ 폴더만 수정해.

[요청 내용]
```

---

## 실행 방법

```bash
# 1) 웹 개발 서버
cd web && npm run dev
# → http://localhost:5173

# 2) Expo 앱
cd app && npx expo start
# → iOS: http://<내IP>:5173
# → Android: http://10.0.2.2:5173
```

## 타임라인 (6시간)

| 시간 | Phase | 핵심 작업 | 담당 |
|------|-------|-----------|------|
| **0:00~0:20** | Setup | 환경설정, GLB 검증, API 키 | 전원 |
| **0:20~2:00** | Phase 2 | FE-1: Expo+채팅 / FE-2: 3D씬+돌돌이 (병렬) | FE-1, FE-2 |
| **2:00~2:10** | 통합 체크 | WebView↔Native 통신 확인 | 전원 |
| **2:00~3:30** | Phase 3 | AI-1: 명령해석+편지 / AI-2: 코인+상점 (병렬) | AI-1, AI-2 |
| **3:30~4:30** | Phase 4 | 감정 시스템 + 편지 + 통합 | 전원 |
| **4:30~5:00** | Phase 5 | 폴리싱 + 버그 수정 | 전원 |
| **5:30~6:00** | 시연 | 빌드 + 발표 준비 | 전원 |

**4시간 이후**: 새 기능 추가 금지, 버그 수정과 폴리싱만!
**2:00 통합 체크**: WebView에 3D 씬 보이는지 반드시 확인!

---

## 주요 타입 정리

### StoneEmotion (돌돌이 감정)
```typescript
type StoneEmotion = 'calm' | 'happy' | 'sad' | 'excited' | 'sleepy';
```

| 감정 | 트리거 | 시각적 표현 |
|------|--------|------------|
| calm | 기본 / 물주기, 이끼 | 부드러운 호흡, 블루그레이 |
| happy | 닦기, 꽃 심기, 모자 | 통통 뛰기, 밝은 노랑 |
| sad | 3일 이상 미접속 | 축 처짐, 어두운 색상 |
| excited | 춤추기, 수정, 꾸미기 | 빠른 점프+회전, 코랄 |
| sleepy | 밤 시간 (22~06시) | 좌우 흔들림, 연보라 |

### RobotAction (또봇 액션 11개)
```typescript
type RobotAction = 'clean' | 'weed' | 'water' | 'plant_flower' | 'sweep'
  | 'check_status' | 'decorate' | 'equip_item' | 'dance' | 'wave' | 'idle';
```

### CommandIntent (명령 의도 6개)
```typescript
type CommandIntent = 'care' | 'decorate' | 'equip' | 'status' | 'special' | 'chat';
```

### CommandResult (AI 응답 형식)
```typescript
interface CommandResult {
  intent: CommandIntent;
  action: RobotAction | null;
  item: string | null;      // 아이템 ID
  response: string;          // 50자 이내
  stoneEmotionChange?: StoneEmotion | null;
}
```

---

## 긴급 상황 대응

| 상황 | 대응 |
|------|------|
| 파일 충돌 | 해당 파일 소유자가 해결, `git stash → pull --rebase → stash pop` |
| 인터페이스 변경 필요 | 슬랙 "shared 변경 요청: [내용]" → 전원 합의 |
| API 키 에러 | 더미 폴백으로 전환 (ROBOT_FALLBACK_RESPONSES) |
| 편지 생성 실패 | LETTER_FALLBACK_RESPONSES 사용 |
| 3D 안 보임 | GLB 경로 확인, useGLTF.preload 확인, Vite 서버 확인 |
| WebView 빈 화면 | WEB_URL IP 확인, 웹 서버 실행 확인 |
| AI가 남의 영역 수정 시도 | 프롬프트에 역할 + 폴더 다시 명시 |
| 돌돌이 감정 안 바뀜 | stoneEmotionChange 응답 확인, setStoneEmotion 호출 확인 |
| 코인 안 쌓임 | COIN_CONFIG.EARN_INTERVAL_MS 확인, 앱 활성 상태 확인 |

---

## Phase 1 사전 체크리스트

**반드시 Phase 2 시작 전에 완료!**

### GLB 모델 검증
```bash
# 1. 모델 파일 존재 확인
ls -la web/public/models/
# RobotExpressive.glb 있어야 함

# 2. 파일 크기 확인 (10MB 이하 권장)
du -h web/public/models/*.glb
```

### API 키 테스트
```bash
# OpenAI API 키 테스트
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $EXPO_PUBLIC_OPENAI_API_KEY" \
  | head -20
# 모델 목록이 나오면 성공
```

### WebGL 지원 확인
```
# 실제 디바이스(iPhone/Android)에서 테스트 필수
1. Safari/Chrome에서 https://webglreport.com 접속
2. WebGL 1.0, 2.0 지원 여부 확인
```

### Vite 서버 설정
```typescript
// vite.config.ts에 필수 설정
export default defineConfig({
  server: {
    host: '0.0.0.0',  // iOS WebView 접근용
    port: 5173,
  },
});
```

---

## 보안 체크리스트

| 항목 | 상태 | 담당 |
|------|------|------|
| .env 파일 .gitignore에 추가 | [ ] | AI-2 |
| API 키 환경변수만 사용 | [ ] | FE-1, AI-1 |
| originWhitelist 제한 | [ ] | FE-1 |
| 입력 검증 (STT/텍스트 결과) | [ ] | AI-1 |
| 에러 메시지 일반화 | [ ] | 전원 |

---

## 성능 목표

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 3D FPS | 30+ | Chrome DevTools |
| STT 응답 | 3초 이내 | console.time |
| AI 응답 | 5초 이내 | console.time |
| 초기 로딩 | 10초 이내 | Network 탭 |

---

## 통합 테스트 체크리스트

### Phase 2 완료 후 (2:00)
- [ ] Vite 서버 정상 실행 (http://localhost:5173)
- [ ] Expo 앱 정상 실행
- [ ] WebView에 3D 씬 렌더링 확인
- [ ] 로봇(또봇) 애니메이션 동작 확인
- [ ] 돌돌이 감정별 표현 확인
- [ ] 채팅 입력 → TEXT_INPUT 메시지 전달 확인
- [ ] 녹음 → STT 변환 확인
- [ ] 우편함 오브젝트 표시 확인

### Phase 3 완료 후 (3:30)
- [ ] 채팅 → 또봇 AI JSON 응답 → 애니메이션 동작
- [ ] 10개 워크플로우 중 5개+ 동작
- [ ] 코인 자동 적립 확인
- [ ] 상점 열기 → 아이템 구매 가능
- [ ] 구매 → "~해줘" → 적용 확인
- [ ] 음성 → 편지 대기 → 도착 확인

### Phase 4 완료 후 (4:30)
- [ ] 전체 플로우 (명령→수행→감정변화) 동작
- [ ] 편지 전체 플로우 동작
- [ ] 에러 시 폴백 동작 확인
- [ ] 앱 크래시 없음

### 발표 전 최종 (5:30)
- [ ] 3개 데모 시나리오 100% 성공
- [ ] 모든 폴백 정상 동작
- [ ] 시연 1회 리허설 완료
