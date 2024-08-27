'use client'

import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import CustomNavbar from './custom-navbar'
import { usePathname } from 'next/navigation'
import TelegramProvider from '../contexts/telegram.context'
import ReduxProvider from '../contexts/redux.context'

export default function Layout({ children }: any) {
  const pathName = usePathname()

  return (
    <div className="wrapper">
      <TelegramProvider>
        <ReduxProvider>
          <NextUIProvider>
            {children}
            {/* {pathName !== '/' && <CustomNavbar />} */}
          </NextUIProvider>
        </ReduxProvider>
      </TelegramProvider>
    </div>
  )
}
