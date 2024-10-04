import { useTourGuideContext } from '@/contexts/tour.guide.context'
import useCommonStore from '@/stores/commonStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Joyride, { STATUS, Step, ACTIONS, StoreHelpers, EVENTS, Events } from 'react-joyride'
import TutorialModal from '../home/components/tutorial'
import ItemTutorial from './ui/item-tutorial'
import { DEPIN_GUIDE } from '@/constants'

export default function TourGuide() {
  const { userInfo } = useCommonStore()
  const [mounted, setMounted] = useState<boolean>(false)
  const { setState, state, setHelpers, helpers } = useTourGuideContext()
  const { run, stepIndex, steps, tourActive } = state
  const router = useRouter()

  const handleGetHelpers = (_helpers: StoreHelpers) => {
    setHelpers(_helpers)
  }
  const handleNext = () => {
    helpers?.next()
  }

  const handleSkip = () => {
    helpers?.skip()
  }
  const handleBack = () => {
    helpers?.prev()
  }

  const _steps: Step[] = [
    {
      content: <TutorialModal handleSkip={handleSkip} handleStart={handleNext} />,
      placement: 'center',
      target: 'body',
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          content="Welcome to DePIN Alliance, the Odyssey of Decentralists, your first step is here to make your mark on the decentralized future. Together, we’ll build a more decentralized world."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: 'body',
      styles: {
        spotlight: {
          background: 'transparent'
        }
      },
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          hideImage
          handleNext={handleNext}
          content={`The mining process will count down, allowing you to claim your mining reward anytime. Once the timer runs out and your capacity is full, you must claim to continue passive mining. When you claim, you will also receive a random Bonus reward.`}
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      spotlightClicks: true,
      spotlightPadding: 0,
      target: '.my-first-step',
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          hideImage
          handleNext={handleNext}
          content={`The mining process will count down, allowing you to claim your mining reward anytime. Once the timer runs out and your capacity is full, you must claim to continue passive mining. When you claim, you will also receive a random Bonus reward.`}
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      spotlightClicks: true,
      spotlightPadding: 0,
      target: '.my-first-step',
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          placement="left"
          content={`Workspace, the place where you can unlock devices, buy and equip necessary items to enhance your mining power and engage deeply with DePIN network.`}
        />
      ),
      placement: 'left-end',
      data: {
        next: '/workspace'
      },
      target: '.workspace',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          content={`The devices you have can significantly contribute to the DePIN network. By unlocking more of your devices, you play a crucial role in building a robust and interconnected DePIN network.`}
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: 'body',
      styles: {
        options: {
          overlayColor: 'rgba(0,0,0,0.3)'
        },
        spotlight: {
          background: 'transparent'
        }
      },
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          content={`
            <div className="space-y-3">
              <p>Depending on your current level, you will be able to unlock more devices:</p>
              <p className="flex items-center justify-between space-x-2 text-title">
                - From Level 1 -> Level 4:
                <span className="text-green-500">1 Device</span>
              </p>
              <p className="flex items-center justify-between space-x-2 text-title">
                - From Level 5 -> Level 14:
                <span className="text-green-500">2 Device</span>
              </p>
              <p className="flex items-center justify-between space-x-2 text-title">
                - From Level 15 onwards:
                <span className="text-green-500">3 Device</span>
              </p>
            </div>

            `}
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: 'body',
      styles: {
        options: {
          overlayColor: 'rgba(0,0,0,0.3)'
        },
        spotlight: {
          background: 'transparent'
        }
      },
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          placement="top-center"
          handleNext={handleNext}
          content="Click on each device, it will expand a list of the items included. Equip the items you have: CPU, RAM, GPU, and SSD."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: '...',
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: '...',
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          content="To increase your mining power, you can buy items in the Shop. By investing in these, you can enhance your contribution to the DePIN network and boost your performance."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: 'body',
      styles: {
        options: {
          overlayColor: 'rgba(0,0,0,0.3)'
        },
        spotlight: {
          background: 'transparent'
        }
      },
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          content="Click on the item you want and buy it. Once purchased, it will be automatically added to the ITEM section or you can equip now to enhance your mining power."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: 'body',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: '...',
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: '...',
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: '...',
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: '...',
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          content="After equipping the items, you'll notice an increase in your mining power. Apply the same to your other devices to boost your contributions to the DePIN network."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: 'body',
      styles: {
        options: {
          overlayColor: 'rgba(0,0,0,0.3)'
        },
        spotlight: {
          background: 'transparent'
        }
      },
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    }
  ]

  const handleJoyrideCallback = (data: any) => {
    const { status, type, action, index, step } = data
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false })
    } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as Events[]).includes(type)) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
      if (nextStepIndex === 1) {
        setTimeout(() => {
          const jsBody = document.getElementById('jsBody')
          jsBody?.scrollTo({ top: jsBody.scrollHeight, behavior: 'smooth' })
        })
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
    }
    // if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
    //   // Update state to advance the tour
    //   setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    // }
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    // // if (action === ACTIONS.NEXT && index === 3) {
    // //   router.push('/workspace')
    // // }
    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps })
    }
  }

  useEffect(() => {
    const isShowGuide = localStorage.getItem(DEPIN_GUIDE)
    if (isShowGuide === 'true') {
      return
    }
    if ((userInfo?.status === 'MINING' || userInfo?.status === 'CLAIMED') && !tourActive) {
      setState({ run: true, steps: _steps, stepIndex: 0, tourActive: true })
      localStorage.setItem(DEPIN_GUIDE, 'true')
    }
  }, [userInfo, tourActive])

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
          scrollToFirstStep
          getHelpers={handleGetHelpers}
          showSkipButton={false}
          hideBackButton={true}
          hideCloseButton={true}
          styles={{
            options: {
              zIndex: 10000,
              backgroundColor: 'transparent',
              overlayColor: 'rgba(0,0,0,0.95)',
              width: '100%'
            },
            spotlight: {
              borderRadius: 0
            }
          }}
        />
      )}
    </div>
  )
}
