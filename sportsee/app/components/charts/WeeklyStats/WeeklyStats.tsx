import { useState, useEffect } from "react";
import DonnutChart from "./DonutChart/DonutChart";
import StatsCard from "./StatsCard/StatsCard";
import styles from "./WeeklyStats.module.css";

import { useAuth } from "../../../context/authContext";
import { fetchUserActivity } from "../../../services/api";
import { getWeekRange, formatDateLong } from "../../../utils/dateHelpers";
import type { UserActivity } from "../../../types/Type";

export default function StatsWrapper() {
  const { authToken } = useAuth();

  const [totalDuration, setTotalDuration] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [loading, setLoading] = useState(false);

  const { monday, sunday } = getWeekRange(new Date());
  const start = monday.toISOString().split("T")[0];
  const end = sunday.toISOString().split("T")[0];

  useEffect(() => {
    if (!authToken) return;

    setLoading(true);

    fetchUserActivity(authToken, start, end)
      .then((data: UserActivity[]) => {
       
        const duration = data.reduce((acc: number, s: UserActivity) => acc + (s.duration || 0), 0);
        const distance = data.reduce((acc: number, s: UserActivity) => acc + (s.distance || 0), 0);

        setTotalDuration(duration);
        setTotalDistance(distance);
      })
      .catch((err) => console.error("WeeklyStats fetch error:", err))
      .finally(() => setLoading(false));
  }, [authToken, start, end]);

  const dateRange = `Du ${formatDateLong(monday)} au ${formatDateLong(sunday)}`;

 
  if (loading) {
    return <div className={styles.statsWrapper}>Chargement...</div>;
  }

  return (
    <div className={styles.statsWrapper}>
      <h2>Cette semaine</h2>
      <p className={styles.dateRange}>{dateRange}</p>

      <div className={styles.statsContent}>
        <div className={styles.statsLeft}>
          <DonnutChart />
        </div>

        <div className={styles.statsRight}>
          <StatsCard
            label="Durée d'activité"
            value={totalDuration}
            unit="minutes"
            type="duration"
          />
          <StatsCard
            label="Distance"
            value={parseFloat(totalDistance.toFixed(1))}
            unit="kilomètres"
            type="distance"
          />
        </div>
      </div>
    </div>
  );
}