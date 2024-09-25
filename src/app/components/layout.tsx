'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import TelegramProvider from '../../contexts/telegram.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import useCommonStore from '@/stores/commonStore'
import Swipeable from './swipeable'
import { useRouter } from 'next/navigation'
import SoundsProvider from '@/contexts/sounds.context'
import TourGuide from './tour-guide'
import { TourGuideProvider } from '@/contexts/tour.guide.context'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

export default function Layout({ children }: any) {
  const { setSafeAreaBottom } = useCommonStore()
  const queryClient = new QueryClient()
  const { userSetting } = useCommonStore()
  const router = useRouter()

  useEffect(() => {
    const _safeAreaBottom: string = getComputedStyle(document.documentElement).getPropertyValue(
      '--sab'
    )
    if (_safeAreaBottom) {
      const _safeAreaBottomNumber = Number(_safeAreaBottom.replaceAll('px', ''))
      setSafeAreaBottom(_safeAreaBottomNumber)
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  useEffect(() => {
    // main?.stop()
    const mainSound = new Howl({
      src: ['/assets/sounds/theme/main-theme.mp3'],
      loop: true,
      mute: !userSetting?.enableMusicTheme,
      html5: false
    })
    mainSound?.play()
    return () => {
      mainSound?.stop()
    }
  }, [userSetting?.enableMusicTheme])
  const url = process.env.NEXT_PUBLIC_TONCONNECT_MAINIFEST
  const teleUrl: any = process.env.NEXT_PUBLIC_TELE_URI

  return (
    <div className="container">
      <Toaster
        position="top-center"
        theme="dark"
        visibleToasts={1}
        toastOptions={{
          classNames: {
            toast:
              'mt-4 !p-0 rounded-none !border-0 ![background:_transparent] before:hidden after:hidden',
            content: 'flex items-center w-full',
            title: 'font-geist text-[15px] xs:text-base text-title !leading-[20px]',
            icon: 'hidden'
          }
        }}
      />

      <TelegramProvider>
        <QueryClientProvider client={queryClient}>
          <TonConnectUIProvider
            manifestUrl={url}
            actionsConfiguration={{
              twaReturnUrl: teleUrl
            }}
          >
            <NextUIProvider>
              <SoundsProvider>
                <TourGuideProvider>
                  <Swipeable onSwipeRight={handleBack}>
                    <AnimatePresence key="custom-page">
                      {children}
                      {/* {pathName !== '/' && <CustomNavbar />} */}
                    </AnimatePresence>
                  </Swipeable>
                  <TourGuide />
                </TourGuideProvider>
              </SoundsProvider>
            </NextUIProvider>
          </TonConnectUIProvider>
        </QueryClientProvider>
      </TelegramProvider>
    </div>
  )
}
