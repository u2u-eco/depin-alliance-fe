"use client"

import React, { useState } from 'react'
import Card from '../components/card'
import { useRouter } from 'next/navigation'

const HOME_TYPE = {
  START: 'start',
  MINING: 'mining',
  CLAIM: 'claim'
}

export default function HomePage() {
  const router = useRouter()
  const [type, setType] = useState(HOME_TYPE.START)

  return (
    <div className="home section">
      <div className="container-custom">
        <div>
          <div className="bg-gray-900 py-2.5 px-3 flex items-center justify-between [clip-path:_polygon(0%_0%,calc(100%_-_12px)_0,100%_calc(0%_+_16px),100%_100%,0%_100%)]">
            <div className="flex items-center space-x-3">
              <img className="size-14" src="/assets/images/avatar.png" alt="Avatar" />
              <div className="space-y-2.5">
                <div className="text-white text-base font-semibold">Long Nhong</div>
                <div className="flex items-center space-x-1">
                  <img className="size-4" src="/assets/images/icons/icon-star-circle.svg" alt="Icon Start" />
                  <span className="font-geist text-white font-semibold">10</span>
                  <img className="size-4" src="/assets/images/icons/icon-chevron-right.svg" alt="Icon Chevron" />
                </div>
              </div>
            </div>
            <div className="cursor-pointer">
              <img className="size-6" src="/assets/images/icons/icon-settings.svg" alt="Icon Settings" />
            </div>
          </div>
          {type !== HOME_TYPE.MINING && (
            <div className="mt-1 bg-gray-900 mx-3 flex items-center justify-between py-2 px-4">
              <div className="font-semibold text-white-50 uppercase">newbie</div>
              <div className="flex items-center space-x-1 text-white-50 font-semibold uppercase">
                <span>LV.</span>
                <p className="font-geist text-white">1</p>
                <img className="size-4 -mt-0.5" src="/assets/images/icons/icon-chevron-right.svg" alt="Icon Chevron" />
              </div>
            </div>
          )}
          <div className="mt-6">
            <div className="text-center text-white-50 uppercase text-xs font-semibold">total point</div>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <img className="size-6" src="/assets/images/icons/icon-star-circle.svg" alt="Icon Star" />
              <p className="text-white font-geist font-bold text-2xl">500,000</p>
            </div>
            <div className="mt-6">
              <img className="mx-auto size-[220px]" src="/assets/images/avatar.png" alt="Avatar" />
            </div>
          </div>
          <div className="mt-8">
            {type === HOME_TYPE.MINING ? (
              <div className="bg-white/5 shadow-inner-base px-5 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white uppercase text-base font-bold">
                  <div>Mining</div>
                  <img className="size-4" src="/assets/images/icons/icon-star-circle.svg" alt="Icon Star" />
                  <p className="font-geist">2,142</p>
                </div>
                <div className="text-white-50 font-geist font-bold">03:12:14</div>
              </div>
            ) : (
              <button className="btn btn-primary">
                {type === HOME_TYPE.START ? (
                  <>
                    <span>Start Contributing</span>
                    <span>Start Contributing</span>
                  </>
                ) : (
                  <>
                    <div>Claim</div>
                    <img src="/assets/images/icons/icon-star-circle.svg" alt="Icon Star" />
                    <p>10,000</p>
                  </>
                )}
              </button>
            )}
          </div>
          <div className="mt-6">
            <Card/>
          </div>
        </div>
      </div>
    </div>
  )
}
