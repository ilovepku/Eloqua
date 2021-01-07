import {gql} from '@apollo/client'

const pieceQuery = gql`
  query pieceQuery($id: Int!) {
    pieces_by_pk(id: $id) {
      date
      text
    }
  }
`

export default pieceQuery
