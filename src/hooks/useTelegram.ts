import { TelegramContextValue } from '@/contexts/telegram.context'
import { useContext } from 'react'

export const useTelegram = () => {
  const context = useContext(TelegramContextValue)

  if (!context) throw Error('Not telegram context')
  return context
}
