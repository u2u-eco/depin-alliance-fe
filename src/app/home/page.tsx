"use client"

import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { useRouter } from 'next/navigation'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import Info from '../components/info'

const HOME_TYPE = {
  START: 'start',
  MINING: 'mining',
  CLAIM: 'claim'
}

export default function HomePage() {
  const router = useRouter()
  const [type, setType] = useState(HOME_TYPE.START)
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  const handleClick = (type: any) => {
    switch(type) {
      case HOME_TYPE.START:
        setType(HOME_TYPE.MINING)
        break
      case HOME_TYPE.CLAIM:
        console.log(111);
        break
    }
  }

  useEffect(() => {
    if(type === HOME_TYPE.MINING) {
      setTimeout(() => setType(HOME_TYPE.CLAIM), 1000)
    }
  }, [type])

  return (
    <>
      <AnimatePresence mode="wait">
        <div className="home section">
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info/>
              {/* Level */}
              {/* {type !== HOME_TYPE.MINING && (
                <div className="mt-1 bg-gray-900 mx-3 flex items-center justify-between py-2 px-4">
                  <div className="font-semibold text-white-50 uppercase">newbie</div>
                  <div className="flex items-center space-x-1 text-white-50 font-semibold uppercase">
                    <span>LV.</span>
                    <p className="font-geist text-white">1</p>
                    <img className="size-4 -mt-0.5" src="/assets/images/icons/icon-chevron-right.svg" alt="Icon Chevron" />
                  </div>
                </div>
              )} */}
              {/* Point */}
              <div className="-mt-2">
                <div className="text-center text-white uppercase font-geist">total point</div>
                <div className="flex items-center justify-center -space-x-1.5">
                  <img className="size-16" src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="Point" />
                  <p className="text-white font-geist font-bold text-3xl text-point">500,000</p>
                </div>
                <div className="mt-1">
                  <img className="mx-auto h-240px" src="/assets/images/actor.png" alt="Actor" />
                </div>
              </div>
              {/* Button */}
              <div className="mt-8">
                <button className="btn" onClick={() => handleClick(type)}>
                  <div className="btn-border"></div>
                  {type === HOME_TYPE.MINING ? (
                    <div className="btn-default flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-white uppercase text-base font-bold">
                        <div>Mining</div>
                        <div className="flex items-center space-x-1">
                          <img className="size-6" src="/assets/images/point-color.svg" alt="Point" />
                          <p className="font-geist text-primary text-[18px] font-semibold">2,142</p>
                        </div>
                      </div>
                      <div className="flex items-center text-base font-geist font-semibold text-title">
                        <p className="size-[28px] flex items-center justify-center bg-white/10">03</p>
                        <span>:</span>
                        <p className="size-[28px] flex items-center justify-center bg-white/10">12</p>
                        <span>:</span>
                        <p className="size-[28px] flex items-center justify-center bg-white/10">14</p>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-primary">{type === HOME_TYPE.START ? 'START CONTRIBUTING' : 'CLAIM NOW'}</div>
                  )}
                  <div className="btn-border"></div>
                </button>
              </div>
              {/* Info */}
              <div className="mt-6">
                <Card/>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <div>
            <div className="font-airnt font-bold text-xl tracking-[1px] text-white text-center">avatar</div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
