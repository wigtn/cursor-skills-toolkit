import type { AIMotionRequest, AIMotionResponse, AIProvider } from '../types/ai.types'
import type { ChatMessage } from '../types/chat.types'
import type { SceneObject } from '../types/robot.types'
import { sendToAnthropic } from './anthropicClient'
import { sendToOpenAI } from './openaiClient'
import { STOP_KEYWORDS } from '../constants/aiPrompts'

export interface AIServiceOptions {
  preferredProvider?: AIProvider
}

// 사용 가능한 API 자동 감지
function getAvailableProvider(): AIProvider | null {
  const claudeKey = import.meta.env.VITE_ANTHROPIC_API_KEY?.trim()
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY?.trim()

  // OpenAI 키가 있으면 우선 사용 (더 안정적)
  if (openaiKey) return 'openai'
  if (claudeKey) return 'claude'
  return null
}

function getSecondaryProvider(primary: AIProvider): AIProvider | null {
  const claudeKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (primary === 'claude' && openaiKey && openaiKey.trim() !== '') return 'openai'
  if (primary === 'openai' && claudeKey && claudeKey.trim() !== '') return 'claude'
  return null
}

export async function sendMotionCommand(
  userMessage: string,
  currentAnimation: string,
  position: [number, number, number],
  sceneObjects: SceneObject[],
  conversationHistory: ChatMessage[],
  options: AIServiceOptions = {}
): Promise<AIMotionResponse> {
  // 정지 명령 처리
  if (isStopCommand(userMessage)) {
    return {
      success: true,
      motion: {
        type: 'simple',
        description: '멈추기',
        usePresetAnimation: 'Idle',
      },
      dialogue: '네, 멈출게요!',
      emotion: 'neutral',
    }
  }

  // 사용 가능한 API 확인
  const primaryProvider = options.preferredProvider || getAvailableProvider()

  if (!primaryProvider) {
    return {
      success: false,
      error: 'API 키가 설정되지 않았습니다',
      dialogue: 'API 키를 .env 파일에 설정해주세요!',
      emotion: 'confused',
    }
  }

  const request: AIMotionRequest = {
    userMessage,
    currentState: {
      animation: currentAnimation,
      position,
      sceneObjects,
    },
    conversationHistory,
  }

  try {
    console.log(`Using ${primaryProvider} API...`)
    if (primaryProvider === 'claude') {
      return await sendToAnthropic(request)
    } else {
      return await sendToOpenAI(request)
    }
  } catch (primaryError) {
    console.warn(`Primary provider (${primaryProvider}) failed:`, primaryError)

    // Fallback 시도
    const fallbackProvider = getSecondaryProvider(primaryProvider)
    if (fallbackProvider) {
      console.log(`Trying fallback provider: ${fallbackProvider}`)
      try {
        if (fallbackProvider === 'openai') {
          return await sendToOpenAI(request)
        } else {
          return await sendToAnthropic(request)
        }
      } catch (fallbackError) {
        console.error(`Fallback provider (${fallbackProvider}) also failed:`, fallbackError)
        return createErrorResponse(primaryError as Error, fallbackError as Error)
      }
    }

    return createErrorResponse(primaryError as Error)
  }
}

function isStopCommand(message: string): boolean {
  const normalized = message.toLowerCase().trim()
  return STOP_KEYWORDS.some((keyword) => normalized.includes(keyword))
}

function createErrorResponse(primaryError: Error, fallbackError?: Error): AIMotionResponse {
  const errorMessage = fallbackError
    ? `API 연결 실패: ${primaryError.message}`
    : `API 연결 실패: ${primaryError.message}`

  return {
    success: false,
    error: errorMessage,
    dialogue: '죄송해요, 지금 연결이 안 돼요. 다시 시도해주세요!',
    emotion: 'confused',
  }
}

export function checkApiKeysConfigured(): { claude: boolean; openai: boolean; any: boolean } {
  const claude = !!(import.meta.env.VITE_ANTHROPIC_API_KEY?.trim())
  const openai = !!(import.meta.env.VITE_OPENAI_API_KEY?.trim())
  return { claude, openai, any: claude || openai }
}
