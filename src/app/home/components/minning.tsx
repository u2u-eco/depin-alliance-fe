import { claim, getUserInfo, mining } from '@/services/user'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { formatNumber } from '@/helper/common'
import useCommonStore from '@/stores/commonStore'

const HOME_TYPE = {
  START: 'start',
  MINING: 'mining',
  CLAIM: 'claim'
}
export default function Mining() {
  const [type, setType] = useState(HOME_TYPE.START)
  const { userInfo, setUserInfo } = useCommonStore()
  const [timeCountdown, setTimeCountdown] = useState<Array<any>>([])
  const [miningCount, setMiningCount] = useState<number>(0)
  const refInterval = useRef<any>()
  const refButton = useRef<any>(null)
  const workerRef = useRef<Worker>()

  const calculatorMining = () => {
    if (userInfo) {
      // clearInterval(refInterval.current)
      workerRef.current?.postMessage(JSON.stringify({ type: 'CLEAR' }))
      const miningPowerPerSecond = userInfo.miningPower / 3600
      const remainingTimeBySecond = userInfo.pointUnClaimed
        ? userInfo.maximumPower - userInfo.pointUnClaimed
        : userInfo.maximumPower
      const timeEnd = dayjs(userInfo.timeStartMining * 1000)
        .add(remainingTimeBySecond, 'second')
        .valueOf()

      const timeMining = dayjs().diff(dayjs(userInfo.timeStartMining * 1000), 'seconds', true)
      const currentPoint = userInfo.pointUnClaimed + timeMining * miningPowerPerSecond
      setMiningCount(currentPoint)
      workerRef.current?.postMessage(
        JSON.stringify({
          type: 'COUNTDOWN',
          timeEnd,
          currentPoint,
          miningPowerPerSecond
        })
      )
    }
  }

  const updateUserInfo = async () => {
    const res = await getUserInfo()
    if (res.status) {
      setUserInfo({ info: res.data })
    }
  }

  const handleMining = async () => {
    const res = await mining()
    if (res.status) {
      setType(HOME_TYPE.MINING)
      updateUserInfo()
    }
  }

  const handleClaim = async () => {
    const res = await claim()
    if (res.status) {
      updateUserInfo()
    }
  }

  const handleClick = (type: any) => {
    switch (type) {
      case HOME_TYPE.START:
        handleMining()
        break
      case HOME_TYPE.MINING:
        setType(HOME_TYPE.CLAIM)
        break
      case HOME_TYPE.CLAIM:
        handleClaim()
        break
    }
  }

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!refButton.current?.contains(event.target)) {
        setType(HOME_TYPE.MINING)
      }
    }

    window.addEventListener('mousedown', handleOutSideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick)
    }
  }, [refButton])

  useEffect(() => {
    workerRef.current = new Worker(new URL('@/worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<any>) => {
      const message = JSON.parse(event.data)
      const type = message.type
      switch (type) {
        case 'MINING_VALUE':
          setMiningCount(message.value)
          break
        case 'TIME':
          setTimeCountdown(message.value)
          break
        case 'RESET':
          setTimeCountdown([])
          setType(HOME_TYPE.CLAIM)
          break
      }
    }
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  useEffect(() => {
    if (userInfo?.timeStartMining) {
      setType(HOME_TYPE.MINING)
      calculatorMining()
    } else {
      setType(HOME_TYPE.START)
    }
  }, [userInfo])

  return (
    <div className="mt-8 ">
      <button className="btn" onClick={() => handleClick(type)} ref={refButton}>
        <div className="btn-border"></div>
        {type === HOME_TYPE.MINING ? (
          <div className="btn-default flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white uppercase text-base font-bold">
              <div>Mining</div>
              <div className="flex items-center space-x-1">
                <img className="size-6" src="/assets/images/point-color.svg" alt="Point" />
                <p className="font-geist text-primary text-[18px] font-semibold">
                  {miningCount ? formatNumber(miningCount, 0, 0) : 0}
                </p>
              </div>
            </div>
            <div className="min-h-[28px]">
              {timeCountdown.length === 0 ? null : (
                <div className="flex items-center text-base font-geist font-semibold text-title">
                  {timeCountdown.map((item: any, index) => (
                    <React.Fragment key={index}>
                      <p className="size-[28px] flex items-center justify-center bg-white/10">
                        {item}
                      </p>
                      {index === timeCountdown.length - 1 ? null : <span>:</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="btn-primary">
            {type === HOME_TYPE.START ? 'START CONTRIBUTING' : 'CLAIM NOW'}
          </div>
        )}
        <div className="btn-border"></div>
      </button>
    </div>
  )
}
