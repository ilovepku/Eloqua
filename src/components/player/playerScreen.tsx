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
import FeatherIcon from 'react-native-vector-icons/Feather';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';
import ProgressSlider from './ProgressSlider';

const {width} = Dimensions.get('window');

const PlayerScreen = () => {
  const {currentTrack, isPaused, play, pause, seekTo} = usePlayerContext();
  const navigation = useNavigation();

  if (!currentTrack) return null;

  const {artwork, title, artist} = currentTrack;

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <TouchableOpacity onPress={navigation.goBack}>
        <FeatherIcon
          name="chevron-down"
          size={30}
          style={tailwind('my-4 px-4')}
        />
      </TouchableOpacity>
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

      <View style={tailwind('flex-row items-center justify-center')}>
        <TouchableOpacity onPress={() => seekTo(-10)}>
          <FeatherIcon size={40} name="rotate-ccw" />
        </TouchableOpacity>
        <View style={tailwind('mx-12')}>
          {isPaused ? (
            <TouchableOpacity onPress={() => play()}>
              <FeatherIcon size={60} name="play" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pause}>
              <FeatherIcon size={60} name="pause" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => seekTo()}>
          <FeatherIcon size={40} name="rotate-cw" />
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
