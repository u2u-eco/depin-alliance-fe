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
        d="M18.8797 28.1836H15.8789V25.7544L14.4568 22.9102H14.1211V26.4258H10.9412L9.48574 23.515L8.48936 24.5113L5.33203 26.0901V28.1836H2.33971L0 25.9194V21.6587L2.70545 19.0406L4.45312 20.7883L5.33203 19.9094V18.1516L7.55203 15.9316L11.4844 15.3417L14.3024 15.7644L14.6225 14.1636L14.2673 12.9795L13.4157 12.5537L11.4844 14.4851L8.7532 11.754L9.91922 7.08984H12.8781L14.636 5.33203H17.6367V8.84766H17.9724L19.3945 6.00346V1.81641H22.3953L24.668 4.08908V6.00346L26.0901 8.84766H30V12.0316L27.0366 13.489L28.1836 14.636V16.3853L30 18.1431V21.1523H25.1828L23.7891 19.7586L22.3953 21.1523H20.6375L19.585 22.2048L21.3428 25.7204L18.8797 28.1836Z"
        fill="currentColor"
      />
      <path
        d="M7.08984 14.9998H4.08908L1.81641 12.7271V10.2412L5.33203 6.72559L7.08984 8.4834V14.9998Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Icon
