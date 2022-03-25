import { useState } from "react";
import styles from "./input.module.scss";

type InputProps = {
  type: "text" | "email" | "password";
  placeholder?: string;
  id: string;
  required: boolean;

  onChange: (value: string) => void;
};

export function Input(props: InputProps) {
  const [value, setValue] = useState("");
  return (
    <div className={styles.container}>
      <label className={styles["sr-only"]} htmlFor={props.id}>
        {props.id}
      </label>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}
        required={props.required}
      />
    </div>
  );
}
