export const INIT_DATA =
  'query_id=AAHUsCYUAAAAANSwJhQvpLh6&user=%7B%22id%22%3A489791718%2C%22first_name%22%3A%22holden%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Steven%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1723523006&hash=1c334d2c346c471cd21c2aa3e0e4fd6e555fa2179892b9f06dcddddef77e7356'
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
