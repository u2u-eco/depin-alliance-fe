'use client'

import CustomPage from '@/app/components/custom-page'
import NoItem from '@/app/components/ui/no-item'
import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'
import { CustomHeader } from '@/app/components/ui/custom-header'
import MemberItem from '../components/member-item'

const listMember = [
  {
    id: 1,
    avatar: '/assets/images/avatar/avatar-01@2x.png',
    username: 'DojaDoja26',
    miningPower: 2014
  },
  {
    id: 2,
    avatar: '/assets/images/avatar/avatar-01@2x.png',
    username: 'DojaDoja26',
    miningPower: 2014
  },
  {
    id: 3,
    avatar: '/assets/images/avatar/avatar-01@2x.png',
    username: 'DojaDoja26',
    miningPower: 2014
  },
  {
    id: 4,
    avatar: '/assets/images/avatar/avatar-01@2x.png',
    username: 'DojaDoja26',
    miningPower: 2014
  }
]

export default function JoinRequestPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

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
              ALL REQUESTS
            </p>
            {listMember.length === 0 ? (
              <NoItem title="No request yet" link="/invite" textLink="INVITE NOW" />
            ) : (
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex flex-col space-y-3 2xs:space-y-4">
                  {listMember.map((item: any, index: number) => (
                    <MemberItem key={index} item={item} type="request" />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CustomPage>
    </>
  )
}
