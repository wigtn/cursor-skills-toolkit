# FE-1: 3D 테라리움 구현

담당자: **FE-1 (3D 리드)**
Phase: **Phase 2**
예상 시간: 11:20 ~ 12:40

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

Phase 2 3D 테라리움을 구현해줘.

PRD Section 10.2 폴더 구조와 Plan Phase 2 태스크를 참고해서 아래 파일들을 만들어줘:

### 1. 메인 씬
- `components/Terrarium/TerrariumScene.tsx`
  - GLView + expo-three 사용
  - 자동 회전 카메라
  - items props로 보유 아이템 받기

### 2. 기본 오브젝트
- `components/Terrarium/GlassJar.tsx` - 투명 유리병 (MeshPhysicalMaterial)
- `components/Terrarium/Soil.tsx` - 갈색 흙 (CylinderGeometry)

### 3. 아이템 4종 (components/Terrarium/items/)
- `Moss.tsx` - 이끼 (초록 구체 클러스터)
- `Mushroom.tsx` - 버섯 (빨간 반구 + 흰 원기둥)
- `Succulent.tsx` - 다육이 (로제트 형태)
- `Pebbles.tsx` - 자갈 (회색 구체들)

### 4. 폴백
- `components/Terrarium/Terrarium2DFallback.tsx` - GL 미지원 시 이모지 표시

## 규칙
- `.cursor/rules/expo-three-mobile.mdc` 참고
- drei 패키지 사용 금지 (모바일 미지원)
- 100+ 폴리곤 메시 금지
- segment 수 최소화 (16-32)

## 완료 기준
- [ ] 3D 테라리움 자동 회전 표시
- [ ] 유리병 + 흙 렌더링
- [ ] 아이템 4종 3D 렌더링
- [ ] items props로 아이템 표시/숨김

## 커밋
```bash
git checkout -b feature/phase2-3d
# 작업 완료 후
git add components/Terrarium/
git commit -m "feat: implement 3D terrarium scene and items"
```
