'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import {
  IconFilter,
  IconMinusCircle,
  IconPlusCircle,
  IconPoint,
  IconSort
} from '../components/icons'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'
import CustomList from '../components/custom-list'
import Image from 'next/image'
import ShopItem from './components/shop-item'

const SHOP_TYPE = {
  DEVICE: 'device',
  ITEM: 'item'
}
const MODAL_TYPE = {
  FILTER: 'filter',
  SORT: 'sort',
  DEVICE: 'device',
  ITEM: 'item'
}

const listDevice = [
  { id: 1, title: 'DEVCIE-01', miningPower: '100', image: 'shop/device-01' },
  { id: 2, title: 'DEVCIE-02', miningPower: '100', image: 'shop/device-02' },
  { id: 3, title: 'DEVCIE-03', miningPower: '100', image: 'shop/device-03' },
  { id: 4, title: 'DEVCIE-04', miningPower: '100', image: 'shop/device-04' }
]

export default function ShopPage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [activeType, setActiveType] = useState(SHOP_TYPE.DEVICE)
  const [activeModal, setActiveModal] = useState(MODAL_TYPE.DEVICE)
  const handleSelectTab = (tab: string) => {
    setActiveType(tab)
  }
  const handleClick = (type: string) => {
    setActiveModal(type)
    onOpen()
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4 mt-8">
            {Object.values(SHOP_TYPE).map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => handleSelectTab(item)}
              >
                <img
                  className="mx-auto"
                  src={`/assets/images/upgrade/upgrade-tab${activeType === item ? '-active' : ''}.svg`}
                  alt="Upgrade Tab"
                />
                <div
                  className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-body text-base tracking-[-1px]">ALL ITEMS</p>
            <div className="flex items-center space-x-6">
              <div className="cursor-pointer" onClick={() => handleClick(MODAL_TYPE.SORT)}>
                <IconSort
                  className="size-[30px] text-green-800"
                  gradient={activeModal === MODAL_TYPE.SORT}
                />
              </div>
              <div className="cursor-pointer" onClick={() => handleClick(MODAL_TYPE.FILTER)}>
                <IconFilter
                  className="size-[30px] text-green-800"
                  gradient={activeModal === MODAL_TYPE.FILTER}
                />
              </div>
            </div>
          </div>
          {activeType == SHOP_TYPE.DEVICE ? (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <CustomList
                type="device"
                data={listDevice}
                onClickItem={() => handleClick(MODAL_TYPE.DEVICE)}
              />
            </motion.div>
          ) : (
            <ShopItem />
          )}
        </div>
      </CustomPage>
      <CustomModal
        title={
          activeModal === MODAL_TYPE.DEVICE
            ? 'BUY device'
            : activeModal === MODAL_TYPE.ITEM
              ? 'BUY ITEM'
              : activeModal === MODAL_TYPE.FILTER
                ? 'FILTER'
                : 'SORT BY'
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            {activeModal === MODAL_TYPE.DEVICE ? (
              <p>
                Are you sure you want to buy{' '}
                <span className="text-gradient whitespace-nowrap">“Device-04”</span>?
              </p>
            ) : activeModal === MODAL_TYPE.ITEM ? (
              <p>
                Are you sure you want to buy{' '}
                <span className="text-gradient whitespace-nowrap">“RAM 16GB”</span>
              </p>
            ) : (
              <p>Select option to {MODAL_TYPE.FILTER ? 'filter' : 'sort'} item</p>
            )}
          </div>
          {activeModal === MODAL_TYPE.DEVICE || activeModal === MODAL_TYPE.ITEM ? (
            <>
              <div className="my-8 space-x-4 flex items-center justify-center">
                <div className="size-[130px] min-w-[130px] p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                    src="/assets/images/shop/device-01@2x.png"
                    // srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x. /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x"
                    alt=""
                  />
                </div>
                <div className="space-y-2">
                  <p className=" text-title font-semibold text-xl font-mona leading-[22px]">
                    DEVICE-04
                  </p>
                  {activeModal === MODAL_TYPE.DEVICE ? (
                    <div className="flex items-center space-x-1">
                      <IconPoint className="size-6" />
                      <p className="text-lg text-green-500 font-semibold">+100/h</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-title text-base font-semibold leading-[20px]">
                        16{' '}
                        <span className="text-xs font-normal text-white-50 -ml-0.5">Available</span>
                      </p>
                      <p className="text-primary text-base font-semibold leading-[20px]">
                        3{' '}
                        <span className="text-xs font-normal text-white-50 -ml-0.5">Equipped</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {activeModal === MODAL_TYPE.DEVICE ? (
                <div className="btn default mb-8">
                  <div className="btn-border"></div>
                  <div className="btn-default !p-4">
                    <div className="text-sm">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">CPU</div>
                        <div className="text-title font-semibold font-geist">1 SLOT</div>
                      </div>
                      <div className="h-[1px] w-full bg-white/10 my-3"></div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">GPU</div>
                        <div className="text-title font-semibold font-geist">2 SLOT</div>
                      </div>
                      <div className="h-[1px] w-full bg-white/10 my-3"></div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">RAM</div>
                        <div className="text-title font-semibold font-geist">3 SLOT</div>
                      </div>
                      <div className="h-[1px] w-full bg-white/10 my-3"></div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">STORAGE</div>
                        <div className="text-title font-semibold font-geist">1 SLOT</div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
              ) : (
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
                      <div className="font-mona text-title uppercase tracking-[-1px]">
                        TOTAL PROFIT:
                      </div>
                      <div className="flex items-center space-x-2">
                        <IconPoint className="size-7" />
                        <span className="text-green-500 text-lg font-semibold">1,000/h</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="font-mona text-title uppercase tracking-[-1px]">AMOUNT:</div>
                      <div className="flex items-center space-x-6">
                        <div className="cursor-pointer">
                          <IconMinusCircle className="text-green-500 size-6" />
                        </div>
                        <span className="text-green-100 text-lg font-semibold">1</span>
                        <div className="cursor-pointer">
                          <IconPlusCircle className="text-green-500 size-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="btn">
                <div className="btn-border"></div>
                <div className="btn-primary">
                  <div className="flex items-center justify-center space-x-4 text-green-900">
                    <p>BUY NOW</p>
                    <div className="w-[30px] h-[1px] bg-green-800"></div>
                    <div className="flex items-center space-x-1">
                      <IconPoint className="size-5" color />
                      <span className="font-geist">5,000</span>
                    </div>
                  </div>
                </div>
                <div className="btn-border"></div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`grid gap-4 my-8 ${activeModal === MODAL_TYPE.FILTER ? 'grid-cols-2' : 'grid-cols-1'}`}
              >
                <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                  {activeModal === MODAL_TYPE.FILTER ? 'CPU' : `High -> Low price`}
                </div>
                <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                  {activeModal === MODAL_TYPE.FILTER ? 'GPU' : `Low -> High price`}
                </div>
                <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                  {activeModal === MODAL_TYPE.FILTER ? 'RAM' : `High -> Low profit`}
                </div>
                <div className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5">
                  {activeModal === MODAL_TYPE.FILTER ? 'SSD' : `Low -> High profit`}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="btn default" onClick={() => onClose()}>
                  <div className="btn-border"></div>
                  <div className="btn-default !text-body">Reset</div>
                  <div className="btn-border"></div>
                </div>
                <div className="btn">
                  <div className="btn-border"></div>
                  <div className="btn-primary">Confirm</div>
                  <div className="btn-border"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </CustomModal>
    </>
  )
}
