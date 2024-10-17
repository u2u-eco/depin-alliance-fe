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
import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { toCapitalizeCase } from '@/helper/common'
import { MAP_TYPE } from '@/constants'
import MapBackground from '../components/map-background'
import SelectMap from '../components/select-map'
import ListItem from '../components/list-item'
import { MAP_CONTINENT_IMAGE, WorldMapContext } from '../context/worldmap-context'
import { createMap, getItemWorldMap, getWorldMap, updateMap } from '@/services/world-map'
import { IWorldMapItem, WORLD_MAP_ITEM } from '@/interfaces/i.world-map'
import Loader from '@/app/components/ui/loader'
import { toast } from 'sonner'
import CustomToast from '@/app/components/ui/custom-toast'

// const listItem = [
//   { id: 1, image: '', name: 'Oka Shigeo' },
//   { id: 2, image: '', name: 'Gudmund Oddmund' },
//   { id: 3, image: '', name: 'Mari Mane' },
//   { id: 4, image: '', name: 'Aleksandra Lidiya' },
//   { id: 5, image: '', name: 'Kadiatou Chinwe' }
// ]

// const listTool = [
//   { id: 1, image: '/assets/images/map/tool-01@2x.png', name: 'Cloudcell' },
//   { id: 2, image: '/assets/images/map/tool-02@2x.png', name: 'Pinpoint' },
//   { id: 3, image: '/assets/images/map/tool-03@2x.png', name: 'LustAI' },
//   { id: 4, image: '/assets/images/map/tool-04@2x.png', name: 'SkyEyes' },
//   { id: 5, image: '/assets/images/map/tool-05@2x.png', name: 'NoRadar' }
// ]

export default function DetailContainer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const continent = searchParams.get('id')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { setListWorldMap, listWorldMapByContinent, setCurrentMap, currentMap } =
    useContext(WorldMapContext)
  const [isOpenPop, setIsOpenPop] = useState(false)
  const [activeType, setActiveType] = useState(WORLD_MAP_ITEM.AGENCY)
  const [activeItem, setActiveItem] = useState<any>()
  const [activeArea, setActiveArea] = useState<any>()
  const { buttonSound } = useAppSound()
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false)
  const [listDataByType, setListDataByType] = useState<{ [key: string]: Array<any> }>({})
  const [worldMapItemSelected, setWorldMapSelectedItem] = useState<any>({})

  const listDetail = [
    {
      id: 1,
      haveItem: true,
      image: continent ? MAP_CONTINENT_IMAGE[continent] : null,
      title: continent ? listWorldMapByContinent[continent]?.name : '',
      type: 'map',
      text: 'LV. 12'
    },
    { id: 2, haveItem: false, image: '', title: 'agency', type: WORLD_MAP_ITEM.AGENCY, text: '' },
    { id: 3, haveItem: false, image: '', title: 'tool', type: WORLD_MAP_ITEM.TOOL, text: '' }
  ]

  const getData = async (type: string) => {
    setIsLoadingModal(true)
    const res = await getItemWorldMap(type)
    if (res.status) {
      setListDataByType({
        ...listDataByType,
        [type]: res.data
      })
    }
    setIsLoadingModal(false)
  }

  const handleClick = (type: string) => {
    buttonSound.play()
    setActiveType(type)
    switch (type) {
      case WORLD_MAP_ITEM.AGENCY:
      case WORLD_MAP_ITEM.TOOL:
        getData(type)
        break
    }
    onOpen()
  }

  const handleUpdateParam = (name: string) => {
    setActiveArea(name)
  }

  const handleClickModal = () => {
    switch (activeType) {
      case WORLD_MAP_ITEM.AGENCY:
      case WORLD_MAP_ITEM.TOOL:
        setWorldMapSelectedItem({
          ...worldMapItemSelected,
          [activeType]: activeItem
        })
        onClose()
        break
      case WORLD_MAP_ITEM.CONTINENT:
        router.push(`/map/detail?type=${activeArea}`)
        onClose()
        break
    }
  }

  const handleCloseModal = () => {
    setActiveItem(null)
    onClose()
  }

  const handleSelectItem = (item: IWorldMapItem) => {
    setActiveItem(item)
  }

  const getListMap = async () => {
    const res = await getItemWorldMap(WORLD_MAP_ITEM.CONTINENT)
    if (res.status) {
      setListWorldMap(res.data)
    }
  }

  const _getWorldMap = async () => {
    const res = await getWorldMap()
    if (res.status) {
      if (res.data.agency) {
        worldMapItemSelected[WORLD_MAP_ITEM.AGENCY] = res.data.agency
      }
      if (res.data.tool) {
        worldMapItemSelected[WORLD_MAP_ITEM.TOOL] = res.data.tool
      }
      setCurrentMap(res.data)
    }
  }

  const updateWorldMap = async () => {
    let res: any
    const data = {
      continent,
      agency: worldMapItemSelected[WORLD_MAP_ITEM.AGENCY].code,
      tool: worldMapItemSelected[WORLD_MAP_ITEM.TOOL].code
    }
    let message = 'Create world map successfully'
    if (currentMap) {
      message = 'Update world map successfully'
      res = await updateMap(data)
    } else {
      res = await createMap(data)
    }
    if (res.status) {
      setCurrentMap(res.data)
      toast.success(<CustomToast type="success" title={message} />)
    }
  }

  useEffect(() => {
    setActiveArea(continent)
  }, [])

  useEffect(() => {
    getListMap()
    _getWorldMap()
  }, [])

  useEffect(() => {
    if (
      continent &&
      worldMapItemSelected[WORLD_MAP_ITEM.AGENCY] &&
      worldMapItemSelected[WORLD_MAP_ITEM.TOOL]
    ) {
      updateWorldMap()
    }
  }, [worldMapItemSelected, continent])
  return (
    <>
      <div className=" flex flex-col justify-between space-y-6 h-full">
        {currentMap ? (
          <div className="flex items-center justify-around relative mb-auto pointer-events-none">
            <div className="flex-1 space-y-1 xs:space-y-1.5 2xs:space-y-2 text-center">
              <p className="text-[13px] xs:text-sm !leading-[18px] tracking-[-1px] text-white-50">
                Mission
              </p>
              <p className="w-fit mx-auto text-point font-airnt font-medium text-base xs:text-lg 2xs:text-xl !leading-[20px] xs:!leading-[22px] 2xs:!leading-[24px] tracking-[1px]">
                {currentMap?.results?.length || 0}
              </p>
            </div>
            <div className="flex-1 space-y-1 xs:space-y-1.5 2xs:space-y-2 text-center">
              <p className="text-[13px] xs:text-sm !leading-[18px] tracking-[-1px] text-white-50">
                Completed
              </p>
              <p className="w-fit mx-auto text-point font-airnt font-medium text-base xs:text-lg 2xs:text-xl !leading-[20px] xs:!leading-[22px] 2xs:!leading-[24px] tracking-[1px]">
                {currentMap?.numberMissionCompleted}/{currentMap?.results?.length || 0}
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
        ) : null}

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
                        <>{<item.image className="size-6 xs:size-7 2xs:size-8" />}</>
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
                    {worldMapItemSelected[item.type]?.name || item.title}
                  </p>
                  <p className="text-yellow-500 text-[11px] xs:text-xs !leading-[16px] tracking-[-1px] font-geist font-normal min-h-4">
                    {item.text}
                  </p>
                </div>
                <div
                  className="relative cursor-pointer mx-auto px-2"
                  onClick={() => handleClick(item.type)}
                >
                  {item.haveItem || worldMapItemSelected[item.type] ? (
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
      <CustomModal
        title={
          activeType === WORLD_MAP_ITEM.AGENCY
            ? 'AGENCY'
            : activeType === WORLD_MAP_ITEM.CONTINENT
              ? 'AREA'
              : 'TOOL'
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleCloseModal}
        onOpenChange={onOpenChange}
        full={activeType === WORLD_MAP_ITEM.CONTINENT}
      >
        <div
          className={
            activeType === WORLD_MAP_ITEM.CONTINENT
              ? 'h-full flex flex-col justify-between p-4'
              : `space-y-6 xs:space-y-8 2xs:space-y-10`
          }
        >
          {activeType === WORLD_MAP_ITEM.CONTINENT ? (
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
              {isLoadingModal ? (
                <Loader
                  classNames={{
                    wrapper: 'z-[1] left-[0] bg-black/30 h-[30vh] top-0',
                    icon: 'w-[45px] h-[45px] text-white'
                  }}
                />
              ) : (
                <ListItem
                  listItem={listDataByType[activeType] || []}
                  handleSelectItem={handleSelectItem}
                  activeItem={activeItem?.code || null}
                />
              )}
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
