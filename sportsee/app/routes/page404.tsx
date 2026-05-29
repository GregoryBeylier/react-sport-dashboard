import { Link } from "react-router";

export default function Page404() {
  return (
    <div>
      <div>
        <h1>404</h1>
        <h2>Oups 🙈 Cette page n'existe pas</h2>
        <p>La page que vous cherchez semble introuvable.</p>
        <Link to="/" className="error-link">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
