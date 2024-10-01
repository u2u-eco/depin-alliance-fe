'use client'
import React, { useEffect } from 'react'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'
import Link from 'next/link'
const listSocial = [
  { id: 1, icon: 'x', link: 'https://x.com/DePINApp' },
  { id: 3, icon: 'telegram', link: 'https://t.me/DePIN_App' },
  { id: 2, icon: 'logo', link: 'https://depinalliance.xyz/ ' }
]
export default function MaintenancePage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  useEffect(() => {
    onOpen()
  }, [])
  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        full
      >
        <div className="flex flex-col justify-between h-full p-3 3xs:p-4 overflow-hidden">
          <div className="flex-1 my-6 min-[355px]:my-8 xs:my-10 flex flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
            <div className="relative h-[100px] min-[355px]:h-[120px] xs:h-[140px] 2xs:h-[160px] mx-auto">
              <img
                className="h-full drop-shadow-yellow"
                src="/assets/images/maintenance.svg"
                alt="DePIN Alliance"
              />
              <div className="absolute top-[-50%] left-[50%] translate-x-[-50%] w-[370px] xs:w-[400px] 2xs:w-[430px] z-[-1] before:[--size:_300px] xs:before:[--size:_325px] 2xs:before:[--size:_355px] before:content-[''] before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[-275px] before:size-[var(--size)] before:rounded-[50%] before:blur-[75px] before:bg-green-500 before:opacity-30 before:z-[-2] after:[--size:_300px] xs:after:[--size:_325px] 2xs:after:[--size:_355px] after:content-[''] after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[-275px] after:size-[var(--size)] after:rounded-[50%] after:blur-[75px] after:bg-yellow-500 after:opacity-30 after:z-[-2]">
                <img className="mx-auto" src="/assets/images/league/league-background.svg" alt="" />
              </div>
            </div>
            <div className="space-y-3 xs:space-y-4 text-center">
              <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6">
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                <div className="font-airnt font-medium text-lg xs:text-xl tracking-[1px] text-title text-center leading-[22px] xs:leading-[24px]">
                  we’re under <br /> maintenance
                </div>
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              </div>
              <p className="text-body text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] tracking-[-1px] text-center">
                DePIN Alliance is under maintenance. Please stay calm because we will be back
                shortly.
              </p>
            </div>
          </div>
          <div className="space-y-3 min-[355px]:space-y-4 xs:space-y-5 2xs:space-y-6 text-center relative before:content-[''] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[68%] before:h-16 before:rounded-[50%] before:bg-gradient before:blur-[86px] before:opacity-65 before:z-[-1] ">
            <img className="mx-auto" src="/assets/images/navbar-frame.svg" alt="DePIN Alliance" />
            <p className="text-body text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] tracking-[-1px]">
              Check our latest updates
            </p>
            <div className="space-y-3 xs:space-y-4">
              <div className="flex justify-center space-x-3 xs:space-x-4">
                {listSocial.map((item: any) => (
                  <Link
                    href={item.link}
                    target="_blank"
                    className="btn default w-auto"
                    key={item.id}
                  >
                    <div className="btn-border"></div>
                    <div className="btn-default !p-2 !size-[50px] min-[355px]:!size-[60px] xs:!size-[70px] 2xs:!size-[80px] flex items-center justify-center">
                      <img
                        className="h-6 xs:h-7 2xs:h-8"
                        src={`/assets/images/icons/icon-${item.icon}-white.svg`}
                        alt="DePIN Alliance"
                      />
                    </div>
                    <div className="btn-border"></div>
                  </Link>
                ))}
              </div>
              <p className="text-body text-xs leading-[16px] tracking-[-1px]">
                2024 ©. DePIN Alliance. All right reserved
              </p>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
