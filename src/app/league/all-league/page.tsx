'use client'

import CustomPage from '@/app/components/custom-page'
import { CustomHeader } from '@/app/components/ui/custom-header'
import CustomInputSearch from '@/app/components/ui/custom-input-search'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import CustomList from '@/app/components/custom-list'
import { useInView } from 'react-intersection-observer'
import { ILeagueItem } from '@/interfaces/i.league'
import { useQuery } from '@tanstack/react-query'
import { getListLeagueAll } from '@/services/league'
import NoItem from '@/app/components/ui/no-item'
import { useRouter } from 'next/navigation'
import Loader from '@/app/components/ui/loader'
import LastUpdateBox from '@/app/components/last-update-box'

export default function AllLeaguePage() {
  const router = useRouter()
  const [scrollTrigger, isInView] = useInView()
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const dataList = useRef<ILeagueItem[]>([])
  const timeoutSearch = useRef<any>(null)
  const [search, setSearch] = useState<string>('')
  const [listItem, setListItem] = useState<ILeagueItem[]>([])
  const { isLoading } = useQuery({
    queryKey: ['fetchListLeagueAll', page, search],
    queryFn: async () => {
      const res: any = await getListLeagueAll({ page, name: search })
      if (res.pagination?.totalPage) {
        maxPage.current = res.pagination?.totalPage
      }
      if (page !== res.pagination.page) return []
      let _listItem = res.data

      if (page > 1) {
        _listItem = [...dataList.current, ...res.data]
      }
      dataList.current = [..._listItem]
      setListItem(dataList.current)
      return res
    }
  })

  const handleUpdateText = (text: string) => {
    clearTimeout(timeoutSearch.current)
    timeoutSearch.current = setTimeout(() => {
      setPage(1)
      setSearch(text.trim())
    }, 500)
  }

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView])

  const handleClickItem = (item: any) => {
    router.push(`/league/all-league/detail?code=${item.code}`)
  }
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "[--size:_300px] xs:[--size:_355px] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-275px] before:size-[var(--size)] before:rounded-[50%] before:bg-yellow-500 before:blur-[75px] before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:bottom-[-40px] after:right-[-20px] after:rotate-[-15deg] after:rounded-full after:bg-gradient after:opacity-30 after:z-[-1] after:blur-[55px] xs:after:blur-[68px] after:w-[100px] xs:after:w-[120px] after:h-[400px] xs:after:h-[500px]"
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
        <div className="space-y-6 xs:space-y-8">
          <CustomHeader title="ALL LEAGUES" />
          <CustomInputSearch placeholder="Search league..." onValueChange={handleUpdateText} />
          <div className="mt-4">
            <LastUpdateBox />
          </div>
          <div className="mt-6 xs:mt-8 2xs:mt-10">
            {listItem.length === 0 && !isLoading ? (
              <NoItem classNames={{ wrapper: '!min-h-[250px]' }} title="No league" />
            ) : (
              <div>
                <CustomList
                  type="league"
                  title="All Leagues"
                  data={listItem}
                  titleItemKey="name"
                  imageItemKey="avatar"
                  onClickItem={handleClickItem}
                />
                <div ref={scrollTrigger} className="text-[transparent]">
                  Loading...
                </div>
              </div>
            )}
          </div>
        </div>
      </CustomPage>
    </>
  )
}
