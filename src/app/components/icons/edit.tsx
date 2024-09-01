import React from 'react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface IconProps {
  className?: ClassValue
}

function Icon({ className }: IconProps) {
  return (
    <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8519 14.3174L14.3174 4.85187C14.6749 4.49437 15.2551 4.49437 15.6126 4.85187L17.149 6.3882C17.5065 6.7457 17.5065 7.32595 17.149 7.68345L7.68256 17.148C7.51115 17.3204 7.27831 17.4166 7.0354 17.4166H4.58331V14.9645C4.58331 14.7216 4.67956 14.4888 4.8519 14.3174Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.6042 6.56335L15.4367 9.39585" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Icon
