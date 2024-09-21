'use client'

import CustomModal from '@/app/components/custom-modal'
import CustomPage from '@/app/components/custom-page'
import {
  IconChat,
  IconClipboard,
  IconLeave,
  IconMember,
  IconPoint,
  IconShare,
  IconUserAddCircle
} from '@/app/components/icons'
import CustomToast from '@/app/components/ui/custom-toast'
import { TELE_URI } from '@/constants'
import { formatNumber } from '@/helper/common'
import { getTotalJoinRequest, leaveLeague, userLeague } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'sonner'

export default function InLeaguePage() {
  const router = useRouter()
  const { currentLeague, setCurrentLeague } = useCommonStore()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [loadingButton, setLoadingButton] = useState(false)

  const { data: totalJoinRequest } = useQuery({
    queryKey: ['getTotalJoinRequest'],
    queryFn: getTotalJoinRequest,
    enabled: Boolean(currentLeague?.isOwner)
  })
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
    if (res.status && res.data && !res.data?.isPendingRequest) {
      setCurrentLeague({ league: res.data })
    } else {
      router.push('/league')
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
        toast.success(<CustomToast type="success" title="Leave League successfully!" />)
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
      toast.success(<CustomToast type="success" title="Copied!" />)
    }
  }

  useEffect(() => {
    _getUserLeague()
  }, [])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-[5%] before:left-[-255px] before:size-[355px] before:rounded-[50%] before:blur-[75px] before:bg-green-500 before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:top-[5%] after:right-[-255px] after:size-[355px] after:rounded-[50%] after:blur-[75px] after:bg-yellow-500 after:opacity-30 after:z-[-1]"
        }}
      >
        <div className="relative">
          <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full z-[-1]">
            <img className="mx-auto" src="/assets/images/league/league-background.svg" alt="" />
          </div>
          <div className="space-y-5 mb-6">
            <div className="relative size-[160px] xs:size-[180px] 2xs:size-[200px] mx-auto before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-[14px] before:border-[7px] before:border-transparent before:border-t-white before:border-l-white after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-8 after:border-[16px] after:border-transparent after:border-b-white after:border-r-white">
              <div className="size-full p-[1px] [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)] bg-white">
                <img
                  className="size-full object-cover [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)]"
                  src={`${currentLeague?.avatar ? `${currentLeague.avatar}` : '/assets/images/league/league-04@2x.png'}`}
                  alt="DePIN Alliance"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 xs:space-x-4 2xs:space-x-6">
                <div className="size-1.5 min-w-1.5 bg-white"></div>
                <div className="text-center font-airnt font-medium text-title text-lg xs:text-xl 2xs:text-2xl tracking-[1px] !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px] [text-shadow:_0_0_8px_rgba(255,255,255,0.5)] [word-break:_break-word;]">
                  {currentLeague?.name}
                </div>
                <div className="size-1.5 min-w-1.5 bg-white"></div>
              </div>
              <div className="flex items-center justify-center space-x-10">
                <div className="w-8 h-[1px] bg-yellow-800"></div>
                <div className="text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-yellow-500 uppercase">
                  {currentLeague?.isOwner ? 'Admin' : 'Member'}
                </div>
                <div className="w-8 h-[1px] bg-yellow-800"></div>
              </div>
            </div>
          </div>
          {/* Progress */}
          {/* <div className="mb-6 xs:mb-8 2xs:mb-10 space-y-2">
            <div className="relative bg-gray-850 h-1.5 xs:h-2 rounded-2xl w-full">
              <div className="absolute top-0 left-0 h-full bg-gradient rounded-2xl before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:bg-gradient before:blur-[6px] w-[68%]"></div>
            </div>
            <div className="flex items-center justify-between text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-body uppercase">
              <p>LV. 100</p>
              <p>
                <span className="text-title">1,400/</span>1400
              </p>
            </div>
          </div> */}
          <div className="space-y-6 xs:space-y-7 2xs:space-y-8">
            {/* Mining Together */}
            <div className="btn inactive">
              <div className="btn-border"></div>
              <div className="btn-inactive !px-3">Mining Together (Coming Soon)</div>
              <div className="btn-border"></div>
            </div>
            {/* Total Mining */}
            <div className="relative w-fit mx-auto">
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
                    <p className="text-inactive font-semibold text-xl xs:text-2xl 2xs:text-[28px] !leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                      0
                    </p>
                  </div>
                </div>
                <div className="space-y-1 xs:space-y-2">
                  <div className="text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
                    CONTRIBUTORS
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      className="size-6 xs:size-7 2xs:size-8"
                      src="/assets/images/icons/icon-group-user-white.svg"
                      alt=""
                    />
                    <p className="text-green-500 font-semibold text-xl xs:text-2xl 2xs:text-[28px] !leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                      {currentLeague?.totalContributors
                        ? formatNumber(currentLeague.totalContributors, 0, 0)
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Link */}
            <div className="flex items-center justify-between min-[355px]:space-x-2 xs:space-x-3">
              <div className="space-y-1 text-center text-inactive pointer-events-none cursor-pointer transition-colors hover:text-green-500">
                <IconChat className="size-6 xs:size-7 2xs:size-8 mx-auto" />
                <p className="text-[13px] xs:text-sm !leading-[18px]">Chat</p>
              </div>
              <div className="min-[355px]:w-4 xs:w-5 2xs:w-6 h-[1px] bg-green-800"></div>
              <div className="space-y-1 text-center text-inactive pointer-events-none cursor-pointer transition-colors hover:text-green-500">
                <IconClipboard className="size-6 xs:size-7 2xs:size-8 mx-auto" />
                <p className="text-[13px] xs:text-sm !leading-[18px]">Mission</p>
              </div>
              <div className="min-[355px]:w-4 xs:w-5 2xs:w-6 h-[1px] bg-green-800"></div>
              {/* <CopyToClipboard
                text={`${TELE_URI}?start=${currentLeague?.inviteLink}`}
                onCopy={handleCopy}
              > */}
              <div
                className="space-y-1 text-center text-body cursor-pointer transition-colors hover:text-green-500"
                onClick={handleShare}
              >
                <IconShare className="size-6 xs:size-7 2xs:size-8 mx-auto" />
                <p className="text-[13px] xs:text-sm !leading-[18px]">Share</p>
              </div>
              {/* </CopyToClipboard> */}
              <div className="min-[355px]:w-4 xs:w-5 2xs:w-6 h-[1px] bg-green-800"></div>
              <Link
                href="/league/member"
                className="space-y-1 text-center text-body cursor-pointer transition-colors hover:text-green-500"
              >
                <IconMember className="size-6 xs:size-7 2xs:size-8 mx-auto" />
                <p className="text-[13px] xs:text-sm !leading-[18px]">Member</p>
              </Link>
              <div className="min-[355px]:w-4 xs:w-5 2xs:w-6 h-[1px] bg-green-800"></div>
              <div
                className={`space-y-1 text-center text-body cursor-pointer transition-colors hover:text-green-500 ${currentLeague?.isOwner ? 'pointer-events-none text-inactive' : ''}`}
                onClick={onOpen}
              >
                <IconLeave className="size-6 xs:size-7 2xs:size-8 mx-auto" />
                <p className="text-[13px] xs:text-sm !leading-[18px]">Leave</p>
              </div>
            </div>
            {/* Join Request */}
            {currentLeague?.isOwner && (
              <Link href="/league/join-request" className="btn default">
                <div className="btn-border"></div>
                <div className="btn-default !py-2.5 2xs:!py-2">
                  <div className="flex items-center justify-center space-x-1.5 xs:space-x-2">
                    <IconUserAddCircle className="size-6 xs:size-7 2xs:size-8 text-body" />
                    <p className="text-body text-[15px] xs:text-base !leading-[20px] font-normal tracking-[-1px]">
                      JOIN REQUEST{' '}
                      <span className="text-green-500 ml-1">
                        ({formatNumber(totalJoinRequest?.data || 0, 0, 0)})
                      </span>
                    </p>
                  </div>
                </div>
                <div className="btn-border"></div>
              </Link>
            )}
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
              <span className="text-[#1AF7A8] [word-break:_break-word;]">{`"${currentLeague?.name}"`}</span>
              ?
            </p>
          </div>
          <div className="mt-8 mb-10 flex items-center justify-center space-x-3 xs:space-x-4">
            <div
              className={`p-[1px] size-[110px] min-w-[110px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center`}
            >
              <img
                className="size-full object-cover [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                src={`${currentLeague?.avatar ? `${currentLeague.avatar}` : '/assets/images/league/league-04@2x.png'}`}
                alt="DePIN Alliance"
              />
            </div>
            <div className="space-y-1.5 xs:space-y-2">
              <p className="text-white font-semibold font-mona text-lg xs:text-xl 2xs:text-2xl !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px]  [word-break:_break-word;]">
                {currentLeague?.name}
              </p>
              <div className="flex items-center space-x-1.5 xs:space-x-2">
                <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                <span className="text-primary font-semibold xs:text-base 2xs:text-lg">
                  {currentLeague?.totalMining ? formatNumber(currentLeague.totalMining, 0, 2) : 0}/h
                </span>
              </div>
              {/* <p className="text-base leading-[20px] tracking-[-1px] text-yellow-500 uppercase">
                LV. {currentLeague?.level}
              </p> */}
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
