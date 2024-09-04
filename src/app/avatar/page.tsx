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
        <div className="space-y-10">
          <div className="relative flex items-center justify-center space-x-4">
            <div
              className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer rotate-90"
              onClick={handleBack}
            >
              <IconChevron className="text-green-500" />
            </div>
            <div className="size-1.5 bg-green-800"></div>
            <div className="text-title font-airnt font-medium text-xl xs:text-2xl">Avatar</div>
            <div className="size-1.5 bg-green-800"></div>
          </div>
          <div className="flex space-x-4">
            <div className="grid grid-cols-2 gap-3 h-fit">
              {listImage.map((item: any) => (
                <div
                  key={item}
                  className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-6 before:border-[12px] before:border-transparent before:transition-all ${selectedImage == item ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
                >
                  <div
                    className={`[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] p-[1px] transition-all cursor-pointer ${selectedImage === item ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)]' : ''}`}
                    onClick={() => setAvatarActive(item)}
                  >
                    <Image
                      className="[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] mx-auto"
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
            <div className="text-center min-w-[170px]">
              <div className="relative min-h-[320px] max-w-[120px] mx-auto">
                <div className="absolute bottom-[-5px] left-[50%] translate-x-[-50%] w-[160px] h-5 [clip-path:_ellipse(50%_50%_at_50%_50%)] bg-[radial-gradient(rgba(24,24,24,1),rgba(24,24,24,0))] z-[-1]"></div>
                <img
                  className="h-full object-cover"
                  src="/assets/images/figure.png"
                  srcSet="/assets/images/figure.png 1x, /assets/images/figure@2x.png 2x"
                  alt=""
                />
              </div>
              <div className="mt-3 space-y-2 mb-6">
                <div className="text-title font-mona text-lg font-semibold">Cyber Girl</div>
                <div className="text-body text-xs tracking-[-1px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </div>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="relative size-10 bg-white/10 rotate-45 flex items-center justify-center cursor-pointer">
                  <IconDoubleArrow className="text-body size-6 -rotate-45" />
                </div>
                <div className="btn w-fit" onClick={handleUpdateAvatar}>
                  <div className="btn-border"></div>
                  <div className="btn-primary !p-[9px]">
                    <IconCheck className="size-[30px] text-green-900" />
                  </div>
                  <div className="btn-border"></div>
                </div>
                <div className="relative size-10 bg-white/10 rotate-45 flex items-center justify-center cursor-pointer">
                  <IconDoubleArrow className="text-white size-6 rotate-[135deg]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
