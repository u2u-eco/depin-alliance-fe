/* eslint-disable @next/next/no-img-element */
'use client'

import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { AnimatePresence, motion } from 'framer-motion'
import Loading from '../components/loading'
import { claim, detectDeviceInfo } from '../services/user'
import { CURRENT_STATUS } from '../interfaces/i.user'
import NewbieReward from './components/NewbieReward'
import useCommonStore from '../stores/commonStore'

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
              className="mx-auto min-[480px]:w-full min-[480px]:object-cover min-[480px]:h-full"
              src={`/assets/images/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP ? '-scholarship' : ''}-background.png`}
              srcSet={`/assets/images/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP ? '-scholarship' : ''}-background.png 1x, /assets/images/onboarding${type === ONBOARDING_TYPE.SCHOLARSHIP ? '-scholarship' : ''}-background@2x.png 2x`}
              alt=""
            />
          </div>
          <div className="container-custom !py-6">
            <motion.div
              layout
              className="h-full"
              // initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="pb-20">
                <div>
                  <img className="h-9 mx-auto" src="/assets/images/logo.svg" alt="" />
                </div>
                {/* Image */}
                {type !== ONBOARDING_TYPE.SCHOLARSHIP ? (
                  <div>
                    <img
                      className={`mx-auto ${type === ONBOARDING_TYPE.START ? 'max-h-[325px] my-8' : type === ONBOARDING_TYPE.LOADING ? 'mt-20 mb-4 max-h-[300px]' : 'max-h-[260px] mt-12 mb-4'}`}
                      src={`/assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : 'onboarding-info'}.png`}
                      srcSet={`/assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : 'onboarding-info'}.png 1x, /assets/images/${type === ONBOARDING_TYPE.START ? 'actor' : 'onboarding-info'}@2x.png 2x`}
                      alt="Computer"
                    />
                  </div>
                ) : (
                  <NewbieReward />
                )}
                {/* Content */}
                <div className="text-center mb-6 space-y-3">
                  <div className="flex items-center justify-center space-x-6 max-w-[320px] mx-auto">
                    <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                    <div className="font-airnt font-medium text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">
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
                  <div className="text-base text-body font-geist leading-[20px]">
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
                {/* Configuration */}
                {type === ONBOARDING_TYPE.DEVICE && <Card shadow={true} />}
              </div>
              {(type === ONBOARDING_TYPE.START ||
                type === ONBOARDING_TYPE.DEVICE ||
                type === ONBOARDING_TYPE.SCHOLARSHIP) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 max-[479px]:p-3">
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
                        ? 'get started'
                        : type === ONBOARDING_TYPE.DEVICE
                          ? 'Next'
                          : 'claim reward'}
                    </div>
                    <div className="btn-border"></div>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Onboarding
