"use client"

import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Device from './components/device'

const WORKSPACE_TYPE = {
  DEVICE: 'device',
  ITEM: 'item'
}

export default function WorkspacePage() {
  const router = useRouter()
  const [activeType, setActiveType] = useState(WORKSPACE_TYPE.DEVICE)

  const handleBack = () => {
    router.back()
  }
  const handleSelectTab = (tab: string) => {
    setActiveType(tab)
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
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
          <div className="text-title font-airnt font-medium text-xl xs:text-2xl">Workspace</div>
          <div className="size-1.5 bg-green-800"></div>
        </div>
        <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4 mt-8">
          {Object.values(WORKSPACE_TYPE).map((item, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleSelectTab(item)}
            >
              <img
                className="mx-auto"
                src={`/assets/images/upgrade/upgrade-tab${activeType === item ? '-active' : ''}.svg`}
                alt="Upgrade Tab"
              />
              <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Device/>
        </div>
      </CustomPage>
    </>
  )
}
