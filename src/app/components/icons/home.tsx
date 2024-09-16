import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
  gradient?: boolean
}

function Icon({ className, gradient }: IconProps) {
  return (
    gradient && (
      <svg
        className={cn(className)}
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M15 22L15 15"
          stroke="url(#paint0_linear_3605_12787)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.5876 3.52499L3.92509 10.4625C2.95009 11.2375 2.32509 12.875 2.53759 14.1L4.20009 24.05C4.50009 25.825 6.20009 27.2625 8.00009 27.2625H22.0001C23.7876 27.2625 25.5001 25.8125 25.8001 24.05L27.4626 14.1C27.6626 12.875 27.0376 11.2375 26.0751 10.4625L17.4126 3.53749C16.0751 2.46249 13.9126 2.46249 12.5876 3.52499Z"
          stroke="url(#paint1_linear_3605_12787)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3605_12787"
            x1="15"
            y1="18.5"
            x2="16"
            y2="18.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FF90" />
            <stop offset="1" stopColor="#F4FD36" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_3605_12787"
            x1="2.49609"
            y1="14.9961"
            x2="27.4999"
            y2="14.9961"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FF90" />
            <stop offset="1" stopColor="#F4FD36" />
          </linearGradient>
        </defs>
      </svg>
    )
  )
}

export default Icon
