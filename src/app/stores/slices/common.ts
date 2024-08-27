import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type CommonState = {
  isOpenPopup: boolean
}

const slice = createSlice({
  name: 'common',
  initialState: {
    isOpenPopup: false
  } as CommonState,
  reducers: {
    setOpenPopup: (
      state,
      { payload: { isOpenPopup } }: PayloadAction<{ isOpenPopup: boolean }>
    ) => {
      state.isOpenPopup = isOpenPopup
    }
  }
})

export const { setOpenPopup } = slice.actions
export default slice.reducer
