import CustomModal from '@/app/components/custom-modal'
import { IconPoint } from '@/app/components/icons'
import Loader from '@/app/components/ui/loader'
import { QUERY_CONFIG } from '@/constants'
import { formatNumber } from '@/helper/common'
import { IMissionItem } from '@/interfaces/i.missions'
import { checkIn, getDailyCheckIn } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
dayjs.extend(utc)

export default function DailyCheckIn() {
  const { token, getUserInfo } = useCommonStore()
  const currentItem = useRef<any>()
  const [isLoadingBtn, setLoadingBtn] = useState<boolean>(false)
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
    if (isLoadingBtn) return
    setLoadingBtn(true)
    try {
      const res = await checkIn()
      if (res.status) {
        toast.success('Mission is completed')
        refetch()
        getUserInfo()
        onClose()
      }
      setLoadingBtn(false)
    } catch (ex) {
      setLoadingBtn(false)
    }
  }
  return (
    <>
      {listDaily?.data?.length > 0 ? (
        <>
          <div className="font-geist text-[15px] xs:text-base tracking-[-1px] leading-[20px] text-white-50 mt-8">
            DAILY CHECK-IN
          </div>

          <div className="grid grid-cols-3 xs:grid-cols-4 gap-1.5 2xs:gap-2">
            {listDaily?.data?.map((item: IMissionItem, index: number) => (
              <div
                onClick={() => handleClick(item)}
                key={index}
                className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${item.isChecked ? 'before:border-l-green-500 before:border-t-green-500' : currentDay.valueOf() === item.time ? 'drop-shadow-green' : ''}`}
              >
                <div
                  className={`[--shape:_25px] 2xs:[--shape:_30px] space-y-1 2xs:space-y-1.5 flex items-center justify-center flex-col min-h-[110px] 2xs:min-h-[120px] [clip-path:_polygon(var(--shape)_0,100%_0,100%_100%,0_100%,0_var(--shape))] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-white/5 after:z-[-1] after:[clip-path:_polygon(var(--shape)_0,100%_0,100%_100%,0_100%,0_var(--shape))] text-center cursor-pointer ${item.isChecked ? '!bg-green-900 after:!bg-green-900' : currentDay.valueOf() === item.time ? '!bg-green-500 after:!bg-[linear-gradient(to_top,#084625,#000100)]' : ''}`}
                >
                  <p
                    className={`font-mona font-semibold mb-0.5 leading-[16px] ${item.isChecked ? 'text-green-700' : currentDay.valueOf() === item.time ? 'text-title' : 'text-inactive'}`}
                  >
                    {item.name}
                  </p>
                  <div className="flex items-center space-x-1">
                    <IconPoint className="size-4 2xs:size-5" />
                    <p className="text-green-500 text-[13px] 2xs:text-sm !leading-[18px]">
                      {formatNumber(item.point, 0, 0)}
                    </p>
                  </div>
                  <p className="text-green-500 text-[13px] 2xs:text-sm !leading-[18px]">
                    {item.xp ? formatNumber(item.xp, 0, 0) : 0} XP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
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
          <div className="my-8 space-x-3 xs:space-x-4 flex items-center justify-center">
            <div className="[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] bg-white/10 size-[80px] xs:size-[85px] 2xs:size-[90px] min-w-[80px] xs:min-w-[85px] 2xs:min-w-[90px] flex items-center justify-center">
              <img
                className="size-8 xs:size-9 2xs:size-10"
                src="/assets/images/icons/icon-calendar-gradient.svg"
                alt="DePIN Alliance"
              />
            </div>
            <div className="space-y-1.5 xs:space-y-2">
              <p className=" text-title font-semibold text-[13px] xs:text-sm !leading-[18px]">
                REWARD:
              </p>
              <div className="flex items-center space-x-2 xs:space-x-3 2xs:space-x-4 text-[13px] xs:text-sm !leading-[18px]">
                <div className="flex items-center space-x-1 xs:space-x-2">
                  <img
                    className="size-4 xs:size-5 2xs:size-6"
                    src="/assets/images/point.png"
                    srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                    alt="Point"
                  />
                  <p className="text-green-500">
                    {currentItem.current?.point
                      ? formatNumber(currentItem.current?.point, 0, 0)
                      : 0}
                  </p>
                </div>
                <div className="w-[1px] h-5 bg-white/25"></div>
                <p className="text-green-500">
                  {currentItem.current?.xp ? formatNumber(currentItem.current?.xp, 0, 0) : 0} XP
                </p>
              </div>
            </div>
          </div>
          <div className="btn" onClick={handleClaim}>
            <div className="btn-border"></div>
            <div className="btn-primary flex justify-center items-center">
              Claim Now{' '}
              {isLoadingBtn && (
                <Loader
                  classNames={{
                    icon: 'text-black',
                    wrapper: 'max-w-[20px] ml-1'
                  }}
                />
              )}
            </div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
