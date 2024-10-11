'use client'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { useSearchParams } from 'next/navigation'

export default function PlayGame() {
  const params = useSearchParams()
  const type = params.get('type')
  return (
    <div>
      <CustomHeader title="PLAY" />
      <iframe
        src={`/games/${type || 'puzzle'}`}
        width={'100%'}
        style={{ position: 'absolute', height: '100%', left: 0, top: 0 }}
      />
    </div>
  )
}
