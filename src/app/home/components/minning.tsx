import { useAppSelector } from '@/app/hooks/useToolkit'
import { mining } from '@/app/services/user'
import { useEffect, useState } from 'react'

const HOME_TYPE = {
  START: 'start',
  MINING: 'mining',
  CLAIM: 'claim'
}
export default function Mining() {
  const [type, setType] = useState(HOME_TYPE.START)
  const { userInfo } = useAppSelector((state) => state.common)

  const handleMining = async () => {
    const res = await mining()
    if (res.status) {
      setType(HOME_TYPE.MINING)
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
                <p className="font-geist text-primary text-[18px] font-semibold">2,142</p>
              </div>
            </div>
            <div className="flex items-center text-base font-geist font-semibold text-title">
              <p className="size-[28px] flex items-center justify-center bg-white/10">03</p>
              <span>:</span>
              <p className="size-[28px] flex items-center justify-center bg-white/10">12</p>
              <span>:</span>
              <p className="size-[28px] flex items-center justify-center bg-white/10">14</p>
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
