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
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <g clip-path="url(#clip0_2660_149777)">
        <path d="M22 14L15 7L8 14" stroke="url(#paint0_linear_2660_149777)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 23L15 16L8 23" stroke="url(#paint1_linear_2660_149777)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <linearGradient id="paint0_linear_2660_149777" x1="8" y1="10.5" x2="22" y2="10.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2660_149777" x1="8" y1="19.5" x2="22" y2="19.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <clipPath id="clip0_2660_149777">
        <rect width="30" height="30" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    ) : (
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.5 16L6.5 12L10.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.5 17L12.5 12L17.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  )
}

export default Icon
