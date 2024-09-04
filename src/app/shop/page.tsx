'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import { IconFilter, IconPoint, IconSort } from '../components/icons'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'
import CustomList from '../components/custom-list'
import Image from 'next/image'
import ShopItem from './components/shop-item'
import FilterSort from '../components/filter-sort'
import { FILTER_TYPE } from '@/constants'

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
  { id: 1, title: 'DEVCIE-01', image: 'shop/device-01' },
  { id: 2, title: 'DEVCIE-02', image: 'shop/device-02' },
  { id: 3, title: 'DEVCIE-03', image: 'shop/device-03' },
  { id: 4, title: 'DEVCIE-04', image: 'shop/device-04' }
]

export default function ShopPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [activeType, setActiveType] = useState(SHOP_TYPE.ITEM)
  const [activeFilter, setActiveFilter] = useState('')
  const [activeModal, setActiveModal] = useState(MODAL_TYPE.ITEM)
  const [filterOptions, setFilterOptions] = useState<{
    sortBy: string
    sortAscending: boolean
    type?: string
  }>({
    sortBy: 'price',
    sortAscending: true,
    type: ''
  })
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
    onOpenChange: onOpenChangeFilter
  } = useDisclosure()
  const handleSelectTab = (tab: string) => {
    setActiveType(tab)
  }

  const handleClick = (type: string) => {
    setActiveModal(type)
    onOpen()
  }
  const handleFilterSort = (type: string) => {
    setActiveFilter(type)
    onOpenFilter()
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
        <div className="space-y-5 xs:space-y-6">
          {/* <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4 mt-8">
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
          </div> */}
          {activeType == SHOP_TYPE.ITEM && (
            <div className="flex items-center justify-between">
              <p className="text-body text-[15px] xs:text-base tracking-[-1px]">ALL ITEMS</p>
              <div className="flex items-center space-x-4 xs:space-x-5 2xs:space-x-6">
                <div className="cursor-pointer" onClick={() => handleFilterSort(FILTER_TYPE.SORT)}>
                  <IconSort
                    className="size-6 xs:size-[30px] text-green-800"
                    gradient={activeFilter === FILTER_TYPE.SORT}
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleFilterSort(FILTER_TYPE.FILTER)}
                >
                  <IconFilter
                    className="size-6 xs:size-[30px] text-green-800"
                    gradient={activeFilter === FILTER_TYPE.FILTER}
                  />
                </div>
              </div>
            </div>
          )}
          {activeType == SHOP_TYPE.DEVICE ? (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <CustomList
                type="shop"
                data={listDevice}
                onClickItem={() => handleClick(MODAL_TYPE.DEVICE)}
              />
            </motion.div>
          ) : (
            <ShopItem filterOptions={filterOptions} />
          )}
        </div>
      </CustomPage>
      <CustomModal title="BUY device" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div>
          <div className=" text-body text-[15px] xs:text-base tracking-[-1px] text-center">
            <p>
              Are you sure you want to buy{' '}
              <span className="text-gradient whitespace-nowrap">“Device-04”</span>?
            </p>
          </div>
          <div className="my-6 xs:my-7 2xs:my-8 space-x-3 xs:space-x-4 flex items-center justify-center">
            <div className="size-[100px] xs:size-[115px] 2xs:size-[130px] min-w-[100px] xs:min-w-[115px] 2xs:min-w-[130px] p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center">
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
            <div className="space-y-1.5 xs:space-y-2">
              <p className=" text-title font-semibold text-base xs:text-lg 2xs:text-xl font-mona leading-[22px]">
                DEVICE-04
              </p>
              {activeModal === MODAL_TYPE.DEVICE ? (
                <div className="flex items-center space-x-1">
                  <IconPoint className="size-5 2xs:size-6" />
                  <p className="text-[15px] xs:text-base 2xs:text-lg text-green-500 font-semibold">
                    +100/h
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-title text-base font-semibold leading-[20px]">
                    16 <span className="text-xs font-normal text-white-50 -ml-0.5">Available</span>
                  </p>
                  <p className="text-primary text-base font-semibold leading-[20px]">
                    3 <span className="text-xs font-normal text-white-50 -ml-0.5">Equipped</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="btn default mb-6 xs:mb-7 2xs:mb-8">
            <div className="btn-border"></div>
            <div className="btn-default !p-3 2xs:!p-4">
              <div className="text-[13px] 2xs:text-sm space-y-2 2xs:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-body">CPU</div>
                  <div className="text-title font-semibold font-geist">1 SLOT</div>
                </div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-body">GPU</div>
                  <div className="text-title font-semibold font-geist">2 SLOT</div>
                </div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-body">RAM</div>
                  <div className="text-title font-semibold font-geist">3 SLOT</div>
                </div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-body">STORAGE</div>
                  <div className="text-title font-semibold font-geist">1 SLOT</div>
                </div>
              </div>
            </div>
            <div className="btn-border"></div>
          </div>
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
        </div>
      </CustomModal>
      <FilterSort
        isOpen={isOpenFilter}
        onOpen={onOpenFilter}
        onOpenChange={onOpenChangeFilter}
        onClose={onCloseFilter}
        type={activeFilter}
        cb={setFilterOptions}
      />
    </>
  )
}
