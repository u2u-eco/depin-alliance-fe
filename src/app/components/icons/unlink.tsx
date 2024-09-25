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
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M24.8067 18.72L27.7227 15.804C29.8707 13.656 29.8707 10.1733 27.7227 8.02531V8.02531C25.5747 5.87731 22.0921 5.87731 19.9441 8.02531L17.0281 10.9413"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13 22.748L15.5 20.248"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.5 15.248L23 12.748"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.3748 27.1226L8.62549 8.37329"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.1931 16.7761L8.27714 19.6921C6.12914 21.8401 6.12914 25.3228 8.27714 27.4708V27.4708C10.4251 29.6188 13.9078 29.6188 16.0558 27.4708L18.9718 24.5548"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
