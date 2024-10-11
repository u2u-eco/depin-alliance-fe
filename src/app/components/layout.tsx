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

import { createAppKit } from '@reown/appkit/react'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { mainnet, arbitrum, bsc } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
const projectId = '0d36ced6950fe00fd756282cc1b234e8'

// 2. Create a metadata object
const metadata = {
  name: 'Depin',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata,
  networks: [mainnet, arbitrum, bsc],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

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
