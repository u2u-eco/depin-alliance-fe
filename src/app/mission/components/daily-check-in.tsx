import CustomModal from '@/app/components/custom-modal'
import { QUERY_CONFIG } from '@/constants'
import { IMissionItem } from '@/interfaces/i.missions'
import { checkIn, getDailyCheckIn } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useRef } from 'react'
import { toast } from 'sonner'
dayjs.extend(utc)

export default function DailyCheckIn() {
  const { token } = useCommonStore()
  const currentItem = useRef<any>()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { data: listDaily, refetch } = useQuery({
    queryKey: ['fetchDailyCheckIn'],
    queryFn: getDailyCheckIn,
    enabled: Boolean(token),
    ...QUERY_CONFIG
  })
  const currentDay = Math.floor(
    dayjs().utc().set('hour', 0).set('minute', 0).set('second', 0).valueOf() / 1000
  )
  const handleClick = (item: IMissionItem) => {
    if (item.time <= currentDay && !item.isChecked) {
      currentItem.current = item
      onOpen()
    }
  }

  const handleClaim = async () => {
    const res = await checkIn()
    if (res.status) {
      toast.success('Mission is completed')
      refetch()
      onClose()
    }
  }
  return (
    <>
      <div className="font-geist text-base tracking-[-1px] leading-[20px] text-white-50 mt-8">
        DAILY CHECK-IN
      </div>

      <div className="grid grid-cols-4 gap-2">
        {listDaily?.data.map((item: IMissionItem, index: number) => (
          <div
            onClick={() => handleClick(item)}
            key={index}
            className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${item.isChecked ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
          >
            <div
              className={`flex items-center justify-center flex-col min-h-[120px] [clip-path:_polygon(30px_0,100%_0,100%_100%,0_100%,0_30px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#2C2D14] after:z-[-1] after:[clip-path:_polygon(30px_0,100%_0,100%_100%,0_100%,0_30px)] p-4 text-center cursor-pointer ${item.isChecked ? 'bg-green-900 after:bg-green-900' : currentDay.valueOf() === item.time ? 'bg-green-500 after:bg-[linear-gradient(to_top,#084625,#000100)] shadow-[0_0_16px_rgba(0,153,86,0.5)]' : ''}`}
            >
              <p
                className={`font-mona font-semibold mb-2 leading-[16px] ${item.isChecked ? 'text-green-700' : currentDay.valueOf() === item.time ? 'text-title' : 'text-inactive'}`}
              >
                {item.name}
              </p>
              <div className="flex items-center space-x-1">
                <img
                  className="size-6"
                  src="/assets/images/point.png"
                  srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                  alt="Point"
                />
                <p className="text-green-500">{item.point}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CustomModal
        title={'Daily Check-in'}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>Complete the following task:</p>
            <p className="text-gradient">“{currentItem.current?.name}”</p>
          </div>
          <div className="my-8 space-x-4 flex items-center justify-center">
            <div className="[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] bg-white/10 size-[90px] flex items-center justify-center">
              <img
                className="size-10"
                src="/assets/images/icons/icon-calendar-gradient.svg"
                alt=""
              />
            </div>
            <div className="space-y-2">
              <p className=" text-title font-semibold">REWARD:</p>
              <div className="flex items-center space-x-2">
                <img
                  className="size-6"
                  src="/assets/images/point.png"
                  srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                  alt="Point"
                />
                <p className="text-green-500">{currentItem.current?.point}</p>
              </div>
            </div>
          </div>
          <div className="btn" onClick={handleClaim}>
            <div className="btn-border"></div>
            <div className="btn-primary">Claim Now</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}