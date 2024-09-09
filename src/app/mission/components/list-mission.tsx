import CustomList from '@/app/components/custom-list'
import CustomModal from '@/app/components/custom-modal'
import { LIST_TYPE, SHARE_URL } from '@/constants'
import { formatNumber } from '@/helper/common'
import { useTelegram } from '@/hooks/useTelegram'
import { IItemMissionPartner, IMissionItem, IMissionPartner } from '@/interfaces/i.missions'
import { claimTask, getListMission, verifyMission } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
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
  const { webApp } = useTelegram()
  const { getUserInfo, userInfo } = useCommonStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
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
    const res = await verifyMission(id)
    if (res.status && res.data) {
      setVerified(true)
      refetch && refetch()
    } else {
      toast.error('Mission not completed')
    }
  }

  const handleShare = () => {
    if (userInfo) {
      webApp?.shareToStory(
        `${SHARE_URL}/${userInfo.devicePlatform === 'iOS' ? userInfo.devicePlatform.toUpperCase() : userInfo.devicePlatform}/${userInfo.devicePlatform.toLowerCase()}-${userInfo.pointBonus}.png`,
        {
          text: ''
        }
      )
    }
  }

  const handleClaim = async () => {
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
  }

  const handleMission = () => {
    if (isVerified) {
      handleClaim()
      return
    }
    if (isCheckMission) {
      handleVerifyMission(currentItem.current.id)
    } else {
      setCheckMission(true)
      if (currentItem.current.type === 'SHARE_STORY') {
        handleShare()
      } else {
        if (currentItem.current.url) {
          window.open(currentItem.current.url, '_blank')
        }
      }
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
          <div className="my-8 space-x-4 flex items-center justify-center">
            <div className="[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] bg-white/10 size-[90px] flex items-center justify-center">
              <Image
                // className="size-10"
                width={40}
                height={40}
                src={
                  currentItem.current?.image
                    ? currentItem.current?.image
                    : `/assets/images/icons/icon-mission-gradient.svg`
                }
                alt=""
              />
            </div>
            <div className="space-y-2">
              <p className=" text-title font-semibold">REWARD:</p>
              <div className="flex items-center">
                {currentItem.current?.point ? (
                  <div className="flex items-center space-x-2">
                    <Image
                      className="size-6"
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
                      <div className="w-[1px] h-[20px] mx-2 bg-white/25"></div>
                    ) : null}
                    <div className="flex items-center space-x-1">
                      <Image
                        className="size-8"
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
                      <div className="w-[1px] h-[20px] mx-2 bg-white/25"></div>
                    ) : null}
                    <div className="flex items-center space-x-1">
                      <p className="text-primary font-geist font-semibold">{`${formatNumber(currentItem.current.xp, 0, 0)} XP`}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="btn" onClick={handleMission}>
            <div className="btn-border"></div>
            <div className="btn-primary">
              {' '}
              {isVerified ? 'Claim Now' : isCheckMission ? 'CHECK MISSION' : 'START MISSION'}{' '}
            </div>
            <div className="btn-border"></div>
          </div>
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
