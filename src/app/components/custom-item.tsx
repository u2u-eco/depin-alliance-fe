/* eslint-disable @next/next/no-img-element */
import { LIST_STATUS_MISSION, LIST_TYPE } from '@/constants'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  IconCheck,
  IconCheckCircle,
  IconDoubleArrow,
  IconLoader,
  IconOpenLink,
  IconPlus,
  IconUserAdd
} from './icons'
import CountdownTime from './countdown-time'

interface ItemProps {
  type: string
  image?: string
  icon?: string
  done?: boolean
  rank?: number
  title: string
  item?: any
  status?: string
  cb?: () => void
  children: ReactNode
}

const CustomItem = ({ type, image, icon, done, status, title, item, cb, children }: ItemProps) => {
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
      return <IconCheckCircle className="text-green-800" />
    } else {
      switch (status) {
        case LIST_STATUS_MISSION.CHECK:
          ;<IconCheckCircle className="text-green-800" />
          return
        case LIST_STATUS_MISSION.VERIFY:
          return <IconLoader className="text-yellow-200" />
        case LIST_STATUS_MISSION.LINK:
          return <IconOpenLink className="text-yellow-500" />
      }
    }
  }

  return (
    <div
      className={`relative cursor-pointer before:absolute before:top-0 before:left-0 before:content-[''] before:w-full before:h-full before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:opacity-20 before:z-[-1] after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent p-2 flex items-center justify-between
        ${
          type === LIST_TYPE.MISSION
            ? done
              ? 'before:bg-white/5 after:border-b-white/5 after:border-r-white/5'
              : 'before:bg-item-yellow after:border-b-yellow-900 after:border-r-yellow-900'
            : type === LIST_TYPE.SKILL
              ? `${getClassBySkill(item.skillId)} before:opacity-20`
              : 'before:opacity-20 before:bg-item-default after:border-b-green-900 after:border-r-green-900'
        }`}
    >
      <div className="flex items-center space-x-3 2xs:space-x-4">
        <div className="flex items-center justify-center size-[60px] min-[355px]:size-16 xs:size-[68px] 2xs:size-[72px] min-w-[60px] min-[355px]:min-w-16 xs:min-w-[68px] 2xs:min-w-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
          {image ? (
            <>
              {type === LIST_TYPE.MISSION || type === LIST_TYPE.PARTNERS ? (
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
                  alt=""
                />
              ) : (
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%' }}
                  src={
                    image.includes('assets') || image.includes('http')
                      ? image
                      : `/assets/images/${image}@2x.png`
                  }
                  alt=""
                />
              )}
            </>
          ) : (
            <Image
              className="size-7 xs:size-8 2xs:size-9"
              width={0}
              height={0}
              src={`/assets/images/icons/icon-${icon}-gradient.svg`}
              alt=""
            />
          )}
        </div>
        <div className="space-y-2 2xs:space-y-2.5">
          <div className="text-white font-mona min-[355px]:text-[15px] xs:text-base 2xs:text-lg font-semibold leading-[18px] min-[355px]:leading-[20px] 2xs:leading-[22px]">
            {title}
          </div>
          {children}
        </div>
      </div>
      <div className="mr-3">
        {type === LIST_TYPE.SKILL ? (
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
          <div className="cursor-pointer size-6 xs:size-7 2xs:size-8 min-w-6 xs:min-w-7 2xs:min-w-8">
            {type === 'mission' || type === 'partners' ? (
              getIconMission()
            ) : type === 'invite' ? (
              <IconUserAdd gradient />
            ) : type === 'league' ? (
              <IconOpenLink gradient />
            ) : (
              <IconPlus gradient />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomItem
