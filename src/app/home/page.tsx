'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { formatNumber } from '../../helper/common'
import Mining from './components/minning'
import CustomPage from '../components/custom-page'
import useCommonStore from '@/stores/commonStore'
import { useUserInfo } from '@/hooks/useUserInfo'
import Link from 'next/link'
import { IconDevice, IconMinus, IconOpenLink, IconPoint } from '../components/icons'
import { motion } from 'framer-motion'
import { useAppSound } from '@/hooks/useAppSound'
import { SoundsContextValue } from '@/contexts/sounds.context'
import { useRouter } from 'next/navigation'
export default function HomePage() {
  const router = useRouter()
  const { userInfo } = useCommonStore()

  const { main } = useContext(SoundsContextValue)
  const { tabSound, buttonSound } = useAppSound()
  const [isShowInfo, setIsShowInfo] = useState(false)

  const handleClickFigure = () => {
    tabSound.play()
    router.push('/avatar')
  }

  const handleClickWorkspace = () => {
    tabSound.play()
    router.push('/workspace')
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
      <CustomPage
        classNames={{
          wrapper:
            'bg-[linear-gradient(to_bottom,#0f0f0f_26%,#083421_55%,#00663a_66%,#093321_74%,#0f0f0f_86%)]'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-full mix-blend-lighten z-[-1]">
          <video autoPlay muted loop className="h-full object-cover">
            <source src="/assets/images/video.mp4" type="video/mp4" />
          </video>
        </div>
        <motion.div
          className="relative h-full flex flex-col"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex-1 relative h-full mt-6 xs:mt-7 2xs:mt-8">
            <div
              onClick={handleClickFigure}
              className="relative h-full w-fit mx-auto cursor-pointer before:content-[''] before:absolute before:bottom-[-10px] before:left-[50%] before:translate-x-[-50%] before:w-[160px] xs:before:w-[200px] 2xs:before:w-[240px] before:h-[30px] before:[clip-path:_ellipse(50%_50%_at_50%_50%)] before:bg-[radial-gradient(rgba(24,24,24,1),rgba(24,24,24,0)_60%)] before:z-[-1]"
            >
              <img
                className="h-full"
                src={
                  userInfo?.avatar?.replace(/avatar-/g, 'figure-') ||
                  '/assets/images/avatar/figure-01@2x.png'
                }
                alt="Figure"
              />
            </div>
            <div
              className={`absolute bottom-0 right-0 z-[2] transition-all ${isShowInfo ? 'w-full left-0' : ''}`}
            >
              <div
                className={`relative before:content-[''] before:absolute before:top-[2.5px] before:left-[2.5px] before:size-2 before:border-[4px] before:border-transparent before:border-t-green-700 before:border-l-green-700 after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-3 after:border-[6px] after:border-transparent after:border-b-green-700 after:border-r-green-700 after:z-[3] transition-all ${isShowInfo ? 'w-full h-auto' : 'size-[60px] xs:size-[70px] 2xs:size-[80px]'}`}
                onClick={() => {
                  setIsShowInfo(true)
                  if (!isShowInfo) {
                    buttonSound.play()
                  }
                }}
              >
                <div className="[--shape:_12px] size-full [clip-path:_polygon(var(--shape)_0%,100%_0,100%_100%,0_100%,0%_var(--shape));] bg-green-700 p-[1px]">
                  <div
                    className={`size-full [clip-path:_polygon(var(--shape)_0%,100%_0,100%_100%,0_100%,0%_var(--shape));] ${isShowInfo ? 'relative p-3 xs:p-4 2xs:p-5 bg-black/80' : 'bg-[linear-gradient(to_top,#093421,#02663A)] p-1'}`}
                  >
                    {isShowInfo ? (
                      <>
                        <div className="space-y-1.5 xs:space-y-2">
                          <div className="font-airnt text-sm min-[355px]:text-[15px] xs:text-base font-medium !leading-[20px] min-[355px]:!leading-[22px] xs:!leading-[24px] uppercase tracking-[1px] text-white whitespace-nowrap">
                            Workspace
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
                              <p className="text-body text-[11px] xs:text-xs !leading-[16px] tracking-[-1px] whitespace-nowrap">
                                TOTAL PROFIT:
                              </p>
                              <div className="flex items-center space-x-1">
                                <IconPoint className="size-4" />
                                <p className="text-green-500 text-[13px] xs:text-sm !leading-[16px] font-semibold">
                                  10,000/h
                                </p>
                              </div>
                            </div>
                            <div className="h-8 xs:h-9 w-[1px] bg-white/25"></div>
                            <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
                              <p className="text-body text-[11px] xs:text-xs !leading-[16px] tracking-[-1px]">
                                DEVICE:
                              </p>
                              <div className="flex items-center space-x-1">
                                <IconDevice className="size-4 text-body" />
                                <p className="text-green-500 text-[13px] xs:text-sm !leading-[16px] font-semibold">
                                  05
                                </p>
                              </div>
                            </div>
                            <div className="h-8 xs:h-9 w-[1px] bg-white/25"></div>
                            <div
                              className="flex items-center space-x-0 xs:space-x-0.5 2xs:space-x-1 cursor-pointer"
                              onClick={handleClickWorkspace}
                            >
                              <p className="font-mona text-gradient text-xs xs:text-[13px] 2xs:text-sm font-semibold !leading-[14px] xs:!leading-[16px] uppercase">
                                VIEW DETAIL
                              </p>
                              <IconOpenLink className="size-5 xs:size-6" gradient />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="size-full [clip-path:_polygon(var(--shape)_0%,100%_0,100%_100%,0_100%,0%_var(--shape));] bg-black/20 p-1 transition-all">
                        <img
                          className="size-full"
                          src="/assets/images/workspace/workspace-image.png"
                          srcSet="/assets/images/workspace/workspace-image.png 1x, /assets/images/workspace/workspace-image@2x.png 2x"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isShowInfo && (
                <div
                  className="absolute top-2 right-2 cursor-pointer z-[1] transition-all"
                  onClick={() => {
                    setIsShowInfo(false)
                    buttonSound.play()
                  }}
                >
                  <IconMinus className="text-body size-6" />
                </div>
              )}
            </div>
          </div>
          <Mining />
        </motion.div>
      </CustomPage>
    </>
  )
}
