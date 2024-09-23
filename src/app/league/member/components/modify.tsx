import CustomModal from '@/app/components/custom-modal'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IconLeave } from '@/app/components/icons'

interface ModalProps {
  isOpen: any
  onOpen?: any
  onOpenChange: any
  onClose?: any
  handleKickModal?: () => void
}

const ModifyModal = ({ isOpen, onOpen, onOpenChange, onClose, handleKickModal }: ModalProps) => {
  const [activeJoin, setActiveJoin] = useState(false)
  const [activeKick, setActiveKick] = useState(false)

  const handleActiveJoin = () => {
    setActiveJoin(!activeJoin)
  }
  const handleActiveKick = () => {
    setActiveKick(!activeKick)
  }

  return (
    <>
      <CustomModal title="modify" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div className="space-y-4 mt-5">
          <div className="relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:size-6 xs:before:size-7 2xs:before:size-8 before:border-[12px] xs:before:border-[14px] 2xs:before:border-[16px] before:border-transparent before:border-b-white/5 before:border-r-white/5 cursor-pointer">
            <div className="[--shape:_34px] xs:[--shape:_40px] 2xs:[--shape:_46px] py-3 xs:py-4 2xs:py-5 px-6 xs:px-7 2xs:px-8 flex items-center justify-between [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_20px)] bg-white/5 min-h-[70px] xs:min-h-[80px] 2xs:min-h-[90px]">
              <div className="space-y-1.5 xs:space-y-2">
                <p className="font-mona text-[15px] xs:text-base 2xs:text-lg font-semibold text-white !leading-[20px] 2xs:!leading-[22px]">
                  Accept & Deline join request
                </p>
                <p className="text-body text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] tracking-[-1px]">
                  Turn {activeJoin ? 'on' : 'off'}
                </p>
              </div>
              <motion.div
                whileTap={{ scale: 0.86 }}
                className="cursor-pointer"
                onClick={() => handleActiveJoin()}
              >
                <div
                  className={`relative size-5 xs:size-6 rotate-45 border-2 border-green-700 transition-all ${activeJoin ? 'bg-white/10' : ''}`}
                >
                  <div
                    className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${activeJoin ? 'opacity-100' : ''}`}
                  ></div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:size-6 xs:before:size-7 2xs:before:size-8 before:border-[12px] xs:before:border-[14px] 2xs:before:border-[16px] before:border-transparent before:border-b-white/5 before:border-r-white/5 cursor-pointer">
            <div className="[--shape:_34px] xs:[--shape:_40px] 2xs:[--shape:_46px] py-3 xs:py-4 2xs:py-5 px-6 xs:px-7 2xs:px-8 flex items-center justify-between [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_20px)] bg-white/5 min-h-[70px] xs:min-h-[80px] 2xs:min-h-[90px]">
              <div className="space-y-1.5 xs:space-y-2">
                <p className="font-mona text-[15px] xs:text-base 2xs:text-lg font-semibold text-white !leading-[20px] 2xs:!leading-[22px]">
                  Kick member out of League{' '}
                </p>
                <p className="text-body text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] tracking-[-1px]">
                  Turn {activeKick ? 'on' : 'off'}
                </p>
              </div>
              <motion.div
                whileTap={{ scale: 0.86 }}
                className="cursor-pointer"
                onClick={() => handleActiveKick()}
              >
                <div
                  className={`relative size-5 xs:size-6 rotate-45 border-2 border-green-700 transition-all ${activeKick ? 'bg-white/10' : ''}`}
                >
                  <div
                    className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-2.5 xs:size-3 bg-gradient transition-all opacity-0 ${activeKick ? 'opacity-100' : ''}`}
                  ></div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:size-6 xs:before:size-7 2xs:before:size-8 before:border-[12px] xs:before:border-[14px] 2xs:before:border-[16px] before:border-transparent before:border-b-white/5 before:border-r-white/5 cursor-pointer">
            <div className="[--shape:_34px] xs:[--shape:_40px] 2xs:[--shape:_46px] py-3 xs:py-4 2xs:py-5 px-6 xs:px-7 2xs:px-8 flex items-center justify-between [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_20px)] bg-white/5 min-h-[70px] xs:min-h-[80px] 2xs:min-h-[90px]">
              <div className="space-y-1.5 xs:space-y-2">
                <p className="font-mona text-[15px] xs:text-base 2xs:text-lg font-semibold text-white !leading-[20px] 2xs:!leading-[22px]">
                  Delete this member{' '}
                </p>
              </div>
              <div className="cursor-pointer" onClick={handleKickModal}>
                <IconLeave gradient className="size-7 xs:size-8 2xs:size-9" />
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default ModifyModal
