export type IUser = {
  code: string
  userId: number
  username: string
  twitterId: number | null
  twitterUsername: string | null
  twitterAvatar: string | null
  twitterFollower: number
  twitterFollowing: number
  twitterFavouries: number
  twitterBlue: boolean
  twitterCreationDate: Date | string | null
  point: number
  isPremium: boolean
  referral: string | null
  isDev: boolean
  isAdmin: boolean | undefined
}

export type ITwitter = {
  creation_date: Date | string
  user_id: string
  username: string
  name: string
  follower_count: number
  following_count: number
  favourites_count: number
  is_verified: boolean
  is_blue_verified: boolean
  profile_pic_url: string
  profile_banner_url: string
  description: string
  number_of_tweets: number
  bot: boolean
  timestamp: number
  has_nft_avatar: boolean
  default_profile: boolean
  default_profile_image: boolean
  listed_count: number
}

export type IUserAuthReq = {
  initData: string
}

export type IUserInfo = {
  code: string
  username: string
  status: string
  miningPower: number
  pointSkill: number
  maximumPower: number
  point: number
  pointUnClaimed: number
  xp: number
  avatar: null | string
  level: number
  lastLoginTime: number
  timeStartMining: number
  lastCheckin: number
  totalDevice: number
  xpLevelFrom: number
  xpLevelTo: number
  rateBonusReward: number
  ratePurchase: number
  detectDevice: string
  devicePlatform: string
  pointBonus: number
  isPremium: boolean
  currentTime: number
}

export enum CURRENT_STATUS {
  DETECTED_DEVICE_INFO = 'DETECTED_DEVICE_INFO',
  STARTED = 'STARTED',
  CLAIMED = 'CLAIMED',
  MINING = 'MINING'
}

export type IDeviceItem = {
  type: string
  name: string
  point: number
}

export interface IFriendItem {
  avatar: string
  pointRef: number
  username: string
}

export interface ISkillItem {
  skillId: number
  name: string
  levelCurrent: number
  maxLevel: number
  timeWaiting: number
}

export interface IUserLevel {
  level: number
  lock: boolean
  maxDevice: number
  xp: number
  maximumPower: number
  xpLevelFrom: number
  xpLevelTo: number
  pointSkill: number
  isCurrent?: boolean
}

export interface IRankingItem {
  avatar: string
  miningPower: number
  username: string
  pointEarned?: number
  rank?: number
}
