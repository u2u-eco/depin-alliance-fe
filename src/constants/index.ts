export const INIT_DATA =
  'query_id=AAHUsCYUAAAAANSwJhTcETII&user=%7B%22id%22%3A338079956%2C%22first_name%22%3A%22holden%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22HoldenFcode%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1724987005&hash=89db6fa85ca83715d2ad8ab245788c8271a3bf701e42eda8bfb740c012957348'
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
