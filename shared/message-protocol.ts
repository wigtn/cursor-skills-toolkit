// shared/message-protocol.ts
// WebView <-> Native 통신의 유일한 계약입니다.
// 메시지 수신 시 반드시 타입 검증(type guard) 사용!

import type { CommandIntent, RobotAction, StoneEmotion } from './types';

// === Native -> WebView 메시지 타입 ===
export type NativeToWebMessageType =
  | 'RECORDING_START'
  | 'VOICE_RESULT'
  | 'TEXT_INPUT'
  | 'APP_STATE_CHANGED';

// === WebView -> Native 메시지 타입 ===
export type WebToNativeMessageType =
  | 'READY'
  | 'ANIMATION_CHANGED'
  | 'ROBOT_RESPONSE'
  | 'STONE_EMOTION_CHANGED'
  | 'LETTER_READY';            // 편지 생성 완료

// === 메시지 구조 ===
export interface BridgeMessage<T = unknown> {
  readonly type: NativeToWebMessageType | WebToNativeMessageType;
  readonly payload: T;
}

// === 페이로드 타입 ===
export interface VoiceResultPayload {
  readonly text: string;
}

export interface TextInputPayload {
  readonly text: string;
}

export interface AnimationChangedPayload {
  readonly animation: string;
}

export interface AppStateChangedPayload {
  readonly state: 'foreground' | 'background';
}

export interface RobotResponsePayload {
  readonly text: string;
  readonly action?: RobotAction | null;
  readonly intent?: CommandIntent;
}

export interface StoneEmotionChangedPayload {
  readonly emotion: StoneEmotion;
  readonly previousEmotion?: StoneEmotion;
}

export interface LetterReadyPayload {
  readonly content: string;    // 편지 본문
  readonly from: string;       // '돌돌이'
  readonly userMessage: string; // 사용자가 한 말 (원문)
}

// === Native -> WebView 전송 ===
// webViewRef.current.injectJavaScript(
//   `window.postMessage(JSON.stringify({type, payload}), '*'); true;`
// )

// === WebView -> Native 전송 ===
// window.ReactNativeWebView?.postMessage(JSON.stringify({type, payload}))

// === WebView에서 수신 ===
// window.addEventListener('message', (event) => {
//   const data = JSON.parse(event.data);
//   switch(data.type) { ... }
// })

// === 타입 가드 함수 (필수 사용!) ===

export function isBridgeMessage(data: unknown): data is BridgeMessage {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return typeof obj.type === 'string' && 'payload' in obj;
}

export function safeParseBridgeMessage(jsonString: string): BridgeMessage | null {
  try {
    const data = JSON.parse(jsonString);
    if (isBridgeMessage(data)) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export function isNativeToWebMessage(type: string): type is NativeToWebMessageType {
  return ['RECORDING_START', 'VOICE_RESULT', 'TEXT_INPUT', 'APP_STATE_CHANGED'].includes(type);
}

export function isWebToNativeMessage(type: string): type is WebToNativeMessageType {
  return ['READY', 'ANIMATION_CHANGED', 'ROBOT_RESPONSE', 'STONE_EMOTION_CHANGED', 'LETTER_READY'].includes(type);
}

export function isVoiceResultPayload(payload: unknown): payload is VoiceResultPayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return typeof obj.text === 'string' && obj.text.length > 0;
}

export function isTextInputPayload(payload: unknown): payload is TextInputPayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return typeof obj.text === 'string' && obj.text.length > 0;
}

export function isAnimationChangedPayload(payload: unknown): payload is AnimationChangedPayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return typeof obj.animation === 'string';
}

export function isRobotResponsePayload(payload: unknown): payload is RobotResponsePayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return typeof obj.text === 'string';
}

export function isStoneEmotionChangedPayload(payload: unknown): payload is StoneEmotionChangedPayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  const validEmotions = ['calm', 'happy', 'sad', 'excited', 'sleepy'];
  return typeof obj.emotion === 'string' && validEmotions.includes(obj.emotion);
}

export function isLetterReadyPayload(payload: unknown): payload is LetterReadyPayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return typeof obj.content === 'string' && typeof obj.from === 'string';
}

// === 메시지 큐 (순차 처리용) ===
export interface MessageQueueItem {
  readonly message: BridgeMessage;
  readonly timestamp: number;
  readonly processed: boolean;
}

// === 앱 상태 머신 ===
export type AppMessageState =
  | 'IDLE'
  | 'RECORDING'
  | 'PROCESSING_STT'
  | 'PROCESSING_TEXT'
  | 'PROCESSING_AI'
  | 'ANIMATING';

export const MESSAGE_STATE_TRANSITIONS: Record<AppMessageState, AppMessageState[]> = {
  IDLE: ['RECORDING', 'PROCESSING_TEXT'],
  RECORDING: ['IDLE', 'PROCESSING_STT'],
  PROCESSING_STT: ['IDLE', 'PROCESSING_AI'],
  PROCESSING_TEXT: ['IDLE', 'PROCESSING_AI'],
  PROCESSING_AI: ['IDLE', 'ANIMATING'],
  ANIMATING: ['IDLE'],
};

export function canTransition(current: AppMessageState, next: AppMessageState): boolean {
  return MESSAGE_STATE_TRANSITIONS[current].includes(next);
}
