'use client'
import {useGetMoviesQuery} from "@/redux/services/movieApi";
import {Cinema, Movie} from "@/redux/types";
import {MovieCard, MovieWithCinema} from "@/components/MovieCard/MovieCard";
import styles from './moviesPage.module.scss'
import {MovieFilters} from "@/components/MovieFilters/MovieFilters";
import {useGetCinemasQuery} from "@/redux/services/cinemaApi";
import {useMemo} from "react";
import {useSearchParams} from 'next/navigation'
import {Spinner} from "@/components/Spinner/Spinner";

export default function MoviesPage() {
    const searchParams = useSearchParams();
    const cinemaId = searchParams.get('cinema');
    const q = searchParams.get('q');
    const genre = searchParams.get('genre');
    const {data: movies, isLoading, isError} = useGetMoviesQuery(cinemaId);
    const {data: cinemas, isLoading: isCinemasLoading, isError: isCinemasError} = useGetCinemasQuery();
    let mergedMovies: MovieWithCinema[] | undefined = useMemo(() => cinemas && movies?.map((movie: Movie) => {
        return ({
            ...movie,
            cinema: cinemas?.find((cinema: Cinema) => cinema?.movieIds.includes(movie.id))?.name,

        })
    }), [movies, cinemas]);
    const genres: string[] = useMemo(() => movies && Array.from(movies.reduce((acc, curr) => acc.add(curr.genre), new Set<string>())) || [], [movies]);
    if (mergedMovies && q) {
        mergedMovies = mergedMovies.filter((movie) => movie.title.toLowerCase().includes(q.toLowerCase()))
    }
    if (mergedMovies && genre) {
        mergedMovies = mergedMovies.filter((movie) => movie.genre === genre)
    }
    if (isError || isCinemasError) return (<>
        <h1>Error Encountered</h1>
        <p>An error has occurred. Please try again later.</p></>)
    if (isLoading || isCinemasLoading) return <Spinner/>;
    return !!mergedMovies && cinemas && <div className={styles.moviePageContainer}>
        <MovieFilters genres={genres} cinemas={cinemas}/>
        <div
            className={styles.movieFilterContainer}>{mergedMovies.length > 0 ? mergedMovies.map((movie: MovieWithCinema) =>
            <MovieCard
                variant={'small'}
                className={styles.movieCard} key={movie.id}
                movie={movie}></MovieCard>) : <h2>По критериям поиска ничего не найдено</h2>}
        </div>

    </div>

}