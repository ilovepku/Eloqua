import React, {useState} from 'react';
import {View, TextInput, FlatList, Text, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/client';
import FeatherIcon from 'react-native-vector-icons/Feather';
import tailwind from 'tailwind-rn';

import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import PieceTile from './PieceTile';
import {AllPiecesQuery_piece} from '../../types/graphql';

const AllPiecesScreen = () => {
  const [filter, setFilter] = useState('');

  const {data, loading, error} = useQuery(allPiecesQuery);

  const filteredPieces = (data?.pieces ?? []).filter(
    ({name, person}: AllPiecesQuery_piece) =>
      filter === '' ||
      name.toLowerCase().includes(filter.toLowerCase()) ||
      person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View
        style={tailwind(
          'h-10 mx-4 my-4 px-4 rounded-lg bg-gray-300 flex-row items-center',
        )}>
        <FeatherIcon size={20} name="search" style={tailwind('mr-2')} />
        <TextInput
          placeholder="Search Speech"
          onChangeText={setFilter}
          autoCorrect={false}
          value={filter}
          style={tailwind('flex-1')}
        />
      </View>

      {error ? (
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
      )}
    </View>
  );
};

export default AllPiecesScreen;
