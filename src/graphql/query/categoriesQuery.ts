import {gql} from '@apollo/client';

const categoriesQuery = gql`
  query categoriesQuery {
    categories {
      id
      name
      icon_filename
    }
  }
`;

export default categoriesQuery;
