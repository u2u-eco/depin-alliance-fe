'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CURRENT_STATUS, INIT_DATA } from '@/constants'
import { getUserConfig, userAuth } from '@/services/user'
import Cookies from 'js-cookie'
import https from '@/constants/https'
import { useTelegram } from '@/hooks/useTelegram'
import useCommonStore from '@/stores/commonStore'
import { userLeague } from '@/services/league'
import Loading from './components/loading'
export default function Template({ children }: { children: React.ReactNode }) {
  const { webApp } = useTelegram()
  const isProgressLogin = useRef<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { token, setToken, setUserConfig, setCurrentStatus, getUserInfo, setCurrentLeague } =
    useCommonStore((state) => state)
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

  const _getUserConfig = async () => {
    const res = await getUserConfig()
    if (res.status && res.data) {
      setUserConfig({ config: res.data })
    }
  }

  const login = async (initData: string) => {
    setIsLoading(true)
    try {
      isProgressLogin.current = true
      const res = await userAuth({ initData })
      if (res.status) {
        https.defaults.headers.common['Authorization'] = `Bearer ${res.data?.accessToken}`
        setCurrentStatus({ status: res.data.currentStatus })
        setToken({ token: res.data?.accessToken })
        getUserInfo()
        _getUserConfig()
        _getUserLeague()
        Cookies.set(CURRENT_STATUS, res.data?.currentStatus)
        setIsLoading(false)
      }
      isProgressLogin.current = false
    } catch (ex) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (initData && !token && !isProgressLogin.current) {
      login(initData)
    } else {
      setIsLoading(false)
    }
  }, [initData, token])

  return (
    <>
      {children}
      {isLoading ? <Loading /> : null}
    </>
  )
}
