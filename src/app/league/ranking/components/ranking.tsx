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
        <div className="btn default cursor-default font-geist">
          <div className="btn-border"></div>
          <div className="btn-default max-xs:!py-2.5 max-xs:!px-3">
            <div className="flex items-center justify-center space-x-4 min-[355px]:space-x-6 xs:space-x-8 2xs:space-x-10">
              <div className="w-4 xs:w-6 2xs:w-[30px] h-[1px] bg-yellow-800"></div>
              <div className="space-y-1 text-center">
                <p className="uppercase text-[13px] xs:text-sm font-semibold leading-[16px] text-yellow-600">
                  LAST UPDATE
                </p>
                <div className="text-white xs:text-[15px] 2xs:text-base font-normal leading-[20px] whitespace-nowrap">
                  {dayjs().format('DD/MM/YYYY - HH:mm:ss')}
                  {/* 29/08/2024 - 14:14:41 */}
                </div>
              </div>
              <div className="w-4 xs:w-6 2xs:w-[30px] h-[1px] bg-yellow-800"></div>
            </div>
          </div>
          <div className="btn-border"></div>
        </div>
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
