import React, {FC} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import tailwind from 'tailwind-rn';

import {AllPiecesQuery_piece} from '../../types/graphql';
import {usePlayerContext} from '../../contexts/PlayerContext';

interface Props {
  piece: AllPiecesQuery_piece;
}

const PieceTile: FC<Props> = ({piece}) => {
  const playerContext = usePlayerContext();
  const {id, name, person, date, audio_filename} = piece;
  return (
    <TouchableOpacity
      onPress={() => {
        playerContext.playTrack({
          id: `piece-${id}`,
          title: name,
          artist: person.name,
          artwork: `https://firebasestorage.googleapis.com/v0/b/speech-pwa.appspot.com/o/avatars%2F${person.img_filename}?alt=media`,
          url: `https://firebasestorage.googleapis.com/v0/b/speech-pwa.appspot.com/o/${audio_filename}?alt=media`,
        });
      }}>
      <View style={tailwind('h-20 px-4 flex-row items-center')}>
        <Image
          source={{
            uri: `https://firebasestorage.googleapis.com/v0/b/speech-pwa.appspot.com/o/avatars%2F${person.img_filename}?alt=media`,
          }}
          style={tailwind('h-12 w-12 rounded-lg mr-4')}
        />
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold')} numberOfLines={1}>
            {name}
          </Text>
          <Text style={tailwind('text-sm text-gray-600')}>
            {person.name}, {date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PieceTile;
