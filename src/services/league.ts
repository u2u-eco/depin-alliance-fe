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

export const getListLeagueAll = ({
  page,
  size,
  name
}: {
  page?: number
  size?: number
  name?: string
}) => {
  return https.get('/league/all', {
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

export const updateAvatarLeague = (formData: any) => {
  return https.post('/league/avatar', formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

export const getListMemberOfLeague = (params: {
  page: number
  'is-funding': boolean
  size?: number
  username?: string
}) => {
  return https.get(`/league/member`, { params })
}

export const contribute = (data: { number: number; code: string }) => {
  return https.post(`/league/contribute`, data)
}

export const funding = (amount: string) => {
  return https.post('/league/funding', {
    amount
  })
}

export const getDetailMember = (id: any) => {
  return https.get(`/league/detail-member/${id}`)
}

export const updateRoleMember = (data: { userId: number; role: string; isActive: boolean }) => {
  return https.post(`/league/role`, data)
}

export const getRankOfLeague = () => {
  return https.get(`/league/user-league-current-rank`)
}

export const getLeagueDetailByCode = (code: string) => {
  return https.get(`/league/detail-league/${code}`)
}
