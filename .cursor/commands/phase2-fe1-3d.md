# Phase 2: 3D 테라리움 (FE-1)

**담당**: FE-1 (3D 리드)
**시간**: 11:20 ~ 12:40 (1시간 20분)
**선행 조건**: Phase 1 완료

## 컨텍스트 파일
@docs/prd/PRD_stone-garden.md
@docs/todo_plan/PLAN_stone-garden.md

## 구현 요청

3D 테라리움 씬과 아이템들을 구현해줘.

### 1. 메인 씬
`components/Terrarium/TerrariumScene.tsx`
- GLView + expo-three 사용
- 자동 회전 카메라 (0.005 rad/frame)
- items props로 보유 아이템 ID 배열 받기
- 조명: AmbientLight(0.6) + DirectionalLight(0.8)

### 2. 기본 오브젝트
`components/Terrarium/GlassJar.tsx`
- 투명 유리병 (SphereGeometry)
- MeshPhysicalMaterial: opacity 0.3, transmission 0.9

`components/Terrarium/Soil.tsx`
- 갈색 흙 (CylinderGeometry)
- 색상: #8B4513

### 3. 아이템 4종 (`components/Terrarium/items/`)

`Moss.tsx` - 이끼
- 초록 구체 클러스터 (7개)
- 색상: #228B22

`Mushroom.tsx` - 버섯
- 빨간 반구(갓) + 흰 원기둥(줄기)
- 갓 색상: #FF6B6B

`Succulent.tsx` - 다육이
- 로제트 형태 (원뿔 여러 개)
- 색상: #90EE90

`Pebbles.tsx` - 자갈
- 회색 구체 클러스터 (5개)
- 색상: #A0A0A0

### 4. 2D 폴백
`components/Terrarium/Terrarium2DFallback.tsx`
- GL 미지원 시 이모지로 표시
- 🫙 + 아이템 이모지 오버레이

## 규칙
- `.cursor/rules/expo-three-mobile.mdc` 참고
- drei 패키지 사용 금지
- segment 수 16-32로 제한
- 100+ 폴리곤 메시 금지

## 완료 기준
- [ ] 3D 테라리움 자동 회전 표시
- [ ] 유리병 + 흙 렌더링
- [ ] 아이템 4종 3D 렌더링
- [ ] items props로 아이템 표시/숨김
- [ ] GL 실패 시 2D 폴백 동작

## 커밋
```bash
git checkout -b feature/phase2-3d
git add components/Terrarium/
git commit -m "feat(phase2): implement 3D terrarium scene and items"
git push origin feature/phase2-3d
```

## 다음 단계
→ 12:40에 main 머지 후 Phase 3 시작
