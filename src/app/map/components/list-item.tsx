import Image from 'next/image'
import React from 'react'

interface ListItemProps {
  listItem: any
  handleSelectItem: (index: number) => void
  activeItem: number
}

const ListItem = ({ listItem, handleSelectItem, activeItem }: ListItemProps) => {
  return (
    <div className="overflow-y-auto no-scrollbar max-h-[50vh]">
      <div className="flex flex-col space-y-2.5 xs:space-y-3 2xs:space-y-3.5">
        {listItem.map((item: any, index: number) => (
          <div
            className={`relative cursor-pointer after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-4 after:border-[8px] after:border-transparent after:transition-background ${activeItem === index ? 'after:border-b-green-500 after:border-r-green-500' : 'after:border-b-green-900 after:border-r-green-900'}`}
            key={index}
            onClick={() => handleSelectItem(index)}
          >
            <div
              className={`relative [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:size-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:transition-background p-2 flex items-center justify-between ${activeItem === index ? 'bg-green-500 before:bg-item-green' : 'before:bg-item-default before:opacity-20'}`}
            >
              <div className="flex items-center space-x-3 xs:space-x-4">
                <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%' }}
                    src={
                      item?.image
                        ? item?.image
                        : item?.avatar?.replace(/-/g, '-main-') ||
                          '/assets/images/avatar/avatar-main-01@2x.png'
                    }
                    alt="DePIN Alliance"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-white font-mona text-[15px] xs:text-base 2xs:text-lg font-semibold !leading-[20px] xs:!leading-[22px] [word-break:_break-word;]">
                    {item.name}
                  </div>
                  {/* <div className="text-yellow-600 uppercase text-xs xs:text-[13px] 2xs:text-sm !leading-[14px] xs:!leading-[16px]">
                          LV. 12
                        </div>
                        <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2 text-xs xs:text-[13px] 2xs:text-sm !leading-[14px] xs:!leading-[16px]">
                          <IconUpDown className="size-3.5 xs:size-4 text-green-500" />
                          <p className="text-title">Increase base reward</p>
                          <p className="text-green-300 font-semibold">2%</p>
                        </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListItem
