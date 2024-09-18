/* eslint-disable @next/next/no-img-element */
'use client'

import CustomPage from '@/app/components/custom-page'
import { IconCheckCircle, IconChevron, IconCloseHexagon, IconHome, IconPoint, IconQuiz } from '@/app/components/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useMissionStore from '@/stores/missionsStore'
import { formatNumber } from '@/helper/common'
import Image from 'next/image'
import { IQuizAnswerItem, IQuizItem } from '@/interfaces/i.missions'
import CustomButton from '@/app/components/button'
import { claimTask, verifyMissionQuiz } from '@/services/missions'
import { toast } from 'sonner'
import Loader from '@/app/components/ui/loader'
import { CustomHeader } from '@/app/components/ui/custom-header'

export default function QuizPage() {
  const router = useRouter()
  const [listChecked, setChecked] = useState<Array<string>>([])
  const [listAnswerOfUser, setListAnswerOfUser] = useState<Array<string>>([])
  const _listChecked = useRef<Array<string>>([])
  const { currentMissionQuiz, setCurrentMission } = useMissionStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const refTimeoutCheck = useRef<any>()
  const [errorById, setErrorById] = useState<{ [key: string]: boolean }>({})
  const [isLoadingFake, setLoadingFake] = useState<boolean>(true)

  const handleBack = () => {
    setCurrentMission(null)
    router.back()
    // router.push(`/mission?tab=rewards`)
  }

  const handleSelectAnswer = (item: IQuizAnswerItem, id: number, isMultiple: boolean) => {
    if (isVerified) return
    const keyId = `${id}-${item.index}`
    const indexOf = _listChecked.current.indexOf(keyId)
    if (indexOf === -1) {
      if (!isMultiple) {
        _listChecked.current = _listChecked.current.filter((_id: string) => {
          return !_id.startsWith(id.toString())
        })
        const newList = listAnswerOfUser.filter((_id: string) => {
          return !_id.startsWith(id.toString())
        })
        setListAnswerOfUser(newList)
      }
      _listChecked.current.push(keyId)
    } else {
      _listChecked.current.splice(indexOf, 1)
    }
    setErrorById({ ...errorById, [id]: false })
    setChecked([..._listChecked.current])
  }

  const sendQuiz = async () => {
    if (currentMissionQuiz?.id) {
      try {
        const res = await verifyMissionQuiz(currentMissionQuiz.id, currentMissionQuiz.quizArrays)
        if (res.status) {
          setIsVerified(true)
        }
        setIsLoading(false)
      } catch (ex) {
        setIsLoading(false)
      }
    }
    setIsLoading(false)
  }

  const handleClaim = async () => {
    if (currentMissionQuiz?.id) {
      setIsLoading(true)
      try {
        const res = await claimTask(currentMissionQuiz.id)
        if (res.status) {
          toast.success(
            <div className="font-geist flex items-center justify-between text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] w-full">
              <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
                <IconCheckCircle className="size-5 xs:size-6 text-green-500"/>
                <p className="text-title tracking-[-1px]">Mission is completed</p>
              </div>
              <div className="w-5 xs:w-6 h-[1px] bg-green-800 ml-auto mr-5 xs:mr-6"></div>
              <div className="flex items-center space-x-1">
                <IconPoint className="size-5 xs:size-6" />
                <p className="text-green-500">+{currentMissionQuiz?.point && formatNumber(currentMissionQuiz?.point || 0, 0, 0)}</p>
              </div>
            </div>
          )
          handleBack()
        }
        setIsLoading(false)
      } catch (ex) {
        setIsLoading(false)
      }
    }
  }

  const handleCheck = () => {
    if (isLoading) return
    setIsLoading(true)
    if (isVerified) {
      handleClaim()
      return
    }
    setIsVerified(false)
    setListAnswerOfUser(_listChecked.current)
    clearTimeout(refTimeoutCheck.current)
    refTimeoutCheck.current = setTimeout(() => {
      const _errorById: any = {}
      currentMissionQuiz?.quizArrays.forEach((item: IQuizItem) => {
        let error = false
        item.answers.forEach((answer: IQuizAnswerItem) => {
          if (
            (_listChecked.current.indexOf(`${item.index}-${answer.index}`) === -1 &&
              answer.correct) ||
            (_listChecked.current.indexOf(`${item.index}-${answer.index}`) !== -1 &&
              !answer.correct)
          ) {
            error = true
          }
        })
        if (error) {
          _errorById[item.index] = error
        }
      })
      setErrorById(_errorById)
      if (Object.keys(_errorById)?.length === 0) {
        sendQuiz()
      } else {
        setIsLoading(false)
        toast.error(
          <div className="font-geist flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2 text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px]">
            <IconCloseHexagon className="size-5 xs:size-6 text-error"/>
            <p className="text-title tracking-[-1px]">Your answer is wrong. Try again.</p>
          </div>
        )
      }
    }, 500)
  }

  useEffect(() => {
    if (!currentMissionQuiz || !currentMissionQuiz.id) {
      handleBack()
    }
  }, [currentMissionQuiz])

  useEffect(() => {
    setTimeout(() => {
      setLoadingFake(false)
    }, 500)
  }, [])

  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "bg-[linear-gradient(to_bottom,#000000_1%,#002415_26%,#000000_44%,#000000_100%)] before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-25%] before:size-[355px] before:rounded-[50%] before:bg-gradient before:blur-[125px] before:opacity-30 before:z-[-1]"
        }}
        disableOverscroll
      >
        {isLoadingFake && (
          <Loader
            classNames={{
              wrapper: 'h-[100vh] absolute z-[1] left-[0] bg-black/30',
              icon: 'w-[45px] h-[45px] text-white'
            }}
          />
        )}
        <div className="space-y-8">
          <CustomHeader title="IQ QUIZ" />
          {currentMissionQuiz && !isLoadingFake && (
            <div>
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 w-full z-[-1]">
                  <img className="w-full" src="/assets/images/mission/quiz-image.svg" alt="Shape" />
                </div>
                <div className="flex items-center justify-center space-x-3 xs:space-x-4">
                  <div className="relative drop-shadow-green">
                    <img
                      className="size-[70px] xs:size-[80px] 2xs:size-[90px] min-w-[70px] xs:min-w-[80px] 2xs:min-w-[90px]"
                      src="/assets/images/mission/quiz-shape.svg"
                      alt="Shape"
                    />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                      <IconQuiz gradient className="size-8 xs:size-10 2xs:size-12" />
                    </div>
                  </div>
                  <div className="space-y-1 xs:space-y-2 2xs:space-y-3">
                    <div className="text-title !leading-[18px] tracking-[-1px] text-[13px] xs:text-sm uppercase">
                      TOTAL REWARD:
                    </div>
                    <div className="flex items-center flex-wrap space-x-1.5 xs:space-x-2">
                      <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
                        <IconPoint className="size-4 xs:size-5 2xs:size-6" />
                        <p className="text-green-500 text-sm xs:text-[15px] 2xs:text-base font-semibold !leading-[18px] xs:!leading-[20px]">
                          {formatNumber(currentMissionQuiz?.point || 0, 0, 0)}
                        </p>
                      </div>
                      {currentMissionQuiz.box > 0 && (
                        <>
                          {currentMissionQuiz.point ? (
                            <div className="w-[1px] h-[20px] bg-white/25"></div>
                          ) : null}
                          <div className="flex items-center space-x-1">
                            <Image
                              className="size-6 xs:size-7 2xs:size-8"
                              width={30}
                              height={30}
                              src="/assets/images/item-special@2x.png"
                              alt="Box"
                            />
                            <p className="text-primary font-geist font-semibold text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px]">{`${currentMissionQuiz.box} box`}</p>
                          </div>
                        </>
                      )}
                      {currentMissionQuiz.xp > 0 && (
                        <>
                          {currentMissionQuiz.point || currentMissionQuiz.box ? (
                            <div className="w-[1px] h-[20px] bg-white/25"></div>
                          ) : null}
                          <div className="flex items-center space-x-1">
                            <p className="text-primary font-geist font-semibold text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px]">{`${formatNumber(currentMissionQuiz.xp, 0, 0)} XP`}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 xs:mt-12 2xs:mt-14 mb-20 space-y-4 xs:space-y-5 2xs:space-y-6">
                {currentMissionQuiz.quizArrays.map((item: IQuizItem, index: number) => (
                  <div className="space-y-4 xs:space-y-5 2xs:space-y-6" key={item.index}>
                    <p className="text-title text-[15px] xs:text-base !leading-[20px] font-semibold font-mona">
                      {index + 1}. {item.question}
                    </p>
                    <div className="space-y-3 xs:space-y-4">
                      {item.answers.map((el: IQuizAnswerItem) => (
                        <>
                          <div
                            className="flex space-x-2 cursor-pointer"
                            key={el.index}
                            onClick={() => handleSelectAnswer(el, item.index, item.isMultiple)}
                          >
                            <motion.div
                              whileTap={{ scale: 0.8 }}
                              className="relative size-4 xs:size-5 2xs:size-6 min-w-4 xs:min-w-5 2xs:min-w-6 flex items-center justify-center"
                            >
                              <div
                                className={`border-1.5 border-green-700 rotate-45 size-3 xs:size-[15px] 2xs:size-[18px] p-0.5 xs:p-[3px] transition-background ${listChecked.indexOf(`${item.index}-${el.index}`) !== -1 ? (!el.correct && listAnswerOfUser.indexOf(`${item.index}-${el.index}`) !== -1 ? 'bg-white/10 !border-error-blur' : 'bg-white/10') : ''}`}
                              >
                                <div
                                  className={`size-full bg-gradient transition-opacity ${listChecked.indexOf(`${item.index}-${el.index}`) !== -1 ? (!el.correct && listAnswerOfUser.indexOf(`${item.index}-${el.index}`) !== -1 ? 'opacity-100 !bg-gradient-error' : 'opacity-100') : 'opacity-0'}`}
                                ></div>
                              </div>
                            </motion.div>
                            <p className="text-body text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] tracking-[-1px] -mt-[1px] xs:mt-0.5">
                              {el.text}
                            </p>
                          </div>
                        </>
                      ))}
                      {errorById[item.index] && (
                        <p className="text-error text-xs tracking-[-1px] leading-[16px] !mt-2.5 xs:!mt-3">
                          Wrong answer. Please try again!
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="fixed bottom-3 3xs:bottom-4 left-3 3xs:left-4 right-3 3xs:right-4 max-w-[480px] mx-auto z-10">
                <CustomButton
                  title={isVerified ? 'CLAIM NOW' : `CHECK ANSWER`}
                  isLoading={isLoading}
                  onAction={handleCheck}
                />
              </div>
            </div>
          )}
        </div>
      </CustomPage>
    </>
  )
}
