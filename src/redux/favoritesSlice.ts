import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type FavoritesState = {
  favMap: string[];
};

let initialState: FavoritesState = {
  favMap: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFav(state, action: PayloadAction<string>) {
      const pieceId = action.payload;

      const index = state.favMap.indexOf(pieceId);

      state.favMap =
        index === -1
          ? [
              ...state.favMap.slice(0, index),
              pieceId,
              ...state.favMap.slice(index),
            ]
          : [...state.favMap.slice(0, index), ...state.favMap.slice(index + 1)];
    },
  },
});

export const {toggleFav} = favoritesSlice.actions;

export default favoritesSlice.reducer;
