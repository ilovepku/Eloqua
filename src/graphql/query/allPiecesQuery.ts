import {gql} from '@apollo/client';

const allPiecesQuery = gql`
  query allPiecesQuery {
    pieces {
      id
      name
      person_id
      person {
        name
        img_filename
      }
      date
      audio_filename
      piece_categories {
        category_id
      }
    }
  }
`;

export default allPiecesQuery;
