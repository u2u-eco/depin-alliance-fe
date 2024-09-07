import { create } from 'zustand'
import { IMissionPartner } from '@/interfaces/i.missions'
interface IMissionsState {
  currentMission: IMissionPartner | null
  setCurrentMission: (item: IMissionPartner) => void
}

const useMissionStore = create<IMissionsState>((set) => ({
  currentMission: null,
  setCurrentMission: (item) => set({ currentMission: item })
}))

export default useMissionStore
