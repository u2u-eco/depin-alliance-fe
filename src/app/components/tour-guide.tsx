import useCommonStore from '@/stores/commonStore'
import { ReactNode, useEffect, useState } from 'react'
import Joyride, { STATUS, Step } from 'react-joyride'
interface State {
  run: boolean
  steps: Step[]
}
export default function TourGuide() {
  const { userInfo } = useCommonStore()
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: 'center',
        target: 'body'
      },
      {
        content: <h2>Sticky elements</h2>,
        floaterProps: {
          disableAnimation: true
        },
        placement: 'top',
        spotlightPadding: 0,
        target: '.my-first-step'
      },
      {
        content: 'These are our super awesome projects!',
        placement: 'top',
        styles: {
          options: {
            width: 300
          }
        },
        target: '.workspace',
        title: 'Our projects'
      }
      // {
      //   content: (
      //     <div>
      //       You can render anything!
      //       <br />
      //       <h3>Like this H3 title</h3>
      //     </div>
      //   ),
      //   placement: 'top',
      //   target: '.demo__how-it-works h2',
      //   title: 'Our Mission'
      // },
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
  })
  const handleJoyrideCallback = (data: any) => {
    const { status, type } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

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
          callback={handleJoyrideCallback}
          steps={steps}
          run={run}
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          styles={{
            options: {
              zIndex: 10000
            }
          }}
        />
      )}
    </div>
  )
}
