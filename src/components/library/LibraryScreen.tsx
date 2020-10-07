import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import tailwind from 'tailwind-rn';

import {RootState} from '../../redux/rootReducer';
import PiecesList from '../piecesList/PiecesList';

const LibraryScreen = () => {
  const {favMap} = useSelector((state: RootState) => state.favorites);

  return (
    <View style={tailwind('flex-1')}>
      <PiecesList filter={''} favMap={favMap} />
    </View>
  );
};

export default LibraryScreen;
