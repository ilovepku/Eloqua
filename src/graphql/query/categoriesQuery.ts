import {gql} from '@apollo/client'

const categoriesQuery = gql`
  query categoriesQuery {
    categories(limit: 11) {
      id
      name
      icon_filename
    }
  }
`

export default categoriesQuery
