'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Device from './components/device'
import Item from './components/item'
import { useQuery } from '@tanstack/react-query'
import { getUserDevice } from '@/services/devices'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { QUERY_CONFIG } from '@/constants'
import useCommonStore from '@/stores/commonStore'

const WORKSPACE_TYPE = {
  DEVICE: 'device',
  ITEM: 'item'
}

export default function WorkspacePage() {
  const router = useRouter()
  const token = useCommonStore((state) => state.token)
  const [activeType, setActiveType] = useState(WORKSPACE_TYPE.DEVICE)
  const listItemEquipByType = useRef<{ [key: string]: Array<IDeviceTypeItem> }>({})
  const { data: listDeviceItem, refetch } = useQuery({
    queryKey: ['fetchListDeviceItem'],
    queryFn: async () => {
      const res = await getUserDevice()
      if (res.status) {
        listItemEquipByType.current = {}
        res.data.forEach((item: IDeviceTypeItem) => {
          if (!listItemEquipByType.current[item.type]) {
            listItemEquipByType.current[item.type] = []
          }
          listItemEquipByType.current[item.type].push(item)
        })
      }
      return res.data
    },
    ...QUERY_CONFIG,
    enabled: Boolean(token)
  })

  const handleBack = () => {
    router.back()
  }
  const handleSelectTab = (tab: string) => {
    setActiveType(tab)
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
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
          <div className="text-title font-airnt font-medium text-xl xs:text-2xl">Workspace</div>
          <div className="size-1.5 bg-green-800"></div>
        </div>
        <div className="flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4 mt-8">
          {Object.values(WORKSPACE_TYPE).map((item, index) => (
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
        <div className="mt-6">
          {activeType === WORKSPACE_TYPE.DEVICE ? (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Device listItemEquipByType={listItemEquipByType} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Item
                listItemEquipByType={listItemEquipByType}
                listDeviceItem={listDeviceItem}
                refetch={refetch}
              />
            </motion.div>
          )}
        </div>
      </CustomPage>
    </>
  )
}
