import Link from "next/link";
import styles from "./Header.module.scss";
import { Input } from "../HeaderInput";

type HeaderProps = {
  onChange: (msg: string) => void;
};

export function Header(props: HeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.img}></div>

      <div className={styles.actions}>
        <div>
          <h1>To Do List</h1>
        </div>
        <div>
          <Link href="https://github.com/Marlliton/to-do-list">
            <a>Source Code</a>
          </Link>
        </div>
      </div>

      <Input onChange={msg => props.onChange(msg)} />
    </div>
  );
}
