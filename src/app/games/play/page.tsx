'use client'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { endWorldMap, startWorldMap } from '@/services/world-map'
import useWorldMapStore from '@/stores/worldMapStore'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PlayGame() {
  const router = useRouter()
  const init = useRef<boolean>(false)
  const { setWorldMapReward } = useWorldMapStore()
  const params = useSearchParams()
  const type = params.get('type')
  const id = params.get('id')
  const handleEndGame = () => {
    if (id) {
      handleEndMission(id)
    }
    router.back()
  }

  const handleStartMission = (id: any) => {
    startWorldMap(id)
  }

  const handleEndMission = async (id: any) => {
    const res = await endWorldMap(id)
    if (res.status) {
      setWorldMapReward(res.data)
    }
  }

  useEffect(() => {
    if (!init.current && id) {
      init.current = true
      handleStartMission(id)
    }
  }, [id])
  return (
    <div>
      <CustomHeader title="PLAY" back={handleEndGame} />
      <iframe
        src={`/games/${type || 'puzzle'}`}
        width={'100%'}
        style={{ position: 'absolute', height: '100%', left: 0, top: 0 }}
      />
    </div>
  )
}
