import CustomInput from '@/app/components/custom-input'
import CustomModal from '@/app/components/custom-modal'
import { IconChevron, IconEdit, IconPlus, IconPoint, IconReload } from '@/app/components/icons'
import { Accordion, AccordionItem, divider, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'

const DEVICE_TYPE = {
  INFO: 'info',
  EDIT: 'edit',
  EQUIP: 'equip',
}

const listItem = [
  { id: 1, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 2, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 3, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 4, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 5, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 6, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 7, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 8, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 9, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 10, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 11, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 12, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 13, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 14, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 15, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 16, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 17, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
  { id: 18, image: 'upgrade/upgrade-ram-2gb', title: 'RAM 2GB', number: '12' },
]

export default function Device() {
  const [activeType, setActiveType] = useState(DEVICE_TYPE.INFO)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeItem, setActiveItem] = useState()

  const handleClick = (type: string) => {
    setActiveType(type)
    onOpen()
  }

  return (
    <>
      <Accordion
        showDivider={false}
        className="p-0"
        itemClasses={{
          base: "",
          trigger: "relative [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:z-[-1] before:bg-item-default before:opacity-20 p-2 data-[open=true]:bg-green-500 data-[open=true]:before:bg-item-accordion data-[open=true]:before:opacity-100",
          indicator: "data-[open=true]:-rotate-180 mr-2"
        }}
      >
        <AccordionItem 
          key="1"
          startContent={
            <div className="flex items-center justify-center min-w-16 xs:min-w-[72px] size-16 xs:size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%' }}
              src="/assets/images/upgrade/upgrade-ram-2gb.png"
              alt=""
            />
          </div>
          }
          title={
            <div className="flex items-center space-x-1">
              <p className="font-mona text-white font-semibold text-lg leading-[22px]">DEVICE MARS</p>
              <div onClick={() => handleClick(DEVICE_TYPE.EDIT)}>
                <IconEdit className="text-[#888888] size-6 cursor-pointer"/>
              </div>
            </div>
          }
          subtitle={
            <div className="flex items-center space-x-1 mt-3">
              <IconPoint className="size-4"/>
              <p className="text-green-500 font-semibold leading-[16px]">10,000/h</p>
            </div>
          }
          indicator={
            <IconChevron className="size-8" gradient />
          }
        >
          <div className="btn default cursor-default">
            <div className="btn-border"></div>
            <div className="btn-default p-4 text-left">
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="text-gradient uppercase text-base font-mona font-semibold leading-[20px] w-fit">CPU</p>
                  <div className="bg-black/20 flex items-center justify-center px-4 py-2 cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.INFO)}>
                    <IconReload className="text-[#1AF7A8] size-6"/>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gradient uppercase text-base font-mona font-semibold leading-[20px] w-fit">RAM</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center justify-center py-2 px-4 bg-black/20 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.INFO)}>
                      <IconReload className="text-[#1AF7A8] size-6"/>
                    </div>
                    <div className="flex items-center justify-center py-2 px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.EQUIP)}>
                      <IconPlus className="text-title size-6"/>
                    </div>
                    <div className="flex items-center justify-center py-2 px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.EQUIP)}>
                      <IconPlus className="text-title size-6"/>
                    </div>
                    <div className="flex items-center justify-center py-2 px-4 bg-black/20 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.INFO)}>
                      <IconReload className="text-[#1AF7A8] size-6"/>
                    </div>
                    <div className="flex items-center justify-center py-2 px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.EQUIP)}>
                      <IconPlus className="text-title size-6"/>
                    </div>
                    <div className="flex items-center justify-center py-2 px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.EQUIP)}>
                      <IconPlus className="text-title size-6"/>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gradient uppercase text-base font-mona font-semibold leading-[20px] w-fit">STORAGE</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-center py-2 px-4 bg-black/20 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.INFO)}>
                      <IconReload className="text-[#1AF7A8] size-6"/>
                    </div>
                    <div className="flex items-center justify-center py-2 px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer" onClick={() => handleClick(DEVICE_TYPE.EQUIP)}>
                      <IconPlus className="text-title size-6"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-border"></div>
          </div>
        </AccordionItem>
      </Accordion>
      <CustomModal
        title={activeType === DEVICE_TYPE.INFO ? 'ITEM Info' :activeType === DEVICE_TYPE.EQUIP ? 'equip item' : 'DEVICE NAME'}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div className="relative w-full">
          <div className="absolute bottom-[60px] left-0 right-0 w-full h-[50px] bg-[linear-gradient(to_bottom,rgba(3,9,5,0)0%,rgba(3,9,5,1)_60%)] z-[1]"></div>
          {activeType !== DEVICE_TYPE.EDIT && (
            <div className=" text-body text-base tracking-[-1px] text-center">
              {activeType === DEVICE_TYPE.INFO ? (
                <p>You are equipping this item!</p>
              ) : (
                <p>Select 01 <span className="text-gradient">“RAM”</span> to equip</p>
              )}
            </div>
          )}
          {activeType !== DEVICE_TYPE.EQUIP ? (
            <>
              <div className={`space-x-4 flex items-center justify-center ${activeType === DEVICE_TYPE.INFO ? 'mt-10 mb-14' : 'my-8'}`}>
                <div className={`p-[1px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center ${activeType === DEVICE_TYPE.INFO ? 'size-[90px] min-w-[90px]' : 'size-[130px] min-w-[130px]'}`}>
                  <img
                    className="w-full h-full [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                    src="/assets/images/upgrade/upgrade-ram-2gb.png"
                    srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x. /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x"
                    alt=""
                  />
                </div>
                <div className={activeType === DEVICE_TYPE.INFO ? 'space-y-4' : 'space-y-2'}>
                  <p className=" text-title font-semibold text-xl font-mona leading-[22px]">RAM 2GB</p>
                  <div className="flex items-center space-x-6">
                    {activeType === DEVICE_TYPE.INFO && (
                      <>
                        <div className="space-y-1">
                          <p className="text-title text-base font-semibold leading-[20px]">16 <span className="text-xs font-normal text-white-50 -ml-0.5">Available</span></p>
                          <p className="text-primary text-base font-semibold leading-[20px]">0 <span className="text-xs font-normal text-white-50 -ml-0.5">Equipped</span></p>
                        </div>
                        <div className="w-[1px] h-9 bg-white/25"></div>
                      </>
                    )}
                    <div className={activeType ===  DEVICE_TYPE.INFO ? 'space-y-2' : 'space-y-3'}>
                      <div className={activeType ===  DEVICE_TYPE.INFO ? 'text-xs text-white-50' : 'text-title'}>{activeType === DEVICE_TYPE.INFO ? 'TOTAL ' : ''}PROFIT:</div>
                      <div className={`flex items-center ${activeType ===  DEVICE_TYPE.INFO ? 'space-x-1' : 'space-x-2'}`}>
                        <IconPoint className={activeType ===  DEVICE_TYPE.INFO ? 'size-4' : 'size-7'} />
                        <span className={`text-primary font-semibold leading-[16px] ${activeType === DEVICE_TYPE.EDIT ? 'text-lg' : ''}`}>10,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {activeType === DEVICE_TYPE.EDIT && (
                <div className="mb-10">
                  <CustomInput
                    label="Device Name:"
                    placeholder="DEVICE MARS"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="max-h-[450px] overflow-y-auto hide-scrollbar mt-8 mb-6">
              <div className="grid grid-cols-3 gap-2 xs:gap-3 2xs:gap-4 mb-8">
                {listItem.map((item: any) => (
                  <div
                    key={item.id}
                    className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all ${activeItem === item.id ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
                  >
                    <div
                      className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] transition-all after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)]  after:bg-[#143828] after:z-[-1] after:[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] px-2 xs:px-3 2xs:px-4 py-3 xs:py-4 text-center cursor-pointer ${activeItem === item.id ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)] before:border-l-green-500 before:border-t-green-500' : ''}`}
                      onClick={() => setActiveItem(item.id)}
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
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={`btn z-[2] ${activeType === DEVICE_TYPE.INFO ? 'error' : ''}`}>
            <div className="btn-border"></div>
            <div className={`btn-${activeType === DEVICE_TYPE.INFO ? 'error' : 'primary'}`}>{activeType === DEVICE_TYPE.INFO ? 'UNEQUIPPED' : activeType === DEVICE_TYPE.EQUIP ? 'CONFIRM' : 'SAVE'}</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
