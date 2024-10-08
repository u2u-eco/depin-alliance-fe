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
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect
        width="17.5073"
        height="17.5073"
        rx="2"
        transform="matrix(-1 0 0 1 21.2529 8.74731)"
        stroke="url(#paint0_linear_2076_3563)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.2528 21.2524H23.7538C25.1351 21.2524 26.2549 20.1327 26.2549 18.7514V6.24616C26.2549 4.86487 25.1351 3.74512 23.7538 3.74512H11.2486C9.86734 3.74512 8.74759 4.86487 8.74759 6.24616V8.7472"
        stroke="url(#paint1_linear_2076_3563)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2076_3563"
          x1="0"
          y1="8.75365"
          x2="17.5073"
          y2="8.75365"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FF90" />
          <stop offset="1" stop-color="#F4FD36" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2076_3563"
          x1="26.2549"
          y1="12.4988"
          x2="8.74759"
          y2="12.4988"
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
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect
        width="17.5073"
        height="17.5073"
        rx="2"
        transform="matrix(-1 0 0 1 21.2529 8.74731)"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.2528 21.2524H23.7538C25.1351 21.2524 26.2549 20.1327 26.2549 18.7514V6.24616C26.2549 4.86487 25.1351 3.74512 23.7538 3.74512H11.2486C9.86734 3.74512 8.74759 4.86487 8.74759 6.24616V8.7472"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
