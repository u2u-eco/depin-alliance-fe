import { DISABLE_CHECK_TASK_U2U, MISSION_STATUS, QUERY_CONFIG } from '@/constants'
import { getListMission, getListMissionDally } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import ListMission from './list-mission'
import Loader from '@/app/components/ui/loader'
import { IItemMissionPartner } from '@/interfaces/i.missions'
import { forEach } from 'lodash'
interface IMission {
  updateListReward: (count: number) => void
  setDisablePartner: (status: boolean) => void
}

// const LIST_MISSION_REQUIRED = [
//   'connect your twitter',
//   'follow u2u network x',
//   'join u2u network telegram',
//   'join u2u discord',
//   'subscribe u2u youtube'
// ]
const GROUP_MISSION_REQUIRED = 'u2u rebellion'
export default function Missions({ updateListReward, setDisablePartner }: IMission) {
  const { token } = useCommonStore(useShallow((state) => state))
  const {
    data: listMission,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['fetchListMission'],
    queryFn: async () => {
      const res = await Promise.all([getListMission(), getListMissionDally()])
      let _listMission = res[0].data
      let isTaskOKX = false
      forEach(_listMission, (item) => {
        if (item.group.toLowerCase() === 'okx wallet') {
          isTaskOKX = true
        }
      })
      if (res[1].status && res[1].data?.length > 0) {
        const daily = {
          group: 'Daily Missions',
          missions: res[1].data.map((item: any) => {
            return { ...item, isDaily: true, idCheck: `h-${item.id}` }
          })
        }
        if (isTaskOKX) {
          _listMission.splice(1, 0, daily)
        } else {
          _listMission = [daily, ..._listMission]
        }
      }
      return _listMission || []
    },
    enabled: Boolean(token),
    ...QUERY_CONFIG
  })

  const countMission = () => {
    let count = 0
    let countTaskRequired = 0
    let totalTaskRequired = 0

    listMission?.forEach((item: any) => {
      if (item.missions) {
        item.missions.forEach((mission: IItemMissionPartner) => {
          if (mission.status !== MISSION_STATUS.CLAIMED) {
            count += 1
          }
          if (item.group?.toLowerCase() === GROUP_MISSION_REQUIRED) {
            totalTaskRequired = item.missions?.length
          }
          if (
            item.group?.toLowerCase() === GROUP_MISSION_REQUIRED &&
            (mission.status === MISSION_STATUS.VERIFIED ||
              mission.status === MISSION_STATUS.CLAIMED)
          ) {
            countTaskRequired++
          }
        })
      }
    })

    if (countTaskRequired === totalTaskRequired || DISABLE_CHECK_TASK_U2U) {
      setDisablePartner(false)
    } else {
      setDisablePartner(true)
    }
    updateListReward(count)
  }

  useEffect(() => {
    if (listMission?.length > 0) {
      countMission()
    }
  }, [listMission])

  return (
    <>
      {isLoading ? <Loader /> : <ListMission listMission={listMission || []} refetch={refetch} />}
    </>
  )
}
