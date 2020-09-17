import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {ProgressComponent} from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import {PlayerContext} from '../../contexts/PlayerContext';

function buildTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  return hours > 0
    ? `${hours}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`;
}

class ProgressSlider extends ProgressComponent {
  static contextType = PlayerContext;

  get totalTime() {
    return buildTime(this.state.duration - this.state.position);
  }

  get currentTime() {
    return buildTime(this.state.position);
  }

  render() {
    return (
      <>
        <Slider
          style={tailwind('w-full h-12')}
          minimumValue={0}
          maximumValue={this.state.duration}
          value={this.state.position}
          onValueChange={(value) => {
            this.context.goTo(value);
          }}
          // minimumTrackTintColor="#42a5f5" // TODO: theme color
          // maximumTrackTintColor="#42a5f5" // TODO: theme color
          // TODO: handle color
        />
        <View style={tailwind('flex-row justify-between')}>
          <Text>{this.currentTime}</Text>
          <Text>-{this.totalTime}</Text>
        </View>
      </>
    );
  }
}

export default ProgressSlider;
