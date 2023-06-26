export interface Cinema {
    id: string;
    name: string;
    movieIds: string[];

}
export interface Movie  {
    id: string;
    title: string;
    posterUrl: string;
    releaseYear: number;
    description: string;
    genre: string;
    rating: number;
    director: string;
    reviewIds: string[];
}
export interface Review {
    id: string;
    name: string;
    text: string;
    rating: boolean;
}
export interface Ticket {
    movie: Movie,
    count: number
}