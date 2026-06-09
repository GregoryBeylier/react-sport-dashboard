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

  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authToken) return;

    async function fetchData() {
      try {
        const data = await fetchUserInfo(authToken!);
        setUserInfo(data);
      } catch {
        setError("Impossible de charger le profil");
      }
    }

    fetchData();
  }, [authToken]);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={`${styles.profilePage} ${styles.fadeIn}`}>
      <div className={styles.leftColumn}>
        <div className={`${styles.card} ${styles.avatarCard}`}>
          <div className={styles.avatarWrapper}>
            <img src={photoProfile ?? defaultPhoto} alt={firstName} className={styles.avatar} />
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