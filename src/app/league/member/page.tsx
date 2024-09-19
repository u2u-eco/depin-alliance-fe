'use client'

import CustomPage from '@/app/components/custom-page'
import { IconAdmin, IconPoint } from '@/app/components/icons'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import AllMember from './components/all-member'
import RankingMember from './components/ranking-member'
import { CustomHeader } from '@/app/components/ui/custom-header'
import useCommonStore from '@/stores/commonStore'
import { formatNumber } from '@/helper/common'

const MEMBER_TYPE = {
  ALL: 'all',
  RANKING: 'ranking'
}

export default function MemberPage() {
  const [activeType, setActiveType] = useState(MEMBER_TYPE.ALL)
  const { userInfo } = useCommonStore()
  const [totalMember, setTotalMember] = useState<number>(0)

  const handleSelectTab = (tab: string) => {
    setActiveType(tab)
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-yellow-500 before:blur-[75px] before:opacity-30 before:z-[-1]"
        }}
      >
        <div className="space-y-6 xs:space-y-8">
          <CustomHeader title="member" />
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
                        src={userInfo?.avatar || '/assets/images/avatar/avatar-main-01@2x.png'}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 xs:space-y-2">
                    <p className="text-white font-mona text-base xs:text-lg font-semibold leading-[22px] [word-break:_break-word;]">
                      {userInfo?.username}
                    </p>
                    <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
                      <IconPoint className="size-4 xs:size-5 2xs:size-6" />
                      <p className="text-green-500 font-semibold">{`${formatNumber(userInfo?.miningPower || 0, 0, 2)}/h`}</p>
                    </div>
                  </div>
                </div>
                <IconAdmin gradient className="size-7 xs:size-8 2xs:size-9 mx-2 xs:mx-3 2xs:mx-4" />
              </div>
            </div>
          </div>
          <div className="space-y-3 xs:space-y-4">
            <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
              MEMBERS <span className="text-title">({totalMember})</span>
            </p>
            <div className="space-y-6">
              {/* <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4">
                {Object.values(MEMBER_TYPE).map((item, index) => (
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => handleSelectTab(item)}
                  >
                    <img
                      className="mx-auto transition-all"
                      src={`/assets/images/upgrade/upgrade-tab${activeType === item ? '-active' : ''}.svg`}
                      alt="DePIN Alliance"
                    />
                    <div
                      className={`absolute transition-all top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
                    >
                      {item}
                    </div>
                  </motion.div>
                ))}
              </div> */}
              {activeType === MEMBER_TYPE.RANKING ? (
                <RankingMember />
              ) : (
                <AllMember setTotalMember={setTotalMember} />
              )}
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
