'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
// import CustomNavbar from './custom-navbar'
// import { usePathname } from 'next/navigation'
import TelegramProvider from '../../contexts/telegram.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import useCommonStore from '@/stores/commonStore'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

export default function Layout({ children }: any) {
  const { setSafeAreaBottom } = useCommonStore()
  const queryClient = new QueryClient()
  useEffect(() => {
    const _safeAreaBottom: string = getComputedStyle(document.documentElement).getPropertyValue(
      '--sab'
    )
    if (_safeAreaBottom) {
      const _safeAreaBottomNumber = Number(_safeAreaBottom.replaceAll('px', ''))
      setSafeAreaBottom(_safeAreaBottomNumber)
    }
  }, [])
  const url = process.env.NEXT_PUBLIC_TONCONNECT_MAINIFEST
  const teleUrl: any = process.env.NEXT_PUBLIC_TELE_URI

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
            <AnimatePresence key="custom-page">
              <TonConnectUIProvider
                manifestUrl={url}
                actionsConfiguration={{
                  twaReturnUrl: teleUrl
                }}
              >
                {children}
              </TonConnectUIProvider>
              {/* {pathName !== '/' && <CustomNavbar />} */}
            </AnimatePresence>
          </NextUIProvider>
        </QueryClientProvider>
      </TelegramProvider>
    </>
  )
}
