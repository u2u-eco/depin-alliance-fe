'use client'

import CustomPage from '@/app/components/custom-page'
import { IconLink, IconLoader, IconUnlink, IconWallet } from '@/app/components/icons'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { SETTING_TYPE } from '@/constants'
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet
} from '@tonconnect/ui-react'
import { OKXUniversalConnectUI } from '@okxconnect/ui'
import { Address } from '@ton/core'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppSound } from '@/hooks/useAppSound'
import { useAppKit, useAppKitAccount, useWalletInfo } from '@reown/appkit/react'
import { formatAddress } from '@/helper/common'
import CustomModal from '@/app/components/custom-modal'
import { useDisclosure } from '@nextui-org/react'
import { useDisconnect } from 'wagmi'
import { useOKXEvmConnectContext } from '@/contexts/okx.evm.connect'
import { useOKXTonConnectContext } from '@/contexts/okx.ton.connect'

export default function WalletPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const connectionRestored = useIsConnectionRestored()
  const { open: openWalletConnect } = useAppKit()

  const [type, setType] = useState(SETTING_TYPE.WALLET_TON)
  const { buttonSound } = useAppSound()
  const { address: addressWC, isConnected: isConnectedWC } = useAppKitAccount()
  const { walletInfo: walletConnectInfo } = useWalletInfo()
  const { disconnect: disconnectWC } = useDisconnect()

  // TON
  const [tonConnectUI] = useTonConnectUI()
  const tonWallet: any = useTonWallet()
  const tonAddress = useTonAddress()
  const { open: openTonModal } = useTonConnectModal()
  ///

  //OKX EVM

  const {
    accounts: accountsEvmOKX,
    connectWallet: connectEVMWalletOKX,
    disconnect: disconnectEvmOKX,
    okxUniversalUi
  } = useOKXEvmConnectContext()
  ///

  // OKX TON
  const {
    state: { walletInfo: tonWalletInfoOKX, okxTonConnectUI }
  } = useOKXTonConnectContext()

  ///
  const listWallet = [
    {
      id: 1,
      type: SETTING_TYPE.WALLET_CONNECT,
      image: 'wallet',
      title: 'Wallet Connect',
      iconConnected: walletConnectInfo?.icon || null,
      text: !isConnectedWC ? 'Wallet Connect' : addressWC && formatAddress(addressWC),
      icon: !isConnectedWC ? (
        <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
      ) : (
        <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
      )
    },
    {
      id: 1,
      type: SETTING_TYPE.WALLET_TON,
      image: 'ton',
      title: 'TON Connect',
      iconConnected: tonWallet?.imageUrl || null,
      text: !tonWallet ? 'TON Wallet' : formatAddress(tonAddress),
      icon: connectionRestored ? (
        !tonWallet ? (
          <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
        ) : (
          <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
        )
      ) : (
        <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
      )
    },
    // {
    //   id: 1,
    //   type: SETTING_TYPE.WALLET_OKX_EVM,
    //   image: 'okx',
    //   title: 'OKX EVM Wallet',
    //   text: !accountsEvmOKX[0] ? 'OKX Wallet' : formatAddress(accountsEvmOKX[0]),
    //   icon: !accountsEvmOKX[0] ? (
    //     <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
    //   ) : (
    //     <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
    //   )
    // },
    {
      id: 1,
      type: SETTING_TYPE.WALLET_OKX_TON,
      image: 'okx',
      title: 'OKX TON Wallet',
      text: tonWalletInfoOKX?.account
        ? formatAddress(
            Address.parse(tonWalletInfoOKX?.account.address).toString({
              bounceable: false
            })
          )
        : 'OKX Wallet',
      icon: !tonWalletInfoOKX?.account ? (
        <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
      ) : (
        <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
      )
    }
    // {
    //   id: 1,
    //   type: SETTING_TYPE.WALLET_TON,
    //   image: 'bitget',
    //   title: 'Bitget Connect',
    //   text: 'Bitget Wallet',
    //   icon: connectionRestored ? (
    //     !wallet ? (
    //       <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
    //     ) : (
    //       <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
    //     )
    //   ) : (
    //     <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
    //   )
    // },
    // {
    //   id: 1,
    //   type: SETTING_TYPE.WALLET_TON,
    //   image: 'wallet',
    //   title: 'Wallet Connect',
    //   text: 'EVM Wallet',
    //   icon: connectionRestored ? (
    //     !wallet ? (
    //       <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
    //     ) : (
    //       <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
    //     )
    //   ) : (
    //     <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
    //   )
    // }
  ]

  const handleClick = async (type: string) => {
    buttonSound.play()
    setType(type)
    switch (type) {
      case SETTING_TYPE.WALLET_TON:
        if (tonWallet) {
          onOpen()
        } else {
          openTonModal()
        }
        break
      case SETTING_TYPE.WALLET_CONNECT:
        if (isConnectedWC) {
          onOpen()
        } else {
          openWalletConnect()
        }
        break
      case SETTING_TYPE.WALLET_OKX_EVM:
        if (accountsEvmOKX[0]) {
          onOpen()
        } else {
          // document.getElementById('tc-widget-root')?.style.display = 'none'
          connectEVMWalletOKX()
          // okxUniversalUi?.openModal({
          //   namespaces: {
          //     eip155: {
          //       chains: ['eip155:1'],
          //       defaultChain: '1'
          //     }
          //   },
          //   sessionConfig: {
          //     redirect: ''
          //   }
          // })
        }
        break
      case SETTING_TYPE.WALLET_OKX_TON:
        if (tonWalletInfoOKX?.account.address) {
          onOpen()
        } else {
          okxTonConnectUI?.openModal()
        }
        break
    }
  }

  const handleDisconnect = () => {
    switch (type) {
      case SETTING_TYPE.WALLET_TON:
        tonConnectUI.disconnect()
        break
      case SETTING_TYPE.WALLET_CONNECT:
        disconnectWC()
        break
      case SETTING_TYPE.WALLET_OKX_EVM:
        disconnectEvmOKX()
        break
      case SETTING_TYPE.WALLET_OKX_TON:
        okxTonConnectUI?.disconnect()
        break
    }

    onClose()
  }

  const getAddressByType = () => {
    switch (type) {
      case SETTING_TYPE.WALLET_TON:
        return tonAddress || ''
      case SETTING_TYPE.WALLET_CONNECT:
        return addressWC || ''
      case SETTING_TYPE.WALLET_OKX_EVM:
        return accountsEvmOKX[0] || ''
      case SETTING_TYPE.WALLET_OKX_TON:
        return tonWalletInfoOKX?.account.address
          ? Address.parse(tonWalletInfoOKX?.account.address).toString({
              bounceable: false
            })
          : ''
      default:
        return ''
    }
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
        <div className="space-y-6 xs:space-y-7 2xs:space-y-8">
          <CustomHeader title="Wallet" />
          <div className="flex flex-col space-y-3 xs:space-y-4">
            {listWallet.map((item: any) => (
              <div
                className="relative !bg-transparent "
                key={item.id}
                onClick={() => handleClick(item.type)}
              >
                <div className="relative [--shape:_34px] xs:[--shape:_40px] 2xs:[--shape:_46px] p-2  [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_20px)] bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 xs:space-x-4">
                      <div className="flex items-center justify-center size-[60px] xs:size-[66px] 2xs:size-[72px] bg-white/10 [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)]">
                        <img src={`/assets/images/${item.image}@2x.png`} alt="DePIN Alliance" />
                      </div>
                      <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
                        <div className="!text-[#ffffff] font-mona font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] xs:!leading-[22px]">
                          {item.title}
                        </div>
                        <div className="text-body text-sm xs:text-[15px] 2xs:text-base tracking-[-1px] !leading-[18px] xs:!leading-[20px] flex items-center space-x-1.5 xs:space-x-2">
                          {/* {item.text ? ( */}
                          <>
                            <div className="size-5 xs:size-6 [clip-path:_polygon(6px_0%,100%_0,100%_calc(100%_-_6px),calc(100%_-_6px)_100%,0_100%,0_6px)]">
                              <img
                                src={
                                  item.iconConnected
                                    ? item.iconConnected
                                    : `/assets/images/${item.image}@2x.png`
                                }
                                alt="DePIN Alliance"
                              />
                            </div>
                            <p>{item.text}</p>
                          </>
                          {/* ) : null} */}
                        </div>
                      </div>
                    </div>
                    <motion.div whileTap={{ scale: 0.86 }} className="mr-3 cursor-pointer">
                      {item.icon}
                    </motion.div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0  border-[12px] xs:border-[14px] 2xs:border-[16px] border-transparent  border-b-white border-r-white opacity-5" />
              </div>
            ))}
          </div>
        </div>
      </CustomPage>
      <CustomModal title="Disconnect" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        {type !== SETTING_TYPE.LANGUAGE ? (
          <div>
            <div className=" text-body text-base tracking-[-1px] text-center">
              <p>Are you sure you want to disconnect this wallet?</p>
            </div>
            <div className="my-6 xs:my-7 2xs:my-8 space-x-3 xs:space-x-4 flex items-center justify-center">
              <div
                className={`p-[1px] size-[80px] xs:size-[85px] 2xs:size-[90px] [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${type !== SETTING_TYPE.LANGUAGE ? 'bg-white/10' : 'bg-white'}`}
              >
                <IconWallet className="size-7 xs:size-8 2xs:size-9" gradient />
              </div>
              <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
                <p className="text-title leading-[18px] tracking-[-1px]">YOUR WALLET:</p>
                <p className="text-green-500 text-[15px] xs:text-base 2xs:text-lg xs:!leading-[20px] 2xs:!leading-[22px] font-semibold">
                  {/* {type === SETTING_TYPE.WALLET_TON
                    ? formatAddress(userFriendlyAddress)
                    : addressEVM && formatAddress(addressEVM)} */}
                  {formatAddress(getAddressByType())}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="btn error">
                <div className="btn-border"></div>
                <div className="btn-error" onClick={handleDisconnect}>
                  Disconnect
                </div>
                <div className="btn-border"></div>
              </div>
              <div className="btn default" onClick={onClose}>
                <div className="btn-border"></div>
                <div className="btn-default">Cancel</div>
                <div className="btn-border"></div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </CustomModal>
    </>
  )
}
