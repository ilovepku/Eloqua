import {gql} from '@apollo/client';

const allPiecesQuery = gql`
  query allPiecesQuery {
    pieces {
      id
      name
      person {
        name
        img_filename
      }
      date
      audio_filename
    }
  }
`;

export default allPiecesQuery;
