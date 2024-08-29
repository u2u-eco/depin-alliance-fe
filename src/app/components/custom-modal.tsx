import React, { ReactNode } from 'react'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'

interface ModalProps {
  title: string
  children: ReactNode
  isOpen: any
  onOpen: any
  onOpenChange: any
}

const CustomModal = ({ title, children, isOpen, onOpen, onOpenChange }: ModalProps) => {
  // const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom"
      hideCloseButton
      classNames={{
        base: "max-w-full m-0 rounded-none bg-green-600 before:content-[''] before:bottom-0 before:absolute before:left-0 before:size-full before:z-[-1] before:bg-[linear-gradient(to_top,#000000,#002012)] py-10 px-4 border-t-[0.5px] border-t-green-600 [clip-path:_polygon(40px_0,100%_0,100%_100%,_0_100%,0_40px)] before:[clip-path:_polygon(40px_0,100%_0,100%_100%,_0_100%,0_40px)]",
        backdrop: "bg-black/30 backdrop-blur-[8px]"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="max-w-[480px] mx-auto">
            <div className="absolute top-6 right-4 cursor-pointer" onClick={onClose}>
              <img className="size-6" src="/assets/images/icons/icon-close.svg" alt="Icon Close" />
            </div>
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-2xl tracking-[1px] text-title text-center leading-[28px]">{title}</div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            {children}
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal