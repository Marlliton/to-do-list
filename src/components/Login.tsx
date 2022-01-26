import Link from "next/link";
import { useState } from "react";
import Lottie from "react-lottie";
import { useForm, SubmitHandler } from "react-hook-form";
import * as unlock from "../../public/animation/block.json";
import styles from "../styles/Login.module.scss";

type LoginProps = {};

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: unlock,
};
export function Login(props) {
  const [animation, setAnimation] = useState({
    isStopped: false,
    isPaused: false,
  });
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className={styles.container}>
      <div id={styles.bg} />
      <div className={styles.wrapper}>
        <Lottie
          speed={2}
          options={defaultOptions}
          height={250}
          width={250}
          isStopped={animation.isStopped}
          isPaused={animation.isPaused}
        />
        <h1>Faça login para acessar suas tarefas!</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles["sr-only"]} htmlFor="email-address">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="Digite seu email"
            id="email-address"
            />
          <label className={styles["sr-only"]} htmlFor="password">
            Senha
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            name="password"
            required
            placeholder="Digite sua senha"
            className={styles.password}
          />
          <span>
            <Link href="/forgot-pass">
              <a>Esqueceu sua senha?</a>
            </Link>
          </span>
          <footer className={styles["form-footer"]}>
            <button type="submit">Entrar</button>
          </footer>
        </form>
      </div>
      <footer className={styles.footer}>
        <div>
          <p>Ilustrações retiradas do undraw</p>
          <br />
          <p>
            Para mais informações visite{" "}
            <Link href="https://undraw.co/">
              <a>undraw.co</a>
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
