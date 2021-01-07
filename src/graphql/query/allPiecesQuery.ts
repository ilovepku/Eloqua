import {gql} from '@apollo/client'

const allPiecesQuery = gql`
  query allPiecesQuery {
    pieces(order_by: {date: asc}) {
      id
      name
      person_id
      person {
        name
        img_filename
      }
      date
      duration
      audio_filename
      piece_categories {
        category_id
      }
    }
  }
`

export default allPiecesQuery
