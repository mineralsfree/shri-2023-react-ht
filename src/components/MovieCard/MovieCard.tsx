import { Movie } from "@/redux/types";
import Image from "next/image";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import styles from "./MovieCard.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { createOrUpdateTicket } from "@/redux/features/cart/cart";
import { DeleteButton } from "@/components/Buttons/DeleteButton/DeleteButton";
import { openModal } from "@/redux/features/modal/modal";

type CardVariant = "big" | "small";
export type MovieWithCinema = Movie & { cinema?: string };

interface MovieCardProps {
  movie: MovieWithCinema;
  className?: string;
  variant: CardVariant;
  deletable?: boolean;
}

type Size = {
  width: number;
  height: number;
};
const imageSize: { [key in CardVariant]: Size } = {
  big: { width: 400, height: 500 },
  small: { width: 100, height: 120 },
};
export const MovieCard = (props: MovieCardProps) => {
  const { movie, className, variant = "small", deletable } = props;
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(
      openModal({
        message: "Вы уверены, что хотите удалить билет?",
        id: movie.id,
      }),
    );
  };

  const onQuantityChange = (count: number) => {
    if (count === 0 && deletable) {
      return onDelete();
    }
    dispatch(createOrUpdateTicket({ movie, count }));
  };

  const {
    title,
    genre,
    posterUrl,
    releaseYear,
    id,
    director,
    rating,
    description,
    cinema,
  } = movie;
  return (
    <article className={classNames(styles.movieCard, className)}>
      <div>
        <div>
          <Image
            className={styles.movieCardImage}
            src={posterUrl}
            alt={title}
            priority
            width={imageSize[variant].width}
            height={imageSize[variant].height}
          />
        </div>
        <div className={styles.movieCardInfo}>
          <h2
            className={classNames(styles.movieCardInfoTitle, {
              [styles.movieCardInfoTitleBig]: variant === "big",
            })}
          >
            <Link href={"/movie/" + id}>{title}</Link>
          </h2>
          {variant === "small" ? (
            <div>
              <p className={styles.movieCardInfoGenre}>{genre}</p>
              <p className={styles.movieCardInfoGenre}>{cinema}</p>
            </div>
          ) : (
            <div>
              <p className={styles.movieCardInfoDetails}>
                <b>Жанр:</b> {genre}
              </p>
              <p className={styles.movieCardInfoDetails}>
                <b>Год выпуска:</b> {releaseYear}
              </p>
              <p className={styles.movieCardInfoDetails}>
                <b>Рейтинг:</b> {rating}
              </p>
              <p className={styles.movieCardInfoDetails}>
                <b>Режисёр:</b> {director}
              </p>
              <p className={styles.movieCardInfoDescription}>
                <b>Описание</b>
              </p>
              <p className={styles.movieCardInfoDetails}>{description}</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <QuantityStepper onQuantityChange={onQuantityChange} filmId={id} />
        {deletable && (
          <div className={styles.deleteButton}>
            <DeleteButton onClick={onDelete} />
          </div>
        )}
      </div>
    </article>
  );
};
