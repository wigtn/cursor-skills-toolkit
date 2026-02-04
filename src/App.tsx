import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { ROBOT_ANIMATIONS } from './components/Robot'
import type { RobotAnimation } from './components/Robot'
import './App.css'

// 애니메이션별 이모지와 한글 이름
const animationInfo: Record<string, { emoji: string; name: string }> = {
  Idle: { emoji: '😐', name: '가만히' },
  Walking: { emoji: '🚶', name: '걷기' },
  Running: { emoji: '🏃', name: '달리기' },
  Dance: { emoji: '💃', name: '춤추기' },
  Jump: { emoji: '🦘', name: '점프' },
  Wave: { emoji: '👋', name: '인사' },
  Yes: { emoji: '👍', name: '네' },
  No: { emoji: '🙅', name: '아니' },
  ThumbsUp: { emoji: '👍', name: '최고' },
  Punch: { emoji: '👊', name: '펀치' },
  Death: { emoji: '😵', name: '쓰러짐' },
  Sitting: { emoji: '🪑', name: '앉기' },
  Standing: { emoji: '🧍', name: '일어나기' },
}

function App() {
  const [animation, setAnimation] = useState<RobotAnimation>('Idle')

  return (
    <div className="app">
      {/* 3D 캔버스 */}
      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 45 }}
        style={{ background: 'linear-gradient(180deg, #e8f4f8 0%, #d4e8ed 100%)' }}
      >
        <Suspense fallback={null}>
          <Scene animation={animation} />
        </Suspense>
      </Canvas>

      {/* 타이틀 */}
      <div className="title">
        <h1>로봇 버디</h1>
        <p>애니메이션을 선택해보세요</p>
      </div>

      {/* 현재 상태 표시 */}
      {/* <div className="current-state">
        <span className="state-emoji">{animationInfo[animation]?.emoji || '🤖'}</span>
        <span className="state-name">{animationInfo[animation]?.name || animation}</span>
      </div> */}

      {/* 애니메이션 선택 버튼들 */}
      <div className="animation-controls">
        {ROBOT_ANIMATIONS.map((anim) => (
          <button
            key={anim}
            className={`anim-btn ${animation === anim ? 'active' : ''}`}
            onClick={() => setAnimation(anim)}
          >
            <span className="anim-emoji">{animationInfo[anim]?.emoji || '🤖'}</span>
            <span className="anim-name">{animationInfo[anim]?.name || anim}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
