export interface SongsQueryParams {
  query?: string;
  sortBy?: 'title' | 'artist' | 'album';
  order?: 'asc' | 'desc';
  page?: string;
  limit?: string;
  onlyFavorites?: string;
}

export interface ISong {
  title: string;
  artist: string;
  album: string;
}
