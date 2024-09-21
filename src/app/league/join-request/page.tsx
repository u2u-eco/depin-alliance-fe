'use client'

import CustomPage from '@/app/components/custom-page'
import NoItem from '@/app/components/ui/no-item'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CustomHeader } from '@/app/components/ui/custom-header'
import MemberItem from '../components/member-item'
import { useQuery } from '@tanstack/react-query'
import { approveJoinLeague, getListJoinRequest, rejectJoinLeague } from '@/services/league'
import { useInView } from 'react-intersection-observer'
import { IJoinRequest } from '@/interfaces/i.league'
import { toast } from 'sonner'
import { MAX_SIZE_PER_PAGE, PAGE_SIZE, TELE_URI } from '@/constants'
import Loader from '@/app/components/ui/loader'
import CustomToast from '@/app/components/ui/custom-toast'
import useCommonStore from '@/stores/commonStore'
import { formatNumber } from '@/helper/common'

export default function JoinRequestPage() {
  const maxPage = useRef<number>(0)
  const { currentLeague } = useCommonStore()
  const [page, setPage] = useState<number>(1)
  const [listItem, setListItem] = useState<IJoinRequest[]>([])
  const dataList = useRef<IJoinRequest[]>([])
  const [scrollTrigger, isInView] = useInView()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const isUpdatePage = useRef<boolean>(false)
  useQuery({
    queryKey: ['getListDevice', page],
    queryFn: async () => {
      try {
        if (isUpdatePage.current) return
        setIsLoading(true)
        const res: any = await getListJoinRequest({ page, size: PAGE_SIZE })
        if (res.pagination?.totalPage) {
          maxPage.current = res.pagination?.totalPage
        }
        setTotal(res?.pagination?.totalRecord || 0)
        if (page !== res.pagination.page) {
          setIsLoading(false)
          return []
        }
        let _listItem = res.data

        if (page > 1) {
          _listItem = [...dataList.current, ...res.data]
        }
        dataList.current = _listItem
        setListItem(dataList.current)
        setIsLoading(false)
        return res
      } catch (ex) {
        setIsLoading(false)
      }
    },
    enabled: Boolean(currentLeague?.isOwner)
  })

  const handleUpdateData = async (index: number) => {
    setIsLoading(true)
    isUpdatePage.current = true
    const currentPage = Math.floor(index / PAGE_SIZE)
    setPage(currentPage + 1)

    const res: any = await getListJoinRequest({
      page: currentPage + 1,
      size: PAGE_SIZE
    })

    if (res.status) {
      setTotal(res?.pagination?.totalRecord || 0)
      dataList.current.splice(currentPage * PAGE_SIZE, dataList?.current?.length, ...res.data)
      setListItem(dataList.current)
    }
    isUpdatePage.current = false
    setIsLoading(false)
  }

  const handleApprove = async (id: number, index: number) => {
    const res = await approveJoinLeague(id)
    if (res?.status) {
      toast.dismiss()
      toast.success(<CustomToast title="Accept member successfully" type="success" />)
      handleUpdateData(index)
    }
  }

  const handleReject = async (id: number, index: number) => {
    const res = await rejectJoinLeague(id)
    if (res?.status) {
      toast.dismiss()
      toast.success(<CustomToast title="Decline member successfully" type="success" />)
      handleUpdateData(index)
    }
  }

  const handleInvite = () => {
    if (currentLeague?.inviteLink) {
      window.open(
        `https://t.me/share/url?url=${TELE_URI}?start=${currentLeague.inviteLink}&text=🔰 Let's unite and make a difference!, 👉 Join now: ${TELE_URI}?start=${currentLeague.inviteLink}`,
        '_self'
      )
    }
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
            "before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-205px] before:size-[355px] before:rounded-[50%] before:bg-yellow-500 before:blur-[75px] before:opacity-30 before:z-[-1]"
        }}
      >
        <div className="space-y-6 xs:space-y-8">
          <CustomHeader title="JOIN REQUEST" />
          <div className="space-y-5 xs:space-y-6">
            <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] uppercase">
              ALL REQUESTS ({formatNumber(total, 0, 0)})
            </p>
            {isLoading && (
              <Loader
                classNames={{
                  wrapper: 'z-[1] left-[0] absolute bg-black/30 h-[100vh] top-0',
                  icon: 'w-[45px] h-[45px] text-white'
                }}
              />
            )}
            {listItem.length === 0 && !isLoading ? (
              <NoItem title="Not a request yet" action={handleInvite} textLink="INVITE NOW" />
            ) : (
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex flex-col space-y-3 2xs:space-y-4">
                  {listItem.map((item: any, index: number) => (
                    <MemberItem
                      key={index}
                      item={item}
                      type="request"
                      handleCheck={(id: number) => handleApprove(id, index)}
                      handleCancel={(id: number) => handleReject(id, index)}
                    />
                  ))}
                  <div ref={scrollTrigger} className="text-[transparent]">
                    Loading...
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CustomPage>
    </>
  )
}
