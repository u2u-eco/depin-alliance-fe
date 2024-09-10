'use client'

import React from 'react'
import CustomList from '../components/custom-list'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import useCommonStore from '@/stores/commonStore'
import { TELE_URI } from '@/constants'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { getUserFriend } from '@/services/user'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// const listFriend = {
//   title: 'FRIEND LIST',
//   data: [
//     { id: 1, image: 'user-01', title: 'DojaDoja26', point: '5,000' },
//     { id: 2, image: 'user-02', title: 'Tornando L', point: '5,000' },
//     { id: 3, image: 'user-03', title: 'Artisian', point: '5,000' }
//   ]
// }

export default function InvitePage() {
  const { userInfo, token } = useCommonStore()
  const { data: listFriend } = useQuery({
    queryKey: ['fetchListFriend'],
    queryFn: () => getUserFriend(),
    enabled: Boolean(token)
  })

  const handleCopy = () => {
    if (userInfo) {
      toast.success('Copied!')
    }
  }
  const handleShare = () => {
    if (userInfo) {
      window.open(
        `https://t.me/share/url?url=${TELE_URI}?start=${userInfo.code}&text=🤝 Let's contribute together, we can make it! The revolution has begun, 👉 Start now: ${TELE_URI}?start=${userInfo.code}`,
        '_self'
      )
    }
    // webApp?.shareToStory('https://dogx.io/assets/images/layouts/giveaway.jpg')
  }
  return (
    <>
      <CustomPage>
        <div className="relative w-full max-w-[400px] mx-auto before:content-[''] before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:bg-yellow-300 before:w-[145px] before:h-[5px] before:z-[2] before:[clip-path:_polygon(0_0,100%_0,calc(100%_-_5px)_100%,5px_100%)]">
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
            <div className="px-3 xs:px-4 py-3 xs:py-4 min-[400px]:py-5 2xs:py-6">
              <div className="flex items-center justify-between min-[400px]:justify-center space-x-1 min-[400px]:space-x-3 2xs:space-x-4">
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                <p className="text-title font-airnt font-medium text-[15px] min-[355px]:text-base xs:text-lg 2xs:text-xl leading-[20px] 2xs:leading-[24px] text-center uppercase tracking-[1px]">
                  Invite friends and earn more rewards
                </p>
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              </div>
              <div className="mt-2 mb-2 min-[344px]:mb-3 xs:mb-4 min-[400px]:mb-5 2xs:mb-6 text-center text-body text-xs min-[400px]:text-[13px] 2xs:text-sm font-geist tracking-[-1px]">
                Refer your friends to get a luck box and earn 10% each time they claim mining.
              </div>
              <div className="flex items-center space-x-3 xs:space-x-4">
                <div className="btn" onClick={handleShare}>
                  <div className="btn-border"></div>
                  {/* href={`https://t.me/share/url?url=${uriCopy}?start=${user?.code}&text=Hello! Welcome to Depin Alliance`} */}
                  <div className="btn-primary max-[399px]:!py-3 max-[354px]:text-sm max-[354px]:!py-2">
                    INVITE FRIEND
                  </div>
                  <div className="btn-border"></div>
                </div>
                <CopyToClipboard text={`${TELE_URI}?start=${userInfo?.code}`} onCopy={handleCopy}>
                  <div className="btn w-fit">
                    <div className="btn-border"></div>
                    <div className="btn-default !p-2">
                      <Image
                        className="size-8 max-[399px]:size-7 max-[354px]:size-5 min-w-8 max-[399px]:min-w-7 max-[354px]:min-w-5"
                        src="/assets/images/icons/icon-copy-gradient.svg"
                        alt="Icon Copy"
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    </div>
                    <div className="btn-border"></div>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
        {listFriend?.data.length > 0 ? (
          <CustomList
            type="invite"
            title="FRIEND LIST"
            data={listFriend?.data}
            titleItemKey="username"
            pointKey="pointRef"
            imageItemKey="avatar"
          />
        ) : null}
      </CustomPage>
    </>
  )
}
