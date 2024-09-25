import React, { ReactNode, useEffect, useState } from 'react'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import useIsOnScreenKeyboardOpen from '@/hooks/useIsOnScreenKeyboardOpen'
import { useAppSound } from '@/hooks/useAppSound'

interface ModalProps {
  title?: string
  children: ReactNode
  background?: ReactNode
  isOpen: any
  onOpen?: any
  onOpenChange: any
  onClose?: any
  full?: boolean
}

const CustomModal = ({
  title,
  children,
  background,
  isOpen,
  onClose,
  onOpenChange,
  full
}: ModalProps) => {
  // const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const [placement, setPlacement] = useState<any>('bottom')
  const { isOpen: isKeyboardOpen, setOpen } = useIsOnScreenKeyboardOpen()
  const { buttonSound } = useAppSound()

  useEffect(() => {
    if (isOpen) {
      setPlacement(window && window.innerWidth >= 375 && !isKeyboardOpen ? 'bottom' : 'top')
    } else {
      setOpen(false)
    }
  }, [isOpen, isKeyboardOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      placement={placement}
      scrollBehavior={placement === 'top' ? 'outside' : 'normal'}
      hideCloseButton
      classNames={{
        base: full
          ? `max-w-full m-0 rounded-none w-full h-full p-0 bg-black/80 backdrop-blur-[4px]`
          : `max-w-full m-0 rounded-none h-full xs:h-auto bg-transparent xs:bg-green-600 before:content-[''] before:bottom-0 before:absolute before:left-0 before:size-full before:z-[-1] before:bg-[linear-gradient(to_top,#000000,#002012)] pt-10 xs:pt-12 pb-8 xs:pb-10 px-4 xs:border-t-[0.5px] min-[355px]:border-t-green-600 xs:[clip-path:_polygon(40px_0,100%_0,100%_100%,_0_100%,0_40px)] before:xs:[clip-path:_polygon(40px_0,100%_0,100%_100%,_0_100%,0_40px)] after:content-[''] after:absolute after:top-0 after:right-[40px] after:w-[60px] after:h-[160px] after:rounded-full after:rotate-[-150deg] after:bg-gradient after:blur-[68px] after:opacity-80 after:z-[-1]`,
        backdrop: full ? 'bg-transparent ' : 'bg-black/30 backdrop-blur-[4px]'
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div
            className={`max-w-[480px] mx-auto w-full max-xs:overflow-y-auto max-xs:no-scrollbar ${full ? 'h-full' : ''}`}
          >
            {full ? (
              <>{background}</>
            ) : (
              <>
                <div
                  className="absolute top-3 xs:top-4 min-[400px]::top-5 2xs:top-6 right-3 xs:right-4 cursor-pointer"
                  onClick={() => {
                    buttonSound()
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
