import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'
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
    pathName !== '/mission/quiz' &&
    pathName !== '/league/member' &&
    pathName !== '/league/member/detail' &&
    pathName !== '/league/join-request' &&
    pathName !== '/league/mission' &&
    pathName !== '/league/ranking' &&
    pathName !== '/league/research' &&
    pathName !== '/league/innovate' &&
    pathName !== '/league/all-league' &&
    pathName !== '/league/all-league/detail'
  let isShowSidebar =
    pathName !== '/inventory' &&
    pathName !== '/ranking' &&
    pathName !== '/setting' &&
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
    pathName !== '/league/all-league/detail'

  if (pathName === '/workspace' && tourState.tourActive) {
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
          <div className={`container-custom ${full ? 'h-full' : ''}`}>
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              // transition={{ duration: 0.35 }}
              key="custom-page"
              className={
                full
                  ? '[--space:_40px] xs:[--space:_48px] 2xs:[--space:_56px] h-[calc(100%_-_var(--space))]'
                  : '!will-change-auto'
              }
            >
              {isShowInfo && <Info />}
              <div
                id="jsWrapContainer"
                className={`${isShowInfo ? 'my-8 xs:my-10' : full ? 'my-5 xs:my-6 2xs:my-7 h-full' : 'my-5 xs:my-6 2xs:my-7'} max-w-[480px] mx-auto`}
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
