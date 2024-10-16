'use client'

import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import { CustomHeader } from '../components/ui/custom-header'
import { useRouter } from 'next/navigation'
import { useAppSound } from '@/hooks/useAppSound'
import SelectMap from './components/select-map'
import CustomButton from '../components/button'

export default function MapPage() {
  const [activeItem, setActiveItem] = useState('')
  const router = useRouter()
  const { buttonSound } = useAppSound()

  const handleUpdateParam = (name: string) => {
    setActiveItem(name)
  }

  const handleContinue = () => {
    if (!activeItem) return
    buttonSound.play()
    router.push(`/map/detail?type=${activeItem}`)
  }

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
        <SelectMap handleUpdateParam={handleUpdateParam} />
        <CustomButton title="CONTINUE" onAction={handleContinue} disable={!activeItem} />
      </div>
    </CustomPage>
  )
}
