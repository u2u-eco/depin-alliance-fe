import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.485 18.777L13.875 21.9645C14.4375 22.7145 15.5625 22.7145 16.125 21.9645L18.515 18.777H22.5C24.5713 18.777 26.25 17.0983 26.25 15.027V7.52704C26.25 5.45579 24.5713 3.77704 22.5 3.77704H7.5C5.42875 3.77704 3.75 5.45579 3.75 7.52704V15.027C3.75 17.0983 5.42875 18.777 7.5 18.777H11.485Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.75 26.277H21.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.2212 11.6808C15.3437 11.8033 15.3437 12.0008 15.2212 12.1233C15.0987 12.2458 14.9013 12.2458 14.7788 12.1233C14.6563 12.0008 14.6563 11.8033 14.7788 11.6808C14.9013 11.5583 15.0987 11.5595 15.2212 11.6808" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.2212 11.6808C20.3437 11.8033 20.3437 12.0008 20.2212 12.1233C20.0987 12.2458 19.9013 12.2458 19.7788 12.1233C19.6563 12.0008 19.6563 11.8033 19.7788 11.6808C19.9013 11.5583 20.0987 11.5595 20.2212 11.6808" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.2212 11.6808C10.3437 11.8033 10.3437 12.0008 10.2212 12.1233C10.0987 12.2458 9.90125 12.2458 9.77875 12.1233C9.65625 12.0008 9.65625 11.8033 9.77875 11.6808C9.90125 11.5583 10.0987 11.5595 10.2212 11.6808" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Icon
