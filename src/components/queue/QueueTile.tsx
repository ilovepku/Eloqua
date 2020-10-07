import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {Track} from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  track: Track;
  getQueue: () => void;
}

const PieceTile = ({track: {id, artwork, title, artist}, getQueue}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={tailwind('flex-row justify-between items-center px-4')}>
      <TouchableOpacity
        style={tailwind('flex-1 h-20 flex-row items-center')}
        onPress={async () => {
          await TrackPlayer.skip(id);
          navigation.goBack();
        }}>
        <Image
          source={{
            uri: artwork,
          }}
          style={tailwind('h-12 w-12 rounded-lg mr-4')}
        />
        <View style={tailwind('flex-1 mr-4')}>
          <Text style={tailwind('font-bold')} numberOfLines={1}>
            {title}
          </Text>
          <Text style={tailwind('text-sm text-gray-600')}>{artist}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await TrackPlayer.remove(id);
          getQueue();
        }}>
        <MaterialIcons size={30} color="#42a5f5" name="delete" />
      </TouchableOpacity>
    </View>
  );
};

export default PieceTile;
