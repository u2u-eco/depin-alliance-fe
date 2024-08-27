"use client"

import React from 'react'
import CustomList from '../components/custom-list'
import CustomPage from '../components/custom-page'

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
      <CustomPage>
        <div>
          <img className="mx-auto" src="/assets/images/mission-image.png" srcSet="/assets/images/mission-image.png 1x, /assets/images/mission-image@2x.png 2x" alt="Mission Image" />
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
      </CustomPage>
    </>
  )
}
