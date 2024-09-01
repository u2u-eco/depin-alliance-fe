import { IconPlus, IconReload } from '@/app/components/icons'
import { UPGRADE_TAB } from '@/constants'
import { IDeviceDetailInfo, IDeviceTypeItem } from '@/interfaces/i.devices'
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
export default function DeviceItem({ isLoading, item, handleEquip, handleInfo }: IDeviceItem) {
  const listInfo: any = {
    [UPGRADE_TAB.CPU]: {},
    [UPGRADE_TAB.RAM]: [],
    [UPGRADE_TAB.GPU]: [],
    [UPGRADE_TAB.STORAGE]: []
  }
  const listInfoByFilter: any = {}
  item?.forEach((device) => {
    if (device.type === UPGRADE_TAB.CPU) {
      listInfo[UPGRADE_TAB.CPU] = device
      return
    }
    if (listInfo[device.type].length === 0) {
      // listInfo[device.type] = []
      listInfoByFilter[device.type] = {}
    }
    if (!listInfoByFilter[device.type][device.code]) {
      listInfoByFilter[device.type][device.code] = { equip: 1, totalProfit: device.miningPower }
      listInfo[device.type]?.push(device)
    } else {
      listInfoByFilter[device.type][device.code].equip += 1
      listInfoByFilter[device.type][device.code].totalProfit += device.miningPower
    }
  })
  if (!listInfo[UPGRADE_TAB.CPU]) {
    listInfo[UPGRADE_TAB.CPU] = []
  }
  if (!listInfo[UPGRADE_TAB.GPU]) {
    listInfo[UPGRADE_TAB.GPU] = []
  }

  return (
    <div className="btn default cursor-default">
      <div className="btn-border"></div>
      <div className="btn-default p-4 text-left">
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gradient uppercase text-base font-mona font-semibold leading-[20px] w-fit">
              CPU
            </p>
            <div
              className="bg-black/20 flex items-center justify-center px-4 py-2 cursor-pointer"
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
                    <p className="text-gradient uppercase text-base font-mona font-semibold leading-[20px] w-fit">
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
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-center py-2 px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer"
                                onClick={() =>
                                  handleInfo(item, listInfoByFilter[keyItem][item.code])
                                }
                              >
                                {item?.name}
                              </div>
                            )
                          })}
                          <div
                            className="flex items-center justify-center py-2 px-4 bg-white/10 [clip-path:_polygon(12px_0%,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%,0_12px)] cursor-pointer"
                            onClick={() => handleEquip(keyItem)}
                          >
                            <IconPlus className="text-title size-6" />
                          </div>
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
