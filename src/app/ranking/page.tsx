'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import CustomPage from '@/app/components/custom-page'
import { useQuery } from '@tanstack/react-query'
import { getListRankingEarned, getRanking } from '../../services/user'
import Image from 'next/image'
import { formatNumber } from '@/helper/common'
import dayjs from 'dayjs'
import useCommonStore from '@/stores/commonStore'
import Loader from '../components/ui/loader'
import { CustomHeader } from '../components/ui/custom-header'
import ListRankingItem from './components/list-ranking'

const RANKING_TYPE = {
  PROFIT: 'profit',
  EARNED: 'earned'
}

export default function RankingPage() {
  const { userInfo } = useCommonStore()
  const [listRanking, setListRanking] = useState<any>({})
  const [activeType, setActiveType] = useState(RANKING_TYPE.PROFIT)
  const { data: listRankingResponse, isLoading } = useQuery({
    queryKey: ['getRanking', activeType],
    queryFn: () => {
      if (activeType === RANKING_TYPE.PROFIT) {
        return getRanking()
      } else {
        return getListRankingEarned()
      }
    }
  })

  const handleSelectTab = (tab: string) => {
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
          "before:content-[''] before:absolute before:top-[120px] before:left-[-180px] before:rounded-[50%] before:blur-[50px] before:opacity-30 before:size-[250px] before:bg-[linear-gradient(to_bottom,#00FF90,#F4FD36)] before:z-[-1] after:content-[''] after:absolute after:top-[120px] after:right-[-180px] after:rounded-[50%] after:blur-[50px] after:opacity-30 after:size-[250px] after:bg-[linear-gradient(to_bottom,#00FF90,#F4FD36)] after:z-[-1]"
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
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
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
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.35 }}
          key={RANKING_TYPE.PROFIT}
        >
          <ListRankingItem data={listRanking} isEarn={activeType === RANKING_TYPE.EARNED} />
        </motion.div>
        {/* {activeType === RANKING_TYPE.PROFIT ? (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
            key={RANKING_TYPE.PROFIT}
          >
            <ListRankingItem data={listRanking}/>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
            key={RANKING_TYPE.EARNED}
          >
            <div
              className={`flex flex-col space-y-4 ${listRanking?.currentRank > listRanking?.ranking?.length ? 'mb-20 xs:mb-[90px]' : ''}`}
            >
              {listRanking?.ranking?.map((item: any, index: number) => (
                <div
                  className={`relative !bg-transparent before:hidden after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent ${listRanking?.currentRank > 3 && (listRanking?.currentRank === index + 1 || listRanking.currentRank === item.rank) ? getBgByRank(99999) : getBgByRank(index)} ${listRanking?.currentRank > listRanking?.ranking?.length && listRanking.currentRank === item.rank ? '!fixed bottom-0 left-3 3xs:left-4 right-3 3xs:right-4 max-w-[480px] mx-auto' : ''}`}
                  key={index}
                >
                  <div
                    className={`relative after:hidden [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] p-2 flex items-center justify-between ${listRanking?.currentRank > 3 && (listRanking?.currentRank === index + 1 || listRanking.currentRank === item.rank) ? getBgByRank(99999) : getBgByRank(index)}`}
                  >
                    <div className="flex items-center space-x-3 xs:space-x-4">
                      <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%' }}
                          src={
                            item.avatar.replace(/-/g, '-main-') ||
                            '/assets/images/avatar/avatar-01@2x.png'
                          }
                          alt=""
                        />
                      </div>
                      <div className="space-y-2 xs:space-y-3">
                        <div className="text-white font-mona text-base xs:text-lg font-semibold leading-[20px] xs:leading-[22px] [word-break:_break-word;]">
                          {item.username}
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            className="size-4"
                            src="/assets/images/point.png"
                            srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                            alt="Point"
                          />
                          <p className="text-primary font-geist font-semibold overflow-hidden max-w-[120px] xs:max-w-[160px] 2xs:max-w-[200px] text-ellipsis">
                            {item.miningPower ? `${formatNumber(item.miningPower, 0, 2)}/h` : '0/h'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mr-1 xs:mr-2 2xs:mr-3">
                      {[0, 1, 2].indexOf(index) === -1 ? (
                        <div className="text-white font-geist text-base xs:text-lg size-12 xs:size-[60px] flex items-center justify-center">
                          #{item.rank ? item.rank : index + 1}
                        </div>
                      ) : (
                        <img
                          className="size-12 xs:size-[60px]"
                          src={`/assets/images/ranking/rank-0${index + 1}.png`}
                          alt="Rank"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>
    </CustomPage>
  )
}
