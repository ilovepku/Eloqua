import React from 'react'
import {useSelector} from 'react-redux'
import {useQuery} from '@apollo/client'

import {RootState} from '../redux/rootReducer'
import allPiecesQuery from '../graphql/query/allPiecesQuery'
import {AllPiecesQueryPiece} from '../types/graphql'
import Error from '../components/Error'
import Loading from '../components/Loading'
import PiecesFlatList from '../components/PiecesFlatList'

const FavoritesScreen: React.FC = () => {
  const {loading, error, data} = useQuery(allPiecesQuery)
  const {favArr} = useSelector((state: RootState) => state.favorites)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error errMsg={error.message} />
  }

  const filteredPieces = data.pieces.filter((item: AllPiecesQueryPiece) =>
    favArr.includes(`piece-${item.id}`),
  )

  return (
    <PiecesFlatList
      pieces={filteredPieces}
      emptyMsg="No favorite pieces yet, please add some..."
    />
  )
}

export default FavoritesScreen
