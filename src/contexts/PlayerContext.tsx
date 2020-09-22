import React, {
  createContext,
  useState,
  useEffect,
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
  isEmpty: boolean;
  currentTrack: Track | null;
  getCurrentTrackObj: () => Promise<Track>;
  togglePlayback: (track?: Track) => void;
  seekTo: (interval?: number) => void;
  goTo: (amount: number) => void;
  skipToPrevious: () => void;
  skipToNext: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  isEmpty: false,
  currentTrack: null,
  getCurrentTrackObj: async () => ({
    id: 'id',
    url: 'url',
    title: 'title',
    artist: 'artist',
  }),
  togglePlayback: () => null,
  seekTo: () => null,
  goTo: () => null,
  skipToPrevious: () => null,
  skipToNext: () => null,
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [playerState, setPlayerState] = useState(null);
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

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-state',
      ({state}) => {
        setPlayerState(state);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  const getCurrentTrackObj = async () => {
    const id = await TrackPlayer.getCurrentTrack();
    return TrackPlayer.getTrack(id);
  };

  const togglePlayback = async (track?: Track) => {
    // TODO
    if (track && (currentTrack == null || currentTrack.id !== track.id)) {
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.play();
    } else if (currentTrack) {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const seekTo = async (interval = 30) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + interval);
  };

  const goTo = async (amount: number) => {
    await TrackPlayer.seekTo(amount);
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  };

  const value = {
    isEmpty: playerState === null,
    currentTrack,
    getCurrentTrackObj,
    togglePlayback,
    seekTo,
    goTo,
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
