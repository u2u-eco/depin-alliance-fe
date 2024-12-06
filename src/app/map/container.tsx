'use client'

import CustomButton from '@/app/components/button'
import CustomModal from '@/app/components/custom-modal'
import { IconReload } from '@/app/components/icons'
import { useAppSound } from '@/hooks/useAppSound'
import { useDisclosure } from '@nextui-org/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SelectMap from './components/select-map'
import ListItem from './components/list-item'
import { MAP_CONTINENT_IMAGE, WorldMapContext } from './context/worldmap-context'
import { createMap, getItemWorldMap, getWorldMap, updateMap } from '@/services/world-map'
import { IWorldMapItem, WORLD_MAP_ITEM } from '@/interfaces/i.world-map'
import Loader from '@/app/components/ui/loader'
import useWorldMapStore from '@/stores/worldMapStore'
// import ModalReward from '@/app/components/ui/modal-reward'
// import { formatNumber } from '@/helper/common'
import Image from 'next/image'
import { useTourGuideContext } from '@/contexts/tour.guide.context'

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

export default function MapContainer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const continent: any = searchParams.get('id') || 'continent_1'
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const refTimeoutClickTour = useRef<any>()
  const {
    isOpen: isOpenReward,
    onOpen: onOpenReward,
    onOpenChange: onOpenChangeReward,
    onClose: onCloseReward
  } = useDisclosure()
  const {
    setListWorldMap,
    listWorldMapByContinent,
    setCurrentMap,
    currentMap,
    continent: continentStore
  } = useContext(WorldMapContext)
  const { worldMapReward, setCurrentWorldMap, currentWorldMap } = useWorldMapStore()
  const [activeType, setActiveType] = useState(WORLD_MAP_ITEM.AGENCY)
  const [activeItem, setActiveItem] = useState<any>()
  const { buttonSound } = useAppSound()
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false)
  const [listDataByType, setListDataByType] = useState<{ [key: string]: Array<any> }>({})
  const [worldMapItemSelected, setWorldMapSelectedItem] = useState<any>({})
  const { state: tourState, helpers, setState } = useTourGuideContext()
  const clickTour = useRef<boolean>(false)
  // const currentContinentImage = MAP_CONTINENT_IMAGE[currentMap?.continent?.code || continent]
  // const [isDailyCombo, setIsDailyCombo] = useState(false)

  const listDetail = [
    {
      id: 1,
      haveItem: true,
      image: '',
      title: 'continent',
      type: WORLD_MAP_ITEM.CONTINENT
      // text: 'LV. 12'
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
    if (currentMap?.isCompleted || isOpen) return
    buttonSound?.play()
    setActiveType(type)
    onOpen()
    switch (type) {
      case WORLD_MAP_ITEM.AGENCY:
      case WORLD_MAP_ITEM.TOOL:
        if (worldMapItemSelected[type]) {
          handleSelectItem(worldMapItemSelected[type])
        } else {
          setActiveItem(null)
        }
        getData(type)
        break
    }

    if (
      tourState.tourActive &&
      tourState.run &&
      !clickTour.current &&
      (tourState.stepIndex === 0 || tourState.stepIndex === 4 || tourState.stepIndex === 7)
    ) {
      clickTour.current = true
      clearTimeout(refTimeoutClickTour.current)
      refTimeoutClickTour.current = setTimeout(() => {
        helpers?.next()
        clickTour.current = false
      }, 300)
    }
  }

  const handleClickModal = () => {
    if (disableAction) return
    switch (activeType) {
      case WORLD_MAP_ITEM.AGENCY:
      case WORLD_MAP_ITEM.TOOL:
        handleCloseModal()
        setWorldMapSelectedItem((prevState: any) => ({
          ...prevState,
          [activeType]: activeItem
        }))
        break
      case WORLD_MAP_ITEM.CONTINENT:
        if (continentStore) {
          router.replace(`/map?id=${continentStore}`)
        }
        onClose()
        break
    }

    if (tourState.tourActive && !clickTour.current) {
      clickTour.current = true
      clearTimeout(refTimeoutClickTour.current)
      refTimeoutClickTour.current = setTimeout(() => {
        helpers?.next()
        clickTour.current = false
      }, 300)
    }
  }

  const handleCloseModal = () => {
    setActiveItem(null)
    onClose()
  }

  const handleSelectItem = (item: IWorldMapItem) => {
    buttonSound?.play()
    setActiveItem(item)
    if (tourState.tourActive) {
      clearTimeout(refTimeoutClickTour.current)
      refTimeoutClickTour.current = setTimeout(() => {
        helpers?.next()
      }, 300)
    }
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
      if (res.data?.agency) {
        worldMapItemSelected[WORLD_MAP_ITEM.AGENCY] = res.data.agency
      }
      if (res.data?.tool) {
        worldMapItemSelected[WORLD_MAP_ITEM.TOOL] = res.data.tool
      }
      setWorldMapSelectedItem(worldMapItemSelected)
      setCurrentMap(res.data)
      setCurrentWorldMap(res.data)
    }
  }

  const updateWorldMap = async () => {
    let res: any
    const data = {
      continent,
      agency: worldMapItemSelected[WORLD_MAP_ITEM.AGENCY].code,
      tool: worldMapItemSelected[WORLD_MAP_ITEM.TOOL].code
    }
    if (currentMap) {
      res = await updateMap(data)
    } else {
      res = await createMap(data)
    }
    if (res.status) {
      setCurrentMap(res.data)
      setCurrentWorldMap(res.data)
    }
  }

  const showReward = () => {
    onOpenReward()
    _getWorldMap()
  }

  const getNameDetail = (item: any) => {
    if (item.type === WORLD_MAP_ITEM.CONTINENT) {
      if (currentWorldMap?.continent.name) {
        return currentWorldMap.continent.name
      }
      if (continentStore && listWorldMapByContinent[continentStore]) {
        return listWorldMapByContinent[continentStore].name
      }
      if (continent && listWorldMapByContinent[continent]) {
        return listWorldMapByContinent[continent].name
      }
      return 'continent'
    } else {
      return worldMapItemSelected[item.type]?.name || item.title
    }
  }

  const getImage = (item: any) => {
    if (item.type === WORLD_MAP_ITEM.AGENCY && currentWorldMap?.agency?.image) {
      return currentWorldMap?.agency?.image
    }

    if (item.type === WORLD_MAP_ITEM.TOOL && currentWorldMap?.tool?.image) {
      return currentWorldMap?.tool?.image
    }

    return (
      worldMapItemSelected[item.type]?.image || '/assets/images/onboarding/device-unknown@2x.png'
    )
  }

  const disableAction =
    (activeType === WORLD_MAP_ITEM.AGENCY || activeType === WORLD_MAP_ITEM.TOOL) && !activeItem
      ? true
      : false

  useEffect(() => {
    getListMap()
    _getWorldMap()
  }, [])

  useEffect(() => {
    if (worldMapReward) {
      showReward()
    }
  }, [worldMapReward])

  useEffect(() => {
    if (
      continent &&
      worldMapItemSelected[WORLD_MAP_ITEM.AGENCY] &&
      worldMapItemSelected[WORLD_MAP_ITEM.TOOL]
    ) {
      updateWorldMap()
    }
  }, [worldMapItemSelected, continent])

  useEffect(() => {
    if (tourState.tourActive) {
      if (tourState.stepIndex === 1 || tourState.stepIndex === 15) {
        setActiveType(tourState.stepIndex === 1 ? WORLD_MAP_ITEM.CONTINENT : WORLD_MAP_ITEM.GUIDE)
        onOpen()
      }

      if (tourState.stepIndex === 4 && !tourState.run) {
        handleClick(WORLD_MAP_ITEM.AGENCY)
      }
      if (tourState.stepIndex === 7 && !tourState.run) {
        handleClick(WORLD_MAP_ITEM.TOOL)
      }
      if (!tourState.run && tourState.stepIndex === 0) {
        setTimeout(() => {
          setState({
            run: true
          })
        }, 1000)
      }
    }
    if (!tourState.tourActive && tourState.stepIndex === 15) {
      onClose()
    }
  }, [tourState])

  return (
    <>
      <div className=" flex flex-col justify-between space-y-6 h-full">
        {/* {currentMap ? (
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
          </div>
        ) : (
          <div></div>
        )} */}
        <div></div>
        {/* <div id="map-continent"></div> */}
        <div className="flex space-x-2 map-nav">
          {listDetail.map((item: any) => (
            <div
              className={`btn cursor-default map-${item.id === 1 ? 'continent' : item.title} ${currentMap?.isCompleted ? 'inactive pointer-events-none' : ''}`}
              key={item.id}
            >
              <div className="btn-border"></div>
              <div
                className={`btn-primary ![background:_#0f0f0fcc] !shadow-none relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:bg-[linear-gradient(to_top,rgba(0,51,29,0.1),rgba(0,51,29,1))] before:pointer-events-none before:opacity-30 !px-1 xs:!px-2 2xs:!px-3 text-center flex flex-col space-y-2 xs:space-y-2.5 2xs:space-y-3 ${currentMap?.isCompleted ? 'before:!bg-white/10 before:[background-image:_unset]' : ''}`}
              >
                <div
                  className={`relative cursor-pointer mx-auto drop-shadow-[0_0_10px_rgba(0,153,86,0.5)] mt-0.5 xs:mt-1 before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-1.5 before:border-[3px] before:border-transparent before:border-l-green-500 before:border-t-green-500 ${currentMap?.isCompleted ? 'opacity-30' : ''}`}
                  onClick={() => handleClick(item.type)}
                >
                  <div className="[--shape:_15px] size-14 xs:size-16 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),100%_100%,0_100%,0_var(--shape));] p-[1px] bg-gradient">
                    <div
                      className={`[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),100%_100%,0_100%,0_var(--shape));] flex items-center justify-center size-full text-green-500 ${item.haveItem ? 'bg-green-900' : 'bg-[linear-gradient(to_bottom,#000,#00331d)]'}`}
                    >
                      {item.haveItem ? (
                        MAP_CONTINENT_IMAGE(
                          currentWorldMap?.continent?.code
                            ? currentWorldMap.continent?.code
                            : 'continent_1',
                          'className="size-6 xs:size-7 2xs:size-8"'
                        )
                      ) : (
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          className={
                            worldMapItemSelected[item.type]?.image
                              ? 'size-full'
                              : 'size-8 xs:size-9 2xs:size-10'
                          }
                          src={getImage(item)}
                          alt="DePIN Alliance"
                        />
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 size-6 xs:size-7 border-transparent border-[12px] xs:border-[14px] border-r-yellow-500 border-b-yellow-500">
                    <IconReload className="text-yellow-900 size-2.5" />
                  </div>
                </div>
                <div className="relative space-y-0.5 xs:space-y-1">
                  <p
                    className={`text-xs xs:text-[13px] 2xs:text-sm !leading-[16px] xs:!leading-[18px] font-semibold uppercase line-clamp-1 ${(worldMapItemSelected[item.type]?.name || item.type === WORLD_MAP_ITEM.CONTINENT) && !currentMap?.isCompleted ? 'text-title' : 'text-inactive'}`}
                  >
                    {getNameDetail(item)}
                  </p>
                  {/* <p
                    className={`text-[11px] xs:text-xs !leading-[16px] min-h-4 tracking-[-1px] font-geist font-normal line-clamp-1 ${currentMap?.isCompleted ? 'text-inactive' : 'text-yellow-500'}`}
                  >
                    {item.text}
                  </p> */}
                </div>
                {/* <div
                  className="relative cursor-pointer mx-auto px-2"
                  onClick={() => handleClick(item.type)}
                >
                  {item.haveItem || worldMapItemSelected[item.type] ? (
                    <IconReload className="size-5 xs:size-6" gradient />
                  ) : (
                    <IconPlus className="size-5 xs:size-6" gradient />
                  )}
                </div> */}
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
        full={activeType === WORLD_MAP_ITEM.CONTINENT || activeType === WORLD_MAP_ITEM.GUIDE}
      >
        <div
          className={
            activeType === WORLD_MAP_ITEM.CONTINENT || activeType === WORLD_MAP_ITEM.GUIDE
              ? 'h-full flex flex-col justify-between p-4'
              : `space-y-6 xs:space-y-8 2xs:space-y-10`
          }
        >
          {activeType === WORLD_MAP_ITEM.CONTINENT ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <SelectMap activeArea={continent && continent} />
            </div>
          ) : activeType === WORLD_MAP_ITEM.GUIDE ? (
            <div>
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6">
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                  <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">
                    Daily Combo
                  </div>
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                </div>
              </div>
              <div className="flex mt-8 items-center justify-center space-x-3 min-[355px]:space-x-4 xs:space-x-5 2xs:space-x-6">
                <div className="relative drop-shadow-green">
                  <div
                    className={`[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] map-continent_1`}
                  >
                    <div className="relative space-y-2 xs:space-y-2.5">
                      {currentWorldMap
                        ? MAP_CONTINENT_IMAGE(
                            currentWorldMap?.continent?.code,
                            'size-6 xs:size-7 mx-auto'
                          )
                        : null}
                      <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                        {currentWorldMap?.continent?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative drop-shadow-green">
                  <div
                    className={`[--shape:_24px] min-[355px]:[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]`}
                  >
                    <div className="relative space-y-2 xs:space-y-2.5">
                      <Image
                        src={currentWorldMap?.agency?.image || ''}
                        width={0}
                        alt=""
                        height={0}
                        sizes="100vw"
                        className="size-6 xs:size-7 mx-auto"
                      />
                      {/* {MAP_CONTINENT_IMAGE(currentWorldMap?.continent?.code, 'size-6 xs:size-7 mx-auto')} */}
                      <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                        {currentWorldMap?.agency?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative drop-shadow-green">
                  <div
                    className={`[--shape:_24px] min-[355px]:[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]`}
                  >
                    <div className="relative space-y-2 xs:space-y-2.5">
                      <Image
                        src={currentWorldMap?.tool?.image || ''}
                        width={0}
                        alt=""
                        height={0}
                        sizes="100vw"
                        className="size-6 xs:size-7 mx-auto"
                      />
                      {/* <IconMapAntarctica className="size-6 xs:size-7 mx-auto" /> */}
                      <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                        {currentWorldMap?.tool?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="my-4 xs:my-6 2xs:my-8 button-confirm">
            <CustomButton disable={disableAction} title="Confirm" onAction={handleClickModal} />
          </div>
        </div>
      </CustomModal>
      {/* <ModalReward
        isOpen={isOpenReward}
        onOpen={onOpenReward}
        onOpenChange={onOpenChangeReward}
        onCloseModal={handleCloseReward}
        title={worldMapReward?.dailyCombo ? 'daily combo' : 'mission complete'}
        point={formatNumber(worldMapReward?.reward || 0, 0, 0)}
        text={
          worldMapReward?.dailyCombo ? (
            <>
              <p>
                Congratulations. You’ve completed daily combo. This is your reward for hard working.
              </p>
            </>
          ) : (
            <>
              <p>You’ve completed mission.</p>
              <p>This is your reward. Keep going!</p>
            </>
          )
        }
        classNames={{
          wrapper: 'bg-black/80 backdrop-blur-[4px]',
          base: 'bg-transparent backdrop-blur-[unset]'
        }}
      >
        {worldMapReward?.dailyCombo ? (
          <div className="flex items-center justify-center space-x-3 min-[355px]:space-x-4 xs:space-x-5 2xs:space-x-6">
            <div className="relative drop-shadow-green">
              <div
                className={`[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] map-continent_1`}
              >
                <div className="relative space-y-2 xs:space-y-2.5">
                  {MAP_CONTINENT_IMAGE(currentMap?.continent?.code, 'size-6 xs:size-7 mx-auto')}
                  <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                    {currentMap?.continent?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative drop-shadow-green">
              <div
                className={`[--shape:_24px] min-[355px]:[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]`}
              >
                <div className="relative space-y-2 xs:space-y-2.5">
                  <Image
                    src={currentMap?.agency?.image}
                    width={0}
                    alt=""
                    height={0}
                    sizes="100vw"
                    className="size-6 xs:size-7 mx-auto"
                  />
                  <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                    {currentMap?.agency?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative drop-shadow-green">
              <div
                className={`[--shape:_24px] min-[355px]:[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]`}
              >
                <div className="relative space-y-2 xs:space-y-2.5">
                  <Image
                    src={currentMap?.tool?.image}
                    width={0}
                    alt=""
                    height={0}
                    sizes="100vw"
                    className="size-6 xs:size-7 mx-auto"
                  />
                  <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                    {currentMap?.tool?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </ModalReward> */}
    </>
  )
}
