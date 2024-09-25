import ImageDevice from './image-device'
import { IconPoint } from './icons'
import { formatNumber } from '@/helper/common'
import { useAppSound } from '@/hooks/useAppSound'
interface IItemDevice {
  key: number
  item: any
  handleClick: (item: any) => void
}
export default function ItemDevice({ key, item, handleClick }: IItemDevice) {
  const { buttonSound } = useAppSound()

  const _onClick = () => {
    buttonSound()
    handleClick(item)
  }
  return (
    <div
      key={key}
      className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] bg-white/10 transition-all px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer flex flex-col`}
      onClick={_onClick}
    >
      <ImageDevice
        image={item.image}
        className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
        type={item.type}
      />

      <p className="font-mona font-semibold text-white mt-2 xs:mt-3 mb-1 text-xs xs:text-[13px] 2xs:text-sm leading-[15px] xs:leading-[16px] min-h-[30px] xs:min-h-[32px]">
        {item.name}
      </p>
      <div className="mt-auto flex items-center justify-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
        <IconPoint className="size-4" />
        <p className="text-green-500 text-[13px] xs:text-sm">
          {' '}
          {item?.price ? `${formatNumber(item.price, 0, 0)}` : 0}
        </p>
      </div>
    </div>
  )
}
