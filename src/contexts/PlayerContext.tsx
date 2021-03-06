import React, {
  createContext,
  useEffect,
  useContext,
  PropsWithChildren,
} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  Track,
  STATE_PLAYING,
  STATE_BUFFERING,
  usePlaybackState,
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  getTrack,
  reset,
  add,
  play,
  pause,
  seekTo,
  skip,
  remove,
  getQueue,
} from 'react-native-track-player'

import {RootState} from '../redux/rootReducer'
import {
  updateQueueArr,
  updateCurrentTrack,
  updateSavedPosition,
} from '../redux/playerSlice'
import {
  skipToPreviousAndUpdatePosition,
  skipToNextAndUpdatePosition,
  seekToAndUpdatePosition,
} from '../utils/player'
import showSnackbar from '../utils/snackbar'
import {JUMP_INTERVAL} from '../settings'

interface PlayerContextType {
  currentTrack: Track | null
  playbackState: string
  duration: number
  position: number
  playNewTrack: (track: Track) => void
  playQueuedTrack: (id: string) => void
  togglePlayback: () => void
  skipPrevious: () => void
  skipNext: () => void
  seek: (amount: number) => void
  jumpBackward: () => void
  jumpForward: () => void
  isTrackInQueue: (id: string) => boolean
  toggleQueued: (id: string, track: Track) => void
}

export const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  playbackState: '',
  duration: 0,
  position: 0,
  playNewTrack: () => null,
  playQueuedTrack: () => null,
  togglePlayback: () => null,
  skipPrevious: () => null,
  skipNext: () => null,
  seek: () => null,
  jumpBackward: () => null,
  jumpForward: () => null,
  isTrackInQueue: () => false,
  toggleQueued: () => null,
})

export const PlayerContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const {
    player: {queueArr, currentTrack, savedPosition},
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const playbackState = usePlaybackState()
  const {position} = useTrackPlayerProgress()

  // rehydrate duration from redux currentTrack, or set to 0 with no currentTrack
  const duration = currentTrack?.duration || 0

  // on track changed: update redux currentTrack with new track info
  useTrackPlayerEvents(
    ['playback-track-changed'],
    async ({nextTrack}: {nextTrack: string}) => {
      if (nextTrack) {
        const newTrack = await getTrack(nextTrack)
        dispatch(updateCurrentTrack(newTrack))
      }
    },
  )

  // on queue ended: pause and reload last queued track, MAYBE: load first queued track
  // TODO: loop queue check and mechanism
  useTrackPlayerEvents(['playback-queue-ended'], ({track}: {track: string}) => {
    if (track) {
      pause()
      skip(track)
      // will in turn trigger TrackPlayerEvent: "playback-track-changed" to reset the last queued track as current track
    }
  })

  // didMount: if player queue is empty, attempt to rehydrate with persisted queueArr
  useEffect(() => {
    ;(async (): Promise<void> => {
      const queuedTracks = await getQueue()
      if (!queuedTracks.length) {
        await add([...queueArr])
        if (currentTrack) {
          await skip(currentTrack.id)
          seekTo(savedPosition)
        }
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // on player position chagne: auto sync redux savedPosition, check for 0 to avoid resetting savedPosition on queue rehydration
  useEffect(() => {
    position !== 0 && dispatch(updateSavedPosition(position))
  }, [dispatch, position])

  // queue related
  const isTrackInQueue = (id: string): boolean =>
    queueArr.some(track => track.id === id)

  const updateQueue = async (): Promise<void> => {
    const queuedTracks = await getQueue()
    dispatch(updateQueueArr(queuedTracks))
  }

  const toggleQueued = async (id: string, track: Track): Promise<void> => {
    if (currentTrack?.id === id) {
      showSnackbar("Can't remove current speech from queue")
    } else {
      if (isTrackInQueue(id)) {
        await remove(id)
      } else {
        await add(track)
      }
      updateQueue()
    }
  }

  // playback related
  const playNewTrack = async (track: Track): Promise<void> => {
    await reset()
    await add(track)
    play()
    updateQueue()
  }

  const playQueuedTrack = async (id: string): Promise<void> => {
    await skip(id)
    play()
  }

  const togglePlayback = (): void => {
    if (currentTrack) {
      if (
        playbackState !== STATE_PLAYING &&
        playbackState !== STATE_BUFFERING
      ) {
        play()
      } else {
        pause()
      }
    }
  }

  // using imported player utils
  const skipPrevious = (): void => {
    skipToPreviousAndUpdatePosition()
  }

  const skipNext = (): void => {
    skipToNextAndUpdatePosition()
  }

  const seek = (amount: number): void => {
    seekToAndUpdatePosition(amount)
  }

  const jumpBackward = (): void => {
    seekToAndUpdatePosition(savedPosition - JUMP_INTERVAL)
  }

  const jumpForward = (): void => {
    seekToAndUpdatePosition(savedPosition + JUMP_INTERVAL)
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playbackState,
        duration,
        position,
        playNewTrack,
        playQueuedTrack,
        togglePlayback,
        skipPrevious,
        skipNext,
        seek,
        jumpBackward,
        jumpForward,
        isTrackInQueue,
        toggleQueued,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext: () => PlayerContextType = () =>
  useContext(PlayerContext)
