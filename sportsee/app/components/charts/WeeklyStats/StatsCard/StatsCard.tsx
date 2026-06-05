import styles from "./StatsCard.module.css"


export type StatsCardProps = {
 label: string;
 value: number;
 unit: string;
 type: "duration" | "distance";
};

export default function StatsCard({ label, value, unit, type }: StatsCardProps) {
    return (
     <div className={`${styles.card} ${styles[type]}`}>
      <span className={styles.label}>{label}</span>
      <div>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}> {unit}</span>
      </div>
    </div>
  );
  

}