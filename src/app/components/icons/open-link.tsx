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
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M25.85 11.075L11 25.925" stroke="url(#paint0_linear_4001_1910)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15.4258 11L25.8508 11.0735L25.9258 21.5" stroke="url(#paint1_linear_4001_1910)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
        <linearGradient id="paint0_linear_4001_1910" x1="11" y1="18.5" x2="25.85" y2="18.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint1_linear_4001_1910" x1="15.4258" y1="16.25" x2="25.9258" y2="16.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        </defs>
      </svg>
    ) : (
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M25 7.5L11.25 21.25L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  )
}

export default Icon
