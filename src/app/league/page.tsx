"use client"

import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import CustomList from '../components/custom-list'
import { Input, useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'
import CustomInput from '../components/custom-input'

const LEAGUE_TYPE = {
  JOIN: 'join',
  CREATE: 'create',
}

const listLeague = {
  title: 'All Leagues',
  data: [
    { id: 1, image: '/league/league-01', title: 'Migos Drip Clan', point: '100/h' },
    { id: 1, image: '/league/league-02', title: 'RedDog Clan', point: '100/h' },
    { id: 1, image: '/league/league-03', title: 'Black Rhinos', point: '100/h' },
    { id: 1, image: '/league/league-04', title: 'Space Cartel', point: '100/h' },
  ]
}

export default function LeaguePage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [type, setType] = useState(LEAGUE_TYPE.CREATE)

  const handleClickItem = () => {
    onOpen()
  }

  return (
    <>
      <CustomPage>
        <div className="relative w-fit mx-auto before:content-[''] before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:bg-green-300 before:w-[145px] before:h-[5px] before:z-[2] before:[clip-path:_polygon(0_0,100%_0,calc(100%_-_5px)_100%,5px_100%)]">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/assets/images/league/league-frame.svg"
            alt="League Frame"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="absolute top-0 left-0 right-0 w-full h-full border border-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:border-t-green-300 before:border-l-green-300 after:content-[''] after:absolute after:top-0 after:right-0 after:size-5 after:border-[10px] after:border-transparent after:border-t-green-300 after:border-r-green-300">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              src="/assets/images/league/league-image.png"
              // srcSet="/assets/images/league/league-image.png 1x, /assets/images/league/league-image@2x.png 2x"
              alt="League Image"
            />
            <div className="px-4 py-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                <p className="text-title font-airnt font-medium text-xl leading-[24px] text-center uppercase tracking-[1px]">
                  join LEAGUE now
                </p>
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              </div>
              <div className="mt-2 mb-6 text-center text-body font-geist tracking-[-1px]">
                Let’s join the League or create a new League to contribute together!
              </div>
              <div className="btn">
                <div className="btn-border"></div>
                <div className="btn-primary">CREATE LEAGUE</div>
                <div className="btn-border"></div>
              </div>
            </div>
          </div>
        </div>
        <CustomList type="league" title={listLeague.title} data={listLeague.data} onClickItem={handleClickItem} />
      </CustomPage>
      <CustomModal
        title={type === LEAGUE_TYPE.JOIN ? 'Join LEAGUE' : 'CREATE LEAGUE'}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div>
          {type === LEAGUE_TYPE.JOIN ? (
            <>
              <div className=" text-body text-base tracking-[-1px] text-center">
                <p>Are you sure you want to join this League?</p>
              </div>
              <div className="my-10 flex items-center justify-center space-x-5">
                <div className="p-[1px] bg-white [clip-path:_polygon(24px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_24px)] size-[110px] flex items-center justify-center">
                  <img
                    className="w-full h-full [clip-path:_polygon(24px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_24px)]"
                    src="/assets/images/league/league-01.png"
                    srcSet="/assets/images/league/league-01.png 1x. /assets/images/league/league-01@2x.png 2x"
                    alt=""
                  />
                </div>
                <div className="space-y-3">
                  <p className=" text-title font-semibold text-2xl font-mona leading-[30px]">Space Cartel</p>
                  <div className="flex items-center space-x-2">
                    <img
                      className="size-7"
                      src="/assets/images/point.png"
                      srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                      alt="Point"
                    />
                    <span className="text-primary font-semibold text-lg">100/h</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-14 mb-10 space-y-6">
              <CustomInput
                label="League Name:"
                placeholder="Enter your league's name..."
              />
              <CustomInput
                label="Invite Link:"
                placeholder="https://t.me/DePIN-Alliance"
                isDisabled
                copy
              />
            </div>
          )}
          <div className="btn">
            <div className="btn-border"></div>
            <div className="btn-primary">JOIN LEAGUE</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
