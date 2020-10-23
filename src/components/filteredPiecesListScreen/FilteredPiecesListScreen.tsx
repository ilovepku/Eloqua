import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import {AllPiecesQuery_piece} from '../../types/graphql';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import PiecesFlatList from '../piecesFlatList/PiecesFlatList';

export default function FilteredPiecesListScreen() {
  const {person_id_filter, category_id_filter} = useRoute().params as {
    person_id_filter: string;
    category_id_filter: string;
  };

  const {loading, error, data} = useQuery(allPiecesQuery);

  // seperate filter logic into seperate file
  const filteredPieces = data.pieces.filter(
    ({person_id, piece_categories}: AllPiecesQuery_piece) =>
      (person_id_filter && person_id_filter === `person-${person_id}`) ||
      (category_id_filter &&
        piece_categories.find(
          (item) => `category-${item.category_id}` === category_id_filter,
        )),
  );

  return loading ? (
    <Loading />
  ) : error ? (
    <Error errMsg={error.message} />
  ) : (
    <PiecesFlatList pieces={filteredPieces} />
  );
}
