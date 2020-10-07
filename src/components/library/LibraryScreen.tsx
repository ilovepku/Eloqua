import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import tailwind from 'tailwind-rn';

import {RootState} from '../../redux/rootReducer';
import PiecesList from '../piecesList/PiecesList';

const LibraryScreen = () => {
  const {favArr} = useSelector((state: RootState) => state.favorites);

  return (
    <View style={tailwind('flex-1')}>
      <PiecesList filter={''} favArr={favArr} />
    </View>
  );
};

export default LibraryScreen;
