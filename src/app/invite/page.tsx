'use client'

import React, { useEffect, useRef, useState } from 'react'
import CustomList from '../components/custom-list'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import useCommonStore from '@/stores/commonStore'
import { TELE_URI } from '@/constants'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { getUserFriend } from '@/services/user'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useInView } from 'react-intersection-observer'
import Loader from '../components/ui/loader'
import CustomToast from '../components/ui/custom-toast'
import { formatNumber } from '@/helper/common'
import CustomButton from '../components/button'
import { useAppSound } from '@/hooks/useAppSound'

export default function InvitePage() {
  const { userInfo } = useCommonStore()

  const { buttonSound } = useAppSound()
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const [scrollTrigger, isInView] = useInView()
  const dataList = useRef<any[]>([])
  const [listItem, setListItem] = useState<any[]>([])
  const { data: listFriend, isLoading } = useQuery({
    queryKey: ['fetchListFriend', page],
    queryFn: async () => {
      const res: any = await getUserFriend({ page, size: 10 })
      if (res.pagination?.totalPage) {
        maxPage.current = res.pagination?.totalPage
      }
      if (page !== res.pagination.page) return []
      let _listItem = res.data

      if (page > 1) {
        _listItem = [...dataList.current, ...res.data]
      }
      dataList.current = _listItem
      setListItem(dataList.current)
      return res
    }
  })

  const handleCopy = () => {
    if (userInfo) {
      buttonSound.play()
      toast.success(<CustomToast type="success" title="Copied!" />)
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

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:rotate-[-15deg] before:rounded-full before:bg-yellow-500 before:opacity-30 before:z-[-1] before:blur-[55px] before:w-[120px] before:h-[400px]"
        }}
      >
        {isLoading && (
          <Loader
            classNames={{
              wrapper: 'z-[1] left-[0] absolute bg-black/30 h-[100vh] top-0',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
        <div className="relative w-full max-w-[400px] mx-auto before:content-[''] before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:bg-yellow-300 before:w-[120px] xs:before:w-[145px] before:h-[5px] before:z-[2] before:[clip-path:_polygon(0_0,100%_0,calc(100%_-_5px)_100%,5px_100%)]">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/assets/images/invite/invite-frame.svg"
            alt="Invite Frame"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="absolute top-0 left-0 right-0 w-full h-full border border-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:size-4 xs:before:size-5 before:border-[8px] xs:before:border-[10px] before:border-transparent before:border-t-yellow-300 before:border-l-yellow-300 after:content-[''] after:absolute after:top-0 after:right-0 after:size-4 xs:after:size-5 after:border-[8px] xs:after:border-[10px] after:border-transparent after:border-t-yellow-300 after:border-r-yellow-300">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              src="/assets/images/invite/invite-image.png"
              // srcSet="/assets/images/invite/invite-image.png 1x, /assets/images/invite/invite-image@2x.png 2x"
              alt="Invite Image"
            />
            <div className="px-3 xs:px-4 py-3 xs:py-4 2xs:py-5">
              <div className="flex items-center justify-between min-[400px]:justify-center space-x-1 min-[400px]:space-x-3 2xs:space-x-4">
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                <p className="text-title font-airnt font-medium text-[15px] min-[355px]:text-base xs:text-lg 2xs:text-xl !leading-[20px] 2xs:!leading-[24px] text-center uppercase tracking-[1px]">
                  Invite friends and earn more rewards
                </p>
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              </div>
              <div className="mt-2 mb-2 min-[344px]:mb-3 xs:mb-3.5 2xs:mb-5 text-center text-body text-xs min-[400px]:text-[13px] 2xs:text-sm !leading-[16px] xs:!leading-[18px] font-geist tracking-[-1px]">
                Refer your friends to get a luck box and earn 10% each time they claim mining.
              </div>
              <div className="flex items-center space-x-3 xs:space-x-4">
                <CustomButton title="INVITE FRIEND" onAction={handleShare} />

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

        {listItem?.length > 0 ? (
          <div>
            <CustomList
              type="invite"
              title={`FRIEND LIST (${formatNumber((listFriend as any)?.pagination?.totalRecord || 0, 0, 0)})`}
              data={listItem}
              titleItemKey="username"
              pointKey="pointRef"
              imageItemKey="avatar"
            />
            <div ref={scrollTrigger} className="text-[transparent]">
              Loading...
            </div>
          </div>
        ) : null}
      </CustomPage>
    </>
  )
}
