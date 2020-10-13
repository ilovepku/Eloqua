import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {STATE_PLAYING, STATE_BUFFERING} from 'react-native-track-player';
import {useQuery} from '@apollo/client';
import HTML from 'react-native-render-html';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';
import pieceQuery from '../../graphql/query/pieceQuery';
import ProgressSlider from './ProgressSlider';

const PlayerScreen = () => {
  const {
    currentTrack,
    playbackState,
    position,
    togglePlayback,
    seek,
    skipPrevious,
    skipNext,
  } = usePlayerContext();
  const navigation = useNavigation();

  const {data, loading, error} = useQuery(pieceQuery, {
    variables: {
      id: Number(currentTrack?.id.split('-')[1]), // piece-1 : string => 1 : number
    },
  });

  return !currentTrack ? null : (
    <SafeAreaView style={tailwind('flex-1 bg-white px-4')}>
      <View style={tailwind('flex-row justify-between my-4')}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MaterialIcons name="keyboard-arrow-down" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Queue')}>
          <MaterialIcons name="list" size={30} />
        </TouchableOpacity>
      </View>

      <View style={tailwind('items-center')}>
        <Text style={tailwind('text-center font-bold mb-4 px-4')}>
          {currentTrack.title}
        </Text>
        <Text style={tailwind('text-gray-600 mb-4')}>
          {currentTrack.artist}
          {data && `, ${data.pieces_by_pk.date}`}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={tailwind(
          'px-2 flex-grow items-center justify-center',
        )}>
        {error ? (
          <Text style={tailwind('text-lg text-red-600')}>{error.message}</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#42a5f5" />
        ) : (
          <HTML html={data && data.pieces_by_pk.text} />
        )}
      </ScrollView>

      <View style={tailwind('mb-4')}>
        <ProgressSlider />
      </View>

      <View style={tailwind('flex-row justify-between items-center')}>
        <TouchableOpacity onPress={skipPrevious}>
          <MaterialIcons size={40} name="skip-previous" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => seek(position - 30)}>
          <MaterialIcons size={40} name="fast-rewind" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback}>
          <MaterialIcons
            size={60}
            name={
              playbackState === STATE_PLAYING ||
              playbackState === STATE_BUFFERING
                ? 'pause'
                : 'play-arrow'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => seek(position + 30)}>
          <MaterialIcons size={40} name="fast-forward" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipNext}>
          <MaterialIcons size={40} name="skip-next" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlayerScreen;
