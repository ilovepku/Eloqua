import {gql} from '@apollo/client'

const personsQuery = gql`
  query personsQuery {
    persons(order_by: {name: asc}) {
      id
      name
      img_filename
    }
  }
`

export default personsQuery
