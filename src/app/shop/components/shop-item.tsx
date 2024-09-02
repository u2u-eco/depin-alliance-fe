import { getDevicesByType } from '@/services/devices'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
const listHardware = [
  { id: 1, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 2, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 3, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 4, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 5, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 6, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' }
]
export default function ShopItem() {
  const { data } = useQuery({
    queryKey: ['getListDevice'],
    queryFn: () => getDevicesByType()
  })
  console.log('🚀 ~ ShopItem ~ data:', data)

  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -25, opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4">
        {listHardware.map((item: any) => (
          <div
            key={item.id}
            className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] bg-white/10 transition-all px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer`}
            // onClick={() => handleClick(MODAL_TYPE.ITEM)}
          >
            <img
              className="size-[70px] xs:size-20 2xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
              src={`/assets/images/${item.image}.png`}
              alt=""
            />
            <p className="font-mona font-semibold text-white mt-3 mb-1 leading-[16px]">
              {item.title}
            </p>
            <p className="text-green-500">x{item.number}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
