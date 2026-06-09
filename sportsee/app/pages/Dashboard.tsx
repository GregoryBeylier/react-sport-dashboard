import { useUser } from "../context/contextUser";
import ChartsWrapper from "../components/charts/RecentPerformance/ChartsWrapper";
import StatsWrapper from "../components/charts/WeeklyStats/WeeklyStats";
import styles from "./Dashboard.module.css";
import defaultPhoto from "../assets/images/default_profile.png";
import runIcon from "../assets/images/OUTLINE.png";
import { formatDateLong } from "../utils/dateHelpers";

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
      <div className={styles.profileCard}>
        <div className={styles.profileLeft}>
          <div className={styles.avatarWrapper}>
            <img
              src={photoProfile ?? defaultPhoto}
              alt={firstName}
              className={styles.avatar}
            />
          </div>
          <div className={styles.profileInfo}>
            <p>
              {firstName} {lastName}
            </p>
            <p>
              Membre depuis le{" "}
              {createdAt ? formatDateLong(new Date(createdAt)) : ""}
            </p>
          </div>
        </div>

        {/* Statistique à droite */}
        <div className={styles.profileStat}>
          <p>Distance totale parcourue</p>

          <div className={styles.profileStatValue}>
            <img src={runIcon} alt="icône course" />
            <span className={styles.fadeInBottom}>{totalDistance} km</span>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className={styles.lastPerformancesSection}>
        <h2 className={styles.sectionTitle}>Vos dernières performances</h2>
        <div className={styles.lastPerformances}>
          <ChartsWrapper />
        </div>
      </div>

      {/* Stats hebdomadaires */}
      <div className={styles.weeklyStats}>
        <StatsWrapper />
      </div>
    </div>
  );
}
