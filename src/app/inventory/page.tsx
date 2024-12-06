'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import { UPGRADE_TAB } from '../../constants'
import CustomModal from '../components/custom-modal'
import { useRouter } from 'next/navigation'

const INVENTORY_TYPE = {
  BUILD: 'build',
  HARDWARE: 'hardware'
}

const listHardware = [
  { id: 1, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 2, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 3, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 4, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 5, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 6, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' }
]

export default function InventoryPage() {
  const router = useRouter()
  const [activeType, setActiveType] = useState(INVENTORY_TYPE.BUILD)
  const [activeTab, setActiveTab] = useState(UPGRADE_TAB.RAM)
  const [activeItem, setActiveItem] = useState()
  const [action, setAction] = useState('full')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
        <div className="relative flex items-center justify-center space-x-4">
          <div className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer">
            <Image
              onClick={handleBack}
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src="/assets/images/icons/icon-chevron-left-green.svg"
              alt="Icon Chevron"
            />
          </div>
          <div className="size-1.5 bg-green-800"></div>
          <div className="text-title font-airnt font-medium text-xl xs:text-2xl">INVENTORY</div>
          <div className="size-1.5 bg-green-800"></div>
        </div>
        {/* Tab */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <div
            className="relative cursor-pointer"
            onClick={() => setActiveType(INVENTORY_TYPE.BUILD)}
          >
            <img
              className="mx-auto"
              src={`/assets/images/upgrade/upgrade-tab${activeType === INVENTORY_TYPE.BUILD ? '-active' : ''}.svg`}
              alt="Upgrade Tab"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === INVENTORY_TYPE.BUILD ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
            >
              Build
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setActiveType(INVENTORY_TYPE.HARDWARE)}
          >
            <img
              className="mx-auto"
              src={`/assets/images/upgrade/upgrade-tab${activeType === INVENTORY_TYPE.HARDWARE ? '-active' : ''}.svg`}
              alt="Upgrade Tab"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === INVENTORY_TYPE.HARDWARE ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
            >
              Hardware
            </div>
          </div>
        </div>
        <div className="mt-6">
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {activeType === INVENTORY_TYPE.BUILD ? (
              <div className="flex flex-col space-y-4 w-full">
                <div className="relative w-fit mx-auto">
                  <Image
                    width={0}
                    height={0}
                    style={{ width: '100%', height: 'auto' }}
                    src="/assets/images/inventory/inventory-frame.svg"
                    alt="Frame"
                  />
                  <div className="absolute top-0 left-0 right-0 w-full h-full px-3 xs:px-4 2xs:px-5 py-2 xs:py-3 2xs:py-4 space-y-2.5 xs:space-y-3 2xs:space-y-4 flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <div className="text-gradient font-mona text-base xs:text-lg 2xs:text-xl font-semibold uppercase">
                        RAM
                      </div>
                      <div className="flex items-center space-x-1">
                        <img
                          className="size-4 xs:size-5 2xs:size-6"
                          src="/assets/images/point.png"
                          srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                          alt="Point"
                        />
                        <div className="xs:text-[15px] text-base text-green-500">
                          1,000<span className="text-body">/hour</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3 xs:space-x-4 2xs:space-x-5">
                      <div className="flex-1 p-2.5 xs:p-3 2xs:p-[14px] bg-white/10 [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_22px)]">
                        <div className="flex items-center space-x-2 xs:space-x-3 2xs:space-x-4">
                          <img
                            className="size-[60px] xs:size-[66px] 2xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)]"
                            src="/assets/images/upgrade/upgrade-ram-2gb.png"
                            alt=""
                          />
                          <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
                            <p className="font-mona text-[15px] xs:text-base font-semibold text-white leading-[20px]">
                              RAM 2GB
                            </p>
                            <div className="flex items-center space-x-1">
                              <img
                                src="/assets/images/point.png"
                                srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                                alt="Point"
                                className="size-4"
                              />
                              <p className="text-green-500 font-semibold">+100/h</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="size-20 xs:size-[90px] 2xs:size-[100px] cursor-pointer bg-white/10 flex items-center justify-center [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_22px),calc(100%_-_22px)_100%,0_100%,0_22px)]">
                        <img
                          className="size-8"
                          src="/assets/images/icons/icon-plus-white.svg"
                          alt="Icon Plus"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col space-y-6">
                <Tabs
                  variant="underlined"
                  classNames={{
                    tabList: 'gap-2 w-full relative rounded-none p-0 border-b border-divider',
                    cursor: 'w-full bg-gradient rounded',
                    tab: 'h-[30px] px-2 font-mona',
                    tabContent:
                      'group-data-[selected=true]:bg-gradient group-data-[selected=true]:[-webkit-background-clip:_text] group-data-[selected=true]:[-webkit-text-fill-color:_transparent] text-white/25 font-medium'
                  }}
                >
                  <Tab key={UPGRADE_TAB.RAM} title="RAM"></Tab>
                  <Tab key={UPGRADE_TAB.CPU} title="CPU"></Tab>
                  <Tab key={UPGRADE_TAB.GPU} title="GPU"></Tab>
                  <Tab key={UPGRADE_TAB.STORAGE} title="STORAGE"></Tab>
                </Tabs>
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4">
                    {listHardware.map((item: any) => (
                      <div
                        key={item.id}
                        className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${activeItem === item.id ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
                      >
                        <div
                          className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#143828] after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)] before:border-l-green-500 before:border-t-green-500' : ''}`}
                          onClick={() => setActiveItem(item.id)}
                        >
                          <img
                            className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                            src={`/assets/images/${item.image}.png`}
                            alt=""
                          />
                          <p className="font-mona font-semibold text-white mt-3 mb-1 leading-[16px]">
                            {item.title}
                          </p>
                          <p className="text-green-500">x{item.number}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </CustomPage>
      <CustomModal
        title="Equip"
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>You are equipping this item!</p>
          </div>
          <div className="mt-6 xs:mt-8 2xs:mt-10 mb-10 xs:mb-12 2xs:mb-14 space-x-4 flex items-center justify-center">
            <div className="p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] size-[90px] flex items-center justify-center">
              <img
                className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                src="/assets/images/upgrade/upgrade-ram-2gb.png"
                srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x. /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x"
                alt=""
              />
            </div>
            <div className="space-y-4">
              <p className=" text-title font-semibold text-xl font-mona leading-[22px]">RAM 2GB</p>
              <div className="flex items-center space-x-6">
                <div className="space-y-1">
                  <p className="text-title text-base font-semibold leading-[20px]">16 <span className="text-xs font-normal text-white-50 -ml-0.5">Available</span></p>
                  <p className="text-primary text-base font-semibold leading-[20px]">0 <span className="text-xs font-normal text-white-50 -ml-0.5">Equipped</span></p>
                </div>
                <div className="w-[1px] h-9 bg-white/25"></div>
                <div className="space-y-2">
                  <div className="text-xs text-white-50">TOTAL PROFIT:</div>
                  <div className="flex items-center space-x-1">
                    <img
                      className="size-4"
                      src="/assets/images/point.png"
                      srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                      alt="Point"
                    />
                    <span className="text-primary font-semibold leading-[16px]">10,000</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className={`btn ${action === 'remove' ? 'error' : action === 'full' ? 'inactive' : ''}`}>
            <div className="btn-border"></div>
            <div className={`btn-${action === 'remove' ? 'error' : action === 'full' ? 'inactive' : 'primary'}`}>{action === 'remove' ? 'Remove' : action === 'full' ? 'Full Slot' : 'Equip'}</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
