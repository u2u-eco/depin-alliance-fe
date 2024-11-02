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
import { useTourGuideContext } from '@/contexts/tour.guide.context'
import { useAppSound } from '@/hooks/useAppSound'

export default function MapBackground() {
  const router = useRouter()
  const [init, setInit] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const continent: any = searchParams.get('id')
  const { state: tourState, helpers, setState } = useTourGuideContext()
  const [centers, setCenters] = useState<Array<number>>([])
  const { listWorldMapByContinent, currentMap } = useContext(WorldMapContext)
  const popup = currentMap?.results.map(() => createRef())
  const feature: any = currentMap?.results.map(() => createRef())
  const currentPopup = useRef<any>(null)
  const { buttonSound } = useAppSound()
  const [missionActive, setMissionActive] = useState<number>(-1)
  const getLatLon = (latLon: string) => {
    const location: any = latLon.split(',')
    const centers = location?.length > 0 ? [location[1] * 1, location[0] * 1] : []
    return centers
  }

  const handleStartMission = (item: IWorldMapResult) => {
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

  const handleClick = (index: number, e: any) => {
    buttonSound.play()
    if (index === 0) {
      handleNextTour()
    }
    if (currentPopup.current !== index && popup[currentPopup.current]) {
      popup[currentPopup.current]?.current.hide()
    }

    if (missionActive === index) {
      setMissionActive(-1)
    } else {
      currentPopup.current = index
      setMissionActive(index)
    }
    // e.map.getView().fit(e.target.getGeometry().getExtent(), {
    //   duration: 250
    // })
  }

  const handleNextTour = () => {
    if (tourState.tourActive) {
      helpers?.next()
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
        </RMap>
      ) : null}
    </>
  )
}
