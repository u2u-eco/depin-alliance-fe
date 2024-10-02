/* eslint-disable @next/next/no-img-element */
'use client'

import CustomPage from '@/app/components/custom-page'
import { IconAdmin, IconPoint } from '@/app/components/icons'

import React, { useEffect, useRef, useState } from 'react'
import AllMember from './components/all-member'
import { CustomHeader } from '@/app/components/ui/custom-header'
import useCommonStore from '@/stores/commonStore'
import { formatNumber } from '@/helper/common'
import { useRouter } from 'next/navigation'
import { userLeague } from '@/services/league'
import { motion } from 'framer-motion'
import { FUNDING_TYPE } from '@/constants'
import { useAppSound } from '@/hooks/useAppSound'

const MEMBER_TAB = {
  FUNDING: FUNDING_TYPE,
  CONTRIBUTE: 'contribute'
}

export default function MemberPage() {
  const router = useRouter()
  const { currentLeague } = useCommonStore()
  const [totalMember, setTotalMember] = useState<number>(0)
  const [activeTab, setActiveTab] = useState(MEMBER_TAB.FUNDING)
  const [isShowModer, setIsShowModer] = useState(false)
  const { tabSound } = useAppSound()
  const handleSelectTab = (tab: string) => {
    tabSound?.play()
    setActiveTab(tab)
  }

  const _getUserLeague = async () => {
    const res = await userLeague()
    if (!res.status || !res.data || !res.data?.code) {
      router.push('/league')
    }
  }

  const handleShowModer = () => {
    setIsShowModer(!isShowModer)
  }

  const backToMember = () => {
    router.push('/league/in-league')
  }

  const isModer = currentLeague?.isOwner || currentLeague?.role

  useEffect(() => {
    _getUserLeague()
  }, [])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "[--size:_300px] xs:[--size:_355px] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-275px] before:size-[var(--size)] before:rounded-[50%] before:bg-yellow-500 before:blur-[75px] before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:bottom-[-40px] after:right-[-20px] after:rotate-[-15deg] after:rounded-full after:bg-gradient after:opacity-30 after:z-[-1] after:blur-[55px] xs:after:blur-[68px] after:w-[100px] xs:after:w-[120px] after:h-[400px] xs:after:h-[500px]"
        }}
      >
        <div className="space-y-6 xs:space-y-8">
          <CustomHeader title="member" back={backToMember} />
          <div className="space-y-3 xs:space-y-4">
            <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
              ADMIN
            </p>
            <div className="relative p-2">
              <div className="absolute top-0 left-0 right-0 size-full bg-item-yellow z-[-1] opacity-40"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 xs:space-x-4">
                  <div className="relative before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-3 before:border-[6px] before:border-transparent before:border-t-yellow-500 before:border-l-yellow-500 before:z-[-1] after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-[14px] after:border-[7px] after:border-transparent after:border-b-yellow-500 after:border-r-yellow-500 after:z-[-1]">
                    <div className="[--shape:_20px] size-[80px] xs:size-[85px] 2xs:size-[90px] p-[1px] bg-yellow-500 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape));]">
                      <img
                        className="[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape));] size-full"
                        src={
                          currentLeague?.adminAvatar.replace(/-/g, '-main-') ||
                          '/assets/images/avatar/avatar-main-01@2x.png'
                        }
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 xs:space-y-2">
                    <p className="text-white font-mona text-base xs:text-lg font-semibold leading-[22px] [word-break:_break-word;]">
                      {currentLeague?.adminUsername}
                    </p>
                    {/* <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
                      <IconPoint className="size-4 xs:size-5 2xs:size-6" />
                      <p className="text-green-500 font-semibold">{`${formatNumber(currentLeague?.adminMiningPower || 0, 0, 2)}/h`}</p>
                    </div> */}
                  </div>
                </div>
                <IconAdmin gradient className="size-7 xs:size-8 2xs:size-9 mx-2 xs:mx-3 2xs:mx-4" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4 xs:space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
                  MEMBERS <span className="text-title">({formatNumber(totalMember, 0, 0)})</span>
                </p>
                {/* {(currentLeague?.isOwner || currentLeague?.role) && (
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    // onClick={handleShowModer}
                  >
                    <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
                      MODER
                    </p>
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      className="relative size-5 xs:size-6 min-w-5 xs:min-w-6 flex items-center justify-center"
                    >
                      <div
                        className={`border-1.5 border-green-700 rotate-45 size-[15px] xs:size-[18px] p-0.5 xs:p-[3px] transition-background ${isModer ? 'bg-white/10' : ''}`}
                      >
                        <div
                          className={`size-full bg-gradient transition-opacity ${isModer ? 'opacity-100' : 'opacity-0'}`}
                        ></div>
                      </div>
                    </motion.div>
                  </div>
                )} */}
              </div>
              <div className="flex items-center justify-center">
                {Object.values(MEMBER_TAB).map((item, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => handleSelectTab(item)}
                  >
                    <img
                      className="mx-auto max-w-[101%] w-[101%]"
                      src={`/assets/images/league/tab${activeTab === item ? '-active' : ''}.svg`}
                      alt="Upgrade Tab"
                    />
                    <div
                      className={`absolute top-0 h-full left-0 w-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeTab === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <AllMember setTotalMember={setTotalMember} activeTab={activeTab} />
          </div>
        </div>
      </CustomPage>
    </>
  )
}
