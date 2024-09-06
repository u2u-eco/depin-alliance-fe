'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import CustomList from '../components/custom-list'
import { getDevicesByType } from '../../services/devices'
import { IDeviceTypeItem } from '../../interfaces/i.devices'
import { UPGRADE_TAB } from '../../constants'
import CustomPage from '../components/custom-page'
import useCommonStore from '@/stores/commonStore'
import CustomModal from '../components/custom-modal'
import UpgradeModal from './components/upgrade-modal'
import { toast } from 'sonner'
import { getSkillInfo, getSkills, updateSkill } from '@/services/user'
import { ISkillItem } from '@/interfaces/i.user'
import { useSearchParams } from 'next/navigation'

const UPGRADE_TYPE = {
  DEVICE: 'device',
  SKILL: 'skill'
}

export default function UpgradePage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const currentItem = useRef<any>()
  const refInterval = useRef<any>()
  const [activeType, setActiveType] = useState(tab || UPGRADE_TYPE.DEVICE)
  const [activeTab, setActiveTab] = useState<any>(UPGRADE_TAB.RAM)
  const [listSkill, setListSkill] = useState<ISkillItem[]>([])
  const token = useCommonStore((state) => state.token)
  const [listDevice, setListDevice] = useState<Array<IDeviceTypeItem>>([])
  const getListDevice = async () => {
    const res = await getDevicesByType(activeTab)
    if (res.status) {
      setListDevice(res.data)
    }
  }

  const _getSkills = async () => {
    const res = await getSkills()
    if (res.status) {
      setListSkill(res.data.skill)
    }
  }

  const handleChangeTab = (tab: any) => {
    setActiveTab(tab)
  }

  const handleSelectTab = (tab: string) => {
    setActiveType(tab)
    if (tab === UPGRADE_TYPE.DEVICE) {
      getDevicesByType(activeTab)
    } else {
      _getSkills()
    }
  }

  const handleClickItem = async (item: any) => {
    if (activeType === UPGRADE_TYPE.SKILL) {
      const res = await getSkillInfo(item.skillId)
      let infoSkill = {}
      if (res.status) {
        infoSkill = res.data
      }
      currentItem.current = { ...item, ...infoSkill }
      onOpen()
    } else {
      currentItem.current = item
      onOpen()
    }
  }

  // const buy = async (data: IDeviceItemAddParam) => {
  //   const res: any = await buyDeviceItem(data)
  //   if (res.status) {
  //     toast.success('Buy successfully!')
  //     onClose()
  //   }
  // }

  const handleUpdateSkill = async (skillId: number) => {
    const res: any = await updateSkill(skillId)
    if (res.status) {
      toast.success('Level Up successfully!')
      _getSkills()
      currentItem.current = {}
      onClose()
    }
  }

  const handleFetchList = () => {
    setTimeout(() => {
      _getSkills()
      if (currentItem.current.skillId) {
        handleClickItem(currentItem.current)
      }
    }, 5300)
  }

  const handleModalAction = (data: any) => {
    if (activeType === UPGRADE_TYPE.DEVICE) {
      // buy(data)
    } else {
      handleUpdateSkill(data)
    }
  }

  useEffect(() => {
    if (token) {
      if (activeType === UPGRADE_TYPE.DEVICE) {
        getListDevice()
      } else {
        _getSkills()
      }
    }
  }, [activeTab, token, activeType])

  useEffect(() => {
    if (!isOpen) {
      clearInterval(refInterval.current)
    }
  }, [isOpen])
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
        <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4">
          <div
            className="relative cursor-pointer"
            onClick={() => handleSelectTab(UPGRADE_TYPE.DEVICE)}
          >
            <img
              className="mx-auto"
              src={`/assets/images/upgrade/upgrade-tab${activeType === UPGRADE_TYPE.DEVICE ? '-active' : ''}.svg`}
              alt="Upgrade Tab"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === UPGRADE_TYPE.DEVICE ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
            >
              Device
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => handleSelectTab(UPGRADE_TYPE.SKILL)}
          >
            <img
              className="mx-auto"
              src={`/assets/images/upgrade/upgrade-tab${activeType === UPGRADE_TYPE.SKILL ? '-active' : ''}.svg`}
              alt="Upgrade Tab"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeType === UPGRADE_TYPE.SKILL ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
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
              <CustomList
                type="skill"
                data={listSkill}
                titleItemKey="name"
                levelKey="levelCurrent"
                imageDefault="upgrade/upgrade-skill-programing"
                onClickItem={handleClickItem}
              />
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
          refInterval={refInterval}
          handleAction={handleModalAction}
          handleFetchList={handleFetchList}
        />
      </CustomModal>
    </>
  )
}
