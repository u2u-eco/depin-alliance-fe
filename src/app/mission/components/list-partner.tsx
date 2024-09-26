import CustomItem from '@/app/components/custom-item'
import { IconGroupUser, IconPoint } from '@/app/components/icons'
import Loader from '@/app/components/ui/loader'
import NoItem from '@/app/components/ui/no-item'
import {
  HIDE_COMPLETED_PARTNER,
  LIST_STATUS_MISSION,
  LIST_TYPE,
  MISSION_STATUS,
  QUERY_CONFIG
} from '@/constants'
import { formatNumber } from '@/helper/common'
import { IMissionPartner } from '@/interfaces/i.missions'
import { getListMissionByPartner } from '@/services/missions'
import useMissionStore from '@/stores/missionsStore'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { genIdFromString } from '@/lib/utils'
import { useAppSound } from '@/hooks/useAppSound'

interface IListPartner {
  updateListPartner: (count: number) => void
  showTabPartner: (status: boolean) => void
}
export default function ListPartner({ updateListPartner, showTabPartner }: IListPartner) {
  const { data: listPartners, isLoading } = useQuery({
    queryKey: ['fetchListMissionByPartner'],
    queryFn: getListMissionByPartner,
    ...QUERY_CONFIG
  })
  const router = useRouter()
  const [partnerDone, setPartnerDone] = useState<number>(0)
  const [listTaskByFilter, setListTaskByFilter] = useState<any>([])
  const listTaskStatus = useRef<{ [key: number]: string }>({})
  const listTaskClaimed = useRef<{ [key: number]: boolean }>({})
  const [listTaskDone, setListTaskDone] = useState<{ [key: number]: number }>({})
  const { setCurrentMission } = useMissionStore()
  const [isEmptyPartner, setEmptyPartner] = useState<boolean>(false)
  const isHideCompletedStr = localStorage.getItem(HIDE_COMPLETED_PARTNER)
  const [isHideCompleted, setIsHideCompleted] = useState<boolean>(
    isHideCompletedStr === 'true' || isHideCompletedStr === null ? true : false
  )
  const { tabSound, buttonSound } = useAppSound()
  const getStatus = (count: number, length: number) => {
    if (count === length) {
      return LIST_STATUS_MISSION.DONE
    }
    // if (count < length && count > 0) {
    //   return LIST_STATUS_MISSION.VERIFY
    // }
    return LIST_STATUS_MISSION.LINK
  }
  const countTaskDone = (list: any) => {
    const _listTaskDone: { [key: number]: number } = {}
    let _missionUnDone = 0
    const listDone: IMissionPartner[] = []
    let listUnDone: IMissionPartner[] = []
    let _isEmptyPartner = true
    list.forEach((partnerItem: any, index: number) => {
      let id: any = genIdFromString(partnerItem.name)
      partnerItem.id = id
      listTaskClaimed.current[id] = true
      let count = 0
      let countClaimed = 0
      partnerItem.missions.forEach((item: any) => {
        if (item.status === MISSION_STATUS.VERIFIED || item.status === MISSION_STATUS.CLAIMED) {
          count += 1
        }
        if (item.status === MISSION_STATUS.CLAIMED) {
          countClaimed += 1
        }
      })
      _listTaskDone[id] = count
      if (countClaimed < partnerItem.missions?.length) {
        _missionUnDone += 1
      }
      if (countClaimed < partnerItem.missions?.length) {
        listTaskClaimed.current[id] = false
        listUnDone.push(partnerItem)
      } else {
        listDone.push(partnerItem)
      }
      listTaskStatus.current[id] = getStatus(count, partnerItem.missions.length)
      if (!listTaskClaimed.current[id]) {
        _isEmptyPartner = false
      }
    })
    setPartnerDone(list?.length - _missionUnDone)
    updateListPartner(_missionUnDone)
    listUnDone = listUnDone.splice(0, 11)
    const _listTask: any = isHideCompleted ? [...listUnDone] : [...listUnDone, ...listDone]
    setListTaskByFilter(_listTask)
    if (isHideCompleted) {
      setEmptyPartner(_isEmptyPartner)
    }
    setListTaskDone(_listTaskDone)
  }

  const handleLinkMission = (item: IMissionPartner, index: number) => {
    tabSound.play()
    setCurrentMission(item)
    router.push(`/mission/partners?id=${item.id}`)
  }

  const handleHideCompleted = () => {
    localStorage.setItem(HIDE_COMPLETED_PARTNER, isHideCompleted ? 'false' : 'true')
    setIsHideCompleted(!isHideCompleted)
    buttonSound.play()
  }

  useEffect(() => {
    if (listPartners?.data) {
      showTabPartner(true)
      countTaskDone(listPartners.data)
    } else {
      showTabPartner(false)
    }
  }, [listPartners])

  useEffect(() => {
    if (listPartners?.data) {
      countTaskDone(listPartners.data)
    }
  }, [isHideCompleted])

  return (
    <>
      <div className="mt-5 xs:mt-6">
        <div className="flex items-center justify-between">
          <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
            ALL MISSIONS
          </p>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHideCompleted}>
            <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
              hide completed {partnerDone ? `(${partnerDone})` : ''}
            </p>
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="relative size-5 xs:size-6 min-w-5 xs:min-w-6 flex items-center justify-center"
            >
              <div
                className={`border-1.5 border-green-700 rotate-45 size-[15px] xs:size-[18px] p-0.5 xs:p-[3px] transition-background ${isHideCompleted ? 'bg-white/10' : ''}`}
              >
                <div
                  className={`size-full bg-gradient transition-opacity ${isHideCompleted ? 'opacity-100' : 'opacity-0'}`}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
        {listPartners?.data?.length > 0 ? (
          <div className="mt-4">
            <div className="flex flex-col space-y-3 xs:space-y-4">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isEmptyPartner && isHideCompleted ? (
                    <NoItem title="No partner available" />
                  ) : (
                    <>
                      {listTaskByFilter?.map((item: IMissionPartner, index: number) => {
                        return (
                          <div onClick={() => handleLinkMission(item, index)} key={index}>
                            <CustomItem
                              type={LIST_TYPE.PARTNERS}
                              title={item.name}
                              image={
                                item.image ? item.image : '/assets/images/partner-image@2x.png'
                              }
                              done={listTaskStatus.current[item.id] === LIST_STATUS_MISSION.DONE}
                              status={listTaskStatus.current[item.id]}
                              key={index}
                              item={item}
                            >
                              <>
                                <div className="flex items-center space-x-1">
                                  <IconPoint className="size-[14px] xs:size-4" />
                                  <p className="text-green-500 text-xs xs:text-[13px] 2xs:text-sm font-semibold leading-[16px]">
                                    {item.rewards}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 xs:space-x-3 2xs:space-x-4">
                                  <div className="flex items-center leading-[16px] space-x-1">
                                    <p className="text-title font-semibold text-[13px] xs:text-sm">
                                      {`${listTaskDone[item.id] || 0}/${item.missions?.length}`}
                                    </p>
                                    <p className="text-body text-xs">
                                      {listTaskStatus.current[item.id] === LIST_STATUS_MISSION.DONE
                                        ? 'Completed'
                                        : ''}
                                    </p>
                                  </div>
                                  <div className="w-[1px] h-4 bg-white/25"></div>
                                  <div className="flex items-center leading-[16px] space-x-1">
                                    <IconGroupUser className="text-body size-4" />
                                    <p className="text-title font-semibold text-[13px] xs:text-sm">
                                      {item.participants && formatNumber(item.participants, 0, 0)}
                                    </p>
                                  </div>
                                </div>
                              </>
                            </CustomItem>
                          </div>
                        )
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <>{!isLoading && <NoItem title="No partner available" />}</>
        )}
      </div>
    </>
  )
}
