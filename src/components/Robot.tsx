import { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Group, Box3, Vector3 } from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

interface RobotProps {
  animation?: string
  position?: [number, number, number]
  scale?: number
}

// 사용 가능한 애니메이션 목록
export const ROBOT_ANIMATIONS = [
  'Idle',
  'Walking',
  'Running',
  'Dance',
  'Death',
  'Sitting',
  'Standing',
  'Jump',
  'Yes',
  'No',
  'Wave',
  'Punch',
  'ThumbsUp',
] as const

export type RobotAnimation = typeof ROBOT_ANIMATIONS[number]

export function Robot({
  animation = 'Idle',
  position = [0, -1, 0],
  scale = 0.5
}: RobotProps) {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/RobotExpressive.glb')

  // scene을 clone해야 애니메이션이 제대로 동작함
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])

  const { actions } = useAnimations(animations, group)

  // 로봇 분석
  useEffect(() => {
    const box = new Box3().setFromObject(clonedScene)
    const size = new Vector3()
    box.getSize(size)
    console.log('=== Robot 분석 ===')
    console.log('Min:', box.min)
    console.log('Max:', box.max)
    console.log('Size:', size)
    console.log('로봇 바닥 Y:', box.min.y)
    console.log('로봇 높이:', size.y)
  }, [clonedScene])

  // 애니메이션 변경
  useEffect(() => {
    // 모든 애니메이션 중지
    Object.values(actions).forEach(action => {
      action?.fadeOut(0.2)
    })

    // 새 애니메이션 시작
    const action = actions[animation]
    if (action) {
      action.reset().fadeIn(0.2).play()
    }
  }, [animation, actions])

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  )
}

// GLTF 프리로드
useGLTF.preload('/models/RobotExpressive.glb')
