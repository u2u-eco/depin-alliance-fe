import CustomList from '@/app/components/custom-list'
import CustomModal from '@/app/components/custom-modal'
import { LIST_TYPE, QUERY_CONFIG } from '@/constants'
import { claimTask, getListMission, verifyMission } from '@/services/missions'
import useCommonStore from '@/stores/commonStore'
import { useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useShallow } from 'zustand/react/shallow'

export default function ListMission() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const currentItem = useRef<any>()
  const [isVerified, setVerified] = useState<boolean>(false)
  const [isCheckMission, setCheckMission] = useState<boolean>(false)
  const token = useCommonStore(useShallow((state) => state.token))
  const { data: listMission, refetch } = useQuery({
    queryKey: ['fetchListMission'],
    queryFn: getListMission,
    enabled: Boolean(token),
    ...QUERY_CONFIG
  })

  const handleClick = (item: any) => {
    if (item.status === 'CLAIMED') return
    if (item.status === 'VERIFIED') {
      setVerified(true)
    } else {
      setCheckMission(false)
      setVerified(false)
    }
    currentItem.current = item
    onOpen()
  }

  const handleVerifyMission = async (id: number) => {
    const res = await verifyMission(id)
    if (res.status && res.data) {
      setVerified(true)
      refetch()
    }
  }

  const handleClaim = async () => {
    const res = await claimTask(currentItem.current.id)
    if (res.status) {
      toast.success('Mission is completed')
      refetch()
      onClose()
    }
  }

  const handleMission = () => {
    if (isVerified) {
      handleClaim()
      return
    }
    if (isCheckMission) {
      handleVerifyMission(currentItem.current.id)
    } else {
      setCheckMission(true)
      window.open(currentItem.current.url, '_blank')
    }
  }

  return (
    <>
      {listMission?.data.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <CustomList
            type={LIST_TYPE.MISSION}
            title={item.group}
            data={item.missions}
            pointKey="point"
            key={item.id}
            onClickItem={handleClick}
          />
        </React.Fragment>
      ))}
      <CustomModal title={'Mission'} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>Complete the following task:</p>
            <p className="text-gradient">“{currentItem.current?.name}”</p>
          </div>
          <div className="my-8 space-x-4 flex items-center justify-center">
            <div className="[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] bg-white/10 size-[90px] flex items-center justify-center">
              <Image
                // className="size-10"
                width={40}
                height={40}
                src="/assets/images/icons/icon-calendar-gradient.svg"
                alt=""
              />
            </div>
            <div className="space-y-2">
              <p className=" text-title font-semibold">REWARD:</p>
              <div className="flex items-center space-x-2">
                <Image
                  className="size-6"
                  width={24}
                  height={24}
                  src="/assets/images/point@2x.png"
                  alt="Point"
                />
                <p className="text-green-500">{currentItem.current?.point}</p>
              </div>
            </div>
          </div>
          <div className="btn" onClick={handleMission}>
            <div className="btn-border"></div>
            <div className="btn-primary">
              {' '}
              {isVerified ? 'Claim Now' : isCheckMission ? 'CHECK MISSION' : 'START MISSION'}{' '}
            </div>
            <div className="btn-border"></div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
