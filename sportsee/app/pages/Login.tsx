import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

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
    <div>
      <h1>Transformez vos stats en résultats</h1>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mot de passe </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
