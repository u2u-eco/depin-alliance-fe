import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { formatNumber } from '../helper/common'
import Link from 'next/link'
import useCommonStore from '../stores/commonStore'

interface InfoProps {
  click: () => void
}

const Info = () => {
  const pathName = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const userInfo = useCommonStore((state) => state.userInfo)
  return (
    <>
      <div className="relative w-fit mx-auto">
        <img className="mx-auto" src="/assets/images/info-background.svg" alt="Info Background" />
        <div className="absolute top-0 left-0 right-0 w-full p-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="[clip-path:_polygon(8px_0%,100%_0%,100%_100%,0_100%,0_8px)] bg-gray-800 size-16">
                <img
                  className="size-16 [clip-path:_polygon(8px_0%,100%_0%,100%_100%,0_100%,0_8px)]"
                  src="/assets/images/avatar.png"
                  srcSet="/assets/images/avatar.png 1x, /assets/images/avatar@2x.png 2x"
                  alt="Avatar"
                />
              </div>
              <div className="cursor-pointer absolute bottom-0 right-0 size-6">
                <div className="border-[12px] border-r-yellow-500 border-b-yellow-500 border-l-transparent border-t-transparent"></div>
                <img
                  className="absolute right-0.5 bottom-0.5 !size-2.5"
                  src="/assets/images/icons/icon-photo-edit.svg"
                  alt="Icon Photo Edit"
                />
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="text-white text-base font-semibold min-h-5">{userInfo?.username}</div>
              <div className="flex items-center space-x-4">
                <Link href="/ranking" className="flex items-center space-x-1">
                  <span className="font-geist text-yellow-500">LV. {userInfo?.level}</span>
                  <img
                    className="size-6"
                    src="/assets/images/icons/icon-chevron-right-green.svg"
                    alt="Icon Chevron"
                  />
                </Link>
                <div className="w-[1px] h-5 bg-white/10"></div>
                <div className="flex items-center space-x-1">
                  <img
                    className="size-5"
                    src="/assets/images/icons/icon-thunder.svg"
                    alt="Icon Thunder"
                  />
                  <span className="font-geist text-yellow-500">{userInfo?.miningPower}</span>
                  <img
                    className="size-6"
                    src="/assets/images/icons/icon-chevron-right-green.svg"
                    alt="Icon Chevron"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="cursor-pointer p-2 m-2" onClick={onOpen}>
            <img
              className="size-6"
              src="/assets/images/icons/icon-settings.svg"
              alt="Icon Settings"
            />
          </div>
        </div>

        <div className="absolute left-[50%] bottom-[-15px] translate-x-[-50%] flex items-center space-x-1">
          <p className="font-geist uppercase text-white tracking-[-1px]">
            {pathName !== '/home' ? 'TP:' : 'total point'}
          </p>
          {pathName !== '/home' && (
            <div className="flex items-center space-x-1">
              <img
                className="size-5"
                src="/assets/images/point.png"
                srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                alt="Point"
              />
              <div className="text-point font-geist text-base font-bold">
                {' '}
                {userInfo?.point ? formatNumber(userInfo.point, 0, 0) : 0}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <div>
            <div className="font-airnt font-bold text-xl tracking-[1px] text-white text-center">
              avatar
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Info
