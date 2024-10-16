import CustomButton from '@/app/components/button'
import { useEffect, useRef, useState } from 'react'
interface IButtonVerifying {
  reload?: () => void
}
export default function ButtonVerifying({ reload }: IButtonVerifying) {
  const [time, setTime] = useState<number>(30)
  const [disable, setDisable] = useState<boolean>(false)
  const _interval = useRef<any>()
  const handleCountDown = () => {
    let _time = 30
    _interval.current = setInterval(() => {
      --_time
      setTime(_time)
      if (_time <= 0) {
        clearInterval(_interval.current)
        setDisable(false)
      }
    }, 1000)
  }
  const handleClick = () => {
    if (disable) return
    if (reload) {
      reload()
    }
    setTime(30)
    setDisable(true)
    handleCountDown()
  }
  useEffect(() => {}, [])
  return (
    <CustomButton
      title={`${disable ? 'VERIFYING' : 'VERIFY'}  ${disable ? `(${time}s)` : ''}`}
      buttonClass={'normal-case'}
      disable={disable}
      onAction={handleClick}
    />
  )
}
