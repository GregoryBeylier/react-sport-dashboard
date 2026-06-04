import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { UserActivity } from "../../../../types/Type";
import { MOCK_USER_ACTIVITY } from "../../../../data/mockData";
import styles from "./DistanceChart.module.css";

export default function DistanceChart() {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [hovered, setHovered] = useState(false);

  // TODO: calculer dynamiquement depuis activities
  const weeklyData = [
    { semaine: "S1", distance: 9 },
    { semaine: "S2", distance: 13.9 },
    { semaine: "S3", distance: 5.1 },
    { semaine: "S4", distance: 8.3 },
  ];

  useEffect(() => {
    setActivities(MOCK_USER_ACTIVITY);
  }, []);

  // Calcul de la moyenne des distances
  const avgDistance = (
    weeklyData.reduce((acc, w) => acc + w.distance, 0) / weeklyData.length
  ).toFixed(0);

  return (
    <div className={styles.distanceChart}>
      {/* En-tête : titre + navigation */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{avgDistance}km en moyenne</h2>
          <p className={styles.subtitle}>
            Total des kilomètres 4 dernières semaines
          </p>
        </div>
        <div className={styles.nav}>
          <button>&#8249;</button>
          <span>28 mai - 25 juin</span>
          <button>&#8250;</button>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width={330} height={307}>
        <BarChart
          data={weeklyData}
          barSize={14}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}

        >

          <CartesianGrid
            vertical={false}
            stroke="#e0e0e0"
            strokeDasharray="2 2"
          />
          <XAxis
            dataKey="semaine"
            axisLine={true}
            tickLine={false}
            tick={{ dy: 10, fontSize: 12 }}
            padding={{ left: 10 }} // ← ajoute ça
          />
          <YAxis axisLine={true} tickLine={false} tick={{ fontSize: 10 }} />
          <Tooltip cursor={false} />
          <Bar
            dataKey="distance"
            fill={hovered ? "#0000ff" : "#B6BDFC"}
            radius={[6, 6, 0, 0] as [number, number, number, number]}
            activeBar={
              <Rectangle fill="#0000ff" radius={[6, 6, 0, 0]} stroke="none" />
            }
          />
        </BarChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        <span className={styles["legend-dot"]}></span>
        <span className={styles["legend-label"]}>Km</span>
      </div>
    </div>
  );
}
