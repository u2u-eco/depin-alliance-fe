import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { formatNumber } from '../../../helper/common'
import Link from 'next/link'
import useCommonStore from '@/stores/commonStore'
import Image from 'next/image'
import { IconChevron, IconSettings, IconUser } from '../icons'
import { motion } from 'framer-motion'
import { IUserInfo } from '@/interfaces/i.user'
import { useAppSound } from '@/hooks/useAppSound'

interface InfoProps {
  click?: () => void
  profile?: boolean
  rank?: number
}

const Info = ({ profile, rank }: InfoProps) => {
  const pathName = usePathname()
  const route = useRouter()
  const { userInfo } = useCommonStore((state) => state)

  const { tabSound } = useAppSound()
  const handleOpen = () => {
    tabSound.play()
    route.push('/avatar')
  }

  const handleProfile = () => {
    tabSound.play()
    route.push('/profile')
  }

  const handleMap = () => {
    tabSound.play()
    route.push('/map')
  }

  const getCurrentPercentXp = (userInfo: IUserInfo | null) => {
    if (userInfo) {
      const currentXp = userInfo.xp - userInfo.xpLevelFrom
      const maxXp = userInfo.xpLevelTo - userInfo.xpLevelFrom

      if (currentXp > 0) {
        const percent = (currentXp / maxXp) * 100
        return `${percent}%`
      }
    }
    return 0
  }

  return (
    <>
      <motion.div
        className="relative w-full max-w-[400px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          className="mx-auto"
          src={`/assets/images/${profile ? 'profile' : 'info'}-frame.svg`}
          alt="Info Frame"
        />
        {profile && (
          <Link
            onClick={() => {
              tabSound.play()
            }}
            href="/ranking"
            className="[--space:_20px] xs:[--space:_24px] 2xs:[--space:_28px] absolute top-0 right-0 bg-green-500 cursor-pointer flex items-center justify-between py-1 xs:py-1.5 pr-2 pl-6 xs:pl-7 2xs:pl-8 w-[90px] xs:w-[100px] 2xs:w-[110px] [clip-path:_polygon(0_0,100%_0,100%_100%,var(--space)_100%)] z-[1]"
          >
            <p className="text-green-900 tracking-[-1px] text-[13px] xs:text-sm flex-1 text-center">
              {rank ? `#${formatNumber(rank, 0, 0)}` : ''}
            </p>
            <IconChevron className="size-4 xs:size-5 text-green-900 -rotate-90" />
          </Link>
        )}
        <div className="absolute top-0 left-0 right-0 w-full p-1.5 flex items-center space-x-3">
          <div className="relative cursor-pointer" onClick={handleOpen}>
            <div className="absolute top-[-1px] left-[-1px] size-2 border-4 border-transparent border-t-green-500 border-l-green-500"></div>
            <div
              className={`bg-gray-800 ${profile ? 'size-[88px] min-[335px]:size-[94px] min-[355px]:size-[102px] xs:size-[106px] min-[400px]:size-[116px] 2xs:size-[122px] min-w-[80px] min-[354px]:min-w-[100px]] xs:min-w-[106px] min-[400px]:min-w-[116px] 2xs:min-w-[122px]' : 'size-[54px] min-[355px]:size-[62px] xs:size-[68px] min-[400px]:size-[72px] 2xs:size-[76px]'}`}
            >
              <Image
                className="size-full min-w-full"
                src={
                  userInfo?.avatar?.replace(/-/g, '-main-') ||
                  '/assets/images/avatar/avatar-main-01@2x.png'
                }
                width={0}
                height={0}
                sizes="100vw"
                alt="Avatar"
              />
            </div>
            <div
              className={`cursor-pointer absolute bottom-0 right-0 ${profile ? 'size-7 xs:size-8 min-[400px]::size-9 2xs:size-10' : 'size-5 xs:size-6'}`}
            >
              <div
                className={`border-r-yellow-500 border-b-yellow-500 border-l-transparent border-t-transparent ${profile ? 'border-[14px] xs:border-[16px] min-[400px]::border-[18px] 2xs:border-[20px]' : 'border-[10px] xs:border-[12px]'}`}
              ></div>
              <Image
                className={`absolute ${profile ? 'bottom-0.5 right-0.5 size-3 xs:size-4 2xs:size-5' : 'right-[1px] xs:right-0.5 bottom-[1px] xs:bottom-0.5 !size-2.5'}`}
                src="/assets/images/icons/icon-photo-edit.svg"
                alt="Icon Photo Edit"
                width={0}
                height={0}
              />
            </div>
          </div>
          <div
            className={`flex-1 ${profile ? 'space-y-2 xs:space-y-3 2xs:space-y-4' : 'space-y-1 xs:space-y-1.5 min-[400px]::space-y-2 2xs:space-y-3'}`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 min-[400px]:space-y-1">
                <div
                  className={`text-white font-semibold ${profile ? 'text-[15px] xs:text-base 2xs:text-lg leading-[20px] 2xs:leading-[22px] min-h-5 2xs:min-h-[22px]' : 'text-[15px] xs:text-base min-h-5 leading-[20px]'}`}
                >
                  {userInfo?.username}
                </div>
                <div className="flex items-center space-x-2 min-[400px]:space-x-3 2xs:space-x-4">
                  <Link
                    onClick={() => {
                      tabSound.play()
                    }}
                    href="/level"
                    className="flex items-center min-[400px]:space-x-1 cursor-pointer"
                  >
                    <span
                      className={`font-geist text-yellow-500 whitespace-nowrap ${profile ? 'text-sm xs:text-sm 2xs:text-base leading-[18px] 2xs:leading-[20px]' : 'text-xs min-[400px]:text-[13px] 2xs:text-sm'}`}
                    >
                      LV. {userInfo?.level}
                    </span>
                    <Image
                      className="size-5 xs:size-6"
                      src="/assets/images/icons/icon-chevron-right-green.svg"
                      alt="Icon Chevron"
                      width={0}
                      sizes="100vw"
                      height={0}
                    />
                  </Link>
                  <div className="w-[1px] h-5 bg-white/10"></div>
                  <div
                    className="flex items-center space-x-0.5 min-[400px]:space-x-1"
                    onClick={handleProfile}
                  >
                    <Image
                      className="size-4 min-[400px]:size-[18px] 2xs:size-5"
                      src="/assets/images/icons/icon-thunder.svg"
                      alt="Icon Thunder"
                      height={0}
                      sizes="100vw"
                      width={0}
                    />
                    <span
                      className={`font-geist text-yellow-500 ${profile ? 'text-sm xs:text-[15px] 2xs:text-base leading-[18px] xs:leading-[20px]' : 'text-xs min-[400px]:text-[13px] 2xs:text-sm'}`}
                    >
                      {userInfo?.pointSkill}
                    </span>
                    <Image
                      className="size-5 xs:size-6"
                      src="/assets/images/icons/icon-chevron-right-green.svg"
                      alt="Icon Chevron"
                      sizes="100vw"
                      width={0}
                      height={0}
                    />
                  </div>
                </div>
              </div>
              {!profile && (
                <div className="flex items-center space-x-2 xs:space-x-3 2xs:space-x-4 mr-3 2xs:mr-4">
                  <Link
                    onClick={() => {
                      tabSound.play()
                    }}
                    href="/profile"
                    className="p-1 group"
                  >
                    <IconUser className="size-5 min-[400px]:size-6 text-green-800 group-hover:text-green-500 transition-colors" />
                  </Link>
                  <Link
                    onClick={() => {
                      tabSound.play()
                    }}
                    href="/setting"
                    className="p-1 group"
                  >
                    <IconSettings className="size-5 min-[400px]:size-6 text-green-800 group-hover:text-green-500 transition-colors" />
                  </Link>
                </div>
              )}
            </div>
            <div
              className={
                profile ? 'rounded-md w-fit border-[0.5px] border-green-800 p-1 space-y-1' : ''
              }
            >
              <div className="relative w-[120px] min-[400px]:w-[140px] 2xs:w-[160px] h-1 rounded bg-gray-850">
                <div
                  style={{ width: `${getCurrentPercentXp(userInfo)}` }}
                  className={`absolute top-0 left-0 h-1 bg-gradient rounded before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:bg-gradient before:blur-[6px]`}
                ></div>
              </div>
              {profile && (
                <div className="text-[11px] xs:text-xs text-body">
                  <span className="text-title">
                    {userInfo?.xp && formatNumber(userInfo?.xp, 0, 0)} XP
                  </span>{' '}
                  / {userInfo?.xpLevelTo && formatNumber(userInfo.xpLevelTo - 1, 0, 0)} XP
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`absolute left-[50%] translate-x-[-50%] flex items-center z-[1] ${profile || pathName === '/home' ? 'flex-col justify-center space-y-1 bottom-[-42px] xs:bottom-[-46px] 2xs:bottom-[-50px]' : ' space-x-1 bottom-[-15px]'}`}
        >
          {(pathName === '/home' || pathName === '/profile') && (
            <p className="font-geist uppercase text-white tracking-[-1px]">BALANCE:</p>
          )}
          <div
            className={`flex items-center ${profile || pathName === '/home' ? 'space-x-1 xs:space-x-2' : 'space-x-1'}`}
          >
            <div className="relative">
              <div
                className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] bg-[rgba(0,255,144,0.15)] shadow-[0_0_8px_rgba(0,255,144,0.45)] z-[-1] ${profile || pathName === '/home' ? 'size-5' : 'size-4'}`}
              >
                <div className="size-full rounded-[50%] bg-[rgba(255,255,255,1)]/20 blur-[4px]"></div>
              </div>
              <Image
                className={
                  profile || pathName === '/home'
                    ? 'size-6 xs:size-7 2xs:size-8 min-w-6 xs:min-w-7 2xs:min-w-8'
                    : 'size-5'
                }
                src="/assets/images/point@2x.png"
                // srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                alt="Point"
                sizes="100vw"
                width={0}
                height={0}
              />
            </div>
            <div
              className={`text-point font-bold ${profile || pathName === '/home' ? 'text-xl xs:text-2xl 2xs:text-[28px]' : 'text-base'}`}
            >
              {' '}
              {userInfo?.point ? formatNumber(userInfo.point, 0, 0) : 0}
            </div>
          </div>
        </div>
        {pathName === '/home' && (
          <div className="absolute -bottom-14 right-0">
            <div
              className="relative cursor-pointer before:content-[''] before:absolute before:top-[3px] before:left-[3px] before:size-2 before:border-[4px] before:border-transparent before:border-t-yellow-600 before:border-l-yellow-600 after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-3 after:border-[6px] after:border-transparent after:border-b-yellow-600 after:border-r-yellow-600 transition-all"
              onClick={handleMap}
            >
              <div className="[--shape:_12px] size-12 [clip-path:_polygon(var(--shape)_0,100%_0,100%_100%,0_100%,0_var(--shape))] p-[1px] bg-yellow-600">
                <div className="size-full [clip-path:_polygon(var(--shape)_0,100%_0,100%_100%,0_100%,0_var(--shape))] p-1 bg-item-green">
                  <img
                    className="[clip-path:_polygon(var(--shape)_0,100%_0,100%_100%,0_100%,0_var(--shape))] size-full object-cover opacity-65"
                    src="/assets/images/map/world-map@2x.png"
                    alt="DePIN Alliance"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      {/* <CustomModal title="Avatar" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div>
          <div className="mt-6 mb-8 xs:mb-10 2xs:mb-12 grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4">
            {listImage.map((item: any) => (
              <div
                key={item}
                className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-6 before:border-[12px] before:border-transparent before:transition-all ${selectedImage == item ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
              >
                <div
                  className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] p-[1px] transition-all cursor-pointer ${selectedImage === item ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)]' : ''}`}
                  onClick={() => setAvatarActive(item)}
                >
                  <Image
                    className="[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] mx-auto"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: '100%', minWidth: '100%' }}
                    src={item}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="btn" onClick={handleUpdateAvatar}>
            <div className="btn-border"></div>
            <div className="btn-primary">Equip Avatar</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal> */}
    </>
  )
}

export default Info
