# FE-2: 3D 웹 씬 전체 태스크

## Phase 2: 3D 씬 기본 구조

### Task 2-1: Scene.tsx
- [ ] useThree → gl.setClearColor('#87CEEB')
- [ ] ambientLight intensity 0.8
- [ ] directionalLight [10,20,10] intensity 1.5 castShadow
- [ ] hemisphereLight #87CEEB #8B4513 0.5
- [ ] Environment preset="sunset" (drei)
- [ ] OrbitControls (enablePan, enableZoom, minDistance 1, maxDistance 30)

### Task 2-2: Robot.tsx
- [ ] useGLTF('/models/RobotExpressive.glb')
- [ ] SkeletonUtils.clone(scene) — useMemo
- [ ] useAnimations(animations, group)
- [ ] ROBOT_ANIMATIONS 배열 + RobotAnimation 타입 export
- [ ] 애니메이션 전환: fadeOut(0.2) → reset → fadeIn(0.2) → play
- [ ] useGLTF.preload 추가

### Task 2-3: ForestHouse.tsx
- [ ] useGLTF('/models/forest_house.glb')
- [ ] primitive object={scene} position/scale props
- [ ] useGLTF.preload 추가

### Task 2-4: GLB 모델 배치
- [ ] public/models/RobotExpressive.glb 확인
- [ ] public/models/forest_house.glb 확인
- [ ] 브라우저에서 3D 씬 렌더링 확인

## Phase 2: 캐릭터 + 감정 표현

### Task 2-5: Stone.tsx (돌 캐릭터)
- [ ] sphereGeometry 몸체 + 머리 위 납작 구
- [ ] 눈: 흰자 + 눈동자 + 하이라이트(emissive)
- [ ] 볼터치: circleGeometry, 핑크, 반투명
- [ ] useFrame: emotion별 애니메이션
  - calm: sin 기반 호흡, 살짝 흔들림
  - excited: 통통 튀기, rotation
- [ ] hover: scale 1.1 lerp 보간

### Task 2-6: EmotionBubble.tsx
- [ ] props: emotion ('calm'|'excited'), visible (boolean)
- [ ] 한 글자씩 타이핑 애니메이션 (setInterval)
  - calm: '...' (300ms 간격)
  - excited: '..!' (150ms 간격)
- [ ] CSS: 그라데이션 배경, 삼각형 꼬리, 등장 애니메이션

### Task 2-7: EmotionBubble.css
- [ ] .emotion-bubble: absolute, top 25%, bubble-appear 애니메이션
- [ ] .calm / .excited 각각 다른 그라데이션
- [ ] .bubble-tail: border 삼각형
- [ ] @keyframes: bubble-appear, bubble-bounce, typing-pulse

## Phase 3: 스타일 + UI

### Task 3-1: App.css
- [ ] .app: 100vw/100vh, relative, overflow hidden
- [ ] .title: absolute top, pointer-events none, Pretendard
- [ ] .animation-controls: absolute bottom, flex wrap, backdrop-filter
- [ ] .anim-btn: column flex, hover/active 스타일
- [ ] @media (max-width: 600px) 반응형

### Task 3-2: index.css
- [ ] 전역 리셋 (margin, padding, box-sizing)
- [ ] 100% 높이, overflow hidden
- [ ] Pretendard 폰트, antialiased
- [ ] 터치 하이라이트 제거, 스크롤바 숨김
- [ ] canvas: user-select none, touch-action none

## Phase 4: 음성 연동

### Task 4-1: 음성 → 감정 시각 피드백
- [ ] VOICE_RESULT 수신 시 로봇 애니메이션 변경
- [ ] RECORDING_START 수신 시 Wave 또는 특별 반응
- [ ] EmotionBubble 표시 (STT 텍스트 기반)

## Phase 5: 폴리싱

### Task 5-1: 시각 효과
- [ ] 파티클 이펙트 (선택)
- [ ] 씬 전환 애니메이션
- [ ] 로딩 인디케이터 (Suspense fallback)

### Task 5-2: 성능 최적화
- [ ] GLB 파일 크기 확인 (gltf-transform compress)
- [ ] 불필요한 castShadow 제거
- [ ] pixelRatio 제한
