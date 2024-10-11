import { create } from 'zustand'
import { CURRENT_STATUS as I_CURRENT_STATUS, IDeviceItem, IUserInfo } from '@/interfaces/i.user'
import { getUserConfig, getUserInfo, getUserSetting } from '@/services/user'
import { IUserConfig, IUserLeague, IUserSetting, IUserTwitter } from '@/interfaces/i.league'
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
  safeAreaBottom: number
  userConfig: IUserConfig | null
  userSetting: IUserSetting | null
  userTwitter: IUserTwitter | null
  setSafeAreaBottom: (height: number) => void
  setHeightNav: (height: number) => void
  setToken: ({ token }: { token: string }) => void
  setUserInfo: ({ info }: { info: IUserInfo }) => void
  setUserTwitter: (info: IUserTwitter) => void
  setUserConfig: ({ config }: { config: IUserConfig }) => void
  setDevice: ({ info }: { info: Array<IDeviceItem> }) => void
  setCurrentStatus: ({ status }: { status: I_CURRENT_STATUS }) => void
  getUserInfo: () => Promise<any>
  getUserConfig: () => void
  getUserSetting: () => void
  setCurrentLeague: ({ league }: { league: IUserLeague | null }) => void
}

const useCommonStore = create<CommonState>((set) => ({
  isOpenPopup: false,
  token: '',
  userInfo: null,
  deviceInfo: [],
  currentLeague: null,
  userConfig: null,
  userSetting: null,
  userTwitter: null,
  heightNav: 70,
  safeAreaBottom: 0,
  currentStatus: I_CURRENT_STATUS.STARTED,
  setSafeAreaBottom: (height: number) => set({ safeAreaBottom: height }),
  setHeightNav: (height: number) => set({ heightNav: height }),
  setCurrentLeague: ({ league }) => set({ currentLeague: league }),
  setToken: ({ token }) => set({ token }),
  setUserInfo: ({ info }) => set({ userInfo: info }),
  setUserConfig: ({ config }) => set({ userConfig: config }),
  setUserTwitter: (info: IUserTwitter) => set({ userTwitter: info }),
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
  },
  getUserSetting: async () => {
    const response = await getUserSetting()
    if (response.status) {
      const config = response.data
      set(() => ({ userSetting: config }))
    }
  }
}))

export default useCommonStore
