import { IUserDeviceItem } from '@/interfaces/i.devices'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { IconChevron, IconEdit, IconPoint } from './icons'
import { formatNumber } from '@/helper/common'
import { useAppSound } from '@/hooks/useAppSound'
interface IAccordionItem {
  index: number
  className: string
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
  className,
  setExpanded,
  handleClickItem,
  children,
  handleEdit
}: IAccordionItem) {
  const isOpen = index === expanded
  const { buttonSound } = useAppSound()

  const handleSelectItem = (index: number | false) => {
    if (index) {
      handleClickItem(index)
    }
    setExpanded(index)
  }
  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <div className={className}>
      <motion.header
        initial={false}
        // onClick={() => setExpanded(isOpen ? false : index)}
        className={`relative after:content-[''] after:right-0 after:bottom-0 after:absolute after:size-4 after:border-[8px] after:border-transparent ${isOpen ? 'after:border-r-green-500 after:border-b-green-500' : 'after:border-r-green-900 after:border-b-green-900'}`}
      >
        <div
          className={`relative space-x-3 cursor-pointer [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:bg-item-default before:opacity-20 p-2 flex justify-between items-center ${isOpen ? 'bg-green-500 before:!bg-item-accordion before:!opacity-100 mb-3' : ''}`}
        >
          <div className="relative w-full flex items-center justify-center">
            <div
              onClick={() => {
                handleSelectItem(isOpen ? false : index)
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
            <div className="space-y-1 xs:space-y-2 2xs:space-y-3">
              <div className="flex items-center space-x-1 w-full">
                <p
                  className="font-mona text-white font-semibold text-[15px] xs:text-base 2xs:text-lg !leading-[20px] 2xs:!leading-[22px] line-clamp-2"
                  onClick={() => {
                    handleSelectItem(isOpen ? false : index)
                  }}
                >
                  {item.name}
                </p>
                <div
                  onClick={() => {
                    handleEdit(item)
                    buttonSound.play()
                  }}
                >
                  <IconEdit className="text-[#888888] size-6 cursor-pointer" />
                </div>
              </div>

              <div
                className="flex w-full items-center space-x-1"
                onClick={() => {
                  handleSelectItem(isOpen ? false : index)
                }}
              >
                <IconPoint className="size-4" />
                <p className="text-green-500 font-semibold leading-[16px]">
                  {item.totalMiningPower ? `${formatNumber(item.totalMiningPower, 0, 2)}/h` : '0/h'}
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
            <IconChevron className="size-6 xs:size-7 2xs:size-8" gradient />
          </motion.div>
        </div>
      </motion.header>
      <AnimatePresence mode="wait" key="accordion-item">
        {isOpen && (
          <motion.section
            className="overflow-hidden"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, maxHeight: '390px' },
              collapsed: { opacity: 0, maxHeight: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div className="content-placeholder">{children}</motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
