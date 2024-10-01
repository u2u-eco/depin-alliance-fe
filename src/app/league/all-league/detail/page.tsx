'use client'

import CustomPage from '@/app/components/custom-page'
import {
  IconFund,
  IconGroupUser,
  IconOpenLink,
  IconPoint,
  IconProfit,
  IconRank
} from '@/app/components/icons'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { useAppSound } from '@/hooks/useAppSound'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DetailLeaguePage() {
  const router = useRouter()
  const { tabSound } = useAppSound()

  const handleTabSound = () => {
    tabSound.play()
  }

  const handleRank = () => {
    handleTabSound()
    router.push('/league/all-league')
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-[5%] before:left-[-255px] before:size-[355px] before:rounded-[50%] before:blur-[75px] before:bg-green-500 before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:top-[5%] after:right-[-255px] after:size-[355px] after:rounded-[50%] after:blur-[75px] after:bg-yellow-500 after:opacity-30 after:z-[-1]"
        }}
      >
        <div>
          <CustomHeader title="LEAGUE detail" />
          <div className="relative mt-10 xs:mt-12 2xs:mt-14">
            <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full z-[-1]">
              <img className="mx-auto" src="/assets/images/league/league-background.svg" alt="" />
            </div>
            <div className="space-y-6 mb-6">
              <div className="relative size-[160px] xs:size-[180px] 2xs:size-[200px] mx-auto before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-[14px] before:border-[7px] before:border-transparent before:border-t-white before:border-l-white after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-8 after:border-[16px] after:border-transparent after:border-b-white after:border-r-white">
                <div className="size-full p-[1px] [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)] bg-white">
                  <img
                    className="size-full object-cover [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)]"
                    src={`/assets/images/league/league-03@2x.png`}
                    alt="DePIN Alliance"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 xs:space-x-4 2xs:space-x-6">
                  <div className="size-1.5 min-w-1.5 bg-white"></div>
                  <div className="text-center font-airnt font-medium text-title text-lg xs:text-xl 2xs:text-2xl tracking-[1px] !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px] [text-shadow:_0_0_8px_rgba(255,255,255,0.5)] [word-break:_break-word;]">
                    BLACK RHINOS
                  </div>
                  <div className="size-1.5 min-w-1.5 bg-white"></div>
                </div>
                <div className="flex items-center justify-center space-x-10">
                  <div className="w-8 h-[1px] bg-yellow-800"></div>
                  <div className="text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-yellow-500 uppercase">
                    LV. 12
                  </div>
                  <div className="w-8 h-[1px] bg-yellow-800"></div>
                </div>
                {/* <Link href="/league/ranking" className="flex items-center justify-center space-x-1">
                <p className="text-gradient uppercase font-mona font-semibold">VIEW LEAGUE RANK</p>
                <IconOpenLink gradient className="size-6" />
              </Link> */}
              </div>
            </div>
            <div className="relative w-fit mx-auto my-6 xs:my-7 2xs:my-8">
              <img src="/assets/images/league/in-league-frame.svg" alt="" />
              <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-between px-4 xs:px-6 2xs:px-8 space-x-3 xs:space-x-4">
                <div className="space-y-1 xs:space-y-2">
                  <div className="text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
                    Rank
                  </div>
                  <div
                    className="flex items-center space-x-1.5 xs:space-x-2 cursor-pointer"
                    onClick={handleRank}
                  >
                    <IconRank className="text-white size-6 xs:size-7 2xs:size-8" />
                    <p className="text-green-500 font-semibold text-lg min-[355px]:text-xl xs:text-2xl 2xs:text-[28px] !leading-[24px] min-[355px]:!leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                      10,000
                    </p>
                    <IconOpenLink className="size-6 xs:size-7 2xs:size-8" gradient />
                  </div>
                </div>
                <div className="space-y-1 xs:space-y-2">
                  <div className="text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
                    CONTRIBUTORS
                  </div>
                  <div className="flex items-center space-x-1.5 xs:space-x-2">
                    <IconGroupUser className="size-6 xs:size-7 2xs:size-8 text-white" />
                    <p className="text-green-500 uppercase font-semibold text-xl xs:text-2xl 2xs:text-[28px] !leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                      581
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 xs:space-x-4">
              <div className="flex-1">
                <div className="btn cursor-default">
                  <div className="btn-border"></div>
                  <div className="font-geist !px-2 !py-4 xs:!py-5 2xs:!py-6 relative w-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:[background:_linear-gradient(to_bottom,rgba(146,152,32,0),rgba(146,152,32,1))] before:opacity-15 before:z-[-1]">
                    <div className="space-y-3 xs:space-y-4">
                      <IconFund className="text-yellow-500 size-8 xs:size-10 2xs:size-12 mx-auto" />
                      <div className="space-y-1.5 xs:space-y-2">
                        <p className="text-center text-[13px] xs:text-sm font-normal uppercase text-title tracking-[-1px] leading-[18px]">
                          FUND
                        </p>
                        <div className="flex items-center justify-center space-x-1.5 xs:space-x-2">
                          <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                          <p className="text-yellow-500 font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px] uppercase">
                            100K
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="btn cursor-default">
                  <div className="btn-border"></div>
                  <div className="font-geist !px-2 !py-4 xs:!py-5 2xs:!py-6 relative w-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:[background:_linear-gradient(to_bottom,rgba(0,153,86,0),rgba(0,153,86,1))] before:opacity-15 before:z-[-1]">
                    <div className="space-y-3 xs:space-y-4">
                      <IconProfit className="text-green-500 size-8 xs:size-10 2xs:size-12 mx-auto" />
                      <div className="space-y-1.5 xs:space-y-2">
                        <p className="text-center text-[13px] xs:text-sm font-normal uppercase text-title tracking-[-1px] leading-[18px]">
                          POWER
                        </p>
                        <div className="flex items-center justify-center space-x-1.5 xs:space-x-2">
                          <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                          <p className="text-green-500 font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px] normal-case">
                            101K/h
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
