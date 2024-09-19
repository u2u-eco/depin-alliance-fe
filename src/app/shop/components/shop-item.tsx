import CustomModal from '@/app/components/custom-modal'
import ImageDevice from '@/app/components/image-device'
import { formatNumber } from '@/helper/common'
import { IDeviceItemBuyParam, IDeviceTypeItem, IFilterDevice } from '@/interfaces/i.devices'
import { buyDeviceItem, getDevicesByType } from '@/services/devices'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { IconMinusCircle, IconPlusCircle, IconPoint } from '@/app/components/icons'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import useCommonStore from '@/stores/commonStore'
import Loader from '@/app/components/ui/loader'
import CustomToast from '@/app/components/ui/custom-toast'
interface IShopItem {
  filterOptions: IFilterDevice
}
export default function ShopItem({ filterOptions }: IShopItem) {
  const maxPage = useRef<number>(0)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { getUserInfo, token, userInfo, heightNav } = useCommonStore()
  const currentItem = useRef<IDeviceTypeItem>()
  const [amount, setAmount] = useState<number>(1)
  const [listItem, setListItem] = useState<IDeviceTypeItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [scrollTrigger, isInView] = useInView()
  const [maxHeightListContent, setMaxHeightListContent] = useState<string>('60vh')
  const refList = useRef<any>()
  const dataList = useRef<IDeviceTypeItem[]>([])
  const [loadingButton, setLoadingButton] = useState(false)
  const { isLoading } = useQuery({
    queryKey: [
      'getListDevice',
      page,
      filterOptions.sortAscending,
      filterOptions.sortBy,
      filterOptions.type
    ],
    queryFn: async () => {
      const res: any = await getDevicesByType({ page, filterOptions })
      if (res.pagination?.totalPage) {
        maxPage.current = res.pagination?.totalPage
      }
      if (page !== res.pagination.page) return []
      let _listItem = res.data

      if (page > 1) {
        _listItem = [...dataList.current, ...res.data]
      }
      dataList.current = _listItem
      setListItem(dataList.current)
      return res
    },
    enabled: Boolean(token)
  })

  const handleAmount = (index: number) => {
    const newAmount = amount + index
    if (newAmount > 0) {
      setAmount(newAmount)
    }
  }

  const handleClick = (item: IDeviceTypeItem) => {
    currentItem.current = item
    onOpen()
  }

  const buy = async () => {
    setLoadingButton(true)
    if (loadingButton) return
    try {
      if (currentItem?.current?.code) {
        const data: IDeviceItemBuyParam = {
          number: amount,
          code: currentItem?.current?.code || ''
        }
        const res: any = await buyDeviceItem(data)
        if (res.status) {
          toast.success(<CustomToast type="success" title="Buy successfully!" />)
          setAmount(1)
          getUserInfo()
          onClose()
        }
        setLoadingButton(false)
      }
    } catch (ex) {
      setLoadingButton(false)
    }
  }

  const handleClose = () => {
    setAmount(1)
    onClose()
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
    setListItem([])
    setPage(1)
  }, [filterOptions])

  useEffect(() => {
    const offsetTop = refList.current?.getBoundingClientRect()?.top
    if (offsetTop) {
      const heightTopBottom = offsetTop + heightNav + 40
      setMaxHeightListContent(`calc(100vh - ${heightTopBottom}px`)
    }
  }, [])

  const totalAmount = currentItem.current?.price ? currentItem.current.price * amount : 0

  return (
    <>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ maxHeight: maxHeightListContent }}
        className="overflow-y-auto hide-scrollbar"
        ref={refList}
      >
        {isLoading && (
          <Loader
            style={{ height: maxHeightListContent }}
            classNames={{
              wrapper: ' z-[1] left-[0] absolute bg-black/30',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
        <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4">
          {listItem?.map((item: any, index: number) => (
            <div
              key={index}
              className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] bg-white/10 transition-all px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer flex flex-col`}
              onClick={() => handleClick(item)}
            >
              <ImageDevice
                image={item.image}
                className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                type={item.type}
              />

              <p className="font-mona font-semibold text-white mt-2 xs:mt-3 mb-1 text-xs xs:text-[13px] 2xs:text-sm leading-[15px] xs:leading-[16px] min-h-[30px] xs:min-h-[32px]">
                {item.name}
              </p>
              <div className="mt-auto flex items-center justify-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
                <IconPoint className="size-4" />
                <p className="text-green-500 text-[13px] xs:text-sm">
                  {' '}
                  {item?.price ? `${formatNumber(item.price, 0, 0)}` : 0}
                </p>
              </div>
            </div>
          ))}
          <div ref={scrollTrigger} className="text-[transparent]">
            Loading...
          </div>
        </div>
      </motion.div>
      <CustomModal
        title="BUY ITEM"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleClose}
        onOpenChange={onOpenChange}
      >
        <div>
          <div className=" text-body text-[15px] xs:text-base tracking-[-1px] text-center">
            <p>
              Are you sure you want to buy{' '}
              <span className="text-gradient whitespace-nowrap">“{currentItem.current?.name}”</span>
            </p>
          </div>
          <div className="my-6 xs:my-7 2xs:my-8 space-x-3 xs:space-x-4 flex items-center justify-center">
            <div className="size-[100px] xs:size-[115px] 2xs:size-[130px] min-w-[100px] xs:min-w-[115px] 2xs:min-w-[130px] p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center">
              <ImageDevice
                image={currentItem.current ? currentItem.current?.image : ''}
                type={currentItem.current ? currentItem.current.type : ''}
                className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
              />
            </div>
            <div className="space-y-1.5 xs:space-y-2">
              <p className=" text-title font-semibold text-base xs:text-lg 2xs:text-xl font-mona leading-[22px]">
                {currentItem.current?.name}
              </p>

              {/* <div className="space-y-1">
                <p className="text-title text-base font-semibold leading-[20px]">
                  __ <span className="text-xs font-normal text-white-50 -ml-0.5">Available</span>
                </p>
                <p className="text-primary text-base font-semibold leading-[20px]">
                  __ <span className="text-xs font-normal text-white-50 -ml-0.5">Equipped</span>
                </p>
              </div> */}
            </div>
          </div>
          <motion.div
            className="relative w-fit mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <img src="/assets/images/workspace/workspace-modal-frame.svg" alt="" />
            <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-between space-x-4 px-5 xs:px-6 2xs:px-8">
              <div className="space-y-2 xs:space-y-3">
                <div className="font-mona text-title text-[13px] xs:text-sm uppercase tracking-[-1px]">
                  TOTAL PROFIT:
                </div>
                <div className="flex items-center space-x-1.5 xs:space-x-2">
                  <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                  <span className="text-green-500 text-[15px] xs:text-base 2xs:text-lg font-semibold">
                    {currentItem.current?.miningPower
                      ? `${formatNumber(currentItem.current?.miningPower * amount, 0, 2)}/h`
                      : 0}
                  </span>
                </div>
              </div>
              <div className="space-y-2 xs:space-y-3">
                <div className="font-mona text-title text-[13px] xs:text-sm uppercase tracking-[-1px]">
                  AMOUNT:
                </div>
                <div className="flex items-center space-x-3 xs:space-x-4 2xs:space-x-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleAmount(-1)
                    }}
                  >
                    <IconMinusCircle
                      className={`size-5 xs:size-6 ${amount === 1 ? 'text-green-800' : 'text-green-500'}`}
                    />
                  </div>
                  <span className="text-green-100 text-center text-[15px] xs:text-base 2xs:text-lg font-semibold min-w-[22px]">
                    {amount}
                  </span>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleAmount(+1)
                    }}
                  >
                    <IconPlusCircle className="text-green-500 size-5 xs:size-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="btn" onClick={buy}>
            <div className="btn-border"></div>
            <div className="btn-primary !px-3">
              <div className="flex items-center justify-center text-sm xs:text-[15px] 2xs:text-base space-x-2 xs:space-x-3 2xs:space-x-4 text-green-900 whitespace-nowrap">
                <p>BUY NOW</p>
                <div className="w-4 xs:w-6 2xs:w-8 h-[1px] bg-green-800"></div>
                <div className="flex items-center space-x-1 xs:space-x-2">
                  <div className="flex items-center space-x-1">
                    <IconPoint className="size-4 xs:size-5" color />
                    <span className="font-geist">
                      {totalAmount
                        ? `${formatNumber(userInfo?.ratePurchase ? userInfo.ratePurchase * totalAmount : totalAmount, 0, 0)}`
                        : 0}
                    </span>
                  </div>
                  {userInfo?.ratePurchase && userInfo?.ratePurchase < 1 && (
                    <div className="flex items-center space-x-0.5 xs:space-x-1 opacity-65">
                      <IconPoint className="size-[14px] xs:size-4" color />
                      <span className="font-geist text-[11px] xs:text-xs line-through">
                        {totalAmount ? `${formatNumber(totalAmount, 0, 0)}` : 0}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
