'use client'

import Onboarding from '@/app/onboarding/page'
import { useTelegram } from './hooks/useTelegram'
import { useEffect, useMemo } from 'react'
import { INIT_DATA, TOKEN } from './constants'
import { userAuth } from './services/user'
import { useAppDispatch } from './hooks/useToolkit'
import { setCurrentStatus, setToken } from './stores/slices/common'
import https from './constants/https'

export default function OnboardingPage() {
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

  return <Onboarding />
}
