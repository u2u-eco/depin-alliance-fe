import { IconGroupUser } from '@/app/components/icons'
import { formatNumber } from '@/helper/common'
import React from 'react'

interface ModalProps {
  item: any
  onClose: () => void
  handleAction: () => void
}

const LeaveModal = ({ item, onClose, handleAction }: ModalProps) => {
  return (
    <div>
      <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
        <p>
          Do you want to leave this league{' '}
          <span className="text-[#1AF7A8] [word-break:_break-word;]">{`"${item?.name}"`}</span>?
        </p>
      </div>
      <div className="mt-8 mb-10 flex items-center justify-center space-x-3 xs:space-x-4">
        <div
          className={`p-[1px] size-[110px] min-w-[110px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center`}
        >
          <img
            className="size-full object-cover [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
            src={`${item?.avatar ? `${item.avatar}` : '/assets/images/league/league-04@2x.png'}`}
            alt="DePIN Alliance"
          />
        </div>
        <div className="space-y-1.5 xs:space-y-2">
          <p className="text-white font-semibold font-mona text-lg xs:text-xl 2xs:text-2xl !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px]  [word-break:_break-word;]">
            {item?.name}
          </p>
          <div className="flex items-center space-x-1.5 xs:space-x-2">
            <IconGroupUser className="size-5 xs:size-6 2xs:size-7 text-primary" />
            <span className="text-primary font-semibold xs:text-base 2xs:text-lg">
              {formatNumber(item?.totalContributors || 0, 0, 0)}
            </span>
          </div>
          {/* <div className="flex items-center space-x-1.5 xs:space-x-2">
                <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                <span className="text-primary font-semibold xs:text-base 2xs:text-lg">
                  {item?.totalMining ? formatNumber(item.totalMining, 0, 2) : 0}/h
                </span>
              </div> */}
          {/* <p className="text-base leading-[20px] tracking-[-1px] text-yellow-500 uppercase">
                LV. {item?.level}
              </p> */}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="btn default" onClick={() => onClose()}>
          <div className="btn-border"></div>
          <div className="btn-default">Cancel</div>
          <div className="btn-border"></div>
        </div>
        <div className="btn error" onClick={handleAction}>
          <div className="btn-border"></div>
          <div className="btn-error">Leave</div>
          <div className="btn-border"></div>
        </div>
      </div>
    </div>
  )
}

export default LeaveModal
