import { create } from 'zustand'
import { CURRENT_STATUS, IDeviceItem, IUserInfo } from '@/interfaces/i.user'

interface CommonState {
  isOpenPopup: boolean
  token: string
  userInfo: IUserInfo | null
  deviceInfo: Array<IDeviceItem> | []
  currentStatus: CURRENT_STATUS
  setToken: ({ token }: { token: string }) => void
  setUserInfo: ({ info }: { info: IUserInfo }) => void
  setDevice: ({ info }: { info: Array<IDeviceItem> }) => void
  setCurrentStatus: ({ status }: { status: CURRENT_STATUS }) => void
}

const useCommonStore = create<CommonState>((set) => ({
  isOpenPopup: false,
  token: '',
  userInfo: null,
  deviceInfo: [],
  currentStatus: CURRENT_STATUS.STARTED,
  setToken: ({ token }) => set(() => ({ token })),
  setUserInfo: ({ info }) => set({ userInfo: info }),
  setDevice: ({ info }) => set({ deviceInfo: info }),
  setCurrentStatus: ({ status }) => set({ currentStatus: status })
}))

export default useCommonStore
