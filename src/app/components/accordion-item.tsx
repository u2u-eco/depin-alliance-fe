import { IUserDeviceItem } from '@/interfaces/i.devices'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { IconChevron, IconEdit, IconPoint } from './icons'
import { formatNumber } from '@/helper/common'
interface IAccordionItem {
  index: number
  item: IUserDeviceItem
  expanded: number | false
  setExpanded: (item: number | false) => void
  handleClickItem: (index: number) => void
  handleEdit: (item: IUserDeviceItem) => void
  children: ReactNode
}
export default function AccordionItem({
  index,
  item,
  expanded,
  setExpanded,
  handleClickItem,
  children,
  handleEdit
}: IAccordionItem) {
  const isOpen = index === expanded

  const handleSelectItem = (index: number | false) => {
    if (index) {
      handleClickItem(index)
    }
    setExpanded(index)
  }
  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <div className="p-0">
      <motion.header
        initial={false}
        // onClick={() => setExpanded(isOpen ? false : index)}
        className="relative [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:bg-item-default before:opacity-20 p-2 data-[open=true]:bg-green-500 data-[open=true]:before:bg-item-accordion data-[open=true]:before:opacity-100"
      >
        <div className="flex justify-between items-center">
          <div className="relative w-full flex items-center justify-center">
            <div
              onClick={() => {
                handleSelectItem(item.index)
              }}
              className="min-w-16 mr-[10px] xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10"
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%' }}
                src="/assets/images/workspace/device-image-01@2x.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-1 w-full">
                <p
                  className="font-mona text-white font-semibold text-lg leading-[22px]"
                  onClick={() => {
                    handleSelectItem(isOpen ? false : index)
                  }}
                >
                  {item.name}
                </p>
                <div onClick={() => handleEdit(item)}>
                  <IconEdit className="text-[#888888] size-6 cursor-pointer" />
                </div>
              </div>

              <div
                className="flex w-full items-center space-x-1 mt-3"
                onClick={() => {
                  handleSelectItem(isOpen ? false : index)
                }}
              >
                <IconPoint className="size-4" />
                <p className="text-green-500 font-semibold leading-[16px]">
                  {item.totalMiningPower ? `${formatNumber(item.totalMiningPower, 0, 0)}/h` : '0/h'}
                </p>
              </div>
            </div>
            <div
              className="grow min-h-[50px]"
              onClick={() => {
                handleSelectItem(isOpen ? false : index)
              }}
            ></div>
          </div>
          <motion.div
            onClick={() => {
              handleSelectItem(isOpen ? false : index)
            }}
            transition={{ duration: 0.3 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            <IconChevron className="size-8" gradient />
          </motion.div>
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: '365px' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className="content-placeholder"
            >
              {children}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
