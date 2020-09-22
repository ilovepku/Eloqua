import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import {usePlayerContext} from '../../contexts/PlayerContext';

const QueueScreen = () => {
  const [queue, setQueue] = useState<TrackPlayer.Track[]>([]);

  const playerContext = usePlayerContext();

  const navigation = useNavigation();

  const getQueue = async () => {
    const tracks = await TrackPlayer.getQueue();

    setQueue(tracks);
  };

  useFocusEffect(
    useCallback(() => {
      getQueue();
    }, []),
  );

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('flex-row justify-between px-4 my-4')}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={tailwind('flex-1')}>
          <Text>Done</Text>
        </TouchableOpacity>

        <Text style={tailwind('flex-1 text-center font-bold')}>Up Next</Text>
        <View style={tailwind('flex-1')} />
      </View>
      <ScrollView>
        {queue.map((track) => {
          const {id, artwork, title, artist} = track;
          return (
            <TouchableOpacity
              key={id}
              onPress={async () => {
                await playerContext.playTrack(track);
                navigation.goBack();
              }}>
              <View style={tailwind('h-20 px-4 flex-row')}>
                {artwork && (
                  <Image
                    source={{uri: artwork}}
                    style={tailwind('h-16 w-16 rounded-lg mr-2')}
                  />
                )}
                <View style={tailwind('flex-1')}>
                  <Text style={tailwind('font-bold')} numberOfLines={2}>
                    {title}
                  </Text>
                  <Text style={tailwind('text-gray-600')}>{artist}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QueueScreen;
