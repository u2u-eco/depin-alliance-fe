'use client'

import React, { useEffect, useRef, useState } from 'react'
import CustomPage from '../components/custom-page'
import { CustomHeader } from '../components/ui/custom-header'

const listMap = []

export default function MapPage() {
  const ref = useRef<any>(null)
  const [width, setWidth] = useState((window.innerWidth - 48) / 3)
  console.log(width)

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
        <div className="[--shape:_36px] [--width:_120px]">
          <div className="flex justify-center space-x-1 xs:space-x-2 2xs:space-x-3">
            <div
              ref={ref}
              className="[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-white/10"
              style={{ height: `${width + 20}px`, width: `${width}px` }}
            ></div>
            <div
              ref={ref}
              className="[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-white/10"
              style={{ height: `${width + 20}px`, width: `${width}px` }}
            ></div>
          </div>
          <div className="flex justify-center space-x-1 xs:space-x-2 2xs:space-x-3 -my-8 xs:-my-7 2xs:-my-6">
            <div
              ref={ref}
              className="[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-white/10"
              style={{ height: `${width + 20}px`, width: `${width}px` }}
            ></div>
            <div
              ref={ref}
              className="[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]"
              style={{ height: `${width + 20}px`, width: `${width}px` }}
            ></div>
            <div
              ref={ref}
              className="[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-white/10"
              style={{ height: `${width + 20}px`, width: `${width}px` }}
            ></div>
          </div>
          <div className="flex justify-center space-x-1 xs:space-x-2 2xs:space-x-3">
            <div
              ref={ref}
              className="[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-white/10"
              style={{ height: `${width + 20}px`, width: `${width}px` }}
            ></div>
            <div
              ref={ref}
              className="[clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-white/10"
              style={{ height: `${width + 20}px`, width: `${width}px` }}
            ></div>
          </div>
        </div>
        <div className="btn">
          <div className="btn-border"></div>
          <div className="btn-primary">CONTINUE</div>
          <div className="btn-border"></div>
        </div>
      </div>
    </CustomPage>
  )
}
