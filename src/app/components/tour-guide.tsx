import useCommonStore from '@/stores/commonStore'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Joyride, { STATUS, Step, ACTIONS } from 'react-joyride'
import TutorialModal from '../home/components/tutorial'
import CustomTutorial from './ui/custom-tutorial'
import ItemTutorial from './ui/item-tutorial'
interface State {
  run: boolean
  steps: Step[]
}
export default function TourGuide() {
  const { userInfo } = useCommonStore()
  const router = useRouter()
  const helpers = useRef<any>()

  const handleGetHelpers = (_helpers: any) => {
    helpers.current = _helpers
  }
  const handleNext = () => {
    helpers.current.next()
  }

  const handleSkip = () => {
    helpers.current.skip()
  }
  const handleBack = () => {
    helpers.current.prev()
  }
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [
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
        spotlightPadding: 0,
        target: '.my-first-step',
        hideFooter: true
      },
      {
        content: <ItemTutorial handleNext={handleNext} />,
        // floaterProps: {
        //   disableAnimation: true
        // },
        placement: 'top',
        target: '.my-first-step',
        styles: {
          options: {
            width: '100%'
          }
        },
        hideFooter: true
      },
      {
        content: <ItemTutorial handleNext={handleNext} />,
        placement: 'left-end',
        data: {
          next: '/workspace'
        },
        target: '.workspace',
        hideFooter: true
      },
      {
        content: <ItemTutorial handleNext={handleNext} />,
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
  })
  const handleJoyrideCallback = (data: any) => {
    const { status, type, action, index } = data
    // if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
    //   // Update state to advance the tour
    //   setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    // }
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    if (action === ACTIONS.NEXT && index === 4) {
      router.push('/workspace')
    }
    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps })
    }
  }

  useEffect(() => {
    if (userInfo?.status === 'MINING' || userInfo?.status === 'CLAIMED') {
      setTimeout(() => {
        setState({ run: true, steps })
      })
    }
  }, [userInfo])
  return (
    <div>
      {window && (
        <Joyride
          // tooltipComponent={CustomTutorial}
          callback={handleJoyrideCallback}
          steps={steps}
          disableOverlayClose
          run={run}
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
              overlayColor: 'rgba(0,0,0,0.8)',
              width: '100%'
            }
          }}
        />
      )}
    </div>
  )
}
