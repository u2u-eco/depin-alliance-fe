import { CURRENT_STATUS } from '@/constants'
import { CURRENT_STATUS as I_CURRENT_STATUS } from '@/interfaces/i.user'
import { NextRequest } from 'next/server'

export const isAuthenticated = (request: NextRequest) => {
  const currentStatus = request.cookies.get(CURRENT_STATUS)?.value
  if (currentStatus === I_CURRENT_STATUS.MINING || currentStatus === I_CURRENT_STATUS.CLAIMED) {
    return true
  }
  return false
}
