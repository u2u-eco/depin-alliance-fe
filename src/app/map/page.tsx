'use client'

import CustomPage from '@/app/components/custom-page'

import { CustomHeader } from '@/app/components/ui/custom-header'
import React from 'react'
import { motion } from 'framer-motion'

import MapBackground from './components/map-background'

import WorldMapProvider from './context/worldmap-context'
import MapContainer from './container'

export default function Page() {
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[1] before:pointer-events-none",
          container: 'h-full',
          animate:
            '[--space:_40px] xs:[--space:_48px] 2xs:[--space:_56px] h-[calc(100%_-_var(--space))]',
          base: 'h-full'
        }}
      >
        <WorldMapProvider>
          <div className="absolute top-0 left-0 right-0 size-full">
            <MapBackground></MapBackground>
          </div>
          <div className=" flex flex-col justify-between space-y-6 h-full">
            <CustomHeader title="World Map" />
            <MapContainer />
          </div>
        </WorldMapProvider>
      </CustomPage>
    </>
  )
}
