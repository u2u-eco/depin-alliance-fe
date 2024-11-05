import 'ol/ol.css'
import { useContext, useEffect, useRef, useState } from 'react'
// import { fromLonLat } from 'ol/proj'
// import { Point } from 'ol/geom'
// import Fill from 'ol/style/Fill'
// import Style from 'ol/style/Style'
// import { RFeature, RLayerTile, RLayerVector, RMap, ROverlay, RPopup, RStyle } from 'rlayers'
import { IconClose, IconContribute } from '@/app/components/icons'
import CustomButton from '@/app/components/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { WorldMapContext } from '../context/worldmap-context'
import { IWorldMapResult } from '@/interfaces/i.world-map'
import { useTourGuideContext } from '@/contexts/tour.guide.context'
import { useAppSound } from '@/hooks/useAppSound'
import { DEPIN_MAP_CLAIM } from '@/constants'
import { getCurrentTime } from '@/helper/common'
import ClaimGame from '@/app/games/components/claim-game'
import { Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react'
import { endWorldMap, getWorldMap } from '@/services/world-map'
import useWorldMapStore from '@/stores/worldMapStore'
import useCommonStore from '@/stores/commonStore'
import { Map, Marker, Overlay } from 'pigeon-maps'

export default function MapTest() {
  const router = useRouter()
  const {
    isOpen: isOpenReward,
    onOpen: onOpenReward,
    onOpenChange: onOpenChangeReward,
    onClose: onCloseReward
  } = useDisclosure()
  const { userInfo } = useCommonStore()
  const { setCurrentWorldMap, currentWorldMap, setWorldMapReward } = useWorldMapStore()
  const [init, setInit] = useState<boolean>(false)
  const [isOpenPop, setOpenPop] = useState<any>({})
  const searchParams = useSearchParams()
  const continent: any = searchParams.get('id')
  const { state: tourState, helpers, setState } = useTourGuideContext()
  const [completeById, setCompleteById] = useState<{ [key: string]: string }>({})
  const [centers, setCenters] = useState<any>([])
  const { listWorldMapByContinent } = useContext(WorldMapContext)
  // const popup: any = currentWorldMap?.results.map(() => createRef())
  // const feature: any = currentWorldMap?.results.map(() => createRef())
  // const currentPopup = useRef<any>(null)
  const { buttonSound } = useAppSound()
  // const [missionActive, setMissionActive] = useState<number>(-1)
  const getLatLon = (latLon: string) => {
    const location: any = latLon.split(',')
    const centers: any = location?.length > 0 ? [location[0] * 1, location[1] * 1] : []
    return centers
  }

  const handleClaim = async (id: any) => {
    const res = await endWorldMap(id)
    if (res.status) {
      setWorldMapReward(res.data)
      onOpenReward()
    }
  }

  const handleStartMission = (item: IWorldMapResult) => {
    if (!item.isCompleted && completeById[item.id]) {
      handleClaim(item.id)
      return
    }
    const link = item.isCompleted
      ? `/games/play?type=${item.type}`
      : `/games/play?type=${item.type}&id=${item.id}`
    router.push(link)
  }

  function findCenter(markers: any) {
    let lat = 0
    let lng = 0

    for (let i = 0; i < markers.length; ++i) {
      const latLng = getLatLon(markers[i].location)
      lat += latLng[1]
      lng += latLng[0]
    }

    lat /= markers.length
    lng /= markers.length
    setTimeout(() => {
      console.log([lng, lat])
      setCenters([lng, lat])
      setInit(true)
    }, 500)
  }

  const _getWorldMap = async () => {
    const res = await getWorldMap()
    if (res.status) {
      setCurrentWorldMap(res.data)
    }
  }
  const handleCloseReward = () => {
    _getWorldMap()
    onCloseReward()
  }

  // const handleClick = (index: number, e: any) => {
  //   buttonSound.play()
  //   if (index === 0) {
  //     handleNextTour()
  //   }
  //   if (currentPopup.current !== index && popup[currentPopup.current]) {
  //     popup[currentPopup.current]?.current.hide()
  //   }

  //   if (missionActive === index) {
  //     setMissionActive(-1)
  //   } else {
  //     currentPopup.current = index
  //     setMissionActive(index)
  //   }
  //   // e.map.getView().fit(e.target.getGeometry().getExtent(), {
  //   //   duration: 250
  //   // })
  // }

  const handleNextTour = () => {
    if (tourState.tourActive) {
      helpers?.next()
    }
  }

  const getDataClaim = () => {
    const time = getCurrentTime()
    let dataClaimStr: any = localStorage.getItem(DEPIN_MAP_CLAIM)
    if (dataClaimStr) {
      let dataClaim = JSON.parse(dataClaimStr)
      if (userInfo?.code && dataClaim[time]?.[userInfo.code]) {
        setCompleteById(dataClaim[time][userInfo.code])
      }
    }
  }

  useEffect(() => {
    if (currentWorldMap && currentWorldMap.results?.length > 0) {
      setInit(false)

      findCenter(currentWorldMap?.results)
    }
  }, [currentWorldMap?.results])

  useEffect(() => {
    if (listWorldMapByContinent[continent] && !currentWorldMap?.results) {
      setInit(false)
      const _centers = getLatLon(listWorldMapByContinent[continent]?.description)
      if (_centers) {
        setTimeout(() => {
          setCenters(_centers)
          setInit(true)
        }, 200)
      }
    }
  }, [listWorldMapByContinent, continent, currentWorldMap])

  function mapTiler(x: any, y: any, z: any, dpr: any) {
    return `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw`
  }

  const handleOpenPopover = (id: any, isOpen: boolean) => {
    buttonSound.play()
    setOpenPop({
      [id]: isOpen
    })
  }

  useEffect(() => {
    getDataClaim()
  }, [])

  return (
    <div className="map-pigeon w-full h-full">
      <Map defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
        <Marker width={50} anchor={[50.879, 4.6997]} />
      </Map>
      {/* {centers?.length > 0 && init ? (
        <Map defaultZoom={3} provider={mapTiler} defaultCenter={centers} twoFingerDrag>
          {currentWorldMap?.results?.map((item: IWorldMapResult, index: number) => {
            const point = getLatLon(item?.location)
            return (
              <Overlay key={item.id} anchor={point}>
                <div className="relative flex-1 top-[-10px] left-[-49px]">
                  <Popover
                    classNames={{
                      trigger: 'aria-expanded:scale-[1] aria-expanded:opacity-100',
                      content: 'p-0 rounded-none bg-transparent shadow-none'
                    }}
                    isOpen={isOpenPop[item.id] || false}
                    onOpenChange={(open) => handleOpenPopover(item.id, open)}
                    placement="right-start"
                  >
                    <PopoverTrigger>
                      <div className="space-y-2 xs:space-y-3 2xs:space-y-4 cursor-pointer text-center w-fit">
                        <div
                          className={`relative mx-auto size-4 xs:size-5 2xs:size-6 rotate-45 border-2 border-green-700 transition-all ${isOpenPop[item.id] || item.isCompleted ? 'bg-white/10' : ''}`}
                        >
                          <div
                            className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${isOpenPop[item.id] || item.isCompleted ? 'opacity-100' : ''}`}
                          ></div>
                        </div>
                        <p className="font-airnt font-medium text-[10px] xs:text-[11px] 2xs:text-xs !leading-[16px] tracking-[1px] uppercase">
                          {item.locationName}
                        </p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="relative min-w-[245px] max-w-[245px] border-[0.5px] border-yellow-300/25 px-4 py-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:bg-[linear-gradient(to_top,#000,#626516)] before:opacity-[0.86]">
                        <div className="[--size:_5px] pointer-events-none absolute top-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:top-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-t before:border-t-yellow-500 after:content-[''] after:absolute after:top-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-t after:border-t-yellow-500"></div>
                        <div className="space-y-3 xs:space-y-4 relative">
                          <div className="flex justify-between">
                            <IconContribute className="size-6 xs:size-7 2xs:size-8 text-white" />
                            <div
                              className="cursor-pointer text-body hover:text-title transition-colors"
                              onClick={() => handleOpenPopover(item.id, false)}
                            >
                              <IconClose className="size-4" />
                            </div>
                          </div>
                          <div className="space-y-4 xs:space-y-5 2xs:space-y-6">
                            <div className="space-y-2 xs:space-y-2.5 2xs:space-y-3">
                              <p className="font-airnt text-title text-shadow-white font-medium text-base !leading-[22px] tracking-[1px] uppercase">
                                {item.locationName}
                              </p>
                              <p className="text-sm !leading-[18px] tracking-[-1px] text-body">
                                Contribute your wasted items to League to increase League’s profit.
                                Contribute your wasted items to League to increase League’s.
                              </p>
                            </div>
                            <CustomButton
                              onAction={() => {
                                handleStartMission(item)
                              }}
                              title={
                                item.isCompleted
                                  ? 'PLAY'
                                  : completeById[item.id]
                                    ? 'CLAIM'
                                    : 'START MISSION'
                              }
                            />
                          </div>
                        </div>
                        <div className="[--size:_5px] pointer-events-none absolute bottom-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-b before:border-b-yellow-500 after:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-b after:border-b-yellow-500"></div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </Overlay>
            )
          })}
        </Map>
      ) : null} */}
      <ClaimGame
        isOpen={isOpenReward}
        onOpen={onOpenReward}
        onOpenChange={onOpenChangeReward}
        onCloseModal={handleCloseReward}
      />
    </div>
  )
}

// <RMap width={'100%'} height={'100vh'} initial={{ center: fromLonLat(centers), zoom: 2.5 }}>
//   <RLayerTile
//     properties={{ label: 'Transport' }}
//     url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw"
//   />
//   <RLayerVector zIndex={100}>
//     {currentWorldMap?.results?.map((item: IWorldMapResult, index: number) => {
//       const point = getLatLon(item?.location)
//       return (
//         <RFeature<Point>
//           key={item.id}
//           ref={feature[index]}
//           geometry={new Point(fromLonLat(point))}
//           onClick={(event: any) => {
//             handleClick(index, event)
//           }}
//         >
//           {index === 0 && (
//             <ROverlay
//             // className="no-interaction pointer-events-none "
//             >
//               <div className="overlay-1 relative flex-1 top-[-20px]"></div>
//             </ROverlay>
//           )}
//           <RStyle.RStyle
//             render={() => {
//               return (
//                 <>
//                   <RStyle.RIcon
//                     src={
//                       missionActive === index || item.isCompleted
//                         ? '/assets/images/icons/icon-check-mission-active.svg'
//                         : '/assets/images/icons/icon-mission-check.svg'
//                     }
//                     anchor={[0.5, 1.1]}
//                   />

//                   <RStyle.RText font="10px Airnt" text={item.locationName}>
//                     <RStyle.RFill color="#fff"></RStyle.RFill>
//                   </RStyle.RText>
//                 </>
//               )
//             }}
//           />

//           <RPopup autoPan ref={popup[index]} trigger={'click'} className="example-overlay">
//             <div className="relative min-w-[200px] max-w-[245px] border-[0.5px] border-yellow-300/25 px-4 py-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:bg-[linear-gradient(to_top,#000,#626516)] before:opacity-[0.86]">
//               <div className="[--size:_5px] pointer-events-none absolute top-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:top-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-t before:border-t-yellow-500 after:content-[''] after:absolute after:top-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-t after:border-t-yellow-500"></div>
//               <div className="space-y-3 xs:space-y-4 relative">
//                 <div className="flex justify-between">
//                   <IconContribute className="size-6 xs:size-7 2xs:size-8 text-white" />
//                   <div
//                     className="cursor-pointer text-body hover:text-title transition-colors"
//                     onClick={() => {
//                       buttonSound.play()
//                       popup[index]?.current.hide()
//                       setMissionActive(-1)
//                     }}
//                   >
//                     <IconClose className="size-4" />
//                   </div>
//                 </div>
//                 <div className="space-y-4 xs:space-y-5 2xs:space-y-6">
//                   <div className="space-y-2 xs:space-y-2.5 2xs:space-y-3">
//                     <p className="font-airnt text-title text-shadow-white font-medium text-base !leading-[22px] tracking-[1px] uppercase">
//                       {item.locationName}
//                     </p>
//                     <p className="text-sm !leading-[18px] tracking-[-1px] text-body">
//                       Contribute your wasted items to League to increase League’s profit.
//                       Contribute your wasted items to League to increase League’s.
//                     </p>
//                   </div>
//                   <CustomButton
//                     onAction={() => {
//                       handleStartMission(item)
//                     }}
//                     title={
//                       item.isCompleted
//                         ? 'PLAY'
//                         : completeById[item.id]
//                           ? 'CLAIM'
//                           : 'START MISSION'
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="[--size:_5px] pointer-events-none absolute bottom-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-b before:border-b-yellow-500 after:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-b after:border-b-yellow-500"></div>
//             </div>
//           </RPopup>

//           {/* <ROverlay className="no-interaction pointer-events-none">
//               <div className="relative flex-1 top-[-10px] left-[-49px]">
//                 <Popover
//                   classNames={{
//                     trigger: 'aria-expanded:scale-[1] aria-expanded:opacity-100',
//                     content: 'p-0 rounded-none bg-transparent shadow-none'
//                   }}
//                   isOpen={isOpenPop[item.id]}
//                   onOpenChange={(open) => handleOpenPopover(item.id, open)}
//                   // placement="right-start"
//                 >
//                   <PopoverTrigger>
//                     <div className="space-y-2 xs:space-y-3 2xs:space-y-4 cursor-pointer text-center w-fit">
//                       <div
//                         className={`relative mx-auto size-4 xs:size-5 2xs:size-6 rotate-45 border-2 border-green-700 transition-all ${isOpenPop[item.id] || item.isCompleted ? 'bg-white/10' : ''}`}
//                       >
//                         <div
//                           className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${isOpenPop[item.id] || item.isCompleted ? 'opacity-100' : ''}`}
//                         ></div>
//                       </div>
//                       <p className="font-airnt font-medium text-[10px] xs:text-[11px] 2xs:text-xs !leading-[16px] tracking-[1px] uppercase">
//                         {item.locationName}
//                       </p>
//                     </div>
//                   </PopoverTrigger>
//                   <PopoverContent>
//                     <div className="relative min-w-[200px] max-w-[245px] border-[0.5px] border-yellow-300/25 px-4 py-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:bg-[linear-gradient(to_top,#000,#626516)] before:opacity-[0.86]">
//                       <div className="[--size:_5px] pointer-events-none absolute top-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:top-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-t before:border-t-yellow-500 after:content-[''] after:absolute after:top-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-t after:border-t-yellow-500"></div>
//                       <div className="space-y-3 xs:space-y-4 relative">
//                         <div className="flex justify-between">
//                           <IconContribute className="size-6 xs:size-7 2xs:size-8 text-white" />
//                           <div
//                             className="cursor-pointer text-body hover:text-title transition-colors"
//                             onClick={() => handleOpenPopover(item.id, false)}
//                           >
//                             <IconClose className="size-4" />
//                           </div>
//                         </div>
//                         <div className="space-y-4 xs:space-y-5 2xs:space-y-6">
//                           <div className="space-y-2 xs:space-y-2.5 2xs:space-y-3">
//                             <p className="font-airnt text-title text-shadow-white font-medium text-base !leading-[22px] tracking-[1px] uppercase">
//                               {item.locationName}
//                             </p>
//                             <p className="text-sm !leading-[18px] tracking-[-1px] text-body">
//                               Contribute your wasted items to League to increase League’s
//                               profit. Contribute your wasted items to League to increase
//                               League’s.
//                             </p>
//                           </div>
//                           <CustomButton
//                             onAction={() => {
//                               handleStartMission(item)
//                             }}
//                             title={item.isCompleted ? 'PLAY' : 'START MISSION'}
//                           />
//                         </div>
//                       </div>
//                       <div className="[--size:_5px] pointer-events-none absolute bottom-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-b before:border-b-yellow-500 after:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-b after:border-b-yellow-500"></div>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             </ROverlay> */}
//         </RFeature>
//       )
//     })}
//   </RLayerVector>
// </RMap>
