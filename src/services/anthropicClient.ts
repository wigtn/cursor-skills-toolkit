import type { AIMotionRequest, AIMotionResponse } from '../types/ai.types'
import { SYSTEM_PROMPT } from '../constants/aiPrompts'

const API_URL = '/api/anthropic/v1/messages'

export async function sendToAnthropic(
  request: AIMotionRequest
): Promise<AIMotionResponse> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY?.trim()

  if (!apiKey) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not configured')
  }

  const messages = buildMessages(request)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }))
    throw new Error(error.error?.message || `API request failed: ${response.status}`)
  }

  const data = await response.json()
  const content = data.content?.[0]?.text || ''

  return parseAIResponse(content)
}

function buildMessages(request: AIMotionRequest) {
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []

  request.conversationHistory.forEach((msg) => {
    if (msg.role === 'user' || msg.role === 'assistant') {
      messages.push({
        role: msg.role,
        content: msg.content,
      })
    }
  })

  const userPrompt = `사용자 명령: "${request.userMessage}"

현재 로봇 상태:
- 애니메이션: ${request.currentState.animation}
- 위치: [${request.currentState.position.join(', ')}]

주변 오브젝트:
${request.currentState.sceneObjects.length > 0
    ? request.currentState.sceneObjects
        .map((obj) => `- ${obj.name} (${obj.type}) 위치: [${obj.position.join(', ')}]`)
        .join('\n')
    : '- 없음'
  }

JSON 형식으로 응답해주세요.`

  messages.push({ role: 'user', content: userPrompt })

  return messages
}

function parseAIResponse(text: string): AIMotionResponse {
  try {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/)
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim()

    const startIdx = jsonStr.indexOf('{')
    const endIdx = jsonStr.lastIndexOf('}')

    if (startIdx === -1 || endIdx === -1) {
      return {
        success: false,
        error: 'No JSON found in response',
        dialogue: text,
        emotion: 'confused',
      }
    }

    const cleanJson = jsonStr.slice(startIdx, endIdx + 1)
    const parsed = JSON.parse(cleanJson)

    return {
      success: parsed.success ?? true,
      motion: parsed.motion,
      dialogue: parsed.dialogue || '알겠어요!',
      emotion: parsed.emotion || 'neutral',
      error: parsed.error,
    }
  } catch (e) {
    console.error('Failed to parse AI response:', e, text)
    return {
      success: false,
      error: 'Failed to parse AI response',
      dialogue: text.slice(0, 200),
      emotion: 'confused',
    }
  }
}
