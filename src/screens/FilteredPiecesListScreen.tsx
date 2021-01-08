import React from 'react'
import {useRoute} from '@react-navigation/native'
import {useQuery} from '@apollo/client'

import allPiecesQuery from '../graphql/query/allPiecesQuery'
import {AllPiecesQueryPiece} from '../types/graphql'
import Error from '../components/Error'
import Loading from '../components/Loading'
import PiecesFlatList from '../components/PiecesFlatList'

const FilteredPiecesListScreen: React.FC = () => {
  const {loading, error, data} = useQuery(allPiecesQuery)

  const {personIdFilter, categoryIdFilter} = useRoute().params as {
    personIdFilter: string
    categoryIdFilter: string
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error errMsg={error.message} />
  }

  const filteredPieces = data.pieces.filter(
    ({
      person_id: personId,
      piece_categories: pieceCategories,
    }: AllPiecesQueryPiece) =>
      (personIdFilter && personIdFilter === `person-${personId}`) ||
      (categoryIdFilter &&
        pieceCategories.find(
          item => `category-${item.category_id}` === categoryIdFilter,
        )),
  )

  return <PiecesFlatList pieces={filteredPieces} />
}

export default FilteredPiecesListScreen
