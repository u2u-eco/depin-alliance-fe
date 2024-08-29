'use client'

import React from 'react'
import CustomList from '../components/custom-list'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import useCommonStore from '@/stores/commonStore'
import { TELE_URI } from '@/constants'

const listFriend = {
  title: 'FRIEND LIST',
  data: [
    { id: 1, image: 'user-01', title: 'DojaDoja26', point: '5,000' },
    { id: 2, image: 'user-02', title: 'Tornando L', point: '5,000' },
    { id: 3, image: 'user-03', title: 'Artisian', point: '5,000' }
  ]
}

export default function InvitePage() {
  const { userInfo } = useCommonStore()

  const handleShare = () => {
    window.open(
      `https://t.me/share/url?url=${TELE_URI}?start=${userInfo?.code}&text=Hello! Welcome to Depin Alliance`,
      '_self'
    )
    // webApp?.shareToStory('https://dogx.io/assets/images/layouts/giveaway.jpg')
  }
  return (
    <>
      <CustomPage>
        <div className="relative w-fit mx-auto before:content-[''] before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:bg-yellow-300 before:w-[145px] before:h-[5px] before:z-[2] before:[clip-path:_polygon(0_0,100%_0,calc(100%_-_5px)_100%,5px_100%)]">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/assets/images/invite/invite-frame.svg"
            alt="Invite Frame"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="absolute top-0 left-0 right-0 w-full h-full border border-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:border-t-yellow-300 before:border-l-yellow-300 after:content-[''] after:absolute after:top-0 after:right-0 after:size-5 after:border-[10px] after:border-transparent after:border-t-yellow-300 after:border-r-yellow-300">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              src="/assets/images/invite/invite-image.png"
              // srcSet="/assets/images/invite/invite-image.png 1x, /assets/images/invite/invite-image@2x.png 2x"
              alt="Invite Image"
            />
            <div className="px-4 py-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                <a className="text-title font-airnt font-medium text-xl leading-[24px] text-center uppercase tracking-[1px]">
                  Invite friends and earn more rewards
                </a>
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              </div>
              <div className="mt-2 mb-6 text-center text-body font-geist tracking-[-1px]">
                Earn 10,000 points each for the first 5 friends
              </div>
              <div className="flex items-center space-x-4">
                <div className="btn" onClick={handleShare}>
                  <div className="btn-border"></div>
                  {/* href={`https://t.me/share/url?url=${uriCopy}?start=${user?.code}&text=Hello! Welcome to Depin Alliance`} */}
                  <div className="btn-primary">INVITE FRIEND</div>
                  <div className="btn-border"></div>
                </div>
                <div className="btn w-fit">
                  <div className="btn-border"></div>
                  <div className="btn-default !p-2">
                    <Image
                      className="size-8 min-w-8"
                      src="/assets/images/icons/icon-copy-gradient.svg"
                      alt="Icon Copy"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                  <div className="btn-border"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomList type="invite" title={listFriend.title} data={listFriend.data} />
      </CustomPage>
    </>
  )
}
