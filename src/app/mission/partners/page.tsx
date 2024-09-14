'use client'

import CustomPage from '@/app/components/custom-page'
import { IconChevron, IconGroupUser, IconPoint } from '@/app/components/icons'
import { formatNumber } from '@/helper/common'
import { IMissionPartner } from '@/interfaces/i.missions'
import { getListMissionByPartner } from '@/services/missions'
import useMissionStore from '@/stores/missionsStore'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import ListMission from '../components/list-mission'
import Image from 'next/image'

export default function PartnersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const { currentMission, setCurrentMission } = useMissionStore()

  const getCurrentMissionById = async () => {
    const res = await getListMissionByPartner()
    if (res.status) {
      res.data.forEach((item: IMissionPartner, index: number) => {
        if (index === Number(id)) {
          setCurrentMission(item)
        }
      })
    }
  }
  const handleBack = () => {
    router.push('/mission?tab=partners')
  }

  useEffect(() => {
    if (!currentMission && id) {
      getCurrentMissionById()
    }
  }, [currentMission, id])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-gradient-yellow before:z-[-1]"
        }}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 cursor-pointer rotate-90" onClick={handleBack}>
            <IconChevron className="text-green-500" />
          </div>
          <div className="space-y-6">
            <div className="text-center relative size-[110px] xs:size-[120px] 2xs:size-[130px] mx-auto">
              <div className="p-[1px] bg-green-100 [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0%_30px)]">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0%_30px)]"
                  src={currentMission?.image || `/assets/images/partner-image@2x.png`}
                  // srcSet="/assets/images/mission/okx.png 1x, /assets/images/mission/okx@2x.png 2x"
                  alt="DePIN Alliance"
                />
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <div className="flex items-center justify-center space-x-6">
                <div className="size-1.5 bg-green-100"></div>
                <div className="text-title font-airnt font-medium text-lg xs:text-xl [text-shadow:_0_0_8px_rgba(255,255,255,0.5)] uppercase">
                  {currentMission?.name}
                </div>
                <div className="size-1.5 bg-green-100"></div>
              </div>
              <p className="text-base leading-[20px] tracking-[-1px] text-body">
                {currentMission?.description}
              </p>
            </div>
            <div className="btn default cursor-default">
              <div className="btn-border"></div>
              <div className="btn-default !p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-[180px] space-y-2 text-center">
                    <p className="text-sm font-semibold text-body leading-[16px]">REWARDS</p>
                    <div className="flex items-center justify-center space-x-1 font-geist">
                      <IconPoint className="size-4" />
                      <p className="text-green-500 text-sm normal-case leading-[16px] whitespace-nowrap">
                        {currentMission?.rewards}
                      </p>
                    </div>
                  </div>
                  <div className="w-[1px] h-[50px] bg-white/25"></div>
                  <div className="flex-1 space-y-2 text-center">
                    <p className="text-sm font-semibold text-body leading-[16px]">PARTICIPANTS</p>
                    <div className="flex items-center justify-center space-x-1 font-geist">
                      <IconGroupUser className="size-4" />
                      <p className="text-title text-sm normal-case leading-[16px]">
                        {currentMission?.participants
                          ? formatNumber(currentMission.participants, 0, 0)
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-border"></div>
            </div>

            <ListMission
              listMission={[{ group: 'Missions', missions: currentMission?.missions || [] }]}
              refetch={getCurrentMissionById}
            />
          </div>
        </div>
      </CustomPage>
    </>
  )
}
