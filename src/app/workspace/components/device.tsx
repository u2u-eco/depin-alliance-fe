'use client'

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
  removeItem,
  swapDevice
} from '@/services/devices'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import DeviceItem from './device-item'
import { formatNumber } from '@/helper/common'
import { toast } from 'sonner'
import ImageDevice from '@/app/components/image-device'
import ChooseDevice from './choose-device'
import AccordionItem from '@/app/components/accordion-item'
import CustomToast from '@/app/components/ui/custom-toast'
import Loader from '@/app/components/ui/loader'
import CustomButton from '@/app/components/button'
import { useAppSound } from '@/hooks/useAppSound'
import EditDeviceName from './edit-device-name'
import { useTourGuideContext } from '@/contexts/tour.guide.context'

const DEVICE_TYPE = {
  INFO: 'info',
  EDIT: 'edit',
  EQUIP: 'equip',
  BUY: 'buy',
  SWAP: 'swap'
}
interface IDevice {
  height: number
}
export default function Device({ height }: IDevice) {
  const { userConfig, getUserConfig, getUserInfo } = useCommonStore()
  const [activeType, setActiveType] = useState(DEVICE_TYPE.INFO)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeItem, setActiveItem] = useState<number>(0)
  const deviceItemDetail = useRef<{ [key: number]: Array<IDeviceTypeItem> }>({})
  const detailDeviceItem = useRef<any>()
  const currentDevice = useRef<any>()
  const [expanded, setExpanded] = useState<number | false>(false)
  const { dropdownOpen, dropdownClose, buttonSound } = useAppSound()
  const [emptyName, setEmptyName] = useState<boolean>(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const { state: tourState, setState, helpers } = useTourGuideContext()

  const currentName = useRef<string>('')
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)
  const currentIndex = useRef<number>(0)
  const equipType = useRef<string>('')
  const {
    data: listDevice,
    isLoading,
    refetch: refetchListDevice
  } = useQuery({
    queryKey: ['fetchListDevice'],
    queryFn: getListDevice,
    ...QUERY_CONFIG
  })

  const getDeviceItemDetail = async (index: number) => {
    currentIndex.current = index
    try {
      setIsLoadingDetail(true)
      const res = await getUserDevice({ index })
      if (res.status) {
        deviceItemDetail.current[index] = res.data

        if (!tourState.run && tourState.tourActive) {
          handleEquip(res.data?.[0].type)
        }
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
        toast.dismiss()
        toast.success(<CustomToast type="success" title="Equip item successfully!" />)
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
        toast.dismiss()
        toast.success(<CustomToast type="success" title="Unequipped successfully!" />)
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
          toast.dismiss()
          toast.success(<CustomToast type="success" title="Device name changed successfully!" />)
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

  const handleSwapItem = async () => {
    const res = await swapDevice(detailDeviceItem.current.id, activeItem)
    if (res.status) {
      refetchListDevice()
      setActiveItem(0)
      getDeviceItemDetail(currentIndex.current)
      toast.dismiss()
      toast.success(<CustomToast type="success" title="Swap item successfully" />)
      onClose()
    }
  }

  const handleConfirm = () => {
    if (loadingButton) return
    buttonSound.play()
    switch (activeType) {
      case DEVICE_TYPE.EQUIP:
        if (activeItem) {
          handleAddItem()
          if (tourState.tourActive) {
            helpers?.next()
          }
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
      case DEVICE_TYPE.SWAP:
        handleSwapItem()
        break
    }
  }

  const handleSwap = () => {
    buttonSound.play()
    equipType.current = detailDeviceItem.current.type
    setActiveType(DEVICE_TYPE.SWAP)
  }

  const handleClickItem = (index: number) => {
    if (!deviceItemDetail.current[index]) {
      const _index = tourState.tourActive ? 0 : index
      getDeviceItemDetail(_index)
    } else {
      if (tourState.tourActive) {
        handleEquip(detailDeviceItem.current[index][0].type)
      }
    }
    currentIndex.current = index
    if (tourState.tourActive) {
      helpers?.next()
    }
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
    if (tourState.tourActive && tourState.stepIndex !== 13) {
      setTimeout(() => {
        helpers?.next()
      }, 500)
    }
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

  const handleSelectItem = (index: number) => {
    buttonSound.play()
    setActiveItem(index)
    if (tourState.run && tourState.tourActive) {
      helpers?.next()
    }
  }

  const handleAddNewDevice = async () => {
    setLoadingButton(true)
    const res = await getNewDevice()
    try {
      if (res.status) {
        toast.success(<CustomToast type="success" title="Buy device successfully!" />)
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

  const handleExpanded = (index: number | false) => {
    if (index) {
      dropdownOpen.play()
    } else {
      dropdownClose.play()
    }
    setExpanded(index)
    if (tourState.run && tourState.tourActive) {
      setState({
        stepIndex: tourState.stepIndex + 1
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (tourState.tourActive && !tourState.run) {
        if (tourState.stepIndex < 7) {
          setState({
            run: true,
            stepIndex: tourState.stepIndex + 1
          })
        }
      }
    }, 500)
    if (tourState.stepIndex === 7 && !tourState.run) {
      // handleClickItem(1)
      setExpanded(1)
      setTimeout(() => {
        setState({
          run: true,
          stepIndex: tourState.stepIndex + 1
        })
      })
    }

    if (tourState.stepIndex === 13 && !tourState.run) {
      handleClickItem(1)
      setExpanded(1)
    }
  }, [tourState, setState])

  const disableBtn =
    (activeType === DEVICE_TYPE.EQUIP || activeType === DEVICE_TYPE.SWAP) && !activeItem
      ? true
      : false
  return (
    <>
      <div
        className="flex flex-col h-full  overflow-x-hidden overflow-y-auto no-scrollbar"
        style={{ height: height }}
      >
        {isLoading && (
          <Loader
            classNames={{
              wrapper: 'z-[1] min-h-[300px] left-[0] absolute  top-0',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
        <div className="space-y-4">
          {listDevice?.data.map((item: IUserDeviceItem, index: number) => {
            return (
              <AccordionItem
                className={`device-${index}`}
                key={item.index}
                index={item.index}
                item={item}
                expanded={expanded}
                setExpanded={handleExpanded}
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
          <div className="mt-6">
            <CustomButton title="buy more device" onAction={() => handleClick(DEVICE_TYPE.BUY)} />
          </div>
        )}
      </div>

      <CustomModal
        id="item-modal"
        title={
          activeType === DEVICE_TYPE.INFO
            ? 'ITEM Info'
            : activeType === DEVICE_TYPE.EQUIP
              ? 'equip item'
              : activeType === DEVICE_TYPE.BUY
                ? 'Buy Device'
                : activeType === DEVICE_TYPE.SWAP
                  ? 'Swap Item'
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
                  Select 01 <span className="text-gradient">“{equipType.current}”</span> to{' '}
                  {activeType === DEVICE_TYPE.SWAP ? 'swap' : 'equip'}
                </p>
              )}
            </div>
          )}
          {activeType !== DEVICE_TYPE.EQUIP && activeType !== DEVICE_TYPE.SWAP ? (
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
                          ? '/assets/images/workspace/device-image-01@2x.png'
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
                <EditDeviceName
                  defaultName={currentName.current}
                  handleInputName={handleInputName}
                />
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
              setActiveItem={handleSelectItem}
              type={equipType.current}
              activeItem={activeItem}
            />
          )}
          {/* Button */}
          {activeType === DEVICE_TYPE.INFO ? (
            <div className="flex justify-between space-x-3 xs:space-x-4">
              <div className="btn error z-[2]" onClick={handleConfirm}>
                <div className="btn-border"></div>
                <div className="btn-error">UNEQUIPPED</div>
                <div className="btn-border"></div>
              </div>
              <div className="btn z-[2]" onClick={handleSwap}>
                <div className="btn-border"></div>
                <div className="btn-primary">SWAP</div>
                <div className="btn-border"></div>
              </div>
            </div>
          ) : (
            <div
              id="jsConfirm"
              className={`btn z-[2] ${disableBtn ? 'inactive' : ''}`}
              onClick={handleConfirm}
            >
              <div className="btn-border"></div>
              <div className={`btn-${disableBtn ? 'inactive' : 'primary'}`}>
                {activeType === DEVICE_TYPE.EQUIP || activeType === DEVICE_TYPE.SWAP ? (
                  'CONFIRM'
                ) : activeType === DEVICE_TYPE.BUY ? (
                  <div className="flex  items-center justify-center space-x-4 text-green-900">
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
          )}
        </div>
      </CustomModal>
    </>
  )
}
