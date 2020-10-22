import React from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {STATE_PLAYING, STATE_BUFFERING} from 'react-native-track-player';
import HTML from 'react-native-render-html';
import tailwind from 'tailwind-rn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {usePlayerContext} from '../../contexts/PlayerContext';
import pieceQuery from '../../graphql/query/pieceQuery';
import {buildDateString} from '../../utils/dateTimeHelper';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import ProgressSlider from './ProgressSlider';

export default function PlayerScreen() {
  const {
    currentTrack,
    playbackState,
    togglePlayback,
    jumpBackward,
    jumpForward,
    skipPrevious,
    skipNext,
  } = usePlayerContext();
  const navigation = useNavigation();

  const {loading, error, data} = useQuery(pieceQuery, {
    variables: {
      id: Number(currentTrack?.id.split('-')[1]), // piece-1 : string => 1 : number
    },
  });

  const navigateToQueue = () => {
    navigation.navigate('Queue');
  };

  return !currentTrack ? null : (
    <View style={tailwind('flex-1 bg-white px-4')}>
      <View style={tailwind('flex-row justify-between my-4')}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MaterialIcons name="keyboard-arrow-down" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToQueue}>
          <MaterialIcons name="list" size={30} />
        </TouchableOpacity>
      </View>

      <View style={tailwind('items-center')}>
        <Text style={tailwind('text-center font-bold mb-2 px-4')}>
          {currentTrack.title}
        </Text>
        <Text style={tailwind('text-gray-600')}>{currentTrack.artist}</Text>
        <Text style={tailwind('text-gray-600 mb-4')}>
          {data && buildDateString(data.pieces_by_pk.date)}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={tailwind(
          'px-2 flex-grow items-center justify-center',
        )}>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error errMsg={error.message} />
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
        <TouchableOpacity onPress={jumpBackward}>
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
        <TouchableOpacity onPress={jumpForward}>
          <MaterialIcons size={40} name="fast-forward" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipNext}>
          <MaterialIcons size={40} name="skip-next" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
