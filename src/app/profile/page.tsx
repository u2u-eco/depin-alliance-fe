'use client'

import React, { useEffect, useRef, useState } from 'react'
import CustomPage from '../components/custom-page'
import { IconChevron, IconHome } from '../components/icons'
import { useRouter } from 'next/navigation'
import CustomList from '../components/custom-list'
import { ISkillItem } from '@/interfaces/i.user'
import { useDisclosure } from '@nextui-org/react'
import { getRanking, getSkillInfo, getSkills, updateSkill } from '@/services/user'
import { toast } from 'sonner'
import useCommonStore from '@/stores/commonStore'
import CustomModal from '../components/custom-modal'
import UpgradeModal from '../upgrade/components/upgrade-modal'
import Info from '../components/ui/info'
import { LIST_TYPE } from '@/constants'
import Link from 'next/link'
import Loader from '../components/ui/loader'
import { CustomHeader } from '../components/ui/custom-header'
import CustomToast from '../components/ui/custom-toast'

const PROFILE_TYPE = {
  SKILL: 'skill'
}

export default function ProfilePage() {
  const router = useRouter()
  const currentItem = useRef<any>()
  const refInterval = useRef<any>()
  const { token, getUserInfo } = useCommonStore()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [listSkill, setListSkill] = useState<ISkillItem[]>([])
  const [rank, setRank] = useState<number>(0)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const _getSkills = async (disableLoading?: boolean) => {
    setIsLoading(disableLoading ? false : true)
    const res = await getSkills()
    if (res.status) {
      setListSkill(res.data.skill)
    }
    setIsLoading(false)
  }

  const _getRank = async () => {
    const res = await getRanking()
    if (res.status) {
      setRank(res.data.currentRank)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const handleClickItem = async (item: any) => {
    let infoSkill = {}
    if (item.levelCurrent < item.maxLevel) {
      const res = await getSkillInfo(item.skillId)
      if (res.status) {
        infoSkill = res.data
      }
    }
    currentItem.current = { ...item, ...infoSkill }
    onOpen()
  }

  const handleUpdateSkill = async (skillId: number) => {
    setLoadingButton(true)
    const res: any = await updateSkill(skillId)
    if (res.status) {
      toast.success(<CustomToast type="success" title="Level Up successfully!" />)
      getUserInfo()
      _getSkills()
      handleClose()
    }
    setLoadingButton(false)
  }

  const handleModalAction = (data: any) => {
    if (loadingButton) return
    handleUpdateSkill(data)
  }

  const handleClose = () => {
    currentItem.current = {}
    onClose()
  }

  const fetchList = () => {
    const update = () => {
      _getSkills(true)
      if (currentItem.current.skillId) {
        handleClickItem(currentItem.current)
      }
    }
    update()
    setTimeout(() => {
      update()
    }, 5300)
    setTimeout(() => {
      update()
    }, 10000)
  }

  useEffect(() => {
    if (token) {
      _getRank()
      _getSkills()
    }
  }, [token])

  useEffect(() => {
    if (!isOpen) {
      clearInterval(refInterval.current)
    }
  }, [isOpen])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "bg-[linear-gradient(to_bottom,#000000_1%,#002415_26%,#000000_44%,#000000_100%)] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-25%] before:size-[355px] before:rounded-[50%] before:bg-gradient before:blur-[125px] before:opacity-30 before:z-[-1]"
        }}
      >
        {isLoading && (
          <Loader
            classNames={{
              wrapper: 'h-[100vh] absolute z-[1] left-[0] bg-black/30',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
        <div>
          <CustomHeader title="PROFILE" />
          <div className="mt-6 xs:mt-8 2xs:mt-10 mb-10 xs:mb-11 2xs:mb-12">
            <Info profile rank={rank} />
          </div>

          <div>
            <CustomList
              type={LIST_TYPE.SKILL}
              data={listSkill}
              title="ALL SKILLS"
              titleItemKey="name"
              levelKey="levelCurrent"
              imageItemKey="image"
              onClickItem={handleClickItem}
              cb={fetchList}
            />
          </div>
        </div>
      </CustomPage>
      <CustomModal
        title="Upgrade skill"
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
      >
        <UpgradeModal
          activeType={PROFILE_TYPE.SKILL}
          UPGRADE_TYPE={PROFILE_TYPE}
          item={currentItem.current}
          refInterval={refInterval}
          handleAction={handleModalAction}
        />
      </CustomModal>
    </>
  )
}
