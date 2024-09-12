"use client"

import CustomPage from '@/app/components/custom-page'
import { IconChevron, IconHome, IconPoint, IconQuiz } from '@/app/components/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from "framer-motion";

const listQuiz = [
  { id: 1, title: `“Which Game of Thrones Character Are You?”`, answer: [
    { content: 'Wukong' },
    { content: 'Kratos'},
    { content: 'Zeus', error: true }
  ] },
  { id: 2, title: `“Which Game of Thrones Character Are You?”`, answer: [
    { content: 'Wukong' },
    { content: 'Kratos'},
    { content: 'Zeus', error: true }
  ] },
  { id: 3, title: `“Which Game of Thrones Character Are You?”`, answer: [
    { content: 'Wukong' },
    { content: 'Kratos'},
    { content: 'Zeus', error: true }
  ] },
]

export default function QuizPage() {
  const router = useRouter()
  const [checked, setChecked] = useState('Zeus')

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:top-[5%] before:left-[-68%] before:size-[355px] before:rounded-[50%] before:blur-[75px] before:bg-green-500 before:opacity-30 before:z-[-1] after:content-[''] after:absolute after:top-[5%] after:right-[-68%] after:size-[355px] after:rounded-[50%] after:blur-[75px] after:bg-yellow-500 after:opacity-30 after:z-[-1]"
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
          <div>
            <div className="relative flex items-center justify-center space-x-3 xs:space-x-4">
              <div className="absolute top-0 left-0 right-0 w-full">
                <img className="w-full" src="/assets/images/mission/quiz-image.svg" alt="Shape" />
              </div>
              <div className="relative drop-shadow-green">
                <img className="size-[70px] xs:size-[80px] 2xs:size-[90px]" src="/assets/images/mission/quiz-shape.svg" alt="Shape" />
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <IconQuiz gradient className="size-8 xs:size-10 2xs:size-12" />
                </div>
              </div>
              <div className="space-y-2 xs:space-y-3">
                <div className="text-title leading-[18px] tracking-[-1px] text-[13px] xs:text-sm uppercase">TOTAL REWARD:</div>
                <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
                  <IconPoint className="size-5 xs:size-6 2xs:size-7" />
                  <p className="text-green-500 text-base xs:text-lg font-semibold !leading-[20px] xs:!leading-[22px]">3,000</p>
                </div>
              </div>
            </div>
            <div className="mt-10 xs:mt-12 2xs:mt-14 mb-6 xs:mb-8 2xs:mb-10 space-y-4 xs:space-y-5 2xs:space-y-6">
              {listQuiz.map((item: any) => (
                <div className="space-y-4 xs:space-y-5 2xs:space-y-6" key={item.id}>
                  <p className="text-title text-[15px] xs:text-base !leading-[20px] font-semibold font-mona">{item.title}</p>
                  <div className="space-y-3 xs:space-y-4">
                    {item.answer.map((el: any) => (
                      <>
                        <div className="flex items-center space-x-1.5 xs:space-x-2 cursor-pointer" key={el.content} onClick={() => setChecked(el.content)}>
                          <motion.div whileTap={{ scale: 0.8 }} className="relative size-5 xs:size-6 flex items-center justify-center">
                            <div className={`border-1.5 border-green-700 rotate-45 size-[15px] xs:size-[18px] p-[3px] transition-background ${checked === el.content ? (el.error ? 'bg-white/10 !border-error-blur' : 'bg-white/10') : ''}`}>
                              <div className={`size-full bg-gradient transition-opacity ${checked === el.content ? (el.error ? 'opacity-100 !bg-gradient-error' : 'opacity-100') : 'opacity-0'}`}></div>
                            </div>
                          </motion.div>
                          <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px]">{el.content}</p>
                        </div>
                        {el.error && <p className="text-error text-xs tracking-[-1px] leading-[16px] !mt-2.5 xs:!mt-3">Wrong anwser. Please try again!</p>}
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="btn">
              <div className="btn-border"></div>
              <div className="btn-primary">CHECK ANSWER</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
