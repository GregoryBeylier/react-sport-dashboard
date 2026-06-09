import styles from "./ProfileCard.module.css"
import type { UserData } from "../../hooks/useUserData"

export default function ProfileCard({ userInfo }: { userInfo: UserData | null }) {
  console.log("userInfo dans ProfileCard :", userInfo);
  const { age, weight, height, gender } = userInfo?.profile ?? {};;

  return (
    <div>
      <p className={styles.info}>Âge : {age ?? "—"}</p>
      <p className={styles.info}>Genre : {gender ?? "—"}</p>
      <p className={styles.info}>Taille : {height ? `${Math.floor(height / 100)}m${height % 100}` : "—"}</p>
      <p className={styles.info}>Poids : {weight ?? "—"} kg</p>
    </div>
  );
}