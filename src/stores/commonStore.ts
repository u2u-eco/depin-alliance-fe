import { create } from 'zustand'
import { CURRENT_STATUS, IDeviceItem, IUserInfo } from '@/interfaces/i.user'
import { getUserInfo } from '@/services/user'

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
  getUserInfo: () => void
}

const useCommonStore = create<CommonState>((set) => ({
  isOpenPopup: false,
  token: '',
  userInfo: null,
  deviceInfo: [],
  currentStatus: CURRENT_STATUS.STARTED,
  setToken: ({ token }) => set({ token }),
  setUserInfo: ({ info }) => set({ userInfo: info }),
  setDevice: ({ info }) => set({ deviceInfo: info }),
  setCurrentStatus: ({ status }) => set({ currentStatus: status }),
  getUserInfo: async () => {
    const response = await getUserInfo()
    if (response.status) {
      const user = response.data
      set(() => ({ userInfo: user }))
    }
  }
}))

export default useCommonStore
