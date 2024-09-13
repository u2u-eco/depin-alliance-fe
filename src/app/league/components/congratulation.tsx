import CustomModal from '@/app/components/custom-modal'
import React from 'react'

interface ModalProps {
  isOpen: any
  onOpen: any
  onOpenChange: any
  onClose?: any
}

const CongratulationModal = ({ isOpen, onOpen, onOpenChange, onClose }: ModalProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      full
    >
      <div className="h-full flex flex-col justify-between p-4">
        <div className="flex flex-1 flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
          <div className="relative">
            <div className="drop-shadow-[0_0_16px_rgba(0,153,86,0.5)]">
              <img src="/assets/images/reward-frame.svg" alt="Frame" />
            </div>
          </div>
          <div className="text-center mb-6 space-y-3">
            <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6 max-w-[320px] mx-auto">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">
                Create new league
              </div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            <div className="xs:text-[15px] 2xs:text-base text-body font-geist leading-[20px]">
              {`Congratulations! You’ve created new league. Let's invite more engineers to help the world better.`}
            </div>
          </div>
        </div>
        <div className="m-4 xs:m-6 2xs:m-8">
          <div className="btn" onClick={onClose}>
            <div className="btn-border"></div>
            <div className="btn-primary">OK</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default CongratulationModal
