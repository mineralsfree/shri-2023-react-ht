"use client";
import { ChangeEvent, useState } from "react";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  const { initialValue, onChange } = props;
  const [timer, setTimer] = useState<number | null>(null);
  const [value, setValue] = useState(initialValue);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      onChange(newValue);
    }, 300) as unknown as number;
    setTimer(newTimer);
  };
  return (
    <input
      className={styles.search}
      value={value}
      onInput={handleInputChange}
      type="search"
    />
  );
};
