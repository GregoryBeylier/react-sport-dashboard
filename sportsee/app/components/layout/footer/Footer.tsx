import styles from "./Footer.module.css";
import incoLogo from "../../../public/images/Iconlogo.png";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>©Sportsee Tous droits réservés</div>
      <div className={styles.right}>
        <span>Conditions générales</span>
        <span>Contact</span>
        <img src={incoLogo} alt="SportSee logo" />
      </div>
    </div>
  );
}
