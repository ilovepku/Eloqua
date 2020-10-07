import {combineReducers} from '@reduxjs/toolkit';

import favoritesReducer from './favoritesSlice';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
