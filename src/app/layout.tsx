import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/Header/Header";
import { StoreProvider } from "@/redux/StoreProvider";
import styles from "./page.module.scss";
import { Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={roboto.className}>
          <Header />
          <main className={styles.content}>{children}</main>
          <footer className={styles.footer}>
            <div>
              <Link href={"/qa"}>Вопросы-ответы</Link>
            </div>
            <div>
              <Link href={"/about"}>О нас</Link>
            </div>
          </footer>
        </body>
      </html>
    </StoreProvider>
  );
}
