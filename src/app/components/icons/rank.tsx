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
        d="M3.75 15.5H8.75V26.75H3.75V15.5ZM21.25 10.5H26.25V26.75H21.25V10.5ZM12.5 3H17.5V26.75H12.5V3Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Icon
