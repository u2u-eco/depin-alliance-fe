"use client"

import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import { IconCheck, IconChevron, IconLock, IconPoint } from '../components/icons'
import { useRouter } from 'next/navigation'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'

const listLevel = [
  { id: 1, number: '10', currentXP: '1,400', totalXP: '10,000', capacity: '10,000', rate: '10', reward: '15' },
  { id: 2, number: '11', currentXP: '0', totalXP: '20,000', capacity: '10,000', rate: '10', reward: '15', lock: true },
  { id: 3, number: '12', currentXP: '0', totalXP: '40,000', capacity: '10,000', rate: '10', reward: '15', lock: true },
]

export default function LevelPage() {
  const router = useRouter()
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [levelUp, setLevelUp] = useState(true)

  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "bg-[linear-gradient(to_bottom,#000_40%,#00331d_100%)] before:content-[''] before:absolute before:left-[-60%] before:top-[-20%] before:size-[250px] before:blur-[50px] before:bg-green-500 before:rounded-[50%] before:z-[-1] before:opacity-30 after:content-[''] after:absolute after:right-[-60%] after:top-[-20%] after:size-[250px] after:blur-[50px] after:bg-green-500 after:rounded-[50%] after:z-[-1] after:opacity-30"
        }}
      >
        <div className="space-y-10">
          <div className="relative flex items-center justify-center space-x-4">
            <div className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer rotate-90" onClick={handleBack}>
              <IconChevron className="text-green-500"/>
            </div>
            <div className="size-1.5 bg-green-800"></div>
            <div className="text-title font-airnt font-medium text-xl xs:text-2xl">LEVEL</div>
            <div className="size-1.5 bg-green-800"></div>
          </div>
          <div className="space-y-8">
            {listLevel.map((item:any) => (
              <div className="space-y-4" key={item.id}>
                <div className={`relative after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-[14px] after:border-[7px] after:border-transparent before:absolute before:content-[''] before:left-1 before:top-1 before:size-[10px] before:border-[5px] before:border-transparent ${item.lock ? 'after:border-b-inactive after:border-r-inactive before:border-t-inactive before:border-l-inactive' : 'after:border-b-green-500 after:border-r-green-500 before:border-t-green-500 before:border-l-green-500'}`}>
                  <div className={`relative p-[1px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_22px),calc(100%_-_22px)_100%,0_100%,0_16px)] ${item.lock ? 'bg-inactive' : 'bg-green-500'}`}>
                    <div className="p-2 [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_22px),calc(100%_-_22px)_100%,0_100%,0_16px)] bg-[linear-gradient(to_top,#00170D,#000)] flex items-center space-x-4">
                      <div className="[clip-path:_polygon(12px_0%,100%_0,100%_100%,0_100%,0%_12px)] bg-white/10 size-20 min-w-20 flex items-center justify-center flex-col">
                        <p className={` ${item.lock ? 'text-inactive' : 'text-body'} tracking-[-1px] leading-[18px]`}>Level</p>
                        <p className={` ${item.lock ? 'text-inactive' : 'text-gradient'} text-[40px] font-bold leading-[50px]`}>{item.number}</p>
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between tracking-[-1px] leading-[18px]">
                          <div className={item.lock ? `text-inactive` : `text-title`}>{item.currentXP} XP</div>
                          <div className={item.lock ? `text-inactive` : `text-body`}>{item.totalXP} XP</div>
                        </div>
                        <div className="relative w-full h-1 rounded bg-gray-850">
                          <div className={`absolute top-0 left-0 h-1 bg-gradient rounded before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:bg-gradient before:blur-[6px] ${item.lock ? 'w-0' : 'w-[60%]'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn default cursor-default">
                  <div className="btn-border"></div>
                  <div className="btn-default !p-4">
                    {item.lock ? (
                      <div className="min-h-[130px] flex items-center justify-center flex-col space-y-2 text-inactive">
                        <IconLock className="size-[30px]" />
                        <p className="tracking-[-1px] font-normal text-sm normal-case">Level up to unlock</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between font-semibold text-sm leading-[16px]">
                          <div className="text-body uppercase">CAPACITY</div>
                          <div className="flex items-center space-x-1">
                            <IconPoint className="size-4" />
                            <p className="text-green-500 font-geist">10,000</p>
                          </div>
                        </div>
                        <div className="h-[1px] w-full bg-white/10"></div>
                        <div className="flex items-center justify-between font-semibold text-sm leading-[16px]">
                          <div className="text-body uppercase">BONUS RATE</div>
                          <p className="text-title">10%</p>
                        </div>
                        <div className="h-[1px] w-full bg-white/10"></div>
                        <div className="flex items-center justify-between font-semibold text-sm leading-[16px]">
                          <div className="text-body uppercase">CAPACITY</div>
                          <p className="text-title">15%</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="btn-border"></div>
                </div>
                {!item.lock && (
                  <div className={`btn ${levelUp ? '' : 'inactive'}`} onClick={onOpen}>
                    <div className="btn-border"></div>
                    <div className={levelUp ? `btn-primary` : `btn-inactive`}>Level Up</div>
                    <div className="btn-border"></div>
                  </div>
                )}
                {item.id !== 3 && (
                  <div className="!mt-8">
                    <img className="mx-auto max-w-[85px]" src={`/assets/images/level/level-arrow${item.lock ? '' : '-color'}.png`} srcSet={`/assets/images/level/level-arrow${item.lock ? '' : '-color'}.png 1x, /assets/images/level/level-arrow${item.lock ? '' : '-color'}@2x.png 2x`} alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CustomPage>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: "max-w-full w-full h-full m-0 rounded-none p-0 bg-[linear-gradient(to_bottom,#000_40%,#00331d_100%)]",
          backdrop: 'bg-black/30 backdrop-blur-[8px]'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <div className="relative max-w-[480px] mx-auto w-full h-full">
              <img
                className="mx-auto min-[460px]:h-full object-cover w-full"
                src="/assets/images/level-up-background.png"
                srcSet="/assets/images/level-up-background.png 1x, /assets/images/level-up-background@2x.png 2x"
                alt="Level Up Background"
              />
              <div className="absolute top-0 left-0 right-0 w-full h-full">
                <div className="container-custom">
                  <div className="pb-8 min-[355px]:pb-12 xs:pb-16 min-[400px]:pb-20 2xs:pb-24">
                    <img className="mx-auto h-12 2xs:h-14" src="/assets/images/logo.svg" alt="Logo" />
                  </div>
                  <div className="relative w-fit mx-auto">
                    <img className="size-[130px] 2xs:size[150px]" src="/assets/images/level-up-frame.svg" alt="Frame" />
                    <div className="absolute top-0 left-0 right-0 w-full h-full text-center flex items-center justify-center flex-col">
                      <p className="text-base tracking-[-1px] text-body uppercase leading-[20px]">LEVEL</p>
                      <p className="text-gradient font-bold text-4xl 2xs:text-5xl leading-[60px]">16</p>
                    </div>
                  </div>
                  <div className="mt-6 xs:mt-8 2xs:mt-10 space-y-3 text-center">
                    <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6">
                      <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                      <div className="text-title font-airnt font-medium text-xl xs:text-2xl 2xs:text-3xl uppercase">Level up</div>
                      <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                    </div>
                    <div className="text-body text-[15px] 2xs:text-base tracking-[-1px] leading-[20px]">Congratulations! You’ve reached level 13 and received 1 skill point.</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[20px] xs:bottom-[30px] 2xs:bottom-10 right-[20px] xs:right-[30px] 2xs:right-10">
                <div className="btn" onClick={onClose}>
                  <div className="btn-border"></div>
                  <div className="btn-primary !p-1.5 xs:!p-2 2xs:!p-[9px]">
                    <IconCheck className="text-green-900 size-[30px]" />
                  </div>
                  <div className="btn-border"></div>
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
