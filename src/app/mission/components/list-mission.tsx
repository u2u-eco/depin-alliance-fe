/* eslint-disable @next/next/no-img-element */
import CustomButton from '@/app/components/button'
import CustomList from '@/app/components/custom-list'
import CustomModal from '@/app/components/custom-modal'
import CustomToast from '@/app/components/ui/custom-toast'
import { LIST_TYPE, SHARE_URL, TELE_URI } from '@/constants'
import { formatNumber } from '@/helper/common'
import { useTelegram } from '@/hooks/useTelegram'
import { IItemMissionPartner, IMissionItem } from '@/interfaces/i.missions'
import { claimTask, verifyMission } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import useMissionStore from '@/stores/missionsStore'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import SpecialBoxModal from './special-box'
import { loginTwitter, twitterInfo } from '@/services/twitter'
import ButtonVerifying from './button-verifying'
import Link from 'next/link'
import { IconOpenLink } from '@/app/components/icons'
import { useAppKit, useAppKitAccount, useAppKitState, useWalletInfo } from '@reown/appkit/react'
import { useDisconnect, useSignMessage } from 'wagmi'
import { setUserConnectWallet } from '@/services/user'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
interface IListMission {
  title?: string
  missions?: IMissionItem[] | IItemMissionPartner[]
  id?: number
  listMission: {
    group: string
    missions: IMissionItem[] | IItemMissionPartner[]
  }[]
  refetch?: () => void
}
const MESSAGE_SIGN = 'DepinAlliance User Signature'
const DISABLE_OPEN_TELE_LINK = ['web', 'weba', 'unknown']
const TYPES_LOGIN_X = ['CONNECT_X', 'LIKE_TWITTER', 'RETWEETS', 'TWEET_REPLIES']
const NAMES_LOGIN_X = ['follow u2u network x']
export default function ListMission({ listMission, refetch }: IListMission) {
  const [isVerified, setVerified] = useState<boolean>(false)
  const [isVerifying, setVerifying] = useState<boolean>(false)
  const [isCheckMission, setCheckMission] = useState<boolean>(false)
  const [isConnectTwitter, setIsConnectTwitter] = useState<boolean>(false)
  const router = useRouter()
  const refTimeoutCheck = useRef<any>()
  const { webApp } = useTelegram()
  const refSpecialItem = useRef<any>()
  const { getUserInfo, userInfo, userTwitter, setUserTwitter } = useCommonStore()
  const { setCurrentMissionQuiz } = useMissionStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [loadingButton, setLoadingButton] = useState(false)
  const [twitterLoginUrl, setTwitterLoginUrl] = useState<string>('')
  const {
    isOpen: isOpenSpecial,
    onOpen: onOpenSpecial,
    onOpenChange: onOpenChangeSpecial,
    onClose: onCloseSpecial
  } = useDisclosure()
  const currentItem = useRef<any>()
  const { open: openEVMConnect } = useAppKit()
  const { open: isOpenEVM } = useAppKitState()
  const { address: addressEVM, isConnected: isConnectedEVM } = useAppKitAccount()
  const { walletInfo: walletEVMInfo } = useWalletInfo()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const signMessage = useRef<any>(null)
  const signMessageTON = useRef<any>(null)
  const [tonConnectUI] = useTonConnectUI()
  const tonWallet: any = useTonWallet()

  // const tonAddress = useTonAddress()

  tonConnectUI.setConnectRequestParameters({
    state: 'ready',
    value: { tonProof: MESSAGE_SIGN }
  })

  const getUrlTwitterLogin = async () => {
    setLoadingButton(true)
    const res = await loginTwitter()
    if (res.status && res.data) {
      if (res.data?.twitterUsername || res.data?.twitterName) {
        setUserTwitter(res.data)
      } else {
        setTwitterLoginUrl(res.data)
      }
    }
    setLoadingButton(false)
  }

  const handleClick = async (item: any) => {
    if (item.status === 'CLAIMED') return
    if (item.status === 'VERIFIED') {
      setVerified(true)
    } else {
      setCheckMission(false)
      setVerified(false)
    }
    currentItem.current = item
    setVerifying(false)
    if (currentItem.current.status === 'VERIFYING') {
      setVerifying(true)
    }
    if (
      (TYPES_LOGIN_X.indexOf(currentItem.current.type) !== -1 ||
        NAMES_LOGIN_X.indexOf(currentItem.current.name.toLowerCase()) !== -1) &&
      (!userTwitter || !userTwitter?.twitterUsername)
    ) {
      setIsConnectTwitter(true)
      getUrlTwitterLogin()
      onOpen()
    } else {
      setIsConnectTwitter(false)
      onOpen()
    }
  }

  const handleVerifyMission = async (id: number, disableMessage?: boolean) => {
    if (isVerified) return
    setLoadingButton(true)
    let message = null
    if (currentItem?.current?.type === 'CONNECT_OKX_WALLET_EVM' && signMessage.current) {
      message = signMessage.current
    }

    if (currentItem?.current?.type === 'CONNECT_OKX_WALLET_TON' && signMessageTON.current) {
      message = signMessageTON.current
    }

    const res = await verifyMission(id, currentItem?.current?.isDaily, message)
    if (res.status && res.data !== 'false') {
      if (res.data === 'true') {
        setVerified(true)
      }
      if (res.data === 'verifying') {
        setVerifying(true)
      }
      refetch && refetch()
    } else {
      if (!disableMessage) {
        toast.error(<CustomToast type="error" title="Mission not completed!" />)
      }
    }
    setLoadingButton(false)
    return res
  }

  const checkMission = async (id: number) => {
    const res = await verifyMission(id, currentItem?.current?.isDaily)
    if (
      (TYPES_LOGIN_X.indexOf(currentItem.current.type) !== -1 ||
        NAMES_LOGIN_X.indexOf(currentItem.current.name.toLowerCase()) !== -1) &&
      webApp?.openLink
    ) {
      webApp.openLink(currentItem.current.url)
    } else {
      if (
        currentItem.current.type === 'TELEGRAM' &&
        webApp?.openTelegramLink &&
        DISABLE_OPEN_TELE_LINK.indexOf(webApp?.platform) === -1
      ) {
        webApp.openTelegramLink(currentItem.current.url)
      } else {
        window.open(currentItem.current.url, '_blank')
      }
    }

    setTimeout(() => {
      if (res.status && res.data !== 'false') {
        if (res.data === 'true') {
          setVerified(true)
        }
        if (res.data === 'verifying') {
          setVerifying(true)
        }
        refetch && refetch()
      }
    })
  }

  const handleShare = () => {
    try {
      if (userInfo) {
        // userInfo.detectDevice === 'Unknown Device'
        const folder = userInfo.devicePlatform === 'iOS' ? 'IOS' : 'Android'
        const link = `${SHARE_URL}/${folder}/${folder.toLowerCase()}-${userInfo.pointBonus}.png`

        const shareLink = `${TELE_URI}?startapp=${userInfo?.code}`
        const botName = TELE_URI?.replaceAll('https://', '')
        if (userInfo.isPremium) {
          webApp?.shareToStory(link, {
            text: `Play ${botName} #DePINAlliance #DePINApp #U2UDePIN`,
            widget_link: {
              url: shareLink,
              name: 'Join Now!'
            }
          })
        } else {
          webApp?.shareToStory(link, {
            text: `Play ${botName} #DePINAlliance #DePINApp #U2UDePIN`
          })
        }
      }
    } catch (ex: any) {
      setLoadingButton(false)
      toast.error(<CustomToast type="error" title={ex.message || 'Error'} />)
    }
  }

  const handleClaim = async () => {
    setLoadingButton(true)
    const res = await claimTask(currentItem.current.id, currentItem?.current?.isDaily)
    if (res.status) {
      if (res.data?.amount > 0) {
        refSpecialItem.current = res.data
        onOpenSpecial()
      }
      toast.dismiss()
      toast.success(
        <CustomToast
          type="success"
          title="Mission is completed!"
          point={currentItem.current?.point}
        />
      )
      refetch && refetch()
      getUserInfo()
      onClose()
    }
    setLoadingButton(false)
  }

  const handleMission = () => {
    if (loadingButton || isVerifying) return
    if (isVerified) {
      handleClaim()
      return
    }
    let timeOut = 1000
    if (isCheckMission) {
      handleVerifyMission(currentItem.current.id)
    } else {
      setLoadingButton(true)
      clearTimeout(refTimeoutCheck.current)
      refTimeoutCheck.current = setTimeout(() => {
        if (!isVerified) {
          setCheckMission(true)
        }
        setLoadingButton(false)
      }, timeOut)

      switch (currentItem.current.type) {
        case 'SHARE_STORY':
          handleShare()
          break
        case 'QUIZ':
          timeOut = 2000
          router.push('/mission/quiz')
          setCurrentMissionQuiz(currentItem.current)
          break
        case 'CONNECT_OKX_WALLET_TON':
          if (tonWallet) {
            if (signMessageTON.current && tonWallet.name === 'okx wallet') {
              clearTimeout(refTimeoutCheck.current)
              setCheckMission(true)
              setLoadingButton(false)
            } else {
              clearTimeout(refTimeoutCheck.current)
              tonConnectUI.disconnect()
              setTimeout(() => {
                tonConnectUI.openSingleWalletModal('okxTonWallet')
              }, 2000)
            }
          } else {
            clearTimeout(refTimeoutCheck.current)
            tonConnectUI.openSingleWalletModal('okxTonWallet')
          }
          break
        case 'CONNECT_OKX_WALLET_EVM':
          if (
            isConnectedEVM &&
            walletEVMInfo?.name?.toLowerCase() === 'ví okx web3' &&
            addressEVM
          ) {
            clearTimeout(refTimeoutCheck.current)
            if (signMessage.current) {
              setCheckMission(true)
              setLoadingButton(false)
            } else {
              handleSign(addressEVM)
            }
          } else {
            clearTimeout(refTimeoutCheck.current)
            disconnect()
            setTimeout(() => {
              openEVMConnect()
            }, 2000)
          }
          break
        case 'CONNECT_X':
          if (!userTwitter?.twitterUsername && twitterLoginUrl) {
            if (webApp?.platform === 'android' && webApp?.openLink) {
              webApp.openLink(twitterLoginUrl)
            } else {
              window.open(twitterLoginUrl, '_blank')
            }
            setCheckMission(false)
            setLoadingButton(false)
            onClose()
          } else {
            setVerified(true)
            setLoadingButton(false)
          }
          break
        default:
          if (currentItem.current.url) {
            if (
              (TYPES_LOGIN_X.indexOf(currentItem.current.type) !== -1 ||
                NAMES_LOGIN_X.indexOf(currentItem.current.name.toLowerCase()) !== -1) &&
              !userTwitter?.twitterUsername &&
              twitterLoginUrl
            ) {
              if (webApp?.platform === 'android' && webApp?.openLink) {
                webApp.openLink(twitterLoginUrl)
              } else {
                window.open(twitterLoginUrl, '_blank')
              }
              setCheckMission(false)
              setLoadingButton(false)
              clearTimeout(refTimeoutCheck.current)
              onClose()
              return
            }
            if (webApp?.platform === 'android') {
              checkMission(currentItem.current.id)
            } else {
              if (
                currentItem.current.type === 'TELEGRAM' &&
                webApp?.openTelegramLink &&
                DISABLE_OPEN_TELE_LINK.indexOf(webApp?.platform) === -1
              ) {
                webApp.openTelegramLink(currentItem.current.url)
              } else {
                window.open(currentItem.current.url, '_blank')
              }
            }
          }
          break
      }
    }
  }

  const checkTwitterLogin = async (isFetchList?: boolean) => {
    if (!userTwitter?.twitterUsername) {
      const res = await twitterInfo()
      if (res.status && res.data) {
        setUserTwitter(res.data)
        if (isFetchList) {
          refetch && refetch()
        }
      }
    }
  }

  useEffect(() => {
    checkTwitterLogin()
  }, [])

  const handleVisible = async () => {
    if (!document.hidden) {
      if (
        !userTwitter?.twitterUsername &&
        (TYPES_LOGIN_X.indexOf(currentItem.current?.type) !== -1 ||
          NAMES_LOGIN_X.indexOf(currentItem.current?.name.toLowerCase()) !== -1)
      ) {
        checkTwitterLogin(true)
      }
    }
  }

  const getTitleBtn = () => {
    if (isVerifying) {
      return 'VERIFYING'
    }
    if (isVerified) {
      return 'Claim Now'
    }
    if (isCheckMission) {
      return 'CHECK MISSION'
    }
    if (isConnectTwitter) {
      return 'Connect your twitter'
    }
    return 'START MISSION'
  }

  const handleRefetch = async () => {
    if (refetch) {
      const res: any = await refetch()
      if (res.status === 'success' && res.data) {
        const _currentId = currentItem?.current.idCheck || currentItem.current.id
        res.data?.forEach((item: any) => {
          item.missions.forEach((mission: any) => {
            if (
              (currentItem?.current.idCheck && mission.idCheck === _currentId) ||
              (!currentItem?.current.idCheck && mission.id === _currentId)
            ) {
              currentItem.current = mission
              if (mission.status === 'VERIFIED') {
                setVerified(true)
                setVerifying(false)
              }
              if (!mission.status) {
                setCheckMission(false)
                setVerified(false)
                setVerifying(false)
              }
            }
          })
        })
      }
    }
  }

  const handleSign = async (account: any) => {
    try {
      const message = await signMessageAsync({
        message: MESSAGE_SIGN,
        account
      })
      if (message) {
        signMessage.current = message
        setCheckMission(true)
        setLoadingButton(false)
      }
    } catch (ex: any) {
      // onClose()
      toast.error(<CustomToast type="error" title={`${ex?.details || 'User reject'}`} />)
    }
  }

  const handleUserConnect = (data: any) => {
    setUserConnectWallet(data)
  }

  const handleClose = () => {
    onClose()
    setLoadingButton(false)
  }

  const isShowLink =
    (currentItem?.current?.type !== 'CONNECT_X' &&
      [...TYPES_LOGIN_X, 'TWITTER'].indexOf(currentItem?.current?.type) !== -1) ||
    NAMES_LOGIN_X.indexOf(currentItem?.current?.name.toLowerCase()) !== -1

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisible)
    return () => {
      document.removeEventListener('visibilitychange', handleVisible)
    }
  }, [])

  useEffect(() => {
    if (walletEVMInfo?.name && isConnectedEVM) {
      if (
        addressEVM &&
        currentItem.current?.type === 'CONNECT_OKX_WALLET_EVM' &&
        walletEVMInfo?.name?.toLowerCase() === 'ví okx web3'
      ) {
        let _account: any = addressEVM
        handleSign(_account)
        handleUserConnect({
          address: _account,
          type: 'EVM',
          connectFrom: 'OKX'
        })
      } else {
        if (walletEVMInfo?.name?.toLowerCase() !== 'ví okx web3') {
          setLoadingButton(false)
          setTimeout(() => {
            disconnect()
          }, 1000)
        }
      }
    }
  }, [isConnectedEVM, walletEVMInfo])

  useEffect(() => {
    if (tonWallet && tonWallet?.appName) {
      if (
        currentItem.current?.type === 'CONNECT_OKX_WALLET_TON' &&
        tonWallet.connectItems?.tonProof?.proof?.signature &&
        tonWallet?.appName === 'okxTonWallet'
      ) {
        signMessageTON.current = tonWallet.connectItems?.tonProof?.proof?.signature
        setCheckMission(true)
        setLoadingButton(false)
        handleUserConnect({
          address: tonWallet.account?.address,
          type: 'TON',
          connectFrom: 'OKX'
        })
      } else {
        if (tonWallet?.appName !== 'okxTonWallet') {
          tonConnectUI.disconnect()
        }
      }
    }
  }, [tonWallet])

  useEffect(() => {
    if (loadingButton && !isOpenEVM && !isConnectedEVM) {
      setLoadingButton(false)
    }
  }, [isOpenEVM, isConnectedEVM])
  return (
    <>
      {listMission.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <CustomList
            type={LIST_TYPE.MISSION}
            title={item.group}
            data={item.missions}
            pointKey="point"
            key={index}
            onClickItem={handleClick}
            imageItemKey="image"
          />
        </React.Fragment>
      ))}

      <CustomModal
        title={'Mission'}
        isOpen={isOpen}
        onOpen={onOpen}
        isDismissable={
          currentItem?.current?.type === 'CONNECT_OKX_WALLET_TON' ||
          currentItem?.current?.type === 'CONNECT_OKX_WALLET_EVM'
            ? true
            : false
        }
        onOpenChange={onOpenChange}
        onClose={handleClose}
      >
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>Complete the following task:</p>
            {isShowLink && currentItem?.current?.url ? (
              <Link
                className="text-gradient flex items-center justify-center"
                href={currentItem?.current?.url}
                target="_blank"
              >
                “{currentItem.current?.name}”
                <IconOpenLink className="ml-[2px] text-yellow-500 size-5" />
              </Link>
            ) : (
              <p className="text-gradient">“{currentItem.current?.name}”</p>
            )}
          </div>
          <div className="my-8 space-x-3 xs:space-x-4 flex items-center justify-center">
            <div className="[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] bg-white/10 size-[80px] xs:size-[85px] 2xs:size-[90px] min-w-[80px] xs:min-w-[85px] 2xs:min-w-[90px] flex items-center justify-center">
              <img
                className="size-8 xs:size-9 2xs:size-10"
                src={
                  currentItem.current?.image
                    ? currentItem.current?.image
                    : `/assets/images/icons/icon-mission-gradient.svg`
                }
                alt="DePIN Alliance"
              />
            </div>
            <div className="space-y-1.5 xs:space-y-2">
              <p className=" text-title font-semibold">REWARD:</p>
              <div className="flex items-center flex-wrap space-x-1.5 xs:space-x-2">
                {currentItem.current?.point ? (
                  <div className="flex items-center space-x-1.5 xs:space-x-2">
                    <Image
                      className="size-4 xs:size-5 2xs:size-6"
                      width={24}
                      height={24}
                      src="/assets/images/point@2x.png"
                      alt="Point"
                    />
                    <p className="text-green-500">
                      {formatNumber(currentItem.current?.point, 0, 0)}
                    </p>
                  </div>
                ) : null}
                {currentItem.current?.amount > 0 && (
                  <>
                    {currentItem.current?.point ? (
                      <div className="w-[1px] h-[20px] bg-white/25"></div>
                    ) : null}
                    <div className="flex items-center space-x-1">
                      <Image
                        className="size-6 xs:size-7 2xs:size-8"
                        width={30}
                        height={30}
                        src={currentItem.current?.rewardImage}
                        alt={currentItem.current?.rewardName}
                      />
                      <p className="text-primary font-geist font-semibold">{`${currentItem?.current.amount} ${currentItem?.current?.rewardName === 'OPEN' ? '$OPEN' : currentItem?.current?.rewardName}`}</p>
                    </div>
                  </>
                )}
                {currentItem.current?.xp > 0 && (
                  <>
                    {currentItem.current?.point || currentItem.current?.box ? (
                      <div className="w-[1px] h-[20px] bg-white/25"></div>
                    ) : null}
                    <div className="flex items-center space-x-1">
                      <p className="text-primary font-geist font-semibold">{`${formatNumber(currentItem.current.xp, 0, 0)} XP`}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {isVerifying ? (
            <ButtonVerifying reload={handleRefetch} />
          ) : (
            <CustomButton
              isLoading={loadingButton}
              disable={isVerifying}
              title={getTitleBtn()}
              onAction={handleMission}
            />
          )}
        </div>
      </CustomModal>
      <SpecialBoxModal
        isOpen={isOpenSpecial}
        onOpen={onOpenSpecial}
        onClose={onCloseSpecial}
        item={refSpecialItem.current}
        onOpenChange={onOpenChangeSpecial}
      />
    </>
  )
}
