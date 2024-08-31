import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Icon
