'use client'

import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { getUserInfo } from '../../services/user'
import { formatNumber } from '../../helper/common'
import Mining from './components/minning'
import { getUserDevice } from '../../services/devices'
import CustomPage from '../components/custom-page'
import useCommonStore from '@/stores/commonStore'
import { IDeviceTypeItem } from '@/interfaces/i.devices'
import { UPGRADE_TAB } from '@/constants'
import { useUserInfo } from '@/hooks/useUserInfo'
import CustomModal from '../components/custom-modal'
import { useDisclosure } from '@nextui-org/react'

const listAvatar = [
  { id: 1, image: '1' },
  { id: 2, image: '2'},
  { id: 3, image: '3' },
  { id: 4, image: '4' },
  { id: 5, image: '5' },
  { id: 6, image: '6' },
  { id: 7, image: '3' },
  { id: 8, image: '1' },
  { id: 9, image: '2' },
]

export default function HomePage() {
  const { token, userInfo, setDevice } = useCommonStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [avatarActive, setAvatarActive] = useState()

  useUserInfo()

  const _getUserDevice = async () => {
    const res = await getUserDevice()
    if (res.status) {
      let listInfo: any = {}
      let listByType: any = {}

      res.data.forEach((item: IDeviceTypeItem) => {
        if (item.type === UPGRADE_TAB.RAM || item.type === UPGRADE_TAB.STORAGE) {
          if (!listInfo[item.type]) {
            listInfo[item.type] = item
          } else {
            listInfo[item.type].name =
              `${parseInt(listInfo[item.type].name) + parseInt(item.name)} GB`
          }
        } else {
          if (!listByType[item.type]?.[item.code]) {
            if (!listByType[item.type]) {
              listByType[item.type] = {}
            }
            if (!listByType[item.type][item.code]) {
              listByType[item.type][item.code] = {
                ...item,
                value: 1
              }
            }
          } else {
            if (listByType[item.type][item.code]) {
              listByType[item.type][item.code].value += 1
            }
          }
        }
      })
      const listCPU_GPU = Object.keys(listByType).map((key) => {
        let newItem = { type: key, name: '' }
        Object.keys(listByType[key]).map((key2, index) => {
          newItem.name += `${index > 0 ? ', ' : ''}${listByType[key][key2].name}${listByType[key][key2].value > 1 ? `(x${listByType[key][key2].value})` : ''}`
        })
        return newItem
      })
      const newData: any = Object.keys(listInfo).map((key) => listInfo[key])
      setDevice({ info: [...listCPU_GPU, ...newData] })
    }
  }

  useEffect(() => {
    if (token) {
      _getUserDevice()
    }
  }, [token])

  return (
    <>
      <CustomPage>
        {/* Point */}
        <div className="">
          <div className="flex items-center justify-center space-x-2">
            <img
              className="size-9"
              src="/assets/images/point.png"
              srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
              alt="Point"
            />
            <p className="text-white font-geist font-bold text-3xl text-point">
              {userInfo?.point ? formatNumber(userInfo.point, 0, 0) : 0}
            </p>
          </div>
          <div className="mt-1 cursor-pointer" onClick={onOpen}>
            <img className="mx-auto h-240px" src="/assets/images/actor.png" alt="Actor" />
          </div>
        </div>
        {/* Button */}
        <Mining />
        {/* Info */}
        <div className="mt-6">
          <Card />
        </div>
      </CustomPage>
      <CustomModal
        title="Avatar"
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div>
          <div className="mt-6 mb-12 grid grid-cols-3 gap-4">
            {listAvatar.map((item: any) => (
              <div key={item.id} className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-6 before:border-[12px] before:border-transparent before:transition-all ${avatarActive == item.id ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}>
                <div className={`min-h-[120px] [clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] p-[1px] transition-all cursor-pointer ${avatarActive === item.id ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)]' : ''}`} onClick={() => setAvatarActive(item.id)}>
                  <img className="[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] mx-auto" src={`/assets/images/avatar/avatar-0${item.image}.png`} srcSet={`/assets/images/avatar/avatar-0${item.image}.png 1x, /assets/images/avatar/avatar-0${item.image}@2x.png 2x`} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className="btn">
            <div className="btn-border"></div>
            <div className="btn-primary">Equip Avatar</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
