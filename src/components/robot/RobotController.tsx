import { useRef, useEffect, useMemo, useCallback } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Group, MathUtils, Vector3 } from 'three'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import { useRobotBones } from '../../hooks/useRobotBones'
import type { AIMotionResponse } from '../../types/ai.types'
import type { BoneCommand, MoveCommand } from '../../types/motion.types'

export const ROBOT_ANIMATIONS = [
  'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting',
  'Standing', 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp',
] as const

export type RobotAnimation = typeof ROBOT_ANIMATIONS[number]

// 본 애니메이션 상태 - additive 방식으로 적용
interface BoneOverride {
  boneName: string
  targetOffset: { x: number; y: number; z: number }
  currentOffset: { x: number; y: number; z: number }
  duration: number
  elapsed: number
  phase: 'in' | 'hold' | 'out'
  holdTime: number
}

// 물리 기반 이동 상태
interface PhysicsMovement {
  direction: Vector3
  speed: number
  duration: number
  elapsed: number
  targetRotation: number
}

interface RobotControllerProps {
  initialPosition?: [number, number, number]
  scale?: number
  aiResponse?: AIMotionResponse | null
  onMotionComplete?: () => void
  onAnimationChange?: (animation: string) => void
  onPositionChange?: (position: [number, number, number]) => void
}

export function RobotController({
  initialPosition = [-0.2, 0.36, 1.8],
  scale = 0.2,
  aiResponse,
  onMotionComplete,
  onAnimationChange,
  onPositionChange,
}: RobotControllerProps) {
  const group = useRef<Group>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const rotationRef = useRef(0)

  const lastResponseIdRef = useRef<string | null>(null)
  const boneOverridesRef = useRef<Map<string, BoneOverride>>(new Map())
  const movementRef = useRef<PhysicsMovement | null>(null)
  const currentAnimRef = useRef<string>('Idle')

  const { scene, animations } = useGLTF('/models/RobotExpressive.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, group)
  const { getBone, getBoneNames } = useRobotBones(clonedScene)

  // 본 이름 로깅
  useEffect(() => {
    const names = getBoneNames()
    if (names.length > 0) {
      console.log('=== Robot Bones ===', names)
    }
  }, [getBoneNames])

  // 애니메이션 재생 - 블렌딩 지원
  const playAnimation = useCallback((name: string, fadeTime = 0.4) => {
    if (!actions[name]) return

    if (currentAnimRef.current === name) return

    const currentAction = actions[currentAnimRef.current]
    const nextAction = actions[name]

    if (currentAction && nextAction) {
      nextAction.reset()
      nextAction.setEffectiveWeight(1)
      nextAction.crossFadeFrom(currentAction, fadeTime, true)
      nextAction.play()
    } else if (nextAction) {
      nextAction.reset().fadeIn(fadeTime).play()
    }

    currentAnimRef.current = name
    onAnimationChange?.(name)
  }, [actions, onAnimationChange])

  // 본 오버라이드 추가 (additive 방식)
  const addBoneOverride = useCallback((cmd: BoneCommand) => {
    const bone = getBone(cmd.boneName)
    if (!bone) {
      console.warn(`Bone not found: ${cmd.boneName}`)
      return
    }

    const override: BoneOverride = {
      boneName: cmd.boneName,
      targetOffset: { ...cmd.target },
      currentOffset: { x: 0, y: 0, z: 0 },
      duration: cmd.duration * 0.4,
      elapsed: 0,
      phase: 'in',
      holdTime: cmd.duration * 0.2,
    }

    boneOverridesRef.current.set(cmd.boneName, override)
  }, [getBone])

  // 물리 기반 이동 시작
  const startPhysicsMovement = useCallback((cmd: MoveCommand) => {
    const dir = new Vector3()

    switch (cmd.direction) {
      case 'forward': dir.set(0, 0, -1); break
      case 'backward': dir.set(0, 0, 1); break
      case 'left': dir.set(-1, 0, 0); break
      case 'right': dir.set(1, 0, 0); break
      case 'custom':
        if (cmd.customDirection) {
          dir.set(cmd.customDirection.x, 0, cmd.customDirection.z).normalize()
        }
        break
    }

    // 현재 회전 적용
    dir.applyAxisAngle(new Vector3(0, 1, 0), rotationRef.current)

    const speed = cmd.distance / (cmd.duration / 1000)
    const targetRot = cmd.direction !== 'backward'
      ? Math.atan2(dir.x, -dir.z)
      : rotationRef.current

    movementRef.current = {
      direction: dir.normalize(),
      speed,
      duration: cmd.duration,
      elapsed: 0,
      targetRotation: targetRot,
    }

    console.log('Physics Movement:', { direction: dir.toArray(), speed, duration: cmd.duration })
  }, [])

  // 점프 (물리 기반)
  const jump = useCallback((force = 5) => {
    if (rigidBodyRef.current) {
      const vel = rigidBodyRef.current.linvel()
      // 이미 공중에 있으면 점프 안함
      if (Math.abs(vel.y) < 0.1) {
        rigidBodyRef.current.setLinvel({ x: vel.x, y: force, z: vel.z }, true)
      }
    }
  }, [])

  // 초기 애니메이션
  useEffect(() => {
    if (actions['Idle']) {
      actions['Idle'].reset().play()
    }
  }, [actions])

  // AI 응답 처리
  useEffect(() => {
    if (!aiResponse?.success || !aiResponse.motion) return

    const id = JSON.stringify(aiResponse.motion) + (aiResponse.dialogue || '')
    if (lastResponseIdRef.current === id) return
    lastResponseIdRef.current = id

    const { motion } = aiResponse

    // 1. 이동 명령 처리
    if (motion.moveCommand) {
      startPhysicsMovement(motion.moveCommand)

      if (!motion.usePresetAnimation) {
        const speed = motion.moveCommand.distance / (motion.moveCommand.duration / 1000)
        playAnimation(speed > 1.5 ? 'Running' : 'Walking')
      }
    }

    // 2. 프리셋 애니메이션
    if (motion.usePresetAnimation) {
      playAnimation(motion.usePresetAnimation)

      // Jump 애니메이션일 때 실제로 점프
      if (motion.usePresetAnimation === 'Jump') {
        setTimeout(() => jump(4), 200)
      }
    }

    // 3. 커스텀 본 명령들
    if (motion.customBoneCommands?.length) {
      motion.customBoneCommands.forEach(cmd => addBoneOverride(cmd))
    }

    // 완료 콜백
    if (motion.type === 'simple') {
      const maxDuration = Math.max(
        motion.moveCommand?.duration || 0,
        ...(motion.customBoneCommands?.map(c => c.duration) || [0]),
        motion.usePresetAnimation ? 2000 : 0
      )
      setTimeout(() => onMotionComplete?.(), maxDuration + 200)
    }
  }, [aiResponse, playAnimation, addBoneOverride, startPhysicsMovement, jump, onMotionComplete])

  // 매 프레임 업데이트
  useFrame((_, delta) => {
    const dt = delta * 1000

    // === 본 오버라이드 처리 (additive) ===
    boneOverridesRef.current.forEach((override, boneName) => {
      const bone = getBone(boneName)
      if (!bone) return

      override.elapsed += dt

      if (override.phase === 'in') {
        const t = Math.min(override.elapsed / override.duration, 1)
        const eased = easeOutQuad(t)

        override.currentOffset.x = override.targetOffset.x * eased
        override.currentOffset.y = override.targetOffset.y * eased
        override.currentOffset.z = override.targetOffset.z * eased

        if (t >= 1) {
          override.phase = 'hold'
          override.elapsed = 0
        }
      } else if (override.phase === 'hold') {
        if (override.elapsed >= override.holdTime) {
          override.phase = 'out'
          override.elapsed = 0
        }
      } else if (override.phase === 'out') {
        const t = Math.min(override.elapsed / override.duration, 1)
        const eased = easeOutQuad(t)

        override.currentOffset.x = override.targetOffset.x * (1 - eased)
        override.currentOffset.y = override.targetOffset.y * (1 - eased)
        override.currentOffset.z = override.targetOffset.z * (1 - eased)

        if (t >= 1) {
          boneOverridesRef.current.delete(boneName)
        }
      }

      bone.rotation.x += override.currentOffset.x
      bone.rotation.y += override.currentOffset.y
      bone.rotation.z += override.currentOffset.z
    })

    // === 물리 기반 이동 처리 ===
    if (rigidBodyRef.current) {
      const rb = rigidBodyRef.current

      if (movementRef.current) {
        const mv = movementRef.current
        mv.elapsed += dt

        // 속도 설정 (y는 중력 영향 유지)
        const currentVel = rb.linvel()
        rb.setLinvel({
          x: mv.direction.x * mv.speed,
          y: currentVel.y,
          z: mv.direction.z * mv.speed,
        }, true)

        // 회전 보간
        rotationRef.current = MathUtils.lerp(
          rotationRef.current,
          mv.targetRotation,
          delta * 5
        )

        if (mv.elapsed >= mv.duration) {
          // 이동 종료 - 속도 0으로
          rb.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true)
          movementRef.current = null

          if (currentAnimRef.current === 'Walking' || currentAnimRef.current === 'Running') {
            playAnimation('Idle')
          }
        }
      }

      // 위치 콜백
      const pos = rb.translation()
      onPositionChange?.([pos.x, pos.y, pos.z])
    }

    // 그룹 회전 적용
    if (group.current) {
      group.current.rotation.y = rotationRef.current
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={initialPosition}
      enabledRotations={[false, false, false]}
      mass={1}
      linearDamping={0.5}
      angularDamping={0.5}
      lockRotations
    >
      <CapsuleCollider args={[0.15, 0.1]} position={[0, 0.25, 0]} />
      <group ref={group} scale={scale}>
        <primitive object={clonedScene} />
      </group>
    </RigidBody>
  )
}

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t)
}

useGLTF.preload('/models/RobotExpressive.glb')
