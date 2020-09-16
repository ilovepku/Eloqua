import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';

const MiniPlayer = () => {
  const {
    isEmpty,
    currentTrack,
    isPaused,
    play,
    pause,
    seekTo,
  } = usePlayerContext();
  const navigation = useNavigation();

  // ternary operator?
  if (isEmpty || !currentTrack) {
    return null;
  }

  const {artwork, title} = currentTrack;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Player')}>
      <View
        style={tailwind(
          'h-16 px-2 border-t border-gray-300 flex-row items-center',
        )}>
        <Image
          source={{uri: artwork}}
          style={tailwind('h-12 w-12 mr-2 rounded-lg')}
        />
        <Text
          numberOfLines={1}
          style={tailwind('flex-1 mr-2 text-lg font-bold')}>
          {title}
        </Text>
        <View style={tailwind('mr-2')}>
          {isPaused ? (
            <TouchableOpacity onPress={() => play()}>
              <FeatherIcon size={30} name="play" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pause}>
              <FeatherIcon size={30} name="pause" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => seekTo()}>
          <FeatherIcon size={30} name="rotate-cw" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MiniPlayer;
