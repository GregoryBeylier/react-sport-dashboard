import styles from "./ProfileCard.module.css"

export type ProfileCardProps = {
  age: number;
  weight: number;
  height: number;
  gender: string;
};

export default function ProfileCard({
  age,
  weight,
  height,
  gender,
}: ProfileCardProps) {
  return (
    <div>
      <p className={styles.info}>Âge : {age} </p> 
      <p className={styles.info}>Genre : {gender}</p> 
      <p className={styles.info}>Taille : {Math.floor(height / 100)}m{height % 100}</p>
      <p className={styles.info}>Poids : {weight} kg</p>
    </div>
  );
}
