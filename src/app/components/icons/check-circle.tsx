import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M25.8337 14.0096V15.0063C25.8323 17.3424 25.0759 19.6155 23.6771 21.4866C22.2783 23.3577 20.3122 24.7265 18.072 25.3888C15.8317 26.0512 13.4374 25.9717 11.246 25.1621C9.05465 24.3525 7.1837 22.8562 5.9122 20.8964C4.6407 18.9366 4.03677 16.6183 4.19048 14.2873C4.34418 11.9562 5.2473 9.7373 6.76513 7.96144C8.28296 6.18559 10.3342 4.94795 12.6129 4.43311C14.8915 3.91827 17.2756 4.15381 19.4095 5.10462" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25.8337 6.66675L14.9362 17.5001L11.667 14.2533" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Icon
