import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'

import Layout from '@/app/components/layout'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import ContextWagmiProvider from '@/contexts/wagmi.context'
import { headers } from 'next/headers'
export const metadata: Metadata = {
  title: 'Depin Alliance',
  description: 'Depin Alliance'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  interactiveWidget: 'resizes-visual',
  shrinkToFit: 'no',
  viewportFit: 'cover'
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={`${GeistMono.variable}`}>
        <ContextWagmiProvider cookies={cookies}>
          <Layout>{children}</Layout>
        </ContextWagmiProvider>
      </body>
      <GoogleAnalytics gaId="G-QM3ZVFLQDK" />
    </html>
  )
}
