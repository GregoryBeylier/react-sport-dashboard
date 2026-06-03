// @refresh reset
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import styles from "./SignIn.module.css";
import signInImage from "../assets/images/SignIn.jpg";
import Logo from "../assets/images/Logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    login("mock-token");
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
}
