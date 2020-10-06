import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import {AllPiecesQuery_piece} from '../../types/graphql';
import {usePlayerContext} from '../../contexts/PlayerContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {ASSETS_URL} from '../../settings';

interface Props {
  piece: AllPiecesQuery_piece;
}

const PieceTile = ({piece}: Props) => {
  const playerContext = usePlayerContext();
  const {id, name, person, date, audio_filename} = piece;
  const track = {
    id: `piece-${id}`,
    title: name,
    artist: person.name,
    artwork: `${ASSETS_URL}/avatars%2F${person.img_filename}?alt=media`,
    url: `${ASSETS_URL}/${audio_filename}?alt=media`,
  };
  return (
    <View style={tailwind('flex-row justify-between items-center px-4')}>
      <TouchableOpacity
        style={tailwind('flex-1 h-20 flex-row items-center')}
        onPress={() => {
          playerContext.playTrack(track);
        }}>
        <Image
          source={{
            uri: `${ASSETS_URL}/avatars%2F${person.img_filename}?alt=media`,
          }}
          style={tailwind('h-12 w-12 rounded-lg mr-4')}
        />
        <View style={tailwind('flex-1 mr-4')}>
          <Text style={tailwind('font-bold')} numberOfLines={1}>
            {name}
          </Text>
          <Text style={tailwind('text-sm text-gray-600')}>
            {person.name}, {date}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          const IsTrackInQueue = await TrackPlayer.getTrack(track.id);
          if (!IsTrackInQueue) TrackPlayer.add(track);
        }}>
        <FeatherIcon size={30} color="#42a5f5" name="list" />
      </TouchableOpacity>
    </View>
  );
};

export default PieceTile;
