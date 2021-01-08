import {
  addEventListener,
  play,
  pause,
  getPosition,
} from 'react-native-track-player'

import {
  skipToPreviousAndUpdatePosition,
  skipToNextAndUpdatePosition,
  seekToAndUpdatePosition,
} from '../utils/player'

module.exports = async (): Promise<void> => {
  addEventListener('remote-play', () => play())

  addEventListener('remote-pause', () => pause())

  addEventListener('remote-previous', () => {
    skipToPreviousAndUpdatePosition()
  })

  addEventListener('remote-next', () => {
    skipToNextAndUpdatePosition()
  })

  addEventListener('remote-seek', ({position}) => {
    seekToAndUpdatePosition(position)
  })

  addEventListener('remote-jump-backward', async ({interval}) => {
    const position = await getPosition()
    seekToAndUpdatePosition(position - interval)
  })

  addEventListener('remote-jump-forward', async ({interval}) => {
    const position = await getPosition()
    seekToAndUpdatePosition(position + interval)
  })
}
