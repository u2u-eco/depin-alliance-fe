import { claim, getUserInfo, mining, startContributing } from '@/services/user'
import React, { useEffect, useRef, useState } from 'react'
import { formatNumber } from '@/helper/common'
import useCommonStore from '@/stores/commonStore'
import ModalReward from '@/app/components/ui/modal-reward'
import { useDisclosure } from '@nextui-org/react'
import Loader from '@/app/components/ui/loader'
import { toast } from 'sonner'
import CustomToast from '@/app/components/ui/custom-toast'
import { useAppSound } from '@/hooks/useAppSound'

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

  const { buttonSound } = useAppSound()

  const [timeCountdown, setTimeCountdown] = useState<Array<any>>([])
  const [miningCount, setMiningCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
      // const timeEnd = dayjs(userInfo.timeStartMining * 1000)
      //   .add(remainingTimeBySecond, 'second')
      //   .valueOf()

      // const timeMining = dayjs().diff(dayjs(userInfo.timeStartMining * 1000), 'seconds', true)
      const timeEnd = Math.floor((userInfo.timeStartMining + remainingTimeBySecond) * 1000)

      const timeMining = userInfo.currentTime - userInfo.timeStartMining
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
    return res
  }

  const handleMining = async () => {
    setIsLoading(true)
    try {
      const res = await startContributing()
      if (res.status) {
        setType(HOME_TYPE.MINING)
        updateUserInfo()
      }
      setIsLoading(false)
    } catch (ex) {
      setIsLoading(false)
    }
  }

  const handleClaim = async () => {
    setIsLoading(true)
    try {
      const res = await claim()
      if (res.status) {
        toast.dismiss()
        toast.success(
          <CustomToast
            type="success"
            title="Claim successfully"
            point={res?.data?.point && Math.round(res?.data?.point) >= 1 ? res?.data?.point : false}
          />
        )
        if (res.data.bonusReward > 0) {
          setBonusReward(res.data.bonusReward)
          onOpen()
        }
        updateUserInfo()
      }
      setIsLoading(false)
    } catch (ex) {
      setIsLoading(false)
    }
  }

  const handleClick = (type: any) => {
    buttonSound.play()
    switch (type) {
      case HOME_TYPE.START:
        if (isLoading) return
        handleMining()
        break
      case HOME_TYPE.MINING:
        if (
          (userInfo?.miningPower && userInfo?.maximumPower > 0) ||
          (userInfo?.pointUnClaimed && userInfo?.pointUnClaimed > 0)
        ) {
          setType(HOME_TYPE.CLAIM)
        }
        break
      case HOME_TYPE.CLAIM:
        if (isLoading) return
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
  }, [refButton, type])

  const handleVisible = async () => {
    if (document.hidden) {
      //
    } else {
      if (userInfo?.status === 'MINING') {
        workerRef.current?.postMessage(JSON.stringify({ type: 'CLEAR' }))
        mining()
        updateUserInfo()
      }
    }
  }

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
          setTimeCountdown(['00', '00', '00'])
          if (userInfo?.miningPower && userInfo?.maximumPower > 0) {
            setType(HOME_TYPE.CLAIM)
          }
          break
      }
    }
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  useEffect(() => {
    if (userInfo?.status === 'MINING') {
      setType(HOME_TYPE.MINING)
      calculatorMining()
    } else {
      setType(HOME_TYPE.START)
    }
  }, [userInfo])

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisible)
    return () => {
      document.removeEventListener('visibilitychange', handleVisible)
    }
  }, [])

  return (
    <div className="mt-6 xs:mt-8">
      <button
        className={`btn ${isLoading ? 'default' : ''}`}
        onClick={() => handleClick(type)}
        ref={refButton}
      >
        <div className="btn-border"></div>
        {type === HOME_TYPE.MINING ||
        (userInfo?.status === 'MINING' &&
          userInfo?.miningPower === 0 &&
          userInfo?.pointUnClaimed === 0) ||
        !userInfo ? (
          <div className="btn-primary flex items-center justify-between !py-2.5 !px-3">
            <div className="flex items-center space-x-1.5 xs:space-x-2 uppercase text-green-900 text-sm xs:text-[15px] 2xs:text-base font-bold">
              <div className="max-[354px]:hidden">Mining</div>
              <div className="flex items-center space-x-1">
                <img className="size-4 xs:size-5" src="/assets/images/point-dark.svg" alt="Point" />
                <p className="font-geist text-green-900 text-sm xs:text-[15px] 2xs:text-base font-semibold">
                  {miningCount
                    ? `${formatNumber(miningCount, 0, 0)}/${formatNumber(userInfo?.maximumPower || 0, 0, 0)}`
                    : `0/${formatNumber(userInfo?.maximumPower || 0, 0, 0)}`}
                </p>
              </div>
            </div>
            {timeCountdown.length === 0 ? null : (
              <div className="min-h-6 xs:min-h-[28px] flex items-center text-sm xs:text-[15px] 2xs:text-base font-geist font-semibold text-green-900">
                {timeCountdown.map((item: any, index) => (
                  <React.Fragment key={index}>
                    <p className="px-[3px] flex items-center justify-center bg-black/15">{item}</p>
                    {index === timeCountdown.length - 1 ? null : <span>:</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`${isLoading ? 'btn-default' : 'btn-primary'}  flex justify-center items-center`}
          >
            {type === HOME_TYPE.START ? 'START CONTRIBUTING' : 'CLAIM NOW'}
            {isLoading && (
              <Loader
                classNames={{
                  icon: 'text-white size-full',
                  wrapper: 'bg-transparent !size-5 ml-1'
                }}
              />
            )}
          </div>
        )}
        <div className="btn-border"></div>
      </button>
      <ModalReward
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onCloseModal={onClose}
        title="BONUS rewarD"
        point={formatNumber(bonusReward, 0, 0)}
        text={
          <>
            <p>You’ve received your bonus reward!</p>
            <p>Claim it now!</p>
          </>
        }
      />
    </div>
  )
}
