import { IconCheck, IconClose, IconPoint } from '@/app/components/icons'
import { formatNumber } from '@/helper/common'
import { IJoinRequest } from '@/interfaces/i.league'
import useCommonStore from '@/stores/commonStore'
import Image from 'next/image'
import React, { useState } from 'react'

interface ItemProps {
  type?: string
  item: IJoinRequest
  handleCheck?: (id: number) => void
  handleCancel?: (id: number) => void
  handleKick?: (item: IJoinRequest) => void
}

const ITEM_TYPE = {
  REQUEST: 'request',
  MEMBER: 'member'
}

const MemberItem = ({ item, type, handleCheck, handleCancel, handleKick }: ItemProps) => {
  const { currentLeague } = useCommonStore()
  const [selectCode, setSelectedCode] = useState<number>(0)

  const isDisable = item.userId === selectCode || (item?.id && item.id === selectCode)
  const handleClick = (type: string) => {
    if (isDisable) return
    if (!handleKick) {
      setSelectedCode(item?.userId || item?.id || 0)
    }
    if (type === 'check') {
      handleCheck && handleCheck(item.userId)
    } else {
      handleKick ? handleKick(item) : handleCancel && handleCancel(item.userId)
    }
  }
  return (
    <div className="relative !bg-transparent before:hidden after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent after:border-b-green-900 after:border-r-green-900">
      <div className="relative after:hidden [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:bg-item-default before:opacity-20 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-3 xs:space-x-4">
          <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%' }}
              src={item.avatar.replace(/-/g, '-main-') || '/assets/images/avatar/avatar-01@2x.png'}
              alt=""
            />
          </div>
          <div className="space-y-1.5 xs:space-y-2">
            <div className="text-white font-mona text-[15px] xs:text-base 2xs:text-lg font-semibold !leading-[1] [word-break:_break-word;]">
              {item.username}
            </div>
            <div className="flex items-center space-x-1 xs:space-x-2">
              <IconPoint className="size-4 xs:size-5 2xs:size-6" />
              <p className="text-primary font-semibold">
                {item.miningPower ? `${formatNumber(item.miningPower, 0, 2)}/h` : '0/h'}
              </p>
            </div>
          </div>
        </div>
        {currentLeague?.isOwner && (
          <div className="ml-2 mr-1 xs:mr-2 2xs:mr-3 flex items-center space-x-4 xs:space-x-5 2xs:space-x-6">
            {type === ITEM_TYPE.REQUEST && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  handleClick('check')
                }}
              >
                <IconCheck
                  className={`size-6 xs:size-7 2xs:size-8 ${isDisable ? 'text-inactive' : 'text-green-500'} `}
                />
              </div>
            )}
            <div
              className="cursor-pointer"
              onClick={() => {
                handleClick('cancel')
              }}
            >
              <IconClose
                className={`size-6 xs:size-7 2xs:size-8 ${isDisable ? 'text-inactive' : type === ITEM_TYPE.REQUEST ? 'text-error-blur' : 'text-yellow-800'}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberItem
