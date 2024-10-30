import { useOKXEvmConnectContext } from '@/contexts/okx.evm.connect'

export default function OkxEVMConnect() {
  const { accounts, connectWallet, disconnect } = useOKXEvmConnectContext()
  const handleConnect = () => {
    if (accounts[0]) {
      disconnect()
    } else {
      connectWallet()
    }
  }

  return (
    <button onClick={handleConnect}>
      {accounts?.length > 0 ? accounts[0] : 'Connect EVM Wallet'}
    </button>
  )
}
