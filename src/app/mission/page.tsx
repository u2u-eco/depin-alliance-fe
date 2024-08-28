'use client'

import React from 'react'
import CustomPage from '../components/custom-page'
import DailyCheckIn from './components/daily-check-in'
import Image from 'next/image'
import ListMission from './components/list-mission'

export default function MissionPage() {
  console.log('MissionPage')
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-gradient-yellow before:z-[-1]"
        }}
      >
        <div>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%' }}
            className="mx-auto"
            src="/assets/images/mission-image@2x.png"
            alt="Mission Image"
          />
        </div>
        <div className="space-y-4">
          <DailyCheckIn />
        </div>
        <div>
          <ListMission />
        </div>
      </CustomPage>
    </>
  )
}
