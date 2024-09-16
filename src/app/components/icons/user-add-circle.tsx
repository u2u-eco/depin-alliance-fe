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
        d="M26.571 12.3612C27.7646 17.539 25.3846 22.8813 20.7367 25.4567C16.0889 28.0321 10.2974 27.2176 6.54006 23.4603C2.78275 19.703 1.96834 13.9115 4.54373 9.26363C7.11911 4.6158 12.4614 2.23575 17.6393 3.42944"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.9043 8.07284V4.1145"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.9277 6.09497H25.8861"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="15"
        cy="11.875"
        r="3.125"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.375 20C9.87114 18.8618 10.9945 18.1256 12.2362 18.125H17.7638C19.0055 18.1256 20.1289 18.8618 20.625 20"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
