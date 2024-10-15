'use client'

import React, { useEffect, useState } from 'react'
import CustomPage from '../components/custom-page'
import DailyCheckIn from './components/daily-check-in'
import Missions from './components/missions'
import { Tab, Tabs } from '@nextui-org/react'
import ListPartner from './components/list-partner'
import { useSearchParams } from 'next/navigation'
import Loader from '../components/ui/loader'
import { useAppSound } from '@/hooks/useAppSound'
import { IconLock } from '../components/icons'
import { toast } from 'sonner'
import CustomToast from '../components/ui/custom-toast'
import { MESSAGES } from '@/constants/messages'

const MISSION_TAB = {
  PARTNERS: 'partners',
  REWARDS: 'rewards'
}

export default function MissionPage() {
  const query = useSearchParams()
  const tab = query.get('tab')
  const { tabSound } = useAppSound()
  const [activeTab, setActiveTab] = useState(tab || MISSION_TAB.REWARDS)
  const [partnerCount, setPartnerCount] = useState<number>(0)
  const [rewardCount, setRewardCount] = useState<number>(0)
  const [disablePartner, setDisablePartner] = useState<boolean>(true)
  const [isShowTab, setIsShowTab] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const handleChangeTab = (tab: any) => {
    if (disablePartner && tab === MISSION_TAB.PARTNERS) return
    setActiveTab(tab)
    tabSound.play()
  }

  const handleClickPartner = () => {
    if (disablePartner) {
      toast.dismiss()
      toast.warning(
        <CustomToast title={MESSAGES['MSG_YOU_COMPLETE_SUMMON_TASKS']} type="warning" />
      )
    }
  }

  // const showTabPartner = (status: boolean) => {
  //   if (status) {
  //     // setIsShowTab(true)
  //   } else {
  //     if (!tab) {
  //       setActiveTab(MISSION_TAB.REWARDS)
  //     }
  //     // setIsShowTab(false)
  //   }
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 300)
  // }

  const handleDisablePartner = (status: boolean) => {
    setDisablePartner(status)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const updateListPartner = (count: number) => {
    setPartnerCount(count)
  }

  const updateListReward = (count: number) => {
    setRewardCount(count)
  }

  return (
    <>
      {isLoading && (
        <Loader
          classNames={{
            wrapper: 'min-h-[100vh] bottom-0 translate-y-[0%] absolute z-[12] left-[0] bg-black/30',
            icon: 'w-[45px] h-[45px] text-white'
          }}
        />
      )}
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

        <div className={isLoading ? `opacity-0` : `opacity-1`}>
          {isShowTab && (
            <Tabs
              variant="underlined"
              classNames={{
                base: 'w-full',
                tabList: 'gap-2 w-full relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full bg-gradient rounded',
                tab: 'h-[30px] px-2 font-mona data-[disabled=true]:opacity-100',
                tabContent:
                  'group-data-[selected=true]:bg-gradient group-data-[selected=true]:[-webkit-background-clip:_text] group-data-[selected=true]:[-webkit-text-fill-color:_transparent] text-white/25 font-mona font-semibold text-[15px] xs:text-base uppercase'
              }}
              disabledKeys={disablePartner ? [MISSION_TAB.PARTNERS] : []}
              defaultSelectedKey={activeTab}
              onSelectionChange={handleChangeTab}
            >
              <Tab
                key={MISSION_TAB.PARTNERS}
                title={
                  <div onClick={handleClickPartner} className="flex items-center">
                    {`${MISSION_TAB.PARTNERS} ${partnerCount && !disablePartner ? `(${partnerCount})` : ''}`}{' '}
                    {disablePartner ? <IconLock className="size-4 ml-1 mb-[2px]" /> : null}
                  </div>
                }
              ></Tab>
              <Tab
                key={MISSION_TAB.REWARDS}
                title={`${MISSION_TAB.REWARDS} ${rewardCount ? `(${rewardCount})` : ''}`}
              ></Tab>
            </Tabs>
          )}
          <div className=" absolute"></div>
          <div className={`${activeTab === MISSION_TAB.PARTNERS ? '' : 'hidden'}`}>
            <ListPartner updateListPartner={updateListPartner} />
          </div>
          <div className={`${activeTab === MISSION_TAB.PARTNERS ? 'hidden' : ''}`}>
            <>
              <div className="space-y-4">
                <DailyCheckIn />
              </div>
              <div>
                <Missions
                  updateListReward={updateListReward}
                  setDisablePartner={handleDisablePartner}
                />
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
