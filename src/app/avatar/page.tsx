'use client'

import React, { useEffect, useState } from 'react'
import CustomPage from '../components/custom-page'
import { IconCheck, IconChevron, IconDoubleArrow } from '../components/icons'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getListAvatar, updateAvatar } from '@/services/user'
import useCommonStore from '@/stores/commonStore'
import { toast } from 'sonner'

export default function Avatar() {
  const router = useRouter()
  const { token, userInfo, getUserInfo } = useCommonStore((state) => state)
  const [listImage, setListImage] = useState<Array<string>>([])
  const [selectedImage, setSelectedImage] = useState<string>('')

  const getAvatar = async () => {
    const res = await getListAvatar()
    if (res.status) {
      setListImage(res.data)
    }
  }
  const setAvatarActive = (avatar: string) => {
    setSelectedImage(avatar)
  }

  const handleBack = () => {
    router.back()
  }

  const handleUpdateAvatar = async () => {
    const res = await updateAvatar(selectedImage)
    if (res.status) {
      toast.success('Update successfully')
      handleBack()
      getUserInfo()
    }
  }

  useEffect(() => {
    if (userInfo?.avatar) {
      setSelectedImage(userInfo?.avatar)
    }
    if (token) {
      getAvatar()
    }
  }, [token])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-[linear-gradient(to_bottom,#000_7%,#004024_21%,#000_57%,#000_92%)] after:z-[-2]"
        }}
      >
        <div className="space-y-6 xs:space-y-8 2xs:space-y-10">
          <div className="relative flex items-center justify-center space-x-4">
            <div
              className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer rotate-90"
              onClick={handleBack}
            >
              <IconChevron className="text-green-500 size-6 xs:size-7 2xs:size-8" />
            </div>
            <div className="size-1.5 bg-green-800"></div>
            <div className="text-title font-airnt font-medium text-xl xs:text-2xl">Avatar</div>
            <div className="size-1.5 bg-green-800"></div>
          </div>
          <div className="flex justify-between space-x-4">
            <div className="grid grid-cols-2 gap-1 xs:gap-2 2xs:gap-3 h-fit">
              {listImage.map((item: any) => (
                <div
                  key={item}
                  className={`relative max-w-[100px] before:content-[''] before:absolute before:top-0 before:left-0 before:size-2 xs:before:size-4 2xs:before:size-6 before:border-[6px] xs:before:border-[9px] 2xs:before:border-[12px] before:border-transparent before:transition-all ${selectedImage == item ? 'before:border-l-green-500 before:border-t-green-500 drop-shadow-green' : ''}`}
                >
                  <div
                    className={`[--path:_16px] xs:[--path:_24px] 2xs:[--path:_32px] [clip-path:_polygon(var(--path)_0,100%_0,100%_100%,0_100%,0_var(--path))] p-[1px] transition-all cursor-pointer ${selectedImage === item ? 'bg-green-500' : ''}`}
                    onClick={() => setAvatarActive(item)}
                  >
                    <Image
                      className="[--path:_16px] xs:[--path:_24px] 2xs:[--path:_32px] [clip-path:_polygon(var(--path)_0,100%_0,100%_100%,0_100%,0_var(--path))] mx-auto"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: '100%', minWidth: '100%' }}
                      src={item}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center min-w-[170px] max-w-[175px]">
              <div className="relative max-w-[140px] mx-auto">
                <div className="absolute bottom-[-5px] left-[50%] translate-x-[-50%] w-[160px] h-5 [clip-path:_ellipse(50%_50%_at_50%_50%)] bg-[radial-gradient(rgba(24,24,24,1),rgba(24,24,24,0))] z-[-1]"></div>
                <Image
                  className="h-full"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '100%' }}
                  src={userInfo?.avatar?.replace(/avatar-/g, 'figure-') || '/assets/images/avatar/figure-01@2x.png'}
                  alt="Figure"
                />
              </div>
              <div className="mt-3 space-y-2 mb-6">
                <div className="text-title font-mona text-base xs:text-lg font-semibold">Junior Engineer</div>
                <div className="text-body text-xs tracking-[-1px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </div>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="relative size-10 bg-white/10 [clip-path:_polygon(50%_0%,100%_50%,50%_100%,0%_50%)] flex items-center justify-center cursor-pointer">
                  <IconDoubleArrow className="text-body size-6" />
                </div>
                <div className="btn w-fit" onClick={handleUpdateAvatar}>
                  <div className="btn-border"></div>
                  <div className="btn-primary !p-2">
                    <IconCheck className="size-5 xs:size-6 2xs:size-[30px] text-green-900" />
                  </div>
                  <div className="btn-border"></div>
                </div>
                <div className="relative size-10 bg-white/10 [clip-path:_polygon(50%_0%,100%_50%,50%_100%,0%_50%)] flex items-center justify-center cursor-pointer">
                  <IconDoubleArrow className="text-white size-6 rotate-[180deg]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
