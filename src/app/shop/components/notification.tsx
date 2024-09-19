import CustomModal from '@/app/components/custom-modal'
import ImageDevice from '@/app/components/image-device'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ModalProps {
  isOpen: any
  onOpen: any
  onOpenChange: any
  onClose?: any
  item?: IDeviceTypeItem
}

const NotificationModal = ({ isOpen, onOpen, onOpenChange, onClose, item }: ModalProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/workspace')
  }

  return (
    <CustomModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose} full>
      <div className="h-full flex flex-col justify-between p-4">
        <div className="flex flex-1 flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
          <div className="relative drop-shadow-green before:content-[''] before:absolute before:top-[8px] before:left-[8px] before:border-transparent before:size-[14px] before:border-[7px] before:border-t-green-500 before:border-l-green-500 before:z-[-1] after:content-[''] after:absolute after:bottom-0 after:right-0 after:border-transparent after:size-5 after:border-[10px] after:border-b-green-500 after:border-r-green-500 after:z-[-1]">
            <div className="[--shape:_30px] p-[1px] size-[120px] xs:size-[150px] 2xs:size-[180px] bg-gradient [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))]">
              <ImageDevice
                className="[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] bg-[linear-gradient(to_bottom,#000,#00331d)] size-full"
                image={item?.image || ''}
                type={item?.type || ''}
              />
            </div>
          </div>
          <div className="text-center mb-6 space-y-3">
            <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6 mx-auto">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white leading-[calc(24/20)] tracking-[1px] uppercase">
                BUY SUCCESS
              </div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            <div className="xs:text-[15px] 2xs:text-base text-body font-geist !leading-[20px] tracking-[-1px]">
              {`You’ve bought ${item?.name}. Click “Equip now” to equip this item into your device.`}
            </div>
          </div>
        </div>
        <div className="m-4 xs:m-6 2xs:m-8">
          <div className="btn" onClick={handleClick}>
            <div className="btn-border"></div>
            <div className="btn-primary">EQUIP NOW</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default NotificationModal
