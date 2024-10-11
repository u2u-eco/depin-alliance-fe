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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.46178 4.43262C7.21477 2.91688 9.49991 2 11.9992 2C17.522 2 21.9992 6.47715 21.9992 12C21.9992 14.1361 21.3294 16.1158 20.1884 17.7406L16.9992 12H19.9992C19.9992 7.58172 16.4175 4 11.9992 4C9.84903 4 7.89698 4.84827 6.45944 6.22842L5.46178 4.43262ZM18.5366 19.5674C16.7836 21.0831 14.4985 22 11.9992 22C6.47636 22 1.99921 17.5228 1.99921 12C1.99921 9.86386 2.669 7.88416 3.81001 6.25944L6.99921 12H3.99921C3.99921 16.4183 7.58093 20 11.9992 20C14.1494 20 16.1014 19.1517 17.539 17.7716L18.5366 19.5674Z"
        fill="url(#paint0_linear_5618_52555)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5618_52555"
          x1="1.99921"
          y1="12"
          x2="21.9992"
          y2="12"
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Icon
