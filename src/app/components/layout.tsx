'use client'

import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import CustomNavbar from './custom-navbar'
// import { usePathname } from 'next/navigation'
import TelegramProvider from '../contexts/telegram.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Layout({ children }: any) {
  // const pathName = usePathname()
  const queryClient = new QueryClient()
  return (
    <div className="wrapper">
      <TelegramProvider>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            {children}
            {/* {pathName !== '/' && <CustomNavbar />} */}
          </NextUIProvider>
        </QueryClientProvider>
      </TelegramProvider>
    </div>
  )
}
