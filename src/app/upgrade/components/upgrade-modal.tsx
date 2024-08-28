import CustomModal from '@/app/components/custom-modal'
import { formatNumber } from '@/helper/common'
import { IDeviceItemAddParam, IDeviceTypeItem } from '@/interfaces/i.devices'
import { useState } from 'react'
interface IUpgradeModal {
  activeType: string
  UPGRADE_TYPE: any
  item: IDeviceTypeItem
  handleAction: (data: IDeviceItemAddParam) => void
}
export default function UpgradeModal({
  activeType,
  UPGRADE_TYPE,
  item,
  handleAction
}: IUpgradeModal) {
  const [amount, updateAmount] = useState<number>(1)
  const handleUpdateAmount = (value: number) => {
    if (value < 0 && amount + value < 1) {
      return
    }
    updateAmount(amount + value)
  }

  const handleClick = () => {
    if (activeType === UPGRADE_TYPE.DEVICE) {
      handleAction({
        code: item.code,
        number: amount,
        index: 1
      })
    }
  }

  const totalAmount = amount * item.price
  return (
    <div>
      <div className=" text-body text-base tracking-[-1px] text-center">
        {activeType === UPGRADE_TYPE.DEVICE ? (
          <p>Are you sure you want to buy more RAM?</p>
        ) : (
          <p>
            Are you sure you want to level up <span className="text-gradient">“Programing”</span>?
          </p>
        )}
      </div>
      <div className="my-8 mx-auto w-fit flex items-center space-x-4">
        <img
          className="size-[130px] [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0_30px)]"
          src="/assets/images/upgrade/upgrade-ram-2gb.png"
          srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x, /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x"
          alt=""
        />
        <div className="space-y-2">
          <p className="font-mona text-white text-2xl font-semibold">{item.name}</p>
          {activeType === UPGRADE_TYPE.DEVICE ? (
            <p className="font-geist font-semibold text-green-600">
              {/* 8 <span className="text-xs font-normal text-white-50">Available</span> */}
            </p>
          ) : (
            <p className="font-geist font-semibold text-yellow-600">LV. 12</p>
          )}
        </div>
      </div>
      <div className="relative w-fit mx-auto">
        <img className="mx-auto" src="/assets/images/action-frame.svg" alt="Frame" />
        <div className="absolute top-0 left-0 right-0 w-full h-full px-10 py-5 flex items-center justify-between">
          <div className="space-y-3 font-geist">
            <p className="tracking-[-1px] text-title uppercase">
              {activeType === UPGRADE_TYPE.DEVICE ? 'TOTAL PROFIT:' : 'EFFECT:'}
            </p>
            <div className="flex items-center space-x-2">
              <img
                className="size-7"
                src="/assets/images/point.png"
                srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                alt="Point"
              />
              <div className="text-lg font-semibold text-primary">
                {formatNumber(item.miningPower, 0, 0)}/h
              </div>
            </div>
          </div>
          <div className="space-y-3 font-geist">
            <p className="tracking-[-1px] text-title uppercase">
              {activeType === UPGRADE_TYPE.DEVICE ? 'Amount:' : 'GROWTH:'}
            </p>
            {activeType === UPGRADE_TYPE.DEVICE ? (
              <div className="flex items-center space-x-6">
                <img
                  className="size-6 cursor-pointer"
                  src="/assets/images/icons/icon-minus-circle-green.svg"
                  alt="Icon Minus"
                  onClick={() => handleUpdateAmount(-1)}
                />
                <p className="text-lg font-semibold text-green-100">{amount}</p>
                <img
                  className="size-6 cursor-pointer"
                  src="/assets/images/icons/icon-plus-circle-green.svg"
                  alt="Icon Plus"
                  onClick={() => handleUpdateAmount(1)}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <p className="text-lg font-semibold text-green-700">
                  LV. <span className="text-green-300 -ml-2">11</span>
                </p>
                <img
                  className="size-6"
                  src="/assets/images/icons/icon-double-arrow-right-gradient.svg"
                  alt="Icon Double Arrow"
                />
                <p className="text-lg font-semibold text-green-700">
                  LV. <span className="text-green-300 -ml-2">12</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="btn mt-6">
        <div className="btn-border"></div>
        <div className="btn-primary">
          <div className="flex items-center justify-center space-x-4" onClick={handleClick}>
            <span>{activeType === UPGRADE_TYPE.DEVICE ? 'Buy Now' : 'Level Up'}</span>
            <div className="w-[30px] h-[1px] bg-green-800"></div>
            <div className="flex items-center space-x-1">
              <img
                className="size-5"
                src={`/assets/images/icons/icon-${activeType === UPGRADE_TYPE.DEVICE ? 'point' : 'thunder'}-dark.svg`}
                alt="Point"
              />
              <p className="font-geist text-base font-semibold text-green-900">
                {formatNumber(totalAmount, 0, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="btn-border"></div>
      </div>
    </div>
  )
}
