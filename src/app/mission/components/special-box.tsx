import CustomModal from '@/app/components/custom-modal'
import React from 'react'

interface ModalProps {
  isOpen: any
  onOpen?: any
  onOpenChange: any
  onClose?: any
}

const SpecialBoxModal = ({ isOpen, onOpen, onOpenChange, onClose }: ModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} onOpenChange={onOpenChange} full>
      <div className="h-full flex flex-col justify-between p-4">
        <div className="flex flex-1 flex-col items-center justify-center space-y-3">
          <div className="relative size-[250px]">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] size-full bg-[rgba(0,255,144,0.5)] z-[-1] blur-[75px]"></div>
            <img
              src="/assets/images/item-special.png"
              srcSet="/assets/images/item-special.png 1x, /assets/images/item-special@2x.png 2x"
              alt="DePIN Alliance"
              className="size-full"
            />
          </div>
          <div className="flex items-center justify-center space-x-6 ">
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            <div className="font-airnt font-medium text-lg xs:text-xl tracking-[1px] text-title text-center leading-[22px] xs:leading-[24px]">
              Congratulation{' '}
            </div>
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
          </div>
          <p className="text-body text-base leading-[20px] tracking-[-1px] text-center">
            You’ve received this special box.
          </p>
        </div>
        <div className="m-8">
          <div className="btn" onClick={onClose}>
            <div className="btn-border"></div>
            <div className="btn-primary">Claim</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default SpecialBoxModal