import { useContext } from 'react'
import { SoundsContextValue } from '@/contexts/sounds.context'
export const useAppSound = () => {
  const context = useContext(SoundsContextValue)
  return context
}
