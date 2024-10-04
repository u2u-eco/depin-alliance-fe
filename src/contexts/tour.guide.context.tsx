import { createContext, useContext, useMemo, useState } from 'react'
import { Step, StoreHelpers } from 'react-joyride'
import { useSetState } from 'react-use'

export interface TourGuideState {
  run: boolean
  stepIndex: number
  steps: Step[]
  tourActive: boolean
}

const tourGuideState = {
  run: false,
  stepIndex: 0,
  steps: [],
  tourActive: false
}

export const TourGuideContext = createContext({
  state: tourGuideState,
  setState: () => undefined,
  helpers: null,
  setHelpers: () => undefined
})
TourGuideContext.displayName = 'TourGuideContext'

export function TourGuideProvider(props: any) {
  const [state, setState] = useSetState(tourGuideState)
  const [helpers, setHelpers] = useSetState<StoreHelpers>()

  const value = useMemo(
    () => ({
      state,
      helpers,
      setHelpers,
      setState
    }),
    [setState, state, helpers, setHelpers]
  )

  return <TourGuideContext.Provider value={value} {...props} />
}

export function useTourGuideContext(): {
  setState: (
    patch: Partial<TourGuideState> | ((previousState: TourGuideState) => Partial<TourGuideState>)
  ) => void
  state: TourGuideState
  helpers: StoreHelpers | null
  setHelpers: (_helpers: StoreHelpers) => void
} {
  const context = useContext(TourGuideContext)

  if (!context) {
    throw new Error('useTourGuideContext must be used within a TourGuideProvider')
  }

  return context
}
