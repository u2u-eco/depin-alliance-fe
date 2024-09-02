import CustomInput from '@/app/components/custom-input'
import CustomModal from '@/app/components/custom-modal'
import { IconChevron, IconEdit, IconPoint } from '@/app/components/icons'
import { QUERY_CONFIG } from '@/constants'
import { IDeviceDetailInfo, IDeviceTypeItem, IUserDeviceItem } from '@/interfaces/i.devices'
import { addItem, getListDevice, getUserDevice, removeItem } from '@/services/devices'
import useCommonStore from '@/stores/commonStore'
import { Accordion, AccordionItem, useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import DeviceItem from './device-item'
import { formatNumber } from '@/helper/common'
import { toast } from 'sonner'
import Link from 'next/link'
import ImageDevice from '@/app/components/image-device'
import NoItem from '@/app/components/no-item'

const DEVICE_TYPE = {
  INFO: 'info',
  EDIT: 'edit',
  EQUIP: 'equip'
}

interface IDevice {
  listItemEquipByType: any
  refetch: () => void
}

export default function Device({ listItemEquipByType, refetch }: IDevice) {
  const token = useCommonStore((state) => state.token)
  const [activeType, setActiveType] = useState(DEVICE_TYPE.INFO)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeItem, setActiveItem] = useState<number>(0)
  const deviceItemDetail = useRef<{ [key: number]: Array<IDeviceTypeItem> }>({})
  const detailDeviceItem = useRef<any>()
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)
  const countInfoDevice = useRef<any>({})
  const [listDeviceItemByFilter, setListDeviceItemByFilter] = useState<IDeviceTypeItem[]>([])
  const currentIndex = useRef<number>(0)
  const equipType = useRef<string>('')
  const { data: listDevice } = useQuery({
    queryKey: ['fetchListDevice'],
    queryFn: getListDevice,
    ...QUERY_CONFIG,
    enabled: Boolean(token)
  })

  const getDeviceItemDetail = async (index: number) => {
    currentIndex.current = index
    try {
      setIsLoadingDetail(true)
      const res = await getUserDevice(index)
      if (res.status) {
        deviceItemDetail.current[index] = res.data
      }
      setIsLoadingDetail(false)
    } catch (ex) {
      setIsLoadingDetail(false)
    }
  }

  const handleAddItem = async () => {
    const res = await addItem(currentIndex.current, activeItem)
    if (res.status) {
      toast.success('Equip item successfully!')
      setActiveItem(0)
      refetch()
      getDeviceItemDetail(currentIndex.current)
      onClose()
    }
  }

  const handleRemoveItem = async () => {
    const res = await removeItem(detailDeviceItem.current.id)
    if (res.status) {
      toast.success('Unequipped successfully!')
      refetch()
      getDeviceItemDetail(currentIndex.current)
      onClose()
    }
  }

  const handleConfirm = () => {
    switch (activeType) {
      case DEVICE_TYPE.EQUIP:
        if (activeItem) {
          handleAddItem()
          return
        }
        break
      case DEVICE_TYPE.INFO:
        handleRemoveItem()
        return
    }
  }

  const handleClickItem = (index: number) => {
    if (!deviceItemDetail.current[index]) {
      getDeviceItemDetail(index)
    }
  }

  const handleClick = (type: string) => {
    setActiveType(type)
    onOpen()
  }

  const handleEquip = (type: string) => {
    equipType.current = type
    // listItemEquip.current = listItemEquipByType.current[type]
    filterDevice(listItemEquipByType.current[type])
    setActiveType(DEVICE_TYPE.EQUIP)
    onOpen()
  }

  const handleInfo = (item: IDeviceTypeItem, info: IDeviceDetailInfo) => {
    detailDeviceItem.current = { ...item, ...info }
    setActiveType(DEVICE_TYPE.INFO)
    onOpen()
  }

  const filterDevice = (list: Array<IDeviceTypeItem>) => {
    countInfoDevice.current = {}
    const listDeviceItemByFilter = list
      ? list.filter((device: IDeviceTypeItem) => {
          if (!countInfoDevice.current[device.code]) {
            countInfoDevice.current[device.code] = {
              amount: 1,
              totalProfit: device.miningPower
            }
            return true
          } else {
            countInfoDevice.current[device.code].amount += 1
            countInfoDevice.current[device.code].totalProfit += device.miningPower
            return false
          }
        })
      : []

    setListDeviceItemByFilter([...listDeviceItemByFilter])
  }

  const handleClose = () => {
    onClose()
    setActiveItem(0)
  }

  const disableBtn = activeType === DEVICE_TYPE.EQUIP && !activeItem ? true : false

  return (
    <>
      <div className="space-y-10">
        <Accordion
          showDivider={false}
          className="p-0"
          itemClasses={{
            trigger:
              "relative [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:bg-item-default before:opacity-20 p-2 data-[open=true]:bg-green-500 data-[open=true]:before:bg-item-accordion data-[open=true]:before:opacity-100",
            indicator: 'data-[open=true]:-rotate-180 mr-2'
          }}
        >
          {listDevice?.data.map((item: IUserDeviceItem) => (
            <AccordionItem
              key={item.index}
              onPress={() => {
                handleClickItem(item.index)
              }}
              startContent={
                <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%' }}
                    src="/assets/images/workspace/device-image-01@2x.png"
                    alt=""
                  />
                </div>
              }
              title={
                <div className="flex items-center space-x-1">
                  <p className="font-mona text-white font-semibold text-lg leading-[22px]">
                    {item.name}
                  </p>
                  <div onClick={() => handleClick(DEVICE_TYPE.EDIT)}>
                    <IconEdit className="text-[#888888] size-6 cursor-pointer" />
                  </div>
                </div>
              }
              subtitle={
                <div className="flex items-center space-x-1 mt-3">
                  <IconPoint className="size-4" />
                  <p className="text-green-500 font-semibold leading-[16px]">10,000/h</p>
                </div>
              }
              indicator={<IconChevron className="size-8" gradient />}
            >
              <DeviceItem
                isLoading={isLoadingDetail}
                item={deviceItemDetail.current[item.index]}
                handleEquip={handleEquip}
                handleInfo={handleInfo}
              />
            </AccordionItem>
          ))}
        </Accordion>
        <Link href="/shop" className="btn">
          <div className="btn-border"></div>
          <div className="btn-primary">buy more device</div>
          <div className="btn-border"></div>
        </Link>
      </div>

      <CustomModal
        title={
          activeType === DEVICE_TYPE.INFO
            ? 'ITEM Info'
            : activeType === DEVICE_TYPE.EQUIP
              ? 'equip item'
              : 'DEVICE NAME'
        }
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div className="relative w-full">
          <div className="absolute bottom-[60px] left-0 right-0 w-full h-[50px] bg-[linear-gradient(to_bottom,rgba(3,9,5,0)0%,rgba(3,9,5,1)_60%)] z-[1]"></div>
          {activeType !== DEVICE_TYPE.EDIT && (
            <div className=" text-body text-base tracking-[-1px] text-center">
              {activeType === DEVICE_TYPE.INFO ? (
                <p>You are equipping this item!</p>
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
                className={`space-x-4 flex items-center justify-center ${activeType === DEVICE_TYPE.INFO ? 'mt-10 mb-14' : 'my-8'}`}
              >
                <div
                  className={`p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${activeType === DEVICE_TYPE.INFO ? 'size-[90px] min-w-[90px]' : 'size-[130px] min-w-[130px]'}`}
                >
                  <ImageDevice
                    image={detailDeviceItem.current?.image}
                    type={detailDeviceItem.current?.type?.toLowerCase()}
                    className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                  />
                </div>
                <div className={activeType === DEVICE_TYPE.INFO ? 'space-y-4' : 'space-y-2'}>
                  <p className=" text-title font-semibold text-xl font-mona leading-[22px]">
                    {detailDeviceItem.current?.name}
                  </p>
                  <div className="flex items-center space-x-6">
                    {activeType === DEVICE_TYPE.INFO && (
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
                    )}
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
                          {detailDeviceItem.current?.totalProfit
                            ? `${formatNumber(detailDeviceItem.current?.totalProfit, 0, 0)}/h`
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {activeType === DEVICE_TYPE.EDIT && (
                <div className="mb-10">
                  <CustomInput label="Device Name:" placeholder="DEVICE MARS" />
                </div>
              )}
            </>
          ) : (
            <div className="max-h-[450px] overflow-y-auto hide-scrollbar mt-8 mb-6">
              {listDeviceItemByFilter?.length === 0 ? (
                <NoItem />
              ) : (
                <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-8">
                  {listDeviceItemByFilter?.map((item: IDeviceTypeItem, index: number) => (
                    <div
                      key={index}
                      className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${activeItem === item.id ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
                    >
                      <div
                        className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#143828] after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)] before:border-l-green-500 before:border-t-green-500' : ''}`}
                        onClick={() => setActiveItem(item.id)}
                      >
                        <ImageDevice
                          image={item.image}
                          type={item.type?.toLowerCase()}
                          className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                        />
                        <p className="font-mona font-semibold text-white mt-3 mb-1 leading-[16px]">
                          {item.name}
                        </p>
                        <p className="text-green-500">
                          x{countInfoDevice.current[item.code]?.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div
            className={`btn z-[2] ${disableBtn ? 'default' : ''} ${activeType === DEVICE_TYPE.INFO ? 'error' : ''}`}
            onClick={handleConfirm}
          >
            <div className="btn-border"></div>
            <div
              className={`${disableBtn ? 'btn-default' : `btn-${activeType === DEVICE_TYPE.INFO ? 'error' : 'primary'}`}`}
            >
              {activeType === DEVICE_TYPE.INFO
                ? 'UNEQUIPPED'
                : activeType === DEVICE_TYPE.EQUIP
                  ? 'CONFIRM'
                  : 'SAVE'}
            </div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
