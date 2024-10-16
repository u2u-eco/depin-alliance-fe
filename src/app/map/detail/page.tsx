'use client'

import CustomButton from '@/app/components/button'
import CustomModal from '@/app/components/custom-modal'
import CustomPage from '@/app/components/custom-page'
import {
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
import { useDisclosure } from '@nextui-org/react'
import React, { Component, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { toCapitalizeCase } from '@/helper/common'
import { MAP_TYPE } from '@/constants'
import MapBackground from '../components/map-background'
import SelectMap from '../components/select-map'

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

export default function DetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParams = searchParams.get('type')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeType, setActiveType] = useState(DETAIL_TYPE.AGENCY)
  const [activeItem, setActiveItem] = useState<any>()
  const [activeArea, setActiveArea] = useState<any>()
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

  useEffect(() => {
    setActiveArea(typeParams)
  }, [])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[-1]",
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
            <div className="flex space-x-2">
              {listDetail.map((item: any) => (
                <div className="btn cursor-default" key={item.id}>
                  <div className="btn-border"></div>
                  <div className="btn-primary ![background:_#0f0f0fcc] !shadow-none relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:bg-[linear-gradient(to_top,rgba(0,51,29,0.1),rgba(0,51,29,1))] before:pointer-events-none before:opacity-30 !px-1 xs:!px-2 2xs:!px-3 text-center flex flex-col space-y-2 xs:space-y-2.5 2xs:space-y-3">
                    <div className="relative mx-auto drop-shadow-[0_0_10px_rgba(0,153,86,0.5)] mt-0.5 xs:mt-1 before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-1.5 before:border-[3px] before:border-transparent before:border-l-green-500 before:border-t-green-500 after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-2.5 after:border-[5px] after:border-transparent after:border-r-green-500 after:border-b-green-500">
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
              <SelectMap handleUpdateParam={handleUpdateParam} activeArea={activeArea} />
            </div>
          ) : (
            <>
              <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
                <p>
                  Select 01 <span className="text-gradient capitalize">“{activeType}”</span>
                </p>
              </div>
              <div className="overflow-y-auto no-scrollbar max-h-[50vh]">
                <div className="flex flex-col space-y-2.5 xs:space-y-3 2xs:space-y-3.5">
                  {listItem.map((item: any, index: number) => (
                    <div
                      className={`relative cursor-pointer after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-4 after:border-[8px] after:border-transparent after:transition-background ${activeItem === index ? 'after:border-b-green-500 after:border-r-green-500' : 'after:border-b-green-900 after:border-r-green-900'}`}
                      key={index}
                      onClick={() => handleSelectItem(index)}
                    >
                      <div
                        className={`relative [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:size-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:transition-background p-2 flex items-center justify-between ${activeItem === index ? 'bg-green-500 before:bg-item-green' : 'before:bg-item-default before:opacity-20'}`}
                      >
                        <div className="flex items-center space-x-3 xs:space-x-4">
                          <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: '100%' }}
                              src={
                                item?.avatar?.replace(/-/g, '-main-') ||
                                '/assets/images/avatar/avatar-main-01@2x.png'
                              }
                              alt="DePIN Alliance"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="text-white font-mona text-[15px] xs:text-base 2xs:text-lg font-semibold !leading-[20px] xs:!leading-[22px] [word-break:_break-word;]">
                              {item.name}
                            </div>
                            {/* <div className="text-yellow-600 uppercase text-xs xs:text-[13px] 2xs:text-sm !leading-[14px] xs:!leading-[16px]">
                          LV. 12
                        </div>
                        <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2 text-xs xs:text-[13px] 2xs:text-sm !leading-[14px] xs:!leading-[16px]">
                          <IconUpDown className="size-3.5 xs:size-4 text-green-500" />
                          <p className="text-title">Increase base reward</p>
                          <p className="text-green-300 font-semibold">2%</p>
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
