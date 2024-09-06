/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react'
import CustomItem from './custom-item'
import { LIST_TYPE } from '@/constants'
import { formatNumber } from '@/helper/common'
import { IconGroupUser, IconPoint } from './icons'

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
            title={
              (titleItemKey && item[titleItemKey]) || item.title || `${item.type} ${item.name}`
            }
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
          >
            {type === LIST_TYPE.SKILL ? (
              <div className="text-yellow-600 font-geist leading-[16px]">
                LV. {levelKey ? item[levelKey] : item.level}
              </div>
            ) : item.text ? (
              <div className="text-body font-geist text-base tracking-[-1px]">{item.text}</div>
            ) : type === LIST_TYPE.PARTNERS ? (
              <>
                <div className="flex items-center space-x-1">
                  <IconPoint className="size-[14px] xs:size-4" />
                  <p className="text-green-500 text-xs xs:text-[13px] 2xs:text-sm font-semibold leading-[16px]">
                    Up to +3000 points
                  </p>
                </div>
                <div className="flex items-center space-x-2 xs:space-x-3 2xs:space-x-4">
                  <div className="flex items-center leading-[16px] space-x-1">
                    <p className="text-title font-semibold text-[13px] xs:text-sm">0/5</p>
                    <p className="text-body text-xs">Conpleted</p>
                  </div>
                  <div className="w-[1px] h-4 bg-white/25"></div>
                  <div className="flex items-center leading-[16px] space-x-1">
                    <IconGroupUser className="text-body size-4" />
                    <p className="text-title font-semibold text-[13px] xs:text-sm">416K</p>
                  </div>
                </div>
              </>
            ) : (
              type !== 'shop' && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <img
                      className="size-4"
                      src="/assets/images/point.png"
                      srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                      alt="Point"
                    />
                    <p className="text-primary font-geist font-semibold">
                      {item.miningPower && '+'}
                      {(pointKey ? formatNumber(item[pointKey], 0, 2) : '') ||
                        formatNumber(item.miningPower, 0, 2)}
                    </p>
                  </div>
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
