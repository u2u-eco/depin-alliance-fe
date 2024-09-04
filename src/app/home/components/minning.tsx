import { claim, getUserInfo, startContributing } from '@/services/user'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { formatNumber } from '@/helper/common'
import useCommonStore from '@/stores/commonStore'
import ModalReward from '@/app/components/ui/modal-reward'
import { useDisclosure } from '@nextui-org/react'

const HOME_TYPE = {
  START: 'start',
  MINING: 'mining',
  CLAIM: 'claim'
}
export default function Mining() {
  const [type, setType] = useState(HOME_TYPE.START)
  const [bonusReward, setBonusReward] = useState<number>(0)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { userInfo, setUserInfo } = useCommonStore()
  const [timeCountdown, setTimeCountdown] = useState<Array<any>>([])
  const [miningCount, setMiningCount] = useState<number>(0)
  const refButton = useRef<any>(null)
  const workerRef = useRef<Worker>()

  const calculatorMining = () => {
    if (userInfo) {
      // clearInterval(refInterval.current)
      workerRef.current?.postMessage(JSON.stringify({ type: 'CLEAR' }))
      const miningPowerPerSecond = userInfo.miningPower / 3600
      const remainingTimeBySecond = userInfo.pointUnClaimed
        ? (userInfo.maximumPower - userInfo.pointUnClaimed) / miningPowerPerSecond
        : userInfo.maximumPower / miningPowerPerSecond
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
          miningPowerPerSecond,
          max: userInfo.maximumPower
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
    const res = await startContributing()
    if (res.status) {
      setType(HOME_TYPE.MINING)
      updateUserInfo()
    }
  }

  const handleClaim = async () => {
    const res = await claim()
    if (res.status) {
      if (res.data.bonusReward > 0) {
        setBonusReward(res.data.bonusReward)
        onOpen()
      }
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
      if (!refButton.current?.contains(event.target) && type !== HOME_TYPE.START) {
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
          <div className="btn-primary flex items-center justify-between !py-2.5 !px-3">
            <div className="flex items-center space-x-2 xs:space-x-3 uppercase text-green-900 text-[15px] xs:text-base font-bold">
              <div>Mining</div>
              <div className="flex items-center space-x-1">
                <img className="size-5 xs:size-6" src="/assets/images/point-dark.svg" alt="Point" />
                <p className="font-geist text-green-900 min-[355px]:text-base xs:text-[18px] font-semibold">
                  {miningCount ? formatNumber(miningCount, 0, 0) : 0}
                </p>
              </div>
            </div>
            <div className="min-h-6 xs:min-h-[28px]">
              {timeCountdown.length === 0 ? null : (
                <div className="flex items-center text-[15px] xs:text-base font-geist font-semibold text-green-900">
                  {timeCountdown.map((item: any, index) => (
                    <React.Fragment key={index}>
                      <p className="size-6 xs:size-[28px] flex items-center justify-center bg-black/15">
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
      <ModalReward
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onCloseModal={onClose}
        title="BONUS rewarRD"
        point={formatNumber(bonusReward, 0, 0)}
        text={
          <>
            <p>You’ve received your first reward!</p>
            <p>Claim it now!</p>
          </>
        }
      />
    </div>
  )
}
