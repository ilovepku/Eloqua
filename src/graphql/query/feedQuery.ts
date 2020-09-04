import {gql} from '@apollo/client';

const feedQuery = gql`
  query FeedQuery($feedUrl: String!) {
    feed(feedUrl: $feedUrl) {
      description
      duration
      image
      linkUrl
      pubDate
      text
      title
    }
  }
`;

export default feedQuery;
