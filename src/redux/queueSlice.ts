import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Track} from 'react-native-track-player';

type QueueState = {
  queueArr: Track[];
};

let initialState: QueueState = {
  queueArr: [],
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    updateQueueArr(state, action: PayloadAction<Track[]>) {
      state.queueArr = action.payload;
    },
  },
});

export const {updateQueueArr} = queueSlice.actions;

export default queueSlice.reducer;
