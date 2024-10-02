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
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
    >
      <path
        d="M24.4008 17.3487C26.0234 18.9712 25.8483 21.7075 23.8783 23.0912C22.6246 23.9712 20.8733 23.9712 19.6196 23.0912C17.6483 21.7087 17.4746 18.9712 19.0971 17.3487C20.5621 15.8837 22.9371 15.8837 24.4008 17.3487"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.7504 25L24.4004 22.65"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.25 16.25H14.25"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.25 11.25H19.25"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.25 12.5V8.75C24.25 6.67875 22.5713 5 20.5 5H8C5.92875 5 4.25 6.67875 4.25 8.75V20C4.25 22.0713 5.92875 23.75 8 23.75H14.25"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
