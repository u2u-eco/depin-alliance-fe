'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import CustomPage from '@/app/components/custom-page'
import { useQuery } from '@tanstack/react-query'
import { getListRankingEarned, getRanking, getRankingAirdrop } from '../../services/user'
import dayjs from 'dayjs'
import useCommonStore from '@/stores/commonStore'
import Loader from '../components/ui/loader'
import { CustomHeader } from '../components/ui/custom-header'
import ListRankingItem from './components/list-ranking'
import { useAppSound } from '@/hooks/useAppSound'

const RANKING_TYPE = {
  AIRDROP: 'airdrop',
  PROFIT: 'profit',
  EARNED: 'earned'
}

export default function RankingPage() {
  const { userInfo } = useCommonStore()
  const [listRanking, setListRanking] = useState<any>({})
  const { tabSound } = useAppSound()

  const [activeType, setActiveType] = useState(RANKING_TYPE.AIRDROP)
  const { data: listRankingResponse, isLoading } = useQuery({
    queryKey: ['getRanking', activeType],
    queryFn: () => {
      if (activeType === RANKING_TYPE.PROFIT) {
        return getRanking()
      } else if (activeType === RANKING_TYPE.AIRDROP) {
        return getRankingAirdrop()
      } else {
        return getListRankingEarned()
      }
    }
  })

  const handleSelectTab = (tab: string) => {
    tabSound.play()
    setActiveType(tab)
  }

  useEffect(() => {
    if (listRankingResponse?.data?.ranking) {
      let list = listRankingResponse?.data
      if (listRankingResponse?.data?.currentRank > listRankingResponse?.data?.ranking?.length) {
        list = {
          ...listRankingResponse?.data,
          ranking: [
            ...listRankingResponse?.data?.ranking,
            {
              pointEarned1: userInfo?.pointEarned1,
              pointEarned: userInfo?.pointEarned,
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
    <CustomPage
      classNames={{
        wrapper:
          "before:content-[''] before:absolute before:top-[120px] before:left-[-180px] before:rounded-[50%] before:blur-[50px] before:opacity-20 xs:before:opacity-30 before:size-[250px] before:bg-[linear-gradient(to_bottom,#00FF90,#F4FD36)] before:z-[-1] after:content-[''] after:absolute after:top-[120px] after:right-[-180px] after:rounded-[50%] after:blur-[50px] after:opacity-20 xs:after:opacity-30 after:size-[250px] after:bg-[linear-gradient(to_bottom,#00FF90,#F4FD36)] after:z-[-1]"
      }}
    >
      {isLoading && (
        <Loader
          classNames={{
            wrapper: 'h-[100vh] absolute z-[1] left-[0] bg-black/30',
            icon: 'w-[45px] h-[45px] text-white'
          }}
        />
      )}
      <CustomHeader title="RANKING" />
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
      <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4 my-6 xs:my-7 2xs:my-8">
        {Object.values(RANKING_TYPE).map((item, index) => (
          <motion.div
            whileTap={{ scale: 0.95 }}
            key={index}
            className="relative cursor-pointer"
            onClick={() => handleSelectTab(item)}
          >
            <img
              className="mx-auto"
              src={`/assets/images/upgrade/upgrade-tab${activeType === item ? '-active' : ''}.svg`}
              alt="Ranking Tab"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-[15px] xs:text-base 2xs:text-lg font-medium tracking-[1px] text-green-800 uppercase ${activeType === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
            >
              {item}
            </div>
          </motion.div>
        ))}
      </div>
      <div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          // exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.35 }}
          key={RANKING_TYPE.PROFIT}
          className="!will-change-auto"
        >
          {activeType === RANKING_TYPE.AIRDROP && (
            <p className="text-gradient text-center mb-5 font-semibold text-[13px] min-[355px]:text-sm xs:text-[15px] 2xs:text-base">{`"Ranking from 26 Nov to 09 Dec 2024"`}</p>
          )}
          <ListRankingItem
            data={listRanking}
            tab={activeType}
            isEarn={activeType !== RANKING_TYPE.PROFIT}
          />
        </motion.div>
      </div>
    </CustomPage>
  )
}
