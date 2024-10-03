import TutorialModal from '@/app/home/components/tutorial'
import React from 'react'
import Joyride, { TooltipRenderProps } from 'react-joyride'
import ItemTutorial from './item-tutorial'

const CustomTutorial = (props: TooltipRenderProps) => {
  const { backProps, closeProps, continuous, index, primaryProps, skipProps, step, tooltipProps } =
    props

  return (
    <div
      className="relative w-[100vw] max-w-[480px] h-[100vh] top-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-[4px] flex flex-col justify-between"
      {...tooltipProps}
    >
      {/* <button className="tooltip__close" {...closeProps}>
        &times;
      </button> */}
      {step.title && <h4 className="tooltip__title">{step.title}</h4>}
      <div className="tooltip__content h-full">{step.content}</div>
      <div className="tooltip__footer">
        <button className="tooltip__button" {...skipProps}>
          {skipProps.title}
        </button>
        <div className="tooltip__spacer">
          {index > 0 && (
            <button className="tooltip__button" {...backProps}>
              {backProps.title}
            </button>
          )}
          {continuous && (
            <button className="tooltip__button tooltip__button--primary" {...primaryProps}>
              {primaryProps.title}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomTutorial
