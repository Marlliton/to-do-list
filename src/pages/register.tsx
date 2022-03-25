import Link from "next/link";
import { useState } from "react";
import backgroundAuth from "../../public/images/unlock.svg";
import { Animation } from "../components/AuthAnimation";
import { Input } from "../components/GenericInput";
import { Image } from "../components/MyImage";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/authenticate.module.scss";
import * as block from "../../public/animation/lock2.json";

export default function Authenticate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await register({ name, email, password });
  }

  return (
    <div className={styles.container}>
      <Animation animation={block} />
      <span>
        <Image
          className="authenticate-login"
          src={backgroundAuth}
          width={600}
          height={400}
          alt="background"
        />
      </span>
      <div className={styles.wrapper}>
        <h1>Hora de criar sua conta! :)</h1>
        <form onSubmit={handleSubmit}>
          <Input
            required
            placeholder="Nome"
            onChange={setName}
            type="text"
            id="name"
          />

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
            <a href="/login">Já tem uma conta? Faça seu Login</a>
          </span>

          <footer className={styles.footerForm}>
            <button>Cadastrar</button>
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
