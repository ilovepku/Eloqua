import React from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';

import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import {AllPiecesQuery_piece} from '../../types/graphql';
import PieceTile from './PieceTile';

interface Props {
  filter: String;
}

const PiecesList = ({filter}: Props) => {
  const {person_id_filter, category_id_filter} = (useRoute().params ?? {}) as {
    person_id_filter: String;
    category_id_filter: String;
  };

  const {data, loading, error} = useQuery(allPiecesQuery);

  const filteredPieces = (data?.pieces ?? []).filter(
    ({name, person, person_id, piece_categories}: AllPiecesQuery_piece) => {
      return (
        (person_id_filter && person_id_filter === `person-${person_id}`) ||
        (category_id_filter &&
          piece_categories.find(
            (item) => `category-${item.category_id}` === category_id_filter,
          )) ||
        (!person_id_filter &&
          !category_id_filter &&
          (filter === '' ||
            name.toLowerCase().includes(filter.toLowerCase()) ||
            person.name.toLowerCase().includes(filter.toLowerCase())))
      );
    },
  );

  return error ? (
    <View style={tailwind('h-64 items-center justify-center')}>
      <Text style={tailwind('text-lg text-red-600')}>{error.message}</Text>
    </View>
  ) : (
    <FlatList
      keyboardShouldPersistTaps="never"
      data={filteredPieces}
      ListEmptyComponent={
        <View style={tailwind('h-64 items-center justify-center')}>
          {loading ? (
            <ActivityIndicator size="large" color="#42a5f5" />
          ) : (
            <Text style={tailwind('text-center text-lg text-gray-600')}>
              No matching result, please search for something else...
            </Text>
          )}
          {/* TODO: theme color */}
        </View>
      }
      renderItem={({item}) => <PieceTile piece={item} />}
      keyExtractor={(item) => `piece-${item.id}`}></FlatList>
  );
};

export default PiecesList;
