import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
  gradient?: boolean
}

function Icon({ className, gradient }: IconProps) {
  return (
    gradient ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6.25C16 5.69772 15.5523 5.25 15 5.25C14.4477 5.25 14 5.69772 14 6.25V14H6.25C5.69772 14 5.25 14.4477 5.25 15C5.25 15.5523 5.69772 16 6.25 16H14V23.75C14 24.3023 14.4477 24.75 15 24.75C15.5523 24.75 16 24.3023 16 23.75V16H23.75C24.3023 16 24.75 15.5523 24.75 15C24.75 14.4477 24.3023 14 23.75 14H16V6.25Z" fill="url(#paint0_linear_2051_1935)"/>
        <defs>
        <linearGradient id="paint0_linear_2051_1935" x1="4.75" y1="15" x2="25.25" y2="15" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        </defs>
      </svg>
    ) : (
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  )
}

export default Icon
