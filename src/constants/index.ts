export const INIT_DATA =
  'query_id=AAHmoDEdAAAAAOagMR0UHKF_&user=%7B%22id%22%3A489791718%2C%22first_name%22%3A%22Huong%22%2C%22last_name%22%3A%22Vu%22%2C%22username%22%3A%22huongseven%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1724927681&hash=fe7021f9be70394551516a3fb24638c906d54bf050b03b52f7129ffb70111540'
export const TOKEN = 'depin-alliance-tk'
export const TELE_URI = process.env.NEXT_PUBLIC_TELE_URI
export const UPGRADE_TAB = {
  RAM: 'RAM',
  CPU: 'CPU',
  GPU: 'GPU',
  STORAGE: 'STORAGE'
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
  RANKING: 'ranking'
}
