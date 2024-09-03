'use client'

import React, { useEffect, useRef } from 'react'
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
import Link from 'next/link'
import { IconPoint } from '../components/icons'

export default function HomePage() {
  const { token, userInfo, setDevice } = useCommonStore()
  const totalDevice = useRef<number>(0)

  useUserInfo()

  // const handleShare = () => {
  //   webApp?.shareToStory('https://story-images.depinalliance.xyz/giveaway.jpg?huongcoho')
  // }

  const _getListDevice = async () => {
    const listDevice: any = await getListDevice()
    if (listDevice.status) {
      const data: Array<IUserDeviceItem> = listDevice.data
      _getUserDevice(data[0].index)
      totalDevice.current = data?.length
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
        info: [...listCPU_GPU, ...newData]
      })
    }
  }

  useEffect(() => {
    if (token) {
      _getListDevice()
    }
  }, [token])

  return (
    <>
      <CustomPage>
        {/* Point */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 w-full z-[-1]">
            <img className="mx-auto" src="/assets/images/home-frame.svg" alt="Frame" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="relative">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-6 xs:size-7 min-[400px]:size-8 rounded-[50%] bg-[rgba(0,255,144,0.15)] shadow-[0_0_12px_rgba(0,255,144,0.45)] z-[-1]">
                <div className="size-full rounded-[50%] bg-[rgba(255,255,255,1)]/20 blur-[4px]"></div>
              </div>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="size-7 xs:size-8 min-[400px]:size-9"
                src="/assets/images/point@2x.png"
                // srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                alt="Point"
              />
            </div>
            <p className="text-white font-geist font-bold text-2xl xs:text-[26px] min-[400px]:text-3xl text-point">
              {userInfo?.point ? formatNumber(userInfo.point, 0, 0) : 0}
            </p>
          </div>
          <div className="mt-4 w-fit mx-auto cursor-pointer">
            <Image
              className="mx-auto max-w-[200px] min-w-[200px] xs:max-w-[240px] xs:min-w-[240px] xs:min-h-[260px]"
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
          {/* <Card /> */}
          <div className="relative w-fit mx-auto">
            <img src="/assets/images/workspace/workspace-frame.svg" alt="Frame" />
            <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center space-x-3 xs:space-x-4 p-3 xs:p-4">
              <div className="relative">
                <div className="absolute top-[10px] left-[50%] translate-x-[-50%] size-[67px] bg-green-500/65 blur-[75px] rounded-[50%]"></div>
                <img
                  className="size-[110px] xs:size-[120px] min-[400px]:size-[130px] 2xs:size-[140px]"
                  src="/assets/images/workspace/workspace-image.png"
                  srcSet="/assets/images/workspace/workspace-image.png 1x, /assets/images/workspace/workspace-image@2x.png 2x"
                  alt=""
                />
              </div>
              <div className="space-y-2 xs:space-y-4 2xs:space-y-6">
                <div className="space-y-2 2xs:space-y-3">
                  <div className="text-white font-airnt font-medium text-[15px] xs:text-base tracking-[1px]">
                    Workspace
                  </div>
                  <div className="flex items-center space-x-2 xs:space-x-4 2xs:space-x-6">
                    <div className="space-y-1 xs:space-y-2">
                      <div className="text-body text-[11px] xs:text-xs uppercase">TOTAL PROFIT:</div>
                      <div className="flex items-center space-x-1">
                        <IconPoint className="size-4" />
                        <p className="text-green-500 font-semibold text-[13px] xs:text-sm">
                          {userInfo?.miningPower
                            ? `${formatNumber(userInfo.miningPower, 0, 0)}/h`
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/25 w-[1px] h-9"></div>
                    <div className="space-y-1 xs:space-y-2">
                      <div className="text-body text-[11px] xs:text-xs uppercase">DEVICE:</div>
                      <div className="flex items-center space-x-1">
                        <img
                          src="/assets/images/icons/icon-device-gray.svg"
                          alt=""
                          className="size-4"
                        />
                        <p className="text-green-500 font-semibold text-[13px] xs:text-sm">{totalDevice.current}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/workspace" className="flex items-center space-x-1">
                  <div className="text-gradient uppercase font-mona font-semibold text-[13px] xs:text-sm">VIEW DETAIL</div>
                  <img
                    src="/assets/images/icons/icon-open-link-gradient.svg"
                    alt=""
                    className="size-5 xs:size-6"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
