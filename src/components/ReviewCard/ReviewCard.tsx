import {Review} from "@/redux/types";
import styles from './ReviewCard.module.scss';
import classNames from "classnames";

interface ReviewCardProps {
    review: Review;
    className?: string;
}

export const ReviewCard = (props: ReviewCardProps) => {
    const {className} = props;
    const {name, rating, text} = props.review
    return (<article className={classNames(styles.container, className)}>
        <img src={'/placeholder.png'} alt={'user image'} className={styles.image}/>
        <div className={styles.info}>
            <header className={styles.header}>
                <h4>{name}</h4>
                <p>Оценка: <b>{rating}</b></p>
            </header>
            <p className={styles.text}>{text}</p>
        </div>
    </article>)
}