"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'
import Link from 'next/link'

const SETTING_TYPE = {
  WALLET: 'wallet',
  LANGUAGE: 'language',
  SOUND: 'sound',
  FEEDBACK: 'feedback',
  LOGOUT: 'logout',
}

const listSetting = [
  { id: 1, image: SETTING_TYPE.WALLET, title: 'Connect Wallet', text: 'UQBC4...9BGL', icon: 'link' },
  { id: 2, image: SETTING_TYPE.LANGUAGE, title: 'Language', text: 'ENG', icon: 'open-link' },
  { id: 3, image: SETTING_TYPE.SOUND, title: 'Sound Effect', text: 'Turn off', icon: 'open-link' },
  { id: 4, image: SETTING_TYPE.FEEDBACK, title: 'Send Feedback', text: 'Report bugs, errors,...', icon: 'open-link' },
  { id: 5, image: SETTING_TYPE.LOGOUT, title: 'Log Out', text: 'Quit this account', icon: 'open-link' },
]

const listSocial = [
  { id: 1, icon: 'facebook', link: '#' },
  { id: 2, icon: 'x', link: '#' },
  { id: 3, icon: 'discord', link: '#' },
  { id: 4, icon: 'telegram', link: '#' },
]

export default function SettingPage() {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeSound, setActiveSound] = useState(false)
  const [type, setType] = useState(SETTING_TYPE.WALLET)
  const handleBack = () => {
    router.back()
  }
  const handleClick = (type: string) => {
    switch(type) {
      case SETTING_TYPE.WALLET:
        setType(SETTING_TYPE.WALLET)
        onOpen()
        break
      case SETTING_TYPE.LANGUAGE:
        console.log(111);
        break
      case SETTING_TYPE.SOUND:
        setActiveSound(!activeSound)
        break
      case SETTING_TYPE.FEEDBACK:
        console.log(111);
        break
      case SETTING_TYPE.LOGOUT:
        console.log(111);
        break
    }
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
                    <div className="mr-3 cursor-pointer" onClick={() => handleClick(item.image)}>
                      {item.image === SETTING_TYPE.SOUND ? (
                        <div className={`relative size-6 rotate-45 border-2 border-green-700 transition-all ${activeSound ? 'bg-white/10' : ''}`}>
                          <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] size-3 bg-gradient transition-all opacity-0 ${activeSound ? 'opacity-100' : ''}`}></div>
                        </div>
                      ) : (
                        <img className="size-9" src={`/assets/images/icons/icon-${item.icon}-green.svg`} alt="" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img className="mx-auto" src="/assets/images/navbar-frame.svg" alt="" />
          <div className="flex items-center space-x-4 mt-6 mb-4">
            {listSocial.map((item: any) => (
              <Link href={item.link} className="btn default" target="_blank" key={item.id}>
                <div className="btn-border"></div>
                <div className="btn-default !py-5">
                  <img className="size-[30px] mx-auto" src={`/assets/images/icons/icon-${item.icon}-white.svg`} alt="" />
                </div>
                <div className="btn-border"></div>
              </Link>
            ))}
          </div>
          <div className="text-center text-body text-xs tracking-[-1px]">2024 ©. DePIN Alliance. All right reserved</div>
        </div>
      </CustomPage>
      <CustomModal
        title={type === SETTING_TYPE.WALLET ? 'Disconnect' : type === SETTING_TYPE.LANGUAGE ? 'Language' : 'Log Out'}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        {type !== SETTING_TYPE.LANGUAGE ? (
          <div>
            <div className=" text-body text-base tracking-[-1px] text-center">
              {type === SETTING_TYPE.WALLET ? (
                <p>Are you sure you want to disconnect this wallet?</p>
              ) : (
                <p>Are you sure you want to log out this account?</p>
              )}
            </div>
            <div className="my-8 space-x-4 flex items-center justify-center">
              <div className={`p-[1px] size-[90px] [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-cente ${type === SETTING_TYPE.WALLET ? 'bg-white/10' : 'bg-white'}`}></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="btn error">
                <div className="btn-border"></div>
                <div className="btn-error">{type === SETTING_TYPE.WALLET ? 'Disconnect' : 'Log Out'}</div>
                <div className="btn-border"></div>
              </div>
              <div className="btn default" onClick={onClose}>
                <div className="btn-border"></div>
                <div className="btn-default">Cancel</div>
                <div className="btn-border"></div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </CustomModal>
    </>
  )
}
