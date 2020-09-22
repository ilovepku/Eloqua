import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {
  // @ts-ignore: temp fix for error - no exported member 'usePlaybackState'
  usePlaybackState,
  // @ts-ignore: temp fix for error - no exported member 'useTrackPlayerProgress'
  useTrackPlayerProgress,
  STATE_PLAYING,
  STATE_BUFFERING,
} from 'react-native-track-player';
import FeatherIcon from 'react-native-vector-icons/Feather';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';
import ProgressSlider from './ProgressSlider';

const {width} = Dimensions.get('window');

const PlayerScreen = () => {
  const {
    currentTrack,
    togglePlayback,
    seekTo,
    skipToPrevious,
    skipToNext,
  } = usePlayerContext();
  const navigation = useNavigation();
  const playbackState = usePlaybackState();
  const {position} = useTrackPlayerProgress();

  if (!currentTrack) return null;

  const {artwork, title, artist} = currentTrack;

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('flex-row justify-between my-4 px-4')}>
        <TouchableOpacity onPress={navigation.goBack}>
          <FeatherIcon name="chevron-down" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Queue')}>
          <FeatherIcon name="list" size={30} />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: artwork}}
        style={[s.img, tailwind('self-center rounded-lg mb-4')]}
      />

      <View style={tailwind('items-center')}>
        <Text style={tailwind('text-center font-bold mb-4 px-4')}>{title}</Text>
        <Text style={tailwind('text-gray-600 mb-4')}>{artist}</Text>
      </View>

      <View style={tailwind('px-4 mb-4')}>
        <ProgressSlider />
      </View>

      <View style={tailwind('flex-row justify-between items-center mx-12')}>
        <TouchableOpacity onPress={skipToPrevious}>
          <FeatherIcon size={40} name="skip-back" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => seekTo(position - 30)}>
          <FeatherIcon size={40} name="rotate-ccw" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePlayback()}>
          <FeatherIcon
            size={60}
            name={
              playbackState === STATE_PLAYING ||
              playbackState === STATE_BUFFERING
                ? 'pause'
                : 'play'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => seekTo(position + 30)}>
          <FeatherIcon size={40} name="rotate-cw" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <FeatherIcon size={40} name="skip-forward" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  img: {
    width: width - 2 * 24,
    height: width - 2 * 24,
  },
});

export default PlayerScreen;
