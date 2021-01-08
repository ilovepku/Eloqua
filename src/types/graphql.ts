// ====================================================
// GraphQL query operation: AllPiecesQuery
// ====================================================

export interface AllPiecesQueryPiece {
  __typename?: 'pieces'
  id: number
  name: string
  person_id: number
  person: {
    __typename?: 'persons'
    name: string
    img_filename: string
  }
  date: string
  duration: number
  audio_filename: string
  piece_categories: {
    category_id: number
  }[]
  text: string
}

export interface AllPiecesQuery {
  search: AllPiecesQueryPiece[]
}

// ====================================================
// GraphQL query operation: CategoriesQuery
// ====================================================

export interface CategoriesQueryCategory {
  __typename?: 'categories'
  id: number
  name: string
  icon_filename: string
}

export interface CategoriesQuery {
  search: CategoriesQueryCategory[]
}

// ====================================================
// GraphQL query operation: PersonsQuery
// ====================================================

export interface PersonsQueryPerson {
  __typename?: 'persons'
  id: number
  name: string
  img_filename: string
}

export interface PersonsQuery {
  search: PersonsQueryPerson[]
}
