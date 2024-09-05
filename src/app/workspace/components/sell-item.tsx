import { motion } from 'framer-motion'
import { IconMinusCircle, IconPlusCircle, IconPoint } from '@/app/components/icons'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { formatNumber } from '@/helper/common'
import { useState } from 'react'
interface ISellItem {
  item: IDeviceTypeItem
  updateAmountSell: (amount: number) => void
}
export default function SellItem({ item, updateAmountSell }: ISellItem) {
  const [amount, setAmount] = useState<number>(1)
  const handleUpdateAmount = (index: number) => {
    const newValue = amount + index
    if (index > 0) {
      if (newValue <= item.totalItem) {
        setAmount(newValue)
        updateAmountSell(newValue)
      }
    } else {
      if (newValue >= 1) {
        setAmount(newValue)
        updateAmountSell(newValue)
      }
    }
  }
  return (
    <motion.div
      className="relative w-fit mx-auto mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <img src="/assets/images/workspace/workspace-modal-frame.svg" alt="" />
      <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center space-x-20">
        <div className="space-y-3">
          <div className="font-mona text-title uppercase tracking-[-1px]">PROFIT:</div>
          <div className="flex items-center space-x-2">
            <IconPoint className="size-7" />
            <span className="text-green-500 text-lg font-semibold">
              {item.miningPower ? `${formatNumber(item.miningPower * amount, 0, 0)}/h` : ''}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="font-mona text-title uppercase tracking-[-1px]">AMOUNT:</div>
          <div className="flex items-center space-x-6">
            <div className="cursor-pointer" onClick={() => handleUpdateAmount(-1)}>
              <IconMinusCircle className="text-green-500 size-6" />
            </div>
            <span className="text-green-100 text-lg font-semibold">{amount}</span>
            <div className="cursor-pointer" onClick={() => handleUpdateAmount(1)}>
              <IconPlusCircle className="text-green-500 size-6" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center space-x-4">
        <div className="btn error z-[2]">
          <div className="btn-border"></div>
          <div className="btn-error">
            <div className="flex items-center justify-center space-x-4 text-title">
              <p>SELL</p>
              <div className="w-[30px] h-[1px] bg-title"></div>
              <div className="flex items-center space-x-1">
                <IconPoint className="size-5" color />
                <span className="font-geist">5,000</span>
              </div>
            </div>
          </div>
          <div className="btn-border"></div>
        </div>
      </div> */}
    </motion.div>
  )
}
