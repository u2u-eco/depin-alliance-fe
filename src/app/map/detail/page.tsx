'use client'

import CustomButton from '@/app/components/button'
import CustomModal from '@/app/components/custom-modal'
import CustomPage from '@/app/components/custom-page'
import { IconMapAsia, IconPlus, IconReload } from '@/app/components/icons'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { useAppSound } from '@/hooks/useAppSound'
import { useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const DETAIL_TYPE = {
  AGENCY: 'agency',
  TOOL: 'tool'
}

const listDetail = [
  {
    id: 1,
    haveItem: true,
    image: <IconMapAsia className="size-8" />,
    title: 'ASIA',
    text: 'LV. 12'
  },
  { id: 2, haveItem: false, image: '', title: 'agency', text: '' },
  { id: 3, haveItem: false, image: '', title: 'tool', text: '' }
]

const listItem = [
  { id: 1, image: '', name: 'Ethan Nimbus' },
  { id: 2, image: '', name: 'Ethan Nimbus' },
  { id: 3, image: '', name: 'Ethan Nimbus' },
  { id: 4, image: '', name: 'Ethan Nimbus' },
  { id: 5, image: '', name: 'Ethan Nimbus' }
]

export default function DetailPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeType, setActiveType] = useState(DETAIL_TYPE.AGENCY)
  const [activeItem, setActiveItem] = useState<any>()
  const { buttonSound } = useAppSound()

  const handleClick = (type: string) => {
    buttonSound.play()
    switch (type) {
      case DETAIL_TYPE.AGENCY:
      case DETAIL_TYPE.TOOL:
        setActiveType(type)
        onOpen()
        break
    }
  }

  const handleSelectItem = (index: number) => {
    setActiveItem(index)
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[-1]",
          container: 'h-full',
          animate:
            '[--space:_40px] xs:[--space:_48px] 2xs:[--space:_56px] h-[calc(100%_-_var(--space))]',
          base: 'h-full'
        }}
      >
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 right-0 w-full h-full z-[-1]"
          >
            <img
              className="mx-auto object-cover h-full w-full"
              src="/assets/images/map/map-background@2x.png"
              alt="DePIN Alliance"
            />
          </motion.div>
          <div className="relative flex flex-col justify-between space-y-6 h-full">
            <CustomHeader title="World Map" />
            <div className="flex space-x-2">
              {listDetail.map((item: any) => (
                <div className="btn cursor-default" key={item.id}>
                  <div className="btn-border"></div>
                  <div className="btn-primary ![background:_transparent] !shadow-none relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-[linear-gradient(to_bottom,rgba(0,51,29,0.1),rgba(0,51,29,1))] before:opacity-20 before:z-[-1] !px-2 xs:!px-3 text-center flex flex-col space-y-2 xs:space-y-2.5 2xs:space-y-3">
                    <div className="relative mx-auto drop-shadow-[0_0_10px_rgba(0,153,86,0.5)] mt-1 before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-1.5 before:border-[3px] before:border-transparent before:border-l-green-500 before:border-t-green-500 after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-2.5 after:border-[5px] after:border-transparent after:border-r-green-500 after:border-b-green-500">
                      <div className="[--shape:_15px] size-14 xs:size-16 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape));] p-[1px] bg-gradient">
                        <div
                          className={`[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape));] flex items-center justify-center size-full text-green-500 ${item.haveItem ? 'bg-green-900' : 'bg-[linear-gradient(to_bottom,#000,#00331d)]'}`}
                        >
                          {item.haveItem ? (
                            <IconMapAsia className="size-8" />
                          ) : (
                            <img
                              className="size-10"
                              src="/assets/images/onboarding/device-unknown@2x.png"
                              alt="DePIN Alliance"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p
                        className={`text-[13px] xs:text-sm !leading-[18px] font-semibold uppercase ${item.haveItem ? 'text-title' : 'text-inactive'}`}
                      >
                        {item.title}
                      </p>
                      <p className="text-yellow-500 text-xs !leading-[16px] tracking-[-1px] font-geist font-normal min-h-4">
                        {item.text}
                      </p>
                    </div>
                    <div
                      className="cursor-pointer mx-auto px-2"
                      onClick={() => handleClick(item.title)}
                    >
                      {item.haveItem ? (
                        <IconReload className="size-5 xs:size-6" gradient />
                      ) : (
                        <IconPlus className="size-5 xs:size-6" gradient />
                      )}
                    </div>
                  </div>
                  <div className="btn-border"></div>
                </div>
              ))}
            </div>
          </div>
        </>
      </CustomPage>
      <CustomModal
        title={activeType === DETAIL_TYPE.AGENCY ? 'AGENCY' : 'TOOL'}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <div className="space-y-6 xs:space-y-8 2xs:space-y-10">
          <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
            <p>
              Select 01 <span className="text-gradient capitalize">“{activeType}”</span>
            </p>
          </div>
          <div className="overflow-y-auto no-scrollbar max-h-[50vh]">
            <div className="flex flex-col space-y-3.5">
              {listItem.map((item: any, index: number) => (
                <div
                  className={`relative cursor-pointer after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-4 after:border-[8px] after:border-transparent after:transition-background ${activeItem === index ? 'after:border-b-green-500 after:border-r-green-500' : 'after:border-b-green-900 after:border-r-green-900'}`}
                  key={index}
                  onClick={() => handleSelectItem(index)}
                >
                  <div
                    className={`relative [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:size-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:transition-background p-2 flex items-center justify-between ${activeItem === index ? 'bg-green-500 before:bg-item-green' : 'before:bg-item-default before:opacity-20'}`}
                  >
                    <div className="flex items-center space-x-3 xs:space-x-4">
                      <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%' }}
                          src={
                            item?.avatar?.replace(/-/g, '-main-') ||
                            '/assets/images/avatar/avatar-main-01@2x.png'
                          }
                          alt="DePIN Alliance"
                        />
                      </div>
                      <div className="space-y-2 xs:space-y-3">
                        <div className="flex items-center space-x-1 cursor-pointer">
                          <div className="text-white font-mona text-base xs:text-lg font-semibold leading-[20px] xs:leading-[22px] [word-break:_break-word;]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CustomButton title="Confirm" />
        </div>
      </CustomModal>
    </>
  )
}