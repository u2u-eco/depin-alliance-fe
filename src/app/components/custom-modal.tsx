import React, { ReactNode, useEffect, useState } from 'react'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import useIsOnScreenKeyboardOpen from '@/hooks/useIsOnScreenKeyboardOpen'
import { useAppSound } from '@/hooks/useAppSound'
import { useTelegram } from '@/hooks/useTelegram'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
import { useTourGuideContext } from '@/contexts/tour.guide.context'

interface ModalProps {
  id?: string
  title?: string
  children: ReactNode
  background?: ReactNode
  isOpen: any
  onOpen?: any
  onOpenChange: any
  onClose?: any
  full?: boolean
  maxHeight?: number
  classNames?: {
    wrapper?: ClassValue
    base?: ClassValue
  }
}
const PLACEMENT_BOTTOM_WITH_PLATFORM = ['web', 'weba', 'unknown']
const CustomModal = ({
  title,
  children,
  background,
  isOpen,
  onClose,
  onOpenChange,
  full,
  classNames,
  maxHeight,
  id
}: ModalProps) => {
  const { webApp } = useTelegram()
  const [placement, setPlacement] = useState<any>('bottom')
  const { state: tourState, helpers, setState } = useTourGuideContext()
  const { isOpen: isKeyboardOpen, setOpen } = useIsOnScreenKeyboardOpen()
  const { buttonSound } = useAppSound()

  useEffect(() => {
    if (isOpen) {
      setPlacement(
        (window && window.innerWidth >= 375 && !isKeyboardOpen) ||
          (webApp?.platform && PLACEMENT_BOTTOM_WITH_PLATFORM.indexOf(webApp?.platform) !== -1)
          ? 'bottom'
          : 'top'
      )
    } else {
      setOpen(false)
    }
  }, [isOpen, isKeyboardOpen])

  const handleClose = () => {
    onClose && onClose()
    if (tourState.tourActive) {
      setState({ run: false, tourActive: false })
    }
  }

  return (
    <Modal
      id={id}
      isOpen={isOpen}
      onClose={handleClose}
      onOpenChange={onOpenChange}
      placement={placement}
      isDismissable={tourState?.tourActive ? false : true}
      scrollBehavior={placement === 'top' ? 'outside' : 'normal'}
      hideCloseButton
      classNames={{
        wrapper: cn(
          classNames?.wrapper,
          `${placement === 'top' && maxHeight && webApp?.platform === 'ios' ? `max-h-[60vh] overflow-y-auto no-scrollbar` : ''}`
        ),
        base: cn(
          full
            ? `max-w-full m-0 rounded-none w-full h-full p-0 bg-black/80 backdrop-blur-[4px]`
            : `max-w-full m-0 rounded-none h-full max-h-[100vh] overscroll-none xs:h-auto bg-transparent xs:bg-green-600 before:content-[''] before:bottom-0 before:absolute before:left-0 before:size-full before:z-[-1] before:bg-[linear-gradient(to_top,#000000,#002012)] pt-10 xs:pt-12 pb-8 xs:pb-10 px-4 xs:border-t-[0.5px] min-[355px]:border-t-green-600 xs:[clip-path:_polygon(40px_0,100%_0,100%_100%,_0_100%,0_40px)] before:xs:[clip-path:_polygon(40px_0,100%_0,100%_100%,_0_100%,0_40px)] after:content-[''] after:absolute after:top-0 after:right-[40px] after:w-[60px] after:h-[160px] after:rounded-full after:rotate-[-150deg] after:bg-gradient after:blur-[68px] after:opacity-80 after:z-[-1] `,
          classNames?.base,
          'jsModal'
        ),
        backdrop: full
          ? 'bg-transparent '
          : `bg-black/30 backdrop-blur-[4px] ${placement === 'top' ? 'bg-black' : ''}`
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div
            className={`max-w-[480px] mx-auto w-full ${full ? 'h-full' : 'overflow-y-auto no-scrollbar overscroll-y-none overscroll-x-none overflow-x-hidden'}`}
          >
            {full ? (
              <>{background}</>
            ) : (
              <>
                <div
                  className="absolute top-3 xs:top-4 min-[400px]::top-5 2xs:top-6 right-3 xs:right-4 cursor-pointer"
                  onClick={() => {
                    buttonSound.play()
                    onClose()
                  }}
                >
                  <img
                    className="size-6"
                    src="/assets/images/icons/icon-close.svg"
                    alt="Icon Close"
                  />
                </div>
                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                  <div className="font-airnt font-medium text-lg xs:text-xl 2xs:text-2xl tracking-[1px] text-title text-center !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px]">
                    {title}
                  </div>
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                </div>
              </>
            )}
            {children}
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
