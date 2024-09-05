import React, { useEffect, useRef, useState } from 'react'
interface ICountdownTime {
  time: number
  type: string
}
export default function CountdownTime({ time, type }: ICountdownTime) {
  const [timeCountdown, setTimeCountdown] = useState<Array<any>>([])
  const refInterval = useRef<any>(0)
  const addPrefix = (number: number) => {
    if (number >= 10) {
      return number
    }
    return `0${number}`
  }
  const countdown = (timeEnd: number) => {
    const interval = () => {
      var now = new Date().getTime()

      // Find the distance between now and the count down date
      var distance = timeEnd - now

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result in the element with id="demo"
      const listTime = [addPrefix(hours), addPrefix(minutes), addPrefix(seconds)]

      if (days > 0) {
        listTime.unshift(addPrefix(days))
      }
      setTimeCountdown(listTime)

      if (distance <= 0) {
        clearInterval(refInterval.current)
        setTimeCountdown([])
      }
    }
    clearInterval(refInterval.current)
    interval()
    refInterval.current = setInterval(interval, 1000)
  }

  useEffect(() => {
    if (time) {
      clearInterval(refInterval.current)
      countdown(time)
    }
    return () => {
      clearInterval(refInterval.current)
    }
  }, [time])

  return (
    <>
      {timeCountdown.length === 0 ? null : (
        <div
          className={`flex items-center text-[15px] xs:text-base font-geist font-semibold ${type === 'basic' ? 'text-[#9D9FAF]' : 'text-title'} `}
        >
          {timeCountdown.map((item: any, index) => (
            <React.Fragment key={index}>
              <p
                className={`size-6 xs:size-[28px] flex items-center justify-center ${type === 'basic' ? 'bg-transparent' : 'bg-white/10'} `}
              >
                {item}
              </p>
              {index === timeCountdown.length - 1 ? null : <span>:</span>}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  )
}
