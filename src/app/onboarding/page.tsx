"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Card from '../components/card'

const ONBOARDING_TYPE = {
  SPLASH: 'splash',
  START: 'start',
  LOADING: 'loading',
  DEVICE: 'device',
  SCHOLARSHIP: 'scholarship',
}

const Onboarding = () => {
  const router = useRouter()
  const [type, setType] = useState(ONBOARDING_TYPE.SPLASH)

  const handleOnboarding = (type: any) => {
    switch(type) {
      case ONBOARDING_TYPE.START:
        setType(ONBOARDING_TYPE.LOADING)
        break
      case ONBOARDING_TYPE.DEVICE:
        setType(ONBOARDING_TYPE.SCHOLARSHIP)
        break
    }
  }

  useEffect(() => {
    if(type === ONBOARDING_TYPE.SPLASH) {
      setTimeout(() => setType(ONBOARDING_TYPE.START), 300)
    }
    if(type === ONBOARDING_TYPE.LOADING) {
      setTimeout(() => setType(ONBOARDING_TYPE.DEVICE), 1000)
    }
  }, [type])

  return (
    <div className="onboarding section">
      <div className="container-custom">
        <div className="relative flex items-center justify-center h-full">
          {type === ONBOARDING_TYPE.SPLASH ? (
            <div>
              <img src="/assets/images/logo.svg" alt="Logo" />
            </div>
          ) : (
            <>
              <div>
                {type !== ONBOARDING_TYPE.SCHOLARSHIP ? (
                  <div className={`mx-auto ${type === ONBOARDING_TYPE.DEVICE ? '' : 'max-w-[285px]'}`}>
                    <img className="mx-auto" src="/assets/images/computer.png" srcSet="/assets/images/computer.png 1x, /assets/images/computer@2x.png 2x" alt="Computer" />
                  </div>
                ) : (
                  <div className="relative">
                    <img className="mx-auto" src="/assets/images/frame.svg" alt="Frame" />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center flex-col space-y-4">
                      <img className="size-[56px] mx-auto" src="/assets/images/icons/icon-star-circle.svg" alt="Icon Star" />
                      <div className="font-geist font-bold text-white text-3xl">5,000</div>
                    </div>
                  </div>
                )}
                <div className="text-center mt-10 mb-6 space-y-1 max-w-[285px] mx-auto">
                  <div className="font-airnt font-bold text-xl text-white leading-[calc(32/20)] tracking-[1px] uppercase">
                    {type === ONBOARDING_TYPE.START ? 'contribute and earn rewards'
                      : type === ONBOARDING_TYPE.LOADING ? (<><span>BIP...</span><span className="animate-[textAnimate_1.25s_ease-in_0.5s_infinite]">BIP</span><span className="animate-[textAnimate_1.25s_ease-in_0.75s_infinite]">...</span></>)
                      : type === ONBOARDING_TYPE.DEVICE ? 'Device Info'
                      : 'newbie reward'
                    }
                  </div>
                  <div className="font-mona text-base text-gray-400">
                    {type === ONBOARDING_TYPE.START ? 'Become a node contributor to build a decentralized world.'
                      : type === ONBOARDING_TYPE.LOADING ? (<><p>We’re getting your device information.</p><p>Please wait...</p></>)
                      : type === ONBOARDING_TYPE.DEVICE ? (<><p>This is your device information.</p><p>Use it to contribute and upgrade for more rewards</p></>)
                      : (<><p>You’ve received your first reward.</p><p>Please use it wisely or you’ll get trouble</p></>)
                    }
                  </div>
                </div>
                {type === ONBOARDING_TYPE.DEVICE && (
                  <Card/>
                )}
              </div>
              {(type === ONBOARDING_TYPE.START || type === ONBOARDING_TYPE.DEVICE || type === ONBOARDING_TYPE.SCHOLARSHIP) && (
                <div className="absolute bottom-0 left-0 right-0">
                  <button className="btn btn-primary" onClick={() => {handleOnboarding(type), type === ONBOARDING_TYPE.SCHOLARSHIP && router.push('/home')}}>
                    <span>{type === ONBOARDING_TYPE.START ? 'get started' : type === ONBOARDING_TYPE.DEVICE ? 'got it' : 'claim reward'}</span>
                    <span>{type === ONBOARDING_TYPE.START ? 'get started' : type === ONBOARDING_TYPE.DEVICE ? 'got it' : 'claim reward'}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding