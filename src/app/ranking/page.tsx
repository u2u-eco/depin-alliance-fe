'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CustomList from '@/app/components/custom-list'
import CustomPage from '@/app/components/custom-page'
import { useQuery } from '@tanstack/react-query'
import { getRanking } from '../../services/user'
import Image from 'next/image'

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
  const [activeType, setActiveType] = useState(RANKING_TYPE.ENGINER)
  const { data: listRanking } = useQuery({ queryKey: ['getRanking'], queryFn: getRanking })
  console.log('🚀 ~ RankingPage ~ listRanking:', listRanking)
  return (
    <CustomPage>
      <div className="relative flex items-center justify-center space-x-4">
        <div className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer">
          <Image
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
            <CustomList
              type="ranking"
              data={listRanking?.data?.ranking}
              titleItemKey={'username'}
              imageItemKey={'avatar'}
            />
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
