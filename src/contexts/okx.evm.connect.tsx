import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useSetState } from 'react-use'
import { OKXUniversalProvider } from '@okxconnect/universal-provider'
import { OKXUniversalConnectUI } from '@okxconnect/ui'

export interface OKXEvmConnectState {
  accounts: string[]
  // okxUniversalProvider: OKXUniversalProvider | null
  okxUniversalUi: OKXUniversalConnectUI | null
}

const okxEvmConnectState = {
  accounts: [],
  okxUniversalUi: null
}

export const OKXEvmContext = createContext({
  accounts: [],
  okxUniversalUi: null,
  connectWallet: () => undefined,
  disconnect: () => undefined
})

OKXEvmContext.displayName = 'OKXEvmContext'

export function OKXEvmConnectProvider(props: any) {
  const [state, setState] = useSetState(okxEvmConnectState)
  const okxUniversalProvider = useRef<any>()
  const okxUniversalUi = useRef<any>()
  const inited = useRef<boolean>(false)

  const initProvider = async () => {
    if (!okxUniversalProvider.current) {
      okxUniversalProvider.current = await OKXUniversalProvider.init({
        dappMetaData: {
          name: 'Depin Alliance',
          icon: 'https://app.depinalliance.xyz/assets/images/logo.png'
        }
      })

      okxUniversalProvider.current.on('display_uri', (uri: string) => {
        console.log(uri)
      })

      okxUniversalProvider.current.on('session_delete', (session: any) => {
        setState({
          accounts: []
        })
      })
    }
  }

  const initUI = async () => {
    if (!inited.current) {
      inited.current = true
      okxUniversalUi.current = await OKXUniversalConnectUI.init({
        dappMetaData: {
          name: 'Depin Alliance',
          icon: 'https://app.depinalliance.xyz/assets/images/logo.png'
        },

        actionsConfiguration: {
          // returnStrategy: 'tg://resolve',
          modals: 'all',
          tmaReturnUrl: 'back'
        },
        language: 'en_US'
        // uiPreferences: {
        //   theme: THEME.
        // }
      })
      setState({
        okxUniversalUi: okxUniversalUi.current
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
    const ton: any = document.getElementById('tc-widget-root')
    ton.style.display = 'none'
    const dom: any = document.getElementById('universal-widget-root')
    dom.style.display = 'block'
    await okxUniversalUi?.current.openModal({
      namespaces: {
        eip155: {
          chains: ['eip155:1'],
          defaultChain: '1'
        }
      },
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

    // if (window?.okxwallet) {
    //   const accounts = await window.okxwallet.request({ method: 'eth_requestAccounts' })
    //   if (accounts) {
    //     setState({
    //       accounts: accounts
    //     })
    //   }
    // } else {
    //   await okxUniversalProvider.current.connect({
    //     namespaces: {
    //       eip155: {
    //         chains: ['eip155:1'],
    //         defaultChain: '1'
    //       }
    //     },
    //     // optionalNamespaces: {
    //     //   eip155: {
    //     //     chains: ['eip155:43114']
    //     //   }
    //     // },
    //     sessionConfig: {
    //       redirect: ''
    //     }
    //   })

    //   const accounts = await okxUniversalProvider.current.request({ method: 'eth_accounts' })
    //   if (accounts) {
    //     setState({
    //       accounts: accounts
    //     })
    //   }
    // }
  }
  useEffect(() => {
    initProvider()
    initUI()
  }, [])

  // useEffect(() => {
  //   initUI()
  // }, [])

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
  okxUniversalUi: OKXUniversalConnectUI | null
  connectWallet: () => void
  disconnect: () => void
} {
  const context = useContext(OKXEvmContext)

  if (!context) {
    throw new Error('useOKXEvmConnect must be used within a TourGuideProvider')
  }

  return context
}
