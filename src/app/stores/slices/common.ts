import { CURRENT_STATUS, IDeviceItem, IUserInfo } from '@/app/interfaces/i.user'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type CommonState = {
  isOpenPopup: boolean
  token: string
  userInfo: IUserInfo
  deviceInfo: Array<IDeviceItem> | []
  currentStatus: CURRENT_STATUS
}

const slice = createSlice({
  name: 'common',
  initialState: {
    isOpenPopup: false,
    token: '',
    userInfo: {},
    deviceInfo: [],
    currentStatus: CURRENT_STATUS.STARTED
  } as CommonState,
  reducers: {
    setOpenPopup: (
      state,
      { payload: { isOpenPopup } }: PayloadAction<{ isOpenPopup: boolean }>
    ) => {
      state.isOpenPopup = isOpenPopup
    },
    setToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token
    },
    setUserInfo: (state, { payload: { info } }: PayloadAction<{ info: IUserInfo }>) => {
      state.userInfo = info
    },
    setDevice: (state, { payload: { info } }: PayloadAction<{ info: Array<IDeviceItem> }>) => {
      state.deviceInfo = info
    },
    setCurrentStatus: (
      state,
      { payload: { status } }: PayloadAction<{ status: CURRENT_STATUS }>
    ) => {
      state.currentStatus = status
    }
  }
})

export const { setOpenPopup, setToken, setUserInfo, setDevice, setCurrentStatus } = slice.actions
export default slice.reducer
