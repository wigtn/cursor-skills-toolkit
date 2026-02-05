export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  motionTriggered?: boolean
  emotion?: string
}

export interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
}
