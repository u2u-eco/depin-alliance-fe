'use client'
import { useTelegram } from '@/hooks/useTelegram'

export default function Page() {
  const { webApp } = useTelegram()
  return (
    <>
      <iframe
        className=" absolute left-0"
        src="/monster"
        frameBorder="0"
        width="100%"
        height={webApp?.viewportStableHeight || '500px'}
        allowFullScreen
      ></iframe>
    </>
  )
}
