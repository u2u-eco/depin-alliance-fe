import CustomButton from '@/app/components/button'
import CustomList from '@/app/components/custom-list'
import CustomModal from '@/app/components/custom-modal'
import { LIST_TYPE, SHARE_URL, TELE_URI } from '@/constants'
import { formatNumber } from '@/helper/common'
import { useTelegram } from '@/hooks/useTelegram'
import { IItemMissionPartner, IMissionItem } from '@/interfaces/i.missions'
import { claimTask, verifyMission } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import useMissionStore from '@/stores/missionsStore'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
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
  const { webApp } = useTelegram()
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

  const handleVerifyMission = async (id: number) => {
    setLoadingButton(true)
    const res = await verifyMission(id)
    if (res.status && res.data) {
      setVerified(true)
      refetch && refetch()
    } else {
      toast.error('Mission not completed')
    }
    setLoadingButton(false)
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
      toast.error(ex.message || 'Error')
      console.log(ex)
    }
  }

  const handleClaim = async () => {
    setLoadingButton(true)
    const res = await claimTask(currentItem.current.id)
    if (res.status) {
      if (currentItem.current.box > 0) {
        onOpenSpecial()
      } else {
        toast.success('Mission is completed')
      }
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
    if (isCheckMission) {
      handleVerifyMission(currentItem.current.id)
    } else {
      setLoadingButton(true)
      switch (currentItem.current.type) {
        case 'SHARE_STORY':
          handleShare()
          break
        case 'QUIZ':
          router.push('/mission/quiz')
          setCurrentMissionQuiz(currentItem.current)

        default:
          if (currentItem.current.url) {
            window.open(currentItem.current.url, '_blank')
          }
          break
      }
      setTimeout(() => {
        setCheckMission(true)
        setLoadingButton(false)
      }, 1000)
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
                {currentItem.current?.box > 0 && (
                  <>
                    {currentItem.current?.point ? (
                      <div className="w-[1px] h-[20px] bg-white/25"></div>
                    ) : null}
                    <div className="flex items-center space-x-1">
                      <Image
                        className="size-6 xs:size-7 2xs:size-8"
                        width={30}
                        height={30}
                        src="/assets/images/item-special@2x.png"
                        alt="Box"
                      />
                      <p className="text-primary font-geist font-semibold">{`${currentItem?.current.box} box`}</p>
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
      <CustomModal
        isOpen={isOpenSpecial}
        onOpen={onOpenSpecial}
        onClose={onCloseSpecial}
        onOpenChange={onOpenChangeSpecial}
        full
      >
        <div className="h-full flex flex-col justify-between p-4">
          <div className="flex flex-1 flex-col items-center justify-center space-y-3">
            <div className="relative size-[250px]">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] size-full bg-[rgba(0,255,144,0.5)] z-[-1] blur-[75px]"></div>
              <img
                src="/assets/images/item-special.png"
                srcSet="/assets/images/item-special.png 1x, /assets/images/item-special@2x.png 2x"
                alt="DePIN Alliance"
                className="size-full"
              />
            </div>
            <div className="flex items-center justify-center space-x-6 ">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-lg xs:text-xl tracking-[1px] text-title text-center leading-[22px] xs:leading-[24px]">
                Congratulation{' '}
              </div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            <p className="text-body text-base leading-[20px] tracking-[-1px] text-center">
              You’ve received this special box.
            </p>
          </div>
          <div className="m-8">
            <div className="btn" onClick={onCloseSpecial}>
              <div className="btn-border"></div>
              <div className="btn-primary">Claim</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
