import { Modal, ModalContent } from '@nextui-org/react'
import React, { ReactNode } from 'react'
import { IconPoint } from '../icons'

interface ModalProps {
  isOpen: any
  onOpen: any
  onOpenChange: any
  onCloseModal?: any
  title?: string
  text?: ReactNode
  point: string
}

const ModalReward = ({
  isOpen,
  onOpen,
  onOpenChange,
  onCloseModal,
  title,
  text,
  point
}: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "max-w-full w-full h-full m-0 rounded-none p-0 bg-black/80 backdrop-blur-[4px]",
        backdrop: 'bg-transparent'
      }}
    >
      <ModalContent>
        <div className="relative max-w-[480px] mx-auto w-full h-full">
          <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center">
            <div className="container-custom">
              <div className="space-y-8">
                <div className="relative">
                  <img src="/assets/images/reward-frame.svg" alt="Frame" />
                  <div className="absolute top-0 left-0 right-0 h-full w-full flex items-center justify-center space-x-2">
                    <p className="text-point text-3xl xs:text-4xl 2xs:text-[40px] font-bold leading-[calc(48/40)] tracking-[-1px]">+{point}</p>
                    <IconPoint className="size-8 xs:size-9 2xs:size-10" />
                  </div>
                </div>
                <div className="text-center mb-6 space-y-3">
                      <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6 max-w-[320px] mx-auto">
                        <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                        <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">{title}</div>
                        <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                      </div>
                      <div className="xs:text-[15px] 2xs:text-base text-body font-geist leading-[20px]">
                        {text}
                      </div>
                    </div>
              </div>
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-6 xs:bottom-8 2xs:bottom-10 w-full px-4">
            <div className="btn" onClick={onCloseModal}>
              <div className="btn-border"></div>
              <div className="btn-primary">CLAIM REWARD</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ModalReward
