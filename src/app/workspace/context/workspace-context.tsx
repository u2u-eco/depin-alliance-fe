import { createContext, useContext, useState } from 'react'

type WorkspaceContextType = {
  typeShopFilter: string | null
  setTypeItemShop: (type: string) => void
  activeTab: string
  setActiveTab: (type: string) => void
}

export const WORKSPACE_TYPE = {
  DEVICE: 'device',
  ITEM: 'item',
  SHOP: 'shop'
}

export const WorkspaceContext = createContext<any>(null)

const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [typeShopFilter, setTypeItemShop] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('device')
  return (
    <WorkspaceContext.Provider value={{ typeShopFilter, setTypeItemShop, activeTab, setActiveTab }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceProvider
