'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSound } from '@/hooks/useAppSound'
import SelectMap from './components/select-map'
import CustomButton from '../components/button'
import { WorldMapContext } from './context/worldmap-context'
import { useQuery } from '@tanstack/react-query'
import { getItemWorldMap, getWorldMap } from '@/services/world-map'
import { WORLD_MAP_ITEM } from '@/interfaces/i.world-map'

export default function WorldMapContainer() {
  const router = useRouter()
  const { buttonSound } = useAppSound()
  const { continent, setListWorldMap } = useContext(WorldMapContext)
  const getListMap = async () => {
    const res = await getItemWorldMap(WORLD_MAP_ITEM.CONTINENT)
    if (res.status) {
      setListWorldMap(res.data)
    }
  }

  const getCurrentMap = async () => {
    const res = await getWorldMap()
    if (res.status && res.data) {
      router.push(`/map/detail?id=${res.data?.continent?.code}`)
    } else {
      getListMap()
    }
  }

  const handleContinue = () => {
    if (!continent) return
    buttonSound.play()
    router.push(`/map/detail?id=${continent}`)
  }

  useEffect(() => {
    getCurrentMap()
  }, [])

  return (
    <>
      <SelectMap />
      <CustomButton title="CONTINUE" onAction={handleContinue} disable={!continent} />
    </>
  )
}
