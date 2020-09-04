import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import { useLazyQuery } from "@apollo/client"
import FeatherIcon from 'react-native-vector-icons/Feather'
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
      <View style={tailwind('h-10 mx-4 my-4 px-4 rounded-lg bg-gray-300 flex-row items-center')}>
        <FeatherIcon size={20} name="search" style={tailwind('mr-2')} />
        <TextInput
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
          data={data?.search ?? []}
          ListEmptyComponent={
            <View style={tailwind('h-64 items-center justify-center')}>
              {loading ?
                <ActivityIndicator size="large" color="#42a5f5" /> :
                <Text style={tailwind('text-lg text-gray-600')}>No Podcasts, please search something...</Text>
              }{/* TODO: theme color */}
            </View>}
          renderItem={({ item }) => <SearchTile item={item} />}
          keyExtractor={(item) => String(item.feedUrl)}>
        </FlatList>}
    </View>
  );
};

export default SearchScreen;
