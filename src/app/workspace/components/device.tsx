'use client'

import CustomInput from '@/app/components/custom-input'
import CustomModal from '@/app/components/custom-modal'
import { IconPoint } from '@/app/components/icons'
import { QUERY_CONFIG } from '@/constants'
import { IDeviceTypeItem, IUserDeviceItem } from '@/interfaces/i.devices'
import {
  addItem,
  changeNameDevice,
  getListDevice,
  getNewDevice,
  getUserDevice,
  removeItem
} from '@/services/devices'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import DeviceItem from './device-item'
import { formatNumber } from '@/helper/common'
import { toast } from 'sonner'
import ImageDevice from '@/app/components/image-device'
import ChooseDevice from './choose-device'
import AccordionItem from '@/app/components/accordion-item'

const DEVICE_TYPE = {
  INFO: 'info',
  EDIT: 'edit',
  EQUIP: 'equip',
  BUY: 'buy'
}

export default function Device() {
  const { token, userConfig, getUserConfig, getUserInfo } = useCommonStore()
  const [activeType, setActiveType] = useState(DEVICE_TYPE.INFO)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeItem, setActiveItem] = useState<number>(0)
  const deviceItemDetail = useRef<{ [key: number]: Array<IDeviceTypeItem> }>({})
  const detailDeviceItem = useRef<any>()
  const currentDevice = useRef<any>()
  const [expanded, setExpanded] = useState<number | false>(false)
  const [loadingButton, setLoadingButton] = useState(false)

  const currentName = useRef<string>('')
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)
  const currentIndex = useRef<number>(0)
  const equipType = useRef<string>('')
  const { data: listDevice, refetch: refetchListDevice } = useQuery({
    queryKey: ['fetchListDevice'],
    queryFn: getListDevice,
    ...QUERY_CONFIG,
    enabled: Boolean(token)
  })

  const getDeviceItemDetail = async (index: number) => {
    currentIndex.current = index
    try {
      setIsLoadingDetail(true)
      const res = await getUserDevice({ index })
      if (res.status) {
        deviceItemDetail.current[index] = res.data
      }
      setIsLoadingDetail(false)
    } catch (ex) {
      setIsLoadingDetail(false)
    }
  }

  const handleAddItem = async () => {
    setLoadingButton(true)
    try {
      const res = await addItem(currentIndex.current, activeItem)
      if (res.status) {
        toast.success('Equip item successfully!')
        setActiveItem(0)
        refetchListDevice()
        getDeviceItemDetail(currentIndex.current)
        getUserInfo()
        onClose()
      }
      setLoadingButton(false)
    } catch (ex) {
      setLoadingButton(false)
    }
  }

  const handleRemoveItem = async () => {
    setLoadingButton(true)
    try {
      const res = await removeItem(detailDeviceItem.current.id)
      if (res.status) {
        toast.success('Unequipped successfully!')
        refetchListDevice()
        getDeviceItemDetail(currentIndex.current)
        getUserInfo()
        onClose()
      }
      setLoadingButton(false)
    } catch (ex) {
      setLoadingButton(false)
    }
  }

  const handleChangeName = async () => {
    if (currentName.current.trim().length > 0) {
      setLoadingButton(true)
      try {
        const res = await changeNameDevice({
          name: currentName.current.trim(),
          index: currentDevice.current.index
        })
        if (res.status) {
          toast.success('Device name changed successfully!')
          currentName.current = ''
          onClose()
          refetchListDevice()
        }
        setLoadingButton(false)
      } catch (ex) {
        setLoadingButton(false)
      }
    }
  }

  const handleConfirm = () => {
    if (loadingButton) return
    switch (activeType) {
      case DEVICE_TYPE.EQUIP:
        if (activeItem) {
          handleAddItem()
          return
        }
        break
      case DEVICE_TYPE.INFO:
        handleRemoveItem()
        break
      case DEVICE_TYPE.EDIT:
        handleChangeName()
        break
      case DEVICE_TYPE.BUY:
        handleAddNewDevice()
        break
    }
  }

  const handleClickItem = (index: number) => {
    if (!deviceItemDetail.current[index]) {
      getDeviceItemDetail(index)
    }
    currentIndex.current = index
  }

  const handleClick = (type: string, device?: IUserDeviceItem) => {
    setActiveType(type)
    if (device) {
      currentDevice.current = device
    }
    if (type === DEVICE_TYPE.EDIT) {
      currentName.current = device?.name || ''
    }
    onOpen()
  }

  const handleEquip = (type: string) => {
    equipType.current = type
    setActiveType(DEVICE_TYPE.EQUIP)
    onOpen()
  }

  const handleInfo = (item: IDeviceTypeItem) => {
    detailDeviceItem.current = item
    setActiveType(DEVICE_TYPE.INFO)
    onOpen()
  }

  const handleClose = () => {
    onClose()
    currentName.current = ''
    setActiveItem(0)
  }

  const handleInputName = (value: string) => {
    currentName.current = value
  }

  const handleAddNewDevice = async () => {
    setLoadingButton(true)
    const res = await getNewDevice()
    try {
      if (res.status) {
        toast.success('Buy device successfully!!')
        refetchListDevice()
        getUserInfo()
        getUserConfig()
        onClose()
      }
      setLoadingButton(false)
    } catch (ex) {
      setLoadingButton(false)
    }
  }

  const disableBtn = activeType === DEVICE_TYPE.EQUIP && !activeItem ? true : false
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4 mb-12">
          {listDevice?.data.map((item: IUserDeviceItem) => {
            return (
              <AccordionItem
                key={item.index}
                index={item.index}
                item={item}
                expanded={expanded}
                setExpanded={setExpanded}
                handleEdit={(item) => handleClick(DEVICE_TYPE.EDIT, item)}
                handleClickItem={handleClickItem}
              >
                <DeviceItem
                  isLoading={isLoadingDetail}
                  item={deviceItemDetail.current[item.index]}
                  handleEquip={handleEquip}
                  handleInfo={handleInfo}
                />
              </AccordionItem>
            )
          })}
        </div>
        {userConfig?.maxDevice && userConfig.maxDevice > listDevice?.data.length && (
          <div className="fixed bottom-3 3xs:bottom-4 left-3 3xs:left-4 right-3 3xs:right-4 max-w-[480px] mx-auto z-10">
            <div className="btn mt-6" onClick={() => handleClick(DEVICE_TYPE.BUY)}>
              <div className="btn-border"></div>
              <div className="btn-primary">buy more device</div>
              <div className="btn-border"></div>
            </div>
          </div>
        )}
      </div>

      <CustomModal
        title={
          activeType === DEVICE_TYPE.INFO
            ? 'ITEM Info'
            : activeType === DEVICE_TYPE.EQUIP
              ? 'equip item'
              : activeType === DEVICE_TYPE.BUY
                ? 'Buy Device'
                : 'DEVICE NAME'
        }
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div className="relative w-full">
          {activeType !== DEVICE_TYPE.EDIT && (
            <div className=" text-body xs:text-[15px] 2xs:text-base tracking-[-1px] text-center">
              {activeType === DEVICE_TYPE.INFO ? (
                <p>You are equipping this item!</p>
              ) : activeType === DEVICE_TYPE.BUY ? (
                <p>
                  Are you sure you want to buy{' '}
                  <span className="text-gradient whitespace-nowrap">“New Device”</span>?
                </p>
              ) : (
                <p>
                  Select 01 <span className="text-gradient">“{equipType.current}”</span> to equip
                </p>
              )}
            </div>
          )}
          {activeType !== DEVICE_TYPE.EQUIP ? (
            <>
              <div
                className={`space-x-4 flex items-center justify-center ${activeType === DEVICE_TYPE.INFO ? 'mt-6 xs:mt-8 2xs:mt-10 mb-10 xs:mb-12 2xs:mb-14' : 'my-6 xs:my-8'}`}
              >
                <div
                  className={`p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${activeType === DEVICE_TYPE.INFO ? 'size-[80px] xs:size-[85px] 2xs:size-[90px] min-w-[80px] xs:min-w-[85px] 2xs:min-w-[90px]' : 'size-[110px] xs:size-[120px] 2xs:size-[130px] min-w-[110px] xs:min-w-[120px] 2xs:min-w-[130px]'}`}
                >
                  <ImageDevice
                    image={
                      activeType === DEVICE_TYPE.EDIT
                        ? '/assets/images/workspace/device-image-01@2x.png'
                        : activeType === DEVICE_TYPE.BUY
                          ? '/assets/images/shop/device-01@2x.png'
                          : detailDeviceItem.current?.image
                    }
                    type={detailDeviceItem.current?.type?.toLowerCase()}
                    className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                  />
                </div>
                <div
                  className={
                    activeType === DEVICE_TYPE.INFO
                      ? 'space-y-2 xs:space-y-3 2xs:space-y-4'
                      : 'space-y-2'
                  }
                >
                  <p className=" text-title font-semibold text-base xs:text-lg 2xs:text-xl font-mona !leading-[20px] xs:!leading-[22px] 2xs:!leading-[24px]">
                    {activeType === DEVICE_TYPE.BUY ? 'NEW DEVICE' : detailDeviceItem.current?.name}
                  </p>
                  {activeType !== DEVICE_TYPE.BUY && (
                    <div className="flex items-center space-x-6">
                      {/* {activeType === DEVICE_TYPE.INFO && (
                        <>
                          <div className="space-y-1">
                            <p className="text-title text-base font-semibold leading-[20px]">
                              16{' '}
                              <span className="text-xs font-normal text-white-50 -ml-0.5">
                                Available
                              </span>
                            </p>
                            <p className="text-primary text-base font-semibold leading-[20px]">
                              {detailDeviceItem.current?.equip}{' '}
                              <span className="text-xs font-normal text-white-50 -ml-0.5">
                                Equipped
                              </span>
                            </p>
                          </div>
                          <div className="w-[1px] h-9 bg-white/25"></div>
                        </>
                      )} */}
                      <div className={activeType === DEVICE_TYPE.INFO ? 'space-y-2' : 'space-y-3'}>
                        <div
                          className={
                            activeType === DEVICE_TYPE.INFO ? 'text-xs text-white-50' : 'text-title'
                          }
                        >
                          {activeType === DEVICE_TYPE.INFO ? 'TOTAL ' : ''}PROFIT:
                        </div>
                        <div
                          className={`flex items-center ${activeType === DEVICE_TYPE.INFO ? 'space-x-1' : 'space-x-2'}`}
                        >
                          <IconPoint
                            className={activeType === DEVICE_TYPE.INFO ? 'size-4' : 'size-7'}
                          />
                          <span
                            className={`text-primary font-semibold leading-[16px] ${activeType === DEVICE_TYPE.EDIT ? 'text-lg' : ''}`}
                          >
                            {activeType === DEVICE_TYPE.EDIT
                              ? `${formatNumber(currentDevice.current.totalMiningPower, 0, 2)}/h`
                              : detailDeviceItem.current?.miningPower
                                ? `${formatNumber(detailDeviceItem.current?.miningPower, 0, 2)}/h`
                                : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {activeType === DEVICE_TYPE.EDIT && (
                <div className="mb-10">
                  <CustomInput
                    label="Device Name:"
                    value={currentName.current}
                    placeholder="DEVICE MARS"
                    onValueChange={handleInputName}
                  />
                  {currentName.current.trim().length === 0 && (
                    <p className="text-xs text-error mt-1 font-semibold">
                      Device Name is required!
                    </p>
                  )}
                </div>
              )}
              {activeType === DEVICE_TYPE.BUY && (
                <div className="btn default mb-6 xs:mb-7 2xs:mb-8 cursor-default">
                  <div className="btn-border"></div>
                  <div className="btn-default !p-3 2xs:!p-4">
                    <div className="text-[13px] 2xs:text-sm space-y-2 2xs:space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">CPU</div>
                        <div className="text-title font-semibold font-geist">1 SLOT</div>
                      </div>
                      <div className="h-[1px] w-full bg-white/10"></div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">GPU</div>
                        <div className="text-title font-semibold font-geist">2 SLOT</div>
                      </div>
                      <div className="h-[1px] w-full bg-white/10"></div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">RAM</div>
                        <div className="text-title font-semibold font-geist">3 SLOT</div>
                      </div>
                      <div className="h-[1px] w-full bg-white/10"></div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-body">STORAGE</div>
                        <div className="text-title font-semibold font-geist">2 SLOT</div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
              )}
            </>
          ) : (
            <ChooseDevice
              setActiveItem={setActiveItem}
              type={equipType.current}
              activeItem={activeItem}
            />
          )}
          <div
            className={`btn z-[2] ${disableBtn ? 'inactive' : ''} ${activeType === DEVICE_TYPE.INFO ? 'error' : ''}`}
            onClick={handleConfirm}
          >
            <div className="btn-border"></div>
            <div
              className={`${disableBtn ? 'btn-inactive' : `btn-${activeType === DEVICE_TYPE.INFO ? 'error' : 'primary'}`}`}
            >
              {activeType === DEVICE_TYPE.INFO ? (
                'UNEQUIPPED'
              ) : activeType === DEVICE_TYPE.EQUIP ? (
                'CONFIRM'
              ) : activeType === DEVICE_TYPE.BUY ? (
                <div className="flex items-center justify-center space-x-4 text-green-900">
                  <p>BUY NOW</p>
                  <div className="w-[30px] h-[1px] bg-green-800"></div>
                  <div className="flex items-center space-x-1">
                    <IconPoint className="size-5" color />
                    <span className="font-geist">
                      {userConfig?.pointBuyDevice
                        ? formatNumber(userConfig?.pointBuyDevice, 0, 0)
                        : 0}
                    </span>
                  </div>
                </div>
              ) : (
                'SAVE'
              )}
            </div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
