"use client"

import CustomPage from '@/app/components/custom-page'
import { IconChevron, IconHome, IconQuiz } from '@/app/components/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function QuizPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "bg-[linear-gradient(to_bottom,#000_40%,#00331d_100%)] before:content-[''] before:absolute before:left-[-60%] before:top-[-20%] before:size-[250px] before:blur-[50px] before:bg-green-500 before:rounded-[50%] before:z-[-1] before:opacity-30 after:content-[''] after:absolute after:right-[-60%] after:top-[-20%] after:size-[250px] after:blur-[50px] after:bg-green-500 after:rounded-[50%] after:z-[-1] after:opacity-30"
        }}
      >
        <div className="space-y-8">
          <div className="sticky top-0 left-0 bg-white/10 flex items-center justify-between space-x-3 z-10 py-3 px-3 backdrop-blur-[8px]">
            <div
              className="cursor-pointer rotate-90"
              onClick={handleBack}
            >
              <IconChevron className="text-green-500 size-6 xs:size-7 2xs:size-8" />
            </div>
            <div className="flex items-center space-x-3 xs:space-x-4">
              <div className="size-1.5 bg-green-800"></div>
              <div className="text-title font-airnt font-medium text-lg xs:text-xl 2xs:text-2xl">IQ QUIZ</div>
              <div className="size-1.5 bg-green-800"></div>
            </div>
            <Link href="/home">
              <IconHome className="size-6 xs:size-7 2xs:size-8" gradient/>
            </Link>
          </div>
          <div className="relative flex items-center justify-center space-x-4">
            <div className="relative drop-shadow-green">
              <img className="size-[90px]" src="/assets/images/mission/quiz-shape.svg" alt="Shape" />
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <IconQuiz gradient className="size-12" />
              </div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
