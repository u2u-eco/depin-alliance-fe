'use client'

import React from 'react'
import CustomPage from '../components/custom-page'
import { IconCheck, IconChevron, IconHome, IconLock, IconPoint } from '../components/icons'
import { useRouter } from 'next/navigation'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import useCommonStore from '@/stores/commonStore'
import { formatNumber } from '@/helper/common'
import { IUserLevel } from '@/interfaces/i.user'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getNextLevel } from '@/services/user'
import Loader from '../components/ui/loader'
import { CustomHeader } from '../components/ui/custom-header'

export default function LevelPage() {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { userInfo, userConfig } = useCommonStore()
  const { data: listNextLevel, isLoading } = useQuery({
    queryKey: ['getNextLevel'],
    queryFn: getNextLevel
  })

  const listLevel: Array<IUserLevel> = userInfo?.code
    ? [
        {
          level: userInfo.level,
          xp: userInfo.xp,
          maxDevice: userConfig?.maxDevice || 0,
          maximumPower: userInfo.maximumPower,
          xpLevelFrom: userInfo.xpLevelFrom,
          xpLevelTo: userInfo.xpLevelTo - 1,
          pointSkill: userInfo.pointSkill,
          isCurrent: true,
          lock: false
        },
        ...(listNextLevel?.data
          ? listNextLevel.data.map((item: IUserLevel) => {
              return { ...item, lock: true, xpLevelTo: item.xpLevelTo - 1 }
            })
          : [])
      ]
    : listNextLevel?.data || []

  const getCurrentPercentXp = (item: IUserLevel | null) => {
    if (item) {
      const currentXp = item.xp ? item.xp - item.xpLevelFrom : 0
      const maxXp = item.xpLevelTo - item.xpLevelFrom

      if (currentXp > 0) {
        const percent = (currentXp / maxXp) * 100
        return `${percent}%`
      }
    }
    return 0
  }

  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "bg-[linear-gradient(to_bottom,#000_68%,#00331d_100%)] before:content-[''] before:absolute before:left-[-200px] before:top-0 before:size-[250px] before:blur-[50px] before:bg-green-500 before:rounded-[50%] before:z-[-1] before:opacity-30 after:content-[''] after:absolute after:right-[-200px] after:top-0 after:size-[250px] after:blur-[50px] after:bg-green-500 after:rounded-[50%] after:z-[-1] after:opacity-30"
        }}
      >
        {isLoading && (
          <Loader
            classNames={{
              wrapper: ' z-[1] left-[0] absolute bg-black/30',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
        <div className="space-y-10">
          <CustomHeader title="LEVEL" />
          <div className="space-y-6 xs:space-y-7 2xs:space-y-8">
            {listLevel?.map((item: IUserLevel, index: number) => (
              <div className="space-y-4" key={index}>
                <div
                  className={`relative after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-[14px] after:border-[7px] after:border-transparent before:absolute before:content-[''] before:left-1 before:top-1 before:size-[10px] before:border-[5px] before:border-transparent ${item.lock ? 'after:border-b-inactive after:border-r-inactive before:border-t-inactive before:border-l-inactive' : 'after:border-b-green-500 after:border-r-green-500 before:border-t-green-500 before:border-l-green-500'}`}
                >
                  <div
                    className={`relative p-[1px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_22px),calc(100%_-_22px)_100%,0_100%,0_16px)] ${item.lock ? 'bg-inactive' : 'bg-green-500'}`}
                  >
                    <div className="p-2 [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_22px),calc(100%_-_22px)_100%,0_100%,0_16px)] bg-[linear-gradient(to_top,#00170D,#000)] flex items-center space-x-4">
                      <div className="[clip-path:_polygon(12px_0%,100%_0,100%_100%,0_100%,0%_12px)] bg-white/10 size-20 min-w-20 flex items-center justify-center flex-col">
                        <p
                          className={` ${item.lock ? 'text-inactive' : 'text-body'} tracking-[-1px] leading-[18px]`}
                        >
                          Level
                        </p>
                        <p
                          className={` ${item.lock ? 'text-inactive' : 'text-gradient'} text-[32px] xs:text-4xl 2xs:text-[40px] font-bold leading-[50px]`}
                        >
                          {item?.level}
                        </p>
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between tracking-[-1px] leading-[18px]">
                          <div className={item.lock ? `text-inactive` : `text-title`}>
                            {item?.isCurrent ? item?.xp : item?.xpLevelFrom} XP
                          </div>
                          <div className={item.lock ? `text-inactive` : `text-body`}>
                            {item?.xpLevelTo} XP
                          </div>
                        </div>
                        <div className="relative w-full h-1 rounded bg-gray-850">
                          <div
                            style={{ width: `${getCurrentPercentXp(item)}` }}
                            className={`absolute top-0 left-0 h-1 bg-gradient rounded before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:bg-gradient before:blur-[6px]`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn default cursor-default">
                  <div className="btn-border"></div>
                  <div className="btn-default !p-4 relative">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-semibold text-[13px] xs:text-sm leading-[16px]">
                        <div className={`text-body uppercase ${item.lock ? '!text-inactive' : ''}`}>
                          CAPACITY
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconPoint className="size-4" />
                          <p
                            className={`text-green-500 font-geist ${item.lock ? '!text-inactive' : ''}`}
                          >
                            {item?.maximumPower ? formatNumber(item?.maximumPower, 0, 0) : 0}
                          </p>
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-white/10"></div>
                      <div className="flex items-center justify-between font-semibold text-[13px] xs:text-sm leading-[16px]">
                        <div className={`text-body uppercase ${item.lock ? '!text-inactive' : ''}`}>
                          MAXIMUM SLOT DEVICE
                        </div>
                        <p className={`text-title ${item.lock ? '!text-inactive' : ''}`}>
                          {item?.maxDevice}
                        </p>
                      </div>
                      {item.pointSkill !== undefined && (
                        <>
                          <div className="h-[1px] w-full bg-white/10"></div>

                          <div className="flex items-center justify-between font-semibold text-[13px] xs:text-sm leading-[16px]">
                            <div
                              className={`text-body uppercase ${item.lock ? '!text-inactive' : ''}`}
                            >
                              TOTAL SKILL POINT
                            </div>
                            <p className={`text-title ${item.lock ? '!text-inactive' : ''}`}>
                              {item?.pointSkill}
                            </p>
                          </div>
                        </>
                      )}

                      {/* <div className="h-[1px] w-full bg-white/10"></div>
                      <div className="flex items-center justify-between font-semibold text-[13px] xs:text-sm leading-[16px]">
                        <div className="text-body uppercase">BONUS REWARD</div>
                        <p className="text-title">15%</p>
                      </div> */}
                    </div>
                    {item.lock && (
                      <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center flex-col space-y-2 text-inactive bg-black/20">
                        <IconLock className="size-[30px]" />
                        {/* <p className="tracking-[-1px] font-normal text-sm normal-case">
                          Level up to unlock
                        </p> */}
                      </div>
                    )}
                  </div>
                  <div className="btn-border"></div>
                </div>
                {/* {!item.lock && (
                  <div className={`btn ${false ? '' : 'inactive'}`} onClick={onOpen}>
                    <div className="btn-border"></div>
                    <div className={false ? `btn-primary` : `btn-inactive`}>Level Up</div>
                    <div className="btn-border"></div>
                  </div>
                )} */}
                {index !== listLevel?.length - 1 && (
                  <div className="!mt-6 xs:!mt-7 2xs:!mt-8">
                    <img
                      className="mx-auto max-h-[65px] xs:max-h-[75px] 2xs:max-h-[85px]"
                      src={`/assets/images/level/level-arrow${item.lock ? '' : '-color'}.png`}
                      srcSet={`/assets/images/level/level-arrow${item.lock ? '' : '-color'}.png 1x, /assets/images/level/level-arrow${item.lock ? '' : '-color'}@2x.png 2x`}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CustomPage>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: 'max-w-full w-full h-full m-0 rounded-none p-0 bg-black/80 backdrop-blur-[4px]',
          backdrop: 'bg-black/30 backdrop-blur-[8px]'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <div className="relative max-w-[480px] mx-auto w-full h-full">
              <img
                className="mx-auto min-[460px]:h-full object-cover w-full"
                src="/assets/images/level-up-background.png"
                srcSet="/assets/images/level-up-background.png 1x, /assets/images/level-up-background@2x.png 2x"
                alt="Level Up Background"
              />
              <div className="absolute top-0 left-0 right-0 w-full h-full">
                <div className="container-custom">
                  <div className="pb-8 min-[355px]:pb-12 xs:pb-16 min-[400px]:pb-20 2xs:pb-24">
                    <img
                      className="mx-auto h-12 2xs:h-14"
                      src="/assets/images/logo.svg"
                      alt="Logo"
                    />
                  </div>
                  <div className="relative w-fit mx-auto">
                    <img
                      className="size-[130px] 2xs:size[150px]"
                      src="/assets/images/level-up-frame.svg"
                      alt="Frame"
                    />
                    <div className="absolute top-0 left-0 right-0 w-full h-full text-center flex items-center justify-center flex-col">
                      <p className="text-base tracking-[-1px] text-body uppercase leading-[20px]">
                        LEVEL
                      </p>
                      <p className="text-gradient font-bold text-4xl 2xs:text-5xl leading-[60px]">
                        16
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 xs:mt-8 2xs:mt-10 space-y-3 text-center">
                    <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6">
                      <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                      <div className="text-title font-airnt font-medium text-xl xs:text-2xl 2xs:text-3xl uppercase">
                        Level up
                      </div>
                      <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                    </div>
                    <div className="text-body text-[15px] 2xs:text-base tracking-[-1px] leading-[20px]">
                      Congratulations! You’ve reached level 13 and received 1 skill point.
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[20px] xs:bottom-[30px] 2xs:bottom-10 right-[20px] xs:right-[30px] 2xs:right-10">
                <div className="btn" onClick={onClose}>
                  <div className="btn-border"></div>
                  <div className="btn-primary !p-1.5 xs:!p-2 2xs:!p-[9px]">
                    <IconCheck className="text-green-900 size-[30px]" />
                  </div>
                  <div className="btn-border"></div>
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
