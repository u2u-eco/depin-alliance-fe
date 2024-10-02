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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5312 8.065V8.065C11.5312 6.15 13.0838 4.59625 15 4.59625V4.59625C16.915 4.59625 18.4688 6.14875 18.4688 8.065V8.065C18.4688 9.98 16.9163 11.5338 15 11.5338V11.5338C13.0838 11.5313 11.5312 9.97875 11.5312 8.065Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.125 21.935V21.935C3.125 20.02 4.6775 18.4662 6.59375 18.4662V18.4662C8.50875 18.4662 10.0625 20.0187 10.0625 21.935V21.935C10.0613 23.85 8.51 25.4037 6.59375 25.4037V25.4037C4.6775 25.4037 3.125 23.8512 3.125 21.935Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.9395 21.935V21.935C19.9395 20.02 21.492 18.4662 23.4082 18.4662V18.4662C25.3232 18.4662 26.877 20.0187 26.877 21.935V21.935C26.877 23.85 25.3245 25.4037 23.4082 25.4037V25.4037C21.4907 25.4037 19.9395 23.8512 19.9395 21.935H19.9395Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.6121 14.9L8.09961 18.825"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.875 10.975L19.3875 14.9"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.9375 21.9375H15"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Icon
