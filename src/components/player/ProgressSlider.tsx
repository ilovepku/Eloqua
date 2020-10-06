import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
// @ts-ignore: temp fix for error - no exported member 'useTrackPlayerProgress'
import {useTrackPlayerProgress} from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';
import {buildTime} from '../../utils/dateTimeHelper';

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
          playerContext.seekTo(value);
        }}
        // minimumTrackTintColor="#42a5f5"
        // maximumTrackTintColor="#42a5f5"
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
