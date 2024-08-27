'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Info from '../components/info'
import { Tab, Tabs } from '@nextui-org/react'
import CustomList from '../components/custom-list'
import { getDevicesByType } from '../services/devices'
import { IDeviceTypeItem } from '../interfaces/i.devices'
import { useAppSelector } from '../hooks/useToolkit'

const UPGRADE_TYPE = {
  DEVICE: 'device',
  SKILL: 'skill'
}

export const UPGRADE_TAB = {
  RAM: 'RAM',
  CPU: 'CPU',
  GPU: 'GPU',
  STORAGE: 'STORAGE'
}

const listSkill = [
  { id: 1, title: 'Programing', level: '12', image: 'skill-programing' },
  { id: 2, title: 'Design', level: '12', image: 'skill-design' },
  { id: 3, title: 'Marketing', level: '12', image: 'skill-marketing' },
  { id: 4, title: 'Social Networking', level: '12', image: 'skill-social' }
]

export default function UpgradePage() {
  const [activeType, setActiveType] = useState(UPGRADE_TYPE.DEVICE)
  const [activeTab, setActiveTab] = useState(UPGRADE_TAB.RAM)
  const { token } = useAppSelector((state) => state.common)
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
      <AnimatePresence mode="wait">
        <div className="upgrade section before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]">
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info />
              <div className="mt-10 w-fit mx-auto">
                <div className="flex items-center space-x-4">
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
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}
