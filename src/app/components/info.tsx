import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import React from 'react'

interface InfoProps {
  click: () => void
}

const Info = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return (
    <>    
      <div className="relative w-fit mx-auto">
        <img className="mx-auto" src="/assets/images/info-background.svg" alt="Info Background" />
        <div className="absolute top-0 left-0 right-0 w-full p-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="[clip-path:_polygon(8px_0%,100%_0%,100%_100%,0_100%,0_8px)] bg-gray-800 size-16">
                <img className="size-16 [clip-path:_polygon(8px_0%,100%_0%,100%_100%,0_100%,0_8px)]" src="/assets/images/avatar.png" srcSet="/assets/images/avatar.png 1x, /assets/images/avatar@2x.png 2x" alt="Avatar" />
              </div>
              <div className="cursor-pointer absolute bottom-0 right-0 size-6">
                <div className="border-[12px] border-r-yellow border-b-yellow border-l-transparent border-t-transparent"></div>
                <img className="absolute right-0.5 bottom-0.5 !size-2.5" src="/assets/images/icons/icon-photo-edit.svg" alt="Icon Photo Edit" />
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="text-white text-base font-semibold">Long Nhong</div>
              <div className="flex items-center space-x-1">
                {/* <img className="size-4" src="/assets/images/icons/icon-star-circle.svg" alt="Icon Start" /> */}
                <span className="font-geist text-yellow">LV. 1</span>
                <img className="size-6" src="/assets/images/icons/icon-chevron-right-yellow.svg" alt="Icon Chevron" />
              </div>
            </div>
          </div>
          <div className="cursor-pointer p-2 m-2" onClick={onOpen}>
            <img className="size-6" src="/assets/images/icons/icon-settings.svg" alt="Icon Settings" />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <div>
            <div className="font-airnt font-bold text-xl tracking-[1px] text-white text-center">avatar</div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Info