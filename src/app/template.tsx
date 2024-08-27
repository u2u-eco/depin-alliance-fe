'use client'

import ReduxProvider from './contexts/redux.context'
import TelegramProvider from './contexts/telegram.context'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TelegramProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </TelegramProvider>
    </>
  )
}
