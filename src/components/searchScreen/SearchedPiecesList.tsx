import React from 'react';
import {useQuery} from '@apollo/client';

import allPiecesQuery from '../../graphql/query/allPiecesQuery';
import {AllPiecesQuery_piece} from '../../types/graphql';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import PiecesFlatList from '../piecesFlatList/PiecesFlatList';

interface Props {
  keyword: string;
}

export default function SearchedPiecesList({keyword}: Props) {
  const {loading, error, data} = useQuery(allPiecesQuery);

  const filteredPieces = (data?.pieces ?? []).filter(
    ({name, person}: AllPiecesQuery_piece) =>
      keyword === '' ||
      name.toLowerCase().includes(keyword.toLowerCase()) ||
      person.name.toLowerCase().includes(keyword.toLowerCase()),
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
