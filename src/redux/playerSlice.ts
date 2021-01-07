import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Track} from 'react-native-track-player'

type QueueState = {
  queueArr: Track[]
  currentTrack: Track | null
  savedPosition: number
}

export const initialState: QueueState = {
  queueArr: [],
  currentTrack: null,
  savedPosition: 0,
}

const playerSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    updateQueueArr(state, action: PayloadAction<Track[]>) {
      state.queueArr = action.payload
    },
    updateCurrentTrack(state, action: PayloadAction<Track>) {
      state.currentTrack = action.payload
    },
    updateSavedPosition(state, action: PayloadAction<number>) {
      state.savedPosition = action.payload
    },
  },
})

export const {
  updateQueueArr,
  updateCurrentTrack,
  updateSavedPosition,
} = playerSlice.actions

export default playerSlice.reducer
