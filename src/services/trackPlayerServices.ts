import {
  addEventListener,
  play,
  pause,
  getPosition,
  seekTo,
  skipToPrevious,
  skipToNext,
} from 'react-native-track-player';

module.exports = async function () {
  addEventListener('remote-play', () => play());

  addEventListener('remote-pause', () => pause());

  addEventListener('remote-previous', () => skipToPrevious());

  addEventListener('remote-next', () => skipToNext());

  addEventListener('remote-seek', ({position}) => {
    seekTo(position);
  });

  addEventListener('remote-jump-forward', async ({interval}) => {
    const position = await getPosition();
    seekTo(position + interval);
  });

  addEventListener('remote-jump-backward', async ({interval}) => {
    const position = await getPosition();
    seekTo(position - interval);
  });
};
