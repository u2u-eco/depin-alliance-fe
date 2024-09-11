'use client'

import React, { useEffect, useRef, useState } from 'react'
import CustomPage from '../components/custom-page'
import Image from 'next/image'
import CustomList from '../components/custom-list'
import { useDisclosure } from '@nextui-org/react'
import CustomModal from '../components/custom-modal'
import { useQuery } from '@tanstack/react-query'
import { getListLeague, userLeague } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import CustomButton from '../components/button'
import CreateLeague from './components/create-league'
import JoinLeague from './components/join-league'
import { ILeagueItem } from '@/interfaces/i.league'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'

const LEAGUE_TYPE = {
  JOIN: 'join',
  CREATE: 'create'
}

export default function LeaguePage() {
  const { token, setCurrentLeague } = useCommonStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [type, setType] = useState(LEAGUE_TYPE.CREATE)
  const router = useRouter()
  const [scrollTrigger, isInView] = useInView()
  const currentItem = useRef<ILeagueItem | null>(null)
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const dataList = useRef<ILeagueItem[]>([])
  const [listItem, setListItem] = useState<ILeagueItem[]>([])
  const { isLoading, refetch } = useQuery({
    queryKey: ['fetchListLeague', page],
    queryFn: async () => {
      const res: any = await getListLeague({ page })
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
    },
    enabled: Boolean(token)
  })

  const getUserLeague = async () => {
    const res = await userLeague()
    if (res.status && res.data) {
      setCurrentLeague({ league: res.data })
      router.push('/league/in-league')
    }
  }

  const handleCreateLeague = () => {
    setType(LEAGUE_TYPE.CREATE)
    onOpen()
  }

  const handleClickItem = (item: any) => {
    currentItem.current = item
    setType(LEAGUE_TYPE.JOIN)
    onOpen()
  }

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView])

  useEffect(() => {
    if (token) {
      getUserLeague()
    }
  }, [token])

  return (
    <>
      <CustomPage>
        <div className="relative w-full max-w-[400px] mx-auto before:content-[''] before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:bg-green-300 before:w-[120px] xs:before:w-[145px] before:h-[5px] before:z-[2] before:[clip-path:_polygon(0_0,100%_0,calc(100%_-_5px)_100%,5px_100%)]">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/assets/images/league/league-frame.svg"
            alt="League Frame"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="absolute top-0 left-0 right-0 w-full h-full border border-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:size-4 xs:before:size-5 before:border-[8px] xs:before:border-[10px] before:border-transparent before:border-t-green-300 before:border-l-green-300 after:content-[''] after:absolute after:top-0 after:right-0 after:size-4 xs:after:size-5 after:border-[8px] xs:after:border-[10px] after:border-transparent after:border-t-green-300 after:border-r-green-300">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              src="/assets/images/league/league-image.png"
              // srcSet="/assets/images/league/league-image.png 1x, /assets/images/league/league-image@2x.png 2x"
              alt="League Image"
            />
            <div className="px-3 xs:px-4 py-3 xs:py-4 min-[400px]:py-5 2xs:py-6">
              <div className="flex items-center justify-between min-[400px]:justify-center space-x-1 min-[400px]:space-x-3 2xs:space-x-4">
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                <p className="text-title font-airnt font-medium text-[15px] min-[355px]:text-base xs:text-lg 2xs:text-xl leading-[20px] 2xs:leading-[24px] text-center uppercase tracking-[1px]">
                  join LEAGUE now
                </p>
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              </div>
              <div className="mt-2 mb-4 xs:mb-6 text-xs min-[355px]:text-[13px] xs:text-sm text-center text-body font-geist tracking-[-1px]">
                Let’s join the League or create a new League to contribute together!
              </div>
              <CustomButton title="CREATE LEAGUE" onAction={handleCreateLeague} />
            </div>
          </div>
        </div>
        {listItem.length > 0 ? (
          <>
            <CustomList
              type="league"
              title="All Leagues"
              data={listItem}
              titleItemKey="name"
              imageItemKey="avatar"
              pointKey="totalMining"
              onClickItem={handleClickItem}
            />
            <div ref={scrollTrigger} className="text-[transparent]">
              Loading...
            </div>
          </>
        ) : null}
      </CustomPage>

      <CustomModal
        title={type === LEAGUE_TYPE.JOIN ? 'Join LEAGUE' : 'CREATE LEAGUE'}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div>
          {type === LEAGUE_TYPE.JOIN ? (
            <JoinLeague item={currentItem.current} onClose={onClose} joinCb={getUserLeague} />
          ) : (
            <CreateLeague onClose={onClose} />
          )}
        </div>
      </CustomModal>
    </>
  )
}
