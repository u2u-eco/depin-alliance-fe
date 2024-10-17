'use client'

import CustomButton from '@/app/components/button'
import CustomModal from '@/app/components/custom-modal'
import CustomPage from '@/app/components/custom-page'
import {
  IconClose,
  IconContribute,
  IconMapAfrica,
  IconMapAmerica,
  IconMapAntarctica,
  IconMapAsia,
  IconMapEurope,
  IconMapOceania,
  IconPlus,
  IconReload,
  IconUpDown
} from '@/app/components/icons'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { useAppSound } from '@/hooks/useAppSound'
import { Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react'
import React, { Component, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { toCapitalizeCase } from '@/helper/common'
import { MAP_TYPE } from '@/constants'
import MapBackground from '../components/map-background'
import SelectMap from '../components/select-map'
import ListItem from '../components/list-item'

const DETAIL_TYPE = {
  AGENCY: 'agency',
  TOOL: 'tool',
  MAP: 'map'
}

const listItem = [
  { id: 1, image: '', name: 'Ethan Nimbus' },
  { id: 2, image: '', name: 'Ethan Nimbus' },
  { id: 3, image: '', name: 'Ethan Nimbus' },
  { id: 4, image: '', name: 'Ethan Nimbus' },
  { id: 5, image: '', name: 'Ethan Nimbus' }
]

const listTool = [
  { id: 1, image: '/assets/images/map/tool-01@2x.png', name: 'Cloudcell' },
  { id: 2, image: '/assets/images/map/tool-02@2x.png', name: 'Pinpoint' },
  { id: 3, image: '/assets/images/map/tool-03@2x.png', name: 'LAI' },
  { id: 4, image: '/assets/images/map/tool-04@2x.png', name: 'SkyEyes' },
  { id: 5, image: '/assets/images/map/tool-05@2x.png', name: 'NoRadar' }
]

export default function DetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParams = searchParams.get('type')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [isOpenPop, setIsOpenPop] = useState(false)
  const [activeType, setActiveType] = useState(DETAIL_TYPE.AGENCY)
  const [activeItem, setActiveItem] = useState<any>()
  const [activeArea, setActiveArea] = useState<any>()
  const [activePoint, setActivePoint] = useState<any>()
  const { buttonSound } = useAppSound()

  const listDetail = [
    {
      id: 1,
      haveItem: true,
      image:
        typeParams === MAP_TYPE.AFRICA ? (
          <IconMapAfrica className="size-6 xs:size-7 2xs:size-8" />
        ) : typeParams === MAP_TYPE.AMERICA ? (
          <IconMapAmerica className="size-6 xs:size-7 2xs:size-8" />
        ) : typeParams === MAP_TYPE.ANTARCTICA ? (
          <IconMapAntarctica className="size-6 xs:size-7 2xs:size-8" />
        ) : typeParams === MAP_TYPE.ASIA ? (
          <IconMapAsia className="size-6 xs:size-7 2xs:size-8" />
        ) : typeParams === MAP_TYPE.EUROPE ? (
          <IconMapEurope className="size-6 xs:size-7 2xs:size-8" />
        ) : (
          <IconMapOceania className="size-6 xs:size-7 2xs:size-8" />
        ),
      title: typeParams,
      type: 'map',
      text: 'LV. 12'
    },
    { id: 2, haveItem: false, image: '', title: 'agency', type: 'agency', text: '' },
    { id: 3, haveItem: false, image: '', title: 'tool', type: 'tool', text: '' }
  ]

  const handleClick = (type: string) => {
    buttonSound.play()
    switch (type) {
      case DETAIL_TYPE.AGENCY:
      case DETAIL_TYPE.TOOL:
      case DETAIL_TYPE.MAP:
        setActiveType(type)
        onOpen()
        break
    }
  }

  const handleUpdateParam = (name: string) => {
    setActiveArea(name)
  }

  const handleClickModal = () => {
    switch (activeType) {
      case DETAIL_TYPE.AGENCY:
      case DETAIL_TYPE.TOOL:
        onClose()
        break
      case DETAIL_TYPE.MAP:
        router.push(`/map/detail?type=${activeArea}`)
        onClose()
        break
    }
  }

  const handleSelectItem = (index: number) => {
    setActiveItem(index)
  }

  const handleActivePoint = () => {
    setActivePoint(true)
  }

  useEffect(() => {
    setActiveArea(typeParams)
  }, [])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[1] before:pointer-events-none",
          container: 'h-full',
          animate:
            '[--space:_40px] xs:[--space:_48px] 2xs:[--space:_56px] h-[calc(100%_-_var(--space))]',
          base: 'h-full'
        }}
      >
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 right-0 size-full"
          >
            <MapBackground></MapBackground>
          </motion.div>
          <div className=" flex flex-col justify-between space-y-6 h-full">
            <CustomHeader title="World Map" />
            <div className="flex items-center justify-around relative mb-auto pointer-events-none">
              <div className="flex-1 space-y-1 xs:space-y-1.5 2xs:space-y-2 text-center">
                <p className="text-[13px] xs:text-sm !leading-[18px] tracking-[-1px] text-white-50">
                  Mission
                </p>
                <p className="w-fit mx-auto text-point font-airnt font-medium text-base xs:text-lg 2xs:text-xl !leading-[20px] xs:!leading-[22px] 2xs:!leading-[24px] tracking-[1px]">
                  4
                </p>
              </div>
              <div className="flex-1 space-y-1 xs:space-y-1.5 2xs:space-y-2 text-center">
                <p className="text-[13px] xs:text-sm !leading-[18px] tracking-[-1px] text-white-50">
                  Completed
                </p>
                <p className="w-fit mx-auto text-point font-airnt font-medium text-base xs:text-lg 2xs:text-xl !leading-[20px] xs:!leading-[22px] 2xs:!leading-[24px] tracking-[1px]">
                  0/4
                </p>
              </div>
              <div className="flex-1 space-y-1 xs:space-y-1.5 2xs:space-y-2 text-center">
                <p className="text-[13px] xs:text-sm !leading-[18px] tracking-[-1px] text-white-50">
                  Streak
                </p>
                <p className="w-fit mx-auto text-point font-airnt font-medium text-base xs:text-lg 2xs:text-xl !leading-[20px] xs:!leading-[22px] 2xs:!leading-[24px] tracking-[1px]">
                  2
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              {listDetail.map((item: any) => (
                <div className="btn cursor-default" key={item.id}>
                  <div className="btn-border"></div>
                  <div className="btn-primary ![background:_#0f0f0fcc] !shadow-none relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:bg-[linear-gradient(to_top,rgba(0,51,29,0.1),rgba(0,51,29,1))] before:pointer-events-none before:opacity-30 !px-1 xs:!px-2 2xs:!px-3 text-center flex flex-col space-y-2 xs:space-y-2.5 2xs:space-y-3">
                    <div
                      className="relative mx-auto drop-shadow-[0_0_10px_rgba(0,153,86,0.5)] mt-0.5 xs:mt-1 before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-1.5 before:border-[3px] before:border-transparent before:border-l-green-500 before:border-t-green-500 after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-2.5 after:border-[5px] after:border-transparent after:border-r-green-500 after:border-b-green-500"
                      onClick={() => handleClick(item.type)}
                    >
                      <div className="[--shape:_15px] size-14 xs:size-16 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape));] p-[1px] bg-gradient">
                        <div
                          className={`[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape));] flex items-center justify-center size-full text-green-500 ${item.haveItem ? 'bg-green-900' : 'bg-[linear-gradient(to_bottom,#000,#00331d)]'}`}
                        >
                          {item.haveItem ? (
                            <>{item.image}</>
                          ) : (
                            <img
                              className="size-8 xs:size-9 2xs:size-10"
                              src="/assets/images/onboarding/device-unknown@2x.png"
                              alt="DePIN Alliance"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="relative space-y-0.5 xs:space-y-1">
                      <p
                        className={`text-xs xs:text-[13px] 2xs:text-sm !leading-[16px] xs:!leading-[18px] font-semibold uppercase ${item.haveItem ? 'text-title' : 'text-inactive'}`}
                      >
                        {item.title}
                      </p>
                      <p className="text-yellow-500 text-[11px] xs:text-xs !leading-[16px] tracking-[-1px] font-geist font-normal min-h-4">
                        {item.text}
                      </p>
                    </div>
                    <div
                      className="relative cursor-pointer mx-auto px-2"
                      onClick={() => handleClick(item.type)}
                    >
                      {item.haveItem ? (
                        <IconReload className="size-5 xs:size-6" gradient />
                      ) : (
                        <IconPlus className="size-5 xs:size-6" gradient />
                      )}
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
              ))}
            </div>
          </div>
        </>
      </CustomPage>
      <CustomModal
        title={
          activeType === DETAIL_TYPE.AGENCY
            ? 'AGENCY'
            : activeType === DETAIL_TYPE.MAP
              ? 'AREA'
              : 'TOOL'
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        full={activeType === DETAIL_TYPE.MAP}
      >
        <div
          className={
            activeType === DETAIL_TYPE.MAP
              ? 'h-full flex flex-col justify-between p-4'
              : `space-y-6 xs:space-y-8 2xs:space-y-10`
          }
        >
          {activeType === DETAIL_TYPE.MAP ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <SelectMap activeArea={activeArea} />
            </div>
          ) : (
            <>
              <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
                <p>
                  Select 01 <span className="text-gradient capitalize">“{activeType}”</span>
                </p>
              </div>
              <ListItem
                listItem={activeType === DETAIL_TYPE.AGENCY ? listItem : listTool}
                handleSelectItem={handleSelectItem}
                activeItem={activeItem}
              />
            </>
          )}
          <div className="my-4 xs:my-6 2xs:my-8">
            <CustomButton title="Confirm" onAction={handleClickModal} />
          </div>
        </div>
      </CustomModal>
    </>
  )
}
