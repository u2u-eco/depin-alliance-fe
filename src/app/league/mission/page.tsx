'use client'

import CustomPage from '@/app/components/custom-page'
import {
  IconChevron,
  IconClan,
  IconCongratulation,
  IconGroupUser,
  IconHome
} from '@/app/components/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function MissionPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <CustomPage
      classNames={{
        wrapper:
          "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[-1]"
      }}
    >
      <div className="relative">
        <div className="absolute top-0 left-0 cursor-pointer rotate-90" onClick={handleBack}>
          <IconChevron className="text-green-500 size-6 xs:size-7 2xs:size-8" />
        </div>
        <div className="space-y-5 xs:space-y-6">
          <div className="relative w-fit mx-auto drop-shadow-green before:content-[''] before:absolute before:top-[6px] xs:before:top-[7px] 2xs:before:top-[8px] before:left-[6px] xs:before:left-[7px] 2xs:before:left-[8px] before:border-transparent before:size-2.5 xs:before:size-3 2xs:before:size-[14px] before:border-[5px] xs:before:border-[6px] 2xs:before:border-[7px] before:border-t-green-500 before:border-l-green-500 before:z-[-1] after:content-[''] after:absolute after:bottom-0 after:right-0 after:border-transparent after:size-4 xs:after:size-[18px] 2xs:after:size-5 after:border-[8px] xs:after:border-[9px] 2xs:after:border-[10px] after:border-b-green-500 after:border-r-green-500 after:z-[-1]">
            <div className="[--shape:_22px] xs:[--shape:_26px] 2xs:[--shape:_30px] p-[1px] size-[100px] xs:size-[115px] 2xs:size-[130px] bg-gradient [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))]">
              <div className="[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] bg-[linear-gradient(to_bottom,#000,#00331d)] size-full flex items-center justify-center">
                <IconClan className="size-12 xs:size-14 2xs:size-16" gradient />
              </div>
            </div>
          </div>
          <div className="text-center space-y-1.5">
            <div className="flex items-center justify-center space-x-6">
              <div className="size-1.5 bg-green-100"></div>
              <div className="text-title font-airnt font-medium text-lg xs:text-xl [text-shadow:_0_0_8px_rgba(255,255,255,0.5)] uppercase">
                LEAGUE MISSION
              </div>
              <div className="size-1.5 bg-green-100"></div>
            </div>
            <p className="text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-body whitespace-pre-line">
              OKX Wallet is the safest wallet you can find on market
            </p>
          </div>
          {/* <ListMission
            listMission={[{ group: 'Missions', missions: currentMission?.missions || [] }]}
            refetch={getCurrentMissionById}
          /> */}
        </div>
        <Link href="/home" className="absolute top-0 right-0">
          <IconHome className="size-6 xs:size-7 2xs:size-8" gradient />
        </Link>
      </div>
    </CustomPage>
  )
}
