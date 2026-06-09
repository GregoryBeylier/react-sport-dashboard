// @refresh reset
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import styles from "./SignIn.module.css";
import signInImage from "../assets/images/SignIn.jpg";
import Logo from "../assets/images/Logo.png";
import {loginUser}  from "../services/api"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login  } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = await loginUser(username, password); 
    login(data.token); 
    navigate("/dashboard");
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Logo} alt="SportSee logo" />
        <div className={styles.card}>
          <h1>Transformez vos stats en résultats</h1>
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <label>E-mail</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Se connecter</button>
          </form>
          <p>Mot de passe oublié ? </p>
        </div>
      </div>
      <div className={styles.right}>
        <img src={signInImage} alt="Coureurs" />
        <div className={styles.bubble}>
          Analysez vos performances en un clin d’œil, suivez vos progrès et
          atteignez vos objectifs.
        </div>
      </div>
    </div>
  );
}
