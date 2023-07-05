import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, Review } from "@/redux/types";

const genreMap: { [key in string]: string } = {
  horror: "Ужастик",
  fantasy: "Фантастика",
  action: "Боевик",
  comedy: "Комедия",
};
const transformResponse = <T extends Movie | Movie[]>(response: T): T => {
  if (Array.isArray(response)) {
    return response.map(
      (movie: Movie): Movie => ({ ...movie, genre: genreMap[movie.genre] }),
    ) as T;
  } else {
    return { ...response, genre: genreMap[response.genre] };
  }
};
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], string | null>({
      query: (cinemaId) =>
        cinemaId ? `movies?cinemaId=${cinemaId}` : "movies",
      transformResponse: (resp: Movie[]) => transformResponse<Movie[]>(resp),
    }),
    getMovie: builder.query<Movie, string>({
      query: (movieId) => `movie?movieId=${movieId}`,
      transformResponse: (resp: Movie) => transformResponse<Movie>(resp),
    }),
    getMovieComments: builder.query<Review[], string>({
      query: (movieId) => `reviews?movieId=${movieId}`,
    }),
  }),
});
export const { useGetMoviesQuery, useGetMovieQuery, useGetMovieCommentsQuery } =
  movieApi;
