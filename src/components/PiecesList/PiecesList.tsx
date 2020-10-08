import React from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';

import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import {AllPiecesQuery_piece} from '../../types/graphql';
import PieceTile from '../pieceTile/PieceTile';
import {ASSETS_URL} from '../../settings';

interface Props {
  filter: string;
  favArr?: string[];
}

const PiecesList = ({filter, favArr}: Props) => {
  const {person_id_filter, category_id_filter} = (useRoute().params ?? {}) as {
    person_id_filter: string;
    category_id_filter: string;
  };

  const {data, loading, error} = useQuery(allPiecesQuery);

  // seperate filter logic into seperate file
  let filteredPieces = (data?.pieces ?? []).filter(
    ({name, person, person_id, piece_categories}: AllPiecesQuery_piece) =>
      (person_id_filter && person_id_filter === `person-${person_id}`) ||
      (category_id_filter &&
        piece_categories.find(
          (item) => `category-${item.category_id}` === category_id_filter,
        )) ||
      (!person_id_filter &&
        !category_id_filter &&
        (filter === '' ||
          name.toLowerCase().includes(filter.toLowerCase()) ||
          person.name.toLowerCase().includes(filter.toLowerCase()))),
  );

  if (favArr) {
    filteredPieces = filteredPieces.filter((item: AllPiecesQuery_piece) =>
      favArr?.includes(`piece-${item.id}`),
    );
  }

  return error ? (
    <View style={tailwind('h-64 items-center justify-center')}>
      <Text style={tailwind('text-lg text-red-600')}>{error.message}</Text>
    </View>
  ) : (
    <FlatList
      style={tailwind('bg-white')}
      keyboardShouldPersistTaps="never"
      data={filteredPieces}
      ListEmptyComponent={
        <View style={tailwind('h-64 items-center justify-center')}>
          {loading ? (
            <ActivityIndicator size="large" color="#42a5f5" />
          ) : (
            <Text style={tailwind('text-center text-lg text-gray-600')}>
              {filter
                ? 'No matching result, please search for something else...'
                : 'No favorite pieces yet, please add some...'}
            </Text>
          )}
          {/* TODO: theme color */}
        </View>
      }
      renderItem={({item: {id, name, person, date, audio_filename}}) => (
        <PieceTile
          track={{
            id: `piece-${id}`,
            title: name,
            artist: person.name,
            artwork: `${ASSETS_URL}/avatars%2F${person.img_filename}?alt=media`,
            url: `${ASSETS_URL}/${audio_filename}?alt=media`,
          }}
          date={date}
        />
      )}
      keyExtractor={(item) => `piece-${item.id}`}></FlatList>
  );
};

export default PiecesList;
