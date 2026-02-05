import type { MotionType, MotionSequenceStep, BoneCommand, MoveCommand } from './motion.types'
import type { SceneObject } from './robot.types'
import type { ChatMessage } from './chat.types'

export interface AIMotionRequest {
  userMessage: string
  currentState: {
    animation: string
    position: [number, number, number]
    sceneObjects: SceneObject[]
  }
  conversationHistory: ChatMessage[]
}

export interface AIMotionResponse {
  success: boolean
  motion?: {
    type: MotionType
    description: string
    usePresetAnimation?: string
    customBoneCommands?: BoneCommand[]
    moveCommand?: MoveCommand  // 이동 명령
    sequence?: MotionSequenceStep[]
  }
  dialogue?: string
  emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral'
  error?: string
}

export type AIProvider = 'claude' | 'openai'

export interface AIServiceConfig {
  provider: AIProvider
  apiKey: string
  model: string
}
