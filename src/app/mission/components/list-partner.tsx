import CustomItem from '@/app/components/custom-item'
import CustomList from '@/app/components/custom-list'
import { IconGroupUser, IconPoint } from '@/app/components/icons'
import Loader from '@/app/components/ui/loader'
import NoItem from '@/app/components/ui/no-item'
import { LIST_STATUS_MISSION, LIST_TYPE, MISSION_STATUS, QUERY_CONFIG } from '@/constants'
import { formatNumber } from '@/helper/common'
import { IMissionPartner } from '@/interfaces/i.missions'
import { getListMissionByPartner } from '@/services/missions'
import useMissionStore from '@/stores/missionsStore'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
interface IListPartner {
  updateListPartner: (count: number) => void
}
export default function ListPartner({ updateListPartner }: IListPartner) {
  const { data: listPartners, isLoading } = useQuery({
    queryKey: ['fetchListMissionByPartner'],
    queryFn: getListMissionByPartner,
    ...QUERY_CONFIG
  })
  const router = useRouter()
  const listTaskStatus = useRef<{ [key: number]: string }>({})
  const { setCurrentMission } = useMissionStore()
  const getStatus = (count: number, length: number) => {
    if (count === length) {
      return LIST_STATUS_MISSION.DONE
    }
    // if (count < length && count > 0) {
    //   return LIST_STATUS_MISSION.VERIFY
    // }
    return LIST_STATUS_MISSION.LINK
  }
  const countTaskDone = (list: any, index: number) => {
    let count = 0
    list.forEach((item: any) => {
      if (item.status === MISSION_STATUS.VERIFIED || item.status === MISSION_STATUS.CLAIMED) {
        count += 1
      }
    })
    listTaskStatus.current[index] = getStatus(count, list.length)

    return count
  }

  const handleLinkMission = (item: IMissionPartner, index: number) => {
    setCurrentMission(item)
    router.push(`/mission/partners?id=${index}`)
  }

  useEffect(() => {
    if (listPartners?.data?.length > 0) {
      updateListPartner(listPartners?.data?.length)
    }
  }, [listPartners])

  return (
    <>
      {listPartners?.data?.length > 0 ? (
        <div className="mt-5 xs:mt-6">
          <div className="flex flex-col space-y-3 xs:space-y-4">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {listPartners?.data?.map((item: IMissionPartner, index: number) => (
                  <div onClick={() => handleLinkMission(item, index)} key={index}>
                    <CustomItem
                      type={LIST_TYPE.PARTNERS}
                      title={item.name}
                      image={
                        item.image ? item.image : '/assets/images/icons/icon-mission-gradient.svg'
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
                              {countTaskDone(item.missions, index)}/{item.missions?.length}
                            </p>
                            <p className="text-body text-xs">
                              {listTaskStatus.current[index] === LIST_STATUS_MISSION.DONE
                                ? 'Conpleted'
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
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <>{!isLoading && <NoItem title="No partner available" />}</>
      )}
    </>
  )
}
