import { createContext, useContext, useState } from 'react'

type WorldMapContextType = {
  continent: string | null
  setContinent: (type: string) => void
}

export const WorldMapContext = createContext<WorldMapContextType | any>({})

const WorldMapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [continent, setContinent] = useState<string>('')
  return (
    <WorldMapContext.Provider value={{ continent, setContinent }}>
      {children}
    </WorldMapContext.Provider>
  )
}

export default WorldMapProvider
