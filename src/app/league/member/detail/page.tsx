'use client'

import CustomPage from '@/app/components/custom-page'
import {
  IconDelete,
  IconFund,
  IconGroupUser,
  IconLeave,
  IconPoint,
  IconProfit
} from '@/app/components/icons'
import { CustomHeader } from '@/app/components/ui/custom-header'
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CustomModal from '@/app/components/custom-modal'
import { formatNumber } from '@/helper/common'
import { useDisclosure } from '@nextui-org/react'
import { IJoinRequest } from '@/interfaces/i.league'
import { kickUserInLeague } from '@/services/league'
import { toast } from 'sonner'
import CustomToast from '@/app/components/ui/custom-toast'

export default function MemberDetailPage() {
  const [isOwner] = useState(true)
  const [isMod] = useState(false)
  const [activeJoin, setActiveJoin] = useState(false)
  const [activeKick, setActiveKick] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const currentUser = useRef<IJoinRequest | null>(null)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const handleActiveJoin = () => {
    setActiveJoin(!activeJoin)
  }
  const handleActiveKick = () => {
    setActiveKick(!activeKick)
  }
  const handleKickModal = () => {
    onOpen()
  }
  const handleKick = async () => {
    if (isLoadingAction) return
    if (currentUser?.current?.id) {
      setIsLoadingAction(true)
      const res = await kickUserInLeague(currentUser.current.id)
      if (res.status) {
        toast.dismiss()
        toast.success(<CustomToast title="Kick member successfully" type="success" />)
        onClose()
      }
      setIsLoadingAction(false)
    }
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-[5%] before:left-[-255px] before:size-[355px] before:rounded-[50%] before:blur-[75px] before:bg-green-500 before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:top-[5%] after:right-[-255px] after:size-[355px] after:rounded-[50%] after:blur-[75px] after:bg-yellow-500 after:opacity-30 after:z-[-1]"
        }}
      >
        <CustomHeader title="Member Detail" />
        <div className="relative mt-10 xs:mt-12 2xs:mt-14">
          <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full z-[-1]">
            <img className="mx-auto" src="/assets/images/league/league-background.svg" alt="" />
          </div>
          <div className="space-y-6 mb-6">
            <div className="relative size-[160px] xs:size-[180px] 2xs:size-[200px] mx-auto before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-[14px] before:border-[7px] before:border-transparent before:border-t-white before:border-l-white after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-8 after:border-[16px] after:border-transparent after:border-b-white after:border-r-white">
              <div className="size-full p-[1px] [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)] bg-white">
                <img
                  className="size-full object-cover [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)]"
                  src={`/assets/images/league/league-03@2x.png`}
                  alt="DePIN Alliance"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 xs:space-x-4 2xs:space-x-6">
                <div className="size-1.5 min-w-1.5 bg-white"></div>
                <div className="text-center font-airnt font-medium text-title text-lg xs:text-xl 2xs:text-2xl tracking-[1px] !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px] [text-shadow:_0_0_8px_rgba(255,255,255,0.5)] [word-break:_break-word;]">
                  BLACK RHINOS
                </div>
                <div className="size-1.5 min-w-1.5 bg-white"></div>
              </div>
              <div className="flex items-center justify-center space-x-10">
                <div className="w-8 h-[1px] bg-yellow-800"></div>
                <div className="text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-yellow-500 uppercase">
                  {`</ MEMBER />`}
                </div>
                <div className="w-8 h-[1px] bg-yellow-800"></div>
              </div>
            </div>
          </div>
          <div className="relative w-fit mx-auto my-6 xs:my-7 2xs:my-8">
            <img src="/assets/images/league/in-league-frame.svg" alt="" />
            <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-between px-4 xs:px-6 2xs:px-8 space-x-3 xs:space-x-4">
              <div className="space-y-1 xs:space-y-2">
                <div className="text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
                  TOTAL MINING
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    className="size-6 xs:size-7 2xs:size-8"
                    src="/assets/images/point.png"
                    srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                    alt=""
                  />
                  <p className="text-green-500 uppercase font-semibold text-xl xs:text-2xl 2xs:text-[28px] !leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                    100K
                  </p>
                </div>
              </div>
              <div className="space-y-1 xs:space-y-2">
                <div className="text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
                  CONTRIBUTORS
                </div>
                <div className="flex items-center space-x-2">
                  <IconGroupUser className="size-6 xs:size-7 2xs:size-8 text-white" />
                  <p className="text-green-500 uppercase font-semibold text-xl xs:text-2xl 2xs:text-[28px] !leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                    581
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 xs:space-x-4">
            <div className="flex-1">
              <div className="btn cursor-default">
                <div className="btn-border"></div>
                <div className="font-geist !px-2 !py-4 xs:!py-5 2xs:!py-6 relative w-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:[background:_linear-gradient(to_bottom,rgba(146,152,32,0),rgba(146,152,32,1))] before:opacity-15 before:z-[-1]">
                  <div className="space-y-3 xs:space-y-4">
                    <IconFund className="text-yellow-500 size-8 xs:size-10 2xs:size-12 mx-auto" />
                    <div className="space-y-1.5 xs:space-y-2">
                      <p className="text-center text-[13px] xs:text-sm font-normal uppercase text-title tracking-[-1px] leading-[18px]">
                        TOTAL FUNDING
                      </p>
                      <div className="flex items-center justify-center space-x-1.5 xs:space-x-2">
                        <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                        <p className="text-yellow-500 font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px] uppercase">
                          100K
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-border"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="btn cursor-default">
                <div className="btn-border"></div>
                <div className="font-geist !px-2 !py-4 xs:!py-5 2xs:!py-6 relative w-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:[background:_linear-gradient(to_bottom,rgba(0,153,86,0),rgba(0,153,86,1))] before:opacity-15 before:z-[-1]">
                  <div className="space-y-3 xs:space-y-4">
                    <IconProfit className="text-green-500 size-8 xs:size-10 2xs:size-12 mx-auto" />
                    <div className="space-y-1.5 xs:space-y-2">
                      <p className="text-center text-[13px] xs:text-sm font-normal uppercase text-title tracking-[-1px] leading-[18px]">
                        CONTRIBUTED
                      </p>
                      <div className="flex items-center justify-center space-x-1.5 xs:space-x-2">
                        <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                        <p className="text-green-500 font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px] uppercase">
                          100K/h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-border"></div>
              </div>
            </div>
          </div>
          {(isOwner || isMod) && (
            <div className="space-y-4 mt-6 xs:mt-7 2xs:mt-8">
              {isOwner && (
                <>
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
                </>
              )}
              <div className="relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:size-6 xs:before:size-7 2xs:before:size-8 before:border-[12px] xs:before:border-[14px] 2xs:before:border-[16px] before:border-transparent before:border-b-white/5 before:border-r-white/5 cursor-pointer">
                <div className="[--shape:_34px] xs:[--shape:_40px] 2xs:[--shape:_46px] py-3 xs:py-4 2xs:py-5 px-6 xs:px-7 2xs:px-8 flex items-center justify-between [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_20px)] bg-white/5 min-h-[70px] xs:min-h-[80px] 2xs:min-h-[90px]">
                  <div className="space-y-1.5 xs:space-y-2">
                    <p className="font-mona text-[15px] xs:text-base 2xs:text-lg font-semibold text-white !leading-[20px] 2xs:!leading-[22px]">
                      Delete this member{' '}
                    </p>
                  </div>
                  <div className="cursor-pointer" onClick={handleKickModal}>
                    <IconDelete className="size-7 xs:size-8 2xs:size-9 text-error-blur" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CustomPage>
      <CustomModal title="Kick member" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>
              Are you sure you want to kick this member{' '}
              <span className="text-[#1AF7A8] [word-break:_break-word;]">{`"${currentUser.current?.username}"`}</span>
              ?
            </p>
          </div>
          <div className="mt-8 mb-10 flex items-center justify-center space-x-3 xs:space-x-4">
            <div
              className={`p-[1px] size-[110px] min-w-[110px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center`}
            >
              <img
                className="size-full object-cover [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                src={currentUser.current?.avatar || '/assets/images/league/league-04@2x.png'}
                alt="DePIN Alliance"
              />
            </div>
            <div className="space-y-1.5 xs:space-y-2">
              <p className="text-white font-semibold font-mona text-lg xs:text-xl 2xs:text-2xl !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px]  [word-break:_break-word;]">
                {currentUser.current?.username}
              </p>
              <div className="flex items-center space-x-1.5 xs:space-x-2">
                <IconPoint className="size-5 xs:size-6" />
                <span className="text-primary font-semibold">{`${formatNumber(currentUser?.current?.miningPower || 0, 0, 2)}/h`}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn default" onClick={onClose}>
              <div className="btn-border"></div>
              <div className="btn-default">Cancel</div>
              <div className="btn-border"></div>
            </div>
            <div className="btn error" onClick={handleKick}>
              <div className="btn-border"></div>
              <div className="btn-error">KICK</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
