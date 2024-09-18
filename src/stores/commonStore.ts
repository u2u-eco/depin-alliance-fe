import { create } from 'zustand'
import {
  CURRENT_STATUS as I_CURRENT_STATUS,
  IDeviceItem,
  IUser,
  IUserInfo
} from '@/interfaces/i.user'
import { getUserConfig, getUserInfo } from '@/services/user'
import { IUserConfig, IUserLeague } from '@/interfaces/i.league'
import Cookies from 'js-cookie'
import { CURRENT_STATUS } from '@/constants'
interface CommonState {
  isOpenPopup: boolean
  token: string
  userInfo: IUserInfo | null
  deviceInfo: Array<IDeviceItem> | []
  currentStatus: I_CURRENT_STATUS
  currentLeague: IUserLeague | null
  heightNav: number
  userConfig: IUserConfig | null
  setHeightNav: (height: number) => void
  setToken: ({ token }: { token: string }) => void
  setUserInfo: ({ info }: { info: IUserInfo }) => void
  setUserConfig: ({ config }: { config: IUserConfig }) => void
  setDevice: ({ info }: { info: Array<IDeviceItem> }) => void
  setCurrentStatus: ({ status }: { status: I_CURRENT_STATUS }) => void
  getUserInfo: () => Promise<any>
  getUserConfig: () => void
  setCurrentLeague: ({ league }: { league: IUserLeague }) => void
}

const useCommonStore = create<CommonState>((set) => ({
  isOpenPopup: false,
  token: '',
  userInfo: null,
  deviceInfo: [],
  currentLeague: null,
  userConfig: null,
  heightNav: 70,
  currentStatus: I_CURRENT_STATUS.STARTED,
  setHeightNav: (height: number) => set({ heightNav: height }),
  setCurrentLeague: ({ league }) => set({ currentLeague: league }),
  setToken: ({ token }) => set({ token }),
  setUserInfo: ({ info }) => set({ userInfo: info }),
  setUserConfig: ({ config }) => set({ userConfig: config }),
  setDevice: ({ info }) => set({ deviceInfo: info }),
  setCurrentStatus: ({ status }) => set({ currentStatus: status }),
  getUserInfo: async () => {
    const response = await getUserInfo()
    if (response.status) {
      const user = response.data
      if (response.data?.status) {
        Cookies.set(CURRENT_STATUS, response.data?.status)
      }
      set(() => ({ userInfo: user, currentStatus: response.data?.status }))
    }
    return response
  },
  getUserConfig: async () => {
    const response = await getUserConfig()
    if (response.status) {
      const config = response.data
      set(() => ({ userConfig: config }))
    }
  }
}))

export default useCommonStore
