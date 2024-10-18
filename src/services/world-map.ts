import { IUpdateWorldMap } from '@/interfaces/i.world-map'
import https from '../constants/https'

export const getItemWorldMap = (type: string) => {
  return https.get(`/world-map/item/${type}`)
}

export const getWorldMap = () => {
  return https.get(`/world-map`)
}

export const createMap = (data: IUpdateWorldMap) => {
  return https.post(`/world-map`, data)
}

export const updateMap = (data: IUpdateWorldMap) => {
  return https.put(`/world-map`, data)
}

export const startWorldMap = (id: any) => {
  return https.get(`world-map/start/${id}`)
}

export const endWorldMap = (id: any) => {
  return https.post(`world-map/end/${id}`, {})
}
