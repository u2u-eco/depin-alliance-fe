import https from '@/constants/https'

export const loginTwitter = () => {
  return https.get('/twitter/login')
}

export const twitterCallback = () => {
  return https.get('/twitter/callback')
}

export const twitterInfo = () => {
  return https.get('/twitter/info')
}

export const twitterChangeAccount = () => {
  return https.get('/twitter/change-account')
}

export const twitterChangeAccountUrl = () => {
  return https.get('/twitter/url')
}
