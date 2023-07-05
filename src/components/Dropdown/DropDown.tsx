import styles from "./DropDown.module.scss";
import { ExpandButton } from "@/components/Buttons/ExpandButton/ExpandButton";
import React, { useRef, useState } from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";

interface DropDownProps {
  placeHolder: string;
  value: string;
  onChange: (val: any) => void;
  options: { value: any; label: string }[];
}

export const DropDown = (props: DropDownProps) => {
  const { placeHolder, onChange, value, options } = props;
  const optionsWithDefault = [{ label: "Не Выбран", value: "" }, ...options];
  const [expanded, setExpanded] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((option) => option.value === value);
  return (
    <div
      ref={dropDownRef}
      onClick={() => setExpanded(!expanded)}
      className={classNames(styles.input, { [styles.expanded]: expanded })}
    >
      <p>{selectedLabel ? selectedLabel.label : placeHolder}</p>
      <ExpandButton size={20} fill="#999FA6" expanded={expanded} />
      {expanded &&
        dropDownRef.current &&
        ReactDOM.createPortal(
          <div
            className={styles.optionContainer}
            style={{
              top: dropDownRef.current.getBoundingClientRect().y + 45,
              left: dropDownRef.current.getBoundingClientRect().x,
              width: dropDownRef.current.getBoundingClientRect().width,
            }}
          >
            {optionsWithDefault.map((option) => {
              return (
                <div
                  onClick={() => {
                    setExpanded(false);
                    onChange(option.value);
                  }}
                  key={option.value + option.label}
                  className={styles.option}
                >
                  {option.label}
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
};
