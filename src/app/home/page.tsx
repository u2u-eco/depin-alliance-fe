'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { formatNumber } from '../../helper/common'
import Mining from './components/minning'
import CustomPage from '../components/custom-page'
import useCommonStore from '@/stores/commonStore'
import { useUserInfo } from '@/hooks/useUserInfo'
import Link from 'next/link'
import { IconPoint } from '../components/icons'
import { motion } from 'framer-motion'
import { useAppSound } from '@/hooks/useAppSound'
import { SoundsContextValue } from '@/contexts/sounds.context'
import { useRouter } from 'next/navigation'
import TutorialModal from './components/tutorial'
import { useDisclosure } from '@nextui-org/react'

export default function HomePage() {
  const router = useRouter()
  const { userInfo } = useCommonStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { main } = useContext(SoundsContextValue)
  const { tabSound } = useAppSound()

  const handleStart = () => {}

  const handleClickFigure = () => {
    tabSound.play()
    router.push('/avatar')
  }

  useEffect(() => {
    main.play()
    return () => {
      main.stop()
    }
  }, [])

  useUserInfo()

  return (
    <>
      <CustomPage>
        {/* Point */}
        <motion.div
          className="relative"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute top-0 left-0 right-0 w-full z-[-1]">
            <img className="mx-auto" src="/assets/images/home-frame.svg" alt="Frame" />
          </div>
          <div
            onClick={handleClickFigure}
            className="relative block mt-16 w-fit mx-auto cursor-pointer before:content-[''] before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:size-[170px] before:rounded-[50%] before:bg-green-800 before:z-[-1] before:blur-[50px]"
          >
            <img
              className="mx-auto min-h-[240px] max-h-[240px] xs:min-h-[260px] xs:max-h-[260px]"
              src={
                userInfo?.avatar?.replace(/avatar-/g, 'figure-') ||
                '/assets/images/avatar/figure-01@2x.png'
              }
              alt="Figure"
            />
            {/* <Image
              className="mx-auto min-h-[240px] max-h-[240px] xs:min-h-[260px] xs:max-h-[260px]"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%' }}
              src={
                userInfo?.avatar?.replace(/avatar-/g, 'figure-') ||
                '/assets/images/avatar/figure-01@2x.png'
              }
              alt="Figure"
            /> */}
          </div>
        </motion.div>
        {/* Button */}
        <Mining />
        {/* Info */}
        <div className="mt-6">
          {/* <Card /> */}
          <div className="relative w-fit mx-auto">
            <img src="/assets/images/workspace/workspace-frame.svg" alt="Frame" />
            <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center space-x-3 xs:space-x-4 p-3 xs:p-4">
              <div className="relative">
                <div className="absolute top-[10px] left-[50%] translate-x-[-50%] size-[67px] bg-green-500/65 blur-[75px] rounded-[50%]"></div>
                <img
                  className="size-[110px] xs:size-[120px] min-[400px]:size-[130px] 2xs:size-[140px]"
                  src="/assets/images/workspace/workspace-image.png"
                  srcSet="/assets/images/workspace/workspace-image.png 1x, /assets/images/workspace/workspace-image@2x.png 2x"
                  alt=""
                />
              </div>
              <div className="space-y-2 xs:space-y-4 2xs:space-y-6">
                <div className="space-y-2 2xs:space-y-3">
                  <div className="text-white font-airnt font-medium text-[15px] xs:text-base tracking-[1px]">
                    Workspace
                  </div>
                  <div className="flex items-center space-x-2 xs:space-x-4 2xs:space-x-6">
                    <div className="space-y-1 xs:space-y-2">
                      <div className="text-body text-[11px] xs:text-xs uppercase">
                        TOTAL PROFIT:
                      </div>
                      <div className="flex items-center space-x-1">
                        <IconPoint className="size-4" />
                        <p className="text-green-500 font-semibold text-[13px] xs:text-sm">
                          {userInfo?.miningPower
                            ? `${formatNumber(userInfo.miningPower, 0, 2)}/h`
                            : '0/h'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/25 w-[1px] h-9"></div>
                    <div className="space-y-1 xs:space-y-2">
                      <div className="text-body text-[11px] xs:text-xs uppercase">DEVICE:</div>
                      <div className="flex items-center space-x-1">
                        <img
                          src="/assets/images/icons/icon-device-gray.svg"
                          alt=""
                          className="size-4"
                        />
                        <p className="text-green-500 font-semibold text-[13px] xs:text-sm">
                          {userInfo?.totalDevice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  onClick={() => {
                    tabSound.play()
                  }}
                  href="/workspace"
                  className="flex items-center space-x-1"
                >
                  <div className="text-gradient uppercase font-mona font-semibold text-[13px] xs:text-sm">
                    VIEW DETAIL
                  </div>
                  <img
                    src="/assets/images/icons/icon-open-link-gradient.svg"
                    alt=""
                    className="size-5 xs:size-6"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CustomPage>
      <TutorialModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        handleClick={handleStart}
      />
    </>
  )
}
