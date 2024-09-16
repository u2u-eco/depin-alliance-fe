import React from 'react'
import { IconChevron, IconHome } from '../icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  title: string
}

export const CustomHeader = ({ title }: HeaderProps) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <div className="sticky top-0 left-0 bg-white/10 flex items-center justify-between space-x-3 z-10 py-3 px-3 backdrop-blur-[8px]">
        <div className="cursor-pointer rotate-90" onClick={handleBack}>
          <IconChevron className="text-green-500 size-6 xs:size-7 2xs:size-8" />
        </div>
        <div className="flex items-center space-x-3 xs:space-x-4">
          <div className="size-1.5 bg-green-800"></div>
          <div className="text-title font-airnt font-medium text-lg xs:text-xl 2xs:text-2xl !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px] tracking-[1px]">
            {title}
          </div>
          <div className="size-1.5 bg-green-800"></div>
        </div>
        <Link href="/home">
          <IconHome className="size-6 xs:size-7 2xs:size-8" gradient />
        </Link>
      </div>
    </>
  )
}
