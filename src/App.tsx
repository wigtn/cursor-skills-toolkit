import { useState, Suspense, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { ChatPanel } from './components/chat/ChatPanel'
import { useChat } from './hooks/useChat'
import { sendMotionCommand, checkApiKeysConfigured } from './services/aiService'
import type { AIMotionResponse } from './types/ai.types'
import type { SceneObject } from './types/robot.types'
import './App.css'

function App() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState('Idle')
  const [aiResponse, setAiResponse] = useState<AIMotionResponse | null>(null)
  const sceneObjectsRef = useRef<SceneObject[]>([
    {
      id: 'forest_house',
      name: 'Forest House',
      type: 'building',
      position: [0, 0, 0],
      interactable: true,
    },
  ])

  const {
    messages,
    isLoading,
    addMessage,
    setLoading,
    clearMessages,
  } = useChat()

  const handleSendMessage = useCallback(async (content: string) => {
    addMessage({ role: 'user', content })
    setLoading(true)

    try {
      const response = await sendMotionCommand(
        content,
        currentAnimation,
        [-0.2, 0.36, 1.8],
        sceneObjectsRef.current,
        messages
      )

      setAiResponse(response)

      addMessage({
        role: 'assistant',
        content: response.dialogue || '알겠어요!',
        motionTriggered: response.success,
        emotion: response.emotion,
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      addMessage({
        role: 'assistant',
        content: '죄송해요, 오류가 발생했어요. 다시 시도해주세요!',
        emotion: 'confused',
      })
    } finally {
      setLoading(false)
    }
  }, [addMessage, setLoading, messages, currentAnimation])

  const handleClearChat = useCallback(() => {
    clearMessages()
    setAiResponse(null)
  }, [clearMessages])

  const handleAnimationChange = useCallback((animation: string) => {
    setCurrentAnimation(animation)
  }, [])

  const handleMotionComplete = useCallback(() => {
    console.log('Motion completed')
  }, [])

  const apiKeys = checkApiKeysConfigured()

  return (
    <div className="app">
      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 45 }}
        style={{ background: 'linear-gradient(180deg, #e8f4f8 0%, #d4e8ed 100%)' }}
      >
        <Suspense fallback={null}>
          <Scene
            aiResponse={aiResponse}
            onAnimationChange={handleAnimationChange}
            onMotionComplete={handleMotionComplete}
          />
        </Suspense>
      </Canvas>

      <div className="title">
        <h1>AI 로봇 버디</h1>
        <p>AI에게 명령을 내려보세요</p>
      </div>

      {!apiKeys.any && (
        <div className="api-warning">
          ⚠️ API 키가 설정되지 않았습니다. .env 파일에 VITE_ANTHROPIC_API_KEY 또는 VITE_OPENAI_API_KEY를 추가하세요.
        </div>
      )}

      <ChatPanel
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        onClear={handleClearChat}
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
    </div>
  )
}

export default App
