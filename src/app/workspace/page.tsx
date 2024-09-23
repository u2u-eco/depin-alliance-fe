'use client'

import React, { useEffect } from 'react'

import useCommonStore from '@/stores/commonStore'
import WorkspaceProvider from './context/workspace-context'
import WorkspaceContent from './workspace-content'

export default function WorkspacePage() {
  const { getUserConfig } = useCommonStore()

  useEffect(() => {
    getUserConfig()
  }, [])

  return (
    <WorkspaceProvider>
      <WorkspaceContent />
    </WorkspaceProvider>
  )
}
