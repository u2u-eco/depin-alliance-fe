'use client'

import CustomPage from '@/app/components/custom-page'
import { CustomHeader } from '@/app/components/ui/custom-header'
import CustomInputSearch from '@/app/components/ui/custom-input-search'
import React from 'react'
import dayjs from 'dayjs'
import CustomRank from '@/app/components/ui/custom-rank'

const data = {
  currentRank: 5,
  ranking: [
    { avatar: '', name: 'Migos Drip Clan', level: 0 },
    { avatar: '', name: 'RedDog Clan', level: 0 },
    { avatar: '', name: 'Black Rhinos', level: 0 },
    { avatar: '', name: 'Black Rhinos', level: 0 },
    { avatar: '', name: 'Space Cartel', level: 0 },
    { avatar: '', name: 'Black Rhinos', level: 0 }
  ]
}

export default function AllLeaguePage() {
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "[--size:_300px] xs:[--size:_355px] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-275px] before:size-[var(--size)] before:rounded-[50%] before:bg-yellow-500 before:blur-[75px] before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:bottom-[-40px] after:right-[-20px] after:rotate-[-15deg] after:rounded-full after:bg-gradient after:opacity-30 after:z-[-1] after:blur-[55px] xs:after:blur-[68px] after:w-[100px] xs:after:w-[120px] after:h-[400px] xs:after:h-[500px]"
        }}
      >
        <div className="space-y-6 xs:space-y-8">
          <CustomHeader title="ALL LEAGUES" />
          <CustomInputSearch placeholder="Search league..." />
          <div className="mt-4">
            <div className="btn default cursor-default font-geist">
              <div className="btn-border"></div>
              <div className="btn-default max-xs:!py-2.5 max-xs:!px-3">
                <div className="flex items-center justify-center space-x-4 min-[355px]:space-x-6 xs:space-x-8 2xs:space-x-10">
                  <div className="w-4 xs:w-6 2xs:w-[30px] h-[1px] bg-yellow-800"></div>
                  <div className="space-y-1 text-center">
                    <p className="uppercase text-[13px] xs:text-sm font-semibold leading-[16px] text-yellow-600">
                      LAST UPDATE
                    </p>
                    <div className="text-white xs:text-[15px] 2xs:text-base font-normal leading-[20px] whitespace-nowrap">
                      {dayjs().format('DD/MM/YYYY - HH:mm:ss')}
                    </div>
                  </div>
                  <div className="w-4 xs:w-6 2xs:w-[30px] h-[1px] bg-yellow-800"></div>
                </div>
              </div>
              <div className="btn-border"></div>
            </div>
          </div>
          <div className="mt-6 xs:mt-8 2xs:mt-10">
            <CustomRank data={data} type="league" />
          </div>
        </div>
      </CustomPage>
    </>
  )
}
