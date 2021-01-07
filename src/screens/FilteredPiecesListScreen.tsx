import React from 'react'
import {useRoute} from '@react-navigation/native'
import {useQuery} from '@apollo/client'

import allPiecesQuery from '../graphql/query/allPiecesQuery'
import {AllPiecesQuery_piece} from '../types/graphql'
import Error from '../components/Error'
import Loading from '../components/Loading'
import PiecesFlatList from '../components/PiecesFlatList'

export default function FilteredPiecesListScreen() {
  const {loading, error, data} = useQuery(allPiecesQuery)

  const {person_id_filter, category_id_filter} = useRoute().params as {
    person_id_filter: string
    category_id_filter: string
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error errMsg={error.message} />
  }

  const filteredPieces = data.pieces.filter(
    ({person_id, piece_categories}: AllPiecesQuery_piece) =>
      (person_id_filter && person_id_filter === `person-${person_id}`) ||
      (category_id_filter &&
        piece_categories.find(
          item => `category-${item.category_id}` === category_id_filter,
        )),
  )

  return <PiecesFlatList pieces={filteredPieces} />
}
