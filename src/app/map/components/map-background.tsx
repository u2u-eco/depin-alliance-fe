import { Feature, Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import 'ol/ol.css'
import { useEffect } from 'react'
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
import { RLayerTile, RLayerVector, RMap } from 'rlayers'
const points = [
  [139.6503, 35.6762],
  [126.978, 37.5665]
]
export default function MapBackground() {
  const osmLayer = new TileLayer({
    source: new XYZ({
      url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw'
      // url: 'https://depinscan-tiler.b-cdn.net/tiles/v3/{z}/{x}/{y}.pbf?key=9nAM1bpiwU6LxmYj6gxR',
    })
  })
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
      initial={{ center: fromLonLat([87.6167, 43.8333]), zoom: 11 }}
    >
      <RLayerVector
        properties={{ label: 'OpenTopo' }}
        url="'https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw'"
        attributions=""
      />
    </RMap>
  )
}
