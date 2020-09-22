import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
// @ts-ignore: temp fix for error - no exported member 'useTrackPlayerProgress'
import {useTrackPlayerProgress} from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';

const buildTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  return hours > 0
    ? `${hours}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`;
};

const ProgressSlider = () => {
  const {position, duration} = useTrackPlayerProgress();
  const playerContext = usePlayerContext();

  const totalTime = () => {
    return buildTime(duration - position);
  };

  const currentTime = () => {
    return buildTime(position);
  };

  return (
    <>
      <Slider
        style={tailwind('w-full h-12')}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(value) => {
          playerContext.goTo(value);
        }}
        // minimumTrackTintColor="#42a5f5" // TODO: theme color
        // maximumTrackTintColor="#42a5f5" // TODO: theme color
        // TODO: handle color
      />
      <View style={tailwind('flex-row justify-between')}>
        <Text>{currentTime()}</Text>
        <Text>-{totalTime()}</Text>
      </View>
    </>
  );
};

export default ProgressSlider;
