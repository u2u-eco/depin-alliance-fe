'use client'

import React, { useEffect, useState } from 'react'
import CustomPage from '../components/custom-page'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'
import Link from 'next/link'
import { CustomHeader } from '../components/ui/custom-header'
import {
  IconLink,
  IconLoader,
  IconMusic,
  IconNotification,
  IconOpenLink,
  IconSound,
  IconUnlink,
  IconWallet
} from '../components/icons'
import { motion } from 'framer-motion'
import useCommonStore from '@/stores/commonStore'
import { SETTING_TYPE } from '@/constants'
import { setUserConnectWallet, updateSetting } from '@/services/user'
import { toast } from 'sonner'
import CustomToast from '../components/ui/custom-toast'
import { useAppSound } from '@/hooks/useAppSound'
import {
  TonConnectButton,
  useTonWallet,
  useTonAddress,
  useTonConnectUI,
  useTonConnectModal,
  useIsConnectionRestored
} from '@tonconnect/ui-react'
import { formatAddress } from '@/helper/common'
import { useAppKit, useAppKitAccount, useWalletInfo } from '@reown/appkit/react'
import { useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'

const listSocial = [
  // { id: 1, icon: 'facebook', link: '#' },
  // { id: 3, icon: 'discord', link: '#' },
  { id: 1, icon: 'x', link: 'https://x.com/DePINApp' },
  { id: 3, icon: 'telegram', link: 'https://t.me/DePIN_App' },
  { id: 2, icon: 'logo', link: 'https://depinalliance.xyz/ ' }
]

export default function SettingPage() {
  const router = useRouter()
  const userFriendlyAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const connectionRestored = useIsConnectionRestored()
  const { open: openEVMConnect } = useAppKit()
  const { address: addressEVM, isConnected: isConnectedEVM } = useAppKitAccount()
  const { walletInfo: walletEVMInfo } = useWalletInfo()
  const { open } = useTonConnectModal()
  const { disconnect } = useDisconnect()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { userSetting, getUserSetting } = useCommonStore()
  const { buttonSound } = useAppSound()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [type, setType] = useState(SETTING_TYPE.WALLET_TON)
  const wallet: any = useTonWallet()
  const iconWallet = <IconWallet className="size-7 xs:size-8 2xs:size-9" gradient />

  const handleUpdateSetting = async (data: { setting: string; enable: boolean }) => {
    if (isLoading) return
    setLoading(true)
    const res = await updateSetting(data)
    if (res.status) {
      toast.dismiss()
      toast.success(<CustomToast type="success" title="Update config successfully" />)
      await getUserSetting()
    }
    setTimeout(() => {
      setLoading(false)
    })
  }

  tonConnectUI.uiOptions = {
    uiPreferences: {
      theme: 'SYSTEM'
    }
  }

  const listSetting = [
    {
      id: 1,
      type: SETTING_TYPE.WALLET,
      image: iconWallet,
      title: 'My Wallet',
      text: 'All my wallets',
      icon: <IconOpenLink className="size-7 xs:size-8 2xs:size-9" gradient />
    },
    // {
    //   id: 1,
    //   type: SETTING_TYPE.WALLET_TON,
    //   image: iconWallet,
    //   title: !wallet ? 'TON Wallet' : wallet?.name || 'Your Wallet',
    //   text: !wallet ? 'TON Connect' : formatAddress(userFriendlyAddress),
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
    //   id: 6,
    //   type: SETTING_TYPE.WALLET_CONNECT,
    //   image: iconWallet,
    //   title: !isConnectedEVM ? 'EVM Wallet' : walletEVMInfo?.name || 'Your wallet',
    //   text: !isConnectedEVM ? 'EVM Connect' : addressEVM && formatAddress(addressEVM),
    //   icon: !isConnectedEVM ? (
    //     <IconLink className="size-7 xs:size-8 2xs:size-9 text-green-700" />
    //   ) : (
    //     <IconUnlink className="size-7 xs:size-8 2xs:size-9 text-yellow-700" />
    //   )
    // },
    // { id: 2, image: SETTING_TYPE.LANGUAGE, title: 'Language', text: 'ENG', icon: 'open-link' },
    {
      id: 2,
      type: SETTING_TYPE.NOTIFICATION,
      image: <IconNotification className="size-7 xs:size-8 2xs:size-9" gradient />,
      title: 'Notification',
      text: userSetting?.enableNotification ? 'Turn on' : 'Turn off',
      active: userSetting?.enableNotification,
      icon: ''
    },
    {
      id: 3,
      type: SETTING_TYPE.MUSIC_THEME,
      image: <IconMusic className="size-7 xs:size-8 2xs:size-9" gradient />,
      title: 'Music Theme',
      text: userSetting?.enableMusicTheme ? 'Turn on' : 'Turn off',
      active: userSetting?.enableMusicTheme,
      icon: ''
    },
    {
      id: 4,
      type: SETTING_TYPE.SOUND_EFFECT,
      image: <IconSound className="size-7 xs:size-8 2xs:size-9" gradient />,
      title: 'Sound Effect',
      active: userSetting?.enableSoundEffect,
      text: userSetting?.enableSoundEffect ? 'Turn on' : 'Turn off',
      icon: ''
    }
    // { id: 5, image: SETTING_TYPE.FEEDBACK, title: 'Send Feedback', text: 'Report bugs, errors,...', icon: 'open-link' },
    // { id: 6, image: SETTING_TYPE.LOGOUT, title: 'Log Out', text: 'Quit this account', icon: 'open-link' },
  ]

  const handleWalletClick = () => {
    if (type === SETTING_TYPE.WALLET_TON) {
      tonConnectUI.disconnect()
    } else {
      disconnect()
    }
    onClose()
  }

  const handleClick = (type: string) => {
    buttonSound.play()
    switch (type) {
      case SETTING_TYPE.WALLET:
        router.push('/setting/wallet')
        break
      case SETTING_TYPE.WALLET_TON:
        if (wallet) {
          setType(type)
          onOpen()
        } else {
          open()
        }
        break
      case SETTING_TYPE.WALLET_CONNECT:
        if (isConnectedEVM) {
          setType(type)
          onOpen()
        } else {
          openEVMConnect()
        }
        break
      case SETTING_TYPE.LANGUAGE:
        console.log(111)
        break
      case SETTING_TYPE.NOTIFICATION:
        handleUpdateSetting({
          setting: type,
          enable: !userSetting?.enableNotification
        })
        break
      case SETTING_TYPE.MUSIC_THEME:
        handleUpdateSetting({
          setting: type,
          enable: !userSetting?.enableMusicTheme
        })
        break
      case SETTING_TYPE.SOUND_EFFECT:
        handleUpdateSetting({
          setting: type,
          enable: !userSetting?.enableSoundEffect
        })
        break
      case SETTING_TYPE.FEEDBACK:
        console.log(111)
        break
      case SETTING_TYPE.LOGOUT:
        console.log(111)
        break
    }
  }

  const handleClickLink = () => {
    buttonSound.play()
  }

  const handleUserConnect = (data: any) => {
    setUserConnectWallet(data)
  }

  useEffect(() => {
    if (wallet) {
      handleUserConnect({
        address: wallet?.account?.address,
        type: 'TON',
        connectFrom: wallet?.name
      })
    }

    if (walletEVMInfo) {
      handleUserConnect({
        address: addressEVM,
        type: 'EVM',
        connectFrom: walletEVMInfo?.name
      })
    }
  }, [wallet, walletEVMInfo])

  useEffect(() => {
    getUserSetting()
  }, [])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
        <CustomHeader title="setting" />
        <div className="[--space:_48px] xs:[--space:_52px] 2xs:[--space:_56px] flex flex-col justify-between h-[calc(100%_-_var(--space))]">
          <div className="my-6 xs:my-7 2xs:my-8">
            <div className=" flex flex-col space-y-3 xs:space-y-4">
              {listSetting.map((item: any) => (
                <div
                  className="relative !bg-transparent "
                  key={item.id}
                  onClick={() => handleClick(item.type)}
                >
                  <div className="relative [--shape:_34px] xs:[--shape:_40px] 2xs:[--shape:_46px] p-2  [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_20px)] bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 xs:space-x-4">
                        <div className="flex items-center justify-center size-[60px] xs:size-[66px] 2xs:size-[72px] bg-white/10 [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)]">
                          {item.image}
                        </div>
                        <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
                          <div className="!text-[#ffffff] font-mona font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] xs:!leading-[22px]">
                            {item.title}
                          </div>
                          <div className="text-body text-sm xs:text-[15px] 2xs:text-base tracking-[-1px] !leading-[18px] xs:!leading-[20px]">
                            {item.text}
                          </div>
                        </div>
                      </div>
                      <motion.div whileTap={{ scale: 0.86 }} className="mr-3 cursor-pointer">
                        {item.type === SETTING_TYPE.SOUND_EFFECT ||
                        item.type === SETTING_TYPE.MUSIC_THEME ||
                        item.type === SETTING_TYPE.NOTIFICATION ? (
                          <div
                            className={`relative size-5 xs:size-6 rotate-45 border-2 border-green-700 transition-all ${item.active ? 'bg-white/10' : ''}`}
                          >
                            <div
                              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${item.active ? 'opacity-100' : ''}`}
                            ></div>
                          </div>
                        ) : (
                          item.icon
                          // <img className="size-9" src={item.icon} alt="DePIN Alliance" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0  border-[12px] xs:border-[14px] 2xs:border-[16px] border-transparent  border-b-white border-r-white opacity-5" />
                </div>
              ))}
            </div>
            {/* <div className="space-y-3 xs:space-y-4">
              {listSetting.map((item: any) => (
                <div
                  className="relative before:z-[-1] before:content-[''] before:absolute before:bottom-0 before:right-0 before:size-6 xs:before:size-7 2xs:before:size-8 before:border-[12px] xs:before:border-[14px] 2xs:before:border-[16px] before:border-transparent before:border-b-white/5 before:border-r-white/5"
                  key={item.id}
                >
                  <div className="[--shape:_34px] xs:[--shape:_40px] 2xs:[--shape:_46px] p-2 flex items-center justify-between [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_20px)] bg-white/5">
                    <div className="flex items-center space-x-3 xs:space-x-4">
                      <div className="flex items-center justify-center size-[60px] xs:size-[66px] 2xs:size-[72px] bg-white/10 [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)]">
                        {item.image}
                      </div>
                      <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
                        <div className="!text-[#ffffff] font-mona font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] xs:!leading-[22px]">
                          {item.title}
                        </div>
                        <div className="text-body text-sm xs:text-[15px] 2xs:text-base tracking-[-1px] !leading-[18px] xs:!leading-[20px]">
                          {item.text}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      whileTap={{ scale: 0.86 }}
                      className="mr-3 cursor-pointer"
                      onClick={() => handleClick(item.type)}
                    >
                      {item.type === SETTING_TYPE.SOUND_EFFECT ||
                      item.type === SETTING_TYPE.MUSIC_THEME ? (
                        <div
                          className={`relative size-5 xs:size-6 rotate-45 border-2 border-green-700 transition-all ${item.active ? 'bg-white/10' : ''}`}
                        >
                          <div
                            className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${item.active ? 'opacity-100' : ''}`}
                          ></div>
                        </div>
                      ) : (
                        <img
                          className="size-9"
                          src={`/assets/images/icons/icon-${item.icon}-green.svg`}
                          alt="DePIN Alliance"
                        />
                      )}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
          <div>
            <img className="mx-auto" src="/assets/images/navbar-frame.svg" alt="" />
            <div className="flex justify-center mt-4 xs:mt-5 2xs:mt-6 mb-4 space-x-3 xs:space-x-4">
              {listSocial.map((item: any) => (
                <Link href={item.link} className="btn default w-auto" target="_blank" key={item.id}>
                  <div className="btn-border"></div>
                  <div
                    onClick={handleClickLink}
                    className="btn-default !p-2 !size-[50px] min-[355px]:!size-[60px] xs:!size-[70px] 2xs:!size-[80px] flex items-center justify-center"
                  >
                    <img
                      className="h-6 xs:h-7 2xs:h-8"
                      src={`/assets/images/icons/icon-${item.icon}-white.svg`}
                      alt="DePIN Alliance"
                    />
                  </div>
                  <div className="btn-border"></div>
                </Link>
              ))}
            </div>
            <div className="text-center text-body text-xs tracking-[-1px]">
              2024 ©. DePIN Alliance. All right reserved
            </div>
          </div>
        </div>
      </CustomPage>
      <CustomModal
        title={
          type === SETTING_TYPE.WALLET_TON || type === SETTING_TYPE.WALLET_CONNECT
            ? 'Disconnect'
            : type === SETTING_TYPE.LANGUAGE
              ? 'Language'
              : 'Log Out'
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        {type !== SETTING_TYPE.LANGUAGE ? (
          <div>
            <div className=" text-body text-base tracking-[-1px] text-center">
              {type === SETTING_TYPE.WALLET_TON || type === SETTING_TYPE.WALLET_CONNECT ? (
                <p>Are you sure you want to disconnect this wallet?</p>
              ) : (
                <p>Are you sure you want to log out this account?</p>
              )}
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
                  {type === SETTING_TYPE.WALLET_TON
                    ? formatAddress(userFriendlyAddress)
                    : addressEVM && formatAddress(addressEVM)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="btn error">
                <div className="btn-border"></div>
                <div className="btn-error" onClick={handleWalletClick}>
                  {type !== SETTING_TYPE.LANGUAGE ? 'Disconnect' : 'Log Out'}
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
