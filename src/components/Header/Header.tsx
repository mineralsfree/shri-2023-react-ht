"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { selectCount } from "@/redux/features/cart/selector";
import { RootState } from "@/redux/store";

export const Header = () => {
  const inCart = useSelector((state: RootState) => selectCount(state));
  return (
    <header className={styles["header-content"]}>
      <Link className={styles["header-link"]} href={"/movies"}>
        Билетопоиск
      </Link>
      <div className={styles["header-cart"]}>
        <div className={styles["header-count"]}>{inCart}</div>
        <Link href={"/cart"}>
          <Image src={"/basket.svg"} alt={"basket"} width={32} height={32} />
        </Link>
      </div>
    </header>
  );
};
