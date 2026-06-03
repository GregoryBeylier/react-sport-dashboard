import { MOCK_USER_ACTIVITY, MOCK_USER_INFO } from "../../data/mockData";
import StatsCard from "../charts/WeeklyStats/StatsCard/StatsCard";

export default function StatsSection() {
  const totalCalorieBurned = MOCK_USER_ACTIVITY.reduce((acc, session) => {
    return acc + session.caloriesBurned;
  }, 0);

  const { totalDistance, totalSessions, totalDuration, restDays } =
    MOCK_USER_INFO.statistics;

  return (
    <div className="stats-section">
      <StatsCard label="Calories brûlées" value={totalCalorieBurned} unit="kcal" />
      <StatsCard label="Distances total parcourue" value={totalDistance} unit="km" />
      <StatsCard label="Nombre de sessions" value={totalSessions} unit="Sessions" />
      <StatsCard label="Temps total couru" value={totalDuration} unit="Heures" />
      <StatsCard label="Nombre de jours de repos" value={restDays} unit="jours" />
    </div>
  );
}
