/* eslint-disable @next/next/no-img-element */
'use client'

import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { AnimatePresence, motion } from 'framer-motion'
import Loading from '../components/loading'
import { claim, detectDeviceInfo } from '../../services/user'
import { CURRENT_STATUS } from '../../interfaces/i.user'
import NewbieReward from './components/NewbieReward'
import useCommonStore from '@/stores/commonStore'

const ONBOARDING_TYPE = {
  SPLASH: 'splash',
  START: 'start',
  LOADING: 'loading',
  DEVICE: 'device',
  SCHOLARSHIP: 'scholarship'
}

const Onboarding = () => {
  const router = useRouter()
  const setDevice = useCommonStore((state) => state.setDevice)
  const { currentStatus, token } = useCommonStore()
  const [type, setType] = useState(ONBOARDING_TYPE.SPLASH)
  const _getDeviceInfo = async () => {
    try {
      const res = await detectDeviceInfo()
      if (res.status) {
        setDevice({ info: res.data })
        setType(ONBOARDING_TYPE.DEVICE)
      }
    } catch (ex) {
      setType(ONBOARDING_TYPE.SCHOLARSHIP)
    }
  }

  const handleClaim = async () => {
    const res = await claim()
    if (res.status) {
      redirect('/home')
    }
  }

  const handleOnboarding = (type: any) => {
    switch (type) {
      case ONBOARDING_TYPE.START:
        _getDeviceInfo()
        setType(ONBOARDING_TYPE.LOADING)
        break
      case ONBOARDING_TYPE.DEVICE:
        setType(ONBOARDING_TYPE.SCHOLARSHIP)
        break
      case ONBOARDING_TYPE.SCHOLARSHIP:
        handleClaim()
        break
    }
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
        break
      case CURRENT_STATUS.MINING:
      case CURRENT_STATUS.CLAIMED:
        redirect('/home')
    }
  }, [currentStatus, token])

  return (
    <AnimatePresence mode="wait">
      {type === ONBOARDING_TYPE.SPLASH ? (
        <Loading />
      ) : (
        <div className="onboarding section">
          <div className="absolute top-0 left-0 right-0 w-full h-full z-[-1]">
            <img
              className="mx-auto object-cover min-[460px]:h-full w-full"
              src={`/assets/images/onboarding/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP ? '-scholarship' : ''}-background.png`}
              srcSet={`/assets/images/onboarding/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP ? '-scholarship' : ''}-background.png 1x, /assets/images/onboarding/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP ? '-scholarship' : ''}-background@2x.png 2x`}
              alt=""
            />
          </div>
          <div className="overflow-y-auto flex flex-col hide-scrollbar h-full">
            <div className="container-custom !py-6">
              <motion.div
                layout
                className="h-full"
                // initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="pb-10 xs:pb-20 max-w-[480px] mx-auto">
                  <div>
                    <img className="h-14 mx-auto" src="/assets/images/logo.svg" alt="" />
                  </div>
                  {/* Image */}
                  {type !== ONBOARDING_TYPE.SCHOLARSHIP ? (
                    <div className="relative">
                      {(type === ONBOARDING_TYPE.DEVICE || type === ONBOARDING_TYPE.LOADING) && (
                        <>
                          <div className="absolute top-[5%] left-[50%] translate-x-[-50%] rounded-[50%] size-[140px] blur-[75px] bg-green-500 z-[-1]"></div>
                          <div className={`${type === ONBOARDING_TYPE.DEVICE ? 'top-[60px] xs:top-[50px] 2xs:top-[80px]' : 'top-[20px] xs:top-[30px] 2xs:top-[15px]'} absolute left-[50%] translate-x-[-50%]`}>
                            <img className={`${type === ONBOARDING_TYPE.DEVICE ? 'max-h-[250px]' : 'max-h-[200px]'} mx-auto`} src="/assets/images/onboarding/glow-light.svg" alt="" />
                          </div>
                          <div className="absolute top-[0] left-[50%] translate-x-[-50%]">
                            <img className="[--size:_200px] min-[360px]:[--size:_220px] 2xs:[--size:_260px] size-[var(--size)] min-w-[var(--size)] mx-auto" src="/assets/images/onboarding/mockup.png" alt="" />
                          </div>
                        </>
                      )}
                      <img
                        className={`mx-auto ${type === ONBOARDING_TYPE.START ? 'max-h-[300px] xs:max-h-[325px] my-8' : type === ONBOARDING_TYPE.LOADING ? 'mt-12 mb-4 max-h-[250px] xs:max-h-[300px]' : 'max-h-[320px] 2xs:max-h-[380px] mt-8 xs:mt-10 2xs:mt-12 mb-4'}`}
                        src={`/assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : 'onboarding/onboarding-info'}.png`}
                        srcSet={`/assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : 'onboarding/onboarding-info'}.png 1x, /assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : 'onboarding/onboarding-info'}@2x.png 2x`}
                        alt="Computer"
                      />
                    </div>
                  ) : (
                    <NewbieReward />
                  )}
                  {/* Content */}
                  {type !== ONBOARDING_TYPE.DEVICE ? (
                    <div className="text-center mb-6 space-y-3">
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
                        <div className="btn-default font-normal font-geist normal-case">iPhone 15 Pro Max</div>
                        <div className="btn-border"></div>
                      </div>
                    </div>
                  )}
                  {/* Configuration */}
                  {/* {type === ONBOARDING_TYPE.DEVICE && <Card shadow={true} />} */}
                </div>
                {(type === ONBOARDING_TYPE.START ||
                  type === ONBOARDING_TYPE.DEVICE ||
                  type === ONBOARDING_TYPE.SCHOLARSHIP) && (
                  <div className="xs:absolute bottom-0 left-0 right-0 3xs:p-4 xs:p-3 max-w-[480px] mx-auto">
                    <button
                      className="btn"
                      onClick={() => {
                        handleOnboarding(type),
                          type === ONBOARDING_TYPE.SCHOLARSHIP && router.push('/home')
                      }}
                    >
                      <div className="btn-border"></div>
                      <div className="btn-primary">
                        {type === ONBOARDING_TYPE.START
                          ? 'Next'
                          : type === ONBOARDING_TYPE.DEVICE
                            ? 'GET STARTED'
                            : 'claim reward'}
                      </div>
                      <div className="btn-border"></div>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Onboarding
