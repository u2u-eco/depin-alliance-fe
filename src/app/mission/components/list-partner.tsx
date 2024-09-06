import CustomItem from '@/app/components/custom-item'
import CustomList from '@/app/components/custom-list'
import { IconGroupUser, IconPoint } from '@/app/components/icons'
import NoItem from '@/app/components/ui/no-item'
import { LIST_STATUS_MISSION, LIST_TYPE, QUERY_CONFIG } from '@/constants'
import { formatNumber } from '@/helper/common'
import { getListMissionByPartner } from '@/services/missions'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
export default function ListPartner() {
  const { data: listPartners } = useQuery({
    queryKey: ['fetchListMissionByPartner'],
    queryFn: getListMissionByPartner,
    ...QUERY_CONFIG
  })
  const router = useRouter()
  const listTaskStatus = useRef<{ [key: number]: string }>({})
  // const [listTaskStatus, setListTaskStatus] = useState<{ [key: number]: boolean }>({})

  const getStatus = (count: number, length: number) => {
    if (count === length) {
      return LIST_STATUS_MISSION.DONE
    }
    if (count < length && count > 0) {
      return LIST_STATUS_MISSION.VERIFY
    }
    return LIST_STATUS_MISSION.LINK
  }
  const countTaskDone = (list: any, index: number) => {
    let count = 0
    list.forEach((item: any) => {
      if (item.status === 'VERIFIED' || item.status === 'CLAIMED') {
        count += 1
      }
    })
    listTaskStatus.current[index] = getStatus(count, list.length)

    return count
  }

  const handleLinkMission = () => {
    router.push('/mission/partners')
  }

  return (
    <>
      {listPartners?.data?.length > 0 ? (
        <div className="mt-5 xs:mt-6">
          <div className="flex flex-col space-y-3 xs:space-y-4">
            {listPartners?.data?.map((item: any, index: number) => (
              <div onClick={handleLinkMission} key={index}>
                <CustomItem
                  type={LIST_TYPE.PARTNERS}
                  title={item.name}
                  image={item.image || `upgrade/upgrade-${item.type?.toLowerCase()}`}
                  icon={item.icon}
                  done={listTaskStatus.current[index] === LIST_STATUS_MISSION.DONE}
                  status={listTaskStatus.current[index]}
                  key={item.code}
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
                        <p className="text-body text-xs">Conpleted</p>
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
          </div>
        </div>
      ) : (
        <NoItem title="No partner available" />
      )}
    </>
  )
}
