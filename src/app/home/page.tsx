'use client'

import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import Info from '../components/info'
import { getUserInfo } from '../services/user'
import { useAppDispatch, useAppSelector } from '../hooks/useToolkit'
import { setUserInfo } from '../stores/slices/common'
import { formatNumber } from '../helper/common'
import Mining from './components/minning'

export default function HomePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { token, userInfo } = useAppSelector((state) => state.common)
  const dispatch = useAppDispatch()

  const _getUserInfo = async () => {
    const res = await getUserInfo()
    if (res.status) {
      dispatch(setUserInfo({ info: res.data }))
    }
  }

  useEffect(() => {
    if (token) {
      _getUserInfo()
    }
  }, [token])

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
              <Info />
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
                  <img
                    className="size-16"
                    src="/assets/images/point.png"
                    srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                    alt="Point"
                  />
                  <p className="text-white font-geist font-bold text-3xl text-point">
                    {userInfo.point ? formatNumber(userInfo.point, 0, 0) : 0}
                  </p>
                </div>
                <div className="mt-1">
                  <img className="mx-auto h-240px" src="/assets/images/actor.png" alt="Actor" />
                </div>
              </div>
              {/* Button */}
              <Mining />
              {/* Info */}
              <div className="mt-6">
                <Card />
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <div>
            <div className="font-airnt font-bold text-xl tracking-[1px] text-white text-center">
              avatar
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
