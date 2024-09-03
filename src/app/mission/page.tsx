'use client'

import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import DailyCheckIn from './components/daily-check-in'
import Image from 'next/image'
import ListMission from './components/list-mission'
import { Tab, Tabs } from '@nextui-org/react'
import { IconEmpty } from '../components/icons'
import CustomList from '../components/custom-list'

const MISSION_TAB = {
  PARTNERS: 'partners',
  REWARDS: 'rewards',
}

const listPartners = [
  { id: 1, title: 'Clayton', image: 'mission/clayton'}
]

export default function MissionPage() {
  const [activeTab, setActiveTab] = useState(MISSION_TAB.PARTNERS)

  const handleChangeTab = (tab: any) => {
    setActiveTab(tab)
  }

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
            src="/assets/images/mission/mission-image@2x.png"
            alt="Mission Image"
          />
        </div>
        <Tabs
          variant="underlined"
          classNames={{
            base: 'w-full mt-6 xs:mt-7 2xs:mt-8',
            tabList: 'gap-2 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-gradient rounded',
            tab: 'h-[30px] px-2 font-mona',
            tabContent:
              'group-data-[selected=true]:bg-gradient group-data-[selected=true]:[-webkit-background-clip:_text] group-data-[selected=true]:[-webkit-text-fill-color:_transparent] text-white/25 font-mona font-semibold text-[15px] xs:text-base uppercase'
          }}
          onSelectionChange={handleChangeTab}
        >
          <Tab key={MISSION_TAB.PARTNERS} title={`${MISSION_TAB.PARTNERS} (0)`}></Tab>
          <Tab key={MISSION_TAB.REWARDS} title={`${MISSION_TAB.REWARDS} (4)`}></Tab>
        </Tabs>
        {activeTab === MISSION_TAB.PARTNERS ? (
          <>
            {listPartners.length > 0 ? (
              <div className="mt-5 xs:mt-6">
                <CustomList
                  type="partners"
                  data={listPartners}
                />
              </div>
            ) : (
              <div className="min-h-[200px] xs:min-h-[220px] 2xs:min-h-[240px] flex items-center justify-center flex-col space-y-2.5 xs:space-y-3 2xs:space-y-4">
                <div className="size-16 xs:size-[72px] bg-white/10 flex items-center justify-center [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0%_16px)]">
                  <IconEmpty className="text-inactive size-8 xs:size-9" />
                </div>
                <p className="text-body text-[15px] xs:text-base tracking-[-1px]">No partner available</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="space-y-4">
              <DailyCheckIn />
            </div>
            <div>
              <ListMission />
            </div>
          </>
        )}
      </CustomPage>
    </>
  )
}
