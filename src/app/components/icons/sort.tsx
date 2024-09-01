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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.30875 14.8662L10.5588 14.2412C10.9825 14.03 11.25 13.5963 11.25 13.1237V10.6687C11.25 10.2512 11.4588 9.86 11.8063 9.62875L14.4425 7.8725C14.7913 7.64 15 7.25 15 6.8325V5C15 4.31 14.44 3.75 13.75 3.75H5C4.31 3.75 3.75 4.31 3.75 5V6.8325C3.75 7.25 3.95875 7.64 4.30625 7.8725L6.9425 9.62875C7.29125 9.86125 7.5 10.2512 7.5 10.6687V13.7475C7.5 14.6775 8.4775 15.2825 9.30875 14.8662Z" fill="url(#paint0_linear_2603_50593)" stroke="url(#paint1_linear_2603_50593)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.5 20V23.75C7.5 25.1313 8.61875 26.25 10 26.25H23.75C25.1313 26.25 26.25 25.1313 26.25 23.75V6.25C26.25 4.86875 25.1313 3.75 23.75 3.75H20" stroke="url(#paint2_linear_2603_50593)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.25 11.25H21.25" stroke="url(#paint3_linear_2603_50593)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 16.25H21.25" stroke="url(#paint4_linear_2603_50593)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 21.25H21.25" stroke="url(#paint5_linear_2603_50593)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
        <linearGradient id="paint0_linear_2603_50593" x1="3.75" y1="9.37505" x2="15" y2="9.37505" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2603_50593" x1="3.75" y1="9.37505" x2="15" y2="9.37505" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint2_linear_2603_50593" x1="7.5" y1="15" x2="26.25" y2="15" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint3_linear_2603_50593" x1="16.25" y1="11.25" x2="21.25" y2="11.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint4_linear_2603_50593" x1="15" y1="16.25" x2="21.25" y2="16.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint5_linear_2603_50593" x1="12.5" y1="21.25" x2="21.25" y2="21.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        </defs>
      </svg>
    ) : (
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.30875 14.8662L10.5588 14.2412C10.9825 14.03 11.25 13.5963 11.25 13.1238V10.6687C11.25 10.2512 11.4588 9.86 11.8063 9.62875L14.4425 7.8725C14.7912 7.64 15 7.25 15 6.8325V5C15 4.31 14.44 3.75 13.75 3.75H5C4.31 3.75 3.75 4.31 3.75 5V6.8325C3.75 7.25 3.95875 7.64 4.30625 7.8725L6.9425 9.62875C7.29125 9.86125 7.5 10.2512 7.5 10.6687V13.7475C7.5 14.6775 8.4775 15.2825 9.30875 14.8662Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.5 20V23.75C7.5 25.1313 8.61875 26.25 10 26.25H23.75C25.1313 26.25 26.25 25.1313 26.25 23.75V6.25C26.25 4.86875 25.1313 3.75 23.75 3.75H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.25 11.25H21.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 16.25H21.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 21.25H21.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  )
}

export default Icon
