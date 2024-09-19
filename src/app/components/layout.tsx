'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect } from 'react'
// import CustomNavbar from './custom-navbar'
// import { usePathname } from 'next/navigation'
import TelegramProvider from '../../contexts/telegram.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import useCommonStore from '@/stores/commonStore'
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
  return (
    <>
      <Toaster
        position="top-center"
        theme="dark"
        visibleToasts={1}
        toastOptions={{
          classNames: {
            toast:
              "border mt-4 border-transparent bg-black p-3 xs:p-4 shadow-[inset_0_0_40px_rgba(0,255,144,0.45)] rounded-none before:content-[''] before:!scale-y-1 before:!translate-y-0 before:bottom-0 before:absolute before:left-0 before:[--shape:_2px] xs:before:[--shape:_4px] before:w-12 xs:before:w-16 before:h-0.5 xs:before:h-1 before:bg-error before:[clip-path:_polygon(0_0,calc(100%_-_var(--shape))_0%,100%_100%,0%_100%)] before:overflow-hidden after:content-[''] after:bottom-0 after:absolute after:right-0 after:left-auto after:[--shape:_2px] xs:after:[--shape:_4px] after:w-12 xs:after:w-16 after:overflow-hidden after:h-0.5 xs:after:h-1  after:[clip-path:_polygon(var(--shape)_0,100%_0%,100%_100%,0%_100%)]",
            content: 'flex items-center w-full',
            title: 'font-geist text-[15px] xs:text-base text-title !leading-[20px]',
            icon: 'hidden',
            success:
              'shadow-[inset_0_0_40px_rgba(0,255,144,0.45)] !border-success before:bg-success after:bg-success',
            error:
              'shadow-[inset_0_0_40px_rgba(229,57,53,0.45)] !border-error before:bg-error after:bg-error'
          }
        }}
      />
      <TelegramProvider>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            {children}
            {/* {pathName !== '/' && <CustomNavbar />} */}
          </NextUIProvider>
        </QueryClientProvider>
      </TelegramProvider>
    </>
  )
}
