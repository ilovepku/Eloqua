import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import { useLazyQuery } from "@apollo/client"
import tailwind from 'tailwind-rn';

import searchQuery from "../../graphql/query/searchQuery"
import SearchTile from "./SearchTile"

const SearchScreen = () => {
  const [term, setTerm] = useState('')

  const [search, { data, loading, error }] = useLazyQuery(searchQuery);

  const onSearch = async () => {
    try {
      await search({ variables: { term } });
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('h-10 w-full my-4 px-4')}>
        <TextInput
          style={tailwind('flex-1 px-4 rounded-lg bg-gray-300')}
          placeholder="Search Speech"
          onChangeText={setTerm}
          autoCorrect={false}
          onSubmitEditing={onSearch}
          value={term}
        />
      </View>

      {error ?
        <View style={tailwind('flex-1 items-center justify-center')}>
          <Text style={tailwind('text-lg text-red-600')}>
            {error.message}
          </Text>
        </View> :
        <FlatList
          keyboardShouldPersistTaps="never"
          contentContainerStyle={tailwind('flex-1')}
          data={data?.search ?? []}
          ListEmptyComponent={
            <View style={tailwind('flex-1 items-center justify-center')}>
              {!loading ?
                <Text style={tailwind('text-lg text-gray-600')}>No Podcasts, please search something...</Text>
                :
                <ActivityIndicator size="large" color="#42a5f5" />
              }
            </View>}
          renderItem={({ item }) => <SearchTile item={item} />}
          keyExtractor={(item) => String(item.feedUrl)}>
        </FlatList>}
    </View>
  );
};

export default SearchScreen;
