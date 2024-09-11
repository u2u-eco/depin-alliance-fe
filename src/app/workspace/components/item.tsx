import CustomModal from '@/app/components/custom-modal'
import { IconFilter, IconPoint, IconSort } from '@/app/components/icons'
import { useDisclosure } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IDeviceTypeItem, IParamUseKey } from '@/interfaces/i.devices'
import Image from 'next/image'
import { formatNumber } from '@/helper/common'
import SellItem from './sell-item'
import { estimateUseKey, getUseKey, listUserItemDevice, sellItem } from '@/services/devices'
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
import AmountUseKey from './amount-use-key'

const ITEM_TYPE = {
  INFO: 'info',
  SELL: 'sell',
  SPECIAL: 'SPECIAL'
}

export default function Item() {
  const { getUserInfo, userInfo } = useCommonStore()
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const [scrollTrigger, isInView] = useInView()
  const paramUseKey = useRef<IParamUseKey | null>(null)
  const [totalPriceSell, setTotalPriceSell] = useState<number>(0)
  const [activeItem, setActiveItem] = useState<string>('')
  const specialItem = useRef<any>([])
  const [activeType, setActiveType] = useState(ITEM_TYPE.INFO)
  const [listDeviceItem, setListDeviceItem] = useState<IDeviceTypeItem[]>([])
  const dataList = useRef<IDeviceTypeItem[]>([])
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPE.SORT)
  const [loadingButton, setLoadingButton] = useState(false)
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
  const [useKey, setUseKey] = useState<number>(0)
  const { isLoading, refetch } = useQuery({
    queryKey: [
      'getUserItemDevice',
      filterOptions.sortAscending,
      filterOptions.sortBy,
      filterOptions.type,
      page
    ],
    queryFn: async () => {
      const res: any = await listUserItemDevice({ ...filterOptions, page })
      if (res.pagination?.totalPage) {
        maxPage.current = res.pagination?.totalPage
      }
      if (page !== res.pagination.page) return []
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
    console.log(currentItem.current.price)
    setTotalPriceSell((currentItem.current.price / 2) * amount)
  }

  const handleClick = (type: string) => {
    if (type === ITEM_TYPE.SELL) {
      setTotalPriceSell(currentItem.current.price)
    }
    setActiveType(type)
    onOpen()
  }

  const handleSell = async () => {
    setLoadingButton(true)
    if (loadingButton) return
    const res = await sellItem({ code: currentItem.current.code, number: amountSell.current })
    if (res.status) {
      toast.success('Sell item successfully!')
      refetch && refetch()
      getUserInfo()
      onClose()
      setLoadingButton(false)
    }
  }

  const handleSpecial = async () => {
    if (paramUseKey.current && !disableBtnSpecial) {
      specialItem.current = []
      if (userInfo && userInfo?.point < useKey) {
        toast.error('User point not enough!')
        return
      }
      onOpenSpecial()
      try {
        const res = await getUseKey(paramUseKey.current)
        if (res.status) {
          specialItem.current = res.data
          refetch && refetch()
          getUserInfo()
        }
        onClose()
      } catch (ex) {
        onClose()
      }
    }
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

  const updateAmountUseKey = async (amount: number) => {
    if (amount && currentItem?.current.code === 'CYBER_BOX') {
      paramUseKey.current = {
        amount,
        code: currentItem.current?.code
      }
      const res = await estimateUseKey(paramUseKey.current)

      if (res.status) {
        setUseKey(res.data)
      }
    }
  }

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView])

  useEffect(() => {
    if (refList.current) {
      refList.current?.scrollTo(0, 0)
    }
    setPage(1)
  }, [filterOptions])

  const isSpecial = currentItem.current?.type === ITEM_TYPE.SPECIAL
  const disableBtnSpecial =
    currentItem.current?.type === ITEM_TYPE.SPECIAL && currentItem.current?.code !== 'CYBER_BOX'
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-body text-base tracking-[-1px] uppercase">
            {filterOptions.type || 'ALL ITEMS'}
          </p>
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
              wrapper: 'h-[60vh] z-[1] left-[0] absolute bg-black/65 backdrop-blur-[4px]',
              icon: 'size-10 text-white'
            }}
          />
        )}
        {listDeviceItem?.length > 0 ? (
          <div
            className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-8 max-h-[49vh] overflow-y-auto hide-scrollbar"
            ref={refList}
          >
            {listDeviceItem?.map((item: any) => (
              <div
                key={item.code}
                className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${activeItem === item.code ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
              >
                <div
                  className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-white/10 after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'after:bg-[#143828]' : ''}`}
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
                link={
                  filterOptions.type === ITEM_TYPE.SPECIAL
                    ? undefined
                    : filterOptions.type
                      ? `/shop?type=${filterOptions.type}`
                      : '/shop'
                }
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
              <p>{isSpecial ? 'You own this item!' : ''} </p>
            ) : (
              <p>
                Are you sure you want to sell{' '}
                <span className="text-gradient">“{currentItem.current.name}”</span>
              </p>
            )}
          </div>
          {activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SELL ? (
            <>
              <div
                className={`space-x-4 flex items-center justify-center ${activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SPECIAL ? 'mt-6 xs:mt-8 2xs:mt-10 mb-10 xs:mb-12 2xs:mb-14' : 'my-6 xs:my-8'}`}
              >
                <div
                  className={`p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SPECIAL ? 'size-[90px] min-w-[90px]' : 'size-[110px] xs:size-[120px] 2xs:size-[130px] min-w-[110px] xs:min-w-[120px] 2xs:min-w-[130px]'}`}
                >
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                    src={
                      currentItem.current?.image?.length > 0
                        ? currentItem.current.image
                        : isSpecial
                          ? `/assets/images/workspace/item-special@2x.png`
                          : `/assets/images/upgrade/upgrade-${currentItem.current?.type?.toLowerCase()}@2x.png`
                    }
                    alt=""
                  />
                </div>
                <div
                  className={
                    activeType === ITEM_TYPE.INFO
                      ? 'space-y-2 xs:space-y-3 2xs:space-y-4'
                      : 'space-y-2'
                  }
                >
                  <p
                    className={`text-white font-semibold font-mona ${activeType === ITEM_TYPE.SELL ? 'text-2xl leading-[28px]' : 'text-lg leading-[22px]'}`}
                  >
                    {currentItem.current?.name}
                  </p>

                  <div className="flex items-center space-x-4 xs:space-x-5 2xs:space-x-6">
                    <div className="flex items-center space-x-1">
                      <p className="text-base text-title font-semibold leading-[20px]">
                        {currentItem.current?.totalItem}
                      </p>
                      <div className="text-xs text-white-50 tracking-[-1px] leading-[16px]">
                        {isSpecial ? 'In Total' : 'Available'}
                      </div>
                    </div>
                    {activeType === ITEM_TYPE.INFO && (
                      <>
                        <div className="w-[1px] h-9 bg-white/25"></div>
                        <div className="space-y-2">
                          <div className="text-xs text-white-50">
                            {isSpecial ? 'AMOUNT:' : 'TOTAL PROFIT:'}
                          </div>
                          {isSpecial ? (
                            <AmountUseKey
                              maxTotal={currentItem?.current.totalItem || 1}
                              updateAmountUseKey={updateAmountUseKey}
                            />
                          ) : (
                            <div className="flex items-center space-x-1">
                              <IconPoint className="size-4" />
                              <span className="text-primary font-semibold leading-[16px]">
                                {currentItem.current?.miningPower
                                  ? `${formatNumber(currentItem.current?.miningPower, 0, 2)}/h`
                                  : null}
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {activeType === ITEM_TYPE.SELL && (
                <SellItem item={currentItem.current} updateAmountSell={updateAmountSell} />
              )}
            </>
          ) : null}
          {activeType === ITEM_TYPE.SELL || (activeType === ITEM_TYPE.INFO && isSpecial) ? (
            <motion.div
              className={`btn z-[2] ${activeType === ITEM_TYPE.SELL ? 'error' : disableBtnSpecial ? 'inactive' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={isSpecial ? handleSpecial : handleSell}
            >
              <div className="btn-border"></div>
              <div
                className={`btn-${activeType === ITEM_TYPE.SELL ? 'error' : disableBtnSpecial ? 'default' : 'primary'}`}
              >
                <div
                  className={`flex items-center justify-center space-x-4 ${activeType === ITEM_TYPE.SELL ? 'text-title' : disableBtnSpecial ? 'text-inactive' : 'text-green-900'}`}
                >
                  <p>
                    {activeType === ITEM_TYPE.SELL
                      ? 'SELL'
                      : disableBtnSpecial
                        ? 'REDEEM (COMING SOON)'
                        : 'USE KEY'}
                  </p>
                  {!disableBtnSpecial ? (
                    <>
                      <div
                        className={`w-[30px] h-[1px] ${activeType === ITEM_TYPE.SELL || disableBtnSpecial ? 'bg-title' : 'bg-green-900'}`}
                      ></div>

                      <div className="flex items-center space-x-1">
                        <IconPoint className="size-5" color />
                        <span className="font-geist">
                          {isSpecial
                            ? useKey
                            : totalPriceSell && formatNumber(totalPriceSell, 0, 0)}
                        </span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="btn-border"></div>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-4">
              {(activeType !== ITEM_TYPE.INFO ||
                (activeType === ITEM_TYPE.INFO && currentItem.current?.isCanSell)) && (
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
              )}
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
        listItem={specialItem.current}
      />
    </>
  )
}
