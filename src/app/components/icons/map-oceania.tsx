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
      <g clip-path="url(#clip0_7001_28538)">
        <path
          d="M22.3953 23.6074H19.9094L18.1516 21.8496H16.2146L14.4568 18.334H10.0905L8.33274 20.0918H6.57492L4.81711 21.8496H1.81641V19.4265L0 15.9109V9.54492H2.33127L4.08908 7.78711H5.33203V4.78635L7.96875 2.14963L10.0906 4.27148H10.9412L12.699 0.755859H17.6367V4.60717L20.0999 5.83875L21.1523 4.78635V0.755859H24.4753L25.5739 5.15039L24.7624 8.39643L25.9109 9.54492H27.8399L30 13.7258V16.0698L28.1836 17.8276V19.5769L25.9109 21.8496H24.1531L22.3953 23.6074ZM23.7891 29.245L20.7883 26.2442L23.425 23.6075H26.4258V26.6082L23.7891 29.245Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_7001_28538">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Icon
