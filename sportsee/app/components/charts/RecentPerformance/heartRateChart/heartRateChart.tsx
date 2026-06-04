import { MOCK_USER_ACTIVITY } from "../../../../data/mockData";
import { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { UserActivity } from "../../../../types/Type";
import styles from "./HeartRateChart.module.css";

export default function HeartRateChart() {
  const [heartRates, setHeartRates] = useState<UserActivity[]>([]);

  useEffect(() => {
    setHeartRates(MOCK_USER_ACTIVITY);
  }, []);

  return (
    <div className={styles.heartRateChart}>
    <ComposedChart
      width={400}
      height={300}
      data={heartRates.map((activity) => ({
        date: activity.date,
        min: activity.heartRate.min,
        max: activity.heartRate.max,
        average: activity.heartRate.average,
      }))}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis
        dataKey="date"
        scale="band"
        tickFormatter={(dateStr) => {
          const jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
          const date = new Date(dateStr);
          return jours[date.getDay()];
        }}
      />
      <YAxis type="number" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="average" stroke="#8884d8" />
      <Bar dataKey="min" barSize={20} fill="#413ea0" />
      <Bar dataKey="max" barSize={20} fill="#ff0000" />
    </ComposedChart>
    </div>
  );
}
