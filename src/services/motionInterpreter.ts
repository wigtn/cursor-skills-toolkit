import type { AIMotionResponse } from '../types/ai.types'
import type { MotionCommand, MotionStep, BoneCommand } from '../types/motion.types'
import type { BonePose } from '../types/robot.types'

export function interpretAIResponse(response: AIMotionResponse): MotionCommand | null {
  if (!response.success || !response.motion) {
    return null
  }

  const { motion } = response
  const steps: MotionStep[] = []

  if (motion.usePresetAnimation) {
    steps.push({
      duration: motion.type === 'loop' ? 0 : 2000,
      animation: motion.usePresetAnimation,
    })
  }

  if (motion.sequence) {
    motion.sequence.forEach((seqStep) => {
      if (seqStep.action === 'preset' && seqStep.animation) {
        steps.push({
          duration: seqStep.duration ?? 2000,
          animation: seqStep.animation,
        })
      } else if (seqStep.action === 'custom' && seqStep.boneCommands) {
        const pose = boneCommandsToPose(seqStep.boneCommands)
        steps.push({
          duration: seqStep.duration ?? 1000,
          pose,
        })
      } else if (seqStep.action === 'wait') {
        steps.push({
          duration: seqStep.duration ?? 500,
        })
      }
    })
  }

  if (motion.customBoneCommands && motion.customBoneCommands.length > 0) {
    const pose = boneCommandsToPose(motion.customBoneCommands)
    steps.push({
      duration: 1000,
      pose,
    })
  }

  if (steps.length === 0) {
    steps.push({
      duration: 1000,
      animation: 'Idle',
    })
  }

  return {
    id: Date.now().toString(),
    type: motion.type,
    description: motion.description,
    steps,
    priority: 1,
    interruptible: motion.type !== 'complex',
  }
}

function boneCommandsToPose(commands: BoneCommand[]): BonePose {
  const pose: BonePose = {}

  commands.forEach((cmd) => {
    if (!pose[cmd.boneName]) {
      pose[cmd.boneName] = {}
    }

    if (cmd.action === 'rotate') {
      pose[cmd.boneName].rotation = cmd.target
    } else if (cmd.action === 'translate') {
      pose[cmd.boneName].position = cmd.target
    }
  })

  return pose
}

export function getAnimationDuration(animationName: string): number {
  const durations: Record<string, number> = {
    Idle: 2000,
    Walking: 1000,
    Running: 800,
    Dance: 3000,
    Jump: 1200,
    Wave: 2000,
    Yes: 1000,
    No: 1000,
    ThumbsUp: 1500,
    Punch: 800,
    Death: 2000,
    Sitting: 1500,
    Standing: 1500,
  }

  return durations[animationName] ?? 2000
}
