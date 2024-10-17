import { Feature, Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import 'ol/ol.css'
import { useEffect, useState } from 'react'
import { XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import { Point } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Circle from 'ol/style/Circle'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import Text from 'ol/style/Text'
import Style from 'ol/style/Style'
import { RFeature, RLayerTile, RLayerVector, RMap, ROverlay } from 'rlayers'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { IconClose, IconContribute } from '@/app/components/icons'
import CustomButton from '@/app/components/button'
const points = [
  [139.6503, 35.6762],
  [126.978, 37.5665]
]
export default function MapBackground() {
  const [isOpenPop, setIsOpenPop] = useState(false)
  const [activePoint, setActivePoint] = useState<any>()
  const handleActivePoint = () => {
    setActivePoint(true)
  }
  // function pointStyleFunction(feature: any, resolution: any) {
  //   // const _text: string = listPointById[feature.ol_uid] && textOfPoint[listPointById[feature.ol_uid].toString()] > 1 ? textOfPoint[listPointById[feature.ol_uid].toString()].toString() : ''
  //   return new Style({
  //     image: new Circle({
  //       radius: 9,
  //       fill: new Fill({ color: 'rgba(255, 0, 0, 0.1)' }),
  //       stroke: new Stroke({ color: 'white', width: 2 })
  //     }),
  //     text: new Text({ text: 'HH' }) //createTextStyle(feature, resolution, myDom.points),
  //   })
  // }
  // useEffect(() => {
  //   const newPoints = points?.map((item: any) => {
  //     const _point = fromLonLat(item)
  //     // listPointFromLonLat[_point.toString()] = item
  //     const feature: any = new Feature(new Point(_point))
  //     // listPointById[feature.ol_uid] = item.location
  //     return feature
  //   })
  //   const osmLayer = new TileLayer({
  //     source: new XYZ({
  //       url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw'
  //       // url: 'https://depinscan-tiler.b-cdn.net/tiles/v3/{z}/{x}/{y}.pbf?key=9nAM1bpiwU6LxmYj6gxR',
  //     })
  //   })
  //   const map = new Map({
  //     target: 'map',
  //     layers: [
  //       osmLayer,
  //       new VectorLayer({
  //         source: new VectorSource({
  //           features: newPoints
  //         }),
  //         style: pointStyleFunction
  //       })
  //     ],
  //     view: new View({
  //       center: fromLonLat([87.6167, 43.8333]), //[43.8333, 87.6167],
  //       zoom: 0
  //     })
  //   })
  //   return () => map.setTarget(undefined)
  // }, [points])
  return (
    <RMap
      width={'100%'}
      height={'100vh'}
      initial={{ center: fromLonLat([87.6167, 43.8333]), zoom: 0 }}
    >
      <RLayerTile
        properties={{ label: 'Transport' }}
        url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw"
      />
      <RLayerVector zIndex={10}>
        <RFeature<Point>
          style={
            new Style({
              fill: new Fill({ color: 'transparent' })
            })
          }
          geometry={new Point(fromLonLat([139.6503, 35.6762]))}
        >
          <ROverlay className="no-interaction">
            <div className="relative flex-1 top-[-10px] left-[-49px]">
              <Popover
                classNames={{
                  trigger: 'aria-expanded:scale-[1] aria-expanded:opacity-100',
                  content: 'p-0 rounded-none bg-transparent shadow-none'
                }}
                isOpen={isOpenPop}
                onOpenChange={(open) => setIsOpenPop(open)}
                placement="right-start"
              >
                <PopoverTrigger>
                  <div
                    className="space-y-2 xs:space-y-3 2xs:space-y-4 cursor-pointer text-center w-fit"
                    onClick={handleActivePoint}
                  >
                    <div
                      className={`relative mx-auto size-5 xs:size-6 rotate-45 border-2 border-green-700 transition-all ${activePoint ? 'bg-white/10' : ''}`}
                    >
                      <div
                        className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${activePoint ? 'opacity-100' : ''}`}
                      ></div>
                    </div>
                    <p className="font-airnt font-medium text-[10px] xs:text-[11px] 2xs:text-xs !leading-[16px] tracking-[1px] uppercase">
                      MISSION 01
                    </p>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="relative max-w-[245px] border-[0.5px] border-yellow-300/25 px-4 py-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:bg-[linear-gradient(to_top,#000,#626516)] before:opacity-[0.86]">
                    <div className="[--size:_5px] pointer-events-none absolute top-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:top-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-t before:border-t-yellow-500 after:content-[''] after:absolute after:top-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-t after:border-t-yellow-500"></div>
                    <div className="space-y-3 xs:space-y-4 relative">
                      <div className="flex justify-between">
                        <IconContribute className="size-6 xs:size-7 2xs:size-8 text-white" />
                        <div
                          className="cursor-pointer text-body hover:text-title transition-colors"
                          onClick={() => setIsOpenPop(false)}
                        >
                          <IconClose className="size-4" />
                        </div>
                      </div>
                      <div className="space-y-4 xs:space-y-5 2xs:space-y-6">
                        <div className="space-y-2 xs:space-y-2.5 2xs:space-y-3">
                          <p className="font-airnt text-title text-shadow-white font-medium text-base !leading-[22px] tracking-[1px] uppercase">
                            shanghai
                          </p>
                          <p className="text-sm !leading-[18px] tracking-[-1px] text-body">
                            Contribute your wasted items to League to increase League’s profit.
                            Contribute your wasted items to League to increase League’s.
                          </p>
                        </div>
                        <CustomButton title="START MISSION" />
                      </div>
                    </div>
                    <div className="[--size:_5px] pointer-events-none absolute bottom-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-b before:border-b-yellow-500 after:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-b after:border-b-yellow-500"></div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ROverlay>
        </RFeature>
        <RFeature<Point>
          style={
            new Style({
              fill: new Fill({ color: 'transparent' })
            })
          }
          geometry={new Point(fromLonLat([126.978, 37.5665]))}
        >
          <ROverlay className="no-interaction">
            <div className="relative flex-1 top-[-10px] left-[-49px]">
              <Popover
                classNames={{
                  trigger: 'aria-expanded:scale-[1] aria-expanded:opacity-100',
                  content: 'p-0 rounded-none bg-transparent shadow-none'
                }}
                isOpen={isOpenPop}
                onOpenChange={(open) => setIsOpenPop(open)}
                placement="right-start"
              >
                <PopoverTrigger>
                  <div
                    className="space-y-2 xs:space-y-3 2xs:space-y-4 cursor-pointer text-center w-fit"
                    onClick={handleActivePoint}
                  >
                    <div
                      className={`relative mx-auto size-5 xs:size-6 rotate-45 border-2 border-green-700 transition-all ${activePoint ? 'bg-white/10' : ''}`}
                    >
                      <div
                        className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${activePoint ? 'opacity-100' : ''}`}
                      ></div>
                    </div>
                    <p className="font-airnt font-medium text-[10px] xs:text-[11px] 2xs:text-xs !leading-[16px] tracking-[1px] uppercase">
                      MISSION 02
                    </p>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="relative max-w-[245px] border-[0.5px] border-yellow-300/25 px-4 py-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:bg-[linear-gradient(to_top,#000,#626516)] before:opacity-[0.86]">
                    <div className="[--size:_5px] pointer-events-none absolute top-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:top-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-t before:border-t-yellow-500 after:content-[''] after:absolute after:top-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-t after:border-t-yellow-500"></div>
                    <div className="space-y-3 xs:space-y-4 relative">
                      <div className="flex justify-between">
                        <IconContribute className="size-6 xs:size-7 2xs:size-8 text-white" />
                        <div
                          className="cursor-pointer text-body hover:text-title transition-colors"
                          onClick={() => setIsOpenPop(false)}
                        >
                          <IconClose className="size-4" />
                        </div>
                      </div>
                      <div className="space-y-4 xs:space-y-5 2xs:space-y-6">
                        <div className="space-y-2 xs:space-y-2.5 2xs:space-y-3">
                          <p className="font-airnt text-title text-shadow-white font-medium text-base !leading-[22px] tracking-[1px] uppercase">
                            shanghai
                          </p>
                          <p className="text-sm !leading-[18px] tracking-[-1px] text-body">
                            Contribute your wasted items to League to increase League’s profit.
                            Contribute your wasted items to League to increase League’s.
                          </p>
                        </div>
                        <CustomButton title="START MISSION" />
                      </div>
                    </div>
                    <div className="[--size:_5px] pointer-events-none absolute bottom-0 left-0 right-0 w-full h-1 before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] before:size-[var(--size)] before:border-l before:border-l-yellow-500 before:border-b before:border-b-yellow-500 after:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:size-[var(--size)] after:border-r after:border-r-yellow-500 after:border-b after:border-b-yellow-500"></div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ROverlay>
        </RFeature>
      </RLayerVector>
    </RMap>
  )
}
