import { useAppDispatch, useAppSelector } from '@/app/hooks/useToolkit'
import { getUserInfo, mining } from '@/app/services/user'
import { setUserInfo } from '@/app/stores/slices/common'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { formatNumber } from '@/app/helper/common'

const HOME_TYPE = {
  START: 'start',
  MINING: 'mining',
  CLAIM: 'claim'
}
export default function Mining() {
  const [type, setType] = useState(HOME_TYPE.START)
  const { userInfo } = useAppSelector((state) => state.common)
  const [timeCountdown, setTimeCountdown] = useState<Array<any>>([])
  const [miningCount, setMiningCount] = useState<number>(0)
  const refInterval = useRef<any>()
  const dispatch = useAppDispatch()

  const addPrefix = (number: number) => {
    if (number >= 10) {
      return number
    }
    return `0${number}`
  }
  const interval = (timeEnd: number, currentPoint: number, miningPowerPerSecond: number) => {
    let miningCount = currentPoint
    refInterval.current = setInterval(function () {
      // Get today's date and time
      miningCount += miningPowerPerSecond
      setMiningCount(miningCount)

      var now = new Date().getTime()

      // Find the distance between now and the count down date
      var distance = timeEnd - now

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result in the element with id="demo"
      const listTime = [addPrefix(hours), addPrefix(minutes), addPrefix(seconds)]
      if (days > 0) {
        listTime.unshift(addPrefix(days))
      }
      setTimeCountdown(listTime)

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(refInterval.current)
        setTimeCountdown([])
        setType(HOME_TYPE.CLAIM)
      }
    }, 1000)
  }

  const calculatorMining = () => {
    clearInterval(refInterval.current)
    const miningPowerPerSecond = userInfo.miningPower / 3600
    const remainingTimeByHour = userInfo.maximumPower / userInfo.miningPower
    const timeEnd = dayjs(userInfo.timeStartMining * 1000).add(remainingTimeByHour, 'hours')
    const timeMining = dayjs().diff(dayjs(userInfo.timeStartMining * 1000), 'seconds', true)
    const currentPoint = timeMining * miningPowerPerSecond
    setMiningCount(currentPoint)
    interval(timeEnd.valueOf(), currentPoint, miningPowerPerSecond)
  }

  const updateUserInfo = async () => {
    const res = await getUserInfo()
    if (res.status) {
      dispatch(setUserInfo({ info: res.data }))
    }
  }

  const handleMining = async () => {
    const res = await mining()
    if (res.status) {
      setType(HOME_TYPE.MINING)
      updateUserInfo()
    }
  }

  const handleClick = (type: any) => {
    switch (type) {
      case HOME_TYPE.START:
        handleMining()
        break
      case HOME_TYPE.CLAIM:
        console.log(111)
        break
    }
  }

  useEffect(() => {
    if (userInfo.timeStartMining) {
      setType(HOME_TYPE.MINING)
      calculatorMining()
    } else {
      setType(HOME_TYPE.START)
    }
  }, [userInfo])

  return (
    <div className="mt-8">
      <button className="btn" onClick={() => handleClick(type)}>
        <div className="btn-border"></div>
        {type === HOME_TYPE.MINING ? (
          <div className="btn-default flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white uppercase text-base font-bold">
              <div>Mining</div>
              <div className="flex items-center space-x-1">
                <img className="size-6" src="/assets/images/point-color.svg" alt="Point" />
                <p className="font-geist text-primary text-[18px] font-semibold">
                  {miningCount ? formatNumber(miningCount, 0, 2) : 0}
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
