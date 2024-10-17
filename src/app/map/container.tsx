'use client'

import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSound } from '@/hooks/useAppSound'
import SelectMap from './components/select-map'
import CustomButton from '../components/button'
import { WorldMapContext } from './context/worldmap-context'
import { useQuery } from '@tanstack/react-query'
import { getItemWorldMap } from '@/services/world-map'
import { WORLD_MAP_ITEM } from '@/interfaces/i.world-map'

export default function WorldMapContainer() {
  const router = useRouter()
  const { buttonSound } = useAppSound()
  const { continent } = useContext(WorldMapContext)

  const handleContinue = () => {
    if (!continent) return
    buttonSound.play()
    router.push(`/map/detail?type=${continent}`)
  }

  return (
    <>
      <SelectMap />
      <CustomButton title="CONTINUE" onAction={handleContinue} disable={!continent} />
    </>
  )
}
