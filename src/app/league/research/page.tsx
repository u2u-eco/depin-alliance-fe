'use client'

import CustomList from '@/app/components/custom-list'
import CustomPage from '@/app/components/custom-page'
import { CustomHeader } from '@/app/components/ui/custom-header'
import { LIST_TYPE } from '@/constants'
import React from 'react'

const listSkill = [
  {
    skillId: 1,
    name: 'Cloud Computing',
    levelCurrent: 1,
    image: '/assets/images/profile/skill-01@2x.png',
    description: 'Mining power',
    effectCurrent: 1.01,
    rateEffect: 0.01,
    profit: 2000,
    lock: false
  },
  {
    skillId: 2,
    name: 'Data Analyst',
    levelCurrent: 1,
    image: '/assets/images/profile/skill-02@2x.png',
    description: 'Purchase price',
    effectCurrent: 0.99,
    rateEffect: 0.005,
    profit: 2000,
    lock: false
  },
  {
    skillId: 3,
    name: 'Artificial Intelligence',
    levelCurrent: 1,
    image: '/assets/images/profile/skill-03@2x.png',
    description: 'Countdown time',
    effectCurrent: 0.95,
    rateEffect: -0.01,
    profit: 2000,
    lock: false
  },
  {
    skillId: 4,
    name: 'Cyber Security',
    levelCurrent: 1,
    image: '/assets/images/profile/skill-04@2x.png',
    description: 'Mining power',
    effectCurrent: 0.99,
    rateEffect: 0.1,
    profit: 2000,
    lock: true
  },
  {
    skillId: 5,
    name: 'Cyber Security',
    levelCurrent: 1,
    image: '/assets/images/profile/skill-05@2x.png',
    description: 'Mining power',
    effectCurrent: 0.99,
    rateEffect: 0.1,
    profit: 2000,
    lock: true
  }
]

export default function ResearchPage() {
  const handleClickItem = () => {
    console.log(333)
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "[--size:_300px] xs:[--size:_355px] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-275px] before:size-[var(--size)] before:rounded-[50%] before:bg-green-500 before:blur-[75px] before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:bottom-[-40px] after:right-[-20px] after:rotate-[-15deg] after:rounded-full after:bg-gradient after:opacity-30 after:z-[-1] after:blur-[55px] xs:after:blur-[68px] after:w-[100px] xs:after:w-[120px] after:h-[400px] xs:after:h-[500px]"
        }}
      >
        <div className="space-y-6 xs:space-y-7 2xs:space-y-8">
          <CustomHeader title="RESEARCH" />
          <CustomList
            type={LIST_TYPE.RESEARCH}
            data={listSkill}
            onClickItem={handleClickItem}
            titleItemKey="name"
            levelKey="levelCurrent"
            imageItemKey="image"
          />
        </div>
      </CustomPage>
    </>
  )
}
