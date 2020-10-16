import React from 'react';
import {useQuery} from '@apollo/client';

import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import {AllPiecesQuery_piece} from '../../types/graphql';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import PiecesFlatList from '../piecesFlatList/PiecesFlatList';

interface Props {
  filter: string;
}

export default function FilteredPiecesList({filter}: Props) {
  const {loading, error, data} = useQuery(allPiecesQuery);

  const filteredPieces = (data?.pieces ?? []).filter(
    ({name, person}: AllPiecesQuery_piece) =>
      filter === '' ||
      name.toLowerCase().includes(filter.toLowerCase()) ||
      person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return loading ? (
    <Loading />
  ) : error ? (
    <Error errMsg={error.message} />
  ) : (
    <PiecesFlatList
      pieces={filteredPieces}
      emptyMsg={'No matching result, please search for something else...'}
    />
  );
}
