import React from 'react'
import {useQuery} from '@apollo/client'

import allPiecesQuery from '../graphql/query/allPiecesQuery'
import {AllPiecesQueryPiece} from '../types/graphql'
import Error from './Error'
import Loading from './Loading'
import PiecesFlatList from './PiecesFlatList'

interface Props {
  keyword: string
}

const SearchedPiecesList: React.FC<Props> = ({keyword}) => {
  const {loading, error, data} = useQuery(allPiecesQuery)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error errMsg={error.message} />
  }

  const filteredPieces = data.pieces.filter(
    ({name, person}: AllPiecesQueryPiece) =>
      keyword === '' ||
      name.toLowerCase().includes(keyword.toLowerCase()) ||
      person.name.toLowerCase().includes(keyword.toLowerCase()),
  )

  return (
    <PiecesFlatList
      pieces={filteredPieces}
      emptyMsg="No matching result, please search for something else..."
    />
  )
}

export default SearchedPiecesList
