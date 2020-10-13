import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';
import {buildTime} from '../../utils/dateTimeHelper';

const ProgressSlider = () => {
  const {duration, position, seek} = usePlayerContext();

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
        onSlidingComplete={seek}
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
