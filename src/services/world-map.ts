import https from '../constants/https'

export const getItemWorldMap = (type: string) => {
  return https.get(`/world-map/item/${type}`)
}
