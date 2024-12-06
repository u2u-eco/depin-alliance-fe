import CustomModal from '@/app/components/custom-modal'
import { IconPhonePlay } from '@/app/components/icons'
import { useAppSound } from '@/hooks/useAppSound'
import React from 'react'

interface ModalProps {
  handleSkip: () => void
  handleStart: () => void
}

const TutorialModal = ({ handleStart, handleSkip }: ModalProps) => {
  const { buttonSound } = useAppSound()

  return (
    <div className="[--space:_24px] xs:[--space:_32px] h-[100vh] w-[100vw] max-w-[512px] flex flex-col justify-between px-3 xs:px-4 mx-auto">
      <div className="flex flex-1 flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
        <div className="relative drop-shadow-green before:content-[''] before:absolute before:top-[6px] xs:before:top-[7px] 2xs:before:top-[8px] before:left-[6px] xs:before:left-[7px] 2xs:before:left-[8px] before:border-transparent before:size-2.5 xs:before:size-3 2xs:before:size-[14px] before:border-[5px] xs:before:border-[6px] 2xs:before:border-[7px] before:border-t-green-500 before:border-l-green-500 before:z-[-1] after:content-[''] after:absolute after:bottom-0 after:right-0 after:border-transparent after:size-4 xs:after:size-[18px] 2xs:after:size-5 after:border-[8px] xs:after:border-[9px] 2xs:after:border-[10px] after:border-b-green-500 after:border-r-green-500 after:z-[-1]">
          <div className="[--shape:_22px] xs:[--shape:_26px] 2xs:[--shape:_30px] p-[1px] size-[100px] xs:size-[115px] 2xs:size-[130px] bg-gradient [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))]">
            <div className="[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] bg-[linear-gradient(to_bottom,#000,#00331d)] size-full flex items-center justify-center">
              <IconPhonePlay className="size-12 xs:size-14 2xs:size-16" gradient />
            </div>
          </div>
        </div>
        <div className="text-center mb-6 space-y-3">
          <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6 mx-auto">
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">
              Newbie tutorial
            </div>
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
          </div>
          <div className="text-sm xs:text-[15px] 2xs:text-base text-body font-geist !leading-[18px] xs:!leading-[20px] tracking-[-1px]">
            {`Before you start contributing your power, DePIN Leader will provide more information on how everything works. After completing the tutorial, you'll receive a bonus reward and start the journey.`}
          </div>
        </div>
      </div>
      <div className="my-4 xs:my-6 2xs:my-8 flex space-x-3 xs:space-x-4">
        <div
          className="btn default"
          onClick={() => {
            handleSkip()
          }}
        >
          <div className="btn-border"></div>
          <div className="btn-default">Skip</div>
          <div className="btn-border"></div>
        </div>
        <div
          className="btn"
          onClick={() => {
            handleStart()
          }}
        >
          <div className="btn-border"></div>
          <div className="btn-primary">Start</div>
          <div className="btn-border"></div>
        </div>
      </div>
    </div>
  )
}

export default TutorialModal
