import { ITelegramUser, IWebApp } from '@/interfaces/i.telegram'
import { createContext, useEffect, useMemo, useState } from 'react'

export interface ITelegramContext {
  webApp?: IWebApp
  user?: ITelegramUser
}

export const TelegramContextValue = createContext<ITelegramContext>({})

const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // @ts-ignore
    const app = (window as unknown).Telegram?.WebApp
    if (app && !webApp) {
      app.ready()
      app.expand()
      setWebApp(app)
      return
    }
  }, [webApp])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user
        }
      : {}
  }, [webApp])

  return <TelegramContextValue.Provider value={value}>{children}</TelegramContextValue.Provider>
}

const TelegramConsumer = TelegramContextValue.Consumer
export { TelegramConsumer }
export default TelegramProvider
