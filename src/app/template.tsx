'use client'

import { useEffect, useMemo } from 'react'
import { INIT_DATA } from '@/app/constants'
import { userAuth } from '@/app/services/user'
import https from '@/app/constants/https'
import { useTelegram } from '@/app/hooks/useTelegram'
import useCommonStore from './stores/commonStore'
export default function Template({ children }: { children: React.ReactNode }) {
  const { webApp } = useTelegram()
  const { setToken, setCurrentStatus } = useCommonStore((state) => state)
  const initData = useMemo(() => {
    if (process.env.NODE_ENV === 'development') return INIT_DATA

    return webApp?.initData
  }, [webApp?.initData])

  const login = async (initData: string) => {
    const res = await userAuth({ initData })
    if (res.status) {
      https.defaults.headers.common['Authorization'] = `Bearer ${res.data?.accessToken}`
      setCurrentStatus({ status: res.data.currentStatus })
      setToken({ token: res.data.currentStatus })

      // localStorage.setItem(TOKEN, res.data?.accessToken)
    }
  }

  useEffect(() => {
    if (initData) {
      login(initData)
    }
  }, [initData])

  return <>{children}</>
}
