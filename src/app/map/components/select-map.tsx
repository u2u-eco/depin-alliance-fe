import {
  IconMapAfrica,
  IconMapAmerica,
  IconMapAntarctica,
  IconMapAsia,
  IconMapEurope,
  IconMapNorthAmerica,
  IconMapOceania,
  IconMapSouthAmerica
} from '@/app/components/icons'
import { MAP_TYPE } from '@/constants'
import { useAppSound } from '@/hooks/useAppSound'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { WorldMapContext } from '../context/worldmap-context'
import { useTourGuideContext } from '@/contexts/tour.guide.context'

interface MapProps {
  activeArea?: string
}

const listMapConfig = [
  {
    id: 1,
    row: 'first',
    list: [
      {
        id: 'continent_6',
        image: <IconMapEurope className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.EUROPE,
        class:
          'before:[clip-path:_polygon(calc(50%_+_var(--line)*2)_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_calc(var(--shape)_+_var(--line)));]'
      },
      {
        id: 'continent_1',
        image: <IconMapAsia className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.ASIA,
        class:
          'before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] map-asia'
      }
    ]
  },
  {
    id: 2,
    row: 'second',
    list: [
      {
        id: 'continent_5',
        image: <IconMapAfrica className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.AFRICA,
        class:
          'before:[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,var(--line)_calc(100%_-_(var(--shape)_-_var(--line)/2)),var(--line)_calc(var(--shape)_-_var(--line)/2));]'
      },
      {
        id: 4,
        image: '',
        title: '',
        class: '![background:_transparent] pointer-events-none opacity-0 invisible'
      },
      {
        id: 'continent_2',
        image: <IconMapOceania className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.OCEANIA,
        class:
          'before:[clip-path:_polygon(50%_0,calc(100%_-_var(--line))_calc(var(--shape)_-_var(--line)/2),calc(100%_-_var(--line))_calc(100%_-_(var(--shape)_-_var(--line)/2)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]'
      }
    ]
  },
  {
    id: 3,
    row: 'third',
    list: [
      {
        id: 'continent_4',
        image: <IconMapNorthAmerica className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.NORTH_AMERICA,
        class:
          'before:[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),calc(50%_+_var(--line)*2)_100%,0_calc(100%_-_var(--shape)_-_var(--line)),0_var(--shape));]'
      },
      {
        id: 'continent_3',
        image: <IconMapSouthAmerica className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.SOUTH_AMERICA,
        class:
          'before:[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)_-_var(--line)),calc(50%_-_var(--line)*2)_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]'
      }
    ]
  }
]

const SelectMap = ({ activeArea }: MapProps) => {
  const [activeItem, setActiveItem] = useState('')
  const ref = useRef<any>(null)
  const firstInit = useRef<boolean>(false)
  const { buttonSound } = useAppSound()
  const { setContinent } = useContext(WorldMapContext)
  const { state: tourState, setState, helpers } = useTourGuideContext()
  const [width, setWidth] = useState(
    window.innerWidth > 480
      ? 424 / 3
      : (window.innerWidth - (window.innerWidth > 425 ? 48 : window.innerWidth > 375 ? 40 : 32)) / 3
  )

  const handleClickItem = (name: string) => {
    buttonSound.play()
    setActiveItem(name)
    setContinent(name)
    if (tourState.tourActive && tourState.stepIndex === 2) {
      helpers?.next()
    }
  }

  useEffect(() => {
    setWidth(ref?.current?.offsetWidth)
    const getwidth = () => {
      setWidth(ref?.current?.offsetWidth)
    }
    window.addEventListener('resize', getwidth)
    return () => window.removeEventListener('resize', getwidth)
  }, [])

  useEffect(() => {
    if (activeArea && !firstInit.current) {
      firstInit.current = true
      setActiveItem(activeArea)
    }
  }, [activeItem])

  return (
    <div className="[--shape:_28px] xs:[--shape:_32px] 2xs:[--shape:_36px] flex flex-col -space-y-6">
      {listMapConfig?.map((item: any) => (
        <div className="flex justify-center space-x-1 xs:space-x-2 2xs:space-x-3" key={item.id}>
          {item.list.map((el: any) => (
            <div
              key={el.id}
              ref={ref}
              className={`relative overflow-hidden [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer transition-background before:[--line:_4px] xs:before:[--line:_8px] 2xs:before:[--line:_12px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-[calc(100%_-_0px)] before:drop-shadow-green ${el.class} ${activeItem === el.id ? 'before:bg-gradient text-green-900' : 'before:bg-[#222222] text-green-100'}`}
              style={{
                height: `${width + (window.innerWidth > 425 ? 20 : window.innerWidth > 375 ? 16 : 12)}px`,
                width: `${width}px`
              }}
              onClick={() => handleClickItem(el.id)}
            >
              <div className="relative space-y-1.5 xs:space-y-2">
                {el.image}
                <p
                  className={`font-airnt font-medium text-[10px] xs:text-[11px] 2xs:text-xs !leading-[14px] xs:!leading-[16px] min-h-[14px] xs:min-h-[16px] tracking-[1px] uppercase text-center ${activeItem === el.id ? 'text-green-900' : 'text-title text-shadow-white'}`}
                >
                  {el.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SelectMap
