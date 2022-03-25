import { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  buttonFilter?: "filter" | "delete";
  isActive?: boolean;
};

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`
      ${
        props.buttonFilter == "filter"
          ? styles.buttonFilter
          : props.buttonFilter == "delete"
          ? styles.delete
          : styles.button
      } 
      ${props.isActive ? styles.isActive : ""}`}
    >
      {props.children}
    </button>
  );
}
