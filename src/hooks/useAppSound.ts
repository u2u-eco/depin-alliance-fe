import useCommonStore from '@/stores/commonStore'
import useSound from 'use-sound'
export const useAppSound = () => {
  const { soundEnabled } = useCommonStore()
  const [tabSound] = useSound('/assets/sounds/interaction/tab-click.mp3', {
    soundEnabled
  })
  const [buttonSound] = useSound('/assets/sounds/interaction/button-click.mp3', {
    soundEnabled
  })
  const [specialSound] = useSound('/assets/sounds/theme/special-effect.mp3', {
    soundEnabled
  })

  const [dropdownOpen] = useSound('/assets/sounds/interaction/dropdown-open.mp3', {
    soundEnabled
  })
  const [dropdownClose] = useSound('/assets/sounds/interaction/dropdown-close.mp3', {
    soundEnabled
  })

  return {
    tabSound,
    buttonSound,
    specialSound,
    dropdownOpen,
    dropdownClose
  }
}
