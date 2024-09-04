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
      <svg className={cn(className)} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M26.6673 29H21.334C20.7873 29 20.334 28.5467 20.334 28C20.334 27.4533 20.7873 27 21.334 27H26.6673C27.214 27 27.6673 27.4533 27.6673 28C27.6673 28.5467 27.214 29 26.6673 29Z" fill="url(#paint0_linear_4001_575)"/>
        <path d="M24 31.6667C23.4533 31.6667 23 31.2133 23 30.6667V25.3333C23 24.7867 23.4533 24.3333 24 24.3333C24.5467 24.3333 25 24.7867 25 25.3333V30.6667C25 31.2133 24.5467 31.6667 24 31.6667Z" fill="url(#paint1_linear_4001_575)"/>
        <path d="M18.2136 17.4933C18.1736 17.4933 18.1469 17.4933 18.1069 17.4933C18.0403 17.48 17.9469 17.48 17.8669 17.4933C14.0003 17.3733 11.0803 14.3333 11.0803 10.5867C11.0669 8.74666 11.7869 7.01332 13.0936 5.70666C14.4003 4.39999 16.1336 3.66666 17.9869 3.66666C21.8003 3.66666 24.9069 6.77332 24.9069 10.5867C24.9069 14.3333 21.9869 17.36 18.2536 17.4933C18.2403 17.4933 18.2269 17.4933 18.2136 17.4933ZM17.9869 5.66666C16.6669 5.66666 15.4403 6.18666 14.5069 7.10666C13.5869 8.03999 13.0803 9.26666 13.0803 10.5733C13.0803 13.24 15.1603 15.4 17.8136 15.48C17.8936 15.4667 18.0669 15.4667 18.2403 15.48C20.8669 15.36 22.9069 13.2133 22.9069 10.5733C22.9069 7.87999 20.6936 5.66666 17.9869 5.66666Z" fill="url(#paint2_linear_4001_575)"/>
        <path d="M17.9875 32.08C15.2675 32.08 12.6942 31.3733 10.7475 30.0667C8.89419 28.8267 7.88086 27.1333 7.88086 25.3067C7.88086 23.48 8.90753 21.8 10.7475 20.5733C14.7342 17.9067 21.2142 17.9067 25.2009 20.5733C25.6542 20.88 25.7875 21.5067 25.4809 21.96C25.1742 22.4267 24.5475 22.5467 24.0942 22.24C20.7742 20.0267 15.1742 20.0267 11.8542 22.24C10.5742 23.0933 9.88086 24.1733 9.88086 25.3067C9.88086 26.44 10.5742 27.5467 11.8542 28.4C13.4675 29.48 15.6409 30.0667 17.9742 30.0667C18.5209 30.0667 18.9742 30.52 18.9742 31.0667C18.9742 31.6133 18.5342 32.08 17.9875 32.08Z" fill="url(#paint3_linear_4001_575)"/>
        <defs>
        <linearGradient id="paint0_linear_4001_575" x1="20.334" y1="28" x2="27.6673" y2="28" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint1_linear_4001_575" x1="23" y1="28" x2="25" y2="28" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint2_linear_4001_575" x1="11.0801" y1="10.58" x2="24.9069" y2="10.58" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        <linearGradient id="paint3_linear_4001_575" x1="7.88086" y1="25.3267" x2="25.6466" y2="25.3267" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF90"/>
        <stop offset="1" stop-color="#F4FD36"/>
        </linearGradient>
        </defs>
      </svg>
    )
  )
}

export default Icon
