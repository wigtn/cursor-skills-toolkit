import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { Color, Box3, Vector3 } from 'three'
import { RobotController } from './robot/RobotController'
import type { AIMotionResponse } from '../types/ai.types'

interface SceneProps {
  aiResponse?: AIMotionResponse | null
  onAnimationChange?: (animation: string) => void
  onMotionComplete?: () => void
}

function ForestHouse() {
  const { scene } = useGLTF('/models/forest_house.glb')

  useEffect(() => {
    const box = new Box3().setFromObject(scene)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)

    console.log('=== Forest House ===')
    console.log('Size:', size)
    console.log('Center:', center)
  }, [scene])

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive
        object={scene}
        position={[0, 0, 0]}
        scale={1}
      />
    </RigidBody>
  )
}

// 넓은 바닥 충돌체
function Ground() {
  return (
    <RigidBody type="fixed" position={[0, -0.5, 0]}>
      <CuboidCollider args={[50, 0.5, 50]} />
    </RigidBody>
  )
}

export function Scene({
  aiResponse,
  onAnimationChange,
  onMotionComplete,
}: SceneProps) {
  const { gl } = useThree()

  gl.setClearColor(new Color('#87CEEB'))

  return (
    <>
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

      <Environment preset="sunset" />

      <Physics gravity={[0, -9.81, 0]} debug={false}>
        <Ground />
        <ForestHouse />

        <RobotController
          aiResponse={aiResponse}
          initialPosition={[-0.2, 0.36, 1.8]}
          scale={0.2}
          onAnimationChange={onAnimationChange}
          onMotionComplete={onMotionComplete}
        />
      </Physics>

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
