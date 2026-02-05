import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { ChatMessage } from '../../types/chat.types'
import './ChatPanel.css'

interface ChatPanelProps {
  messages: ChatMessage[]
  isLoading: boolean
  onSendMessage: (message: string) => void
  onClear: () => void
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export function ChatPanel({
  messages,
  isLoading,
  onSendMessage,
  onClear,
  isMinimized = false,
  onToggleMinimize,
}: ChatPanelProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (trimmed && !isLoading) {
      onSendMessage(trimmed)
      setInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (isMinimized) {
    return (
      <button className="chat-minimized" onClick={onToggleMinimize}>
        <span className="chat-icon">💬</span>
        {messages.length > 0 && (
          <span className="chat-badge">{messages.length}</span>
        )}
      </button>
    )
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h3>🤖 로봇 컨트롤러</h3>
        <div className="chat-header-actions">
          <button onClick={onClear} title="대화 초기화">
            🗑️
          </button>
          <button onClick={onToggleMinimize} title="최소화">
            −
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <p>안녕하세요! 저에게 명령을 내려보세요.</p>
            <p className="chat-examples">
              예시: "춤을 춰봐", "손을 흔들어", "걸어가다가 점프해"
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.role}`}
          >
            {msg.role === 'assistant' && (
              <span className="message-avatar">
                {getEmotionEmoji(msg.emotion)}
              </span>
            )}
            <div className="message-content">
              <p>{msg.content}</p>
              {msg.motionTriggered && (
                <span className="motion-badge">🎬 동작 실행됨</span>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message assistant">
            <span className="message-avatar">🤖</span>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="명령을 입력하세요..."
          disabled={isLoading}
          className="chat-input"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="chat-send-btn"
        >
          ➤
        </button>
      </div>
    </div>
  )
}

function getEmotionEmoji(emotion?: string): string {
  switch (emotion) {
    case 'happy':
      return '😊'
    case 'excited':
      return '🤩'
    case 'sad':
      return '😢'
    case 'confused':
      return '😕'
    default:
      return '🤖'
  }
}
