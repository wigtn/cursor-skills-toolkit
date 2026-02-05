import { useReducer, useCallback, useRef } from 'react'
import type { MotionCommand, MotionState, MotionQueueItem } from '../types/motion.types'

interface StateMachineState {
  currentState: MotionState
  queue: MotionQueueItem[]
  activeMotion: MotionQueueItem | null
  loopingMotion: MotionCommand | null
}

type Action =
  | { type: 'ENQUEUE'; command: MotionCommand }
  | { type: 'START_MOTION' }
  | { type: 'COMPLETE_STEP' }
  | { type: 'COMPLETE_MOTION' }
  | { type: 'INTERRUPT' }
  | { type: 'START_LOOP'; command: MotionCommand }
  | { type: 'STOP_LOOP' }

const initialState: StateMachineState = {
  currentState: 'idle',
  queue: [],
  activeMotion: null,
  loopingMotion: null,
}

function reducer(state: StateMachineState, action: Action): StateMachineState {
  switch (action.type) {
    case 'ENQUEUE':
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            command: action.command,
            startTime: 0,
            currentStep: 0,
            status: 'pending',
          },
        ],
      }

    case 'START_MOTION':
      if (state.queue.length === 0) return state
      const [next, ...rest] = state.queue
      return {
        ...state,
        currentState: 'executing',
        queue: rest,
        activeMotion: {
          ...next,
          status: 'active',
          startTime: Date.now(),
        },
      }

    case 'COMPLETE_STEP':
      if (!state.activeMotion) return state
      const nextStep = state.activeMotion.currentStep + 1
      if (nextStep >= state.activeMotion.command.steps.length) {
        return {
          ...state,
          currentState: 'idle',
          activeMotion: null,
        }
      }
      return {
        ...state,
        activeMotion: {
          ...state.activeMotion,
          currentStep: nextStep,
        },
      }

    case 'COMPLETE_MOTION':
      return {
        ...state,
        currentState: 'idle',
        activeMotion: null,
      }

    case 'START_LOOP':
      return {
        ...state,
        currentState: 'looping',
        loopingMotion: action.command,
        activeMotion: null,
      }

    case 'STOP_LOOP':
      return {
        ...state,
        currentState: 'idle',
        loopingMotion: null,
      }

    case 'INTERRUPT':
      return {
        ...state,
        currentState: 'idle',
        activeMotion: null,
        loopingMotion: null,
        queue: [],
      }

    default:
      return state
  }
}

export function useMotionState() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const callbacksRef = useRef<{
    onMotionStart?: (motion: MotionCommand) => void
    onMotionComplete?: (motion: MotionCommand) => void
    onStepChange?: (step: number, motion: MotionCommand) => void
  }>({})

  const enqueue = useCallback((command: MotionCommand) => {
    if (command.type === 'loop') {
      dispatch({ type: 'STOP_LOOP' })
      dispatch({ type: 'START_LOOP', command })
      callbacksRef.current.onMotionStart?.(command)
    } else {
      dispatch({ type: 'ENQUEUE', command })
      dispatch({ type: 'START_MOTION' })
    }
  }, [])

  const interrupt = useCallback(() => {
    dispatch({ type: 'INTERRUPT' })
  }, [])

  const stopLoop = useCallback(() => {
    if (state.loopingMotion) {
      callbacksRef.current.onMotionComplete?.(state.loopingMotion)
    }
    dispatch({ type: 'STOP_LOOP' })
  }, [state.loopingMotion])

  const completeStep = useCallback(() => {
    dispatch({ type: 'COMPLETE_STEP' })
  }, [])

  const completeMotion = useCallback(() => {
    dispatch({ type: 'COMPLETE_MOTION' })
  }, [])

  const setCallbacks = useCallback((callbacks: typeof callbacksRef.current) => {
    callbacksRef.current = callbacks
  }, [])

  return {
    state,
    enqueue,
    interrupt,
    stopLoop,
    completeStep,
    completeMotion,
    setCallbacks,
    isIdle: state.currentState === 'idle',
    isExecuting: state.currentState === 'executing',
    isLooping: state.currentState === 'looping',
    currentMotion: state.activeMotion?.command || state.loopingMotion,
    currentStep: state.activeMotion?.currentStep ?? 0,
  }
}
