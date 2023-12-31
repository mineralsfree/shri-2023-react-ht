import styles from "./ExpandButton.module.scss";
import classNames from "classnames";

interface ExpandButtonProps {
  onClick?: () => void;
  fill: `#${string}`;
  size: number;
  expanded: boolean;
}
export const ExpandButton = (props: ExpandButtonProps) => {
  const { onClick, size, expanded, fill } = props;
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, { [styles.expanded]: expanded })}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.49999 18.9583H12.5C17.025 18.9583 18.9583 17.025 18.9583 12.5V7.49996C18.9583 2.97496 17.025 1.04163 12.5 1.04163H7.49999C2.97499 1.04163 1.04166 2.97496 1.04166 7.49996V12.5C1.04166 17.025 2.97499 18.9583 7.49999 18.9583ZM2.29166 7.49996C2.29166 3.65829 3.65832 2.29163 7.49999 2.29163H12.5C16.3417 2.29163 17.7083 3.65829 17.7083 7.49996V12.5C17.7083 16.3416 16.3417 17.7083 12.5 17.7083H7.49999C3.65832 17.7083 2.29166 16.3416 2.29166 12.5V7.49996ZM9.55833 12.2417C9.68333 12.3667 9.84166 12.4251 9.99999 12.4251C10.1583 12.4251 10.3167 12.3667 10.4417 12.2417L13.3833 9.30006C13.625 9.05839 13.625 8.65839 13.3833 8.41672C13.1417 8.17506 12.7417 8.17506 12.5 8.41672L9.99999 10.9167L7.49999 8.41672C7.25833 8.17506 6.85833 8.17506 6.61666 8.41672C6.37499 8.65839 6.37499 9.05839 6.61666 9.30006L9.55833 12.2417Z"
          fill={fill}
        />
      </svg>
    </button>
  );
};
