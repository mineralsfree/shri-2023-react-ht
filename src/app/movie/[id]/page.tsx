'use client'
import {useGetMovieCommentsQuery, useGetMovieQuery} from "@/redux/services/movieApi";
import {MovieCard} from "@/components/MovieCard/MovieCard";
import {ReviewCard} from "@/components/ReviewCard/ReviewCard";
import {Review} from "@/redux/types";
import styles from './movie.module.scss'
import {Spinner} from "@/components/Spinner/Spinner";
export default function Page({params}: { params: { id: string } }) {
    const {data: movie, isLoading, isError} = useGetMovieQuery(params.id);
    const {data: comments} = useGetMovieCommentsQuery(params.id)
    if (isLoading) return <Spinner/>
    return (<div>
        {movie && <MovieCard movie={movie} variant={'big'}></MovieCard>}
        {comments && comments.length > 0 && comments.map((review: Review) => {
            return (<ReviewCard className={styles.review} key={review.id} review={review}/>)
        })}
    </div>);
}