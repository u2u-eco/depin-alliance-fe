/* eslint-disable @next/next/no-img-element */
'use client'

import CustomModal from '@/app/components/custom-modal'
import CustomPage from '@/app/components/custom-page'
import { filetoDataURL, dataURLtoFile, EImageType } from 'image-conversion'
import copy from 'copy-to-clipboard'
import {
  IconChange,
  IconChat,
  IconClipboard,
  IconFund,
  IconGroupUser,
  IconInnovate,
  IconLeague,
  IconLeave,
  IconMember,
  IconOpenLink,
  IconPlus,
  IconPoint,
  IconProfit,
  IconRank,
  IconResearch,
  IconUserAdd,
  IconUserAddCircle
} from '@/app/components/icons'
import CustomToast from '@/app/components/ui/custom-toast'
import { MAX_SIZE_UPLOAD, TELE_URI } from '@/constants'
import { formatNumber, kFormatter } from '@/helper/common'
import { useAppSound } from '@/hooks/useAppSound'
import {
  getRankOfLeague,
  getTotalJoinRequest,
  leaveLeague,
  updateAvatarLeague,
  userLeague
} from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import Loader from '@/app/components/ui/loader'
import LeaveModal from '../components/leave'
import FundingModal from '../components/funding'
import ContributeModal from '../components/contribute'
import SelectAdminModal from '../components/select-admin'

const LEAGUE_TYPE = {
  LEAVE: 'leave',
  FUNDING: 'funding',
  CONTRIBUTE: 'contribute',
  MISSION: 'mission',
  MEMBER: 'member',
  CHAT: 'chat',
  INVITE: 'invite',
  RESEARCH: 'research',
  INNOVATE: 'innovate',
  LEAGUES: 'leagues',
  SELECT: 'select'
}

export default function InLeaguePage() {
  const router = useRouter()
  const { currentLeague, setCurrentLeague } = useCommonStore()
  const [role, setRole] = useState<string | null>(null)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const [loadingButton, setLoadingButton] = useState(false)
  const { buttonSound, tabSound } = useAppSound()
  const [isLoadingAvatar, setLoadingAvatar] = useState<boolean>(false)
  const file = useRef<any>()
  const [activeType, setActiveType] = useState(LEAGUE_TYPE.LEAVE)

  const listLink = [
    {
      id: 1,
      icon: <IconClipboard className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'mission',
      class: 'pointer-events-none text-inactive'
    },
    {
      id: 2,
      icon: <IconMember className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'member',
      class: ''
    },
    {
      id: 3,
      icon: <IconChat className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'chat',
      class: 'pointer-events-none text-inactive'
    },
    {
      id: 4,
      icon: <IconUserAdd className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'invite',
      class: ''
    },
    {
      id: 5,
      icon: <IconResearch className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'research',
      class: 'pointer-events-none text-inactive'
    },
    {
      id: 6,
      icon: <IconInnovate className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'innovate',
      class: 'pointer-events-none text-inactive'
    },
    {
      id: 7,
      icon: <IconLeague className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'leagues',
      class: ''
    },
    {
      id: 8,
      icon: <IconLeave className="size-6 xs:size-7 2xs:size-8 mx-auto" />,
      type: 'leave',
      class: currentLeague?.isOwner ? 'pointer-events-none text-inactive' : ''
    }
  ]
  const hasRoleAdminRequest = role?.includes('ADMIN_REQUEST')

  const { data: totalJoinRequest } = useQuery({
    queryKey: ['getTotalJoinRequest'],
    queryFn: getTotalJoinRequest,
    enabled: Boolean(currentLeague?.isOwner) || Boolean(hasRoleAdminRequest)
  })

  const { data: rank, refetch } = useQuery({
    queryKey: ['getRankOfLeague'],
    queryFn: getRankOfLeague
  })

  const handleShare = () => {
    if (currentLeague?.inviteLink) {
      tabSound.play()
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
      setRole(res.data.role)
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
        // _getUserLeague()
        onClose()
        setCurrentLeague({ league: null })
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

  const updateAvatar = async () => {
    const formData = new FormData()

    if (file.current) {
      formData.append('image', file.current)
    }

    try {
      const res: any = await updateAvatarLeague(formData)
      if (res.status && res.data) {
        toast.success(<CustomToast type="success" title="Update avatar successfully" />)
        _getUserLeague()
      }
      setTimeout(() => {
        setLoadingAvatar(false)
      })
    } catch (ex) {
      setLoadingAvatar(false)
    }
  }

  const onChange = (e: any) => {
    if (isLoadingAvatar) return
    file.current = e.target.files[0]
    if (!file.current.type.includes('image')) {
      toast.error(<CustomToast type="error" title="Unsupported file format" />)
      return
    }
    if (file.current.size > MAX_SIZE_UPLOAD) {
      toast.error(<CustomToast type="error" title="File too large" />)
      return
    }
    try {
      setLoadingAvatar(true)
      filetoDataURL(file.current).then((res) => {
        dataURLtoFile(res, EImageType.PNG).then((image) => {
          file.current = image
          updateAvatar()
        })
      })
    } catch (ex) {
      setLoadingAvatar(false)
    }
  }

  const handleCopy = () => {
    if (currentLeague?.inviteLink) {
      copy(`${TELE_URI}?start=${currentLeague.inviteLink}`)
      toast.success(<CustomToast type="success" title="Copied!" />)
    }
  }

  const handleButtonSound = () => {
    buttonSound?.play()
  }
  const handleTabSound = () => {
    tabSound?.play()
  }

  const handleRank = () => {
    handleTabSound()
    router.push('/league/all-league')
  }

  const handleViewMember = () => {
    handleTabSound()
    router.push('/league/member')
  }

  const handleAction = (type: string) => {
    switch (type) {
      case LEAGUE_TYPE.MISSION:
        handleTabSound()
        return router.push('/league/mission')
      case LEAGUE_TYPE.MEMBER:
        handleTabSound()
        return router.push('/league/member')
      case LEAGUE_TYPE.INVITE:
        handleButtonSound()
        // return handleShare()
        handleCopy()
        break
      case LEAGUE_TYPE.LEAGUES:
        handleTabSound()
        return router.push('/league/all-league')
      case LEAGUE_TYPE.RESEARCH:
        return router.push('/league/research')
      case LEAGUE_TYPE.INNOVATE:
        return router.push('/league/innovate')
      case LEAGUE_TYPE.FUNDING:
      case LEAGUE_TYPE.LEAVE:
      case LEAGUE_TYPE.CONTRIBUTE:
        handleButtonSound()
        setActiveType(type)
        onOpen()
        break
    }
  }

  const handleCbContribute = () => {
    _getUserLeague()
    refetch()
  }

  const handleOpenSelectMember = () => {
    handleButtonSound()
    setActiveType(LEAGUE_TYPE.SELECT)
    onOpen()
  }

  const handleSelectAdmin = () => {
    handleLeave()
  }

  const getContentOfModal = () => {
    switch (activeType) {
      case LEAGUE_TYPE.LEAVE:
        return (
          <LeaveModal
            item={currentLeague}
            onClose={onClose}
            handleAction={currentLeague?.isOwner ? handleOpenSelectMember : handleLeave}
          />
        )
      case LEAGUE_TYPE.SELECT:
        return (
          <SelectAdminModal
            item={currentLeague}
            onClose={onClose}
            handleAction={handleSelectAdmin}
          />
        )
      case LEAGUE_TYPE.FUNDING:
        return <FundingModal closeModal={onClose} cb={_getUserLeague} />
      default:
        return <ContributeModal closeModal={onClose} cb={handleCbContribute} />
    }
  }

  const getRole = () => {
    if (currentLeague?.isOwner) {
      return 'Admin'
    }
    if (currentLeague?.role) {
      return 'MODER'
    }
    return 'MEMBER'
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
            <div
              className="relative size-[160px] xs:size-[180px] 2xs:size-[200px] mx-auto before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-[14px] before:border-[7px] before:border-transparent before:border-t-white before:border-l-white after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-8 after:border-[16px] after:border-transparent after:border-b-white after:border-r-white"
              onClick={handleButtonSound}
            >
              <div className="size-full p-[1px] [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)] bg-white">
                <img
                  className="size-full object-cover [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)]"
                  src={`${currentLeague?.avatar ? `${currentLeague.avatar}` : '/assets/images/league/league-04@2x.png'}`}
                  alt="DePIN Alliance"
                />
              </div>
              {currentLeague?.isOwner && (
                <div className="absolute bottom-0 right-0 size-[50px] xs:size-[55px] 2xs:size-[60px] border-[25px] xs:border-[27.5px] 2xs:border-[30px] border-transparent border-r-yellow-500 border-b-yellow-500 z-[2] cursor-pointer">
                  <IconChange className="size-5 xs:size-[22px] 2xs:size-6 text-yellow-900" />
                </div>
              )}
              {currentLeague?.isOwner && (
                <input
                  disabled={isLoadingAvatar}
                  className="absolute  z-[3] top-0 left-0 right-0 w-full h-full m-0 cursor-pointer opacity-0"
                  id="files"
                  accept="image/*"
                  type="file"
                  onChange={onChange}
                />
              )}

              {isLoadingAvatar && (
                <Loader
                  classNames={{
                    wrapper: 'w-full absolute pointer-events-none z-[4] p top-0 bg-black/50',
                    icon: 'w-[30px] h-[45px] text-white'
                  }}
                />
              )}
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
                  {`</ ${getRole()} />`}
                </div>
                <div className="w-8 h-[1px] bg-yellow-800"></div>
              </div>
              {/* <Link href="/league/ranking" className="flex items-center justify-center space-x-1">
                <p className="text-gradient uppercase font-mona font-semibold">VIEW LEAGUE RANK</p>
                <IconOpenLink gradient className="size-6" />
              </Link> */}
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
            {/* <div className="btn inactive">
              <div className="btn-border"></div>
              <div className="btn-inactive !px-3">Mining Together (Coming Soon)</div>
              <div className="btn-border"></div>
            </div> */}
            {/* Total Mining */}
            <div className="relative w-fit mx-auto">
              <img src="/assets/images/league/in-league-frame.svg" alt="" />
              <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-between px-4 xs:px-6 2xs:px-8 space-x-3 xs:space-x-4">
                <div className="space-y-1 xs:space-y-2">
                  <div className="text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
                    Rank
                  </div>
                  <div
                    className="flex items-center space-x-1.5 xs:space-x-2 cursor-pointer"
                    onClick={handleRank}
                  >
                    <IconRank className="text-white size-6 xs:size-7 2xs:size-8" />
                    <p className="text-green-500 font-semibold text-lg min-[355px]:text-xl xs:text-2xl 2xs:text-[28px] !leading-[24px] min-[355px]:!leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                      {kFormatter(rank?.data || 0, 0, 0)}
                    </p>
                    <IconOpenLink className="size-6 xs:size-7 2xs:size-8" gradient />
                  </div>
                </div>
                <div className="space-y-1 xs:space-y-2">
                  <div className="text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
                    CONTRIBUTORS
                  </div>
                  <div
                    onClick={handleViewMember}
                    className="flex items-center space-x-1.5 xs:space-x-2"
                  >
                    <IconGroupUser className="text-white size-6 xs:size-7 2xs:size-8" />
                    <p className="text-green-500 font-semibold text-lg min-[355px]:text-xl xs:text-2xl 2xs:text-[28px] !leading-[24px] min-[355px]:!leading-[28px] xs:!leading-[32px] 2xs:!leading-[34px]">
                      {currentLeague?.totalContributors
                        ? formatNumber(currentLeague.totalContributors, 0, 0)
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Fund - Profit */}
            <div className="flex space-x-3 xs:space-x-4">
              <div className="flex-1">
                <div className="btn cursor-default">
                  <div className="btn-border"></div>
                  <div className="font-geist !px-2 !py-4 xs:!py-5 2xs:!py-6 relative w-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:[background:_linear-gradient(to_bottom,rgba(146,152,32,0),rgba(146,152,32,1))] before:opacity-15 before:z-[-1]">
                    <div className="space-y-3 xs:space-y-4">
                      <IconFund className="text-yellow-500 size-8 xs:size-10 2xs:size-12 mx-auto" />
                      <div className="space-y-1.5 xs:space-y-2">
                        <p className="text-center text-[13px] xs:text-sm font-normal uppercase text-title tracking-[-1px] !leading-[18px]">
                          FUND
                        </p>
                        <div className="flex items-center justify-center space-x-1.5 xs:space-x-2">
                          <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                          <p className="text-yellow-500 font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px] uppercase">
                            {kFormatter(currentLeague?.point || 0, 0, 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
                <div className="btn group" onClick={() => handleAction(LEAGUE_TYPE.FUNDING)}>
                  <div className="btn-border"></div>
                  <div className="btn-primary relative flex items-center justify-center !p-2 xs:!p-2.5 2xs:!p-3 !shadow-none ![background:_transparent] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:bg-white/5 before:z-[-1] group-hover:before:bg-white/10">
                    <IconPlus gradient className="size-6 mx-auto" />
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
                        <p className="text-center text-[13px] xs:text-sm font-normal uppercase text-title tracking-[-1px] !leading-[18px]">
                          POWER
                        </p>
                        <div className="flex items-center justify-center space-x-1.5 xs:space-x-2">
                          <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                          <p className="text-green-500 font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px] normal-case">
                            {kFormatter(currentLeague?.profit || 0, 0, 2)}/h
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
                <div className="btn group" onClick={() => handleAction(LEAGUE_TYPE.CONTRIBUTE)}>
                  <div className="btn-border"></div>
                  <div className="btn-primary relative flex items-center justify-center !p-2 xs:!p-2.5 2xs:!p-3 !shadow-none ![background:_transparent] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:size-full before:bg-white/5 before:z-[-1] group-hover:before:bg-white/10">
                    <IconPlus gradient className="size-6 mx-auto" />
                  </div>
                  <div className="btn-border"></div>
                </div>
              </div>
            </div>
            {/* Link */}
            <div className="grid grid-cols-4 gap-1 xs:gap-1.5 2xs:gap-2">
              {listLink.map((item: any) => (
                <div
                  key={item.id}
                  className={`space-y-1 p-2 text-center text-body cursor-pointer transition-colors hover:text-green-500 ${item.class}`}
                  onClick={() => handleAction(item.type)}
                >
                  {item.icon ? (
                    item.icon
                  ) : (
                    <div className="mx-auto min-h-6 xs:min-h-7 2xs:min-h-8" />
                  )}
                  <p className="text-[13px] xs:text-sm !leading-[18px] capitalize">{item.type}</p>
                </div>
              ))}
            </div>
            {/* Join Request */}
            {(currentLeague?.isOwner || hasRoleAdminRequest) && (
              <Link
                onClick={() => {
                  tabSound.play()
                }}
                href="/league/join-request"
                className="btn default"
              >
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
        title={
          activeType === LEAGUE_TYPE.LEAVE || activeType === LEAGUE_TYPE.SELECT
            ? 'Leave League'
            : activeType === LEAGUE_TYPE.FUNDING
              ? 'Funding'
              : 'Contribute'
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        maxHeight={500}
      >
        <>{getContentOfModal()}</>
      </CustomModal>
    </>
  )
}
