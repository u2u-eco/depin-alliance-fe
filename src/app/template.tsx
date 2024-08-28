'use client'

import { useEffect, useMemo } from 'react'
import { INIT_DATA } from '@/constants'
import { userAuth } from '@/services/user'
import https from '@/constants/https'
import { useTelegram } from '@/hooks/useTelegram'
import useCommonStore from '@/stores/commonStore'
export default function Template({ children }: { children: React.ReactNode }) {
  const { webApp } = useTelegram()
  const { token, setToken, setCurrentStatus } = useCommonStore((state) => state)
  const initData = useMemo(() => {
    if (process.env.NODE_ENV === 'development') return INIT_DATA

    return webApp?.initData
  }, [webApp?.initData])

  const login = async (initData: string) => {
    const res = await userAuth({ initData })
    if (res.status) {
      https.defaults.headers.common['Authorization'] = `Bearer ${res.data?.accessToken}`
      setCurrentStatus({ status: res.data.currentStatus })
      setToken({ token: res.data?.accessToken })

      // localStorage.setItem(TOKEN, res.data?.accessToken)
    }
  }

  useEffect(() => {
    if (initData && !token) {
      login(initData)
    }
  }, [initData, token])

  return <>{children}</>
}
