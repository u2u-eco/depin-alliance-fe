import { create } from 'zustand'
import { IMissionPartner, IMissionQuiz } from '@/interfaces/i.missions'
interface IMissionsState {
  currentMission: IMissionPartner | null
  currentMissionQuiz: IMissionQuiz | null
  setCurrentMission: (item: IMissionPartner | null) => void
  setCurrentMissionQuiz: (item: IMissionQuiz) => void
}

const useMissionStore = create<IMissionsState>((set) => ({
  currentMission: null,
  currentMissionQuiz: null,
  setCurrentMission: (item) => set({ currentMission: item }),
  setCurrentMissionQuiz: (item) => set({ currentMissionQuiz: item })
}))

export default useMissionStore
