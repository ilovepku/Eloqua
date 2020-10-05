// ====================================================
// GraphQL query operation: FeedQuery
// ====================================================

export interface FeedQuery_feed {
  __typename: 'FeedItem';
  description: string;
  duration: string;
  image: string | null;
  linkUrl: string;
  pubDate: string;
  text: string;
  title: string;
}

export interface FeedQuery {
  feed: FeedQuery_feed[];
}

export interface FeedQueryVariables {
  feedUrl: string;
}

// ====================================================
// GraphQL query operation: SearchQuery
// ====================================================

export interface SearchQuery_search {
  __typename: 'Podcast';
  artist: string;
  episodesCount: number;
  feedUrl: string;
  podcastName: string;
  thumbnail: string;
  genres: string[];
}

export interface SearchQuery {
  search: SearchQuery_search[];
}

export interface SearchQueryVariables {
  term: string;
}

// ====================================================
// GraphQL query operation: AllPiecesQuery
// ====================================================

export interface AllPiecesQuery_piece {
  __typename: 'pieces';
  id: number;
  name: string;
  person_id: number;
  person: {
    __typename: 'persons';
    name: string;
    img_filename: string;
  };
  date: string;
  audio_filename: string;
  piece_categories: {
    category_id: number;
  }[];
  text: string;
}

export interface AllPiecesQuery {
  search: AllPiecesQuery_piece[];
}

// ====================================================
// GraphQL query operation: AllPiecesQuery
// ====================================================

export interface CategoriesQuery_category {
  __typename: 'categories';
  id: number;
  name: string;
  icon_filename: string;
}

export interface CategoriesQuery {
  search: CategoriesQuery_category[];
}
