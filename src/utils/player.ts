import {seekTo, skipToPrevious, skipToNext} from 'react-native-track-player'

import {store} from '../redux/store'
import {updateSavedPosition} from '../redux/playerSlice'
import showSnackbar from './snackbar'

const {dispatch} = store

export const skipToPreviousAndUpdatePosition = (): void => {
  skipToPrevious()
    .then(() => {
      dispatch(updateSavedPosition(0))
    })
    .catch(error => {
      showSnackbar(error.message)
    })
}

export const skipToNextAndUpdatePosition = (): void => {
  skipToNext()
    .then(() => {
      dispatch(updateSavedPosition(0))
    })
    .catch(error => {
      showSnackbar(error.message)
    })
}

export const seekToAndUpdatePosition = (position: number): void => {
  const {
    player: {currentTrack},
  } = store.getState()
  const duration = currentTrack?.duration || 0
  if (position <= 0) {
    seekTo(0)
    dispatch(updateSavedPosition(0))
  } else if (position >= duration) {
    seekTo(duration)
    dispatch(updateSavedPosition(duration))
  } else {
    seekTo(position)
    dispatch(updateSavedPosition(position))
  }
}
