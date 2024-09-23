'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CustomPage from '../components/custom-page'
import { useRouter } from 'next/navigation'
import Device from './components/device'
import Item from './components/item'
import { useTelegram } from '@/hooks/useTelegram'
import useCommonStore from '@/stores/commonStore'
import ShopPage from './components/shop/shop'
import { WORKSPACE_TYPE, WorkspaceContext } from './context/workspace-context'

export default function WorkspaceContent() {
  const refList = useRef<any>()
  const router = useRouter()
  const { heightNav, safeAreaBottom } = useCommonStore()
  const { webApp } = useTelegram()
  const [maxHeight, setMaxHeightListContent] = useState<number>(200)
  const { activeTab, setActiveTab, setTypeItemShop } = useContext(WorkspaceContext)
  // const [activeTab, setActiveTab] = useState(WORKSPACE_TYPE.DEVICE)

  const handleBack = () => {
    router.back()
  }
  const handleSelectTab = (tab: string) => {
    if (tab !== WORKSPACE_TYPE.SHOP) {
      setTypeItemShop(null)
    }
    setActiveTab(tab)
  }

  useEffect(() => {
    setTimeout(() => {
      const offsetTop = refList.current?.getBoundingClientRect()?.top
      const wrapChidden = document.getElementById('jsWrapContainer')
      if (offsetTop && webApp?.viewportStableHeight) {
        let margin = 0
        if (wrapChidden) {
          const marginOfWrap = window.getComputedStyle(wrapChidden)
          margin = Number(marginOfWrap.marginBottom.replaceAll('px', ''))
        }
        const heightTopBottom = offsetTop + margin + heightNav - 10
        setMaxHeightListContent(webApp?.viewportStableHeight + safeAreaBottom - heightTopBottom)
      }
    }, 500)
  }, [webApp?.viewportStableHeight])
  return (
    <>
      <CustomPage
        classNames={{
          wrapper:
            "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-[linear-gradient(315deg,#000_0,#00331d_50%,#000_72%)] after:z-[-2]"
        }}
        wrapHidden
        disableOverscroll={activeTab === WORKSPACE_TYPE.ITEM ? true : false}
      >
        <div className="flex items-center justify-center mt-8">
          {Object.values(WORKSPACE_TYPE).map((item, index) => (
            <motion.div
              whileTap={{ scale: 0.95 }}
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleSelectTab(item)}
            >
              <img
                className="mx-auto max-w-[101%] w-[101%]"
                src={`/assets/images/upgrade/upgrade-tab${activeTab === item ? '-active' : ''}.svg`}
                alt="Upgrade Tab"
              />
              <div
                className={`absolute top-[3px] h-full left-0 w-full flex items-center justify-center font-airnt text-base xs:text-lg 2xs:text-xl font-medium tracking-[1px] text-green-800 uppercase ${activeTab === item ? '!text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]' : ''}`}
              >
                {item}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6" style={{ height: maxHeight }} ref={refList}>
          {activeTab === WORKSPACE_TYPE.DEVICE && (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
              key={WORKSPACE_TYPE.DEVICE}
            >
              <Device height={maxHeight} />
            </motion.div>
          )}
          {activeTab === WORKSPACE_TYPE.ITEM && (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
              key={WORKSPACE_TYPE.ITEM}
            >
              <Item height={maxHeight} />
            </motion.div>
          )}
          {activeTab === WORKSPACE_TYPE.SHOP && (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
              key={WORKSPACE_TYPE.ITEM}
            >
              <ShopPage height={maxHeight} />
            </motion.div>
          )}
        </div>
      </CustomPage>
    </>
  )
}
