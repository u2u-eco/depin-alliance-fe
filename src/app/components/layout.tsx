"use client"

import { NextUIProvider } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function Layout({ children }: any) {
  return (
    <div className="wrapper">
      <NextUIProvider>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </NextUIProvider>
    </div>
  )
}
