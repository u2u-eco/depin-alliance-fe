import useCommonStore from '@/stores/commonStore'
import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'
interface ISoundsContext {
  main: any
  tabSound: any
  buttonSound: any
  specialSound: any
  dropdownOpen: any
  dropdownClose: any
}
export const SoundsContextValue = createContext<any>({})

const SoundsProvider = ({ children }: { children: React.ReactNode }) => {
  const { userSetting } = useCommonStore()
  const [sounds, setSounds] = useState<any>({})
  useEffect(() => {
    const mainSound = new Howl({
      src: ['/assets/sounds/theme/main-theme.mp3'],
      loop: true,
      mute: !userSetting?.enableMusicTheme,
      html5: false
    })
    const _tabSound = new Howl({
      src: ['/assets/sounds/interaction/tab-click.mp3'],
      html5: false,
      mute: !userSetting?.enableSoundEffect
    })
    const _buttonSound = new Howl({
      src: ['/assets/sounds/interaction/button-click.mp3'],
      html5: false,
      mute: !userSetting?.enableSoundEffect
    })
    const _specialSound = new Howl({
      src: ['/assets/sounds/theme/special-effect.mp3'],
      html5: false,
      mute: !userSetting?.enableSoundEffect
    })

    const _dropdownOpenSound = new Howl({
      src: ['/assets/sounds/interaction/dropdown-open.mp3'],
      html5: false,
      mute: !userSetting?.enableSoundEffect
    })
    const _dropdownCloseSound = new Howl({
      src: ['/assets/sounds/interaction/dropdown-close.mp3'],
      html5: false,
      mute: !userSetting?.enableSoundEffect
    })

    setSounds({
      main: mainSound,
      tabSound: _tabSound,
      buttonSound: _buttonSound,
      specialSound: _specialSound,
      dropdownOpen: _dropdownOpenSound,
      dropdownClose: _dropdownCloseSound
    })
  }, [userSetting])

  const handleVisible = async () => {
    if (document.hidden) {
      Howler.ctx.suspend()
      // sound.stop()
    } else {
      setTimeout(() => {
        Howler.ctx.resume()
      }, 500)
    }
  }
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisible)
    return () => {
      document.removeEventListener('visibilitychange', handleVisible)
    }
  }, [])

  const value = useMemo(() => {
    return sounds ? sounds : {}
  }, [sounds])

  return <SoundsContextValue.Provider value={value}>{children}</SoundsContextValue.Provider>
}

export default SoundsProvider
