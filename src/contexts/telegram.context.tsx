import DeviceError from '@/app/device-error'
import { IS_ONLY_SUPPORT_MOBILE } from '@/constants'
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
      try {
        app.setBackgroundColor('#0f0f0f')
        app.setHeaderColor('#0f0f0f')
      } catch (ex) {}
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

  const disableDevice = IS_ONLY_SUPPORT_MOBILE ? ['desktop', 'web', 'macos'] : []
  // const disableDevice: any = []
  if (disableDevice.some((key: any) => webApp?.platform.toLowerCase().includes(key))) {
    console.error('Telegram Desktop is not supported.')
    return <DeviceError title={'@DePIN_Alliance_Bot'} />
  }

  return <TelegramContextValue.Provider value={value}>{children}</TelegramContextValue.Provider>
}

const TelegramConsumer = TelegramContextValue.Consumer
export { TelegramConsumer }
export default TelegramProvider
