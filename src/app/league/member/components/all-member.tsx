import NoItem from '@/app/components/ui/no-item'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import MemberItem from '../../components/member-item'
import CustomModal from '@/app/components/custom-modal'
import { useDisclosure } from '@nextui-org/react'
import { IconPoint } from '@/app/components/icons'
import { IJoinRequest } from '@/interfaces/i.league'
import { useQuery } from '@tanstack/react-query'
import { getListMemberOfLeague, kickUserInLeague } from '@/services/league'
import { useInView } from 'react-intersection-observer'
import Loader from '@/app/components/ui/loader'
import { FUNDING_TYPE, PAGE_SIZE, TELE_URI } from '@/constants'
import CustomInputSearch from '@/app/components/ui/custom-input-search'
import { formatNumber } from '@/helper/common'
import { toast } from 'sonner'
import CustomToast from '@/app/components/ui/custom-toast'
import useCommonStore from '@/stores/commonStore'
import { useAppSound } from '@/hooks/useAppSound'
import CustomRank from '@/app/components/ui/custom-rank'
interface IMember {
  setTotalMember: (total: number) => void
  activeTab: string
}
const AllMember = ({ setTotalMember, activeTab }: IMember) => {
  const { currentLeague } = useCommonStore()
  const maxPage = useRef<number>(0)
  const [page, setPage] = useState<number>(1)
  const [listItem, setListItem] = useState<IJoinRequest[]>([])
  const dataList = useRef<IJoinRequest[]>([])
  const timeoutSearch = useRef<any>(null)
  const [search, setSearch] = useState<string>('')
  const [scrollTrigger, isInView] = useInView()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { buttonSound } = useAppSound()

  const { data: listMemberData } = useQuery({
    queryKey: ['getListMemberOfLeague', page, search, activeTab],
    queryFn: async () => {
      try {
        setIsLoading(true)
        const res: any = await getListMemberOfLeague({
          page,
          size: PAGE_SIZE,
          username: search,
          'is-funding': activeTab === FUNDING_TYPE ? true : false
        })
        if (res.pagination?.totalPage) {
          maxPage.current = res.pagination?.totalPage
        }

        setTotalMember(res.pagination?.totalRecord || res.data?.ranking?.length)
        if (res.pagination && page !== res.pagination.page) {
          setIsLoading(false)
          return []
        }
        let _listItem = res.data?.ranking

        if (page > 1) {
          _listItem = [...dataList.current, ...res.data]
        }
        dataList.current = _listItem
        setListItem([...dataList.current])
        setIsLoading(false)
        return res
      } catch (ex) {
        setIsLoading(false)
      }
    }
  })

  const handleUpdateText = (text: string) => {
    clearTimeout(timeoutSearch.current)
    timeoutSearch.current = setTimeout(() => {
      setPage(1)
      setSearch(text?.trim())
    }, 500)
  }

  const handleInvite = () => {
    buttonSound.play()
    if (currentLeague?.inviteLink) {
      window.open(
        `https://t.me/share/url?url=${TELE_URI}?start=${currentLeague.inviteLink}&text=🔰 Let's unite and make a difference!, 👉 Join now: ${TELE_URI}?start=${currentLeague.inviteLink}`,
        '_self'
      )
    }
  }

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  useEffect(() => {
    if (isInView && page < maxPage.current && !isLoading) {
      setPage(page + 1)
    }
  }, [isInView])

  return (
    <div className="space-y-8">
      {currentLeague?.isOwner && (
        <CustomInputSearch placeholder="Search member..." onValueChange={handleUpdateText} />
      )}
      <div>
        {listItem.length === 0 && !isLoading ? (
          <NoItem title="Not a member yet" action={handleInvite} textLink="INVITE NOW" />
        ) : (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
            key="all"
            className="!will-change-auto"
          >
            <CustomRank
              data={{
                currentRank: listMemberData?.data.currentRank,
                ranking: listItem
              }}
              type="member"
              maxPrecision={activeTab === FUNDING_TYPE ? 0 : 2}
              suffix={activeTab === FUNDING_TYPE ? '' : '/h'}
            />
            <div ref={scrollTrigger} className="text-[transparent]">
              Loading...
            </div>
          </motion.div>
        )}
        {isLoading && (
          <Loader
            classNames={{
              wrapper: 'z-[1] left-[0] absolute bg-black/30  top-0',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
      </div>
    </div>
  )
}

export default AllMember
