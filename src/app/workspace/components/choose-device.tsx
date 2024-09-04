import ImageDevice from '@/app/components/image-device'
import NoItem from '@/app/components/no-item'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { getUserDevice, listUserItemDevice } from '@/services/devices'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
interface IChooseDevice {
  setActiveItem: (id: number) => void
  type: string
  activeItem: number
}
export default function ChooseDevice({ setActiveItem, type, activeItem }: IChooseDevice) {
  const [listDeviceItemByFilter, setListDeviceItemByFilter] = useState<IDeviceTypeItem[]>([])
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const [scrollTrigger, isInView] = useInView()
  const { isLoading } = useQuery({
    queryKey: ['fetchListDeviceItem', type, page],
    queryFn: async () => {
      const res: any = await getUserDevice({ type })
      if (res.status) {
        if (res.pagination?.totalPage) {
          maxPage.current = res.pagination?.totalPage
        }
        const listItem = page === 1 ? res.data : [...listDeviceItemByFilter, res.data]
        setListDeviceItemByFilter(listItem)
      }
      return res
    }
  })

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView, page])

  useEffect(() => {
    setPage(1)
  }, [type])

  return (
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
                {/* <p className="text-green-500">x{item.totalItem}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
      <>{page < maxPage.current && <div ref={scrollTrigger}></div>}</>
    </div>
  )
}
