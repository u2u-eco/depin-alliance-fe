'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
// import CustomNavbar from './custom-navbar'
// import { usePathname } from 'next/navigation'
import TelegramProvider from '../../contexts/telegram.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import useCommonStore from '@/stores/commonStore'
import Swipeable from './swipeable'
import { useRouter } from 'next/navigation'
import SoundsProvider from '@/contexts/sounds.context'
import TourGuide from './tour-guide'
import { TourGuideProvider } from '@/contexts/tour.guide.context'

export default function Layout({ children }: any) {
  const { setSafeAreaBottom } = useCommonStore()
  const queryClient = new QueryClient()
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

  return (
    <>
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
        </QueryClientProvider>
      </TelegramProvider>
    </>
  )
}
