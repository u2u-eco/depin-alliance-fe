'use client'

import CustomPage from '@/app/components/custom-page'
import { IconChevron, IconGroupUser, IconHome, IconPoint } from '@/app/components/icons'
import { formatNumber } from '@/helper/common'
import { IMissionPartner } from '@/interfaces/i.missions'
import { getListMissionByPartner } from '@/services/missions'
import useMissionStore from '@/stores/missionsStore'
import parse from 'html-react-parser'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ListMission from '../components/list-mission'
import Image from 'next/image'
import Link from 'next/link'
import { MISSION_STATUS } from '@/constants'
import { genIdFromString } from '@/lib/utils'
import { useAppSound } from '@/hooks/useAppSound'

export default function PartnersPage() {
  const router = useRouter()
  const { tabSound } = useAppSound()
  const searchParams = useSearchParams()
  const [missionDone, setMissionDone] = useState<number>(0)
  const id = searchParams.get('id')
  const { currentMission, setCurrentMission } = useMissionStore()

  const getCurrentMissionById = async () => {
    const res = await getListMissionByPartner()
    if (res.status) {
      res.data.forEach((item: IMissionPartner, index: number) => {
        let _id: any = genIdFromString(item.name)
        if (_id === id) {
          setCurrentMission(item)
        }
      })
    }
  }
  const handleBack = () => {
    tabSound.play()
    router.push('/mission?tab=partners')
  }

  const countListMissionCompleted = () => {
    let _count = 0
    currentMission?.missions.forEach((mission) => {
      if (mission.status === MISSION_STATUS.VERIFIED || mission.status === MISSION_STATUS.CLAIMED) {
        _count += 1
      }
    })
    setMissionDone(_count)
  }

  useEffect(() => {
    if (!currentMission && id) {
      getCurrentMissionById()
    } else {
      countListMissionCompleted()
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
            <IconChevron className="text-green-500 size-6 xs:size-7 2xs:size-8" />
          </div>
          <div className="space-y-5 xs:space-y-6">
            <div className="text-center relative size-[100px] xs:size-[115px] 2xs:size-[130px] mx-auto">
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
              <p className="text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-body whitespace-pre-line">
                {currentMission?.description && parse(currentMission?.description)}
              </p>
            </div>
            <div className="btn default cursor-default">
              <div className="btn-border"></div>
              <div className="btn-default !p-3">
                <div className="flex xs:items-center space-x-2 xs:space-x-3">
                  <div className="flex-1 xs:min-w-[180px] space-y-1.5 xs:space-y-2 text-center">
                    <p className="text-sm font-semibold text-body leading-[16px]">REWARDS</p>
                    <div className="flex justify-center space-x-1 font-geist">
                      <IconPoint className="size-3.5 xs:size-4 mt-0.5" />
                      <p className="text-green-500 text-[13px] xs:text-sm normal-case !leading-[18px] max-xs:text-left">
                        {currentMission?.rewards}
                      </p>
                    </div>
                  </div>
                  <div className="w-[1px] h-[50px] bg-white/25"></div>
                  <div className="flex-1 space-y-1.5 xs:space-y-2 text-center">
                    <p className="text-sm font-semibold text-body leading-[16px]">PARTICIPANTS</p>
                    <div className="flex items-center justify-center space-x-1 font-geist">
                      <IconGroupUser className="size-3.5 xs:size-4" />
                      <p className="text-title text-[13px] xs:text-sm normal-case !leading-[18px]">
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
            <div className="relative mt-0">
              <div className="absolute top-0 right-0 mt-6 xs:mt-7 2xs:mt-8 text-[13px] xs:text-sm !leading-[20px] flex items-center font-semibold space-x-1">
                <p className="text-title">
                  {missionDone}/{currentMission?.missions?.length || 0}
                </p>
                <p className="text-body">Completed</p>
              </div>
              <ListMission
                listMission={[{ group: 'Missions', missions: currentMission?.missions || [] }]}
                refetch={getCurrentMissionById}
              />
            </div>
          </div>
          <Link
            onClick={() => {
              tabSound.play()
            }}
            href="/home"
            className="absolute top-0 right-0"
          >
            <IconHome className="size-6 xs:size-7 2xs:size-8" gradient />
          </Link>
        </div>
      </CustomPage>
    </>
  )
}
