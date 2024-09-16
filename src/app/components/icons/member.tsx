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
        d="M25.9907 11.9314C26.9782 12.919 26.9782 14.5201 25.9907 15.5076C25.0031 16.4952 23.402 16.4952 22.4145 15.5076C21.4269 14.5201 21.4269 12.919 22.4145 11.9314C23.402 10.9439 25.0031 10.9439 25.9907 11.9314"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.7525 7.41749C19.2731 8.93809 19.2731 11.4035 17.7525 12.9241C16.2319 14.4447 13.7665 14.4447 12.2459 12.9241C10.7253 11.4035 10.7253 8.9381 12.2459 7.41749C13.7665 5.89689 16.2319 5.89689 17.7525 7.41749"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.58637 11.9314C8.57391 12.919 8.57391 14.5201 7.58637 15.5076C6.59883 16.4952 4.99772 16.4952 4.01019 15.5076C3.02265 14.5201 3.02265 12.919 4.01019 11.9314C4.99772 10.9439 6.59884 10.9439 7.58637 11.9314"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28.7493 23.777V22.407C28.7493 20.6808 27.3505 19.282 25.6243 19.282H24.623"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.25 23.777V22.407C1.25 20.6808 2.64875 19.282 4.375 19.282H5.37625"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.673 23.777V21.7758C21.673 19.3595 19.7142 17.4008 17.298 17.4008H12.6992C10.283 17.4008 8.32422 19.3595 8.32422 21.7758V23.777"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
