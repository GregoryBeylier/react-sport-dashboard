import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useUser } from "../../context/contextUser";
import fetchUserInfo from "../../services/api";
import { fetchUserActivity } from "../../services/api";
import StatsCard from "../charts/WeeklyStats/StatsCard/StatsCard";
import styles from "./StatsSection.module.css";

export default function StatsSection() {
  const { totalDistance, createdAt } = useUser();
  const { authToken } = useAuth();

  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [restDays, setRestDays] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authToken || !createdAt) return;

    const start = createdAt.split("T")[0];
    const end = new Date().toISOString().split("T")[0];

    Promise.all([
      fetchUserInfo(authToken),
      fetchUserActivity(authToken, start, end),
    ])
      .then(([userInfo, activities]) => {
        const sessions = userInfo?.statistics?.totalSessions ?? 0;
        const duration = userInfo?.statistics?.totalDuration ?? 0;
        setTotalSessions(sessions);
        setTotalDuration(duration);

        const calories = Array.isArray(activities)
          ? activities.reduce(
              (acc: number, session: any) => acc + (session.caloriesBurned ?? 0),
              0
            )
          : 0;
        setTotalCalories(calories);

        const created = new Date(createdAt);
        const today = new Date();
        const diffMs = today.getTime() - created.getTime();
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        setRestDays(Math.max(0, totalDays - sessions));
      })
      .catch(() => setError("Impossible de charger les données"));
  }, [authToken, createdAt]);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.grid}>
      <StatsCard label="Temps total couru" value={totalDuration} unit="min" type="duree" variant="profile" />
      <StatsCard label="Calories brûlées" value={totalCalories} unit="cal" type="calories" variant="profile" />
      <StatsCard label="Distance totale parcourue" value={totalDistance} unit="km" type="distance" variant="profile" />
      <StatsCard label="Nombre de jours de repos" value={restDays} unit="jours" type="rest" variant="profile" />
      <StatsCard label="Nombre de sessions" value={totalSessions} unit="sessions" type="session" variant="profile" />
    </div>
  );
}