import { useUser } from "../context/contextUser";
import ProfileCard from "../components/profileStats/ProfileCard";
import StatsSection from "../components/profileStats/statsSection";
import { MOCK_USER_INFO } from "../data/mockData";
import styles from "./profile.module.css";
import defaultPhoto from "../assets/images/default_profile.png";

export default function Profile() {
  const { firstName, lastName, isLoading, createdAt, photoProfile } = useUser();
  const { age, weight, height, gender } = MOCK_USER_INFO.profile;

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={`${styles.profilePage} ${styles.fadeIn}`}>
      <div className={styles.leftColumn}>
        <div className={`${styles.card} ${styles.avatarCard}`}>
          <div className={styles.avatarWrapper}>
            <img
              src={defaultPhoto}
              alt={`Photo de ${firstName}`}
              className={styles.avatar}
            />
          </div>
          <div>
            <p className={styles.userName}>
              {firstName} {lastName}
            </p>
            <p className={styles.memberSince}>Membre depuis le {createdAt}</p>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardProfile}`}>
          <p className={styles.profileTitle}>Votre profil</p>
          <hr className={styles.divider} />
          <ProfileCard
            age={age}
            weight={weight}
            height={height}
            gender={gender}
          />
        </div>
      </div>

      <div className={styles.rightColumn}>
        <p className={styles.statsTitle}>Vos statistiques</p>
        <p className={styles.statsSubtitle}>depuis le {createdAt}</p>
        <StatsSection />
      </div>
    </div>
  );
}
