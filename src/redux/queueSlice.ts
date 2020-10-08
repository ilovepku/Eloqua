import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Track} from 'react-native-track-player';

type QueueState = {
  pieceIdQueueArr: string[];
};

let initialState: QueueState = {
  pieceIdQueueArr: [],
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    updatePieceIdQueueArr(state, action: PayloadAction<Track[]>) {
      // action.payload : <Array<Object as described in Track Object>>
      state.pieceIdQueueArr = action.payload.map((track) => track.id);
    },
  },
});

export const {updatePieceIdQueueArr} = queueSlice.actions;

export default queueSlice.reducer;
