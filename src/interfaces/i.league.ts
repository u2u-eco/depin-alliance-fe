export interface ILeagueItem {
  avatar: string
  code: string
  name: string
  totalContributors: number
  totalMining: number
  level: number
  isPendingRequest: boolean
}

export interface IUserLeague {
  avatar: string
  code: string
  inviteLink: string
  isOwner: boolean
  name: string
  level: number
  isPendingRequest: boolean
  totalContributors: number
  totalMining: number
  adminMiningPower: number
  adminUsername: string
  adminAvatar: string
  profit: number
  role: string
  point: number
  id: number
  adminId: number
}
export interface IUserConfig {
  maxDevice: number
  pointBuyDevice: number
  urlImage: string
}

export interface IUserSetting {
  enableMusicTheme: boolean
  enableNotification: boolean
  enableSoundEffect: boolean
}

export interface IJoinRequest {
  miningPower: number
  userId: number
  username: string
  avatar: string
  id?: number
  index?: number
}
