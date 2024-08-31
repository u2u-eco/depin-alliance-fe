import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue,
  gradient?: boolean
}

function Icon({ className, gradient }: IconProps) {
  return (
    gradient ? (
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M7 11L15 19L23 11" stroke="url(#paint0_linear_4001_850)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
        <linearGradient id="paint0_linear_4001_850" x1="7" y1="15" x2="23" y2="15" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        </defs>
      </svg>
    ) : (
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M7 11L15 19L23 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  )
}

export default Icon
