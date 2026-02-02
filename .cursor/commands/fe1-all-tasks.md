# FE-1: 전체 작업 (3D 리드)

**담당자**: FE-1
**핵심 역할**: 3D 테라리움 씬, 아이템, 애니메이션

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

---

## Phase 1 (11:00~11:20) - 환경 설정

**전원 함께 진행**

FE-1 담당:
- [ ] 3D 패키지 설치 확인
```bash
npx expo install expo-gl expo-three three
```
- [ ] expo-three 기본 예제 테스트

---

## Phase 2 (11:20~12:40) - 3D 테라리움 ⭐ 메인

### 2-1. 메인 씬
`components/Terrarium/TerrariumScene.tsx`
- GLView + expo-three 사용
- 자동 회전 카메라 (0.005 rad/frame)
- items props로 보유 아이템 ID 배열 받기
- 조명: AmbientLight(0.6) + DirectionalLight(0.8)

### 2-2. 기본 오브젝트
`components/Terrarium/GlassJar.tsx`
- 투명 유리병 (SphereGeometry)
- MeshPhysicalMaterial: opacity 0.3, transmission 0.9

`components/Terrarium/Soil.tsx`
- 갈색 흙 (CylinderGeometry)
- 색상: #8B4513

### 2-3. 아이템 4종 (`components/Terrarium/items/`)

| 파일 | 형태 | 색상 |
|------|------|------|
| `Moss.tsx` | 초록 구체 클러스터 (7개) | #228B22 |
| `Mushroom.tsx` | 빨간 반구 + 흰 원기둥 | #FF6B6B |
| `Succulent.tsx` | 로제트 형태 | #90EE90 |
| `Pebbles.tsx` | 회색 구체 클러스터 (5개) | #A0A0A0 |

### 2-4. 2D 폴백
`components/Terrarium/Terrarium2DFallback.tsx`
- GL 미지원 시 이모지로 표시

### Phase 2 완료 기준
- [ ] 3D 테라리움 자동 회전
- [ ] 유리병 + 흙 렌더링
- [ ] 아이템 4종 렌더링
- [ ] items props로 표시/숨김

### Phase 2 커밋
```bash
git checkout -b feature/fe1-terrarium
git add components/Terrarium/
git commit -m "feat(fe1): implement 3D terrarium scene and items"
git push origin feature/fe1-terrarium
```

---

## Phase 3 (12:40~14:00) - Chat UI 보조

**main 머지 후 시작**: `git checkout main && git pull`

### 3-1. 채팅 UI 스타일링 보조
AI-1이 만든 `components/Chat/` 컴포넌트 스타일 개선:
- ChatMessage 말풍선 디자인
- 타이핑 인디케이터 애니메이션

### 3-2. 터치 인터랙션 개선
`components/Terrarium/TerrariumScene.tsx` 업데이트:
- 터치로 회전 조작 (PanResponder)
- 핀치 줌 (선택)

### Phase 3 커밋
```bash
git add components/Chat/ components/Terrarium/
git commit -m "feat(fe1): enhance chat UI and touch interaction"
```

---

## Phase 4 (14:00~15:00) - 애니메이션

**main 머지 후 시작**: `git checkout main && git pull`

### 4-1. 코인 애니메이션
`components/UI/CoinCounter.tsx` 업데이트:
- 코인 추가 시 bounce 효과 (Reanimated)
- +1 텍스트 fade up

### 4-2. 아이템 구매 애니메이션
- 구매 시 아이템 scale 0→1 애니메이션
- 테라리움에 추가되는 효과

### 4-3. 햅틱 피드백
```typescript
import * as Haptics from 'expo-haptics';
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
```

### Phase 4 커밋
```bash
git add components/UI/ components/Terrarium/
git commit -m "feat(fe1): add animations and haptic feedback"
```

---

## Phase 5 (15:00~15:30) - 테스트 지원

- [ ] 3D 렌더링 테스트 (다양한 디바이스)
- [ ] 2D 폴백 동작 확인
- [ ] 터치 인터랙션 확인
- [ ] 애니메이션 버그 수정

---

## 규칙
- `.cursor/rules/expo-three-mobile.mdc` 참고
- drei 패키지 사용 금지
- segment 수 16-32로 제한
- 100+ 폴리곤 메시 금지

## 최종 커밋
```bash
git checkout main && git pull
git add -A
git commit -m "feat(fe1): finalize 3D terrarium and animations"
git push origin main
```
