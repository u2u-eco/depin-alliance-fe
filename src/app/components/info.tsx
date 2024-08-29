import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { formatNumber } from '../../helper/common'
import Link from 'next/link'
import useCommonStore from '@/stores/commonStore'
import Image from 'next/image'
import CustomModal from './custom-modal'
import { getListAvatar, updateAvatar } from '@/services/user'
import { toast } from 'sonner'

interface InfoProps {
  click: () => void
}

const Info = () => {
  const pathName = usePathname()
  const { token, userInfo, getUserInfo } = useCommonStore((state) => state)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
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

  const handleUpdateAvatar = async () => {
    const res = await updateAvatar(selectedImage)
    if (res.status) {
      toast.success('Update successfully')
      onClose()
      getUserInfo()
    }
  }

  const handleOpen = () => {
    if (userInfo?.avatar) {
      setSelectedImage(userInfo?.avatar)
    }
    onOpen()
  }

  useEffect(() => {
    if (token) {
      getAvatar()
    }
  }, [token])
  return (
    <>
      <div className="relative w-fit mx-auto">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          className="mx-auto"
          src="/assets/images/info-background.svg"
          alt="Info Background"
        />
        <div className="absolute top-0 left-0 right-0 w-full p-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative" onClick={handleOpen}>
              <div className="[clip-path:_polygon(8px_0%,100%_0%,100%_100%,0_100%,0_8px)] bg-gray-800 size-16">
                <Image
                  className="size-16 [clip-path:_polygon(8px_0%,100%_0%,100%_100%,0_100%,0_8px)]"
                  src={userInfo?.avatar || '/assets/images/avatar.png'}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Avatar"
                />
              </div>
              <div className="cursor-pointer absolute bottom-0 right-0 size-6">
                <div className="border-[12px] border-r-yellow-500 border-b-yellow-500 border-l-transparent border-t-transparent"></div>
                <Image
                  className="absolute right-0.5 bottom-0.5 !size-2.5"
                  src="/assets/images/icons/icon-photo-edit.svg"
                  alt="Icon Photo Edit"
                  width={0}
                  height={0}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-white text-base font-semibold min-h-5 leading-[20px]">
                {userInfo?.username}
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/ranking" className="flex items-center space-x-1 cursor-pointer">
                  <span className="font-geist text-yellow-500">LV. {userInfo?.level}</span>
                  <Image
                    className="size-6"
                    src="/assets/images/icons/icon-chevron-right-green.svg"
                    alt="Icon Chevron"
                    width={0}
                    sizes="100vw"
                    height={0}
                  />
                </Link>
                <div className="w-[1px] h-5 bg-white/10"></div>
                <div className="flex items-center space-x-1">
                  <Image
                    className="size-5"
                    src="/assets/images/icons/icon-thunder.svg"
                    alt="Icon Thunder"
                    height={0}
                    sizes="100vw"
                    width={0}
                  />
                  <span className="font-geist text-yellow-500">{userInfo?.xp}</span>
                  <Image
                    className="size-6"
                    src="/assets/images/icons/icon-chevron-right-green.svg"
                    alt="Icon Chevron"
                    sizes="100vw"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mr-3">
            <Link href="/inventory" className="p-1">
              <Image
                className="size-6"
                src="/assets/images/icons/icon-inventory-green.svg"
                alt="Icon Ranking"
                sizes="100vw"
                width={0}
                height={0}
              />
            </Link>
            <div className="p-1">
              <Image
                className="size-6"
                src="/assets/images/icons/icon-settings-green.svg"
                alt="Icon Settings"
                sizes="100vw"
                width={0}
                height={0}
              />
            </div>
          </div>
        </div>

        <div className="absolute left-[50%] bottom-[-15px] translate-x-[-50%] flex items-center space-x-1">
          <p className="font-geist uppercase text-white tracking-[-1px]">
            {pathName !== '/home' ? 'TP:' : 'total point'}
          </p>
          {pathName !== '/home' && (
            <div className="flex items-center space-x-1">
              <Image
                className="size-5"
                src="/assets/images/point@2x.png"
                // srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                alt="Point"
                sizes="100vw"
                width={0}
                height={0}
              />
              <div className="text-point font-geist text-base font-bold">
                {' '}
                {userInfo?.point ? formatNumber(userInfo.point, 0, 0) : 0}
              </div>
            </div>
          )}
        </div>
      </div>
      <CustomModal title="Avatar" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div>
          <div className="mt-6 mb-12 grid grid-cols-3 gap-4">
            {listImage.map((item: any) => (
              <div
                key={item}
                className={`relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-6 before:border-[12px] before:border-transparent before:transition-all ${selectedImage == item ? 'before:border-l-green-500 before:border-t-green-500' : ''}`}
              >
                <div
                  className={`min-h-[120px] [clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] p-[1px] transition-all cursor-pointer ${selectedImage === item ? 'bg-green-500 shadow-[0_0_16px_rgba(0,153,86,0.5)]' : ''}`}
                  onClick={() => setAvatarActive(item)}
                >
                  <Image
                    className="[clip-path:_polygon(32px_0,100%_0,100%_100%,0_100%,0_32px)] mx-auto"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: '100%', minWidth: '112px' }}
                    src={item}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="btn" onClick={handleUpdateAvatar}>
            <div className="btn-border"></div>
            <div className="btn-primary">Equip Avatar</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default Info
