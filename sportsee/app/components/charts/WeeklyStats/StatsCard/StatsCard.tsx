import styles from "./StatsCard.module.css"


export type StatsCardProps = {
 label: string;
 value: number;
 unit: string;
};

export default function StatsCard({ label, value, unit }: StatsCardProps) {
    return (
        <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <div>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}> {unit}</span>
      </div>
    </div>
  );

}