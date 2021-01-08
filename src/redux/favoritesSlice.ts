/* eslint-disable no-param-reassign */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type FavoritesState = {
  favArr: string[]
}

export const initialState: FavoritesState = {
  favArr: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFav(state, action: PayloadAction<string>): void {
      const pieceId = action.payload

      const index = state.favArr.indexOf(pieceId)

      state.favArr =
        index === -1
          ? [
              ...state.favArr.slice(0, index),
              pieceId,
              ...state.favArr.slice(index),
            ]
          : [...state.favArr.slice(0, index), ...state.favArr.slice(index + 1)]
    },
  },
})

export const {toggleFav} = favoritesSlice.actions

export default favoritesSlice.reducer
