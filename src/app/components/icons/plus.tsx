import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
  gradient?: boolean
}

function Icon({ className, gradient }: IconProps) {
  return gradient ? (
    <svg
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5V19"
        stroke="url(#paint0_linear_5618_52584)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.99921 12H18.9992"
        stroke="url(#paint1_linear_5618_52584)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5618_52584"
          x1="12"
          y1="12"
          x2="13"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FF90" />
          <stop offset="1" stop-color="#F4FD36" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5618_52584"
          x1="4.99921"
          y1="12.5"
          x2="18.9992"
          y2="12.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FF90" />
          <stop offset="1" stop-color="#F4FD36" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5V19"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 12H19"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
