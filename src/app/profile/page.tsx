"use client"

import React, { useEffect, useRef, useState } from 'react'
import CustomPage from '../components/custom-page'
import { IconChevron } from '../components/icons'
import { useRouter } from 'next/navigation'
import CustomList from '../components/custom-list'
import { ISkillItem } from '@/interfaces/i.user'
import { useDisclosure } from '@nextui-org/react'
import { getSkillInfo, getSkills, updateSkill } from '@/services/user'
import { toast } from 'sonner'
import useCommonStore from '@/stores/commonStore'
import CustomModal from '../components/custom-modal'
import UpgradeModal from '../upgrade/components/upgrade-modal'
import Info from '../components/ui/info'

const PROFILE_TYPE = {
  SKILL: 'skill'
}

export default function ProfilePage() {
  const router = useRouter()
  const currentItem = useRef<any>()
  const refInterval = useRef<any>()
  const token = useCommonStore((state) => state.token)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [listSkill, setListSkill] = useState<ISkillItem[]>([])

  const _getSkills = async () => {
    const res = await getSkills()
    if (res.status) {
      setListSkill(res.data.skill)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const handleClickItem = async (item: any) => {
      const res = await getSkillInfo(item.skillId)
      let infoSkill = {}
      if (res.status) {
        infoSkill = res.data
      }
      currentItem.current = { ...item, ...infoSkill }
      onOpen()
  }

  const handleUpdateSkill = async (skillId: number) => {
    const res: any = await updateSkill(skillId)
    if (res.status) {
      toast.success('Level Up successfully!')
      _getSkills()
      onClose()
    }
  }

  const handleModalAction = (data: any) => {
    handleUpdateSkill(data)
  }

  useEffect(() => {
    if (token) {
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
      <CustomPage>
        <div>
          <div className="relative flex items-center justify-center space-x-4">
            <div className="absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer rotate-90" onClick={handleBack}>
              <IconChevron className="text-green-500"/>
            </div>
            <div className="size-1.5 bg-green-800"></div>
            <div className="text-title font-airnt font-medium text-xl xs:text-2xl">PROFILE</div>
            <div className="size-1.5 bg-green-800"></div>
          </div>
          <div className="mt-10 mb-12">
            <Info profile/>
          </div>
          <div>
            <CustomList
              type="skill"
              data={listSkill}
              title="ALL SKILLS"
              titleItemKey="name"
              levelKey="levelCurrent"
              imageDefault="upgrade/upgrade-skill-programing"
              onClickItem={handleClickItem}
            />
          </div>
        </div>
      </CustomPage>
      <CustomModal
        title="UPDATE SKILL"
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
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