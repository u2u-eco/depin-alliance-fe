import React from 'react'
import { IconLoader } from '../icons'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface LoaderProps {
  classNames?: {
    wrapper?: ClassValue
    icon?: ClassValue
  }
  style?: any
}

const Loader = ({ classNames, style }: LoaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-full h-full  bg-transparent',
        classNames?.wrapper
      )}
      style={style}
    >
      <IconLoader className={cn('size-6 text-green-600 animate-spin', classNames?.icon)} />
    </div>
  )
}

export default Loader
