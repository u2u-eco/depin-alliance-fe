import { IconPoint } from '@/app/components/icons'
import ImageDevice from '@/app/components/image-device'
import { formatNumber } from '@/helper/common'
import React, { useState } from 'react'

const lisDevice = [
  { id: 1, type: 'cpu', name: 'RAM 2GB', image: '', miningPower: 1222 },
  { id: 2, type: 'ram', name: 'RAM 2GB', image: '', miningPower: 1222 },
  { id: 3, type: 'ram', name: 'RAM 2GB', image: '', miningPower: 1222 },
  { id: 4, type: 'gpu', name: 'RAM 2GB', image: '', miningPower: 1222 },
  { id: 5, type: 'storage', name: 'RAM 2GB', image: '', miningPower: 1222 }
]

const ContributeModal = () => {
  const [activeItem, setActiveItem] = useState()

  return (
    <div>
      <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
        <p>Fund your points to League to unlock special features</p>
      </div>
      <div className="mt-8 mb-6 h-[300px] overflow-y-auto no-scrollbar ">
        <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-8">
          {lisDevice.map((item: any, index: number) => (
            <div
              key={index}
              className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all h-full ${activeItem === item.id ? 'before:border-l-green-500 before:border-t-green-500 drop-shadow-green' : ''}`}
            >
              <div
                className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] h-full transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#143828] after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'bg-green-500 before:border-l-green-500 before:border-t-green-500' : ''}`}
                onClick={() => setActiveItem(item.id)}
              >
                <div className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] p-[1px] bg-green-100">
                  <ImageDevice
                    image={item.image}
                    type={item.type?.toLowerCase()}
                    className="size-full mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                  />
                </div>
                <p className="font-mona font-semibold text-white mt-3 mb-1 text-[13px] xs:text-sm !leading-[16px]">
                  {item.name}
                </p>
                <div className="flex items-center justify-center space-x-1 mt-1.5">
                  <IconPoint className="size-3 xs:size-4" />
                  <span className="text-primary font-semibold text-[11px] min-[355px]:text-xs xs:text-sm">
                    {item?.miningPower ? formatNumber(item?.miningPower, 0, 2) : 0}
                    /h
                  </span>
                </div>
                {/* <p className="text-green-500">x{item.totalItem}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-error !leading-[18px] tracking-[-1px]">
        After contributing, your items will not be returned. So select carefully
      </p>
      <div className="mt-6">
        <div className="btn">
          <div className="btn-border"></div>
          <div className="btn-primary">Confirm</div>
          <div className="btn-border"></div>
        </div>
      </div>
    </div>
  )
}

export default ContributeModal
