import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

interface StoneProps {
  emotion?: 'calm' | 'excited'
}

export function Stone({ emotion = 'calm' }: StoneProps) {
  const groupRef = useRef<Group>(null)
  const bodyRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // 부드러운 숨쉬기 애니메이션
    const breathe = Math.sin(time * 1.5) * 0.02
    groupRef.current.scale.y = 1 + breathe

    // 감정에 따른 움직임
    if (emotion === 'excited') {
      // ..! 상태: 살짝 통통 튀는 느낌
      groupRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.1
      groupRef.current.rotation.z = Math.sin(time * 3) * 0.05
    } else {
      // ... 상태: 고요하게 좌우로 흔들림
      groupRef.current.position.y = 0
      groupRef.current.rotation.z = Math.sin(time * 0.8) * 0.02
    }

    // 호버 시 살짝 커짐
    const targetScale = hovered ? 1.1 : 1
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.1
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* 돌 몸통 - 부드러운 타원형 */}
      <mesh
        ref={bodyRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#8B9DC3"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* 돌 위쪽 - 살짝 납작하게 */}
      <mesh position={[0, 0.3, 0]} scale={[0.9, 0.6, 0.9]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#9BAFD9"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* 왼쪽 눈 */}
      <group position={[-0.3, 0.4, 0.75]}>
        {/* 눈 흰자 */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        {/* 눈동자 */}
        <mesh position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#2D3436" roughness={0.2} />
        </mesh>
        {/* 하이라이트 */}
        <mesh position={[0.03, 0.03, 0.12]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* 오른쪽 눈 */}
      <group position={[0.3, 0.4, 0.75]}>
        {/* 눈 흰자 */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        {/* 눈동자 */}
        <mesh position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#2D3436" roughness={0.2} />
        </mesh>
        {/* 하이라이트 */}
        <mesh position={[0.03, 0.03, 0.12]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* 볼터치 (블러시) */}
      <mesh position={[-0.5, 0.15, 0.7]} rotation={[0, 0.3, 0]}>
        <circleGeometry args={[0.12, 16]} />
        <meshStandardMaterial
          color="#FFB6C1"
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0.5, 0.15, 0.7]} rotation={[0, -0.3, 0]}>
        <circleGeometry args={[0.12, 16]} />
        <meshStandardMaterial
          color="#FFB6C1"
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
