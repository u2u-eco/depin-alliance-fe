import { formatNumber } from '@/helper/common'
import { IRankingItem } from '@/interfaces/i.user'
import Image from 'next/image'
import React, { useState } from 'react'
import { IconAdmin, IconOpenLink, IconPoint } from '../icons'
import { useRouter } from 'next/navigation'
import { useAppSound } from '@/hooks/useAppSound'

interface IListRankingItem {
  data: {
    currentRank: number
    ranking: Array<IRankingItem>
  }
  isEarn?: boolean
  admin?: any
  type: string
  maxPrecision?: number
  suffix?: string
  onClick?: (item: any) => void
}

const RANK_TYPE = {
  RANKING: 'ranking',
  LEAGUE: 'league',
  MEMBER: 'member',
  MEMBER_ADMIN_LEAVE: 'leave-admin'
}

const CustomRank = ({
  data,
  isEarn,
  type,
  maxPrecision,
  suffix,
  admin,
  onClick
}: IListRankingItem) => {
  const router = useRouter()
  const { tabSound, buttonSound } = useAppSound()
  const [activeId, setActiveId] = useState<number>(0)
  const getBgByRank = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-[#BA3AFF] drop-shadow-purple before:bg-item-purple after:border-b-[#BA3AFF] after:border-r-[#BA3AFF]'
      case 1:
        return 'bg-[#00A3FF] drop-shadow-blue before:bg-item-blue after:border-b-[#00A3FF] after:border-r-[#00A3FF]'
      case 2:
        return 'bg-[#FFA800] drop-shadow-orange before:bg-item-orange after:border-b-[#FFA800] after:border-r-[#FFA800]'
      case 99999:
        return 'bg-green-500 drop-shadow-green before:bg-item-green after:border-b-green-500 after:border-r-green-500'
      default:
        return 'before:bg-item-default after:border-b-green-900 after:border-r-green-900 before:opacity-20'
    }
  }
  const handleClick = (item: any) => {
    if (type === RANK_TYPE.MEMBER_ADMIN_LEAVE) {
      if (item.id === admin.id) {
        return
      }
      buttonSound?.play()
      setActiveId(item.id)
      onClick && onClick(item)
      return
    }
    tabSound?.play()

    switch (type) {
      case RANK_TYPE.LEAGUE:
        return router.push('/league/all-league/detail')
      case RANK_TYPE.MEMBER:
        return router.push(`/league/member/detail?id=${item.id}`)
    }
  }

  const getSubContent = (item: any) => {
    switch (type) {
      case RANK_TYPE.LEAGUE:
        return (
          <p className="text-yellow-600 text-[15px] xs:text-base !leading-[20px]">
            LV. {item.level}
          </p>
        )
      default:
        return (
          <div className="flex items-center space-x-1">
            <IconPoint className="size-4" />
            <p className="text-primary font-semibold overflow-hidden max-w-[120px] xs:max-w-[160px] 2xs:max-w-[200px] text-ellipsis">
              {type === RANK_TYPE.MEMBER || type === RANK_TYPE.MEMBER_ADMIN_LEAVE ? (
                `${formatNumber(item?.value || 0, 0, maxPrecision || 0)}${suffix ? suffix : ''}`
              ) : (
                <>
                  {isEarn
                    ? `${formatNumber(item?.pointEarned || 0, 0, 0)}`
                    : `${formatNumber(item?.miningPower || 0, 0, 2)}/h`}
                </>
              )}
            </p>
          </div>
        )
    }
  }

  const getClassBg = (index: number, item: any) => {
    if (type === RANK_TYPE.MEMBER_ADMIN_LEAVE) {
      if (item.id === admin?.id) {
        return 'opacity-60 before:bg-item-default after:border-b-green-900 after:border-r-green-900 before:opacity-20'
      }
      if (item.id === activeId) {
        return getBgByRank(99999)
      }
      return 'before:bg-item-default after:border-b-green-900 after:border-r-green-900 before:opacity-20'
    }
    return data?.currentRank > 3 &&
      (data?.currentRank === index + 1 || data.currentRank === item.rank)
      ? getBgByRank(99999)
      : getBgByRank(index)
  }

  const getIcon = (item: any) => {
    if (
      (type === RANK_TYPE.MEMBER || type === RANK_TYPE.MEMBER_ADMIN_LEAVE) &&
      admin &&
      admin?.id === item?.id
    ) {
      return <IconAdmin gradient className="size-5" />
    }
    if (type === RANK_TYPE.MEMBER_ADMIN_LEAVE) {
      return null
    }
    if (type !== RANK_TYPE.RANKING) {
      return <IconOpenLink gradient className="size-6" />
    }
  }

  return (
    <div
      className={`flex flex-col space-y-3 xs:space-y-4 ${data?.currentRank > data?.ranking?.length ? 'mb-20 xs:mb-[90px]' : ''}`}
    >
      {data?.ranking?.map((item: IRankingItem, index: number) => (
        <div
          className={`relative !bg-transparent before:hidden after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent ${getClassBg(index, item)} ${data?.currentRank > data?.ranking?.length && data.currentRank === item.rank ? '!fixed bottom-0 left-3 3xs:left-4 right-3 3xs:right-4 max-w-[480px] mx-auto' : ''}`}
          key={index}
          onClick={() => handleClick(item)}
        >
          <div
            className={`relative after:hidden [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] p-2 flex items-center justify-between ${getClassBg(index, item)}`}
          >
            <div className="flex items-center space-x-3 xs:space-x-4">
              <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                {type === RANK_TYPE.LEAGUE ? (
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%' }}
                    src={item?.avatar || '/assets/images/league/league-01@2x.png'}
                    alt="DePIN Alliance"
                  />
                ) : (
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%' }}
                    src={
                      item?.avatar?.replace(/-/g, '-main-') ||
                      '/assets/images/avatar/avatar-01@2x.png'
                    }
                    alt="DePIN Alliance"
                  />
                )}
              </div>
              <div className="space-y-2 xs:space-y-3">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <div className="text-white font-mona text-base xs:text-lg font-semibold leading-[20px] xs:leading-[22px] [word-break:_break-word;]">
                    {type === RANK_TYPE.LEAGUE ? item.name : item.username}
                  </div>
                  {getIcon(item)}
                </div>
                {getSubContent(item)}
              </div>
            </div>
            {type !== RANK_TYPE.MEMBER_ADMIN_LEAVE && (
              <div className="mr-1 xs:mr-2 2xs:mr-3">
                {[0, 1, 2].indexOf(index) === -1 ? (
                  <div className="text-white text-base xs:text-lg size-12 xs:size-[60px] flex items-center justify-center">
                    #{item.rank ? item.rank : index + 1}
                  </div>
                ) : (
                  <img
                    className="size-12 xs:size-[60px]"
                    src={`/assets/images/ranking/rank-0${index + 1}.png`}
                    alt="Rank"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomRank
