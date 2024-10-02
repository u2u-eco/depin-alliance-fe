'use client'

import CustomPage from '@/app/components/custom-page'
import { IconLock, IconPoint } from '@/app/components/icons'
import ImageDevice from '@/app/components/image-device'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { formatNumber } from '@/helper/common'
import React, { useState } from 'react'

const lisDevice = [
  { id: 1, type: 'cpu', name: 'RAM 2GB', image: '', miningPower: 1222, lock: false },
  { id: 2, type: 'ram', name: 'RAM 2GB', image: '', miningPower: 1222, lock: false },
  { id: 3, type: 'ram', name: 'RAM 2GB', image: '', miningPower: 1222, lock: true },
  { id: 4, type: 'gpu', name: 'RAM 2GB', image: '', miningPower: 1222, lock: true },
  { id: 5, type: 'storage', name: 'RAM 2GB', image: '', miningPower: 1222, lock: true },
  { id: 6, type: 'cpu', name: 'RAM 2GB', image: '', miningPower: 1222, lock: false },
  { id: 7, type: 'ram', name: 'RAM 2GB', image: '', miningPower: 1222, lock: false },
  { id: 8, type: 'ram', name: 'RAM 2GB', image: '', miningPower: 1222, lock: true },
  { id: 9, type: 'gpu', name: 'RAM 2GB', image: '', miningPower: 1222, lock: true },
  { id: 10, type: 'storage', name: 'RAM 2GB', image: '', miningPower: 1222, lock: true }
]

export default function InnovatePage() {
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "[--size:_300px] xs:[--size:_355px] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-275px] before:size-[var(--size)] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:bottom-[-40px] after:right-[-20px] after:rotate-[-15deg] after:rounded-full after:bg-gradient after:opacity-30 after:z-[-1] after:blur-[55px] xs:after:blur-[68px] after:w-[100px] xs:after:w-[120px] after:h-[400px] xs:after:h-[500px]"
        }}
      >
        <div className="space-y-6 xs:space-y-7 2xs:space-y-8">
          <CustomHeader title="Innovation" />
          <div className="relative">
            <div className="absolute"></div>
            <div className="overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4">
                {lisDevice.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all h-full `}
                  >
                    <div
                      className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] h-full transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-full after:h-full  after:bg-white/10 after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer `}
                    >
                      <div className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] p-[1px] bg-green-100">
                        <ImageDevice
                          image={item.image}
                          type={item.type?.toLowerCase()}
                          className="size-full mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                        />
                      </div>
                      <p className="font-mona font-semibold text-white mt-3 mb-1 text-[13px] xs:text-sm !leading-[16px]">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-center space-x-1 mt-1.5">
                        <IconPoint className="size-3 xs:size-4" />
                        <span className="text-primary font-semibold text-[11px] min-[355px]:text-xs xs:text-sm">
                          {item?.miningPower ? formatNumber(item?.miningPower, 0, 2) : 0}
                          /h
                        </span>
                      </div>
                    </div>
                    {item.lock && (
                      <div className="[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] absolute top-0 left-0 right-0 w-full h-full bg-black/50 px-2 xs:px-3 2xs:px-4 py-3 xs:py-4">
                        <div className="size-[70px] xs:size-20 2xs:size-[90px] flex items-center justify-center mx-auto">
                          <IconLock className="size-6 xs:size-8 2xs:size-10 text-body" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
