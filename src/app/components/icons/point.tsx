import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <img className={cn(className)} src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="Point" />
  )
}

export default Icon
