import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from 'react';
import TrackPlayer, {
  Track,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
} from 'react-native-track-player';

interface PlayerContextType {
  // isPlaying: boolean;
  isPaused: boolean;
  // isStopped: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (track?: Track) => void;
  pause: () => void;
  seekTo: (interval?: number) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  // isPlaying: false,
  isPaused: false,
  // isStopped: false,
  isEmpty: false,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  seekTo: () => null,
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [playerState, setPlayerState] = useState(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

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

  const play = async (track?: Track) => {
    if (!track) {
      if (!currentTrack) return;
    } else {
      if (currentTrack && currentTrack.id !== track.id)
        await TrackPlayer.reset();

      // TODO: need better logic, can skip the following two lines when currentTrack.id === track.id
      await TrackPlayer.add([track]);
      setCurrentTrack(track);
    }
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const seekTo = async (interval = 30) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + interval);
  };

  const value = {
    // isPlaying: playerState === STATE_PLAYING,
    isPaused: playerState === STATE_PAUSED,
    // isStopped: playerState === STATE_STOPPED,
    isEmpty: playerState === null,
    currentTrack,
    pause,
    play,
    seekTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
