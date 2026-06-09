import { Link } from "react-router";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router";
import styles from "./Header.module.css";
import logo from "../../../assets/images/Logo.png";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function sessionDestroy() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.header}>
      <div className={styles.SportSee}>
        <img src={logo} alt="SportSee logo" />
      </div>
      <nav className={styles.nav}>
        <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
        <Link to="/profile" className={styles.navLink}>Mon profile</Link>
        <button className={styles.logoutBtn} onClick={sessionDestroy}>
          Se déconnecter
        </button>
      </nav>
    </div>
  );
}
