'use client'

import CustomPage from '@/app/components/custom-page'
import { CustomHeader } from '@/app/components/ui/custom-header'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Ranking from './components/ranking'

const RANKING_TYPE = {
  FUND: 'fund',
  PROFIT: 'profit'
}

export default function RankingPage() {
  const [activeType, setActiveType] = useState(RANKING_TYPE.FUND)

  const handleSelectTab = (tab: string) => {
    setActiveType(tab)
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "[--size:_300px] xs:[--size:_355px] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-275px] before:size-[var(--size)] before:rounded-[50%] before:bg-yellow-500 before:blur-[75px] before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:bottom-[-40px] after:right-[-20px] after:rotate-[-15deg] after:rounded-full after:bg-gradient after:opacity-30 after:z-[-1] after:blur-[55px] xs:after:blur-[68px] after:w-[100px] xs:after:w-[120px] after:h-[400px] xs:after:h-[500px]"
        }}
      >
        <div className="space-y-6 xs:space-y-7 2xs:space-y-8">
          <CustomHeader title="Ranking" />
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4">
              {Object.values(RANKING_TYPE).map((item, index) => (
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => handleSelectTab(item)}
                >
                  <img
                    className="mx-auto transition-all"
                    src={`/assets/images/upgrade/upgrade-tab${activeType === item ? '-active' : ''}.svg`}
                    alt="DePIN Alliance"
                  />
                  <div
                    className={`absolute transition-all top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
                  >
                    {item}
                  </div>
                </motion.div>
              ))}
            </div>
            <Ranking />
          </div>
        </div>
      </CustomPage>
    </>
  )
}
