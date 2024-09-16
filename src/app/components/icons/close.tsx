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
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M24.168 6.32666L6.66797 23.8267"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66797 6.32666L12.5013 12.16"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3359 17.9933L24.1693 23.8266"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
