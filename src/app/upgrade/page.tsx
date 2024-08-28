'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import CustomList from '../components/custom-list'
import { addDeviceItem, getDevicesByType } from '../../services/devices'
import { IDeviceItemAddParam, IDeviceTypeItem } from '../../interfaces/i.devices'
import { UPGRADE_TAB } from '../../constants'
import CustomPage from '../components/custom-page'
import useCommonStore from '@/stores/commonStore'
import CustomModal from '../components/custom-modal'
import UpgradeModal from './components/upgrade-modal'
import { toast } from 'sonner'

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const currentItem = useRef<any>()
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

  const handleClickItem = (item: IDeviceTypeItem) => {
    currentItem.current = item
    onOpen()
  }

  const buy = async (data: IDeviceItemAddParam) => {
    const res = await addDeviceItem(data)
    if (res.status) {
      toast.success('Buy successfully!')
      onClose()
    }
  }

  useEffect(() => {
    if (token) {
      getListDevice()
    }
  }, [activeTab, token])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper: "before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
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
                <CustomList type="device" data={listDevice} onClickItem={handleClickItem} />
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
      </CustomPage>
      <CustomModal
        title={activeType === UPGRADE_TYPE.DEVICE ? 'DEVICE' : 'SKILL'}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <UpgradeModal
          activeType={activeType}
          UPGRADE_TYPE={UPGRADE_TYPE}
          item={currentItem.current}
          handleAction={buy}
        />
      </CustomModal>
    </>
  )
}
