import dayjs from 'dayjs'

export default function LastUpdateBox() {
  return (
    <div className="btn default cursor-default font-geist">
      <div className="btn-border"></div>
      <div className="btn-default max-xs:!py-2.5 max-xs:!px-3">
        <div className="flex items-center justify-center space-x-4 min-[355px]:space-x-6 xs:space-x-8 2xs:space-x-10">
          <div className="w-4 xs:w-6 2xs:w-[30px] h-[1px] bg-yellow-800"></div>
          <div className="space-y-1 text-center">
            <p className="uppercase text-[13px] xs:text-sm font-semibold leading-[16px] text-yellow-600">
              LAST UPDATE
            </p>
            <div className="text-white xs:text-[15px] 2xs:text-base font-normal leading-[20px] whitespace-nowrap">
              {dayjs().format('DD/MM/YYYY - HH:mm:ss')}
            </div>
          </div>
          <div className="w-4 xs:w-6 2xs:w-[30px] h-[1px] bg-yellow-800"></div>
        </div>
      </div>
      <div className="btn-border"></div>
    </div>
  )
}
