'use client'

import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { formatNumber } from '../../helper/common'
import Mining from './components/minning'
import { getListDevice, getUserDevice } from '../../services/devices'
import CustomPage from '../components/custom-page'
import useCommonStore from '@/stores/commonStore'
import { IDeviceTypeItem, IUserDeviceItem } from '@/interfaces/i.devices'
import { UPGRADE_TAB } from '@/constants'
import { useUserInfo } from '@/hooks/useUserInfo'
import Image from 'next/image'
import { useTelegram } from '@/hooks/useTelegram'

export default function HomePage() {
  const { token, userInfo, setDevice } = useCommonStore()
  const { webApp } = useTelegram()

  useUserInfo()

  const handleShare = () => {
    webApp?.shareToStory('https://story-images.depinalliance.xyz/giveaway.jpg?huongcoho')
  }

  const _getListDevice = async () => {
    const listDevice: any = await getListDevice()
    if (listDevice.status) {
      const data: Array<IUserDeviceItem> = listDevice.data
      _getUserDevice(data[0].index)
    }
  }

  const _getUserDevice = async (index: number) => {
    const res = await getUserDevice(index)
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
      setDevice({
        info: [
          {
            type: 'Profit',
            name: `${userInfo?.miningPower ? formatNumber(userInfo?.miningPower, 0, 0) : 0}/h`
          },
          ...listCPU_GPU,
          ...newData
        ]
      })
    }
  }

  useEffect(() => {
    if (token && userInfo) {
      _getListDevice()
    }
  }, [token, userInfo])

  return (
    <>
      <CustomPage>
        {/* Point */}
        <div className="">
          <div className="flex items-center justify-center space-x-2">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="size-9"
              src="/assets/images/point@2x.png"
              // srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
              alt="Point"
            />
            <p className="text-white font-geist font-bold text-3xl text-point">
              {userInfo?.point ? formatNumber(userInfo.point, 0, 0) : 0}
            </p>
          </div>
          <div className="mt-1 cursor-pointer" onClick={handleShare}>
            <Image
              className="mx-auto h-240px"
              width={0}
              height={240}
              sizes="100vw"
              style={{ width: '100%' }}
              src="/assets/images/actor.png"
              alt="Actor"
            />
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
