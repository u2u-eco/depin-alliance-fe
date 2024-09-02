import { IconPlus, IconReload } from '@/app/components/icons'
import { UPGRADE_TAB } from '@/constants'
import { IDeviceDetailInfo, IDeviceTypeItem } from '@/interfaces/i.devices'
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
  handleInfo: (item: IDeviceTypeItem, info: IDeviceDetailInfo) => void
}
const MAX_SLOT_BY_TYPE = {
  [UPGRADE_TAB.RAM]: 3,
  [UPGRADE_TAB.GPU]: 2,
  [UPGRADE_TAB.STORAGE]: 1,
  [UPGRADE_TAB.CPU]: 1
}
const LIST_TYPE = [UPGRADE_TAB.RAM, UPGRADE_TAB.GPU, UPGRADE_TAB.STORAGE]
export default function DeviceItem({ isLoading, item, handleEquip, handleInfo }: IDeviceItem) {
  const [listInfo, setListInfo] = useState<any>({})

  const listInfoByFilter = useRef<any>({})
  const updateData = () => {
    listInfoByFilter.current.current = {}
    const listInfo: any = {
      [UPGRADE_TAB.CPU]: {},
      [UPGRADE_TAB.RAM]: [],
      [UPGRADE_TAB.GPU]: [],
      [UPGRADE_TAB.STORAGE]: []
    }
    item?.forEach((device) => {
      if (device.type === UPGRADE_TAB.CPU) {
        listInfo[UPGRADE_TAB.CPU] = device
        return
      }
      if (listInfo[device.type].length === 0) {
        // listInfo[device.type] = []
        listInfoByFilter.current[device.type] = {}
      }
      if (!listInfoByFilter.current[device.type][device.code]) {
        listInfoByFilter.current[device.type][device.code] = {
          equip: 1,
          totalProfit: device.miningPower
        }
        listInfo[device.type]?.push(device)
      } else {
        listInfoByFilter.current[device.type][device.code].equip += 1
        listInfoByFilter.current[device.type][device.code].totalProfit += device.miningPower
      }
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
    <div className="btn default cursor-default">
      <div className="btn-border"></div>
      <div className="btn-default !p-3 xs:!p-4 text-left">
        <div className="space-y-3 xs:space-y-4">
          <div className="space-y-2 xs:space-y-3">
            <p className="text-gradient uppercase text-[15px] xs:text-base font-mona font-semibold leading-[20px] w-fit">
              CPU
            </p>
            <div
              className="bg-black/20 flex items-center justify-center px-2 xs:px-3 2xs:px-4 py-2 cursor-pointer text-xs xs:text-[13px] 2xs:text-sm whitespace-nowrap"
              onClick={() =>
                handleInfo(listInfo[UPGRADE_TAB.CPU], {
                  equip: 1,
                  totalProfit: listInfo[UPGRADE_TAB.CPU]?.miningPower
                })
              }
            >
              {isLoading ? (
                <IconReload className="text-[#1AF7A8] size-6" />
              ) : (
                listInfo[UPGRADE_TAB.CPU]?.name
              )}
            </div>
          </div>
          {Object.keys(listInfo)?.map((keyItem) => {
            if (keyItem !== 'CPU') {
              return (
                <>
                  <div className="space-y-3" key={keyItem}>
                    <p className="text-gradient uppercase text-[15px] xs:text-base font-mona font-semibold leading-[20px] w-fit">
                      {keyItem}
                    </p>
                    <div
                      className={`grid ${keyItem === 'RAM' ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}
                    >
                      {isLoading ? (
                        <IconReload className="text-[#1AF7A8] size-6" />
                      ) : (
                        <>
                          {listInfo[keyItem].map((item: IDeviceTypeItem, index: number) => {
                            if (item.code) {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center justify-center py-2 px-2 xs:px-3 2xs:px-4 bg-black/20 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer text-xs xs:text-[13px] 2xs:text-sm whitespace-nowrap"
                                  onClick={() =>
                                    handleInfo(item, listInfoByFilter.current[keyItem][item.code])
                                  }
                                >
                                  {item?.name}
                                </div>
                              )
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center justify-center py-2 px-2 xs:px-3 2xs:px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer"
                                  onClick={() => handleEquip(keyItem)}
                                >
                                  <IconPlus className="text-title size-5 2xs:size-6" />
                                </div>
                              )
                            }
                          })}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )
            }
          })}
        </div>
      </div>
      <div className="btn-border"></div>
    </div>
  )
}
