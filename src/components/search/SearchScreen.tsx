import React from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import tailwind from 'tailwind-rn';

const SearchScreen = () => {
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('h-10 w-full my-4 px-4')}>
        <TextInput
          style={tailwind('flex-1 px-4 rounded-lg bg-gray-300')}
          placeholder="Search Speech"
        />
      </View>

      <FlatList
        keyboardShouldPersistTaps="never"
        style={tailwind('h-full')}
        data={[{ id: 1 }, { id: 2 }]}
        renderItem={() => (
          <View style={tailwind('h-20 px-4 flex-row items-center')}>
            <View
              style={tailwind(
                'h-12 w-12 bg-blue-600 rounded-lg mr-4',
              )}></View>
            <View>
              <Text style={tailwind('font-bold')}>Steve Jobs</Text>
              <Text style={tailwind('text-sm text-gray-600')}>
                This is the subtitle
                </Text>
              <Text style={tailwind('text-sm text-blue-600')}>
                400 episodes
                </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => String(item.id)}></FlatList>
    </View>
  );
};

export default SearchScreen;
