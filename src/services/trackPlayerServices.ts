import TrackPlayer from 'react-native-track-player';

const trackPlayerServices = async () => {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  /* TrackPlayer.addEventListener('playback-track-changed', () => {});

  TrackPlayer.addEventListener('playback-state', (state) => {
    console.log('playback-state', state);
  }); */
};

export default trackPlayerServices;
