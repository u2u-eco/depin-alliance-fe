"use client"

import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import CustomNavbar from './custom-navbar'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: any) {
  const pathName = usePathname()

  return (
    <div className="wrapper">
      <NextUIProvider>
        {children}
        {pathName !== '/' && <CustomNavbar/>}
      </NextUIProvider>
    </div>
  )
}
