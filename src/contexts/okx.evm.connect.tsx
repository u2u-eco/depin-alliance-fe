import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useSetState } from 'react-use'
import { OKXUniversalProvider } from '@okxconnect/universal-provider'
export interface OKXEvmConnectState {
  accounts: string[]
  // okxUniversalProvider: OKXUniversalProvider | null
}

const okxEvmConnectState = {
  accounts: []
}

export const OKXEvmContext = createContext({
  accounts: [],
  connectWallet: () => undefined,
  disconnect: () => undefined
})

OKXEvmContext.displayName = 'OKXEvmContext'

export function OKXEvmConnectProvider(props: any) {
  const [state, setState] = useSetState(okxEvmConnectState)
  const okxUniversalProvider = useRef<any>()
  const initProvider = async () => {
    if (!okxUniversalProvider.current) {
      okxUniversalProvider.current = await OKXUniversalProvider.init({
        dappMetaData: {
          name: 'Depin Alliance',
          icon: 'https://app.depinalliance.xyz/assets/images/logo.png'
        }
      })
      // okxUniversalProvider.current.on('session_update', (session: any) => {
      //   alert(JSON.stringify(session))
      // })
      okxUniversalProvider.current.on('session_delete', (session: any) => {
        setState({
          accounts: []
        })
      })
    }
  }

  const disconnect = async () => {
    await okxUniversalProvider.current?.disconnect()
    setState({
      accounts: []
    })
  }

  const connectWallet = async () => {
    if (window?.okxwallet) {
      const accounts = await window.okxwallet.request({ method: 'eth_requestAccounts' })
      console.log('🚀 ~ connectWal ~ accounts:', accounts)
      if (accounts) {
        setState({
          accounts: accounts
        })
      }
    } else {
      await okxUniversalProvider.current.connect({
        namespaces: {
          eip155: {
            chains: ['eip155:1'],
            defaultChain: '1'
          }
        },
        // optionalNamespaces: {
        //   eip155: {
        //     chains: ['eip155:43114']
        //   }
        // },
        sessionConfig: {
          redirect: ''
        }
      })

      const accounts = await okxUniversalProvider.current.request({ method: 'eth_accounts' })
      if (accounts) {
        setState({
          accounts: accounts
        })
      }
    }
  }
  useEffect(() => {
    initProvider()
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      connectWallet,
      disconnect
      // setState
    }),
    [state]
  )

  return <OKXEvmContext.Provider value={value} {...props} />
}

export function useOKXEvmConnectContext(): {
  accounts: string[]
  connectWallet: () => void
  disconnect: () => void
} {
  const context = useContext(OKXEvmContext)

  if (!context) {
    throw new Error('useOKXEvmConnect must be used within a TourGuideProvider')
  }

  return context
}
