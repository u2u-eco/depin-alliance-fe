'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CustomList from '@/app/components/custom-list'
import CustomPage from '@/app/components/custom-page'
import { useQuery } from '@tanstack/react-query'
import { getRanking } from '../../services/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { formatNumber } from '@/helper/common'

const RANKING_TYPE = {
  ENGINER: 'enginer',
  ALLIANCE: 'alliance'
}

const listEnginer = [
  { id: 1, title: 'Tornando L', point: '10,000/h', image: 'user-01', rank: '1' },
  { id: 2, title: 'Tornando L', point: '10,000/h', image: 'user-02', rank: '2' },
  { id: 3, title: 'Tornando L', point: '10,000/h', image: 'user-03', rank: '3' },
  { id: 4, title: 'Tornando L', point: '10,000/h', image: 'user-01', rank: '4' }
]

const listSkill = [
  { id: 1, title: 'Programing', level: '12', image: 'upgrade/upgrade-skill-programing' },
  { id: 2, title: 'Design', level: '12', image: 'upgrade/upgrade-skill-design' },
  { id: 3, title: 'Marketing', level: '12', image: 'upgrade/upgrade-skill-marketing' },
  { id: 4, title: 'Social Networking', level: '12', image: 'upgrade/upgrade-skill-social' }
]

export default function RankingPage() {
  const router = useRouter()
  const [activeType, setActiveType] = useState(RANKING_TYPE.ENGINER)
  const { data: listRanking } = useQuery({ queryKey: ['getRanking'], queryFn: getRanking })
  const handleBack = () => {
    router.back()
  }

  const getBgByRank = (index: number) => {
    switch (index) {
      case 0:
        return 'before:bg-item-purple after:border-b-[#BA3AFF] after:border-r-[#BA3AFF]'
      case 1:
        return 'before:bg-item-blue after:border-b-[#00A3FF] after:border-r-[#00A3FF]'
      case 2:
        return 'before:bg-item-orange after:border-b-[#FFA800] after:border-r-[#FFA800]'
      default:
        return 'before:bg-item-green after:border-b-green-900 after:border-r-green-900'
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
        <div className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer">
          <Image
            onClick={handleBack}
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            src="/assets/images/icons/icon-chevron-left-green.svg"
            alt="Icon Chevron"
          />
        </div>
        <div className="size-1.5 bg-green-800"></div>
        <div className="text-title font-airnt font-medium text-2xl">RANKING</div>
        <div className="size-1.5 bg-green-800"></div>
      </div>
      <div className="relative mt-6">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          src="/assets/images/ranking/ranking-image.png"
          // srcSet="/assets/images/ranking/ranking-image.png 1x, /assets/images/ranking/ranking-image@2x.png 2x"
          alt="Ranking Image"
        />
        <div className="absolute bottom-0 left-[50%] translate-x-[-50%] space-y-2 text-center">
          <div className="text-title font-airnt font-medium text-xl leading-[24px] tracking-[1px] [text-shadow:_0_0_8px_rgba(255,255,255,0.5)]">
            Diamond
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="relative">
              <img
                className="size-7"
                src="/assets/images/point.png"
                srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                alt="Point"
              />
            </div>
            <p className="text-primary font-geist text-lg font-semibold">5,000/10,000</p>
          </div>
        </div>
      </div>
      {/* Tab */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <div
          className="relative cursor-pointer"
          onClick={() => setActiveType(RANKING_TYPE.ENGINER)}
        >
          <img
            className="mx-auto"
            src={`/assets/images/upgrade/upgrade-tab${activeType === RANKING_TYPE.ENGINER ? '-active' : ''}.svg`}
            alt="Upgrade Tab"
          />
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === RANKING_TYPE.ENGINER ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
          >
            Enginer
          </div>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => setActiveType(RANKING_TYPE.ALLIANCE)}
        >
          <img
            className="mx-auto"
            src={`/assets/images/upgrade/upgrade-tab${activeType === RANKING_TYPE.ALLIANCE ? '-active' : ''}.svg`}
            alt="Upgrade Tab"
          />
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === RANKING_TYPE.ALLIANCE ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
          >
            Alliance
          </div>
        </div>
      </div>
      <div className="mt-6">
        {activeType === RANKING_TYPE.ENGINER ? (
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
              {listRanking?.data.ranking?.map((item: any, index: number) => (
                <div key={index}>
                  <div
                    className={`relative before:absolute before:top-0 before:left-0 before:content-[''] before:w-full before:h-full before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:opacity-20 before:z-[-1] after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent p-2 items-center justify-between ${getBgByRank(index)}`}
                  >
                    <div>
                      <div className=" flex w-full justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: '100%' }}
                              src={item.avatar}
                              alt=""
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="text-white font-mona text-lg font-semibold leading-[22px]">
                              {item.username}
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <img
                                  className="size-4"
                                  src="/assets/images/point.png"
                                  srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                                  alt="Point"
                                />
                                <p className="text-primary font-geist font-semibold">
                                  {formatNumber(item.miningPower, 0, 0)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mr-3">
                          {[0, 1, 2].indexOf(index) === -1 ? (
                            <div className="text-white font-geist text-lg size-[60px] flex items-center justify-center">
                              #{index + 1}
                            </div>
                          ) : (
                            <img
                              className="size-[60px]"
                              src={`/assets/images/ranking/rank-0${index + 1}.png`}
                              alt="Rank"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CustomList type="skill" data={listSkill} />
          </motion.div>
        )}
      </div>
    </CustomPage>
  )
}
