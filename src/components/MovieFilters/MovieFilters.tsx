'use client';
import styles from './MovieFilters.module.scss';
import {DropDown} from "@/components/Dropdown/DropDown";
import {Cinema} from "@/redux/types";
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {SearchInput} from "@/components/SearchInput/SearchInput";

interface MovieFilterProps {
    cinemas: Cinema[];
    genres: string[]
}

export const MovieFilters = (props: MovieFilterProps) => {
    const searchParams = useSearchParams();

    const router = useRouter()
    const [cinema, setCinema] = useState(searchParams.get('cinema') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');
    const [genre, setGenre] = useState(searchParams.get('genre') || '');
    const getNewQuery = (q: string, cinema: string, genre: string): { q?: string, cinema?: string, genre?: string } => {
        return {...(q ? {q} : {}), ...(cinema ? {cinema: cinema} : {}), ...(genre ? {genre} : {})}
    }
    const onSearchChange = (newQ: string) => {
        const queryObject = getNewQuery(newQ, cinema, genre);
        const query = new URLSearchParams(queryObject);
        setQ(newQ)
        router.push(`/movies?${query}`);
    }
    const onCinemaChange = (cinemaId: string) => {
        const queryObject = getNewQuery(q, cinemaId, genre);
        const query = new URLSearchParams(queryObject);
        setCinema(cinemaId);
        router.push(`/movies?${query}`);
    }
    const onGenreChange = (newGenre: string) => {
        const queryObject = getNewQuery(q, cinema, newGenre);
        const query = new URLSearchParams(queryObject);
        setGenre(newGenre);
        router.push(`/movies?${query}`);
    }
    const {genres, cinemas} = props;
    const genreOptions = genres.map((genre: string) => ({label: genre, value: genre}))
    const cinemaOptions = cinemas.map((cinema: Cinema) => ({label: cinema.name, value: cinema.id}));
    return (<div className={styles['movie-filter-container']}>
        <div className={styles.title}>Фильтр поиска</div>
        <label htmlFor='name' className={styles.label}>
            Название
        </label>
        <SearchInput onChange={onSearchChange} initialValue={q}></SearchInput>
        <label className={styles.label}>
            Жанр
        </label>
        <DropDown placeHolder={'Выберите жанр'} value={genre} onChange={onGenreChange} options={genreOptions}/>
        <label className={styles.label}>
            Кинотеатр
        </label>
        <DropDown placeHolder={'Выберите Кинотеатр'} value={cinema} onChange={onCinemaChange}
                  options={cinemaOptions}/>
    </div>)
}