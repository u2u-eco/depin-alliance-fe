import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import { useEffect } from 'react'
import { XYZ } from 'ol/source'

export default function MapBackground() {
  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVydGVydHJhbiIsImEiOiJjbHk0YW5lMDMwMGtnMmxyMGQ1dGhmamFpIn0.Etde0_5OVh8EfEGzuZgWfw'
        // url: 'https://depinscan-tiler.b-cdn.net/tiles/v3/{z}/{x}/{y}.pbf?key=9nAM1bpiwU6LxmYj6gxR',
      })
    })
    const map = new Map({
      target: 'map',
      layers: [osmLayer],
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    })
    return () => map.setTarget(undefined)
  }, [])
  return <div id="map" style={{ width: '100%', height: 'calc(100vh - 110px)' }}></div>
}
