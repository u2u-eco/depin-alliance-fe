'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import CustomList from '@/app/components/custom-list'
import CustomPage from '@/app/components/custom-page'
import { useQuery } from '@tanstack/react-query'
import { getRanking } from '../../services/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { formatNumber } from '@/helper/common'
import dayjs from 'dayjs'
import { IconChevron } from '../components/icons'
import useCommonStore from '@/stores/commonStore'

export default function RankingPage() {
  const router = useRouter()
  const { userInfo } = useCommonStore()
  const [listRanking, setListRanking] = useState<any>({})
  const { data: listRankingResponse } = useQuery({ queryKey: ['getRanking'], queryFn: getRanking })
  const handleBack = () => {
    router.back()
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

  const getBgByRank = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-[#BA3AFF] drop-shadow-purple before:bg-item-purple after:border-b-[#BA3AFF] after:border-r-[#BA3AFF]'
      case 1:
        return 'bg-[#00A3FF] drop-shadow-blue before:bg-item-blue after:border-b-[#00A3FF] after:border-r-[#00A3FF]'
      case 2:
        return 'bg-[#FFA800] drop-shadow-orange before:bg-item-orange after:border-b-[#FFA800] after:border-r-[#FFA800]'
      case 99999:
        return 'bg-green-500 drop-shadow-green before:bg-item-green after:border-b-green-500 after:border-r-green-500'
      default:
        return 'before:bg-item-default after:border-b-green-900 after:border-r-green-900 before:opacity-20'
    }
  }
  return (
    <CustomPage
      classNames={{
        wrapper:
          "before:content-[''] before:absolute before:top-[120px] before:left-[-180px] before:rounded-[50%] before:blur-[50px] before:opacity-30 before:size-[250px] before:bg-[linear-gradient(to_bottom,#00FF90,#F4FD36)] before:z-[-1] after:content-[''] after:absolute after:top-[120px] after:right-[-180px] after:rounded-[50%] after:blur-[50px] after:opacity-30 after:size-[250px] after:bg-[linear-gradient(to_bottom,#00FF90,#F4FD36)] after:z-[-1]"
      }}
    >
      <div className="relative flex items-center justify-center space-x-4">
        <div
          className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer rotate-90"
          onClick={handleBack}
        >
          <IconChevron className="text-green-500" />
        </div>
        <div className="size-1.5 bg-green-800"></div>
        <div className="text-title font-airnt font-medium text-xl xs:text-2xl">RANKING</div>
        <div className="size-1.5 bg-green-800"></div>
      </div>
      <div className="mt-6">
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
      <div className="mt-10">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* <CustomList
            type="ranking"
            data={listRanking?.data?.ranking}
            titleItemKey={'username'}
            imageItemKey={'avatar'}
          /> */}
          <div className="flex flex-col space-y-4">
            {listRanking?.ranking?.map((item: any, index: number) => (
              <div
                className={`relative !bg-transparent before:hidden after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent ${listRanking?.currentRank > 3 && (listRanking?.currentRank === index + 1 || listRanking.currentRank === item.rank) ? getBgByRank(99999) : getBgByRank(index)}`}
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
                        src={item.avatar || '/assets/images/avatar/avatar-01@2x.png'}
                        alt=""
                      />
                    </div>
                    <div className="space-y-2 xs:space-y-3">
                      <div className="text-white font-mona text-base xs:text-lg font-semibold leading-[20px] xs:leading-[22px]">
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
                          {item.miningPower && formatNumber(item.miningPower, 0, 0)}
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
      </div>
    </CustomPage>
  )
}
