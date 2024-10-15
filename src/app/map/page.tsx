'use client'

import React, { useEffect, useRef, useState } from 'react'
import CustomPage from '../components/custom-page'
import { CustomHeader } from '../components/ui/custom-header'
import {
  IconMapAfrica,
  IconMapAmerica,
  IconMapAntarctica,
  IconMapAsia,
  IconMapEurope,
  IconMapOceania
} from '../components/icons'
import { useRouter } from 'next/navigation'
import { useAppSound } from '@/hooks/useAppSound'
import { MAP_TYPE } from '@/constants'

const listMap = [
  {
    id: 1,
    row: 'first',
    list: [
      {
        id: 1,
        image: <IconMapEurope className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.EUROPE,
        class:
          'before:[clip-path:_polygon(calc(50%_+_var(--line)*2)_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_calc(var(--shape)_+_var(--line)));]'
      },
      {
        id: 2,
        image: <IconMapAsia className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.ASIA,
        class:
          'before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]'
      }
    ]
  },
  {
    id: 1,
    row: 'second',
    list: [
      {
        id: 3,
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
        id: 5,
        image: <IconMapOceania className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.OCEANIA,
        class:
          'before:[clip-path:_polygon(50%_0,calc(100%_-_var(--line))_calc(var(--shape)_-_var(--line)/2),calc(100%_-_var(--line))_calc(100%_-_(var(--shape)_-_var(--line)/2)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]'
      }
    ]
  },
  {
    id: 1,
    row: 'third',
    list: [
      {
        id: 6,
        image: <IconMapAntarctica className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.ANTARCTICA,
        class:
          'before:[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),calc(50%_+_var(--line)*2)_100%,0_calc(100%_-_var(--shape)_-_var(--line)),0_var(--shape));]'
      },
      {
        id: 7,
        image: <IconMapAmerica className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: MAP_TYPE.AMERICA,
        class:
          'before:[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)_-_var(--line)),calc(50%_-_var(--line)*2)_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]'
      }
    ]
  }
]

export default function MapPage() {
  const [activeItem, setActiveItem] = useState('')
  const router = useRouter()
  const ref = useRef<any>(null)
  const { buttonSound } = useAppSound()

  const [width, setWidth] = useState(
    window.innerWidth > 480
      ? 424 / 3
      : (window.innerWidth - (window.innerWidth > 425 ? 48 : window.innerWidth > 375 ? 40 : 32)) / 3
  )

  const handleClickItem = (name: string) => {
    buttonSound.play()
    setActiveItem(name)
  }

  const handleContinue = () => {
    buttonSound.play()
    router.push(`/map/detail?type=${activeItem}`)
  }

  useEffect(() => {
    setWidth(ref?.current?.offsetWidth)
    const getwidth = () => {
      setWidth(ref?.current?.offsetWidth)
    }
    window.addEventListener('resize', getwidth)
    return () => window.removeEventListener('resize', getwidth)
  }, [])

  return (
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
      <div className="flex flex-col justify-between space-y-6 h-full">
        <CustomHeader title="WORLD MAP" />
        <div className="[--shape:_28px] xs:[--shape:_32px] 2xs:[--shape:_36px] flex flex-col -space-y-6">
          {listMap.map((item: any) => (
            <div className="flex justify-center space-x-1 xs:space-x-2 2xs:space-x-3" key={item.id}>
              {item.list.map((el: any) => (
                <div
                  key={el.id}
                  ref={ref}
                  className={`relative overflow-hidden [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer transition-background before:[--line:_4px] xs:before:[--line:_8px] 2xs:before:[--line:_12px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-[calc(100%_-_0px)] before:drop-shadow-green ${el.class} ${activeItem === el.title ? 'before:bg-gradient text-green-900' : 'before:bg-[#222222] text-green-100'}`}
                  style={{
                    height: `${width + (window.innerWidth > 425 ? 20 : window.innerWidth > 375 ? 16 : 12)}px`,
                    width: `${width}px`
                  }}
                  onClick={() => handleClickItem(el.title)}
                >
                  <div className="relative space-y-1.5 xs:space-y-2">
                    {el.image}
                    <p
                      className={`font-airnt font-medium text-[10px] xs:text-[11px] 2xs:text-xs !leading-[14px] xs:!leading-[16px] tracking-[1px] uppercase ${activeItem === el.title ? 'text-green-900' : 'text-title text-shadow-white'}`}
                    >
                      {el.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="btn" onClick={handleContinue}>
          <div className="btn-border"></div>
          <div className="btn-primary">CONTINUE</div>
          <div className="btn-border"></div>
        </div>
      </div>
    </CustomPage>
  )
}
