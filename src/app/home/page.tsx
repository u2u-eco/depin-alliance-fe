'use client'

import React, { useEffect } from 'react'
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

export default function HomePage() {
  const { token, userInfo, setDevice } = useCommonStore()

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
          <div className="mt-1">
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
    </>
  )
}
