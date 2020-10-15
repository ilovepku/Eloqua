import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Track,
  STATE_PAUSED,
  // @ts-ignore: temp fix for error - no exported member 'usePlaybackState'
  usePlaybackState,
  // @ts-ignore: temp fix for error - no exported member 'useTrackPlayerProgress'
  useTrackPlayerProgress,
  // @ts-ignore: temp fix for error - no exported member 'useTrackPlayerEvents'
  useTrackPlayerEvents,
  getTrack,
  reset,
  add,
  play,
  pause,
  seekTo,
  skip,
  skipToPrevious,
  skipToNext,
  remove,
  getQueue,
} from 'react-native-track-player';

import {RootState} from '../redux/rootReducer';
import {updateQueueArr} from '../redux/queueSlice';
import {JUMP_INTERVAL} from '../settings';

interface PlayerContextType {
  currentTrack: Track | null;
  playbackState: string;
  duration: number;
  position: number;
  playNewTrack: (track: Track) => void;
  playQueuedTrack: (id: string) => void;
  togglePlayback: () => void;
  skipPrevious: () => void;
  skipNext: () => void;
  seek: (amount: number) => void;
  jumpBackward: () => void;
  jumpForward: () => void;
  isTrackInQueue: (id: string) => boolean;
  toggleQueued: (id: string, track: Track) => void;
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
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const {
    queue: {queueArr},
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  // didMount: if player queue is empty, attempt to rehydrate with persisted queueArr
  useEffect(() => {
    (async () => {
      const queuedTracks = await getQueue();
      if (!queuedTracks.length) {
        add([...queueArr]);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playbackState = usePlaybackState();
  const {duration, position} = useTrackPlayerProgress();

  useTrackPlayerEvents(
    ['playback-track-changed'],
    async ({nextTrack}: {nextTrack: string}) => {
      if (nextTrack) {
        const newTrack = await getTrack(nextTrack);
        setCurrentTrack(newTrack);
      }
    },
  );

  // TODO: loop queue
  useTrackPlayerEvents(
    ['playback-queue-ended'],
    async ({track}: {track: string}) => {
      if (track) {
        pause();
        skip(track);
        // will in turn trigger TrackPlayerEvent: "playback-track-changed" to reset the last queued track as current track
      }
    },
  );

  const playNewTrack = async (track: Track) => {
    await reset();
    await add(track);
    play();
    updateQueue();
  };

  const playQueuedTrack = async (id: string) => {
    await skip(id);
    play();
  };

  const togglePlayback = () => {
    if (currentTrack) {
      if (playbackState === STATE_PAUSED) {
        play();
      } else {
        pause();
      }
    }
  };

  const seek = (amount: number) => {
    seekTo(amount);
  };

  const jumpBackward = () => {
    seekTo(position - JUMP_INTERVAL);
  };

  const jumpForward = () => {
    seekTo(position + JUMP_INTERVAL);
  };

  const skipPrevious = () => {
    skipToPrevious();
  };

  const skipNext = () => {
    skipToNext();
  };

  const isTrackInQueue = (id: string) => {
    return queueArr.some((track) => track.id === id);
  };

  const updateQueue = async () => {
    const queuedTracks = await getQueue();
    dispatch(updateQueueArr(queuedTracks));
  };

  const toggleQueued = async (id: string, track: Track) => {
    isTrackInQueue(id) ? await remove(id) : await add(track);
    updateQueue();
  };

  const value = {
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
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
