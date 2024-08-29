'use client'

import { useEffect, useMemo, useRef } from 'react'
import { INIT_DATA } from '@/constants'
import { userAuth } from '@/services/user'
import https from '@/constants/https'
import { useTelegram } from '@/hooks/useTelegram'
import useCommonStore from '@/stores/commonStore'
import { userLeague } from '@/services/league'
export default function Template({ children }: { children: React.ReactNode }) {
  const { webApp } = useTelegram()
  const isProgressLogin = useRef<boolean>(false)
  const { token, setToken, setCurrentStatus, getUserInfo, setCurrentLeague } = useCommonStore(
    (state) => state
  )
  const initData = useMemo(() => {
    if (process.env.NODE_ENV === 'development') return INIT_DATA

    return webApp?.initData
  }, [webApp?.initData])

  const _getUserLeague = async () => {
    const res = await userLeague()
    if (res.status && res.data) {
      setCurrentLeague({ league: res.data })
    }
  }

  const login = async (initData: string) => {
    isProgressLogin.current = true
    const res = await userAuth({ initData })
    if (res.status) {
      https.defaults.headers.common['Authorization'] = `Bearer ${res.data?.accessToken}`
      setCurrentStatus({ status: res.data.currentStatus })
      setToken({ token: res.data?.accessToken })
      getUserInfo()
      _getUserLeague()
      // localStorage.setItem(TOKEN, res.data?.accessToken)
    }
    isProgressLogin.current = false
  }

  useEffect(() => {
    if (initData && !token && !isProgressLogin.current) {
      login(initData)
    }
  }, [initData, token])

  return <>{children}</>
}
