import React from 'react';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/client';

import {RootState} from '../../redux/rootReducer';
import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import {AllPiecesQuery_piece} from '../../types/graphql';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import PiecesFlatList from '../piecesFlatList/PiecesFlatList';

export default function FavoritesScreen() {
  const {loading, error, data} = useQuery(allPiecesQuery);

  if (loading) return <Loading />;
  if (error) return <Error errMsg={error.message} />;

  const {favArr} = useSelector((state: RootState) => state.favorites);
  const filteredPieces = data.pieces.filter((item: AllPiecesQuery_piece) =>
    favArr.includes(`piece-${item.id}`),
  );

  return (
    <PiecesFlatList
      pieces={filteredPieces}
      emptyMsg={'No favorite pieces yet, please add some...'}
    />
  );
}
