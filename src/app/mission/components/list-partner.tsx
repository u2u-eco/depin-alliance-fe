import CustomItem from '@/app/components/custom-item'
import CustomList from '@/app/components/custom-list'
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
import { Switch } from '@nextui-org/react'

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
  const listTaskStatus = useRef<{ [key: number]: string }>({})
  const listTaskClaimed = useRef<{ [key: number]: boolean }>({})
  const [listTaskDone, setListTaskDone] = useState<{ [key: number]: number }>({})
  const { setCurrentMission } = useMissionStore()
  const [isEmptyPartner, setEmptyPartner] = useState<boolean>(false)
  const isHideCompletedStr = localStorage.getItem(HIDE_COMPLETED_PARTNER)
  const [isHideCompleted, setIsHideCompleted] = useState<boolean>(
    isHideCompletedStr === 'true' || isHideCompletedStr === null ? true : false
  )
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
    let _isEmptyPartner = true
    list.forEach((partnerItem: any, index: number) => {
      listTaskClaimed.current[index] = isHideCompleted ? true : false
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
      _listTaskDone[index] = count
      if (count < partnerItem.missions?.length) {
        _missionUnDone += 1
      }
      if (countClaimed < partnerItem.missions?.length && isHideCompleted) {
        listTaskClaimed.current[index] = false
      }

      updateListPartner(_missionUnDone)
      listTaskStatus.current[index] = getStatus(count, partnerItem.missions.length)
      if (!listTaskClaimed.current[index]) {
        _isEmptyPartner = false
      }
    })
    if (isHideCompleted) {
      setEmptyPartner(_isEmptyPartner)
    }
    setListTaskDone(_listTaskDone)
  }

  const handleLinkMission = (item: IMissionPartner, index: number) => {
    setCurrentMission(item)
    router.push(`/mission/partners?id=${index}`)
  }

  const handleHideCompleted = () => {
    localStorage.setItem(HIDE_COMPLETED_PARTNER, isHideCompleted ? 'false' : 'true')
    setIsHideCompleted(!isHideCompleted)
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
  }, [listPartners, isHideCompleted])

  return (
    <>
      <div className="mt-5 xs:mt-6">
        <div className="flex items-center justify-end">
          <Switch
            classNames={{
              wrapper:
                "[--shape:_6px] w-11 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] rounded-none h-6 px-[3px] bg-white/30 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-[calc(100%_-_2px)] before:bg-gray-850 before:group-data-[selected=true]:bg-gray-850 before:[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] mr-1.5 xs:mr-2",
              thumb:
                '[--shape:_5px] [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] rounded-none !size-[18px] group-data-[selected=true]:ml-5 bg-white/30 group-data-[selected=true]:bg-gradient',
              label:
                'text-body text-[15px] xs:text-base xs:!leading-[20px] tracking-[-1px] capitalize'
            }}
            isSelected={isHideCompleted}
            onChange={handleHideCompleted}
          >
            hide completed
          </Switch>
        </div>
        {listPartners?.data?.length > 0 ? (
          <div className="mt-5 xs:mt-6">
            <div className="flex flex-col space-y-3 xs:space-y-4">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isEmptyPartner ? (
                    <NoItem title="No partner available" />
                  ) : (
                    <>
                      {listPartners?.data?.map((item: IMissionPartner, index: number) => {
                        if (!listTaskClaimed.current[index]) {
                          return (
                            <div onClick={() => handleLinkMission(item, index)} key={index}>
                              <CustomItem
                                type={LIST_TYPE.PARTNERS}
                                title={item.name}
                                image={
                                  item.image ? item.image : '/assets/images/partner-image@2x.png'
                                }
                                done={listTaskStatus.current[index] === LIST_STATUS_MISSION.DONE}
                                status={listTaskStatus.current[index]}
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
                                        {`${listTaskDone[index]}/${item.missions?.length}`}
                                      </p>
                                      <p className="text-body text-xs">
                                        {listTaskStatus.current[index] === LIST_STATUS_MISSION.DONE
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
                        }
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
