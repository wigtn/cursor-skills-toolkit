import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Color, Box3, Vector3 } from 'three'
import { Robot } from './Robot'
import type { RobotAnimation } from './Robot'

interface SceneProps {
  animation?: RobotAnimation
}

// 배경 모델 + 분석
function ForestHouse() {
  const { scene } = useGLTF('/models/forest_house.glb')

  useEffect(() => {
    // 바운딩 박스 분석
    const box = new Box3().setFromObject(scene)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)

    console.log('=== Forest House 분석 ===')
    console.log('Min:', box.min)
    console.log('Max:', box.max)
    console.log('Size:', size)
    console.log('Center:', center)
    console.log('바닥 Y 위치:', box.min.y)
  }, [scene])

  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      scale={1}
    />
  )
}

export function Scene({ animation = 'Idle' }: SceneProps) {
  const { gl } = useThree()

  // 하늘색 배경
  gl.setClearColor(new Color('#87CEEB'))

  return (
    <>
      {/* 조명 */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
      />
      <hemisphereLight
        color="#87CEEB"
        groundColor="#8B4513"
        intensity={0.5}
      />

      {/* 환경 조명 */}
      <Environment preset="sunset" />

      {/* 배경 - Forest House */}
      <ForestHouse />

      {/* 로봇 캐릭터 - 배경 바닥 위에 배치 */}
      {/* 바닥 Y=0.244, 로봇 min Y=-12.14, scale 0.3 → position Y = 0.244 + 12.14*0.3 = 3.88 */}
      <Robot
        animation={animation}
        position={[-0.2, 0.36, 1.8]}
        scale={0.2}
      />

      {/* 카메라 컨트롤 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        minDistance={1}
        maxDistance={30}
        target={[0, 1.5, 1.5]}
      />
    </>
  )
}

useGLTF.preload('/models/forest_house.glb')
