import { useUser } from "../context/contextUser";
import ChartsWrapper from "../components/charts/RecentPerformance/ChartsWrapper";
import StatsWrapper from "../components/charts/WeeklyStats/WeeklyStats";
import styles from "./Dashboard.module.css";
import defaultPhoto from "../assets/images/default_profile.png"
import runIcon from "../assets/images/OUTLINE.png"

export default function Dashboard() {
  const {
    firstName,
    lastName,
    isLoading,
    createdAt,
    totalDistance,
    photoProfile,
  } = useUser();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
  <div className={styles.dashboard}>

    {/* Carte profil */}
    <div className={styles.profileCard}>

      {/* Groupe gauche : photo + infos */}
      <div className={styles.profileLeft}>
        <img src={defaultPhoto} alt={firstName} />
        <div className={styles.profileInfo}>
          <p>{firstName} {lastName}</p>
          <p>Membre depuis le {createdAt}</p>
        </div>
      </div>

      {/* Statistique à droite */}
      <div className={styles.profileStat}>
        <p>Distance totale parcourue</p>
        <div className={styles.profileStatValue}>
          <img src={runIcon} alt="icône course" />
          <span>{totalDistance} km</span>
        </div>
      </div>

    </div>

    {/* Graphiques */}
    <div className={styles.lastPerformances}>
      <ChartsWrapper />
    </div>

    {/* Stats hebdomadaires */}
    <div className={styles.weeklyStats}>
      <StatsWrapper />
    </div>

  </div>
);
}