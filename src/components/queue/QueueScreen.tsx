import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import {RootState} from '../../redux/rootReducer';
import PieceTile from '../pieceTile/PieceTile';

export default function QueueScreen() {
  const [queue, setQueue] = useState<TrackPlayer.Track[]>([]);
  const {
    queue: {pieceIdQueueArr},
  } = useSelector((state: RootState) => state);

  const navigation = useNavigation();

  const updateQueueState = async () => {
    const queuedTracks = await TrackPlayer.getQueue();
    setQueue(queuedTracks);
  };

  useEffect(() => {
    updateQueueState();
  }, [pieceIdQueueArr]);

  return (
    <View style={tailwind('flex-1 bg-white')}>
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
          <PieceTile key={`piece-${track.id}`} track={track} />
        ))}
      </ScrollView>
    </View>
  );
}
