"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'

const listSetting = [
  { id: 1, image: 'wallet', title: 'Connect Wallet', text: 'UQBC4...9BGL', icon: 'open-link' },
  { id: 2, image: 'language', title: 'Language', text: 'ENG', icon: 'open-link' },
  { id: 3, image: 'sound', title: 'Sound Effect', text: 'Turn off', icon: 'open-link' },
  { id: 4, image: 'feedback', title: 'Send Feedback', text: 'Report bugs, errors,...', icon: 'open-link' },
  { id: 5, image: 'logout', title: 'Log Out', text: 'Quit this account', icon: 'open-link' },
]

export default function SettingPage() {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
        <div className="relative flex items-center justify-center space-x-4">
          <div className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer">
            <Image
              onClick={handleBack}
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src="/assets/images/icons/icon-chevron-left-green.svg"
              alt="Icon Chevron"
            />
          </div>
          <div className="size-1.5 bg-green-800"></div>
          <div className="text-title font-airnt font-medium text-2xl">Setting</div>
          <div className="size-1.5 bg-green-800"></div>
        </div>
        <div>
          <div className="my-8">
            <div className="space-y-4">
              {listSetting.map((item: any) => (
                <div className="relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:size-8 before:border-[16px] before:border-transparent before:border-b-white/5 before:border-r-white/5" key={item.id}>
                  <div className="p-2 flex items-center justify-between [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_46px),calc(100%_-_46px)_100%,0_100%,0_20px)] bg-white/5">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center size-[72px] bg-white/10 [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)]">
                        <img className="size-9" src={`/assets/images/icons/icon-${item.image}-gradient.svg`} alt="" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-white font-mona font-semibold text-lg leading-[22px]">{item.title}</div>
                        <div className="text-body text-base tracking-[-1px] leading-[20px">{item.text}</div>
                      </div>
                    </div>
                    <div className="mr-3">
                      <img className="size-9" src={`/assets/images/icons/icon-${item.icon}-green.svg`} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img className="mx-auto" src="/assets/images/navbar-frame.svg" alt="" />
        </div>
      </CustomPage>
      <CustomModal
        title="Equip"
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div></div>
      </CustomModal>
    </>
  )
}
