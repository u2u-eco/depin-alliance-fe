'use client'

import CustomPage from '@/app/components/custom-page'
import { IconLink, IconLoader, IconUnlink } from '@/app/components/icons'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { SETTING_TYPE } from '@/constants'
import { useIsConnectionRestored, useTonWallet } from '@tonconnect/ui-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppSound } from '@/hooks/useAppSound'

export default function WalletPage() {
  const connectionRestored = useIsConnectionRestored()
  const wallet: any = useTonWallet()
  const [type, setType] = useState(SETTING_TYPE.WALLET_TON)
  const { buttonSound } = useAppSound()

  const listWallet = [
    {
      id: 1,
      type: SETTING_TYPE.WALLET_CONNECT,
      image: 'wallet',
      title: 'Wallet Connect',
      text: 'EVM Wallet',
      icon: connectionRestored ? (
        !wallet ? (
          <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
        ) : (
          <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
        )
      ) : (
        <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
      )
    },
    {
      id: 1,
      type: SETTING_TYPE.WALLET_TON,
      image: 'ton',
      title: 'TON Connect',
      text: 'TON Wallet',
      icon: connectionRestored ? (
        !wallet ? (
          <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
        ) : (
          <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
        )
      ) : (
        <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
      )
    },
    {
      id: 1,
      type: SETTING_TYPE.WALLET_OKX,
      image: 'okx',
      title: 'OKX Connect',
      text: 'OKX Wallet',
      icon: connectionRestored ? (
        !wallet ? (
          <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
        ) : (
          <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
        )
      ) : (
        <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
      )
    },
    {
      id: 1,
      type: SETTING_TYPE.WALLET_TON,
      image: 'bitget',
      title: 'Bitget Connect',
      text: 'Bitget Wallet',
      icon: connectionRestored ? (
        !wallet ? (
          <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
        ) : (
          <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
        )
      ) : (
        <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
      )
    },
    {
      id: 1,
      type: SETTING_TYPE.WALLET_TON,
      image: 'wallet',
      title: 'Wallet Connect',
      text: 'EVM Wallet',
      icon: connectionRestored ? (
        !wallet ? (
          <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700 outline-none" />
        ) : (
          <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700 outline-none" />
        )
      ) : (
        <IconLoader className="size-7 xs:size-8 2xs:size-9 text-gray animate-spin outline-none" />
      )
    }
  ]

  const handleClick = (type: string) => {
    buttonSound.play()
    switch (type) {
      case SETTING_TYPE.WALLET_TON:
        break
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
                          <div className="size-5 xs:size-6 [clip-path:_polygon(6px_0%,100%_0,100%_calc(100%_-_6px),calc(100%_-_6px)_100%,0_100%,0_6px)]">
                            <img src={`/assets/images/${item.image}@2x.png`} alt="DePIN Alliance" />
                          </div>
                          <p>{item.text}</p>
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
    </>
  )
}
