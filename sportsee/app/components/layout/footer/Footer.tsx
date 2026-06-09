import styles from "./Footer.module.css";
import incoLogo from "../../../assets/images/Iconlogo.png";
import { useLocation } from "react-router";

export default function Footer() {
  const location = useLocation();

  return (
    <div className={`${styles.footer} ${location.pathname === "/profile" ? styles.slideInBottom : ""}`}>
      <div>©Sportsee Tous droits réservés</div>
      <div className={styles.right}>
        <span>Conditions générales</span>
        <span>Contact</span>
        <img src={incoLogo} alt="SportSee logo" />
      </div>
    </div>
  );
}


