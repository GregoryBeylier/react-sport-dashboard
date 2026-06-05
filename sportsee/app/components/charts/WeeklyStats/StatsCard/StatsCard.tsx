import styles from "./StatsCard.module.css"


export type StatsCardProps = {
 label: string;
 value: number;
 unit: string;
 type: string;
 variant?: "default" | "profile";
};

export default function StatsCard({ label, value, unit, type, variant = "default" }: StatsCardProps) {
  return (
    <div className={`${styles.card} ${styles[type]} ${variant === "profile" ? styles.profileVariant : ""}`}>
      <span className={styles.label}>{label}</span>
      <div>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}> {unit}</span>
      </div>
    </div>
  );
}