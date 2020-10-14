import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';
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
  skipToPrevious,
  skipToNext,
} from 'react-native-track-player';

interface PlayerContextType {
  currentTrack: Track | null;
  playbackState: string;
  duration: number;
  position: number;
  playTrack: (track: Track) => void;
  togglePlayback: () => void;
  seek: (amount: number) => void;
  skipPrevious: () => void;
  skipNext: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  playbackState: '',
  duration: 0,
  position: 0,
  playTrack: () => null,
  togglePlayback: () => null,
  seek: () => null,
  skipPrevious: () => null,
  skipNext: () => null,
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const playbackState = usePlaybackState();
  const {duration, position} = useTrackPlayerProgress();

  useTrackPlayerEvents(
    ['playback-track-changed'],
    async ({track, nextTrack}: {track: string; nextTrack: string}) => {
      // keep previous track if queue ended with no next track
      const newTrack = await getTrack(nextTrack || track);
      setCurrentTrack(newTrack);
    },
  );

  const playTrack = async (track: Track) => {
    await reset();
    await add(track);
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

  const skipPrevious = () => {
    skipToPrevious();
  };

  const skipNext = () => {
    skipToNext();
  };

  const value = {
    currentTrack,
    playbackState,
    duration,
    position,
    playTrack,
    togglePlayback,
    seek,
    skipPrevious,
    skipNext,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
