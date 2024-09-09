import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
      <path d="M9.25 3.77704H6.75C5.36875 3.77704 4.25 4.89579 4.25 6.27704V23.777C4.25 25.1583 5.36875 26.277 6.75 26.277H21.75C23.1313 26.277 24.25 25.1583 24.25 23.777V22.527" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.75 21.277L20.6875 20.7908C20.9638 20.757 21.2213 20.6308 21.4188 20.4345L27.2075 14.6458C28.2638 13.5895 28.2638 11.877 27.2075 10.8195V10.8195C26.1513 9.76328 24.4387 9.76328 23.3812 10.8195L17.6813 16.5195C17.49 16.7108 17.3663 16.9583 17.3275 17.227L16.75 21.277Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.375 5.65204H11.125C10.09 5.65204 9.25 4.81204 9.25 3.77704V3.77704C9.25 2.74204 10.09 1.90204 11.125 1.90204H17.375C18.41 1.90204 19.25 2.74204 19.25 3.77704V3.77704C19.25 4.81204 18.41 5.65204 17.375 5.65204Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.25 10.027H16.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.25 15.027H14.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.25 3.77704H21.75C23.1313 3.77704 24.25 4.89579 24.25 6.27704" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Icon
