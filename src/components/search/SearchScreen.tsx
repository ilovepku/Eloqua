import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import tailwind from 'tailwind-rn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PiecesList from '../piecesList/PiecesList';

export default function SearchScreen() {
  const [filter, setFilter] = useState('');

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View
        style={tailwind(
          'h-10 mx-4 my-4 px-4 rounded-lg bg-gray-300 flex-row items-center',
        )}>
        <MaterialIcons size={20} name="search" style={tailwind('mr-2')} />
        <TextInput
          placeholder="Type here to search"
          onChangeText={setFilter}
          autoCorrect={false}
          value={filter}
          style={tailwind('flex-1')}
        />
      </View>

      <PiecesList filter={filter} />
    </View>
  );
}
