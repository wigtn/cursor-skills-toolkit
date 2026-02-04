import { useGLTF } from '@react-three/drei'

interface ForestHouseProps {
  position?: [number, number, number]
  scale?: number
}

export function ForestHouse({
  position = [0, 0, 0],
  scale = 1
}: ForestHouseProps) {
  const { scene } = useGLTF('/models/forest_house.glb')

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
    />
  )
}

useGLTF.preload('/models/forest_house.glb')
