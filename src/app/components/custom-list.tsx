/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react'
import CustomItem from './custom-item'

interface ListProps {
  type: string
  title?: string
  data: any
  titleItemKey?: string
  imageItemKey?: string
  onClickItem?: (item: any) => void
}

const CustomList = ({ type, title, data, titleItemKey, imageItemKey, onClickItem }: ListProps) => {
  const handleClickItem = (item: any) => {
    onClickItem && onClickItem(item)
  }
  return (
    <div className="flex flex-col space-y-4">
      {title && (
        <div className="font-geist text-base tracking-[-1px] leading-[20px] text-white-50 mt-8">
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
              (imageItemKey && item[imageItemKey]) ||
              item.image ||
              `upgrade/upgrade-${item.type?.toLowerCase()}`
            }
            icon={item.icon}
            rank={index + 1}
            done={item.done}
            key={item.code}
          >
            {type === 'skill' ? (
              <div className="text-yellow-600 font-geist leading-[16px]">LV. {item.level}</div>
            ) : item.text ? (
              <div className="text-body font-geist text-base tracking-[-1px]">{item.text}</div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img
                    className="size-7"
                    src="/assets/images/point.png"
                    srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                    alt="Point"
                  />
                  <p className="text-primary font-geist font-semibold">
                    {type !== 'ranking' && '+'}
                    {item.miningPower}
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
            )}
          </CustomItem>
        </div>
      ))}
    </div>
  )
}

export default CustomList
