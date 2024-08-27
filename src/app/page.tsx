'use client'

import Onboarding from '@/app/onboarding/page'
import { useTelegram } from './hooks/useTelegram'
import { useMemo } from 'react'
import { INIT_DATA } from './constants'

export default function OnboardingPage() {
  const { webApp } = useTelegram()

  const initData = useMemo(() => {
    if (process.env.NODE_ENV === 'development') return INIT_DATA

    return webApp?.initData
  }, [webApp?.initData])

  return <Onboarding />
}
