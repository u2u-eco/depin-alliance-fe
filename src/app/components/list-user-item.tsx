import { formatNumber } from '@/helper/common'
import { IconPoint } from './icons'
import ImageDevice from './image-device'

interface IListUserItem {
  listData: any
  activeItem?: string
  handleClick: (item: any, index: number) => void
}
export default function ListUserItem({ listData, handleClick, activeItem }: IListUserItem) {
  const getName = (item: any) => {
    if (item.code === 'CYBER_BOX') {
      return '???'
    }
    if (item.code === 'FLASHBACK') {
      return 'Ticket'
    }
    return `$${item.name.split('$')[1] || ''}`
  }
  return (
    <>
      {listData?.map((item: any, index: number) => (
        <div
          key={item.code}
          className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${activeItem === item.code ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
        >
          <div
            className={`flex flex-col [--shape:_24px] xs:[--shape:_28px] 2xs:[--shape:_32px] h-full [clip-path:_polygon(var(--shape)_0,100%_0,100%_100%,0_100%,0_var(--shape))] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-white/10 after:z-[-1] after:[clip-path:_polygon(var(--shape)_0,100%_0,100%_100%,0_100%,0_var(--shape))] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'after:bg-[#143828]' : ''}`}
            onClick={() => handleClick(item, index)}
          >
            <div className="relative w-fit mx-auto after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-7 xs:after:size-8 2xs:after:size-9 after:border-[14px] xs:after:border-[16px] 2xs:after:border-[18px] after:border-transparent after:border-b-green-500 after:border-r-green-500">
              <div className="relative p-[1px] bg-green-100 size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-[calc(100%_-_2px)] before:bg-[#233b31] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]">
                <ImageDevice
                  image={item.image}
                  className="size-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                  type={item.type}
                />
              </div>
              <div className="absolute bottom-[1px] xs:bottom-[2px] right-[1px] xs:right-[2px] min-w-4 2xs:min-w-5 text-green-900 text-[10px] xs:text-[11px] 2xs:text-xs font-semibold !leading-[14px] xs:!leading-[16px] text-center z-[2] max-2xs:tracking-[-0.5px]">
                {item.totalItem || 1}
              </div>
            </div>

            <p className="font-mona font-semibold text-white mt-3 mb-1 text-xs xs:text-[13px] 2xs:text-sm xs:!leading-[18px]">
              {item.name.split('$')[0] || ''}
            </p>
            {item.type !== 'SPECIAL' ? (
              <div className="flex items-center justify-center space-x-1 mt-auto">
                <IconPoint className="size-3 xs:size-4" />
                <p className="text-green-500 font-semibold text-xs xs:text-sm !leading-[16px]">
                  {item?.miningPower && `${formatNumber(item?.miningPower, 0, 2)}/h`}
                </p>
              </div>
            ) : (
              <p className="text-green-500 mt-auto leading-[18px]">{getName(item)}</p>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
