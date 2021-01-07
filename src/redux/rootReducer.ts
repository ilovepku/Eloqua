import {combineReducers} from '@reduxjs/toolkit'

import playerReducer from './playerSlice'
import favoritesReducer from './favoritesSlice'

const rootReducer = combineReducers({
  player: playerReducer,
  favorites: favoritesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
