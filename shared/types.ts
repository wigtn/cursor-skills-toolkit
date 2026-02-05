// shared/types.ts
// 모든 타입의 단일 소스(Single Source of Truth)입니다.
// 다른 파일에서 타입을 재정의하지 마세요. 반드시 import하여 사용하세요.

// === 캐릭터 이름 ===
export const ROBOT_NAME = '또봇' as const;
export const STONE_NAME = '돌돌이' as const;

// === 로봇 애니메이션 ===
export const ROBOT_ANIMATIONS = [
  'Idle', 'Walking', 'Running', 'Dance', 'Death',
  'Sitting', 'Standing', 'Jump', 'Yes', 'No',
  'Wave', 'Punch', 'ThumbsUp',
] as const;

export type RobotAnimation = typeof ROBOT_ANIMATIONS[number];

// === 돌돌이 감정 ===
// calm: 평온한 상태 (기본)
// happy: 기쁜 상태
// sad: 슬픈 상태
// excited: 신나는 상태
// sleepy: 졸린 상태
export type StoneEmotion = 'calm' | 'happy' | 'sad' | 'excited' | 'sleepy';

export interface StoneState {
  readonly emotion: StoneEmotion;
  readonly lastInteraction: number; // timestamp
  readonly name: typeof STONE_NAME; // 항상 '돌돌이'
}

/**
 * 돌돌이 감정 전환 트리거
 * 특정 키워드 감지 시 감정 변화
 */
export const STONE_EMOTION_TRIGGERS: Record<StoneEmotion, string[]> = {
  happy: ['좋아', '최고', '기뻐', '행복', '신나', '예쁘', '귀여'],
  sad: ['슬퍼', '힘들', '지쳐', '우울', '외로'],
  excited: ['와', '대박', '짱', '멋져', '굿'],
  sleepy: ['피곤', '졸려', '잘래', '쉬고'],
  calm: ['편안', '조용', '힐링', '평화'],
} as const;

// === 로봇 액션 (10개 워크플로우 + idle) ===
export type RobotAction =
  | 'clean'          // 돌 닦아주기
  | 'weed'           // 잡초 뽑기
  | 'water'          // 나무에 물주기
  | 'plant_flower'   // 꽃 심기
  | 'sweep'          // 바닥 쓸기
  | 'check_status'   // 돌돌이 상태 확인
  | 'decorate'       // 테라리움 꾸미기
  | 'equip_item'     // 아이템 장착
  | 'dance'          // 춤추기
  | 'wave'           // 인사하기
  | 'idle';          // 대기

// === 명령 의도 ===
export type CommandIntent =
  | 'care'      // 돌봄 (닦기, 물주기, 잡초, 쓸기)
  | 'decorate'  // 꾸미기 (꽃 심기, 아이템 배치)
  | 'equip'     // 장착 (모자, 안경, 스카프 등)
  | 'status'    // 상태 확인
  | 'special'   // 특별 명령 (춤, 인사)
  | 'chat';     // 일반 대화

// === 명령 결과 ===
export interface CommandResult {
  readonly intent: CommandIntent;
  readonly action: RobotAction | null;
  readonly item: string | null; // 아이템 ID (예: 'top-hat', 'flower')
  readonly response: string; // 사용자에게 보여줄 응답 (50자 이내)
  readonly stoneEmotionChange?: StoneEmotion | null;
}

// === 로봇 액션 → 애니메이션 매핑 ===
export const ACTION_TO_ANIMATION: Record<RobotAction, RobotAnimation> = {
  clean: 'Walking',
  weed: 'Punch',
  water: 'Walking',
  plant_flower: 'ThumbsUp',
  sweep: 'Walking',
  check_status: 'Idle',
  decorate: 'Dance',
  equip_item: 'Walking',
  dance: 'Dance',
  wave: 'Wave',
  idle: 'Idle',
} as const;

// === 워크플로우 정보 (UI용) ===
export interface WorkflowInfo {
  readonly action: RobotAction;
  readonly name: string;
  readonly emoji: string;
  readonly category: CommandIntent;
  readonly defaultEmotion: StoneEmotion | null;
}

export const WORKFLOWS: WorkflowInfo[] = [
  { action: 'clean', name: '돌 닦아주기', emoji: '🧹', category: 'care', defaultEmotion: 'happy' },
  { action: 'weed', name: '잡초 뽑기', emoji: '🌿', category: 'care', defaultEmotion: 'calm' },
  { action: 'water', name: '나무에 물주기', emoji: '💧', category: 'care', defaultEmotion: 'happy' },
  { action: 'plant_flower', name: '꽃 심기', emoji: '🌸', category: 'decorate', defaultEmotion: 'excited' },
  { action: 'sweep', name: '바닥 쓸기', emoji: '🧹', category: 'care', defaultEmotion: 'calm' },
  { action: 'check_status', name: '상태 확인', emoji: '🔍', category: 'status', defaultEmotion: null },
  { action: 'decorate', name: '테라리움 꾸미기', emoji: '✨', category: 'decorate', defaultEmotion: 'excited' },
  { action: 'equip_item', name: '아이템 장착', emoji: '🎩', category: 'equip', defaultEmotion: 'happy' },
  { action: 'dance', name: '춤추기', emoji: '💃', category: 'special', defaultEmotion: 'excited' },
  { action: 'wave', name: '인사하기', emoji: '👋', category: 'special', defaultEmotion: 'happy' },
] as const;

/**
 * 텍스트에서 명령 의도 판별 헬퍼 함수
 * @param text - 사용자 입력 텍스트
 * @returns 판별된 CommandIntent (기본값: 'chat')
 */
export const detectCommandIntent = (text: string): CommandIntent => {
  const lowerText = text.toLowerCase();

  // 장착 명령
  if (['씌워', '입혀', '끼워', '장착', '착용', '모자', '안경', '스카프'].some(k => lowerText.includes(k))) {
    return 'equip';
  }

  // 꾸미기 명령
  if (['꽃', '심어', '나무', '돌', '장식', '꾸며', '배치'].some(k => lowerText.includes(k))) {
    return 'decorate';
  }

  // 돌봄 명령
  if (['물', '청소', '닦아', '정리', '돌봐', '잡초', '뽑아', '쓸어', '쓸어줘'].some(k => lowerText.includes(k))) {
    return 'care';
  }

  // 상태 확인
  if (['상태', '어때', '기분', '확인', '알려'].some(k => lowerText.includes(k))) {
    return 'status';
  }

  // 특별 명령
  if (['춤', '인사', '안녕', '반가'].some(k => lowerText.includes(k))) {
    return 'special';
  }

  // 기본값: 일반 대화
  return 'chat';
};

/**
 * 텍스트에서 돌돌이 감정 변화 감지
 * @param text - 사용자 입력 텍스트
 * @returns 감지된 StoneEmotion 또는 undefined
 */
export const detectStoneEmotion = (text: string): StoneEmotion | undefined => {
  const lowerText = text.toLowerCase();

  for (const [emotion, keywords] of Object.entries(STONE_EMOTION_TRIGGERS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return emotion as StoneEmotion;
      }
    }
  }

  return undefined;
};

// === 아이템 카테고리 ===
export type ItemCategory = 'environment' | 'tool' | 'wearable';
export type WearableTarget = 'stone' | 'robot';

// === 테라리움 아이템 ===
export interface TerrariumItem {
  readonly id: string;
  readonly name: string;
  readonly category: ItemCategory;
  readonly price: number;
  readonly description: string;
  readonly emotionEffect?: StoneEmotion | null;
  readonly wearableTarget?: WearableTarget; // 장식 아이템만
}

// === 편지 ===
export interface Letter {
  readonly id: string;
  readonly userMessage: string;  // 사용자가 한 말
  readonly content: string;      // 돌돌이 답장
  readonly receivedAt: number;   // timestamp
  readonly isRead: boolean;
}

export interface PendingLetter {
  readonly id: string;
  readonly userMessage: string;
  readonly createdAt: number;
  readonly deliverAt: number;    // 도착 예정 timestamp
}

// === 게임 상태 ===
export interface GameState {
  // 코인
  readonly coins: number;

  // 인벤토리 (구매한 아이템 ID 목록)
  readonly inventory: string[];

  // 적용된 아이템
  readonly placedItems: string[];    // 환경 아이템
  readonly equippedStone: string[];  // 돌돌이 착용
  readonly equippedRobot: string[];  // 또봇 착용

  // 돌돌이 상태
  readonly stoneEmotion: StoneEmotion;
  readonly lastInteraction: number; // timestamp

  // 편지
  readonly letters: Letter[];
  readonly pendingLetters: PendingLetter[];

  // 통계
  readonly totalCoinsEarned: number;
  readonly totalCommandsGiven: number;
  readonly totalLettersReceived: number;

  // 또봇 상태
  readonly currentAnimation: RobotAnimation;
  readonly lastInputText: string | null;
}

// === 채팅 ===
export interface ChatMessage {
  readonly id: string;
  readonly role: 'user' | 'robot';
  readonly content: string;
  readonly timestamp: number;
  readonly action?: RobotAction; // 수행된 워크플로우
}

// === 애니메이션 정보 (UI용) ===
export interface AnimationInfo {
  readonly emoji: string;
  readonly name: string;
}

export const ANIMATION_INFO: Record<RobotAnimation, AnimationInfo> = {
  Idle: { emoji: '😌', name: '대기' },
  Walking: { emoji: '🚶', name: '걷기' },
  Running: { emoji: '🏃', name: '달리기' },
  Dance: { emoji: '💃', name: '춤추기' },
  Jump: { emoji: '🦘', name: '점프' },
  Wave: { emoji: '👋', name: '인사' },
  Yes: { emoji: '👍', name: '좋아요' },
  No: { emoji: '🙅', name: '싫어요' },
  ThumbsUp: { emoji: '👍', name: '엄지척' },
  Punch: { emoji: '👊', name: '펀치' },
  Death: { emoji: '😵', name: '기절' },
  Sitting: { emoji: '🪑', name: '앉기' },
  Standing: { emoji: '🧍', name: '일어서기' },
} as const;
