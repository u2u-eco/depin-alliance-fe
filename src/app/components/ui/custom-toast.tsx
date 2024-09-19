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
      className={`font-geist flex items-center text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] w-full ${point ? 'justify-between' : 'justify-center'}`}
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
