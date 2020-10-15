import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Track} from 'react-native-track-player';
import tailwind from 'tailwind-rn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootState} from '../../redux/rootReducer';
import {toggleFav} from '../../redux/favoritesSlice';
import {usePlayerContext} from '../../contexts/PlayerContext';

interface Props {
  track: Track;
  date?: String;
}

export default function PieceTile({track, date}: Props) {
  const {favArr} = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();
  const {
    isTrackInQueue,
    playNewTrack,
    playQueuedTrack,
    toggleQueued,
  } = usePlayerContext();

  const {id, title, artist, artwork} = track;

  const playTrack = () => {
    isTrackInQueue(id) ? playQueuedTrack(id) : playNewTrack(track);
  };

  const favAddRemove = () => {
    dispatch(toggleFav(id));
  };

  const queueAddRemove = () => {
    () => toggleQueued(id, track);
  };

  return (
    <View style={tailwind('flex-row justify-between items-center px-4')}>
      <TouchableOpacity
        style={tailwind('flex-1 h-20 flex-row items-center')}
        onPress={playTrack}>
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
          {date && (
            <Text style={tailwind('text-sm text-gray-600')}>{date}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={tailwind('mr-4')} onPress={favAddRemove}>
        <MaterialIcons
          size={30}
          color="#42a5f5"
          name={favArr.includes(id) ? 'favorite' : 'favorite-outline'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={queueAddRemove}>
        <MaterialIcons
          size={30}
          color="#42a5f5"
          name={isTrackInQueue(id) ? 'playlist-add-check' : 'playlist-add'}
        />
      </TouchableOpacity>
    </View>
  );
}
