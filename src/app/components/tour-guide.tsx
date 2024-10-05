import { useTourGuideContext } from '@/contexts/tour.guide.context'
import useCommonStore from '@/stores/commonStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Joyride, { STATUS, Step, ACTIONS, StoreHelpers, EVENTS, Events } from 'react-joyride'
import TutorialModal from '../home/components/tutorial'
import ItemTutorial from './ui/item-tutorial'
import { DEPIN_GUIDE } from '@/constants'
import ModalReward from './ui/modal-reward'
import { useDisclosure } from '@nextui-org/react'
import { formatNumber } from '@/helper/common'

export default function TourGuide() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { userInfo } = useCommonStore()
  const [mounted, setMounted] = useState<boolean>(false)
  const [initToured, setInitToured] = useState<boolean>(false)
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
  const handleClose = () => {
    helpers?.close()
  }
  const handleComplete = () => {
    handleClose()
    onOpen()
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
          handleSkip={handleSkip}
          content="Welcome to DePIN Alliance, the Odyssey of Decentralists, your first step is here to make your mark on the decentralized future. Together, we’ll build a more decentralized world."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: 'body',
      styles: {
        overlay: {
          mixBlendMode: 'unset'
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
          handleSkip={handleSkip}
          content={`Click the "Start Contributing" button to start mining, this process will generate passive points for you.`}
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
          handleSkip={handleSkip}
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
          handleSkip={handleSkip}
          // placement="left"
          content={`Workspace, the place where you can unlock devices, buy and equip necessary items to enhance your mining power and engage deeply with DePIN network.`}
        />
      ),
      placement: 'left-end',
      data: {
        next: '/workspace'
      },
      target: '.workspace',
      spotlightClicks: true,
      spotlightPadding: 10,
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          handleSkip={handleSkip}
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
          handleSkip={handleSkip}
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
      hideFooter: true,
      data: {
        index: 7
      }
    },
    {
      content: (
        <ItemTutorial
          placement="top-center"
          handleNext={handleNext}
          handleSkip={handleSkip}
          content="Click on each device, it will expand a list of the items included. Equip the items you have: CPU, RAM, GPU, and SSD."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 5,
      hideFooter: true
    },
    {
      content: '',
      floaterProps: {
        disableAnimation: true
      },
      isFixed: true,
      spotlightClicks: true,
      placement: 'top',
      target: '.device-0',
      spotlightPadding: 10,
      styles: {
        overlay: {
          pointerEvents: 'none'
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
      target: '.jsBuyNow',
      styles: {
        overlay: {
          background: 'transparent',
          pointerEvents: 'none'
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
          handleSkip={handleSkip}
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
      hideFooter: true,
      data: {
        index: 11
      }
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          handleSkip={handleSkip}
          content="Click on the item you want and buy it. Once purchased, it will be automatically added to the ITEM section or you can equip now to enhance your mining power."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.shop-item-1',
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
      target: '.jsBuyItem',
      spotlightClicks: true,
      spotlightPadding: 0,
      styles: {
        overlay: {
          background: 'transparent',
          pointerEvents: 'none'
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
      target: '.jsEquipNow',
      spotlightClicks: true,
      spotlightPadding: 0,
      styles: {
        overlay: {
          background: 'transparent',
          pointerEvents: 'none'
        }
      },
      hideFooter: true,
      data: {
        index: 13
      }
    },
    {
      content: <ItemTutorial arrow arrowClass="rotate-180" />,
      floaterProps: {
        disableAnimation: true
      },
      placement: 'bottom',
      target: '#item-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      styles: {
        overlay: {
          background: 'transparent',
          pointerEvents: 'none'
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
      target: '#jsConfirm',
      spotlightClicks: true,
      spotlightPadding: 0,
      styles: {
        overlay: {
          background: 'transparent',
          pointerEvents: 'none'
        }
      },
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          handleSkip={handleSkip}
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
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          placement="top-center"
          handleNext={handleNext}
          handleSkip={handleSkip}
          content="All the items you have are listed in the ITEM, making it easy to manage and equip them as needed."
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      placement: 'top',
      target: '.workspace-tab-item',
      spotlightClicks: true,
      spotlightPadding: 5,
      hideFooter: true
    },
    {
      content: (
        <ItemTutorial
          handleNext={handleNext}
          handleSkip={handleSkip}
          content="You can check the items you've acquired in your inventory, where you'll find all the equipment ready to enhance your mining power."
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
          handleSkip={handleSkip}
          content={`Now go back to "Home" you can track your contributions and make informed decisions about enhancing your setup.`}
        />
      ),
      floaterProps: {
        disableAnimation: true
      },
      data: {
        next: '/home'
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
          handleComplete={handleComplete}
          content={`
          <div className="space-y-2 xs:space-y-3">
            <p>Some tips for your growth:</p>
            <p>&#8226; Mining Power is everything</p>
            <p>&#8226; Be active to claim your mining rewards and use your points wisely.</p>
            <p>&#8226; Invite your friends to join and earn bonuses together.</p>
            <p>&#8226; Engage in community discussions to learn and share strategies.</p>
            <p>&#8226; Regularly check for new items in the Shop to enhance your setup.</p>
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
        spotlight: {
          background: 'transparent'
        }
      },
      hideFooter: true
    }
  ]

  const handleJoyrideCallback = (data: any) => {
    const { status, type, action, index, step } = data
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false, tourActive: false })
    } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as Events[]).includes(type)) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
      console.log('🚀 ~ handleJoyrideCallback ~ nextStepIndex:', nextStepIndex)
      if (nextStepIndex === 8 || nextStepIndex === 12) {
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
    }
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
    const isShowGuide = localStorage.getItem(DEPIN_GUIDE)
    // if (isShowGuide === 'true') {
    //   return
    // }
    if (
      (userInfo?.status === 'MINING' || userInfo?.status === 'CLAIMED') &&
      !tourActive &&
      !initToured
    ) {
      setState({ run: true, steps: _steps, stepIndex: 0, tourActive: true })
      setInitToured(true)
      localStorage.setItem(DEPIN_GUIDE, 'true')
    }
  }, [userInfo, tourActive])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
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
      <ModalReward
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onCloseModal={onClose}
        title="tutorial reward"
        point={formatNumber(5000, 0, 0)}
        text={
          <>
            <p>You’ve received the tutorial reward.</p>
            <p>Start contributing and save the world now!</p>
          </>
        }
      />
    </>
  )
}
