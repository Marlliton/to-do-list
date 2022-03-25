import { useState } from "react";
import Link from "next/link";
import * as animationLogin from "../../public/animation/login.json";
import { Animation } from "../components/AuthAnimation";
import { Input } from "../components/GenericInput";
import { Image } from "../components/MyImage";
import backgroundAuth from "../../public/images/unlock.svg";

import styles from "../styles/authenticate.module.scss";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    authenticate({ email, password });
  }

  return (
    <div className={styles.container}>
      <Animation animation={animationLogin} />
      <span>
        <Image
          alt="Imagem de Login"
          className="authenticate-login"
          src={backgroundAuth}
          width={600}
          height={400}
        />
      </span>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <Input
            required
            placeholder="Email"
            onChange={setEmail}
            type="email"
            id="email"
          />
          <Input
            required
            placeholder="Senha"
            onChange={setPassword}
            type="password"
            id="password"
          />

          <span>
            <a href="/register">Ainda não tem um conta? Crie Uma.</a>
          </span>

          <footer className={styles.footerForm}>
            <button>Entrar</button>
          </footer>
        </form>
      </div>
      <footer className={styles.footer}>
        <p>Illustration obtained from undraw website</p>
        <p>
          For more information visit{" "}
          <Link href="https://undraw.co/">
            <a target="_blank">undraw.co</a>
          </Link>
        </p>
      </footer>
    </div>
  );
}
