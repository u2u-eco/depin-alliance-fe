import { OKXConnectError, OKXTonConnectUI, Wallet } from '@okxconnect/ui'
import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useSetState } from 'react-use'

export interface OKXTonConnectState {
  walletInfo: Wallet | null
  okxTonConnectUI: OKXTonConnectUI | null
}

const okxTonConnectState = {
  walletInfo: null,
  okxTonConnectUI: null
}

export const OKXTonContext = createContext({
  state: okxTonConnectState
})

OKXTonContext.displayName = 'OKXTonContext'

export function OKXTonConnectProvider(props: any) {
  const [state, setState] = useSetState(okxTonConnectState)
  const okxTonConnectUIRef = useRef<any>()
  const inited = useRef<boolean>(false)

  useEffect(() => {
    if (!inited.current) {
      inited.current = true
      okxTonConnectUIRef.current = new OKXTonConnectUI({
        dappMetaData: {
          name: 'Depin Alliance',
          icon: 'https://app.depinalliance.xyz/assets/images/logo.png'
        },
        actionsConfiguration: {
          returnStrategy: 'none'
        },
        language: 'en_US',
        restoreConnection: true
      })
      setState({
        okxTonConnectUI: okxTonConnectUIRef.current
      })
    }
    const unsubscribe = okxTonConnectUIRef.current.onStatusChange(
      (walletInfo: any) => {
        setState({
          walletInfo: walletInfo
        })
      },
      (err: OKXConnectError) => {
        console.log('Connection status:', err)
      }
    )
    return () => {
      unsubscribe()
    }
  }, [])
  const value = useMemo(
    () => ({
      state
      // setState
    }),
    [state]
  )

  return <OKXTonContext.Provider value={value} {...props} />
}

export function useOKXTonConnectContext(): {
  // setState: (
  //   patch:
  //     | Partial<OKXTonConnectState>
  //     | ((previousState: OKXTonConnectState) => Partial<OKXTonConnectState>)
  // ) => void
  state: OKXTonConnectState
} {
  const context = useContext(OKXTonContext)

  if (!context) {
    throw new Error('useOKXTonConnect must be used within a TourGuideProvider')
  }

  return context
}
