import { IconPlus, IconReload } from '@/app/components/icons'
import { UPGRADE_TAB } from '@/constants'
import { useTourGuideContext } from '@/contexts/tour.guide.context'
import { useAppSound } from '@/hooks/useAppSound'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { useEffect, useRef, useState } from 'react'
const DEVICE_TYPE = {
  INFO: 'info',
  EDIT: 'edit',
  EQUIP: 'equip'
}
interface IDeviceItem {
  isLoading: boolean
  item: IDeviceTypeItem[]
  handleEquip: (type: string) => void
  handleInfo: (item: IDeviceTypeItem) => void
}
const MAX_SLOT_BY_TYPE = {
  [UPGRADE_TAB.RAM]: 3,
  [UPGRADE_TAB.GPU]: 2,
  [UPGRADE_TAB.STORAGE]: 2,
  [UPGRADE_TAB.CPU]: 1
}
const LIST_TYPE = [UPGRADE_TAB.RAM, UPGRADE_TAB.GPU, UPGRADE_TAB.STORAGE, UPGRADE_TAB.CPU]
export default function DeviceItem({ isLoading, item, handleEquip, handleInfo }: IDeviceItem) {
  const [listInfo, setListInfo] = useState<any>({})
  const { buttonSound } = useAppSound()
  const { state: tourState, setState, helpers } = useTourGuideContext()
  const listInfoByFilter = useRef<any>({})
  const updateData = () => {
    listInfoByFilter.current.current = {}
    const listInfo: any = {
      [UPGRADE_TAB.CPU]: [],
      [UPGRADE_TAB.RAM]: [],
      [UPGRADE_TAB.GPU]: [],
      [UPGRADE_TAB.STORAGE]: []
    }
    item?.forEach((device) => {
      listInfo[device.type]?.push(device)
    })
    if (!listInfo[UPGRADE_TAB.CPU]) {
      listInfo[UPGRADE_TAB.CPU] = []
    }
    if (!listInfo[UPGRADE_TAB.GPU]) {
      listInfo[UPGRADE_TAB.GPU] = []
    }
    if (listInfo[UPGRADE_TAB.RAM].length < MAX_SLOT_BY_TYPE[UPGRADE_TAB.RAM]) {
      listInfo[UPGRADE_TAB.RAM] = [
        ...listInfo[UPGRADE_TAB.RAM],
        ...Array(MAX_SLOT_BY_TYPE[UPGRADE_TAB.RAM] - listInfo[UPGRADE_TAB.RAM]?.length).fill(0)
      ]
    }
    LIST_TYPE.forEach((type) => {
      if (listInfo[type].length < MAX_SLOT_BY_TYPE[type]) {
        listInfo[type] = [
          ...listInfo[type],
          ...Array(MAX_SLOT_BY_TYPE[type] - listInfo[type]?.length).fill(0)
        ]
      }
    })

    setListInfo(listInfo)
  }
  useEffect(() => {
    updateData()
  }, [item])

  return (
    <div className="relative btn default cursor-default">
      {tourState.tourActive && tourState.stepIndex === 8 && (
        <div className="absolute left-[50%] translate-x-[-50%] top-16 z-20">
          <img
            className="animate-bounce max-w-8 xs:max-w-9 2xs:max-w-10 mx-auto"
            src="/assets/images/level/level-arrow-color@2x.png"
            alt="DePIN Alliance"
          />
        </div>
      )}
      <div className="btn-border"></div>
      <div className="btn-default !p-3 xs:!p-4 text-left">
        <div className="space-y-3 xs:space-y-4">
          {Object.keys(listInfo)?.map((keyItem) => {
            return (
              <div className="space-y-2 xs:space-y-2.5 2xs:space-y-3" key={keyItem}>
                <p className="text-gradient uppercase text-sm xs:text-[15px] 2xs:text-base font-mona font-semibold !leading-[18px] xs:!leading-[20px] w-fit">
                  {keyItem}
                </p>
                <div
                  className={`grid ${keyItem === 'RAM' ? 'grid-cols-3' : keyItem === 'CPU' ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center py-2 px-2 xs:px-3 2xs:px-4 bg-black/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)]">
                      <IconReload className="text-[#1AF7A8] size-4 xs:size-5 2xs:size-6" />
                    </div>
                  ) : (
                    <>
                      {listInfo[keyItem].map((item: IDeviceTypeItem, index: number) => {
                        if (item.code) {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-center text-center py-2 px-2 xs:px-3 2xs:px-4 bg-black/20 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer text-xs xs:text-[13px] !leading-[16px] xs:!leading-[20px] 2xs:!leading-[24px] 2xs:text-sm [word-break:_break-word;]"
                              onClick={() => {
                                buttonSound.play()
                                handleInfo(item)
                              }}
                            >
                              {item?.name}
                            </div>
                          )
                        } else {
                          return (
                            <div
                              key={index}
                              className={`flex items-center justify-center py-2 px-2 xs:px-3 2xs:px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer ${tourState.tourActive && keyItem === 'RAM' && index === 1 ? 'opacity-100' : 'opacity-50'}`}
                              onClick={() => {
                                buttonSound.play()
                                handleEquip(keyItem)
                              }}
                            >
                              <IconPlus className="text-title size-4 xs:size-5 2xs:size-6" />
                            </div>
                          )
                        }
                      })}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="btn-border"></div>
    </div>
  )
}
