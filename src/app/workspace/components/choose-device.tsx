import { IconPoint } from '@/app/components/icons'
import ImageDevice from '@/app/components/image-device'
import Loader from '@/app/components/ui/loader'
import NoItem from '@/app/components/ui/no-item'
import { formatNumber } from '@/helper/common'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { getUserDevice } from '@/services/devices'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { WORKSPACE_TYPE, WorkspaceContext } from '../context/workspace-context'
import { useAppSound } from '@/hooks/useAppSound'
import { useTourGuideContext } from '@/contexts/tour.guide.context'
interface IChooseDevice {
  setActiveItem: (id: number) => void
  type: string
  activeItem: number
}
export default function ChooseDevice({ setActiveItem, type, activeItem }: IChooseDevice) {
  const [listDeviceItemByFilter, setListDeviceItemByFilter] = useState<IDeviceTypeItem[]>([])
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const dataList = useRef<any[]>([])
  const { setActiveTab, setTypeItemShop } = useContext(WorkspaceContext)
  const [scrollTrigger, isInView] = useInView()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { state: tourState, setState, helpers } = useTourGuideContext()
  const { buttonSound } = useAppSound()
  useQuery({
    queryKey: ['fetchListDeviceItem', type, page],
    queryFn: async () => {
      setIsLoading(true)
      const res: any = await getUserDevice({ type, page })
      if (res.status) {
        if (res.pagination?.totalPage) {
          maxPage.current = res.pagination?.totalPage
        }
        let _listItem = res.data
        if (page > 1) {
          _listItem = [...dataList.current, ...res.data]
        }
        dataList.current = _listItem
        setListDeviceItemByFilter(dataList.current)
        setIsLoading(false)
      }
      return res
    }
  })

  const handleGoToShop = () => {
    buttonSound.play()
    setTypeItemShop(type)
    setActiveTab(WORKSPACE_TYPE.SHOP)
    if (tourState.run && tourState.tourActive) {
      setTimeout(() => {
        helpers?.next()
      }, 300)
    }
  }

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView])

  useEffect(() => {
    if (!tourState.run && tourState.tourActive) {
      console.log('🚀 ~ useEffect ~ tourState.stepIndex:', tourState.stepIndex)

      if (tourState.stepIndex === 13 && listDeviceItemByFilter?.length > 0) {
        setState({
          run: true,
          stepIndex: tourState.stepIndex + 1
        })
      }
    }
  }, [tourState, listDeviceItemByFilter, setState])

  useEffect(() => {
    setPage(1)
  }, [type])

  return (
    <div className=" relative">
      <div className="h-[300px] overflow-y-auto no-scrollbar mt-8 mb-6">
        {listDeviceItemByFilter?.length === 0 && !isLoading ? (
          <>
            <NoItem
              title="No item"
              textLink="Buy now"
              action={handleGoToShop}
              classNames={{
                link: 'jsBuyNow',
                icon: 'text-body'
              }}
            />
            <div className="absolute left-[50%] translate-x-[-50%] bottom-5 rotate-180">
              <img
                className="mx-auto max-w-[40px]"
                src="/assets/images/level/level-arrow-color@2x.png"
                alt="DePIN Alliance"
              />
            </div>
          </>
        ) : null}
        <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-8">
          {listDeviceItemByFilter?.map((item: IDeviceTypeItem, index: number) => (
            <div
              key={index}
              id={`item-${index}`}
              className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all h-full ${activeItem === item.id ? 'before:border-l-green-500 before:border-t-green-500 drop-shadow-green' : ''}`}
            >
              <div
                className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] h-full transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#143828] after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'bg-green-500 before:border-l-green-500 before:border-t-green-500' : ''}`}
                onClick={() => setActiveItem(item.id)}
              >
                <ImageDevice
                  image={item.image}
                  type={item.type?.toLowerCase()}
                  className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                />
                <p className="font-mona font-semibold text-white mt-3 mb-1 text-[13px] xs:text-sm !leading-[16px]">
                  {item.name}
                </p>
                <div className="flex items-center justify-center space-x-1 mt-1.5">
                  <IconPoint className="size-3 xs:size-4" />
                  <span className="text-primary font-semibold text-[11px] min-[355px]:text-xs xs:text-sm">
                    {item?.miningPower ? formatNumber(item?.miningPower, 0, 2) : 0}
                    /h
                  </span>
                </div>
                {/* <p className="text-green-500">x{item.totalItem}</p> */}
              </div>
            </div>
          ))}
        </div>
        <div ref={scrollTrigger} className="text-[transparent]">
          Loading...
        </div>
      </div>

      {isLoading && (
        <Loader
          classNames={{
            wrapper: 'h-[300px] top-0  z-[1] left-[0] absolute bg-black/30 backdrop-blur-[4px]',
            icon: 'size-10 text-white'
          }}
        />
      )}
    </div>
  )
}
