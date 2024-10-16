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
        d="M24.3355 10.0651L20.6888 2.52838L16.6455 1.50732L15.775 3.06322L12.4716 1.60453L12.1799 0H7.13719L2.50406 4.99805V11.3624L5.5916 14.4499L9.99188 13.2253L11.8396 14.3679L13.5413 20.081L12.812 23.4846L15.2431 30H18.0146L21.1079 26.6266L22.0318 23.7092L24.3656 21.3754L24.2649 16.7261L26.5721 13.2739L27.4959 10.1544V9.57891L24.3355 10.0651Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Icon
