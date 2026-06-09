import { useState, useEffect } from "react";
import { useUser } from "../context/contextUser";
import { useAuth } from "../context/authContext";
import fetchUserInfo from "../services/api";
import ProfileCard from "../components/profileStats/ProfileCard";
import StatsSection from "../components/profileStats/statsSection";
import styles from "./profile.module.css";
import defaultPhoto from "../assets/images/default_profile.png";
import { formatDateLong } from "../utils/dateHelpers";
import type { UserData } from "../hooks/useUserData";

export default function Profile() {
  const { authToken } = useAuth();
  const { firstName, lastName, isLoading, createdAt, photoProfile } = useUser();

  // State local pour les infos détaillées du profil
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  useEffect(() => {
    if (!authToken) return;

    async function fetchData() {
      // On appelle fetchUserInfo avec le token
      const data = await fetchUserInfo(authToken!);
      // On stocke le résultat dans le state
      setUserInfo(data);
    }

    fetchData();
  }, [authToken]); // ⚠️ userInfo ne doit PAS être en dépendance — boucle infinie !

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={`${styles.profilePage} ${styles.fadeIn}`}>
      <div className={styles.leftColumn}>

        <div className={`${styles.card} ${styles.avatarCard}`}>
          <div className={styles.avatarWrapper}>
            <img
              src={photoProfile ?? defaultPhoto}
              alt={firstName}
              className={styles.avatar}
            />
          </div>
          <div>
            <p className={styles.userName}>{firstName} {lastName}</p>
            <p className={styles.memberSince}>
              Membre depuis le{" "}
              {createdAt ? formatDateLong(new Date(createdAt)) : ""}
            </p>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardProfile}`}>
          <p className={styles.profileTitle}>Votre profil</p>
          <hr className={styles.divider} />
          <ProfileCard userInfo={userInfo} />
        </div>
      </div>

      <div className={styles.rightColumn}>
        <p className={styles.statsTitle}>Vos statistiques</p>
        <p className={styles.statsSubtitle}>
          depuis le {createdAt ? formatDateLong(new Date(createdAt)) : ""}
        </p>
        <StatsSection />
      </div>
    </div>
  );
}