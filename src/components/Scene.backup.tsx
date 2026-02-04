import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { Mesh, Color } from 'three'
import { Stone } from './Stone'

interface SceneProps {
  emotion?: 'calm' | 'excited'
}

// 잔디 바닥
function GrassFloor() {
  const meshRef = useRef<Mesh>(null)

  // 잔디 풀들
  const grassBlades = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const angle = (i / 60) * Math.PI * 2
      const radius = 1.5 + Math.random() * 1.2
      return {
        id: i,
        position: [
          Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5,
          -1.35,
          Math.sin(angle) * radius + (Math.random() - 0.5) * 0.5,
        ] as [number, number, number],
        scale: 0.08 + Math.random() * 0.08,
        rotation: Math.random() * Math.PI,
      }
    })
  }, [])

  return (
    <group>
      {/* 메인 잔디 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial
          color="#7CB342"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* 중앙 밝은 잔디 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.48, 0]} receiveShadow>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial
          color="#8BC34A"
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* 작은 풀들 */}
      {grassBlades.map((blade) => (
        <mesh
          key={blade.id}
          position={blade.position}
          rotation={[0, blade.rotation, 0]}
        >
          <coneGeometry args={[0.03, blade.scale, 4]} />
          <meshStandardMaterial color="#9CCC65" />
        </mesh>
      ))}

      {/* 작은 꽃들 */}
      <Flower position={[-1.8, -1.4, 0.5]} color="#FFB7C5" />
      <Flower position={[1.5, -1.4, -1]} color="#FFECB3" />
      <Flower position={[0.8, -1.4, 1.5]} color="#E1BEE7" />
      <Flower position={[-1.2, -1.4, -1.3]} color="#B3E5FC" />
    </group>
  )
}

// 귀여운 꽃
function Flower({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} floatIntensity={0.1} rotationIntensity={0.1}>
      <group position={position}>
        {/* 꽃잎들 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 0.06,
              0.05,
              Math.sin((i / 5) * Math.PI * 2) * 0.06,
            ]}
            rotation={[Math.PI / 4, 0, 0]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {/* 꽃 중심 */}
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#FFE082" />
        </mesh>
        {/* 줄기 */}
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
          <meshStandardMaterial color="#81C784" />
        </mesh>
      </group>
    </Float>
  )
}

// 떠다니는 나비/반짝이
function FloatingButterflies() {
  const butterflies = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 6,
        Math.random() * 2 + 0.5,
        (Math.random() - 0.5) * 4 - 1,
      ] as [number, number, number],
      color: ['#FFB7C5', '#B3E5FC', '#E1BEE7', '#FFECB3'][i % 4],
      speed: 1 + Math.random() * 2,
    })), [])

  return (
    <>
      {butterflies.map((b) => (
        <Float
          key={b.id}
          speed={b.speed}
          rotationIntensity={0.5}
          floatIntensity={1.5}
        >
          <group position={b.position}>
            {/* 나비 날개 */}
            <mesh position={[-0.03, 0, 0]} rotation={[0, 0, 0.3]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial
                color={b.color}
                transparent
                opacity={0.8}
              />
            </mesh>
            <mesh position={[0.03, 0, 0]} rotation={[0, 0, -0.3]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial
                color={b.color}
                transparent
                opacity={0.8}
              />
            </mesh>
            {/* 몸통 */}
            <mesh>
              <capsuleGeometry args={[0.01, 0.03, 4, 8]} />
              <meshStandardMaterial color="#5D4037" />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  )
}

// 부드러운 구름
function Clouds() {
  return (
    <>
      <Float speed={0.4} floatIntensity={0.3}>
        <group position={[-3.5, 2.5, -5]}>
          <mesh>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.5, 0.1, 0]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
          </mesh>
          <mesh position={[-0.4, -0.1, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
          </mesh>
        </group>
      </Float>

      <Float speed={0.3} floatIntensity={0.2}>
        <group position={[3.5, 2, -6]}>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.85} />
          </mesh>
          <mesh position={[0.4, 0.05, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.85} />
          </mesh>
        </group>
      </Float>

      <Float speed={0.5} floatIntensity={0.25}>
        <group position={[0, 3, -7]}>
          <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0.35, 0, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
        </group>
      </Float>
    </>
  )
}

export function Scene({ emotion = 'calm' }: SceneProps) {
  const { gl } = useThree()

  // 밝은 하늘색 배경
  gl.setClearColor(new Color('#87CEEB'))

  return (
    <>
      {/* 조명 - 더 밝게 */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight
        color="#87CEEB"
        groundColor="#7CB342"
        intensity={0.5}
      />

      {/* 배경 요소 */}
      <Clouds />
      <FloatingButterflies />

      {/* 잔디 바닥 */}
      <GrassFloor />

      {/* 돌 캐릭터 */}
      <Float
        speed={1.5}
        rotationIntensity={0.1}
        floatIntensity={0.3}
      >
        <Stone emotion={emotion} />
      </Float>

      {/* 카메라 컨트롤 */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={10}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  )
}
