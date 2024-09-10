'use client'

import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import DailyCheckIn from './components/daily-check-in'
import Image from 'next/image'
import Missions from './components/missions'
import { Tab, Tabs } from '@nextui-org/react'
import ListPartner from './components/list-partner'

const MISSION_TAB = {
  PARTNERS: 'partners',
  REWARDS: 'rewards'
}

export default function MissionPage() {
  const [activeTab, setActiveTab] = useState(MISSION_TAB.REWARDS)
  const [partnerCount, setPartnerCount] = useState<number>(0)
  const [rewardCount, setRewardCount] = useState<number>(0)
  const handleChangeTab = (tab: any) => {
    setActiveTab(tab)
  }

  const updateListPartner = (count: number) => {
    setPartnerCount(count)
  }

  const updateListReward = (count: number) => {
    setRewardCount(count)
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-gradient-yellow before:z-[-1]"
        }}
      >
        {/* <div>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%' }}
            className="mx-auto"
            src="/assets/images/mission/mission-image@2x.png"
            alt="Mission Image"
          />
        </div> */}
        {/* <Tabs
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
          <Tab key={MISSION_TAB.PARTNERS} title={`${MISSION_TAB.PARTNERS} (${partnerCount})`}></Tab>
          <Tab key={MISSION_TAB.REWARDS} title={`${MISSION_TAB.REWARDS} (${rewardCount})`}></Tab>
        </Tabs> */}
        <div className={`${activeTab === MISSION_TAB.PARTNERS ? '' : 'hidden'}`}>
          <ListPartner updateListPartner={updateListPartner} />
        </div>
        <div className={`${activeTab === MISSION_TAB.PARTNERS ? 'hidden' : ''}`}>
          <>
            <div className="space-y-4">
              <DailyCheckIn />
            </div>
            <div>
              <Missions updateListReward={updateListReward} />
            </div>
          </>
        </div>
        {/* {activeTab === MISSION_TAB.PARTNERS ? (
          <ListPartner updateListPartner={updateListPartner} />
        ) : (
          <>
            <div className="space-y-4">
              <DailyCheckIn />
            </div>
            <div>
              <Missions updateListReward={updateListReward} />
            </div>
          </>
        )} */}
      </CustomPage>
    </>
  )
}
