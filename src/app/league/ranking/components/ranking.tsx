import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatNumber } from '@/helper/common'
import { getRanking } from '@/services/user'
import useCommonStore from '@/stores/commonStore'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import NoItem from '@/app/components/ui/no-item'
import CustomRank from '@/app/components/ui/custom-rank'
import LastUpdateBox from '@/app/components/last-update-box'

const Ranking = () => {
  const { userInfo } = useCommonStore()
  const [listRanking, setListRanking] = useState<any>({})
  const { data: listRankingResponse, isLoading } = useQuery({
    queryKey: ['getRanking'],
    queryFn: getRanking
  })

  useEffect(() => {
    if (listRankingResponse?.data?.ranking) {
      let list = listRankingResponse?.data
      if (listRankingResponse?.data?.currentRank > listRankingResponse?.data?.ranking?.length) {
        list = {
          ...listRankingResponse?.data,
          ranking: [
            ...listRankingResponse?.data?.ranking,
            {
              avatar: userInfo?.avatar,
              miningPower: userInfo?.miningPower,
              username: userInfo?.username,
              rank: listRankingResponse.data.currentRank
            }
          ]
        }
      }
      setListRanking(list)
    }
  }, [listRankingResponse?.data, userInfo])

  return (
    <>
      <div className="mt-4">
        <LastUpdateBox />
      </div>
      <div className="mt-6 xs:mt-8 2xs:mt-10">
        {!isLoading && listRanking?.ranking?.length === 0 ? (
          <NoItem title="No data available" />
        ) : (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
            key="ranking"
          >
            <CustomRank data={listRanking} type="member" />
          </motion.div>
        )}
      </div>
    </>
  )
}

export default Ranking
