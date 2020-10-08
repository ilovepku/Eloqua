import {combineReducers} from '@reduxjs/toolkit';

import favoritesReducer from './favoritesSlice';
import queueReducer from './queueSlice';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  queue: queueReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
