import CustomModal from '@/app/components/custom-modal'
import { IconCheckCircle, IconFilter, IconPoint, IconSort } from '@/app/components/icons'
import { useDisclosure } from '@nextui-org/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { useInView } from 'react-intersection-observer'
import useCommonStore from '@/stores/commonStore'
import Loader from '@/app/components/ui/loader'
import OpenBox from './open-box'
import AmountUseKey from './amount-use-key'
import CustomToast from '@/app/components/ui/custom-toast'
import { WORKSPACE_TYPE, WorkspaceContext } from '../context/workspace-context'
import { useAppSound } from '@/hooks/useAppSound'
import ListUserItem from '@/app/components/list-user-item'

const ITEM_TYPE = {
  INFO: 'info',
  SELL: 'sell',
  SPECIAL: 'SPECIAL'
}

const PAGE_SIZE = 12
interface IItem {
  height: number
}
export default function Item({ height }: IItem) {
  const { getUserInfo, userInfo, safeAreaBottom } = useCommonStore()
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const [scrollTrigger, isInView] = useInView()
  const paramUseKey = useRef<IParamUseKey | null>(null)
  const [totalPriceSell, setTotalPriceSell] = useState<number>(0)
  const [activeItem, setActiveItem] = useState<string>('')
  const [specialItem, setSpecialItem] = useState<any>([])
  const [activeType, setActiveType] = useState(ITEM_TYPE.INFO)
  const [listDeviceItem, setListDeviceItem] = useState<IDeviceTypeItem[]>([])
  const dataList = useRef<IDeviceTypeItem[]>([])
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPE.SORT)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const currentIndex = useRef<number>(0)
  const isUpdatePage = useRef<boolean>(false)
  const [filterOptions, setFilterOptions] = useState<{
    sortBy: string
    sortAscending: boolean
    type?: string
  }>({
    sortBy: 'price',
    sortAscending: true,
    type: ''
  })
  const { buttonSound, specialSound } = useAppSound()

  const refList = useRef<any>()
  const refListScroll = useRef<any>()
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
  const { setTypeItemShop, setActiveTab } = useContext(WorkspaceContext)
  const [useKey, setUseKey] = useState<number>(0)
  const { refetch } = useQuery({
    queryKey: [
      'getUserItemDevice',
      filterOptions.sortAscending,
      filterOptions.sortBy,
      filterOptions.type,
      page
    ],
    queryFn: async () => {
      try {
        if (isUpdatePage.current) return
        setIsLoading(true)
        const res: any = await listUserItemDevice({ ...filterOptions, page, size: PAGE_SIZE })
        if (res.pagination?.totalPage) {
          maxPage.current = res.pagination?.totalPage
        }
        if (page !== res.pagination.page) {
          setIsLoading(false)
          return []
        }
        let _listItem = res.data
        if (page > 1) {
          _listItem = [...dataList.current, ...res.data]
        }
        dataList.current = [..._listItem]
        setListDeviceItem(dataList.current)
        setIsLoading(false)
        return res
      } catch (ex) {
        setIsLoading(false)
      }
    },
    ...QUERY_CONFIG
  })

  const handleInfo = (item: IDeviceTypeItem, index: number) => {
    buttonSound.play()
    currentIndex.current = index
    currentItem.current = item
    setActiveType(ITEM_TYPE.INFO)
    onOpen()
  }

  const updateAmountSell = (amount: number) => {
    amountSell.current = amount
    setTotalPriceSell((currentItem.current.price / 2) * amount)
  }

  const handleClick = (type: string) => {
    if (type === ITEM_TYPE.SELL) {
      setTotalPriceSell(currentItem.current.price)
    }
    setActiveType(type)
    onOpen()
  }

  const handleUpdateData = async () => {
    setIsLoading(true)
    isUpdatePage.current = true
    const currentPage = Math.floor(currentIndex.current / PAGE_SIZE)
    setPage(currentPage + 1)
    const res: any = await listUserItemDevice({
      ...filterOptions,
      page: currentPage + 1,
      size: PAGE_SIZE
    })

    if (res.status) {
      dataList.current.splice(currentPage * PAGE_SIZE, dataList?.current?.length, ...res.data)
      setListDeviceItem([...dataList.current])
    }
    isUpdatePage.current = false
    setIsLoading(false)
  }

  const handleSell = async () => {
    setLoadingButton(true)
    if (loadingButton) return
    try {
      const res = await sellItem({ code: currentItem.current.code, number: amountSell.current })
      if (res.status) {
        toast.dismiss()
        toast.success(
          <CustomToast type="success" title="Sell successfully!" point={totalPriceSell} />
        )
        handleUpdateData()
        getUserInfo()
        onClose()
      }
      setLoadingButton(false)
    } catch (ex) {
      setLoadingButton(false)
    }
  }

  const handleSpecial = async () => {
    if (paramUseKey.current && !disableBtnSpecial) {
      setSpecialItem([])
      if (userInfo && userInfo?.point < useKey) {
        toast.error(<CustomToast type="error" title="User point not enough!" />)
        return
      }
      specialSound.play()
      onOpenSpecial()
      try {
        const res = await getUseKey(paramUseKey.current)
        if (res.status) {
          setTimeout(() => {
            setSpecialItem([...res.data])
          }, 2000)
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
    buttonSound.play()
    setActiveFilter(type)
    onOpenFilter()
  }

  const handleClickSpecial = () => {
    onOpenSpecial()
  }

  const handleLinkBuy = () => {
    buttonSound.play()
    setTypeItemShop(filterOptions.type || null)
    setActiveTab(WORKSPACE_TYPE.SHOP)
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
    if (refListScroll.current) {
      refListScroll.current?.scrollTo(0, 0)
    }
    setPage(1)
  }, [filterOptions])

  const isSpecial = currentItem.current?.type === ITEM_TYPE.SPECIAL
  const disableBtnSpecial =
    currentItem.current?.type === ITEM_TYPE.SPECIAL && currentItem.current?.code !== 'CYBER_BOX'

  const handleSellAndUseKey = () => {
    if (!disableBtnSpecial) {
      buttonSound.play()
    }
    if (isSpecial) {
      handleSpecial()
    } else {
      handleSell()
    }
  }
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-body text-base tracking-[-1px] uppercase">
            {filterOptions.type || 'ALL ITEMS'}
          </p>
          <div className="flex items-center space-x-4 xs:space-x-5 2xs:space-x-6">
            <div className="cursor-pointer" onClick={() => handleFilterSort(FILTER_TYPE.SORT)}>
              <IconSort
                className="size-6 xs:size-7 2xs:size-8 text-green-800"
                gradient={activeFilter === FILTER_TYPE.SORT}
              />
            </div>
            <div className="cursor-pointer" onClick={() => handleFilterSort(FILTER_TYPE.FILTER)}>
              <IconFilter
                className="size-6 xs:size-7 2xs:size-8 text-green-800"
                gradient={activeFilter === FILTER_TYPE.FILTER}
              />
            </div>
          </div>
        </div>
        <div className="relative mt-8" ref={refList} style={{ minHeight: height - 30 }}>
          <div className=" absolute"></div>
          <div
            ref={refListScroll}
            className="!overflow-y-auto no-scrollbar"
            style={{ maxHeight: height - 40, paddingBottom: safeAreaBottom }}
          >
            <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 ">
              <ListUserItem
                activeItem={activeItem}
                handleClick={handleInfo}
                listData={listDeviceItem}
              />
              <div ref={scrollTrigger} className="text-[transparent]">
                Loading...
              </div>
            </div>
          </div>
          {listDeviceItem?.length === 0 && !isLoading ? (
            <NoItem
              title="No item"
              textLink="Buy now"
              action={filterOptions.type === ITEM_TYPE.SPECIAL ? undefined : handleLinkBuy}
              classNames={{
                icon: 'text-body'
              }}
            />
          ) : null}
          {isLoading && (
            <Loader
              classNames={{
                wrapper: 'top-0  z-[1] left-[0] absolute bg-black/30 backdrop-blur-[4px]',
                icon: 'size-10 text-white'
              }}
            />
          )}
        </div>
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
                className={`space-x-3 xs:space-x-4 flex items-center justify-center ${activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SPECIAL ? 'mt-6 xs:mt-8 2xs:mt-10 mb-8 xs:mb-10 2xs:mb-12' : 'my-6 xs:my-8'}`}
              >
                <div
                  className={`p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${activeType === ITEM_TYPE.INFO || activeType === ITEM_TYPE.SPECIAL ? `${isSpecial ? '!bg-transparent' : ''} size-[80px] xs:size-[85px] 2xs:size-[90px] min-w-[80px] xs:min-w-[85px] 2xs:min-w-[90px]` : 'size-[100px] xs:size-[115px] 2xs:size-[130px] min-w-[100px] xs:min-w-[115px] 2xs:min-w-[130px]'}`}
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
                  className={activeType === ITEM_TYPE.INFO ? 'space-y-2 xs:space-y-3' : 'space-y-2'}
                >
                  <p
                    className={`text-white font-semibold font-mona ${activeType === ITEM_TYPE.SELL ? 'text-base xs:text-xl 2xs:text-2xl !leading-[20px] xs:!leading-[24px] 2xs:!leading-[28px]' : 'text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px]'}`}
                  >
                    {currentItem.current?.name}
                  </p>

                  <div className="flex items-center space-x-2.5 xs:space-x-4 2xs:space-x-6">
                    <div className="flex items-center space-x-1">
                      <p className="text-[15px] xs:text-base text-title font-semibold !leading-[20px]">
                        {currentItem.current?.totalItem}
                      </p>
                      <div className="text-xs text-white-50 tracking-[-1px] leading-[16px]">
                        {isSpecial ? 'In Total' : 'Available'}
                      </div>
                    </div>
                    {activeType === ITEM_TYPE.INFO && (
                      <>
                        <div className="w-[1px] h-8 xs:h-9 bg-white/25"></div>
                        <div className="space-y-1.5 xs:space-y-2">
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
                                  ? `${formatNumber(currentItem.current?.miningPower * currentItem.current?.totalItem, 0, 2)}/h`
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
            <div
              className={`btn z-[2] ${activeType === ITEM_TYPE.SELL ? 'error' : disableBtnSpecial ? 'inactive' : ''}`}
              onClick={handleSellAndUseKey}
            >
              <div className="btn-border"></div>
              <div
                className={`btn-${activeType === ITEM_TYPE.SELL ? 'error' : disableBtnSpecial ? 'default' : 'primary'} !px-3`}
              >
                <div
                  className={`flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4 ${activeType === ITEM_TYPE.SELL ? 'text-title' : disableBtnSpecial ? 'text-inactive' : 'text-green-900'}`}
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
                        className={`w-4 xs:w-6 2xs:w-8 h-[1px] ${activeType === ITEM_TYPE.SELL || disableBtnSpecial ? 'bg-title' : 'bg-green-900'}`}
                      ></div>

                      <div className="flex items-center space-x-1">
                        <IconPoint className="size-4 xs:size-5" color />
                        <p>
                          {isSpecial
                            ? formatNumber(useKey, 0, 0)
                            : totalPriceSell && formatNumber(totalPriceSell, 0, 0)}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="btn-border"></div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 xs:space-x-4">
              {(activeType !== ITEM_TYPE.INFO ||
                (activeType === ITEM_TYPE.INFO && currentItem.current?.isCanSell)) && (
                <div
                  className={`btn ${activeType === ITEM_TYPE.INFO ? 'error' : 'default'}`}
                  onClick={() => {
                    buttonSound.play()
                    activeType === ITEM_TYPE.INFO ? handleClick(ITEM_TYPE.SELL) : onClose()
                  }}
                >
                  <div className="btn-border"></div>
                  <div className={`btn btn-${activeType === ITEM_TYPE.INFO ? 'error' : 'default'}`}>
                    {activeType === ITEM_TYPE.INFO ? 'Sell' : 'Reset'}
                  </div>
                  <div className="btn-border"></div>
                </div>
              )}
              <div
                onClick={() => {
                  buttonSound.play()
                  setActiveTab(WORKSPACE_TYPE.SHOP)
                }}
                className="btn"
              >
                <div className="btn-border"></div>
                <div className="btn-primary">
                  {activeType === ITEM_TYPE.INFO ? 'Buy' : 'Confirm'}
                </div>
                <div className="btn-border"></div>
              </div>
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
        listItem={specialItem}
      />
    </>
  )
}
