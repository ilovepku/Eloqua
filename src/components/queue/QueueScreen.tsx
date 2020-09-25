import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import QueueTile from './QueueTile';

const QueueScreen = () => {
  const [queue, setQueue] = useState<TrackPlayer.Track[]>([]);

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
        {queue.map((track) => (
          <QueueTile key={track.id} track={track} getQueue={getQueue} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QueueScreen;
