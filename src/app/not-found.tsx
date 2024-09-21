'use client'

import React, { useEffect } from 'react'
import CustomModal from './components/custom-modal'
import { useDisclosure } from '@nextui-org/react'
import Link from 'next/link'

export default function NotFoundPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <CustomModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} onOpenChange={onOpenChange} full>
      <div className="flex flex-col justify-between h-full p-3 3xs:p-4">
        <div className="flex-1 my-8 xs:my-10 flex flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
          <div className="relative h-[100px] min-[355px]:h-[120px] xs:h-[140px] 2xs:h-[160px] mx-auto ">
            <img
              className="h-full drop-shadow-green"
              src="/assets/images/404.svg"
              alt="DePIN Alliance"
            />
            <div className="absolute top-[-50%] left-[50%] translate-x-[-50%] w-[370px] xs:w-[400px] 2xs:w-[430px] z-[-1] before:[--size:_300px] xs:before:[--size:_325px] 2xs:before:[--size:_355px] before:content-[''] before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[-275px] before:size-[var(--size)] before:rounded-[50%] before:blur-[75px] before:bg-green-500 before:opacity-30 before:z-[-2] after:[--size:_300px] xs:after:[--size:_325px] 2xs:after:[--size:_355px] after:content-[''] after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[-275px] after:size-[var(--size)] after:rounded-[50%] after:blur-[75px] after:bg-yellow-500 after:opacity-30 after:z-[-2]">
              <img className="mx-auto" src="/assets/images/league/league-background.svg" alt="" />
            </div>
          </div>
          <div className="space-y-3 xs:space-y-4 text-center">
            <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-lg xs:text-xl tracking-[1px] text-title text-center !leading-[22px] xs:!leading-[24px]">
                Page not found
              </div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            <p className="text-body text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] tracking-[-1px] text-center">
              We couldn’t find the page you’re looking for.
            </p>
          </div>
        </div>
        <div className="my-3 xs:my-4 2xs:my-5">
          <Link href="/home" className="btn">
            <div className="btn-border"></div>
            <div className="btn-primary">RETURN TO BASE</div>
            <div className="btn-border"></div>
          </Link>
        </div>
      </div>
    </CustomModal>
  )
}
