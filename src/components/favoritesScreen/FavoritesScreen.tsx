import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';

import {RootState} from '../../redux/rootReducer';
import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import {AllPiecesQuery_piece} from '../../types/graphql';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import PiecesFlatList from '../piecesFlatList/PiecesFlatList';

export default function FavoritesScreen() {
  const {loading, error, data} = useQuery(allPiecesQuery);
  const {favArr} = useSelector((state: RootState) => state.favorites);

  const filteredPieces = data.pieces.filter((item: AllPiecesQuery_piece) =>
    favArr.includes(`piece-${item.id}`),
  );

  return (
    <View style={tailwind('flex-1')}>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error errMsg={error.message} />
      ) : (
        <PiecesFlatList
          pieces={filteredPieces}
          emptyMsg={'No favorite pieces yet, please add some...'}
        />
      )}
    </View>
  );
}
