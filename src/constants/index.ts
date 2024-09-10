export const INIT_DATA =
  'query_id=AAHmoDEdAAAAAOagMR0UHKF_&user=%7B%22id%22%3A485933738%2C%22first_name%22%3A%22Huong%22%2C%22last_name%22%3A%22Vu%22%2C%22username%22%3A%22huongseven%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1724927681&hash=fe7021f9be70394551516a3fb24638c906d54bf050b03b52f7129ffb70111540'
// 'query_id=AAHuJzgIAwAAAO4nOAi9qWY9&user=%7B%22id%22%3A6580348910%2C%22first_name%22%3A%22%C4%90%E1%BB%97%22%2C%22last_name%22%3A%22%C4%90%E1%BB%A9c%22%2C%22username%22%3A%22ducdt09%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725610171&hash=293ee6319d77fa7adb5904313854fac8cfc3462645defb1ddfd7f97e7988167a'
// 'query_id=AAH3QkxmAAAAAPdCTGZl4JP4&user=%7B%22id%22%3A3716229911%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22H%C6%B0ng%22%2C%22username%22%3A%22gnuhdz%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725847246&hash=22b2e0a7820868aaf5c56d657fe90962a30acc7a83e08c9f160e3c1ea25d61e6'

export const TOKEN = 'depin-alliance-tk'
export const CURRENT_STATUS = 'depin-alliance-user-status'
export const TELE_URI = process.env.NEXT_PUBLIC_TELE_URI
export const DETECT_DEVICE_URL = 'https://device.depinalliance.xyz'
export const SHARE_URL = process.env.NEXT_PUBLIC_SHARE_URL
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

export const LIST_TYPE = {
  MISSION: 'mission',
  SKILL: 'skill',
  RANKING: 'ranking',
  PARTNERS: 'partners'
}

export const FILTER_TYPE = {
  FILTER: 'FILTER',
  SORT: 'SORT'
}

export const TYPE_MISSION = {
  BOX: 'BOX'
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
