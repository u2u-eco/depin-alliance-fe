"use client"

import CustomList from '@/app/components/custom-list'
import CustomModal from '@/app/components/custom-modal'
import CustomPage from '@/app/components/custom-page'
import { IconChevron, IconPoint } from '@/app/components/icons'
import { useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const listMission = [
  { id: 1, title: 'OKX Mission', miningPower: '3000', icon: 'okx' },
  { id: 2, title: 'OKX Mission', miningPower: '3000', icon: 'okx' },
  { id: 3, title: 'OKX Mission', miningPower: '3000', icon: 'okx' },
  { id: 4, title: 'OKX Mission', miningPower: '3000', icon: 'okx', status: 'CLAIMED' },
]

export default function PartnersPage() {
  const router = useRouter()
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

  const handleBack = () => {
    router.back()
  }
  const handleClick = () => {
    onOpen()
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-gradient-yellow before:z-[-1]"
        }}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 cursor-pointer rotate-90" onClick={handleBack}>
            <IconChevron className="text-green-500"/>
          </div>
          <div className="space-y-6">
            <div className="text-center relative size-[110px] xs:size-[120px] 2xs:size-[130px] mx-auto">
              <div className="p-[1px] bg-green-100 [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0%_30px)]">
                <img
                  className="w-full h-full object-cover [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0%_30px)]"
                  src="/assets/images/mission/okx.png"
                  srcSet="/assets/images/mission/okx.png 1x, /assets/images/mission/okx@2x.png 2x"
                  alt="DePIN Alliance" />
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <div className="flex items-center justify-center space-x-6">
                <div className="size-1.5 bg-green-100"></div>
                <div className="text-title font-airnt font-medium text-lg xs:text-xl [text-shadow:_0_0_8px_rgba(255,255,255,0.5)] uppercase">okx wallet</div>
                <div className="size-1.5 bg-green-100"></div>
              </div>
              <p className="text-base leading-[20px] tracking-[-1px] text-body">OKX Wallet is the safest wallet you can find on market</p>
            </div>
            <div className="btn default cursor-default">
              <div className="btn-border"></div>
              <div className="btn-default !p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-[180px] space-y-2 text-center">
                    <p className="text-sm font-semibold text-body leading-[16px]">REWARDS</p>
                    <div className="flex items-center justify-center space-x-1 font-geist">
                      <IconPoint className="size-4" />
                      <p className="text-green-500 text-sm normal-case leading-[16px] whitespace-nowrap">Up to +3000 points</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-[50px] bg-white/25"></div>
                  <div className="flex-1 space-y-2 text-center">
                    <p className="text-sm font-semibold text-body leading-[16px]">PARTICIPANTS</p>
                    <div className="flex items-center justify-center space-x-1 font-geist">
                      <IconPoint className="size-4" />
                      <p className="text-title text-sm normal-case leading-[16px]">416K</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-border"></div>
            </div>
            <CustomList
              type="mission"
              title="Mission"
              data={listMission}
              onClickItem={handleClick}
            />
          </div>
        </div>
      </CustomPage>
      <CustomModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        full
      >
        <div className="h-full flex flex-col justify-between p-4">
          <div className="flex flex-1 flex-col items-center justify-center space-y-3">
            <div className="relative size-[250px]">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] size-full bg-[rgba(0,255,144,0.5)] z-[-1] blur-[75px]"></div>
              <img src="/assets/images/item-special.png" srcSet="/assets/images/item-special.png 1x, /assets/images/item-special@2x.png 2x" alt="DePIN Alliance" className="size-full" />
            </div>
            <div className="flex items-center justify-center space-x-6 ">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-lg xs:text-xl tracking-[1px] text-title text-center leading-[22px] xs:leading-[24px]">Congratulation </div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            <p className="text-body text-base leading-[20px] tracking-[-1px] text-center">You’ve received this special box.</p>
          </div>
          <div className="m-8">
            <div className="btn" onClick={onClose}>
              <div className="btn-border"></div>
              <div className="btn-primary">Claim</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
