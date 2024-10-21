import 'ol/ol.css'
import { createRef, useContext, useEffect, useRef, useState } from 'react'
import { fromLonLat } from 'ol/proj'
import { Point } from 'ol/geom'
// import Fill from 'ol/style/Fill'
// import Style from 'ol/style/Style'
import { RFeature, RLayerTile, RLayerVector, RMap, ROverlay, RPopup, RStyle } from 'rlayers'
import { IconClose, IconContribute } from '@/app/components/icons'
import CustomButton from '@/app/components/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { WorldMapContext } from '../context/worldmap-context'
import { IWorldMapResult } from '@/interfaces/i.world-map'

export default function MapBackground() {
  const router = useRouter()
  const [init, setInit] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const continent: any = searchParams.get('id')
  const [centers, setCenters] = useState<Array<number>>([])
  const { listWorldMapByContinent, currentMap } = useContext(WorldMapContext)
  const popup = currentMap?.results.map(() => createRef())
  const feature: any = currentMap?.results.map(() => createRef())
  const currentPopup = useRef<any>(null)
  const [missionActive, setMissionActive] = useState<number>(-1)
  const getLatLon = (latLon: string) => {
    const location: any = latLon.split(',')
    const centers = location?.length > 0 ? [location[1] * 1, location[0] * 1] : []
    return centers
  }

  const handleStartMission = (item: IWorldMapResult) => {
    const link = item.isCompleted
      ? '/games/play?type=puzzle'
      : `/games/play?type=puzzle&id=${item.id}`
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
      setCenters([lng, lat])
      setInit(true)
    }, 500)
  }

  const handleClick = (index: number) => {
    if (currentPopup.current !== index && popup[currentPopup.current]) {
      popup[currentPopup.current]?.current.hide()
    }

    if (missionActive === index) {
      setMissionActive(-1)
    } else {
      currentPopup.current = index
      setMissionActive(index)
    }
  }

  useEffect(() => {
    if (currentMap?.results?.length > 0) {
      setInit(false)
      findCenter(currentMap?.results)
    }
  }, [currentMap?.results])

  useEffect(() => {
    if (listWorldMapByContinent[continent] && !currentMap?.results) {
      setInit(false)
      const _centers = getLatLon(listWorldMapByContinent[continent]?.description)
      if (_centers) {
        setTimeout(() => {
          setCenters(_centers)
          setInit(true)
        }, 200)
      }
    }
  }, [listWorldMapByContinent, continent, currentMap])

  return (
    <>
      {centers?.length > 0 && init ? (
        <RMap width={'100%'} height={'100vh'} initial={{ center: fromLonLat(centers), zoom: 2.5 }}>
          <RLayerTile
            properties={{ label: 'Transport' }}
            url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw"
          />
          <RLayerVector zIndex={100}>
            {currentMap?.results?.map((item: IWorldMapResult, index: number) => {
              const point = getLatLon(item?.location)
              return (
                <>
                  <RFeature<Point>
                    key={item.id}
                    ref={feature[index]}
                    geometry={new Point(fromLonLat(point))}
                    onClick={() => {
                      handleClick(index)
                    }}
                  >
                    <RStyle.RStyle
                      render={() => {
                        return (
                          <>
                            <RStyle.RIcon
                              src={
                                missionActive === index || item.isCompleted
                                  ? '/assets/images/icons/icon-check-mission-active.svg'
                                  : '/assets/images/icons/icon-mission-check.svg'
                              }
                              anchor={[0.5, 1.1]}
                            />

                            <RStyle.RText font="10px Airnt" text={item.locationName}>
                              <RStyle.RFill color="#fff"></RStyle.RFill>
                            </RStyle.RText>
                          </>
                        )
                      }}
                    />

                    <RPopup ref={popup[index]} trigger={'click'} className="example-overlay">
                      <div className="relative min-w-[200px] max-w-[245px] border-[0.5px] border-yellow-300/25 px-4 py-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:bg-[linear-gradient(to_top,#000,#626516)] before:opacity-[0.86]">
                        <div className="[--size:_5px] pointer-events-none absolute top-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:top-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-t before:border-t-yellow-500 after:content-[''] after:absolute after:top-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-t after:border-t-yellow-500"></div>
                        <div className="space-y-3 xs:space-y-4 relative">
                          <div className="flex justify-between">
                            <IconContribute className="size-6 xs:size-7 2xs:size-8 text-white" />
                            <div
                              className="cursor-pointer text-body hover:text-title transition-colors"
                              onClick={() => {
                                popup[index]?.current.hide()
                                setMissionActive(-1)
                              }}
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
                              title={item.isCompleted ? 'PLAY' : 'START MISSION'}
                            />
                          </div>
                        </div>
                        <div className="[--size:_5px] pointer-events-none absolute bottom-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-b before:border-b-yellow-500 after:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-b after:border-b-yellow-500"></div>
                      </div>
                    </RPopup>
                    {/* <ROverlay className="no-interaction pointer-events-none">
                      <div className="relative flex-1 top-[-10px] left-[-49px]">
                        <Popover
                          classNames={{
                            trigger: 'aria-expanded:scale-[1] aria-expanded:opacity-100',
                            content: 'p-0 rounded-none bg-transparent shadow-none'
                          }}
                          isOpen={isOpenPop[item.id]}
                          onOpenChange={(open) => handleOpenPopover(item.id, open)}
                          // placement="right-start"
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
                            <div className="relative min-w-[200px] max-w-[245px] border-[0.5px] border-yellow-300/25 px-4 py-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:bg-[linear-gradient(to_top,#000,#626516)] before:opacity-[0.86]">
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
                                      Contribute your wasted items to League to increase League’s
                                      profit. Contribute your wasted items to League to increase
                                      League’s.
                                    </p>
                                  </div>
                                  <CustomButton
                                    onAction={() => {
                                      handleStartMission(item)
                                    }}
                                    title={item.isCompleted ? 'PLAY' : 'START MISSION'}
                                  />
                                </div>
                              </div>
                              <div className="[--size:_5px] pointer-events-none absolute bottom-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-b before:border-b-yellow-500 after:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-b after:border-b-yellow-500"></div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </ROverlay> */}
                  </RFeature>
                </>
              )
            })}
          </RLayerVector>
        </RMap>
      ) : null}
    </>
  )
}
