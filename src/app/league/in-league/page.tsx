'use client'

import CustomModal from '@/app/components/custom-modal'
import CustomPage from '@/app/components/custom-page'
import { IconChat, IconClipboard, IconLeave } from '@/app/components/icons'
import { TELE_URI } from '@/constants'
import { formatNumber } from '@/helper/common'
import { leaveLeague, userLeague } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'sonner'

export default function InLeaguePage() {
  const router = useRouter()
  const { currentLeague, setCurrentLeague } = useCommonStore()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [loadingButton, setLoadingButton] = useState(false)

  const handleShare = () => {
    if (currentLeague?.inviteLink) {
      window.open(
        `https://t.me/share/url?url=${TELE_URI}?start=${currentLeague.inviteLink}&text=🔰 Let's unite and make a difference!, 👉 Join now: ${TELE_URI}?start=${currentLeague.inviteLink}`,
        '_self'
      )
    }
  }

  const _getUserLeague = async () => {
    const res = await userLeague()
    if (res.status) {
      setCurrentLeague({ league: res.data })
    }
  }

  const handleLeave = async () => {
    if (currentLeague?.isOwner || loadingButton) {
      return
    }
    setLoadingButton(true)
    try {
      const res = await leaveLeague()
      if (res.status) {
        _getUserLeague()
        toast.success('Leave League successfully')
        router.push('/league')
      }
      setTimeout(() => {
        setLoadingButton(false)
      })
    } catch (ex) {
      setLoadingButton(false)
    }
  }

  const handleCopy = () => {
    if (currentLeague?.inviteLink) {
      toast.success('Copied!')
    }
  }

  useEffect(() => {
    _getUserLeague()
  }, [])

  return (
    <>
      <CustomPage>
        <div className="relative">
          <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full z-[-1]">
            <img className="mx-auto" src="/assets/images/league/league-background.svg" alt="" />
          </div>
          <div className="space-y-5">
            <div className="relative size-[200px] mx-auto before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-[14px] before:border-[7px] before:border-transparent before:border-t-white before:border-l-white after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-8 after:border-[16px] after:border-transparent after:border-b-white after:border-r-white">
              <div className="size-full p-[1px] [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)] bg-white">
                <img
                  className="size-full object-cover [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)]"
                  src={`${currentLeague?.avatar ? `${currentLeague.avatar}` : '/assets/images/league/league-04@2x.png'}`}
                  alt="DePIN Alliance"
                />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <div className="size-1.5 min-w-1.5 bg-white"></div>
              <div className="font-airnt font-medium text-title text-2xl tracking-[1px] leading-[28px] [text-shadow:_0_0_8px_rgba(255,255,255,0.5)]">
                {currentLeague?.name}
              </div>
              <div className="size-1.5 min-w-1.5 bg-white"></div>
            </div>
          </div>
          <div className="relative w-fit mx-auto my-6">
            <img src="/assets/images/league/in-league-frame.svg" alt="" />
            <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center space-x-20">
              <div className="space-y-2">
                <div className="text-title uppercase leading-[18px]">TOTAL MINING</div>
                <div className="flex items-center space-x-2">
                  <img
                    className="size-8"
                    src="/assets/images/point.png"
                    srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                    alt=""
                  />
                  <p className="text-green-500 font-semibold text-[28px] leading-[35px]">
                    {currentLeague?.totalMining ? formatNumber(currentLeague.totalMining, 0, 0) : 0}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-title uppercase leading-[18px]">CONTRIBUTORS</div>
                <div className="flex items-center space-x-2">
                  <img
                    className="size-8"
                    src="/assets/images/icons/icon-group-user-white.svg"
                    alt=""
                  />
                  <p className="text-green-500 font-semibold text-[28px] leading-[35px]">
                    {currentLeague?.totalContributors
                      ? formatNumber(currentLeague.totalContributors, 0, 0)
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="btn inactive">
            <div className="btn-border"></div>
            <div className="btn-inactive">Mining Together (Coming Soon)</div>
            <div className="btn-border"></div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-8">
            <div className="btn inactive size-[90px] mx-auto">
              <div className="btn-border"></div>
              <div className="btn-inactive !size-[80px] flex items-center justify-center flex-col !p-2">
                <IconClipboard className="size-8 mx-auto" />
                <p className="capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-sm mt-1">
                  Mission
                </p>
              </div>
              <div className="btn-border"></div>
            </div>
            <div className="btn inactive size-[90px] mx-auto">
              <div className="btn-border"></div>
              <div className="btn-inactive !size-[80px] flex items-center justify-center flex-col !p-2">
                <IconChat className="size-8" />
                <p className="capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-sm mt-1">
                  Chat
                </p>
              </div>
              <div className="btn-border"></div>
            </div>
            <CopyToClipboard
              text={`${TELE_URI}?start=${currentLeague?.inviteLink}`}
              onCopy={handleCopy}
            >
              <div className="btn default size-[90px] mx-auto">
                <div className="btn-border"></div>
                <div className="btn-default !size-[80px] flex items-center justify-center flex-col !p-2">
                  <img
                    className="size-8 mx-auto"
                    src="/assets/images/icons/icon-copy-gradient.svg"
                    alt=""
                  />
                  <p className="text-gradient capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-sm mt-1">
                    Invite
                  </p>
                </div>
                <div className="btn-border"></div>
              </div>
            </CopyToClipboard>
            <div
              onClick={onOpen}
              className={`btn default size-[90px] mx-auto ${currentLeague?.isOwner ? 'pointer-events-none' : ''}`}
            >
              <div className="btn-border"></div>
              <div className="btn-default !size-[80px] flex items-center justify-center flex-col !p-2">
                {/* <img className="size-8 mx-auto" src="/assets/images/icons/icon-leave.svg" alt="" /> */}
                <IconLeave
                  className={currentLeague?.isOwner ? 'text-inactive' : 'text-green-500'}
                />
                <p
                  className={`${currentLeague?.isOwner ? 'text-body' : 'text-gradient'}  capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-sm mt-1`}
                >
                  Leave
                </p>
              </div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomPage>
      <CustomModal
        title="Leave League"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>
              Do you want to leave this league{' '}
              <span className="text-[#1AF7A8]">{`"${currentLeague?.name}"`}</span>?
            </p>
          </div>
          <div className="mt-8 mb-10 flex items-center justify-center space-x-4">
            <div
              className={`p-[1px] size-[110px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center`}
            >
              <img
                className="size-full object-cover [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                src={`${currentLeague?.avatar ? `${currentLeague.avatar}` : '/assets/images/league/league-04@2x.png'}`}
                alt="DePIN Alliance"
              />
            </div>
            <div className="space-y-2">
              <p className="text-white font-semibold font-mona text-2xl leading-[28px]">
                {currentLeague?.name}
              </p>
              <p className="text-base leading-[20px] tracking-[-1px] text-yellow-500 uppercase">
                LV. {currentLeague?.level}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn default" onClick={onClose}>
              <div className="btn-border"></div>
              <div className="btn-default">Cancel</div>
              <div className="btn-border"></div>
            </div>
            <div className="btn error" onClick={handleLeave}>
              <div className="btn-border"></div>
              <div className="btn-error">Leave</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
