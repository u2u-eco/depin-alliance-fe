'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CustomPage from '../components/custom-page'
import { useRouter } from 'next/navigation'
import Device from './components/device'
import Item from './components/item'

import { IconChevron, IconHome } from '../components/icons'
import Link from 'next/link'

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
            "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-[linear-gradient(315deg,#000_0,#00331d_50%,#000_72%)] after:z-[-2]"
        }}
      >
        <div className="sticky top-0 left-0 bg-white/10 flex items-center justify-between space-x-3 z-10 py-3 px-3 backdrop-blur-[8px]">
          <div
            className="cursor-pointer rotate-90"
            onClick={handleBack}
          >
            <IconChevron className="text-green-500 size-6 xs:size-7 2xs:size-8" />
          </div>
          <div className="flex items-center space-x-3 xs:space-x-4">
            <div className="size-1.5 bg-green-800"></div>
            <div className="text-title font-airnt font-medium text-lg xs:text-xl 2xs:text-2xl">Workspace</div>
            <div className="size-1.5 bg-green-800"></div>
          </div>
          <Link href="/home">
            <IconHome className="size-6 xs:size-7 2xs:size-8" gradient/>
          </Link>
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
          {activeType === WORKSPACE_TYPE.DEVICE ? (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Device />
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Item />
            </motion.div>
          )}
        </div>
      </CustomPage>
    </>
  )
}
