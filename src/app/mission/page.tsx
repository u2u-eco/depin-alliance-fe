"use client"

import React, { useState } from 'react'
import CustomList from '../components/custom-list'
import CustomPage from '../components/custom-page'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'

const listMission = [
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
  const [statusItem, setStatusItem] = useState('done')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <CustomPage
        classNames={{
          wrapper: "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-gradient-yellow before:z-[-1]"
        }}
      >
        <div>
          <img className="mx-auto" src="/assets/images/mission-image.png" srcSet="/assets/images/mission-image.png 1x, /assets/images/mission-image@2x.png 2x" alt="Mission Image" />
        </div>
        <div className="space-y-4">
        <div className="font-geist text-base tracking-[-1px] leading-[20px] text-white-50 mt-8">DAILY CHECK-IN</div>
          <div className="grid grid-cols-4">
            <div className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${statusItem === 'done' ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}>
              <div className={`flex items-center justify-center flex-col min-h-[120px] [clip-path:_polygon(30px_0,100%_0,100%_100%,0_100%,0_30px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#2C2D14] after:z-[-1] after:[clip-path:_polygon(30px_0,100%_0,100%_100%,0_100%,0_30px)] p-4 text-center cursor-pointer ${statusItem === 'done' ? 'bg-green-900 after:bg-green-900' : statusItem === 'active' ? 'bg-green-500 after:bg-[linear-gradient(to_top,#084625,#000100)] shadow-[0_0_16px_rgba(0,153,86,0.5)]' : ''}`}>
                <p className={`font-mona font-semibold mb-2 leading-[16px] ${statusItem === 'done' ? 'text-green-700' : statusItem === 'active' ? 'text-title' : 'text-inactive'}`}>Day 1</p>
                <div className="flex items-center space-x-1">
                  <img className="size-6" src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="Point" />
                  <p className="text-green-500">100</p>
                </div>
              </div>
            </div>
          </div>
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
        <div onClick={onOpen}>dasda</div>
        <CustomModal
          title={'Daily Check-in'}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        >
          <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>
              Claim Point Now!
            </p>
          </div>
          <div className="my-8 space-x-4 flex items-center justify-center">
            <div className="[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] bg-white/10 size-[90px] flex items-center justify-center">
              <img className="size-10" src="/assets/images/icons/icon-calendar-gradient.svg" alt="" />
            </div>
            <div className="space-y-2">
              <p className=" text-title font-semibold">REWARD:</p>
              <div className="flex items-center space-x-2">
                <img className="size-6" src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="Point" />
                <p className="text-green-500">100</p>
              </div>
            </div>
          </div>
          <div className="btn">
            <div className="btn-border"></div>
            <div className="btn-primary">Claim Now</div>
            <div className="btn-border"></div>
          </div>
          </div>
        </CustomModal>
      </CustomPage>
    </>
  )
}
