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
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import SpecialBoxModal from './special-box'
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
export default function ListMission({ listMission, refetch }: IListMission) {
  const [isVerified, setVerified] = useState<boolean>(false)
  const [isCheckMission, setCheckMission] = useState<boolean>(false)
  const router = useRouter()
  const refTimeoutCheck = useRef<any>()
  const { webApp } = useTelegram()
  const refSpecialItem = useRef<any>()
  const { getUserInfo, userInfo } = useCommonStore()
  const { setCurrentMissionQuiz } = useMissionStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [loadingButton, setLoadingButton] = useState(false)
  const {
    isOpen: isOpenSpecial,
    onOpen: onOpenSpecial,
    onOpenChange: onOpenChangeSpecial,
    onClose: onCloseSpecial
  } = useDisclosure()
  const currentItem = useRef<any>()
  const handleClick = (item: any) => {
    if (item.status === 'CLAIMED') return
    if (item.status === 'VERIFIED') {
      setVerified(true)
    } else {
      setCheckMission(false)
      setVerified(false)
    }
    currentItem.current = item
    onOpen()
  }

  const handleVerifyMission = async (id: number, disableMessage?: boolean) => {
    if (isVerified) return
    setLoadingButton(true)

    const res = await verifyMission(id)
    if (res.status && res.data) {
      setVerified(true)
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
    const res = await verifyMission(id)
    window.open(currentItem.current.url, '_blank')
    setTimeout(() => {
      if (res.status && res.data) {
        setVerified(true)
      }
    })
  }

  const handleShare = () => {
    try {
      if (userInfo) {
        // userInfo.detectDevice === 'Unknown Device'
        const folder = userInfo.devicePlatform === 'iOS' ? 'IOS' : 'Android'
        const link = `${SHARE_URL}/${folder}/${folder.toLowerCase()}-${userInfo.pointBonus}.png`

        const shareLink = `${TELE_URI}?start=${userInfo?.code}`
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
      toast.error(<CustomToast type="error" title={ex.message || 'Error'} />)
    }
  }

  const handleClaim = async () => {
    setLoadingButton(true)
    const res = await claimTask(currentItem.current.id)
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
    if (loadingButton) return
    if (isVerified) {
      handleClaim()
      return
    }
    let timeOut = 1000
    if (isCheckMission) {
      handleVerifyMission(currentItem.current.id)
    } else {
      setLoadingButton(true)
      switch (currentItem.current.type) {
        case 'SHARE_STORY':
          handleShare()
          break
        case 'QUIZ':
          timeOut = 2000
          router.push('/mission/quiz')
          setCurrentMissionQuiz(currentItem.current)
        default:
          if (currentItem.current.url) {
            if (currentItem.current?.type === 'TELEGRAM' && webApp?.platform === 'android') {
              checkMission(currentItem.current.id)
            } else {
              window.open(currentItem.current.url, '_blank')
            }
          }
          break
      }
      clearTimeout(refTimeoutCheck.current)
      refTimeoutCheck.current = setTimeout(() => {
        setCheckMission(true)
        setLoadingButton(false)
      }, timeOut)
    }
  }

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

      <CustomModal title={'Mission'} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>Complete the following task:</p>
            <p className="text-gradient">“{currentItem.current?.name}”</p>
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
          <CustomButton
            isLoading={loadingButton}
            title={isVerified ? 'Claim Now' : isCheckMission ? 'CHECK MISSION' : 'START MISSION'}
            onAction={handleMission}
          />
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
