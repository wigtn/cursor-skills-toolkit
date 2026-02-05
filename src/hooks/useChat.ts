import { useState, useCallback } from 'react'
import type { ChatMessage, ChatState } from '../types/chat.types'

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  })

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))
    return newMessage
  }, [])

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }))
  }, [])

  const clearMessages = useCallback(() => {
    setState((prev) => ({ ...prev, messages: [], error: null }))
  }, [])

  const updateLastAssistantMessage = useCallback((content: string, extras?: Partial<ChatMessage>) => {
    setState((prev) => {
      const messages = [...prev.messages]
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'assistant') {
          messages[i] = { ...messages[i], content, ...extras }
          break
        }
      }
      return { ...prev, messages }
    })
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    addMessage,
    setLoading,
    setError,
    clearMessages,
    updateLastAssistantMessage,
  }
}
