import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {
  // @ts-ignore: temp fix for error - no exported member 'usePlaybackState'
  usePlaybackState,
  // @ts-ignore: temp fix for error - no exported member 'useTrackPlayerProgress'
  useTrackPlayerProgress,
  // @ts-ignore: temp fix for error - no exported member 'useTrackPlayerEvent'
  useTrackPlayerEvents,
  // @ts-ignore: temp fix for error - no exported member 'TrackPlayerEvents'
  TrackPlayerEvents,
  STATE_PLAYING,
  STATE_BUFFERING,
} from 'react-native-track-player';
import {useQuery} from '@apollo/client';
import FeatherIcon from 'react-native-vector-icons/Feather';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';
import pieceQuery from '../../graphql/query/pieceQuery';
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

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_QUEUE_ENDED], () => {
    navigation.goBack();
  });

  const {data, loading, error} = useQuery(pieceQuery, {
    variables: {
      id: Number(currentTrack?.id.split('-')[1]), // piece-1 : string => 1 : number
    },
  });

  return !currentTrack ? null : (
    <SafeAreaView style={tailwind('flex-1 bg-white px-4')}>
      <View style={tailwind('flex-row justify-between my-4')}>
        <TouchableOpacity onPress={navigation.goBack}>
          <FeatherIcon name="chevron-down" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Queue')}>
          <FeatherIcon name="list" size={30} />
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
          'flex-grow items-center justify-center',
        )}>
        {error ? (
          <Text style={tailwind('text-lg text-red-600')}>{error.message}</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#42a5f5" />
        ) : (
          <Text>{data && data.pieces_by_pk.text}</Text>
        )}
      </ScrollView>

      <View style={tailwind('mb-4')}>
        <ProgressSlider />
      </View>

      <View style={tailwind('flex-row justify-between items-center')}>
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
