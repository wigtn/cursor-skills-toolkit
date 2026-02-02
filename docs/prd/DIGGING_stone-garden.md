# PRD Analysis Report: Stone Garden (3D Edition)

## 분석 대상
- **문서**: `docs/prd/PRD_stone-garden.md`
- **버전**: 2.0 (3D Edition)
- **분석일**: 2026-02-02

---

## 요약

| 카테고리 | 발견 | Critical | Major | Minor |
|----------|------|----------|-------|-------|
| 완전성 | 6 | 2 | 3 | 1 |
| 실현가능성 | 5 | 2 | 2 | 1 |
| 보안/리스크 | 2 | 0 | 2 | 0 |
| 일관성 | 3 | 0 | 1 | 2 |
| **총계** | **16** | **4** | **8** | **4** |

---

## 상세 분석

### 🔴 Critical (즉시 수정 필요)

#### C-1. 3D로 인한 시간 초과 리스크
- **위치**: Section 7 - Implementation Phases
- **문제**: 5시간 해커톤에서 3D 구현은 **매우 도전적**
  - Phase 2가 기존 1h15m → 1h30m으로 15분 증가
  - 실제로는 R3F 디버깅, 조명 조정 등으로 **추가 30분~1시간** 소요 예상
  - 전체 시간 초과 확률 **높음**
- **영향**: 데모 실패, 핵심 기능 미완성
- **개선안**:
  ```markdown
  ### 시간 버퍼 전략

  | 원래 계획 | 보수적 계획 | 차이 |
  |-----------|-------------|------|
  | Phase 2: 1h30m | Phase 2: 2h | +30m |
  | Phase 4: 45m | Phase 4: 30m | -15m |
  | 개미 이벤트 | **제외** | P1→P2 |

  **권장**: 개미 이벤트를 P2로 강등, 3D 씬에 시간 투자
  ```

#### C-2. 2D 폴백 컴포넌트 미정의
- **위치**: Section 10 - Risk & Mitigation
- **문제**: "2D 이미지 돌로 폴백"이라고 했지만 **구체적인 폴백 컴포넌트가 없음**
- **영향**: WebGL 실패 시 아무것도 표시 안 됨
- **개선안**:
  ```typescript
  // components/Stone/Stone2DFallback.tsx
  export function Stone2DFallback({ decorations }: { decorations: string[] }) {
    return (
      <div className="relative w-64 h-64 mx-auto">
        <img src="/stone.png" alt="돌" className="w-full h-full object-contain" />
        {decorations.map(id => (
          <span key={id} className="absolute" style={ITEM_POSITIONS[id]}>
            {ITEMS.find(i => i.id === id)?.emoji}
          </span>
        ))}
      </div>
    );
  }
  ```

  ```typescript
  // 메인 페이지에서 조건부 렌더링
  {isWebGLSupported() ? <StoneScene /> : <Stone2DFallback />}
  ```

#### C-3. NFR 성능 목표 비현실적
- **위치**: Section 4.1 - Performance
- **문제**: "초기 로딩 < 2초"는 3D 씬 로딩 시 **달성 불가능**
  - Three.js 번들: ~500KB (gzip)
  - 환경맵 (Environment preset): ~200KB
  - 총 로딩: 3-5초 예상 (느린 네트워크)
- **영향**: 성능 목표 미달성, 사용자 이탈
- **개선안**:
  ```markdown
  ### 4.1 Performance (수정)

  | 항목 | 목표 | 비고 |
  |------|------|------|
  | 초기 로딩 | < **4초** | 3D 씬 포함 |
  | 3D 씬 로딩 | < **3초** | lazy loading 적용 |
  | 인터랙션 응답 | < 100ms | 60fps 유지 |

  ### 로딩 최적화 전략
  - `dynamic import`로 Canvas lazy loading
  - `<Suspense>`로 로딩 스피너 표시
  - Environment preset 경량화 (sunset → studio)
  ```

#### C-4. Next.js SSR + R3F 충돌 미해결
- **위치**: Section 5.5 - StoneScene.tsx
- **문제**: R3F Canvas는 **클라이언트 전용**인데 SSR 처리 방법이 없음
- **영향**: 빌드 에러 또는 hydration mismatch
- **개선안**:
  ```typescript
  // app/page.tsx
  import dynamic from 'next/dynamic';

  const StoneScene = dynamic(
    () => import('@/components/Scene/StoneScene'),
    {
      ssr: false,
      loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse" />
    }
  );
  ```

---

### 🟡 Major (구현 전 수정 권장)

#### M-1. Item Data가 2D 좌표 사용
- **위치**: Section 5.4 - Item Data
- **문제**: `position: { top: '60%', left: '30%' }`는 2D용
- **영향**: 3D 데코레이션 위치 지정 불가
- **개선안**:
  ```typescript
  export const ITEMS = [
    {
      id: 'moss',
      name: '이끼',
      price: 10,
      // 3D 좌표 추가
      position3D: { x: 0.5, y: 0.8, z: 0.3 },
      // 2D 폴백용 좌표 유지
      position2D: { top: '60%', left: '30%' },
      emoji: '🌿',
    },
    // ...
  ] as const;
  ```

#### M-2. Team Assignment에 3D 전문성 부재
- **위치**: Section 12 - Team Assignment
- **문제**: 누가 3D(R3F)를 담당하는지 불명확
- **영향**: 3D 작업이 병목
- **개선안**:
  ```markdown
  | 역할 | 담당자 | Phase 집중 | 기술 |
  |------|--------|------------|------|
  | **FE-1** | 3D 씬 + UI | Phase 2, 4 | **R3F, Three.js** |
  | **FE-2** | 상태 관리, 게임 로직 | Phase 2, 3 | Zustand |
  | **AI-1** | **3D 데코레이션** | Phase 3, 4 | R3F |
  | **AI-2** | QA, 발표 준비 | Phase 4, 5 | - |

  **사전 준비**: FE-1, AI-1은 R3F 기본 튜토리얼 숙지
  ```

#### M-3. 3D 데코레이션 구현 상세 부족
- **위치**: Section 5.5 - Moss3D.tsx
- **문제**: 이끼만 간단히 정의, 꽃/나비/버섯/자갈 구현 방법 없음
- **영향**: Phase 3에서 즉흥적 구현 → 시간 낭비
- **개선안**:
  ```typescript
  // 3D 데코레이션 구현 가이드

  | 아이템 | 3D 구현 | 복잡도 |
  |--------|---------|--------|
  | 이끼 | 여러 작은 구체 클러스터 | ⭐ |
  | 꽃 | cone(꽃잎) + cylinder(줄기) | ⭐⭐ |
  | 나비 | 애니메이션 plane (날개 펄럭) | ⭐⭐⭐ |
  | 버섯 | sphere(갓) + cylinder(기둥) | ⭐ |
  | 자갈 | 여러 작은 구체/박스 | ⭐ |

  **MVP 권장**: 이끼, 버섯, 자갈 (복잡도 ⭐)
  **나비, 꽃은 P2로 강등**
  ```

#### M-4. 모바일 3D 성능 미고려
- **위치**: Section 7 - Phase 4
- **문제**: "모바일 터치 지원"만 언급, 모바일 WebGL 성능 이슈 없음
- **영향**: 모바일에서 프레임 드롭, 발열
- **개선안**:
  ```typescript
  // 모바일 감지 + 성능 조정
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  <Canvas
    dpr={isMobile ? 1 : [1, 2]}  // 모바일은 픽셀비 1로 제한
    performance={{ min: 0.5 }}   // 성능 저하 시 자동 품질 조절
  >
  ```

#### M-5. 상점→메인 전환 시 3D 씬 재로딩
- **위치**: Section 2.2 - Scenario 2
- **문제**: 상점 페이지 이동 후 돌아오면 3D 씬 재초기화
- **영향**: 사용자 경험 저하 (로딩 대기)
- **개선안**:
  ```markdown
  ### 해결 방안

  **Option A**: 상점을 모달로 구현 (3D 씬 유지)
  **Option B**: 상점을 슬라이드 패널로 구현
  **Option C**: 씬 상태를 Zustand에 캐싱

  **권장**: Option A (모달) - 가장 간단
  ```

---

### 🟢 Minor (개선 제안)

#### m-1. 섹션 번호 중복
- **위치**: 전체
- **문제**:
  - 1.2가 두 번 등장 (핵심 차별점, Problem Statement)
  - 5.3이 두 번 등장 (Folder Structure, State Schema)
- **개선안**: 번호 재정리

#### m-2. Flower3D 컴포넌트 미정의
- **위치**: Section 5.5
- **문제**: Stone3D에서 `<Flower3D />` 참조하지만 정의 없음
- **개선안**: Flower3D 스켈레톤 추가 또는 P2로 명시

#### m-3. 시간대별 배경과 3D Environment 충돌
- **위치**: Section 3.2 - FR-008
- **문제**: "시간대별 배경색 변화"가 3D Environment와 어떻게 연동되는지 불명확
- **개선안**:
  ```typescript
  // 시간대별 Environment preset 변경
  const getEnvironmentPreset = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 17) return 'sunset';  // 낮
    if (hour >= 17 && hour < 20) return 'dawn';   // 저녁
    return 'night';  // 밤
  };
  ```

#### m-4. 접근성(A11y)과 3D 충돌
- **위치**: Section 4.2 - Accessibility
- **문제**: 3D Canvas는 스크린리더 접근 불가
- **개선안**:
  ```typescript
  // Canvas에 aria 속성 추가
  <Canvas
    role="img"
    aria-label="3D 돌 모델. 현재 이끼가 적용되어 있습니다."
  >
  ```

---

## 누락된 요구사항

| ID | 요구사항 | 권장 우선순위 |
|----|---------|--------------|
| NEW-1 | 2D 폴백 컴포넌트 (Stone2DFallback) | **P0** |
| NEW-2 | Next.js dynamic import 처리 | **P0** |
| NEW-3 | 모바일 성능 최적화 설정 | P1 |
| NEW-4 | 상점 모달 UI (페이지 대신) | P1 |
| NEW-5 | 3D 데코레이션 구현 가이드 | P1 |

---

## 리스크 매트릭스 (3D 특화)

| 리스크 | 발생 확률 | 영향도 | 대응 방안 |
|--------|----------|--------|----------|
| 5시간 내 3D 미완성 | **고** | **고** | 개미 이벤트 제외, 데코 2개만 |
| WebGL 미지원 | 중 | 고 | 2D 폴백 필수 구현 |
| R3F 디버깅 지연 | 중 | 중 | drei 프리셋만 사용 |
| 모바일 성능 저하 | 중 | 중 | dpr 제한, 품질 자동 조절 |
| 빌드 에러 (SSR) | 중 | 고 | dynamic import 필수 |

---

## 권장 조치

### 즉시 조치 (Critical)
1. ❗ **개미 이벤트를 P2로 강등** → 3D 개발 시간 확보 (C-1)
2. ❗ **Stone2DFallback 컴포넌트 정의 추가** (C-2)
3. ❗ **성능 목표 수정** (로딩 2초 → 4초) (C-3)
4. ❗ **dynamic import 패턴 추가** (C-4)

### 구현 전 조치 (Major)
1. ⚠️ Item Data에 3D 좌표 추가 (M-1)
2. ⚠️ Team Assignment에 R3F 담당 명시 (M-2)
3. ⚠️ 3D 데코 구현 가이드 추가 (M-3)
4. ⚠️ 상점을 모달로 변경 (M-5)

### 가능하면 조치 (Minor)
1. 💡 섹션 번호 정리 (m-1)
2. 💡 Canvas aria-label 추가 (m-4)

---

## 수정된 우선순위 (3D 버전)

| 기존 | 변경 | 이유 |
|------|------|------|
| FR-007 개미 이벤트 P1 | **P2** | 3D 개발 시간 확보 |
| FR-008 시간대별 배경 P1 | **P2** | Environment 연동 복잡 |
| 나비 아이템 | **제외** | 3D 애니메이션 복잡 |
| 꽃 아이템 | **P2** | 기하학적 구현 복잡 |

### MVP 아이템 (P0)
- 이끼 (moss) - 구체 클러스터
- 버섯 (mushroom) - sphere + cylinder
- 자갈 (pebbles) - 작은 구체들

---

## 다음 단계

✅ **PRD 수정 완료 후**:

1. Critical 이슈 4개 반영
2. Task Plan 업데이트 (`PLAN_stone-garden.md`)
3. `/implement stone-garden` 실행

> 💡 **3D 해커톤 핵심 전략**:
> "단순한 3D가 복잡한 2D보다 인상적이다"
>
> 돌 + 자동 회전 + 이끼 2~3개만 완성해도 데모 임팩트 충분!
