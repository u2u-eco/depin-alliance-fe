import { motion } from 'framer-motion'
import React, { ReactNode, useEffect } from 'react'
import Info from './ui/info'
import CustomNavbar from './ui/custom-navbar'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import useCommonStore from '@/stores/commonStore'
import { useTourGuideContext } from '@/contexts/tour.guide.context'
interface Pageprops {
  children: ReactNode
  classNames?: {
    wrapper?: ClassValue
    container?: ClassValue
    animate?: ClassValue
    base?: ClassValue
  }
  disableOverscroll?: boolean
  wrapHidden?: boolean
}

const CustomPage = ({ children, classNames, disableOverscroll, wrapHidden }: Pageprops) => {
  const { heightNav } = useCommonStore()
  const { state: tourState } = useTourGuideContext()
  const pathName = usePathname()
  const isShowInfo =
    pathName !== '/avatar' &&
    pathName !== '/profile' &&
    pathName !== '/level' &&
    pathName !== '/mission/partners' &&
    pathName !== '/ranking' &&
    pathName !== '/setting' &&
    pathName !== '/setting/wallet' &&
    pathName !== '/mission/quiz' &&
    pathName !== '/league/member' &&
    pathName !== '/league/member/detail' &&
    pathName !== '/league/join-request' &&
    pathName !== '/league/mission' &&
    pathName !== '/league/ranking' &&
    pathName !== '/league/research' &&
    pathName !== '/league/innovate' &&
    pathName !== '/league/all-league' &&
    pathName !== '/league/all-league/detail' &&
    pathName !== '/map' &&
    pathName !== '/map/detail'
  let isShowSidebar =
    pathName !== '/inventory' &&
    pathName !== '/ranking' &&
    pathName !== '/setting' &&
    pathName !== '/setting/wallet' &&
    pathName !== '/avatar' &&
    pathName !== '/profile' &&
    pathName !== '/level' &&
    pathName !== '/mission/quiz' &&
    pathName !== '/league/member' &&
    pathName !== '/league/member/detail' &&
    pathName !== '/league/join-request' &&
    pathName !== '/league/ranking' &&
    pathName !== '/league/research' &&
    pathName !== '/league/innovate' &&
    pathName !== '/league/all-league' &&
    pathName !== '/league/all-league/detail' &&
    pathName !== '/map' &&
    pathName !== '/map/detail'

  if (
    tourState.tourActive &&
    (pathName === '/workspace' || tourState.stepIndex === 2 || tourState.stepIndex === 3)
  ) {
    isShowSidebar = false
  }

  const full = pathName === '/setting'
  return (
    <>
      <div className={cn('section', classNames?.wrapper)}>
        <div
          id="jsBody"
          style={{
            height: isShowSidebar ? `calc(100vh - ${heightNav}px)` : '100vh'
          }}
          className={` ${disableOverscroll ? 'overscroll-y-none' : ''} ${wrapHidden ? '' : 'overflow-y-auto'} flex flex-col no-scrollbar`}
        >
          <div className=" absolute"></div>
          <div className={cn(`container-custom ${full ? 'h-full' : ''}`, classNames?.container)}>
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              // transition={{ duration: 0.35 }}
              key="custom-page"
              className={cn(
                full
                  ? '[--space:_40px] xs:[--space:_48px] 2xs:[--space:_56px] h-[calc(100%_-_var(--space))]'
                  : '!will-change-auto',
                classNames?.animate
              )}
            >
              {isShowInfo && <Info />}
              <div
                id="jsWrapContainer"
                className={cn(
                  `${isShowInfo ? 'my-8 xs:my-10' : full ? 'my-5 xs:my-6 2xs:my-7 h-full' : 'my-5 xs:my-6 2xs:my-7'} max-w-[480px] mx-auto`,
                  classNames?.base
                )}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {isShowSidebar && <CustomNavbar />}
    </>
  )
}

export default CustomPage
