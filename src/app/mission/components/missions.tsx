import { QUERY_CONFIG } from '@/constants'
import { getListMission } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import ListMission from './list-mission'
import Loader from '@/app/components/ui/loader'

export default function Missions() {
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
