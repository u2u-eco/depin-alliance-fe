import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <svg
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
    >
      <path
        d="M10.6911 12.6698C11.993 13.9717 11.993 16.0825 10.6911 17.3844C9.38916 18.6863 7.27835 18.6863 5.97643 17.3844C4.67452 16.0825 4.67452 13.9717 5.97643 12.6698C7.27835 11.3679 9.38916 11.3679 10.6911 12.6698"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.0231 6.00353C25.325 7.30545 25.325 9.41626 24.0231 10.7182C22.7212 12.0201 20.6104 12.0201 19.3085 10.7182C18.0066 9.41626 18.0066 7.30545 19.3085 6.00353C20.6104 4.70162 22.7212 4.70162 24.0231 6.00353"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.0231 19.3361C25.325 20.638 25.325 22.7488 24.0231 24.0507C22.7212 25.3526 20.6104 25.3526 19.3085 24.0507C18.0066 22.7488 18.0066 20.638 19.3085 19.3361C20.6104 18.0341 22.7212 18.0341 24.0231 19.3361"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.3008 13.5396L18.7008 9.8396"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.3008 16.5146L18.7008 20.2146"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
