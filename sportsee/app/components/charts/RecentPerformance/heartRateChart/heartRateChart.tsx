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
  ResponsiveContainer,
} from "recharts";
import type { UserActivity } from "../../../../types/Type";
import styles from "./HeartRateChart.module.css";

const JOURS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function HeartRateChart() {
  const [heartRates, setHeartRates] = useState<UserActivity[]>([]);

  useEffect(() => {
    setHeartRates(MOCK_USER_ACTIVITY);
  }, []);

  const data = heartRates.map((activity) => ({
    date: activity.date,
    min: activity.heartRate.min,
    max: activity.heartRate.max,
    average: activity.heartRate.average,
  }));

  const avgBPM =
    data.length > 0
      ? Math.round(data.reduce((acc, d) => acc + d.average, 0) / data.length)
      : 0;

  return (
    <div className={styles.heartRateChart}>
      {/* En-tête */}
      <div className={styles.header}>
        <div>
          {/* Titre en rouge comme la maquette */}
          <h2 className={styles.title}>{avgBPM} BPM</h2>
          <p className={styles.subtitle}>Fréquence cardiaque moyenne</p>
        </div>
        <div className={styles.nav}>
          <button>&#8249;</button>
          <span>28 mai - 04 juin</span>
          <button>&#8250;</button>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={307}>
        <ComposedChart
          data={data}
          barSize={14}
          barCategoryGap="30%"
          barGap={2}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#e0e0e0"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="date"
            axisLine={{ stroke: "#333" }}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(dateStr) => {
              const jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
              const date = new Date(dateStr);
              return jours[date.getDay()];
            }}
          />
          <YAxis
            axisLine={{ stroke: "#333" }}
            tickLine={false}
            tick={{ fontSize: 10 }}
            domain={["auto", "auto"]}
          />
          <Tooltip cursor={false} />

          <Bar dataKey="min" fill="#FFCCC7" radius={[6, 6, 0, 0]} />
          <Bar dataKey="max" fill="#E84335" radius={[6, 6, 0, 0]} />

          
          <Line
            type="monotone"
            dataKey="average"
            stroke="#a29bfe"
            strokeWidth={2}
            dot={{ fill: "#3D3DFF", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        <span>
          <span className={styles.dotMin}></span> Min
        </span>
        <span>
          <span className={styles.dotMax}></span> Max BPM
        </span>
        <span>
          <span className={styles.dotAvg}></span> Moy BPM
        </span>
      </div>
    </div>
  );
}
