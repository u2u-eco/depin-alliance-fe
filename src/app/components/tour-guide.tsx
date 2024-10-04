import { useTourGuideContext } from '@/contexts/tour.guide.context'
import useCommonStore from '@/stores/commonStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Joyride, { STATUS, Step, ACTIONS, StoreHelpers, EVENTS, Events } from 'react-joyride'
import TutorialModal from '../home/components/tutorial'
import ItemTutorial from './ui/item-tutorial'

export default function TourGuide() {
  const { userInfo } = useCommonStore()
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
      content: <ItemTutorial handleNext={handleNext} />,
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
      content: <ItemTutorial handleNext={handleNext} />,
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
      content: <ItemTutorial handleNext={handleNext} placement="left" />,
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
      content: <ItemTutorial handleNext={handleNext} />,
      placement: 'top',
      target: '.device-0',
      spotlightClicks: true,
      spotlightPadding: 0,
      hideFooter: true
    },
    {
      content: <ItemTutorial handleNext={handleNext} />,
      placement: 'top',
      target: '.device-0',
      hideFooter: true
    }
    // {
    //   content: (
    //     <div>
    //       <h3>All about us</h3>
    //       <svg
    //         height="50px"
    //         preserveAspectRatio="xMidYMid"
    //         viewBox="0 0 96 96"
    //         width="50px"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <g>
    //           <path
    //             d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
    //             fill="#000000"
    //           />
    //         </g>
    //       </svg>
    //     </div>
    //   ),
    //   placement: 'left',
    //   target: '.demo__about h2'
    // },
    // {
    //   content: <h2>Let's all folks</h2>,
    //   placement: 'center',
    //   target: 'body'
    // }
  ]

  const handleJoyrideCallback = (data: any) => {
    const { status, type, action, index, step } = data
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false, stepIndex: 0 })
    } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as Events[]).includes(type)) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
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
    // // if (action === ACTIONS.NEXT && index === 3) {
    // //   router.push('/workspace')
    // // }
    // if (finishedStatuses.includes(status)) {
    //   setState({ run: false, steps })
    // }
  }

  useEffect(() => {
    if ((userInfo?.status === 'MINING' || userInfo?.status === 'CLAIMED') && !tourActive) {
      setState({ run: true, steps: _steps, stepIndex: 0, tourActive: true })
    }
  }, [userInfo, tourActive])

  return (
    <div>
      {window && (
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          disableOverlayClose
          run={run}
          stepIndex={stepIndex}
          continuous
          // scrollToFirstStep
          getHelpers={handleGetHelpers}
          // showSkipButton={false}
          // hideBackButton={true}
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
