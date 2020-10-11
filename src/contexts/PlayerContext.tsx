import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';
import TrackPlayer, {
  Track,
  // @ts-ignore: temp fix for error - no exported member 'usePlaybackState'
  usePlaybackState,
  // @ts-ignore: temp fix for error - no exported member 'useTrackPlayerEvents'
  useTrackPlayerEvents,
} from 'react-native-track-player';

interface PlayerContextType {
  currentTrack: Track | null;
  playTrack: (track: Track) => void;
  togglePlayback: () => void;
  seekTo: (amount: number) => void;
  skipToPrevious: () => void;
  skipToNext: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  playTrack: () => null,
  togglePlayback: () => null,
  seekTo: () => null,
  skipToPrevious: () => null,
  skipToNext: () => null,
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const playbackState = usePlaybackState();

  useTrackPlayerEvents(
    ['playback-track-changed'],
    // temp type for playback-track-changed event
    async ({nextTrack, type}: {nextTrack: string; type: string}) => {
      // @ts-ignore: temp fix for error - Property 'TrackPlayerEvents' does not exist on type 'typeof RNTrackPlayer'.
      if (type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        const track = await TrackPlayer.getTrack(nextTrack);
        setCurrentTrack(track);
      }
    },
  );

  const playTrack = async (track: Track) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
  };

  const togglePlayback = async () => {
    if (currentTrack) {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const seekTo = async (amount: number) => {
    await TrackPlayer.seekTo(amount);
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const value = {
    currentTrack,
    playTrack,
    togglePlayback,
    seekTo,
    skipToPrevious,
    skipToNext,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
