import CustomModal from '@/app/components/custom-modal'
import { IconCongratulation } from '@/app/components/icons'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ModalProps {
  isOpen: any
  onOpen: any
  onOpenChange: any
  onClose?: any
}

const CongratulationModal = ({ isOpen, onOpen, onOpenChange, onClose }: ModalProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/league/in-league')
  }

  return (
    <CustomModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose} full>
      <div className="h-full flex flex-col justify-between p-4">
        <div className="flex flex-1 flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
          <div className="relative drop-shadow-green before:content-[''] before:absolute before:top-[6px] xs:before:top-[7px] 2xs:before:top-[8px] before:left-[6px] xs:before:left-[7px] 2xs:before:left-[8px] before:border-transparent before:size-2.5 xs:before:size-3 2xs:before:size-[14px] before:border-[5px] xs:before:border-[6px] 2xs:before:border-[7px] before:border-t-green-500 before:border-l-green-500 before:z-[-1] after:content-[''] after:absolute after:bottom-0 after:right-0 after:border-transparent after:size-4 xs:after:size-[18px] 2xs:after:size-5 after:border-[8px] xs:after:border-[9px] 2xs:after:border-[10px] after:border-b-green-500 after:border-r-green-500 after:z-[-1]">
            <div className="[--shape:_22px] xs:[--shape:_26px] 2xs:[--shape:_30px] p-[1px] size-[100px] xs:size-[115px] 2xs:size-[130px] bg-gradient [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))]">
              <div className="[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] bg-[linear-gradient(to_bottom,#000,#00331d)] size-full flex items-center justify-center">
                <IconCongratulation className="size-12 xs:size-14 2xs:size-16" gradient />
              </div>
            </div>
          </div>
          <div className="text-center mb-6 space-y-3">
            <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6 mx-auto">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">
                Create new league
              </div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            <div className="xs:text-[15px] 2xs:text-base text-body font-geist !leading-[20px] tracking-[-1px]">
              {`Congratulations! You’ve created new league. Let's invite more engineers to help the world better.`}
            </div>
          </div>
        </div>
        <div className="m-4 xs:m-6 2xs:m-8">
          <div className="btn" onClick={handleClick}>
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
