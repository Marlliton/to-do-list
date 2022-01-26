import styles from "../styles/Li.module.scss";
import { Checked } from "./Checked";

type LiProps = {
  description: string;
  isFinished: boolean;

  toggleStatus: () => void;
};

export function Li(props: LiProps) {
  return (
    <li
      className={`${styles.li} ${props.isFinished ? styles.stripe : ""}`}
      onClick={props.toggleStatus}
    >
      <Checked isChecked={props.isFinished} />
      {props.description}
    </li>
  );
}
