import styles from "./Checked.module.scss";

type CheckedProps = {
  isChecked: boolean;
};

export function Checked(props: CheckedProps) {
  return (
    <div
      className={`${styles.container} ${
        props.isChecked ? styles.purple : styles.white
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.isChecked ? "#fff" : "#525252"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
}
