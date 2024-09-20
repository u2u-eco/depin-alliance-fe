import https from '@/constants/https'

export const getListLeague = ({
  page,
  size,
  name
}: {
  page?: number
  size?: number
  name?: string
}) => {
  return https.get('/league', {
    params: {
      page: page || 1,
      size: size || 10,
      name
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

export const userLeague = () => {
  return https.get('/league/user-league')
}

export const validateNameLeague = (formData: any) => {
  return https.post('/league/validate-name', formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

export const leaveLeague = () => {
  return https.get('/league/leave')
}

export const getTotalJoinRequest = () => {
  return https.get('/league/total-join-request')
}

export const getListJoinRequest = ({ page, size }: { page: number; size: number }) => {
  return https.get('/league/join-request', {
    params: {
      page,
      size
    }
  })
}

export const approveJoinLeague = (id: number) => {
  return https.get(`/league/approve/${id}`)
}

export const rejectJoinLeague = (id: number) => {
  return https.get(`/league/reject/${id}`)
}

export const cancelJoinLeague = (code: string) => {
  return https.get(`/league/cancel/${code}`)
}

export const kickUserInLeague = (id: number) => {
  return https.get(`/league/kick/${id}`)
}

export const getListMemberOfLeague = (params: {
  page: number
  size?: number
  username?: string
}) => {
  return https.get(`/league/member`, { params })
}
