'use client'

import { useEffect, useMemo } from 'react'
import { INIT_DATA, TOKEN } from '@/app/constants'
import { userAuth } from '@/app/services/user'
import { useAppDispatch } from '@/app/hooks/useToolkit'
import { setCurrentStatus, setToken } from '@/app/stores/slices/common'
import https from '@/app/constants/https'
import { useTelegram } from '@/app/hooks/useTelegram'
export default function Template({ children }: { children: React.ReactNode }) {
  const { webApp } = useTelegram()
  const dispatch = useAppDispatch()
  const initData = useMemo(() => {
    if (process.env.NODE_ENV === 'development') return INIT_DATA

    return webApp?.initData
  }, [webApp?.initData])

  const login = async (initData: string) => {
    const res = await userAuth({ initData })
    if (res.status) {
      https.defaults.headers.common['Authorization'] = `Bearer ${res.data?.accessToken}`
      dispatch(setCurrentStatus({ status: res.data.currentStatus }))
      dispatch(setToken({ token: res.data?.accessToken }))
      localStorage.setItem(TOKEN, res.data?.accessToken)
    }
  }

  useEffect(() => {
    if (initData) {
      login(initData)
    }
  }, [initData])

  return <>{children}</>
}
