import {store} from '../redux/store';
import {
  addEventListener,
  play,
  pause,
  getPosition,
  seekTo,
  skipToPrevious,
  skipToNext,
} from 'react-native-track-player';

import {updateSavedPosition} from '../redux/playerSlice';

const {dispatch} = store;

module.exports = async function () {
  addEventListener('remote-play', () => play());

  addEventListener('remote-pause', () => pause());

  addEventListener('remote-previous', () => {
    skipToPrevious();
    dispatch(updateSavedPosition(0));
  });

  addEventListener('remote-next', () => {
    skipToNext();
    dispatch(updateSavedPosition(0));
  });

  addEventListener('remote-seek', ({position}) => {
    seekTo(position);
    dispatch(updateSavedPosition(position));
  });

  addEventListener('remote-jump-forward', async ({interval}) => {
    const position = await getPosition();
    seekTo(position + interval);
    dispatch(updateSavedPosition(position + interval));
  });

  addEventListener('remote-jump-backward', async ({interval}) => {
    const position = await getPosition();
    seekTo(position - interval);
    dispatch(updateSavedPosition(position - interval));
  });
};
