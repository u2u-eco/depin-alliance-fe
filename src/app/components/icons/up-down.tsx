import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 6L0 18H6L12 12L18 18H24L12 6Z" fill="currentColor"/>
      <path d="M12 14L8 18H16L12 14Z" fill="currentColor"/>
    </svg>
  )
}

export default Icon
