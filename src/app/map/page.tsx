'use client'

import React from 'react'
import CustomPage from '../components/custom-page'
import { CustomHeader } from '../components/ui/custom-header'

import WorldMapProvider from './context/worldmap-context'
import WorldMapContainer from './container'

export default function MapPage() {
  return (
    <CustomPage
      classNames={{
        wrapper:
          "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[-1]",
        container: 'h-full max-[354px]:h-auto',
        animate:
          '[--space:_40px] xs:[--space:_48px] 2xs:[--space:_56px] h-[calc(100%_-_var(--space))]',
        base: 'h-full'
      }}
    >
      <div className="flex flex-col justify-between space-y-6 h-full">
        <CustomHeader title="WORLD MAP" />
        <WorldMapProvider>
          <WorldMapContainer />
        </WorldMapProvider>
      </div>
    </CustomPage>
  )
}
