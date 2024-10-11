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

const listMap = [
  {
    id: 1,
    row: 'first',
    list: [
      {
        id: 1,
        image: <IconMapEurope className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: 'europe'
      },
      {
        id: 2,
        image: <IconMapAsia className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: 'Asia'
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
        title: 'Africa'
      },
      { id: 4, image: '', title: '', class: '![background:_transparent] pointer-events-none' },
      {
        id: 5,
        image: <IconMapOceania className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: 'Oceania'
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
        title: 'Antarctica'
      },
      {
        id: 7,
        image: <IconMapAmerica className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
        title: 'America'
      }
    ]
  }
]

export default function MapPage() {
  const [activeItem, setActiveItem] = useState(0)
  const router = useRouter()
  const ref = useRef<any>(null)
  const [width, setWidth] = useState(
    window.innerWidth > 480
      ? 424 / 3
      : (window.innerWidth - (window.innerWidth > 425 ? 48 : window.innerWidth > 375 ? 40 : 32)) / 3
  )

  const handleClickItem = (id: number) => {
    setActiveItem(id)
  }

  const handleContinue = () => {
    router.push('/map/detail')
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
                  className={`[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] flex items-center justify-center cursor-pointer transition-background ${el.class} ${activeItem === el.id ? 'bg-gradient text-green-900' : 'bg-[rgba(255,255,255,0.08)] text-green-100'}`}
                  style={{
                    height: `${width + (window.innerWidth > 425 ? 20 : window.innerWidth > 375 ? 16 : 12)}px`,
                    width: `${width}px`
                  }}
                  onClick={() => handleClickItem(el.id)}
                >
                  <div className="space-y-1.5 xs:space-y-2">
                    {el.image}
                    <p
                      className={`font-airnt font-medium text-[10px] xs:text-[11px] 2xs:text-xs !leading-[14px] xs:!leading-[16px] tracking-[1px] ${activeItem === el.id ? 'text-green-900' : 'text-title text-shadow-white'}`}
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
