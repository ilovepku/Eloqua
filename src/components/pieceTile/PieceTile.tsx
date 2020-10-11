import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TrackPlayer, {Track} from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import {RootState} from '../../redux/rootReducer';
import {toggleFav} from '../../redux/favoritesSlice';
import {updatePieceIdQueueArr} from '../../redux/queueSlice';
import {usePlayerContext} from '../../contexts/PlayerContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  track: Track;
  date?: String;
}

const PieceTile = ({track, date}: Props) => {
  const {
    favorites: {favArr},
    queue: {pieceIdQueueArr},
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const {playTrack} = usePlayerContext();

  const {id, title, artist, artwork} = track;

  return (
    <View style={tailwind('flex-row justify-between items-center px-4')}>
      <TouchableOpacity
        style={tailwind('flex-1 h-20 flex-row items-center')}
        onPress={() => {
          playTrack(track);
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
          {date && (
            <Text style={tailwind('text-sm text-gray-600')}>{date}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={tailwind('mr-4')}
        onPress={() => dispatch(toggleFav(id))}>
        <MaterialIcons
          size={30}
          color="#42a5f5"
          name={favArr.includes(id) ? 'favorite' : 'favorite-outline'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          pieceIdQueueArr.includes(id)
            ? await TrackPlayer.remove(id)
            : await TrackPlayer.add(track);

          const queuedTracks = await TrackPlayer.getQueue();
          dispatch(updatePieceIdQueueArr(queuedTracks));
        }}>
        <MaterialIcons
          size={30}
          color="#42a5f5"
          name={
            pieceIdQueueArr.includes(id) ? 'playlist-add-check' : 'playlist-add'
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default PieceTile;
