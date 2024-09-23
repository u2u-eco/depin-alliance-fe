/* eslint-disable @next/next/no-img-element */
import React from 'react'
import CustomItem from './custom-item'
import { LIST_TYPE } from '@/constants'
import { formatNumber } from '@/helper/common'
import { IconGroupUser } from './icons'
import Image from 'next/image'

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
  partners,
  cb,
  onClickItem
}: ListProps) => {
  const handleClickItem = (item: any) => {
    onClickItem && onClickItem(item)
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
        <div onClick={() => handleClickItem(item)} key={index}>
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
            {type === LIST_TYPE.SKILL ? (
              <div
                className={`text-yellow-600 ${type === LIST_TYPE.SKILL ? 'text-[13px] xs:text-sm !leading-[16px]' : 'text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px]'}`}
              >
                LV. {levelKey ? item[levelKey] : item.level}
              </div>
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
                        <p className="text-primary font-geist font-semibold">{`${item.amount} ${item.rewardName}`}</p>
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
