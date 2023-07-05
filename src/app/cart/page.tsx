"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectCartMovies, selectCount } from "@/redux/features/cart/selector";
import { RootState } from "@/redux/store";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { Movie } from "@/redux/types";
import { selectConfirmation } from "@/redux/features/modal/selector";
import { ModalPrompt } from "@/components/ModalPrompt/ModalPrompt";
import { deleteTicket } from "@/redux/features/cart/cart";
import { closeModal } from "@/redux/features/modal/modal";
import styles from "./cart.module.scss";

export default function Page() {
  const dispatch = useDispatch();
  const moviesInCart = useSelector((state: RootState) =>
    selectCartMovies(state),
  );
  const inCart = useSelector((state: RootState) => selectCount(state));
  const { isOpen, message, id } = useSelector((state: RootState) =>
    selectConfirmation(state),
  );
  const closeHandler = () => {
    dispatch(closeModal());
  };
  const confirmHandler = () => {
    dispatch(deleteTicket(id));
    dispatch(closeModal());
  };
  return (
    <>
      <div>
        {isOpen && (
          <ModalPrompt
            confirmHandler={confirmHandler}
            closeHandler={closeHandler}
            text={message}
          />
        )}
        {moviesInCart.length > 0 ? (
          moviesInCart.map((movie: Movie) => (
            <MovieCard
              className={styles.movieCard}
              movie={movie}
              variant="small"
              key={movie.id}
              deletable={true}
            />
          ))
        ) : (
          <h2>В корзине пока пусто</h2>
        )}
      </div>
      <div className={styles.bottom}>
        <p className={styles.sum}>Итого билетов: </p>
        <div>{inCart}</div>
      </div>
    </>
  );
}
