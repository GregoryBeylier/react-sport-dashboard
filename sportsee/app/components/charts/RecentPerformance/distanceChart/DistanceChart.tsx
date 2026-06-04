import { MOCK_USER_ACTIVITY } from "../../../../data/mockData";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { UserActivity } from "../../../../types/Type";
import styles from "./DistanceChart.module.css";

export default function DistanceChart() {
  const [activities, setActivities] = useState<UserActivity[]>([]);

  // TODO: calculer dynamiquement depuis activities
  const weekLyData = [
    { semaine: "S1", distance: 9 },
    { semaine: "S2", distance: 13.9 },
    { semaine: "S3", distance: 5.1 },
    { semaine: "S4", distance: 8.3 },
  ];

  useEffect(() => {
    setActivities(MOCK_USER_ACTIVITY);
  }, []);
  
  return (
    <div className={styles.distanceChart}>
    <BarChart width={400} height={300} data={weekLyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="semaine" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="distance" fill="#8884d8" />
    </BarChart>
    </div>

  );
}
