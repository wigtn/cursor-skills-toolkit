// shared/constants.ts
// 모든 상수의 단일 소스(Single Source of Truth)입니다.

import type { StoneEmotion, CommandIntent, TerrariumItem } from './types';

// 환경변수 키
export const ENV_KEYS = {
  OPENAI_API_KEY: 'EXPO_PUBLIC_OPENAI_API_KEY',
  COIN_INTERVAL: 'EXPO_PUBLIC_COIN_INTERVAL',
  MAX_TOKENS: 'EXPO_PUBLIC_MAX_TOKENS',
  DEBUG: 'EXPO_PUBLIC_DEBUG',
  FORCE_2D_FALLBACK: 'EXPO_PUBLIC_FORCE_2D_FALLBACK',
} as const;

/**
 * API 키 검증 헬퍼
 */
export const isValidApiKey = (key: string | undefined): boolean => {
  if (!key) return false;
  if (key === 'YOUR_OPENAI_API_KEY') return false;
  if (key === 'sk-your-key-here') return false;
  if (key.length < 20) return false;
  return true;
};

// OpenAI 설정
export const OPENAI_CONFIG = {
  STT_MODEL: 'whisper-1',
  STT_ENDPOINT: 'https://api.openai.com/v1/audio/transcriptions',
  CHAT_MODEL: 'gpt-4o-mini',
  CHAT_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
  // 또봇 명령 해석
  ROBOT_MAX_TOKENS: 200,
  ROBOT_TEMPERATURE: 0.7,
  // 돌돌이 편지 생성
  LETTER_MAX_TOKENS: 300,
  LETTER_TEMPERATURE: 0.9,
  LANGUAGE: 'ko',
} as const;

// === 코인 경제 시스템 ===
export const COIN_CONFIG = {
  // 적립 간격 (ms) — 1분에 1코인
  EARN_INTERVAL_MS: 60_000,
  // 1회 적립량
  EARN_AMOUNT: 1,
  // 초기 코인 (데모용)
  INITIAL_COINS: 10,
  // 최대 보유량
  MAX_COINS: 9999,
} as const;

// === 편지 시스템 설정 ===
export const LETTER_CONFIG = {
  // 편지 도착 대기 시간 (ms) — 데모: 10초, 실제: 1~6시간
  DELIVERY_DELAY_DEMO_MS: 10_000,
  DELIVERY_DELAY_MIN_MS: 3_600_000,   // 1시간
  DELIVERY_DELAY_MAX_MS: 21_600_000,  // 6시간
  // 최대 보관 편지 수
  MAX_LETTERS: 50,
  // 대기 중 편지 최대 수
  MAX_PENDING: 3,
} as const;

// === 아이템 카탈로그 ===
export const ITEM_CATALOG: TerrariumItem[] = [
  // 환경 아이템
  { id: 'moss', name: '이끼', category: 'environment', price: 5, description: '부드러운 초록 이끼', emotionEffect: 'calm' },
  { id: 'pebbles', name: '색자갈', category: 'environment', price: 3, description: '예쁜 색깔 자갈 모음', emotionEffect: null },
  { id: 'flower', name: '작은 꽃', category: 'environment', price: 8, description: '귀여운 분홍 꽃', emotionEffect: 'happy' },
  { id: 'mushroom', name: '버섯', category: 'environment', price: 10, description: '빨간 점박이 버섯', emotionEffect: null },
  { id: 'mini-tree', name: '미니 나무', category: 'environment', price: 15, description: '작은 상록수', emotionEffect: 'calm' },
  { id: 'crystal', name: '수정', category: 'environment', price: 20, description: '반짝이는 수정', emotionEffect: 'excited' },
  // 도구 아이템
  { id: 'broom', name: '빗자루', category: 'tool', price: 12, description: '또봇의 청소 도구' },
  { id: 'watering-can', name: '물뿌리개', category: 'tool', price: 10, description: '또봇의 물주기 도구' },
  // 장식 아이템
  { id: 'top-hat', name: '실크 모자', category: 'wearable', price: 15, description: '우아한 검정 모자', wearableTarget: 'stone' },
  { id: 'flower-crown', name: '꽃 왕관', category: 'wearable', price: 12, description: '귀여운 꽃 왕관', wearableTarget: 'stone' },
  { id: 'sunglasses', name: '선글라스', category: 'wearable', price: 8, description: '쿨한 선글라스', wearableTarget: 'stone' },
  { id: 'scarf', name: '스카프', category: 'wearable', price: 10, description: '따뜻한 빨간 스카프', wearableTarget: 'robot' },
  { id: 'party-hat', name: '파티모자', category: 'wearable', price: 8, description: '생일파티 모자', wearableTarget: 'robot' },
] as const;

/**
 * 아이템 ID로 아이템 찾기
 */
export const getItemById = (id: string): TerrariumItem | undefined => {
  return ITEM_CATALOG.find(item => item.id === id);
};

/**
 * 카테고리별 아이템 필터
 */
export const getItemsByCategory = (category: TerrariumItem['category']): TerrariumItem[] => {
  return ITEM_CATALOG.filter(item => item.category === category);
};

// 로봇(또봇) 이모지 허용 목록
export const ROBOT_EMOJIS = [
  '🤖', '🔧', '💧', '🌸', '🌿',
  '✨', '💪', '👍', '🎵', '😊',
  '🧹', '🎩', '🪙',
] as const;

// 더미 STT 문장 (API 키 없을 때)
export const DUMMY_STT_SENTENCES = [
  '안녕! 반가워!',
  '돌돌이 닦아줘',
  '잡초 좀 뽑아줘',
  '나무에 물 줘',
  '돌돌이 어때?',
  '꽃 심어줘',
  '춤 춰봐!',
  '모자 씌워줘',
  '바닥 좀 쓸어줘',
  '돌돌이야 오늘 좀 힘들었어',
] as const;

// 로봇(또봇) 폴백 응답 (API 에러 시)
export const ROBOT_FALLBACK_RESPONSES = [
  '앗, 잠깐 멍해졌어요... 다시 말해주실래요? 🤖',
  '네네! 지금 바로 할게요~ 💪',
  '돌돌이가 좋아할 것 같아요! ✨',
  '알겠습니다! 테라리움을 잘 관리할게요 🌿',
  '제가 열심히 돌볼게요~ 😊',
] as const;

// 돌돌이 감정별 메시지
export const STONE_EMOTION_MESSAGES: Record<StoneEmotion, string[]> = {
  calm: ['돌돌이가 평온해 보여요 😌', '돌돌이가 편안하게 쉬고 있어요~'],
  happy: ['돌돌이가 기뻐하고 있어요! 😊', '돌돌이가 활짝 웃고 있어요~'],
  sad: ['돌돌이가 좀 슬퍼 보여요... 🥺', '돌돌이 기운이 없네요...'],
  excited: ['돌돌이가 신나하고 있어요! 🎉', '돌돌이가 엄청 좋아해요!'],
  sleepy: ['돌돌이가 졸려 보여요 😴', '돌돌이가 꾸벅꾸벅 졸고 있어요~'],
} as const;

// 명령 의도별 예시
export const COMMAND_EXAMPLES: Record<CommandIntent, string[]> = {
  care: ['돌돌이 닦아줘', '잡초 뽑아줘', '물 줘', '바닥 쓸어줘'],
  decorate: ['꽃 심어줘', '예쁘게 꾸며줘'],
  equip: ['모자 씌워줘', '선글라스 끼워줘', '스카프 입혀줘'],
  status: ['돌돌이 어때?', '상태 확인해줘', '기분이 어때?'],
  chat: ['안녕!', '오늘 하루 어땠어?'],
  special: ['춤 춰줘!', '인사해줘'],
} as const;

// 편지 폴백 응답 (API 에러 시)
export const LETTER_FALLBACK_RESPONSES = [
  '네가 와줘서 오늘도 나는 행복해. 고마워. - 돌돌이 💌',
  '네 목소리를 들으니까 기분이 좋아졌어. 매번 닦아줘서 고마워. - 돌돌이 🪨',
  '나는 여기서 네가 오길 기다려. 와줘서 항상 고맙다. - 돌돌이 ✨',
  '네가 힘들다고 했지? 나도 걱정돼. 근데 네가 있어서 난 괜찮아. - 돌돌이 💌',
  '오늘도 나를 돌봐줘서 고마워. 넌 정말 멋진 사람이야. - 돌돌이 🌿',
] as const;

// WebView URL
export const WEB_URLS = {
  DEV_IOS: (ip: string) => `http://${ip}:5173`,
  DEV_ANDROID: 'http://10.0.2.2:5173',
  DEV_DEFAULT: 'http://localhost:5173',
  PRODUCTION: 'https://your-deployed-url.com',
} as const;

// 오디오 설정
export const AUDIO_CONFIG = {
  FORMAT: 'audio/m4a',
  FILENAME: 'recording.m4a',
  MAX_DURATION_SECONDS: 30,
  MAX_FILE_SIZE_MB: 25,
} as const;

// === Rate Limiting 설정 ===
export const RATE_LIMIT = {
  API_CALLS_PER_MINUTE: 10,
  API_CALLS_PER_DAY: 500,
  MIN_REQUEST_INTERVAL_MS: 1000,
  API_TIMEOUT_MS: 15000,
  STT_TIMEOUT_MS: 10000,
} as const;

// === 성능 목표 ===
export const PERFORMANCE_TARGETS = {
  MIN_FPS: 30,
  TARGET_FPS: 60,
  STT_RESPONSE_MS: 3000,
  CHAT_RESPONSE_MS: 5000,
  MAX_INITIAL_LOAD_MS: 10000,
} as const;

// === 입력 검증 ===
export const INPUT_VALIDATION = {
  MAX_TEXT_LENGTH: 500,
  MAX_MESSAGE_LENGTH: 200,
  ALLOWED_CHARS_REGEX: /^[\p{L}\p{N}\p{Emoji}\s.,!?'"()\-~]+$/u,
} as const;

// 텍스트 검증 헬퍼
export const validateText = (text: string): boolean => {
  if (!text || text.length === 0) return false;
  if (text.length > INPUT_VALIDATION.MAX_TEXT_LENGTH) return false;
  return INPUT_VALIDATION.ALLOWED_CHARS_REGEX.test(text);
};

// 텍스트 살균 헬퍼
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  const trimmed = text.slice(0, INPUT_VALIDATION.MAX_TEXT_LENGTH);
  return trimmed.replace(/\s+/g, ' ').trim();
};

// === 보안 설정 ===
export const SECURITY = {
  ALLOWED_ORIGINS_DEV: ['localhost', '127.0.0.1'],
  ALLOWED_ORIGINS_PROD: ['https://your-domain.com'],
  VALIDATE_MESSAGE_ORIGIN: true,
} as const;
