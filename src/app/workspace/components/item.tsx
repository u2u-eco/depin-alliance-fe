import CustomModal from '@/app/components/custom-modal'
import { IconFilter, IconPoint, IconSort } from '@/app/components/icons'
import { useDisclosure } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import Image from 'next/image'
import { formatNumber } from '@/helper/common'
import SellItem from './sell-item'
import { listUserItemDevice, sellItem } from '@/services/devices'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { FILTER_TYPE, QUERY_CONFIG } from '@/constants'
import FilterSort from '@/app/components/filter-sort'
import NoItem from '@/app/components/ui/no-item'
import ImageDevice from '@/app/components/image-device'
import { useInView } from 'react-intersection-observer'
import useCommonStore from '@/stores/commonStore'
import Link from 'next/link'
import Loader from '@/app/components/ui/loader'
import OpenBox from './open-box'

const ITEM_TYPE = {
  INFO: 'info',
  SELL: 'sell',
  SPECIAL: 'special'
}

export default function Item() {
  const { getUserInfo } = useCommonStore()
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const [scrollTrigger, isInView] = useInView()
  const [totalPriceSell, setTotalPriceSell] = useState<number>(0)
  const [activeItem, setActiveItem] = useState<string>('')
  const [activeType, setActiveType] = useState(ITEM_TYPE.INFO)
  const [listDeviceItem, setListDeviceItem] = useState<IDeviceTypeItem[]>([])
  const dataList = useRef<IDeviceTypeItem[]>([])
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPE.SORT)
  const [filterOptions, setFilterOptions] = useState<{
    sortBy: string
    sortAscending: boolean
    type?: string
  }>({
    sortBy: 'price',
    sortAscending: true,
    type: ''
  })
  const refList = useRef<any>()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
    onOpenChange: onOpenChangeFilter
  } = useDisclosure()
  const {
    isOpen: isOpenSpecial,
    onOpen: onOpenSpecial,
    onClose: onCloseSpecial,
    onOpenChange: onOpenChangeSpecial
  } = useDisclosure()
  const currentItem = useRef<any>()
  const amountSell = useRef<number>(1)
  const { isLoading, refetch } = useQuery({
    queryKey: ['getUserItemDevice', filterOptions],
    queryFn: async () => {
      const res: any = await listUserItemDevice(filterOptions)
      if (res.pagination?.totalPage) {
        maxPage.current = res.pagination?.totalPage
      }
      let _listItem = res.data
      if (page > 1) {
        _listItem = [...dataList.current, ...res.data]
      }
      dataList.current = _listItem
      setListDeviceItem(_listItem)
      return res
    },
    ...QUERY_CONFIG
  })

  const handleInfo = (item: IDeviceTypeItem) => {
    currentItem.current = item
    setActiveType(ITEM_TYPE.INFO)
    onOpen()
  }

  const updateAmountSell = (amount: number) => {
    amountSell.current = amount
    setTotalPriceSell(currentItem.current.price * amount)
  }

  const handleClick = (type: string) => {
    if (type === ITEM_TYPE.SELL) {
      setTotalPriceSell(currentItem.current.price)
    }
    setActiveType(type)
    onOpen()
  }

  const handleSell = async () => {
    const res = await sellItem({ code: currentItem.current.code, number: amountSell.current })
    if (res.status) {
      toast.success('Sell item successfully!')
      refetch && refetch()
      getUserInfo()
      onClose()
    }
  }

  const handleSpecial = () => {
    console.log(111)
  }

  const handleOnClose = () => {
    amountSell.current = 1
    onClose()
  }

  const handleFilterSort = (type: string) => {
    setActiveFilter(type)
    onOpenFilter()
  }

  const handleClickSpecial = () => {
    onOpenSpecial()
  }

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView, page])

  useEffect(() => {
    if (refList.current) {
      refList.current?.scrollTo(0, 0)
    }
    setPage(1)
  }, [filterOptions])

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-body text-base tracking-[-1px] uppercase">{filterOptions.type || 'ALL ITEMS'}</p>
          <div className="flex items-center space-x-6">
            <div className="cursor-pointer" onClick={() => handleFilterSort(FILTER_TYPE.SORT)}>
              <IconSort
                className="size-[30px] text-green-800"
                gradient={activeFilter === FILTER_TYPE.SORT}
              />
            </div>
            <div className="cursor-pointer" onClick={() => handleFilterSort(FILTER_TYPE.FILTER)}>
              <IconFilter
                className="size-[30px] text-green-800"
                gradient={activeFilter === FILTER_TYPE.FILTER}
              />
            </div>
          </div>
        </div>
        {isLoading && (
          <Loader
            classNames={{
              wrapper: 'h-[60vh] z-[1] left-[0] absolute bg-black/30',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
        {!isLoading && listDeviceItem?.length > 0 ? (
          <div
            className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-8 max-h-[60vh] overflow-y-auto hide-scrollbar"
            ref={refList}
          >
            {listDeviceItem?.map((item: any) => (
              <div
                key={item.code}
                className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${activeItem === item.code ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
              >
                <div
                  className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#143828] after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)] before:border-l-green-500 before:border-t-green-500' : ''}`}
                  onClick={() => handleInfo(item)}
                >
                  <ImageDevice
                    className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                    image={item.image}
                    type={item.type}
                  />

                  <p className="font-mona font-semibold text-white mt-3 mb-1 text-xs xs:text-[13px] 2xs:text-sm leading-[15px] xs:leading-[16px] min-h-[30px] xs:min-h-[32px]">
                    {item.name}
                  </p>
                  <p className="text-green-500">x{item.totalItem || 1}</p>
                </div>
              </div>
            ))}
            <div ref={scrollTrigger} className="text-[transparent]">
              Loading...
            </div>
          </div>
        ) : (
          <>
            {!isLoading && (
              <NoItem
                title="No item"
                classNames={{
                  icon: 'text-body'
                }}
              />
            )}
          </>
        )}
      </div>
      <CustomModal
        title={activeType === ITEM_TYPE.SELL ? 'SELL ITEM' : 'ITEM Info'}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleOnClose}
        onOpenChange={onOpenChange}
      >
        <div className="relative w-full">
          <div className=" text-body text-base tracking-[-1px] text-center">
            {activeType === ITEM_TYPE.INFO ? (
              <p>You are equipping this item!</p>
            ) : activeType === ITEM_TYPE.SPECIAL ? (
              <p>You own this item!</p>
            ) : (
              <p>
                Are you sure you want to sell{' '}
                <span className="text-gradient">“{currentItem.current.name}”</span>
              </p>
            )}
          </div>
          {activeType === ITEM_TYPE.INFO ||
          activeType === ITEM_TYPE.SELL ||
          activeType === ITEM_TYPE.SPECIAL ? (
            <>
              <div
                className={`space-x-4 flex items-center justify-center ${activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SPECIAL ? 'mt-10 mb-14' : 'my-8'}`}
              >
                <div
                  className={`p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SPECIAL ? 'size-[90px] min-w-[90px]' : 'size-[130px] min-w-[130px]'}`}
                >
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                    src={
                      currentItem.current?.image?.length > 0
                        ? currentItem.current.image
                        : activeType === ITEM_TYPE.SPECIAL
                          ? `/assets/images/workspace/item-special@2x.png`
                          : `/assets/images/upgrade/upgrade-ram-2gb@2x.png`
                    }
                    // srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x. /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x"
                    alt=""
                  />
                </div>
                <div className={activeType === ITEM_TYPE.INFO ? 'space-y-4' : 'space-y-2'}>
                  <p
                    className={`text-white font-semibold font-mona ${activeType === ITEM_TYPE.SELL ? 'text-2xl leading-[28px]' : 'text-lg leading-[22px]'}`}
                  >
                    {currentItem.current?.name}
                  </p>
                  {activeType === ITEM_TYPE.SPECIAL ? (
                    <p className="text-title text-base font-semibold leading-[20px]">
                      {currentItem.current?.totalItem}{' '}
                      <span className="text-xs font-normal text-white-50 -ml-0.5">In Total</span>
                    </p>
                  ) : (
                    <div className="flex items-center space-x-6">
                      <div className="space-y-2">
                        <div className="text-xs text-white-50">PROFIT:</div>
                        <div className="flex items-center space-x-1">
                          <IconPoint className="size-4" />
                          <span className="text-primary font-semibold leading-[16px]">
                            {currentItem.current?.miningPower
                              ? `${formatNumber(currentItem.current?.miningPower * currentItem.current.totalItem, 0, 0)}/h`
                              : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {activeType === ITEM_TYPE.SELL && (
                <SellItem item={currentItem.current} updateAmountSell={updateAmountSell} />
              )}
            </>
          ) : null}
          {activeType === ITEM_TYPE.SELL || activeType === ITEM_TYPE.SPECIAL ? (
            <motion.div
              className={`btn z-[2] ${activeType === ITEM_TYPE.SELL ? 'error' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={activeType === ITEM_TYPE.SELL ? handleSell : handleSpecial}
            >
              <div className="btn-border"></div>
              <div className={`btn-${activeType === ITEM_TYPE.SELL ? 'error' : 'primary'}`}>
                <div
                  className={`flex items-center justify-center space-x-4 ${activeType === ITEM_TYPE.SELL ? 'text-title' : 'text-green-900'}`}
                >
                  <p>{activeType === ITEM_TYPE.SELL ? 'SELL' : 'USE KEY'}</p>
                  <div
                    className={`w-[30px] h-[1px] ${activeType === ITEM_TYPE.SELL ? 'bg-title' : 'bg-green-900'}`}
                  ></div>
                  <div className="flex items-center space-x-1">
                    <IconPoint className="size-5" color />
                    <span className="font-geist">
                      {totalPriceSell && formatNumber(totalPriceSell, 0, 0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="btn-border"></div>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-4">
              <div
                className={`btn ${activeType === ITEM_TYPE.INFO ? 'error' : 'default'}`}
                onClick={() =>
                  activeType === ITEM_TYPE.INFO ? handleClick(ITEM_TYPE.SELL) : onClose()
                }
              >
                <div className="btn-border"></div>
                <div className={`btn btn-${activeType === ITEM_TYPE.INFO ? 'error' : 'default'}`}>
                  {activeType === ITEM_TYPE.INFO ? 'Sell' : 'Reset'}
                </div>
                <div className="btn-border"></div>
              </div>
              <Link href="/shop" className="btn">
                <div className="btn-border"></div>
                <div className="btn-primary">
                  {activeType === ITEM_TYPE.INFO ? 'Buy' : 'Confirm'}
                </div>
                <div className="btn-border"></div>
              </Link>
            </div>
          )}
        </div>
      </CustomModal>
      <FilterSort
        isOpen={isOpenFilter}
        onOpen={onOpenFilter}
        onOpenChange={onOpenChangeFilter}
        onClose={onCloseFilter}
        type={activeFilter}
        cb={setFilterOptions}
      />
      <OpenBox
        isOpen={isOpenSpecial}
        onOpen={onOpenSpecial}
        onOpenChange={onOpenChangeSpecial}
        onClose={onCloseSpecial}
      />
    </>
  )
}
