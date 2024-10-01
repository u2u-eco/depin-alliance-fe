import CustomButton from '@/app/components/button'
import ListUserItem from '@/app/components/list-user-item'
import CustomToast from '@/app/components/ui/custom-toast'
import Loader from '@/app/components/ui/loader'
import NoItem from '@/app/components/ui/no-item'
import SellItem from '@/app/workspace/components/sell-item'
import { BUTTON_TYPE, PAGE_SIZE, QUERY_CONFIG } from '@/constants'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { listUserItemContribute, listUserItemDevice } from '@/services/devices'
import { contribute } from '@/services/league'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
interface ModalProps {
  closeModal: () => void
  cb: () => void
}

const ContributeModal = ({ closeModal, cb }: ModalProps) => {
  const [activeItem, setActiveItem] = useState<any>()
  const amountSell = useRef<any>()
  const [isLoadingAction, setLoadingAction] = useState<boolean>(false)
  const maxPage = useRef<number>(0)
  const [scrollTrigger, isInView] = useInView()
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [listDeviceItem, setListDeviceItem] = useState<IDeviceTypeItem[]>([])
  const dataList = useRef<IDeviceTypeItem[]>([])
  useQuery({
    queryKey: ['getListUserItemContribute', page],
    queryFn: async () => {
      try {
        setLoading(true)
        const res: any = await listUserItemContribute({ page, size: PAGE_SIZE })
        if (res.pagination?.totalPage) {
          maxPage.current = res.pagination?.totalPage
        }
        if (page !== res.pagination.page) {
          setLoading(false)
          return []
        }
        let _listItem = res.data
        if (page > 1) {
          _listItem = [...dataList.current, ...res.data]
        }
        dataList.current = [..._listItem]
        setListDeviceItem(dataList.current)
        setLoading(false)
        return res
      } catch (ex) {
        setLoading(false)
      }
    },
    ...QUERY_CONFIG
  })
  const handleClick = (item: any) => {
    setActiveItem(item)
  }

  const handleBack = () => {
    setActiveItem('')
  }

  const updateAmountSell = (amount: number) => {
    amountSell.current = amount
  }

  const handleContribute = async () => {
    if (!activeItem?.code) return
    setLoadingAction(true)
    const res = await contribute({
      code: activeItem.code,
      number: amountSell.current
    })
    if (res.status) {
      toast.success(<CustomToast type="success" title="Contribute successfully" />)
      cb && cb()
      closeModal()
    }
    setLoadingAction(false)
  }

  useEffect(() => {
    if (isInView && page < maxPage.current && !loading) {
      setPage(page + 1)
    }
  }, [isInView])

  return (
    <div>
      <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
        {activeItem ? (
          <p>
            Are you sure you want to contribute{' '}
            <span className="text-gradient">“{activeItem?.name}”</span>
          </p>
        ) : (
          <p> Fund your points to League to unlock special features</p>
        )}
      </div>

      <div className=" relative min-h-[300px]">
        {activeItem ? (
          <>
            <div className="my-6 xs:my-7 2xs:my-8 space-x-3 xs:space-x-4 flex items-center justify-center">
              <div className="[--shape:_30px] p-[1px] bg-green-100 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape))] size-[100px] xs:size-[115px] 2xs:size-[130px] min-w-[100px] xs:min-w-[115px] 2xs:min-w-[130px]">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="size-full [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape))]"
                  src={
                    activeItem?.image?.length > 0
                      ? activeItem.image`/assets/images/upgrade/upgrade-ram@2x.png`
                      : `/assets/images/upgrade/upgrade-${activeItem?.type?.toLowerCase()}@2x.png`
                  }
                  alt="DePIN Alliance"
                />
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold font-mona text-base xs:text-xl 2xs:text-2xl !leading-[20px] xs:!leading-[24px] 2xs:!leading-[28px]">
                  {activeItem?.name}
                </p>
                <p className="font-semibold text-title leading-[16px]">
                  {activeItem?.totalItem}{' '}
                  <span className="font-normal text-white-50 tracking-[-1px]">In Total</span>
                </p>
                {/* <p className="font-semibold text-green-600 leading-[16px]">
              3 <span className="font-normal text-white-50 tracking-[-1px]">Equipped</span>
            </p> */}
              </div>
            </div>
            <SellItem item={activeItem} updateAmountSell={updateAmountSell} />
          </>
        ) : (
          <>
            <div className="mt-6 xs:mt-7 2xs:mt-8 mb-6 h-[300px] overflow-y-auto no-scrollbar relative ">
              <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-6 xs:mb-7 2xs:mb-8">
                <ListUserItem listData={listDeviceItem} handleClick={handleClick} activeItem="" />
                <div ref={scrollTrigger} className="text-[transparent]">
                  Loading...
                </div>
              </div>
              {loading && (
                <Loader
                  classNames={{
                    wrapper: 'top-0  z-[1] left-[0] absolute bg-black/30 backdrop-blur-[4px]',
                    icon: 'size-10 text-white'
                  }}
                />
              )}
              {listDeviceItem?.length === 0 && !loading ? (
                <NoItem
                  title="No item"
                  classNames={{
                    icon: 'text-body'
                  }}
                />
              ) : null}
            </div>
            <p className="text-center text-error text-[13px] xs:text-sm !leading-[18px] tracking-[-1px]">
              After contributing, your items will not be returned. So select carefully
            </p>
          </>
        )}
      </div>

      {activeItem && (
        <div className="flex justify-center space-x-2 xs:space-x-3 2xs:space-x-4 mt-[3px]">
          <CustomButton type={BUTTON_TYPE.DEFAULT} title="BACK" onAction={handleBack} />
          <CustomButton
            title="CONTRIBUTE"
            onAction={handleContribute}
            isLoading={isLoadingAction}
          />
        </div>
      )}
    </div>
  )
}

export default ContributeModal
