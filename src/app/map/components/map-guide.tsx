import ItemTutorial from '@/app/components/ui/item-tutorial'
import { useTourGuideContext } from '@/contexts/tour.guide.context'
import { useAppSound } from '@/hooks/useAppSound'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Joyride, { ACTIONS, EVENTS, Events, STATUS, Step, StoreHelpers } from 'react-joyride'

export default function MapGuide() {
  const [mounted, setMounted] = useState<boolean>(false)
  const initToured = useRef<boolean>(false)
  const { setState, state, setHelpers, helpers } = useTourGuideContext()
  const { buttonSound } = useAppSound()
  const { run, stepIndex, steps } = state
  const router = useRouter()

  const handleGetHelpers = (_helpers: StoreHelpers) => {
    setHelpers(_helpers)
  }
  const handleNext = () => {
    buttonSound.play()
    helpers?.next()
  }

  const handleSkip = () => {
    buttonSound.play()
    setState({ run: false, tourActive: false })
    helpers?.skip()
  }
  const handleBack = () => {
    helpers?.prev()
  }
  const handleClose = () => {
    helpers?.close()
    setState({ run: false, tourActive: false })
  }
  const handleComplete = () => {
    handleClose()
  }

  const handleJoyrideCallback = (data: any) => {
    const { status, type, action, index, step } = data
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false, tourActive: false })
    } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as Events[]).includes(type)) {
      if (type === EVENTS.TARGET_NOT_FOUND) {
        handleSkip()
        return
      }
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
      if (nextStepIndex === 5 || nextStepIndex === 8) {
        setState({
          run: false
        })
        return
      }
      if (step?.data?.next) {
        setState({
          run: false
        })
        router.push(step?.data?.next)
      } else {
        setState({
          stepIndex: nextStepIndex
        })
      }
      // setTimeout(() => {
      //   const _t: any = document.getElementsByClassName('react-joyride__overlay')
      //   console.log('🚀 ~ setTimeout ~ _t:', _t)
      //   setHtmlT(_t[0]?.parentNode?.innerHTML)
      // }, 1000)
    }
    //------
    // if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
    //   // Update state to advance the tour
    //   setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    // }
    // const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    // console.log('🚀 ~ handleJoyrideCallback ~ finishedStatuses:', status)
    // if (finishedStatuses.includes(status)) {
    //   setState({ run: false, steps, tourActive: false })
    // }
  }

  useEffect(() => {
    if (!initToured.current) {
      const _steps: Step[] = [
        {
          content: (
            <ItemTutorial
              handleNext={handleNext}
              handleSkip={handleSkip}
              placement="bottom"
              content={`Start by choosing the region that best fits your preferences! Each area offers unique opportunities tailored to enhance your experience.`}
            />
          ),
          placement: 'top-start',
          target: '.map-continent',
          disableBeacon: true,
          spotlightClicks: true,
          spotlightPadding: 0,
          hideFooter: true,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.95)'
            }
          }
        },
        {
          content: (
            <ItemTutorial
              placement="top-center"
              handleNext={handleNext}
              handleSkip={handleSkip}
              content="Every region and continent features a unique game tailored to its specifics. By selecting the area that aligns best with your preferences and strategies, you can maximize your point accumulation and enhance your overall experience. Make your choice wisely to optimize your journey and unlock more rewards!"
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          target: 'body',
          styles: {
            overlay: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            overlayLegacy: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            spotlight: {
              background: 'transparent'
            },
            spotlightLegacy: {
              background: 'transparent'
            }
          },
          hideFooter: true
        },
        {
          content: <ItemTutorial arrow arrowClass="rotate-180" />,
          floaterProps: {
            disableAnimation: true
          },
          placement: 'bottom',
          target: '.map-asia',
          spotlightClicks: true,
          spotlightPadding: 5,

          hideFooter: true
        },
        {
          content: <ItemTutorial arrow />,
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          target: '.button-confirm',
          spotlightClicks: true,
          spotlightPadding: 0,
          styles: {
            overlay: {
              background: 'transparent'
            },
            spotlight: {
              background: 'transparent'
            },
            spotlightLegacy: {
              background: 'transparent'
            },
            overlayLegacy: {
              background: 'transparent',
              mixBlendMode: 'unset'
            }
          },
          hideFooter: true
        },
        {
          content: (
            <ItemTutorial
              placement="bottom-center"
              handleNext={handleNext}
              handleSkip={handleSkip}
              content={`Next, select the Agency that aligns most closely with your preferences. Each agency boasts unique skills and distinct advantages, so it's important to carefully review their attributes. By choosing the one that best fits your style and objectives, you'll be able to maximize the benefits and enhance your overall experience. Make an informed choice to fully leverage the strengths of your selected agency!`}
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          spotlightClicks: true,
          spotlightPadding: 0,
          target: '.map-agency',
          hideFooter: true,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.95)'
            }
            // overlayLegacy: {
            //   mixBlendMode: 'unset'
            // }
          }
        },
        {
          content: <ItemTutorial arrow arrowClass="rotate-180" />,
          floaterProps: {
            disableAnimation: true
          },
          placement: 'bottom',
          target: '.item-map-guide',
          spotlightClicks: true,
          spotlightPadding: 5,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.6)'
            }
          },
          hideFooter: true
        },
        {
          content: <ItemTutorial arrow />,
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          target: '.button-confirm',
          spotlightClicks: true,
          spotlightPadding: 0,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.6)'
            }
          },
          hideFooter: true
        },
        {
          content: (
            <ItemTutorial
              placement="bottom-right"
              handleNext={handleNext}
              handleSkip={handleSkip}
              content={`Next, choose the Tools that align best with your needs and gameplay style. Each tool brings its own unique skill set and benefits to the table. Select the ones that will optimize your performance and enhance your experience. Choosing the right Tools is crucial for maximizing your success and reaping the full rewards. Select wisely and make the most of your journey!`}
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'right',
          spotlightClicks: true,
          spotlightPadding: 0,
          target: '.map-tool',
          hideFooter: true,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.95)'
            }
          }
        },
        {
          content: <ItemTutorial arrow arrowClass="rotate-180" />,
          floaterProps: {
            disableAnimation: true
          },
          placement: 'bottom',
          target: '.item-map-guide',
          spotlightClicks: true,
          spotlightPadding: 5,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.6)'
            }
          },
          hideFooter: true
        },
        {
          content: <ItemTutorial arrow />,
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          target: '.button-confirm',
          spotlightClicks: true,
          spotlightPadding: 0,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.6)'
            }
          },
          hideFooter: true
        },
        {
          content: (
            <ItemTutorial
              handleNext={handleNext}
              handleSkip={handleSkip}
              content={`Embark on your journey in this new land with our full support. We’re here to guide you and ensure your success every step of the way. Together, we'll unlock its potential!`}
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          target: '.map-nav',
          hideFooter: true,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.95)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.95)'
            }
            // overlayLegacy: {
            //   mixBlendMode: 'unset'
            // }
          }
        },
        {
          content: (
            <ItemTutorial
              handleNext={handleNext}
              handleSkip={handleSkip}
              content={`Every city within the territory you choose is filled with unique and exciting missions just waiting for you. Dive into these adventures and discover all the hidden challenges each city has to offer.`}
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          spotlightClicks: false,
          spotlightPadding: 0,
          target: 'body',
          hideFooter: true,
          styles: {
            overlay: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            overlayLegacy: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            spotlight: {
              background: 'transparent'
            },
            spotlightLegacy: {
              background: 'transparent'
            }
          }
        },
        {
          content: <ItemTutorial arrow />,
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          target: '.overlay-1',
          spotlightClicks: true,
          spotlightPadding: 30,
          styles: {
            overlayLegacy: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlayLegacyCenter: {
              background: 'rgba(0,0,0,0.6)'
            },
            overlay: {
              background: 'rgba(0,0,0,0.6)'
            }
          },
          hideFooter: true
        },
        {
          content: (
            <ItemTutorial
              handleNext={handleNext}
              handleSkip={handleSkip}
              content={`Exploring these missions will not only provide thrilling experiences but also reward you generously for your efforts. Get ready to uncover secrets, face new challenges, and enrich your journey with diverse and engaging tasks. Don't miss out—explore and conquer every city to maximize your rewards and elevate your adventure!`}
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          spotlightClicks: false,
          spotlightPadding: 0,
          target: 'body',
          hideFooter: true,
          styles: {
            overlay: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            overlayLegacy: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            spotlight: {
              background: 'transparent'
            },
            spotlightLegacy: {
              background: 'transparent'
            }
          }
        },
        {
          content: (
            <ItemTutorial
              handleNext={handleNext}
              handleSkip={handleSkip}
              content={`Once you complete a task and claim your reward, wait for the next task to appear. This is your chance to strategize and prepare for future challenges. Keep an eye on the app, stay patient, and be ready for the next exciting opportunity to earn more rewards.`}
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          spotlightClicks: false,
          spotlightPadding: 0,
          target: 'body',
          hideFooter: true,
          styles: {
            overlay: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            overlayLegacy: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            spotlight: {
              background: 'transparent'
            },
            spotlightLegacy: {
              background: 'transparent'
            }
          }
        },
        {
          content: (
            <ItemTutorial
              handleComplete={handleComplete}
              content={`Complete your daily missions to earn extra bonus rewards! Stay consistent and make the most of each day to maximize your gains. The more missions you complete, the more rewards you get. Keep up the good work and enjoy the benefits!`}
            />
          ),
          floaterProps: {
            disableAnimation: true
          },
          placement: 'top',
          spotlightClicks: false,
          spotlightPadding: 0,
          target: 'body',
          hideFooter: true,
          styles: {
            overlay: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            overlayLegacy: {
              mixBlendMode: 'unset',
              background: 'transparent'
            },
            spotlight: {
              background: 'transparent'
            },
            spotlightLegacy: {
              background: 'transparent'
            }
          }
        }
      ]
      setState({ run: true, steps: _steps, stepIndex: 0, tourActive: true })
    }

    // if (userInfo?.code) {
    //   const listGuideByIdStr: any = localStorage.getItem(DEPIN_GUIDE)
    //   let listGuideById: any = JSON.parse(listGuideByIdStr)
    //   if (!listGuideById) {
    //     listGuideById = {}
    //   }
    //   if (userInfo?.code && listGuideById[userInfo.code]) {
    //     return
    //   }
    //   if (userInfo?.status === 'CLAIMED' && !tourActive && !initToured) {
    //     setTimeout(() => {
    //       setState({ run: true, steps: _steps, stepIndex: 0, tourActive: true })
    //     }, 500)
    //     setInitToured(true)
    //     localStorage.setItem(
    //       DEPIN_GUIDE,
    //       JSON.stringify({
    //         ...listGuideById,
    //         [userInfo?.code]: true
    //       })
    //     )
    //   }
    // }
  }, [helpers?.next])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      {mounted && (
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          disableOverlayClose
          run={run}
          stepIndex={stepIndex}
          continuous
          // scrollToFirstStep
          disableScrolling
          getHelpers={handleGetHelpers}
          showSkipButton={false}
          hideBackButton={true}
          hideCloseButton={true}
          styles={{
            options: {
              zIndex: 10000,
              backgroundColor: 'transparent',
              // overlayColor: 'rgba(0,0,0,0.95)',
              width: '100%'
            },
            overlay: {
              background: 'rgba(0,0,0,0.8)'
            },
            overlayLegacy: {
              background: 'rgba(0,0,0,0.8)',
              mixBlendMode: 'hard-light'
            },

            spotlight: {
              borderRadius: 0
            },
            spotlightLegacy: {
              background: 'gray'
            }
          }}
        />
      )}
    </div>
  )
}
