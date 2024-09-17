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
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M17.9983 34.7989H17.7183C17.5783 34.7989 3.99805 31.5788 3.99805 16.5986V8.19838C3.99805 7.63837 4.27805 7.07836 4.83806 6.93836L17.4383 1.33825C17.8583 1.19825 18.2783 1.19825 18.5583 1.33825L31.1586 6.93836C31.7186 7.07836 31.9986 7.63837 31.9986 8.19838V16.5986C31.9986 31.5788 18.4183 34.7989 18.2783 34.7989H17.9983ZM17.9983 19.3986C13.9382 19.3986 10.9982 21.2186 10.9982 23.5987C10.9982 25.9787 13.9382 27.7988 17.9983 27.7988C22.0584 27.7988 24.9985 25.9787 24.9985 23.5987C24.9985 21.2186 22.0584 19.3986 17.9983 19.3986ZM17.9983 8.19838C15.6183 8.19838 13.7982 10.0184 13.7982 12.3985C13.7982 14.7785 15.6183 16.5986 17.9983 16.5986C20.3784 16.5986 22.1984 14.7785 22.1984 12.3985C22.1984 10.0184 20.3784 8.19838 17.9983 8.19838Z"
          fill="url(#paint0_linear_2673_19081)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2673_19081"
            x1="3.99805"
            y1="18.0161"
            x2="31.9986"
            y2="18.0161"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00FF90" />
            <stop offset="1" stop-color="#F4FD36" />
          </linearGradient>
        </defs>
      </svg>
    )
  )
}

export default Icon
