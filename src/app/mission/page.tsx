'use client'

import React, { useEffect, useState } from 'react'
import CustomPage from '../components/custom-page'
import DailyCheckIn from './components/daily-check-in'
import Missions from './components/missions'
import { Tab, Tabs } from '@nextui-org/react'
import ListPartner from './components/list-partner'
import { useSearchParams } from 'next/navigation'
import Loader from '../components/ui/loader'

const MISSION_TAB = {
  PARTNERS: 'partners',
  REWARDS: 'rewards'
}

export default function MissionPage() {
  const query = useSearchParams()
  const tab = query.get('tab')
  const [activeTab, setActiveTab] = useState(tab || MISSION_TAB.REWARDS)
  const [partnerCount, setPartnerCount] = useState<number>(0)
  const [rewardCount, setRewardCount] = useState<number>(0)
  const [isShowTab, setIsShowTab] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const handleChangeTab = (tab: any) => {
    setActiveTab(tab)
  }

  const showTabPartner = (status: boolean) => {
    setIsLoading(false)
    if (status) {
      setIsShowTab(true)
      if (!tab) {
        setActiveTab(MISSION_TAB.PARTNERS)
      }
    } else {
      if (!tab) {
        setActiveTab(MISSION_TAB.REWARDS)
      }
      setIsShowTab(false)
    }
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
        disableOverscroll
      >
        {isLoading && (
          <Loader
            classNames={{
              wrapper:
                'min-h-[100vh] top-[50%] translate-y-[-50%] absolute z-[1] left-[0] bg-black/30',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
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

        <div className={isLoading ? `opacity-0` : `opacity-1`}>
          {isShowTab && (
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
              defaultSelectedKey={activeTab}
              onSelectionChange={handleChangeTab}
            >
              <Tab
                key={MISSION_TAB.PARTNERS}
                title={`${MISSION_TAB.PARTNERS} ${partnerCount ? `(${partnerCount})` : ''}`}
              ></Tab>
              <Tab
                key={MISSION_TAB.REWARDS}
                title={`${MISSION_TAB.REWARDS} ${rewardCount ? `(${rewardCount})` : ''}`}
              ></Tab>
            </Tabs>
          )}

          <div className={`${activeTab === MISSION_TAB.PARTNERS ? '' : 'hidden'}`}>
            <ListPartner updateListPartner={updateListPartner} showTabPartner={showTabPartner} />
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
