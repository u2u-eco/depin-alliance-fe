import React, { ReactNode } from 'react'
import { IconCheckCircle, IconCloseHexagon, IconPoint } from '../icons'
import { formatNumber } from '@/helper/common'

interface ToastProps {
  type: string
  title: string
  point?: any
  description?: ReactNode
}

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error'
}

const CustomToast = ({ type, title, point, description }: ToastProps) => {
  return (
    <div
      className={`relative border border-transparent bg-black p-3 xs:p-4 font-geist flex items-center text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] w-full before:content-[''] before:!scale-y-1 before:!translate-y-0 before:bottom-0 before:absolute before:left-0 before:[--shape:_2px] xs:before:[--shape:_4px] before:w-12 xs:before:w-16 before:h-0.5 xs:before:h-1 before:[clip-path:_polygon(0_0,calc(100%_-_var(--shape))_0%,100%_100%,0%_100%)] before:overflow-hidden after:content-[''] after:bottom-0 after:absolute after:right-0 after:left-auto after:[--shape:_2px] xs:after:[--shape:_4px] after:w-12 xs:after:w-16 after:overflow-hidden after:h-0.5 xs:after:h-1  after:[clip-path:_polygon(var(--shape)_0,100%_0%,100%_100%,0%_100%)]
        ${point ? 'justify-between' : 'justify-center'}
        ${type === TOAST_TYPE.SUCCESS ? 'shadow-[inset_0_0_40px_rgba(0,255,144,0.45)] !border-success before:bg-success after:bg-success' : 'shadow-[inset_0_0_40px_rgba(229,57,53,0.45)] !border-error before:bg-error after:bg-error'}
      `}
    >
      <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
        {type === TOAST_TYPE.SUCCESS ? (
          <IconCheckCircle className="size-5 xs:size-6 text-green-500" />
        ) : (
          <IconCloseHexagon className="size-5 xs:size-6 text-error" />
        )}
        <p className="text-title tracking-[-1px]">{title}</p>
      </div>
      {point ? (
        <>
          <div className="w-full max-w-4 xs:max-w-5 2xs:max-w-6 h-[1px] bg-green-800 ml-auto mr-4 xs:mr-5 2xs:mr-6"></div>
          <div className="flex items-center space-x-1">
            <IconPoint className="size-4 xs:size-5 2xs:size-6" />
            <p className="text-green-500">+{formatNumber(point || 0, 0, 0)}</p>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default CustomToast
