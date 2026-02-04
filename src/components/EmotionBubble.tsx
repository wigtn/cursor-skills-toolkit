import { useState, useEffect } from 'react'
import './EmotionBubble.css'

interface EmotionBubbleProps {
  emotion: 'calm' | 'excited'
  visible: boolean
}

export function EmotionBubble({ emotion, visible }: EmotionBubbleProps) {
  const [displayText, setDisplayText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const emotionText = emotion === 'excited' ? '..!' : '...'

  useEffect(() => {
    if (!visible) {
      setDisplayText('')
      return
    }

    setIsAnimating(true)
    setDisplayText('')

    // 한 글자씩 타이핑 효과
    let index = 0
    const interval = setInterval(() => {
      if (index < emotionText.length) {
        setDisplayText(emotionText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, emotion === 'excited' ? 150 : 300)

    return () => clearInterval(interval)
  }, [emotion, visible, emotionText])

  if (!visible) return null

  return (
    <div className={`emotion-bubble ${emotion} ${isAnimating ? 'animating' : ''}`}>
      <span className="emotion-text">{displayText}</span>
      <div className="bubble-tail" />
    </div>
  )
}
