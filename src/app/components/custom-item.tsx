/* eslint-disable @next/next/no-img-element */
import { LIST_STATUS_MISSION, LIST_TYPE } from '@/constants'
import Image from 'next/image'
import React, { ReactNode, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  IconCheck,
  IconCheckCircle,
  IconDoubleArrow,
  IconLoader,
  IconLock,
  IconOpenLink,
  IconPlus,
  IconReload,
  IconUserAdd
} from './icons'
import CountdownTime from './countdown-time'
import useCommonStore from '@/stores/commonStore'
import { twitterChangeAccount, twitterChangeAccountUrl, twitterInfo } from '@/services/twitter'
import { useTelegram } from '@/hooks/useTelegram'

interface ItemProps {
  type: string
  image?: string
  icon?: string
  done?: boolean
  rank?: number
  title: string
  item?: any
  status?: string
  activeId?: string
  cb?: () => void
  children: ReactNode
}
const PARTNERS_BG_SPECIAL = ['flashback', 'openmesh', 'timpi']

const CustomItem = ({
  type,
  image,
  icon,
  done,
  status,
  title,
  item,
  activeId,
  cb,
  children
}: ItemProps) => {
  const { userTwitter } = useCommonStore()
  const { webApp } = useTelegram()
  const linkChangeAccTw = useRef<string | null>(null)

  const getClassBySkill = (index: number) => {
    switch (index) {
      case 1:
        return 'before:bg-skill-01 after:border-b-[rgba(0,76,205,0.2)] after:border-r-[rgba(0,76,205,0.2)]'
      case 2:
        return 'before:bg-skill-02 after:border-b-[rgba(0,255,144,0.2)] after:border-r-[rgba(0,255,144,0.2)]'
      case 3:
        return 'before:bg-skill-03 after:border-b-[rgba(228,140,0,0.2)] after:border-r-[rgba(228,140,0,0.2)]'
      case 4:
        return 'before:bg-skill-04 after:border-b-[rgba(152,57,255,0.2)] after:border-r-[rgba(152,57,255,0.2)]'
      case 5:
        return 'before:bg-skill-05 after:border-b-[rgba(0,215,231,0.2)] after:border-r-[rgba(0,215,231,0.2)]'
    }
  }

  const getIconMission = () => {
    if (done) {
      return <IconCheckCircle className="text-green-800 size-full" />
    } else {
      switch (status) {
        case LIST_STATUS_MISSION.CHECK:
        case 'VERIFIED':
          return <IconCheck className="text-green-500 size-full" />
        case LIST_STATUS_MISSION.VERIFY:
          return <IconLoader className="text-yellow-200 size-full" />
        case LIST_STATUS_MISSION.LINK:
          return <IconOpenLink className="text-yellow-500 size-full" />
        default:
          return <IconOpenLink className="text-yellow-500 size-full" />
      }
    }
  }

  const changeAccount = async () => {
    if (item.status === 'CLAIMED') {
      twitterChangeAccount()

      if (linkChangeAccTw.current) {
        if (webApp?.platform === 'android' && webApp?.openLink) {
          webApp.openLink(linkChangeAccTw.current)
        } else {
          window.open(linkChangeAccTw.current, '_blank')
        }
      }
    }
  }

  const getUrlChangeAccountTw = async () => {
    const res = await twitterChangeAccountUrl()
    if (res.status && res.data) {
      linkChangeAccTw.current = res.data
    }
  }

  useEffect(() => {
    if (item.type === 'CONNECT_X' && item.status === 'CLAIMED' && !linkChangeAccTw.current) {
      getUrlChangeAccountTw()
    }
  }, [item])

  const isSpecialBg =
    (type === LIST_TYPE.PARTNERS && PARTNERS_BG_SPECIAL.indexOf(item.name?.toLowerCase()) !== -1) ||
    (type === LIST_TYPE.LEAGUE && activeId && activeId === item.code)

  const getBg = () => {
    if (isSpecialBg) {
      return 'before:bg-gradient after:border-b-yellow-700 after:border-r-yellow-700 '
    }
    if (type === LIST_TYPE.MISSION || type === LIST_TYPE.PARTNERS) {
      if (done) {
        return 'before:bg-white/5 after:border-b-white/5 after:border-r-white/5'
      }
      return 'before:bg-item-yellow after:border-b-yellow-900 after:border-r-yellow-900'
    }
    if (type === LIST_TYPE.SKILL || type === LIST_TYPE.RESEARCH) {
      return `${getClassBySkill(item.skillId)} ${item.lock ? 'pointer-events-none after:border-r-black/50 after:border-b-black/50' : ''} before:opacity-20`
    }
    return 'before:opacity-20 before:bg-item-default after:border-b-green-900 after:border-r-green-900'
  }
  return (
    <div
      className={`relative cursor-pointer before:absolute before:top-0 before:left-0 before:content-[''] before:w-full before:h-full before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:opacity-20 before:z-[-1] after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent p-2 flex items-center justify-between
        ${getBg()}`}
    >
      {type === LIST_TYPE.LEAGUE && item.isPendingRequest && (
        <div className="absolute top-0 right-0 text-[10px] !leading-[14px] py-0.5 px-1.5 border border-yellow-600 text-yellow-600 bg-gray-950 capitalize tracking-[-0.5px]">
          Pending approval
        </div>
      )}
      {type === LIST_TYPE.RESEARCH && item.lock && (
        <div className="absolute top-0 left-0 right-0 w-full h-full p-2 bg-black/50 [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] z-[1] cursor-default pointer-events-none">
          <div className="flex items-center justify-center size-[60px] min-[355px]:size-16 xs:size-[68px] 2xs:size-[72px]">
            <IconLock className="text-body size-6 xs:size-7 2xs:size-8" />
          </div>
        </div>
      )}
      <div className="flex items-center space-x-3 2xs:space-x-4">
        <div className="flex items-center justify-center size-[60px] min-[355px]:size-16 xs:size-[68px] 2xs:size-[72px] min-w-[60px] min-[355px]:min-w-16 xs:min-w-[68px] 2xs:min-w-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
          {image ? (
            <>
              {type === LIST_TYPE.MISSION ? (
                <Image
                  className="size-7 xs:size-8 2xs:size-9"
                  width={0}
                  height={0}
                  src={
                    image.includes('assets') || image.includes('http')
                      ? image
                      : icon
                        ? `/assets/images/icons/icon-${icon}-gradient.svg`
                        : `/assets/images/icons/icon-mission-gradient.svg`
                  }
                  alt="DePIN Alliance"
                />
              ) : (
                <img
                  className="size-full object-cover"
                  src={
                    image.includes('assets') || image.includes('http')
                      ? image
                      : `/assets/images/${image}@2x.png`
                  }
                  alt="DePIN Alliance"
                />
              )}
            </>
          ) : (
            <Image
              className="size-7 xs:size-8 2xs:size-9"
              width={0}
              height={0}
              src={`/assets/images/icons/icon-${icon}-gradient.svg`}
              alt="DePIN Alliance"
            />
          )}
        </div>
        <div
          className={
            item.type === 'CONNECT_X'
              ? userTwitter?.twitterUsername
                ? 'space-y-1'
                : 'space-y-1 xs:space-y-1.5'
              : `space-y-1.5 xs:space-y-2 2xs:space-y-2.5`
          }
        >
          <div className="text-white font-mona min-[355px]:text-[15px] xs:text-base 2xs:text-lg font-semibold !leading-[18px] min-[355px]:!leading-[20px] 2xs:!leading-[22px] [word-break:_break-word;] line-clamp-2">
            {title}
          </div>
          {item.type === 'CONNECT_X' && item.status ? (
            <div
              className="font-mona font-semibold leading-[18px] flex items-center"
              onClick={changeAccount}
            >
              {userTwitter?.twitterUsername ? (
                <>
                  {userTwitter?.twitterUsername}
                  {item.status === 'CLAIMED' && <IconReload className="h-[14px]" />}
                </>
              ) : (
                <>
                  {item.status === 'CLAIMED' ? (
                    <div className="btn w-fit">
                      <div className="btn-border"></div>
                      <div className="btn-primary text-xs !px-1 !py-0 !m-0.5 leading-[16px] capitalize">
                        Change X Account
                      </div>
                      <div className="btn-border"></div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : null}
          {children}
        </div>
      </div>
      <div className="ml-1 xs:ml-2 mr-1 xs:mr-2 2xs:mr-3">
        {type === LIST_TYPE.SKILL || type === LIST_TYPE.RESEARCH ? (
          <>
            {item.timeWaiting > Date.now() ? (
              <CountdownTime time={item.timeWaiting} type="basic" cb={cb} />
            ) : (
              <div className="size-7 overflow-hidden">
                <motion.div
                  initial={{ y: 22 }}
                  animate={{ y: -34 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <IconDoubleArrow className="size-full" gradient />
                  <IconDoubleArrow className="size-full" gradient />
                </motion.div>
              </div>
            )}
          </>
        ) : (
          <div className="cursor-pointer size-6 xs:size-7 2xs:size-[30px] min-w-6 xs:min-w-7 2xs:min-w-[30px]">
            {type === 'mission' || type === 'partners' ? (
              getIconMission()
            ) : type === 'invite' ? (
              // <IconUserAdd className="size-full" gradient />
              <></>
            ) : type === 'league' ? (
              <IconOpenLink className="size-full" gradient />
            ) : (
              <IconPlus className="size-full" gradient />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomItem
