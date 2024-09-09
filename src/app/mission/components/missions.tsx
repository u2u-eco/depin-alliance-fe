import { MISSION_STATUS, QUERY_CONFIG } from '@/constants'
import { getListMission } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import ListMission from './list-mission'
import Loader from '@/app/components/ui/loader'
import { IItemMissionPartner } from '@/interfaces/i.missions'
interface IMission {
  updateListReward: (count: number) => void
}
export default function Missions({ updateListReward }: IMission) {
  const { token } = useCommonStore(useShallow((state) => state))
  const {
    data: listMission,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['fetchListMission'],
    queryFn: getListMission,
    enabled: Boolean(token),
    ...QUERY_CONFIG
  })

  const countMission = () => {
    let count = 0
    listMission?.data.forEach((item: any) => {
      if (item.missions) {
        item.missions.forEach((mission: IItemMissionPartner) => {
          if (
            mission.status !== MISSION_STATUS.VERIFIED &&
            mission.status !== MISSION_STATUS.CLAIMED
          ) {
            count += 1
          }
        })
      }
    })
    updateListReward(count)
  }

  useEffect(() => {
    if (listMission?.data?.length > 0) {
      countMission()
    }
  }, [listMission])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ListMission listMission={listMission?.data || []} refetch={refetch} />
      )}
    </>
  )
}
