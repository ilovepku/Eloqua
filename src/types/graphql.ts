// ====================================================
// GraphQL query operation: AllPiecesQuery
// ====================================================

export interface AllPiecesQuery_piece {
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
  search: AllPiecesQuery_piece[]
}

// ====================================================
// GraphQL query operation: CategoriesQuery
// ====================================================

export interface CategoriesQuery_category {
  __typename?: 'categories'
  id: number
  name: string
  icon_filename: string
}

export interface CategoriesQuery {
  search: CategoriesQuery_category[]
}

// ====================================================
// GraphQL query operation: PersonsQuery
// ====================================================

export interface PersonsQuery_person {
  __typename?: 'persons'
  id: number
  name: string
  img_filename: string
}

export interface PersonsQuery {
  search: PersonsQuery_person[]
}
