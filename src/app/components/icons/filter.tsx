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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 17.5H20C20.69 17.5 21.25 18.06 21.25 18.75V23.75C21.25 24.44 20.69 25 20 25H17.5C16.81 25 16.25 24.44 16.25 23.75V18.75C16.25 18.06 16.81 17.5 17.5 17.5Z" fill="url(#paint0_linear_2603_49437)" stroke="url(#paint1_linear_2603_49437)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M26.25 21.25H21.25" stroke="url(#paint2_linear_2603_49437)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.25 21.25H3.75" stroke="url(#paint3_linear_2603_49437)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 12.5H10C9.31 12.5 8.75 11.94 8.75 11.25V6.25C8.75 5.56 9.31 5 10 5H12.5C13.19 5 13.75 5.56 13.75 6.25V11.25C13.75 11.94 13.19 12.5 12.5 12.5Z" fill="url(#paint4_linear_2603_49437)" stroke="url(#paint5_linear_2603_49437)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.75 8.75H8.75" stroke="url(#paint6_linear_2603_49437)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.75 8.75H26.25" stroke="url(#paint7_linear_2603_49437)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
        <linearGradient id="paint0_linear_2603_49437" x1="16.25" y1="21.25" x2="21.25" y2="21.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2603_49437" x1="16.25" y1="21.25" x2="21.25" y2="21.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint2_linear_2603_49437" x1="21.25" y1="21.25" x2="26.25" y2="21.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint3_linear_2603_49437" x1="3.75" y1="21.25" x2="16.25" y2="21.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint4_linear_2603_49437" x1="8.75" y1="8.75" x2="13.75" y2="8.75" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint5_linear_2603_49437" x1="8.75" y1="8.75" x2="13.75" y2="8.75" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint6_linear_2603_49437" x1="3.75" y1="8.75" x2="8.75" y2="8.75" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint7_linear_2603_49437" x1="13.75" y1="8.75" x2="26.25" y2="8.75" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        </defs>
      </svg>
    ) : (
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 17.5H20C20.69 17.5 21.25 18.06 21.25 18.75V23.75C21.25 24.44 20.69 25 20 25H17.5C16.81 25 16.25 24.44 16.25 23.75V18.75C16.25 18.06 16.81 17.5 17.5 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M26.25 21.25H21.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.25 21.25H3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 12.5H10C9.31 12.5 8.75 11.94 8.75 11.25V6.25C8.75 5.56 9.31 5 10 5H12.5C13.19 5 13.75 5.56 13.75 6.25V11.25C13.75 11.94 13.19 12.5 12.5 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.75 8.75H8.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.75 8.75H26.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  )
}

export default Icon
