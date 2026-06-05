import styles from "./StatsCard.module.css"


export type StatsCardProps = {
 label: string;
 value: number;
 unit: string;
 type: string;
 variant?: "default" | "profile";
};

export default function StatsCard({ label, value, unit, type, variant = "default" }: StatsCardProps) {

  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  
 const displayValue = type === "duree" ? (
  <>
    {hours}<span className={styles.unitH}>h</span>
    <span className={styles.unitMin}> {minutes}min</span>
  </>
) : value;

  const displayUnit = type === "duree" ? "" : unit; 

  return (
    <div className={`${styles.card} ${styles[type]} ${variant === "profile" ? styles.profileVariant : ""}`}>
      <span className={styles.label}>{label}</span>
      <div>
        <span className={styles.value}>{displayValue}</span>
        {displayUnit && <span className={styles.unit}> {displayUnit}</span>} 
      </div>
    </div>
  );
}
