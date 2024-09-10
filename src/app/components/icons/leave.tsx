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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.0003 5.99585V24.0568C15.0005 24.7314 14.6944 25.3696 14.1682 25.7917C13.642 26.2138 12.9526 26.3742 12.2941 26.2277L6.73682 24.9922C5.71975 24.7664 4.99609 23.8643 4.99609 22.8225V7.23136C4.99609 6.18912 5.72046 5.28693 6.73807 5.06171L12.2954 3.82619C12.9535 3.67986 13.6425 3.84018 14.1684 4.26203C14.6943 4.68388 15.0003 5.32165 15.0003 5.99585Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.2483 16.3026V13.8015"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25.0046 10.0248V7.47126C25.0047 6.80788 24.7413 6.17163 24.2722 5.70255C23.8031 5.23348 23.1669 4.97003 22.5035 4.97021H18.752"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25.0046 20.0291V22.5301C25.0047 23.1935 24.7413 23.8297 24.2722 24.2988C23.8031 24.7679 23.1669 25.0313 22.5035 25.0311H18.752"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.752 15.0271H25.0046"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.5039 17.528L25.0049 15.0269L22.5039 12.5259"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
