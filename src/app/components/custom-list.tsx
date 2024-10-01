/* eslint-disable @next/next/no-img-element */
import React from 'react'
import CustomItem from './custom-item'
import { LIST_TYPE } from '@/constants'
import { formatNumber } from '@/helper/common'
import { IconGroupUser, IconPoint, IconUpDown } from './icons'
import Image from 'next/image'
import { useAppSound } from '@/hooks/useAppSound'

interface ListProps {
  type: string
  title?: string
  data: any
  titleItemKey?: string
  imageItemKey?: string
  pointKey?: string
  levelKey?: string
  imageDefault?: string
  imageUrlPath?: string
  partners?: boolean
  cb?: () => void
  onClickItem?: (item: any) => void
}

const CustomList = ({
  type,
  title,
  data,
  titleItemKey,
  imageItemKey,
  imageUrlPath,
  pointKey,
  imageDefault,
  levelKey,
  cb,
  onClickItem
}: ListProps) => {
  const { buttonSound } = useAppSound()

  const handleClickItem = (item: any) => {
    if (onClickItem) {
      buttonSound.play()
      onClickItem(item)
    }
  }
  const isDone = (item: any) => {
    return type === LIST_TYPE.MISSION ? item.status === 'CLAIMED' : item.status
  }
  return (
    <div className="flex flex-col space-y-3 xs:space-y-4">
      {title && (
        <div className="font-geist text-[15px] xs:text-base tracking-[-1px] leading-[20px] text-white-50 mt-6 xs:mt-7 2xs:mt-8">
          {title}
        </div>
      )}
      {data?.map((item: any, index: number) => (
        <div
          className={type === LIST_TYPE.RESEARCH && item.lock ? 'pointer-events-none' : ''}
          onClick={() => handleClickItem(item)}
          key={index}
        >
          <CustomItem
            type={type}
            title={(titleItemKey && item[titleItemKey]) || item.title || `${item.name}`}
            image={
              imageDefault ||
              (imageItemKey && `${imageUrlPath ? imageUrlPath : ''}${item[imageItemKey]}`) ||
              item.image ||
              `upgrade/upgrade-${item.type?.toLowerCase()}`
            }
            icon={item.icon}
            done={isDone(item)}
            key={item.code}
            item={item}
            status={item.status}
            cb={cb}
          >
            {type === LIST_TYPE.SKILL || type === LIST_TYPE.RESEARCH ? (
              item.lock ? (
                <div className="flex items-center space-x-1.5 xs:space-x-2  tracking-[-1px] leading-[18px]">
                  <p className="text-white-50 uppercase">PROFIT</p>
                  <IconPoint className="size-4" />
                  <p className="text-title ">{formatNumber(item.profit, 0, 0)}</p>
                </div>
              ) : (
                <div className="space-y-1 xs:space-y-1.5 !mt-1 xs:!mt-1.5">
                  <div
                    className={`text-yellow-600 ${type === LIST_TYPE.SKILL || type === LIST_TYPE.RESEARCH ? 'text-[13px] xs:text-sm !leading-[16px]' : 'text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px]'}`}
                  >
                    LV. {levelKey ? item[levelKey] : item.level}
                  </div>
                  {type === LIST_TYPE.RESEARCH && (
                    <div className="flex items-center space-x-2">
                      <IconUpDown
                        className={`size-4 ${(item.effectCurrent + item.rateEffect) * 100 >= 100 ? 'text-green-500 drop-shadow-[0_0_8px_rgba(0,153,86,0.8)]' : 'text-[#E53935] rotate-180 drop-shadow-[0_0_8px_rgba(229,57,53,0.8)]'} `}
                      />
                      <p className="tracking-[-1px] text-title capitalize font-normal leading-[18px]">
                        {item?.description}:
                      </p>
                      <p
                        className={`font-semibold leading-[18px] ${(item.effectCurrent + item.rateEffect) * 1 >= 1 ? 'text-green-300' : 'text-error-blur'}`}
                      >{`${formatNumber(item.effectCurrent + item.rateEffect, 0, 2)}%`}</p>
                    </div>
                  )}
                </div>
              )
            ) : item.text ? (
              <div className="text-body text-base tracking-[-1px]">{item.text}</div>
            ) : (
              type !== 'shop' && (
                <div className="flex items-center flex-wrap space-x-2 xs:space-x-2.5 2xs:space-x-3 text-[13px] xs:text-sm">
                  {item.miningPower === 0 || (pointKey && item[pointKey]) ? (
                    <div className="flex items-center space-x-1">
                      <img
                        className="size-4"
                        src="/assets/images/point.png"
                        srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                        alt="Point"
                      />
                      <p className="text-primary font-geist font-semibold">
                        {item.miningPower && '+'}
                        {(pointKey && item[pointKey]
                          ? `${formatNumber(item[pointKey], 0, 2)}`
                          : '0') ||
                          (item.miningPower && `${formatNumber(item.miningPower, 0, 2)}/h`)}{' '}
                      </p>
                    </div>
                  ) : null}
                  {item.amount > 0 && (
                    <>
                      {item.miningPower !== 0 && pointKey && item[pointKey] ? (
                        <div className="w-[1px] h-4 xs:h-5 bg-white/25"></div>
                      ) : null}
                      <div className="flex items-center space-x-1">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="size-5"
                          src={item.rewardImage || '/assets/images/item-special.png'}
                          alt={item.rewardName}
                        />
                        <p className="text-primary font-geist font-semibold">{`${item.amount} ${item.rewardName === 'OPEN' ? '$OPEN' : item.rewardName}`}</p>
                      </div>
                    </>
                  )}
                  {item.totalContributors > 0 ? (
                    <>
                      <IconGroupUser className="size-4 xs:size-5 text-green-500" />
                      <p className="text-green-500 font-semibold text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] !ml-1 xs:!ml-2">
                        {formatNumber(item.totalContributors || 0, 0, 0)}
                      </p>
                    </>
                  ) : null}
                  {item.xp > 0 && (
                    <>
                      {(item.miningPower !== 0 && pointKey && item[pointKey]) || item.box ? (
                        <div className="w-[1px] h-4 xs:h-5 bg-white/25"></div>
                      ) : null}
                      <div className="flex items-center space-x-1">
                        <p className="text-primary font-geist font-semibold">{`${formatNumber(item.xp, 0, 0)} XP`}</p>
                      </div>
                    </>
                  )}
                  {item.available ||
                    (item.complete && (
                      <>
                        <div className="h-4 w-[1px] bg-white/25"></div>
                        <div className="flex items-center">
                          <p className="text-primary font-geist font-semibold">
                            {item.available ? item.available : `${item.complete}/${item.totalTask}`}{' '}
                            <span className="font-normal text-xs text-white-50 -ml-0.5">
                              {item.available ? 'Available' : 'Completed'}
                            </span>
                          </p>
                        </div>
                      </>
                    ))}
                </div>
              )
            )}
          </CustomItem>
        </div>
      ))}
    </div>
  )
}

export default CustomList
