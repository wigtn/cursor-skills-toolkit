import type { BonePose } from './robot.types'

export type MotionType = 'simple' | 'complex' | 'loop'

export type MotionState =
  | 'idle'
  | 'executing'
  | 'blending'
  | 'looping'

export type EasingType =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'

export interface MotionStep {
  duration: number
  animation?: string
  pose?: BonePose
  blendWeight?: number
  easing?: EasingType
}

export interface MotionCommand {
  id: string
  type: MotionType
  description: string
  steps: MotionStep[]
  priority: number
  interruptible: boolean
}

export interface MotionQueueItem {
  command: MotionCommand
  startTime: number
  currentStep: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
}

export interface BoneCommand {
  boneName: string
  action: 'rotate' | 'translate' | 'reset'
  target: { x: number; y: number; z: number }
  duration: number
  relative?: boolean
}

// 이동 명령
export interface MoveCommand {
  direction: 'forward' | 'backward' | 'left' | 'right' | 'custom'
  distance: number  // 미터 단위
  duration: number  // 밀리초
  customDirection?: { x: number; z: number }  // 정규화된 방향 벡터
}

export interface MotionSequenceStep {
  action: 'preset' | 'custom' | 'wait' | 'loop_start' | 'loop_end' | 'move'
  animation?: string
  boneCommands?: BoneCommand[]
  moveCommand?: MoveCommand
  duration?: number
  loopCount?: number
}
