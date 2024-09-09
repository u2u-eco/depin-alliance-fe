/* eslint-disable @next/next/no-img-element */
'use client'

import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { claimRewardNewUser, detectDeviceInfo } from '../../services/user'
import { CURRENT_STATUS } from '../../interfaces/i.user'
import useCommonStore from '@/stores/commonStore'
import ModalReward from '../components/ui/modal-reward'
import { useDisclosure } from '@nextui-org/react'
import { formatNumber } from '@/helper/common'

const ONBOARDING_TYPE = {
  SPLASH: 'splash',
  START: 'start',
  LOADING: 'loading',
  DEVICE: 'device',
  SCHOLARSHIP: 'scholarship'
}

const Onboarding = () => {
  const router = useRouter()
  const isDetectDevice = useRef<boolean>(false)
  const [pointReward, setPointReward] = useState<number>(0)
  const [deviceName, setDeviceName] = useState<string>('')
  const { currentStatus, token, getUserInfo, setDevice, userInfo } = useCommonStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [type, setType] = useState(ONBOARDING_TYPE.DEVICE)
  const _getDeviceInfo = async () => {
    try {
      const res = await detectDeviceInfo()
      if (res.status) {
        // setDevice({ info: res.data })
        setPointReward(res.data)
        setType(ONBOARDING_TYPE.DEVICE)
        setTimeout(() => onOpen(), 3000)
      }
    } catch (ex) {
      setType(ONBOARDING_TYPE.SCHOLARSHIP)
    }
  }

  const handleClaim = async () => {
    const res = await claimRewardNewUser()
    if (res.status) {
      setType(ONBOARDING_TYPE.SCHOLARSHIP)
    }
  }

  const handleCloseModal = async () => {
    handleClaim()
    onClose()
  }

  const handleOnboarding = (type: any) => {
    switch (type) {
      case ONBOARDING_TYPE.START:
        _getDeviceInfo()
        setType(ONBOARDING_TYPE.LOADING)
        break
      case ONBOARDING_TYPE.SCHOLARSHIP:
        getUserInfo()
        router.push('/home')
        break
    }
  }

  const detectDevice = () => {
    if (isDetectDevice.current) return
    isDetectDevice.current = true
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    const devicePixelRatio = window.devicePixelRatio

    const clientInfo = {
      screenWidth: screenWidth,
      screenHeight: screenHeight,
      devicePixelRatio: devicePixelRatio,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      userAgent: navigator.userAgent,
      platform: /iPad|iPhone/.test(navigator.platform) ? 'iOS' : 'Unknown',
      osVersion:
        navigator.userAgent && navigator.userAgent.match(/OS (\d+_\d+)/i)
          ? navigator.userAgent.match(/OS (\d+_\d+)/i)?.[1].replace('_', '.')
          : 'Unknown',
      isProMotion: window.matchMedia('(min-resolution: 120dpi)').matches,
      dynamicIsland: false
    }

    fetch('https://detect-mobile.u2w.app/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientInfo)
    })
      .then((response) => response.json())
      .then((data) => {
        isDetectDevice.current = false
        setDeviceName(data.detectedModel)
      })
      .catch((error) => {
        isDetectDevice.current = false
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    switch (currentStatus) {
      case CURRENT_STATUS.STARTED:
        setType(ONBOARDING_TYPE.SPLASH)
        if (token) {
          setType(ONBOARDING_TYPE.START)
        }
        break
      case CURRENT_STATUS.DETECTED_DEVICE_INFO:
        setType(ONBOARDING_TYPE.SCHOLARSHIP)
        if (userInfo?.pointUnClaimed) {
          setPointReward(userInfo.pointUnClaimed)
          onOpen()
        }
        break
      case CURRENT_STATUS.MINING:
      case CURRENT_STATUS.CLAIMED:
        redirect('/home')
    }
  }, [currentStatus, token, userInfo])

  useEffect(() => {
    detectDevice()
  }, [])

  return (
    <AnimatePresence mode="wait">
      {type === ONBOARDING_TYPE.SPLASH ? null : (
        <>
          <div className="onboarding section">
            <div className="absolute top-0 left-0 right-0 w-full h-full z-[-1]">
              <img
                className="mx-auto object-cover min-[460px]:h-full w-full"
                src={`/assets/images/onboarding/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP || type === ONBOARDING_TYPE.DEVICE ? '-scholarship' : ''}-background.png`}
                srcSet={`/assets/images/onboarding/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP || type === ONBOARDING_TYPE.DEVICE ? '-scholarship' : ''}-background.png 1x, /assets/images/onboarding/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP || type === ONBOARDING_TYPE.DEVICE ? '-scholarship' : ''}-background@2x.png 2x`}
                alt=""
              />
            </div>
            <motion.div
              layout
              className="h-full max-w-[480px] mx-auto py-6 px-4 overflow-y-auto hide-scrollbar flex flex-col justify-between"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="pb-4 xs:pb-6 2xs:pb-8">
                <div>
                  <img className="h-12 2xs:h-14 mx-auto" src="/assets/images/logo.svg" alt="" />
                </div>
                {/* Image */}
                <div className="relative">
                  {(type === ONBOARDING_TYPE.DEVICE ||
                    type === ONBOARDING_TYPE.LOADING ||
                    type === ONBOARDING_TYPE.SCHOLARSHIP) ? (
                    <>
                      <div className="absolute top-[5%] left-[50%] translate-x-[-50%] rounded-[50%] size-[140px] blur-[75px] bg-green-500 z-[-1]"></div>
                    </>
                  ) : (
                    <div className="absolute top-0 left-[50%] translate-x-[-50%] rounded-[50%] xs:size-[200px] size-[180px] 2xs:size-[220px] blur-[50px] bg-green-800 z-[-1]"></div>
                  )}

                  <img
                    className={`mx-auto ${type === ONBOARDING_TYPE.START ? 'max-h-[275px] xs:max-h-[300px] 2xs:max-h-[325px] mt-5 xs:mt-6 2xs:mt-7 mb-6 xs:mb-7 2xs:mb-8' : type === ONBOARDING_TYPE.LOADING ? 'mt-8 xs:mt-10 2xs:mt-12 mb-4 max-h-[200px] xs:max-h-[250px] 2xs:max-h-[300px]' : 'max-h-[220px] xs:max-h-[300px] 2xs:max-h-[380px] mt-8 xs:mt-10 2xs:mt-12 mb-4'}`}
                    src={`/assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : type === ONBOARDING_TYPE.LOADING ? 'onboarding/onboarding-info' : 'onboarding/onboarding-ios'}.png`}
                    srcSet={`/assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : type === ONBOARDING_TYPE.LOADING ? 'onboarding/onboarding-info' : 'onboarding/onboarding-ios'}.png 1x, /assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : 'onboarding/onboarding-info'}@2x.png 2x`}
                    alt="Device"
                  />
                </div>
                {/* Content */}
                {type !== ONBOARDING_TYPE.DEVICE && type !== ONBOARDING_TYPE.SCHOLARSHIP ? (
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6 max-w-[320px] mx-auto">
                      <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                      <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">
                        {type === ONBOARDING_TYPE.START
                          ? 'contribute and earn rewards'
                          : type === ONBOARDING_TYPE.LOADING
                            ? 'getting info...'
                            : type === ONBOARDING_TYPE.DEVICE
                              ? 'Device Info'
                              : 'newbie reward'}
                      </div>
                      <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                    </div>
                    <div className="xs:text-[15px] 2xs:text-base text-body font-geist leading-[20px]">
                      {type === ONBOARDING_TYPE.START ? (
                        'Become a node contributor to build a decentralized world.'
                      ) : type === ONBOARDING_TYPE.LOADING ? (
                        <>
                          <p>We’re getting your device information.</p>
                          <p>Please wait...</p>
                        </>
                      ) : type === ONBOARDING_TYPE.DEVICE ? (
                        'This is your device information. Use it to contribute and upgrade for more rewards'
                      ) : (
                        <>
                          <p>You’ve received your first reward!</p>
                          <p>Let’s go!!!</p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="btn default cursor-default">
                      <div className="btn-border"></div>
                      <div className="btn-default font-normal font-geist normal-case">
                        {deviceName}
                      </div>
                      <div className="btn-border"></div>
                    </div>
                  </div>
                )}
                {/* Configuration */}
                {/* {type === ONBOARDING_TYPE.DEVICE && <Card shadow={true} />} */}
              </div>
              {(type === ONBOARDING_TYPE.START || type === ONBOARDING_TYPE.SCHOLARSHIP) && (
                <motion.div
                  className="p-4 xs:p-6 2xs:p-8 w-full space-y-4 xs:space-y-5 2xs:space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {type === ONBOARDING_TYPE.SCHOLARSHIP && (
                    <div className="text-center text-body leading-[18px] tracking-[-1px]">
                      {`Everything is ready, let's get started!`}
                    </div>
                  )}
                  <button className="btn" onClick={() => handleOnboarding(type)}>
                    <div className="btn-border"></div>
                    <div className="btn-primary">
                      {type === ONBOARDING_TYPE.START ? 'Next' : 'Get Started'}
                    </div>
                    <div className="btn-border"></div>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
          <ModalReward
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            onCloseModal={handleCloseModal}
            title="newbie rewarRD"
            point={formatNumber(pointReward, 0, 0)}
            text={
              <>
                <p>You’ve received your first reward!</p>
                <p>Claim it now!</p>
              </>
            }
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default Onboarding
