import https from '@/constants/https'

export const getListLeague = ({ page, size }: { page?: number; size?: number }) => {
  return https.get('/league', {
    params: {
      page: page || 1,
      size: size || 10
    }
  })
}

export const createLeague = (formData: any) => {
  return https.post('/league', formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

export const joinLeague = (id: string) => {
  return https.get(`/league/join/${id}`)
}
