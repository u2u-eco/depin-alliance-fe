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
