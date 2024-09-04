import { create } from 'zustand'
import { CURRENT_STATUS as I_CURRENT_STATUS, IDeviceItem, IUserInfo } from '@/interfaces/i.user'
import { getUserInfo } from '@/services/user'
import { IUserLeague } from '@/interfaces/i.league'
import Cookies from 'js-cookie'
import { CURRENT_STATUS } from '@/constants'
interface CommonState {
  isOpenPopup: boolean
  token: string
  userInfo: IUserInfo | null
  deviceInfo: Array<IDeviceItem> | []
  currentStatus: I_CURRENT_STATUS
  currentLeague: IUserLeague | null
  setToken: ({ token }: { token: string }) => void
  setUserInfo: ({ info }: { info: IUserInfo }) => void
  setDevice: ({ info }: { info: Array<IDeviceItem> }) => void
  setCurrentStatus: ({ status }: { status: I_CURRENT_STATUS }) => void
  getUserInfo: () => void
  setCurrentLeague: ({ league }: { league: IUserLeague }) => void
}

const useCommonStore = create<CommonState>((set) => ({
  isOpenPopup: false,
  token: '',
  userInfo: null,
  deviceInfo: [],
  currentLeague: null,
  currentStatus: I_CURRENT_STATUS.STARTED,
  setCurrentLeague: ({ league }) => set({ currentLeague: league }),
  setToken: ({ token }) => set({ token }),
  setUserInfo: ({ info }) => set({ userInfo: info }),
  setDevice: ({ info }) => set({ deviceInfo: info }),
  setCurrentStatus: ({ status }) => set({ currentStatus: status }),
  getUserInfo: async () => {
    const response = await getUserInfo()
    if (response.status) {
      const user = response.data
      if (response.data?.status) {
        Cookies.set(CURRENT_STATUS, response.data?.status)
      }
      set(() => ({ userInfo: user }))
    }
  }
}))

export default useCommonStore
