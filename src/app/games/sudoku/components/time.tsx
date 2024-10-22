import React, { useEffect, useState } from 'react'

const Time = () => {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const minutes = Math.floor(totalSeconds / 60)
  const hours = Math.floor(totalSeconds / 3600)

  const toggle = () => {
    setIsActive(!isActive)
  }

  useEffect(() => {
    setIsActive(true)
  }, [])

  useEffect(() => {
    let interval: any
    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds((seconds) => seconds + 1)
        setSeconds((seconds) => (seconds < 59 ? seconds + 1 : 0))
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  return (
    <div className="btn" onClick={toggle}>
      <div className="btn-border"></div>
      <div className="btn-primary flex items-center justify-between space-x-3">
        <p>{isActive ? 'Pause' : 'Play'}</p>
        <div className="min-h-6 xs:min-h-[28px] flex items-center text-sm xs:text-[15px] 2xs:text-base font-geist font-semibold text-green-900">
          <p className="px-[3px] flex items-center justify-center bg-black/15">
            {hours < 10 ? `0${hours}` : hours}
          </p>
          <span>:</span>
          <p className="px-[3px] flex items-center justify-center bg-black/15">
            {minutes < 10 ? `0${minutes}` : minutes}
          </p>
          <span>:</span>
          <p className="px-[3px] flex items-center justify-center bg-black/15">
            {seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>
      </div>
      <div className="btn-border"></div>
    </div>
  )
}

export default Time
