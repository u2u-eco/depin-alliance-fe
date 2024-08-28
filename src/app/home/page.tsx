'use client'

import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import Info from '../components/info'
import { getUserInfo } from '../services/user'
import { useAppDispatch, useAppSelector } from '../hooks/useToolkit'
import { setDevice, setUserInfo } from '../stores/slices/common'
import { formatNumber } from '../helper/common'
import Mining from './components/minning'
import { getUserDevice } from '../services/devices'
import CustomPage from '../components/custom-page'

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

  const _getUserDevice = async () => {
    const res = await getUserDevice()
    if (res.status) {
      dispatch(setDevice({ info: res.data }))
    }
  }

  useEffect(() => {
    if (token) {
      _getUserInfo()
      _getUserDevice()
    }
  }, [token])

  return (
    <>
      <CustomPage>
        {/* Point */}
        <div className="">
          <div className="flex items-center justify-center space-x-2">
            <img
              className="size-9"
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
      </CustomPage>
    </>
  )
}
