import CustomModal from '@/app/components/custom-modal'
import {
  IconFilter,
  IconMinusCircle,
  IconPlusCircle,
  IconPoint,
  IconSort
} from '@/app/components/icons'
import { useDisclosure } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import Image from 'next/image'
import { formatNumber } from '@/helper/common'
import SellItem from './sell-item'
import { buyDeviceItem, sellItem } from '@/services/devices'
import { toast } from 'sonner'

const ITEM_TYPE = {
  FILTER: 'filter',
  SORT: 'sort',
  INFO: 'info',
  SELL: 'sell'
}

interface IItem {
  listItemEquipByType: any
  listDeviceItem: Array<IDeviceTypeItem>
  refetch: () => void
}
export default function Item({ refetch, listDeviceItem }: IItem) {
  const [activeItem, setActiveItem] = useState()
  const [activeType, setActiveType] = useState(ITEM_TYPE.INFO)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const currentItem = useRef<any>()
  const countInfoDevice = useRef<any>({})
  const amountSell = useRef<number>(1)
  const [listDeviceItemByFilter, setListDeviceItemByFilter] = useState<IDeviceTypeItem[]>([])

  const filterDevice = () => {
    console.log(listDeviceItem)
    countInfoDevice.current = {}
    const listDeviceItemByFilter = listDeviceItem?.filter((device) => {
      if (!countInfoDevice.current[device.code]) {
        countInfoDevice.current[device.code] = {
          amount: 1,
          totalProfit: device.miningPower
        }
        return true
      } else {
        countInfoDevice.current[device.code].amount += 1
        countInfoDevice.current[device.code].totalProfit += device.miningPower

        return false
      }
    })

    setListDeviceItemByFilter([...listDeviceItemByFilter])
  }

  const handleInfo = (item: IDeviceTypeItem) => {
    currentItem.current = item
    setActiveType(ITEM_TYPE.INFO)
    onOpen()
  }

  const updateAmountSell = (amount: number) => {
    amountSell.current = amount
  }

  const handleClick = (type: string) => {
    setActiveType(type)
    onOpen()
  }

  const handleSell = async () => {
    const res = await sellItem(currentItem.current.id)
    if (res.status) {
      toast.success('Sell item successfully!')
      refetch && refetch()
      onClose()
    }
  }

  const handleBuy = async () => {
    if (activeType === ITEM_TYPE.INFO) {
      const res = await buyDeviceItem({
        code: currentItem.current.code,
        number: 1
      })
      if (res.status) {
        toast.success('Buy item successfully!')
        refetch && refetch()
        onClose()
      }
    }
  }

  const handleOnClose = () => {
    amountSell.current = 1
    onClose()
  }

  useEffect(() => {
    if (listDeviceItem?.length > 0) {
      filterDevice()
    }
  }, [listDeviceItem])

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-title text-base tracking-[-1px]">ALL ITEMS</p>
          <div className="flex items-center space-x-6">
            <div className="cursor-pointer" onClick={() => handleClick(ITEM_TYPE.SORT)}>
              <IconSort
                className="size-[30px] text-green-800"
                gradient={activeType === ITEM_TYPE.SORT}
              />
            </div>
            <div className="cursor-pointer" onClick={() => handleClick(ITEM_TYPE.FILTER)}>
              <IconFilter
                className="size-[30px] text-green-800"
                gradient={activeType === ITEM_TYPE.FILTER}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-8">
          {listDeviceItemByFilter?.map((item: any) => (
            <div
              key={item.id}
              className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${activeItem === item.id ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
            >
              <div
                className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#143828] after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)] before:border-l-green-500 before:border-t-green-500' : ''}`}
                onClick={() => handleInfo(item)}
              >
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                  src={
                    item.image?.length > 0
                      ? item.image
                      : `/assets/images/upgrade/upgrade-ram-2gb.png`
                  }
                  alt=""
                />
                <p className="font-mona font-semibold text-white mt-3 mb-1 leading-[16px]">
                  {item.name}
                </p>
                <p className="text-green-500">x{countInfoDevice.current[item.code].amount || 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CustomModal
        title={
          activeType === ITEM_TYPE.INFO
            ? 'ITEM Info'
            : activeType === ITEM_TYPE.SELL
              ? 'SELL ITEM'
              : activeType === ITEM_TYPE.FILTER
                ? 'FILTER'
                : 'SORT BY'
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleOnClose}
        onOpenChange={onOpenChange}
      >
        <div className="relative w-full">
          <div className=" text-body text-base tracking-[-1px] text-center">
            {activeType === ITEM_TYPE.INFO ? (
              <p>You are equipping this item!</p>
            ) : activeType === ITEM_TYPE.SELL ? (
              <p>
                Are you sure you want to sell <span className="text-gradient">“RAM 16GB”</span>
              </p>
            ) : (
              <p>Select option to {ITEM_TYPE.FILTER ? 'filter' : 'sort'} item</p>
            )}
          </div>
          {activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SELL ? (
            <>
              <div
                className={`space-x-4 flex items-center justify-center ${activeType === ITEM_TYPE.INFO ? 'mt-10 mb-14' : 'my-8'}`}
              >
                <div
                  className={`p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${activeType === ITEM_TYPE.INFO ? 'size-[90px] min-w-[90px]' : 'size-[130px] min-w-[130px]'}`}
                >
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                    src={
                      currentItem.current?.image?.length > 0
                        ? currentItem.current.image
                        : `/assets/images/upgrade/upgrade-ram-2gb@2x.png`
                    }
                    // srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x. /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x"
                    alt=""
                  />
                </div>
                <div className={activeType === ITEM_TYPE.INFO ? 'space-y-4' : 'space-y-2'}>
                  <p className=" text-title font-semibold text-xl font-mona leading-[22px]">
                    {currentItem.current?.name}
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="space-y-1">
                      <p className="text-title text-base font-semibold leading-[20px]">
                        {currentItem.current?.code &&
                          countInfoDevice.current[currentItem.current?.code]?.amount}{' '}
                        <span className="text-xs font-normal text-white-50 -ml-0.5">Available</span>
                      </p>
                      {/* <p className="text-primary text-base font-semibold leading-[20px]">
                        0{' '}
                        <span className="text-xs font-normal text-white-50 -ml-0.5">Equipped</span>
                      </p> */}
                    </div>
                    {activeType === ITEM_TYPE.INFO && (
                      <>
                        <div className="w-[1px] h-9 bg-white/25"></div>
                        <div className="space-y-2">
                          <div className="text-xs text-white-50">TOTAL PROFIT:</div>
                          <div className="flex items-center space-x-1">
                            <IconPoint className="size-4" />
                            <span className="text-primary font-semibold leading-[16px]">
                              {currentItem.current?.code &&
                              countInfoDevice.current[currentItem.current?.code]?.totalProfit
                                ? `${formatNumber(countInfoDevice.current[currentItem.current?.code]?.totalProfit, 0, 0)}/h`
                                : null}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {activeType === ITEM_TYPE.SELL && (
                <SellItem
                  infoItem={currentItem.current}
                  totalAmount={countInfoDevice.current[currentItem.current.code].amount}
                  updateAmountSell={updateAmountSell}
                />
              )}
            </>
          ) : (
            <div
              className={`grid gap-4 my-8 ${activeType === ITEM_TYPE.FILTER ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
              <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                {activeType === ITEM_TYPE.FILTER ? 'CPU' : `High -> Low price`}
              </div>
              <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                {activeType === ITEM_TYPE.FILTER ? 'GPU' : `Low -> High price`}
              </div>
              <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                {activeType === ITEM_TYPE.FILTER ? 'RAM' : `High -> Low profit`}
              </div>
              <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                {activeType === ITEM_TYPE.FILTER ? 'SSD' : `Low -> High profit`}
              </div>
            </div>
          )}
          {activeType === ITEM_TYPE.SELL ? (
            <motion.div
              className="btn error z-[2]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={handleSell}
            >
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
            </motion.div>
          ) : (
            <div className="flex items-center space-x-4">
              <div
                className={`btn ${activeType === ITEM_TYPE.INFO ? 'error' : 'default'}`}
                onClick={() =>
                  activeType === ITEM_TYPE.INFO ? handleClick(ITEM_TYPE.SELL) : onClose()
                }
              >
                <div className="btn-border"></div>
                <div className={`btn btn-${activeType === ITEM_TYPE.INFO ? 'error' : 'default'}`}>
                  {activeType === ITEM_TYPE.INFO ? 'Sell' : 'Reset'}
                </div>
                <div className="btn-border"></div>
              </div>
              <div className="btn" onClick={handleBuy}>
                <div className="btn-border"></div>
                <div className="btn-primary">
                  {activeType === ITEM_TYPE.INFO ? 'Buy' : 'Confirm'}
                </div>
                <div className="btn-border"></div>
              </div>
            </div>
          )}
        </div>
      </CustomModal>
    </>
  )
}
