"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Info from '../components/info'
import CustomList from '../components/custom-list'

const listMission = [
  { id: 1, title: 'DAILY BONUS', list: [
    { id: 1, icon: 'calendar', title: 'Daily Check-in', text: 'Check-in and get rewards' }
  ] },
  { id: 2, title: 'OKX PARTNER', list: [
    { id: 1, icon: 'okx', title: 'OKX Mission', point: '3,000', complete: '0', totalTask: '5' }
  ] },
  { id: 3, title: 'SOCIAL MISSION', list: [
    { id: 1, icon: 'x', title: 'Follow Our X Account', point: '100/h' },
    { id: 2, icon: 'telegram', title: 'Join Our Telegram Chanel', point: '100/h', done: true },
  ] },
  { id: 4, title: 'Quiz', list: [
    { id: 1, icon: 'quiz', title: 'Complete IQ Quiz', point: '100/h' },
  ] }
]

export default function MissionPage() {
  return (
    <>
      <AnimatePresence mode="wait">
      <div className="misison section before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-gradient-yellow before:z-[-1]">
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info/>
              <div className="mt-8 w-full max-w-[480px] mx-auto">
                <div>
                  <img src="/assets/images/mission-image.png" srcSet="/assets/images/mission-image.png 1x, /assets/images/mission-image@2x.png 2x" alt="Mission Image" />
                </div>
                <div>
                  {listMission.map((item: any) => (
                    <CustomList
                      type="mission"
                      title={item.title}
                      data={item.list}
                      key={item.id}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}
