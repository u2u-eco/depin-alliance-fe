"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import Info from '../components/info'
import { Tab, Tabs } from '@nextui-org/react'
import CustomList from '../components/custom-list'

const UPGRADE_TYPE = {
  DEVICE: 'device',
  SKILL: 'skill',
}

const UPGRADE_TAB = {
  RAM: 'ram',
  CPU: 'cpu',
  GPU: 'gpu',
  STORAGE: 'storage',
}

const listRAM = [
  { id: 1, title: 'RAM 2GB', point: '100', available: '10', image: 'ram-2gb'},
  { id: 2, title: 'RAM 4GB', point: '200', available: '5', image: 'ram-4gb'},
  { id: 3, title: 'RAM 6GB', point: '400', available: '2', image: 'ram-6gb'},
  { id: 4, title: 'RAM 8GB', point: '800', available: '4', image: 'ram-8gb'},
]

const listSkill = [
  { id: 1, title: 'Programing', level: '12', image: 'skill-programing'},
  { id: 2, title: 'Design', level: '12', image: 'skill-design'},
  { id: 3, title: 'Marketing', level: '12', image: 'skill-marketing'},
  { id: 4, title: 'Social Networking', level: '12', image: 'skill-social'},
]

export default function UpgradePage() {
  const [activeType, setActiveType] = useState(UPGRADE_TYPE.DEVICE)
  const [activeTab, setActiveTab] = useState(UPGRADE_TAB.RAM)

  return (
    <>
      <AnimatePresence mode="wait">
        <div className="upgrade section before:content-[''] before:absolute before:top-[50%] before:left-[-320px] before:size-[400px] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1]">
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info/>
              <div className="mt-10 w-fit mx-auto">
                <div className="flex items-center space-x-4">
                  <div className="relative cursor-pointer" onClick={() => setActiveType(UPGRADE_TYPE.DEVICE)}>
                    <img className="mx-auto" src={`/assets/images/upgrade/upgrade-tab${activeType === UPGRADE_TYPE.DEVICE ? '-active' : ''}.svg`} alt="Upgrade Tab" />
                    <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === UPGRADE_TYPE.DEVICE ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}>Device</div>
                  </div>
                  <div className="relative cursor-pointer" onClick={() => setActiveType(UPGRADE_TYPE.SKILL)}>
                    <img className="mx-auto" src={`/assets/images/upgrade/upgrade-tab${activeType === UPGRADE_TYPE.SKILL ? '-active' : ''}.svg`} alt="Upgrade Tab" />
                    <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === UPGRADE_TYPE.SKILL ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}>Skill</div>
                  </div>
                </div>
                <div className="mt-6">
                  {activeType === UPGRADE_TYPE.DEVICE ? (
                    <div className="flex w-full flex-col space-y-6">
                      <Tabs
                        variant="underlined"
                        classNames={{
                          tabList: "gap-2 w-full relative rounded-none p-0 border-b border-divider",
                          cursor: "w-full bg-gradient rounded",
                          tab: "h-[30px] px-2 font-mona",
                          tabContent: "group-data-[selected=true]:bg-gradient group-data-[selected=true]:[-webkit-background-clip:_text] group-data-[selected=true]:[-webkit-text-fill-color:_transparent] text-white/25 font-medium"
                        }}
                      >
                        <Tab key="ram" title="RAM"></Tab>
                        <Tab key="cpu" title="CPU"></Tab>
                        <Tab key="gpu" title="GPU"></Tab>
                        <Tab key="storage" title="STORAGE"></Tab>
                      </Tabs>
                      <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -25, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <CustomList
                          type="device"
                          data={listRAM}
                        />
                      </motion.div>
                    </div>
                  ): (
                    <motion.div
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -25, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <CustomList
                        type="skill"
                        data={listSkill}
                      />
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
