'use client'

import { createAppKit } from '@reown/appkit/react'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { projectId, wagmiAdapter } from '@/constants/wagmiConfig'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'Depin Alliance',
  description: 'Depin Alliance',
  url: 'https://app.depinalliance.xyz', // origin must match your domain & subdomain
  icons: ['https://app.depinalliance.xyz/assets/images/logo.png']
}

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum],
  defaultNetwork: mainnet,
  metadata: metadata,
  featuredWalletIds: [
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
  ],
  features: {
    email: false, // default to true
    socials: [],
    emailShowWallets: true, // default to true
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

function ContextWagmiProvider({
  children,
  cookies
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}

export default ContextWagmiProvider
