"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import CustomList from '../components/custom-list'

const INVENTORY_TYPE = {
  BUILD: 'build',
  HARDWARE: 'hardware'
}

export default function InventoryPage() {
  const [activeType, setActiveType] = useState(INVENTORY_TYPE.BUILD)

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
        <div className="text-title font-airnt font-medium text-2xl">INVENTORY</div>
        <div className="size-1.5 bg-green-800"></div>
      </div>
      {/* Tab */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <div
          className="relative cursor-pointer"
          onClick={() => setActiveType(INVENTORY_TYPE.BUILD)}
        >
          <img
            className="mx-auto"
            src={`/assets/images/upgrade/upgrade-tab${activeType === INVENTORY_TYPE.BUILD ? '-active' : ''}.svg`}
            alt="Upgrade Tab"
          />
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === INVENTORY_TYPE.BUILD ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
          >
            Build
          </div>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => setActiveType(INVENTORY_TYPE.HARDWARE)}
        >
          <img
            className="mx-auto"
            src={`/assets/images/upgrade/upgrade-tab${activeType === INVENTORY_TYPE.HARDWARE ? '-active' : ''}.svg`}
            alt="Upgrade Tab"
          />
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === INVENTORY_TYPE.HARDWARE ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
          >
            Hardware
          </div>
        </div>
      </div>
      <div className="mt-6">
        {activeType === INVENTORY_TYPE.BUILD ? (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-col space-y-4 w-full">
              <div className="relative w-fit mx-auto">
                <Image
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  src="/assets/images/inventory/inventory-frame.svg"
                  alt="Frame"
                />
                <div className="absolute top-0 left-0 right-0 w-full h-full px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gradient font-mona text-xl font-semibold uppercase">RAM</div>
                    <div className="flex items-center space-x-1">
                      <img className="size-6" src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="Point" />
                      <div className="text-base text-green-500">1,000<span className="text-body">/hour</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >

          </motion.div>
        )}
      </div>
    </CustomPage>
  )
}
