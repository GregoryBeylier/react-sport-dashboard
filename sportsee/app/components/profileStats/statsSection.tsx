import { MOCK_USER_ACTIVITY, MOCK_USER_INFO } from "../../data/mockData";
import StatsCard from "../charts/WeeklyStats/StatsCard/StatsCard";
import styles from "./StatsSection.module.css";

export default function StatsSection() {
  const totalCalorieBurned = MOCK_USER_ACTIVITY.reduce((acc, session) => {
    return acc + session.caloriesBurned;
  }, 0);

  const { totalDistance, totalSessions, totalDuration, restDays } =
    MOCK_USER_INFO.statistics;

  return (
    <div className={styles.grid}>
      <StatsCard label="Temps total couru" value={totalDuration} unit="min" type="duration" variant="profile" />
      <StatsCard label="Calories brûlées" value={totalCalorieBurned} unit="cal" type="calories" variant="profile" />
      <StatsCard label="Distance totale parcourue" value={totalDistance} unit="km" type="distance" variant="profile" />
      <StatsCard label="Nombre de jours de repos" value={restDays} unit="jours" type="rest" variant="profile" />
      <StatsCard label="Nombre de sessions" value={totalSessions} unit="sessions" type="session" variant="profile" />
    </div>
  );
}
