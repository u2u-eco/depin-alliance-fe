import { MISSION_STATUS, QUERY_CONFIG } from '@/constants'
import { getListMission, getListMissionDally } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import ListMission from './list-mission'
import Loader from '@/app/components/ui/loader'
import { IItemMissionPartner } from '@/interfaces/i.missions'
interface IMission {
  updateListReward: (count: number) => void
  setDisablePartner: (status: boolean) => void
}

const LIST_MISSION_REQUIRED = [
  'connect your twitter',
  'follow u2u network x',
  'join u2u network telegram',
  'join u2u discord',
  'subscribe u2u youtube'
]
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
      if (res[1].status && res[1].data?.length > 0) {
        _listMission = [
          {
            group: 'Daily',
            missions: res[1].data.map((item: any) => {
              return { ...item, isDaily: true, idCheck: `h-${item.id}` }
            })
          },
          ..._listMission
        ]
      }
      return _listMission || []
    },
    enabled: Boolean(token),
    ...QUERY_CONFIG
  })

  const countMission = () => {
    let count = 0
    let countTaskRequired = 0
    listMission?.forEach((item: any) => {
      if (item.missions) {
        item.missions.forEach((mission: IItemMissionPartner) => {
          if (mission.status !== MISSION_STATUS.CLAIMED) {
            count += 1
          }
          if (
            LIST_MISSION_REQUIRED.indexOf(mission.name.toLowerCase()) !== -1 &&
            (mission.status === MISSION_STATUS.VERIFIED ||
              mission.status === MISSION_STATUS.CLAIMED)
          ) {
            countTaskRequired++
          }
        })
      }
    })

    if (countTaskRequired === LIST_MISSION_REQUIRED.length) {
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
