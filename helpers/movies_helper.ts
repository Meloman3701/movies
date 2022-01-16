import movies from 'public/movies.json';
import { MovieType } from 'types';

export function getMovies(): MovieType[] {
  return movies.items;
}

export function getMovieByUri(uri: string): MovieType {
  return movies.items.find((item => item.uri == uri))
}
