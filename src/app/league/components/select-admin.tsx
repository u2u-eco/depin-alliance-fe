import { formatNumber } from '@/helper/common'
import React, { useState } from 'react'

import AllMember from '../member/components/all-member'
import { BUTTON_TYPE, FUNDING_TYPE } from '@/constants'
import CustomButton from '@/app/components/button'

interface ModalProps {
  item?: any
  onClose: () => void
  handleLeave: (id: number) => void
}

const SelectAdminModal = ({ item, onClose, handleLeave }: ModalProps) => {
  const [totalMember, setTotalMember] = useState<number>(0)
  const [currentId, setCurrentId] = useState<number>(0)
  const handleSelectItem = (item: any) => {
    setCurrentId(item.id)
  }

  return (
    <div className="r">
      <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
        <p>
          Before you leave this league, please select 1 member to become the new admin for{' '}
          <span className="text-[#1AF7A8] [word-break:_break-word;]">{`"${item?.name}"`}</span>?
        </p>
      </div>
      <div className="my-6 xs:my-7 2xs:my-8 space-y-5 xs:space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
            MEMBERS <span className="text-title">({formatNumber(totalMember, 0, 0)})</span>
          </p>
          {/* <div className="flex items-center space-x-2 cursor-pointer" onClick={handleShowModer}>
            <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
              MODER
            </p>
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="relative size-5 xs:size-6 min-w-5 xs:min-w-6 flex items-center justify-center"
            >
              <div
                className={`border-1.5 border-green-700 rotate-45 size-[15px] xs:size-[18px] p-0.5 xs:p-[3px] transition-background ${isModer ? 'bg-white/10' : ''}`}
              >
                <div
                  className={`size-full bg-gradient transition-opacity ${isModer ? 'opacity-100' : 'opacity-0'}`}
                ></div>
              </div>
            </motion.div>
          </div> */}
        </div>
        {/* <CustomInputSearch placeholder="Search member..." onValueChange={handleUpdateText} /> */}
        <AllMember
          hideUpdateTime
          type="leave-admin"
          setTotalMember={setTotalMember}
          activeTab={FUNDING_TYPE}
          handleClick={handleSelectItem}
        />
        {/* <div className="max-h-[400px] no-scrollbar overflow-y-auto">
          <div className="flex flex-col space-y-3 xs:space-y-4">
            <div className="relative after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent after:border-b-green-900 after:border-r-green-900 after:border-b-green-500 after:border-r-green-500">
              <div className="relative after:hidden [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] p-2 flex items-center justify-between before:bg-item-default before:opacity-20 before:bg-item-green bg-green-500 drop-shadow-green">
                <div className="flex items-center space-x-3 xs:space-x-4">
                  <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%' }}
                      src={
                        item?.avatar?.replace(/-/g, '-main-') ||
                        '/assets/images/avatar/avatar-01@2x.png'
                      }
                      alt="DePIN Alliance"
                    />
                  </div>
                  <div className="space-y-2 xs:space-y-3">
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <div className="text-white font-mona text-base xs:text-lg font-semibold leading-[20px] xs:leading-[22px] [word-break:_break-word;]">
                        {item?.username}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IconPoint className="size-4" />
                      <p className="text-primary font-semibold overflow-hidden max-w-[120px] xs:max-w-[160px] 2xs:max-w-[200px] text-ellipsis">
                        {formatNumber(item?.pointEarned || 0, 0, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex items-center space-x-2 xs:space-x-3 2xs:space-x-4">
        <CustomButton type={BUTTON_TYPE.DEFAULT} title="CANCEL" onAction={onClose} />
        <CustomButton
          type={BUTTON_TYPE.CANCEL}
          disable={!currentId}
          title="CONFIRM & LEAVE"
          buttonClass="!px-0 text-sm xs:text-[15px] 2xs:text-base"
          onAction={() => {
            handleLeave(currentId)
          }}
        />
      </div>
    </div>
  )
}

export default SelectAdminModal
