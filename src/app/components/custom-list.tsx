import React, { ReactNode } from 'react'
import CustomItem from './custom-item'

interface ListProps {
  type: string,
  data: any
}

const CustomList = ({
  type,
  data
}: ListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {data?.map((item: any) => (
        <CustomItem
          type={type}
          title={item.title}
          image={item.image}
          icon={item.icon}
          key={item.id}
        >
          {type === 'skill' ? (
            <div className="text-yellow-600 font-geist leading-[16px]">LV. {item.level}</div>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img className="size-7" src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="Point" />
                <p className="text-primary font-geist font-semibold">+{item.point}/h</p>
              </div>
              <div className="h-4 w-[1px] bg-white/25"></div>
              <div className="flex items-center">
                <p className="text-primary font-geist font-semibold">{item.available} <span className="font-normal text-xs text-white-50 -ml-0.5">Available</span></p>
              </div>
            </div>
          )}
        </CustomItem>
      ))}
    </div>
  )
}

export default CustomList