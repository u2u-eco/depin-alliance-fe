'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import CustomList from '../components/custom-list'
import { getDevicesByType } from '../services/devices'
import { IDeviceTypeItem } from '../interfaces/i.devices'
import { UPGRADE_TAB } from '../constants'
import CustomPage from '../components/custom-page'
import useCommonStore from '../stores/commonStore'
import CustomModal from '../components/custom-modal'

const UPGRADE_TYPE = {
  DEVICE: 'device',
  SKILL: 'skill'
}

const listSkill = [
  { id: 1, title: 'Programing', level: '12', image: 'upgrade/upgrade-skill-programing' },
  { id: 2, title: 'Design', level: '12', image: 'upgrade/upgrade-skill-design' },
  { id: 3, title: 'Marketing', level: '12', image: 'upgrade/upgrade-skill-marketing' },
  { id: 4, title: 'Social Networking', level: '12', image: 'upgrade/upgrade-skill-social' }
]

export default function UpgradePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [activeType, setActiveType] = useState(UPGRADE_TYPE.DEVICE)
  const [activeTab, setActiveTab] = useState(UPGRADE_TAB.RAM)
  const token = useCommonStore((state) => state.token)
  const [listDevice, setListDevice] = useState<Array<IDeviceTypeItem>>([])
  const getListDevice = async () => {
    const res = await getDevicesByType(activeTab)
    if (res.status) {
      setListDevice(res.data)
    }
  }

  const handleChangeTab = (tab: any) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    if (token) {
      getListDevice()
    }
  }, [activeTab, token])

  return (
    <>
      <CustomPage>
        <div className="flex items-center justify-center space-x-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setActiveType(UPGRADE_TYPE.DEVICE)}
          >
            <img
              className="mx-auto"
              src={`/assets/images/upgrade/upgrade-tab${activeType === UPGRADE_TYPE.DEVICE ? '-active' : ''}.svg`}
              alt="Upgrade Tab"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === UPGRADE_TYPE.DEVICE ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
            >
              Device
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setActiveType(UPGRADE_TYPE.SKILL)}
          >
            <img
              className="mx-auto"
              src={`/assets/images/upgrade/upgrade-tab${activeType === UPGRADE_TYPE.SKILL ? '-active' : ''}.svg`}
              alt="Upgrade Tab"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === UPGRADE_TYPE.SKILL ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
            >
              Skill
            </div>
          </div>
        </div>
        <div className="mt-6">
          {activeType === UPGRADE_TYPE.DEVICE ? (
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
                onSelectionChange={handleChangeTab}
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
                <CustomList type="device" data={listDevice} />
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <CustomList type="skill" data={listSkill} />
            </motion.div>
          )}
        </div>
        <div onClick={onOpen}>dasdsadasd</div>
      </CustomPage>
      <CustomModal
        title={activeType === UPGRADE_TYPE.DEVICE ? 'DEVICE' : 'SKILL'}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div>
          <div className="font-geist text-body text-base tracking-[-1px] text-center">
            {activeType === UPGRADE_TYPE.DEVICE ? (
              <p>Are you sure you want to buy more RAM?</p>
            ) : (
              <p>Are you sure you want to level up <span className="text-gradient">“Programing”</span>?</p>
            )}
          </div>
          <div className="my-8 mx-auto w-fit flex items-center space-x-4">
            <img
              className="size-[130px] [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0_30px)]"
              src="/assets/images/upgrade/upgrade-ram-2gb.png" srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x, /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x" alt=""
            />
            <div className="space-y-2">
              <p className="font-mona text-white text-2xl font-semibold">RAM 16GB</p>
              {activeType === UPGRADE_TYPE.DEVICE ? (
                <p className="font-geist font-semibold text-green-600">8 <span className="text-xs font-normal text-white-50">Available</span></p>
              ) : (
                <p className="font-geist font-semibold text-yellow-600">LV. 12</p>
              )}
            </div>
          </div>
          <div className="relative w-fit mx-auto">
            <img className="mx-auto" src="/assets/images/action-frame.svg" alt="Frame" />
            <div className="absolute top-0 left-0 right-0 w-full h-full px-10 py-5 flex items-center justify-between">
              <div className="space-y-3 font-geist">
                <p className="tracking-[-1px] text-title uppercase">{activeType === UPGRADE_TYPE.DEVICE ? 'TOTAL PROFIT:' : 'EFFECT:'}</p>
                <div className="flex items-center space-x-2">
                  <img className="size-7" src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="Point" />
                  <div className="text-lg font-semibold text-primary">1,000/h</div>
                </div>
              </div>
              <div className="space-y-3 font-geist">
                <p className="tracking-[-1px] text-title uppercase">{activeType === UPGRADE_TYPE.DEVICE ?'Amount:' : 'GROWTH:'}</p>
                {activeType === UPGRADE_TYPE.DEVICE ? (
                  <div className="flex items-center space-x-6">
                    <img className="size-6 cursor-pointer" src="/assets/images/icons/icon-minus-circle-green.svg" alt="Icon Minus" />
                    <p className="text-lg font-semibold text-green-100">1</p>
                    <img className="size-6 cursor-pointer" src="/assets/images/icons/icon-plus-circle-green.svg" alt="Icon Plus" />
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <p className="text-lg font-semibold text-green-700">LV. <span className="text-green-300 -ml-2">11</span></p>
                    <img className="size-6" src="/assets/images/icons/icon-double-arrow-right-gradient.svg" alt="Icon Double Arrow" />
                    <p className="text-lg font-semibold text-green-700">LV. <span className="text-green-300 -ml-2">12</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btn mt-6">
            <div className="btn-border"></div>
            <div className="btn-primary">
              <div className="flex items-center justify-center space-x-4">
                <span>{activeType === UPGRADE_TYPE.DEVICE ? 'Buy Now' : 'Level Up'}</span>
                <div className="w-[30px] h-[1px] bg-green-800"></div>
                <div className="flex items-center space-x-1">
                  <img className="size-5" src={`/assets/images/icons/icon-${activeType === UPGRADE_TYPE.DEVICE ? 'point' : 'thunder'}-dark.svg`} alt="Point" />
                  <p className="font-geist text-base font-semibold text-green-900">5,000</p>
                </div>
              </div>
            </div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
