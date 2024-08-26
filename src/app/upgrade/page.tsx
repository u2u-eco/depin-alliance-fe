"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import Info from '../components/info'
import { Tab, Tabs } from '@nextui-org/react'

export default function UpgradePage() {
  const [activeTab, setActiveTab] = useState('hardware')

  return (
    <>
      <AnimatePresence mode="wait">
        <div className="upgrade section">
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info/>
              <div className="mt-4">
                <Tabs>
                  <Tab key="hardware"></Tab>
                  <Tab key="hardware"></Tab>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}
