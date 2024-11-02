export const INIT_DATA = process.env.NEXT_PUBLIC_INIT_DATA || null
// 'query_id=AAHmoDEdAAAAAOagMR0UHKF_&user=%7B%22id%22%3A485933738%2C%22first_name%22%3A%22Huong%22%2C%22last_name%22%3A%22Vu%22%2C%22username%22%3A%22huongseven%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1724927681&hash=fe7021f9be70394551516a3fb24638c906d54bf050b03b52f7129ffb70111540'
// 'query_id=AAHuJzgIAwAAAO4nOAi9qWY9&user=%7B%22id%22%3A6580348910%2C%22first_name%22%3A%22%C4%90%E1%BB%97%22%2C%22last_name%22%3A%22%C4%90%E1%BB%A9c%22%2C%22username%22%3A%22ducdt09%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725610171&hash=293ee6319d77fa7adb5904313854fac8cfc3462645defb1ddfd7f97e7988167a'
// 'query_id=AAH3QkxmAAAAAPdCTGZl4JP4&user=%7B%22id%22%3A3416229911%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22H%C6%B0ng%22%2C%22username%22%3A%22gnuhdz%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725847246&hash=22b2e0a7820868aaf5c56d657fe90962a30acc7a83e08c9f160e3c1ea25d61e6'

export const TOKEN = 'depin-alliance-tk'
export const CURRENT_STATUS = 'depin-alliance-user-status'
export const TELE_URI = process.env.NEXT_PUBLIC_TELE_URI
export const DETECT_DEVICE_URL = process.env.NEXT_PUBLIC_DEVICE_REGISTER // 'https://device.depinalliance.xyz'
export const SHARE_URL = process.env.NEXT_PUBLIC_SHARE_URL
export const DISABLE_CHECK_TASK_U2U = process.env.NEXT_PUBLIC_DISABLE_CHECK_TASK_U2U
export const IS_ONLY_SUPPORT_MOBILE =
  process.env.NEXT_PUBLIC_ONLY_SUPPORT_MOBILE === 'true' ? true : false
export const PAGE_SIZE = 10
export const MAX_SIZE_PER_PAGE = 10
export const HIDE_COMPLETED_PARTNER = 't-depin-hide-completed-task'
export const DEPIN_CONFIG = 't-depin-alliance-config'
export const DEPIN_GUIDE = 't-depin-show-guide-status'
export const DEPIN_MAP_GUIDE = 't-depin-is-show-map-guide-status'
export const BUTTON_TYPE = {
  CANCEL: 'CANCEL',
  SUCCESS: 'SUCCESS',
  DEFAULT: 'DEFAULT'
}
export const UPGRADE_TAB = {
  RAM: 'RAM',
  CPU: 'CPU',
  GPU: 'GPU',
  STORAGE: 'STORAGE',
  SPECIAL: 'SPECIAL'
}

export const QUERY_CONFIG = {
  retry: 3,
  retryDelay: 3000,
  refetchOnMount: true,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false
}

export const MAX_SIZE_UPLOAD = 20000000
export const SETTING_TYPE = {
  NOTIFICATION: 'NOTIFICATION',
  MUSIC_THEME: 'MUSIC_THEME',
  SOUND_EFFECT: 'SOUND_EFFECT',
  WALLET: 'WALLET',
  WALLET_TON: 'WALLET_TON',
  WALLET_CONNECT: 'WALLET_CONNECT',
  WALLET_OKX_EVM: 'WALLET_OKX_EVM',
  WALLET_OKX_TON: 'WALLET_OKX_TON',
  WALLET_BITGET: 'WALLET_BITGET',
  LANGUAGE: 'LANGUAGE',
  FEEDBACK: 'FEEDBACK',
  LOGOUT: 'LOGOUT'
}

export const LIST_TYPE = {
  MISSION: 'mission',
  SKILL: 'skill',
  RANKING: 'ranking',
  PARTNERS: 'partners',
  LEAGUE: 'league',
  RESEARCH: 'research'
}

export const FILTER_TYPE = {
  FILTER: 'FILTER',
  SORT: 'SORT'
}

export const MAP_TYPE = {
  EUROPE: 'europe',
  ASIA: 'asia',
  AFRICA: 'africa',
  OCEANIA: 'oceania',
  ANTARCTICA: 'antarctica',
  AMERICA: 'america',
  NORTH_AMERICA: 'north america',
  SOUTH_AMERICA: 'south america'
}

export const FUNDING_TYPE = 'funding'

export const TYPE_MISSION = {
  BOX: 'BOX'
}

export const ROLE_LEAGUE = {
  ADMIN_REQUEST: 'ADMIN_REQUEST',
  ADMIN_KICK: 'ADMIN_KICK'
}

export const LIST_STATUS_MISSION = {
  DONE: 'DONE',
  CHECK: 'CHECK',
  VERIFY: 'VERIFY',
  LINK: 'LINK'
}

export const MISSION_STATUS = {
  VERIFIED: 'VERIFIED',
  CLAIMED: 'CLAIMED'
}
