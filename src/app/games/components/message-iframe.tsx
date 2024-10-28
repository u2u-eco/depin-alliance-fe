import { useEffect, useRef, useState } from 'react'

export default function MessageIframe() {
  const [message, setMessage] = useState<any>(0)
  const count = useRef<number>(0)
  const handleMessage = (event: any) => {
    count.current += 1
    setMessage(count.current)

    // console.log('Message received from the child: ' + event.data) // Message received from child
  }
  useEffect(() => {
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])
  return <div className=" absolute z-[1000] text-[30px] bg-red-50">{message}</div>
}
