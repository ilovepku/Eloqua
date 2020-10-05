import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import tailwind from 'tailwind-rn';
import PiecesList from '../PiecesList/PiecesList';

const AllPiecesScreen = () => {
  const [filter, setFilter] = useState('');

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

      <PiecesList filter={filter} />
    </View>
  );
};

export default AllPiecesScreen;
