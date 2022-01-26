import { useState } from "react";
import icon from "../../public/images/add.svg";
import styles from "../styles/Input.module.scss";
import { Button } from "./Button";
import { Image } from "./Image";

type InputProps = {
  onChange: (description: string) => void;
};

export function Input(props: InputProps) {
  const [description, setDescription] = useState("");
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Digite aqui sua nova tarefa"
        onKeyDown={e => {
          if (e.key === "Enter") {
            props.onChange(description);
            setDescription("");
          }
        }}
      />
      <Button
        onClick={() => {
          description !== "" ? props.onChange(description) : false;
          setDescription("");
        }}
      >
        Add{" "}
        <Image
          src={icon}
          width={20}
          height={20}
          alt="Adicione uma nova tarefa"
        />
      </Button>
    </div>
  );
}
