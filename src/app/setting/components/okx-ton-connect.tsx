import { useOKXTonConnectContext } from '@/contexts/okx.ton.connect'

export default function OkxTonConnect() {
  const {
    state: { walletInfo, okxTonConnectUI }
  } = useOKXTonConnectContext()

  const handleConnect = () => {
    if (walletInfo?.account) {
      okxTonConnectUI?.disconnect()
    } else {
      okxTonConnectUI?.openModal()
    }
  }

  return (
    <button onClick={handleConnect}>
      {walletInfo?.account ? walletInfo.account?.address : 'Connect OKX Wallet'}
    </button>
  )
}
