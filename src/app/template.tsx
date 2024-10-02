'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CURRENT_STATUS as CURRENT_STATUS_STORAGE, INIT_DATA, TOKEN } from '@/constants'
import { userAuth } from '@/services/user'
import Cookies from 'js-cookie'
import https from '@/constants/https'
import { useTelegram } from '@/hooks/useTelegram'
import useCommonStore from '@/stores/commonStore'
import { userLeague } from '@/services/league'
import Loading from './components/loading'
import { toast } from 'sonner'
import { CURRENT_STATUS } from '@/interfaces/i.user'
import { useRouter } from 'next/navigation'
import CustomToast from './components/ui/custom-toast'
export default function Template({ children }: { children: React.ReactNode }) {
  const { webApp } = useTelegram()
  const router = useRouter()
  const isProgressLogin = useRef<boolean>(false)
  const {
    token,
    setToken,
    getUserConfig,
    getUserSetting,
    setCurrentStatus,
    getUserInfo,
    setCurrentLeague
  } = useCommonStore((state) => state)
  // const _tokenLocal = localStorage.getItem(TOKEN)
  const [isLoading, setIsLoading] = useState<boolean>(token ? false : true)
  const [loginError, setIsLoginError] = useState<boolean>(false)

  const initData = useMemo(() => {
    if (process.env.NODE_ENV === 'development') return INIT_DATA
    webApp?.disableVerticalSwipes()
    return webApp?.initData
  }, [webApp?.initData])

  const _getUserLeague = async () => {
    const res = await userLeague()
    if (res.status && res.data) {
      setCurrentLeague({ league: res.data })
    }
  }

  const login = async (initData: string) => {
    setIsLoading(true)
    setIsLoginError(false)
    try {
      isProgressLogin.current = true
      const res = await userAuth({ initData })
      if (res.status) {
        https.defaults.headers.common['Authorization'] = `Bearer ${res.data?.accessToken}`
        localStorage.setItem(TOKEN, res.data?.accessToken)
        setCurrentStatus({ status: res.data.currentStatus })
        await getUserInfo()
        await getUserConfig()
        if (
          res.data.currentStatus !== CURRENT_STATUS.CLAIMED &&
          res.data.currentStatus !== CURRENT_STATUS.MINING
        ) {
          router.push('/')
        }
        getUserSetting()
        _getUserLeague()
        Cookies.set(CURRENT_STATUS_STORAGE, res.data?.currentStatus)
        setToken({ token: res.data?.accessToken })
        setIsLoading(false)
        isProgressLogin.current = false
      }
    } catch (ex: any) {
      toast.error(<CustomToast type="error" title={ex?.message || 'Something went wrong!'} />)
      setIsLoginError(true)
      setIsLoading(false)
      isProgressLogin.current = false
    }
  }

  useEffect(() => {
    if (token) {
      setIsLoading(false)
    }
    if (initData && !token && !isProgressLogin.current) {
      login(initData)
    }
  }, [initData, token])

  return <>{isLoading || loginError ? <Loading isDone={!isLoading && !loginError} /> : children}</>
}
