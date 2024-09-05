import { Modal, ModalContent } from '@nextui-org/react'
import React, { ReactNode } from 'react'
import { IconPoint } from '../icons'
import CustomModal from '../custom-modal'

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
    <CustomModal
      isOpen={isOpen}
      onClose={onCloseModal}
      onOpenChange={onOpenChange}
      full
    >
      <div className="h-full flex flex-col justify-between p-4">
        <div className="flex flex-1 flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
          <div className="relative">
            <div className="drop-shadow-[0_0_16px_rgba(0,153,86,0.5)]">
              <img src="/assets/images/reward-frame.svg" alt="Frame" />
            </div>
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
        <div className="m-4 xs:m-6 2xs:m-8">
          <div className="btn" onClick={onCloseModal}>
            <div className="btn-border"></div>
            <div className="btn-primary">CLAIM REWARD</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default ModalReward
