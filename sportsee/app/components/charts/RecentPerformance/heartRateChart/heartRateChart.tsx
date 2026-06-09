import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import { fetchUserActivity } from "../../../../services/api";
import { getWeekRange, formatDateShort } from "../../../../utils/dateHelpers";
import type { UserActivity } from "../../../../hooks/useUserData";
import {
  ComposedChart, Line, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import styles from "./HeartRateChart.module.css";

const JOURS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function HeartRateChart() {
  const [heartRates, setHeartRates] = useState<UserActivity[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(
    () => getWeekRange(new Date()).monday,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { authToken } = useAuth();
  const { monday, sunday } = getWeekRange(currentDate);

  useEffect(() => {
    if (!authToken) return;
    const start = monday.toISOString().split("T")[0];
    const end = sunday.toISOString().split("T")[0];
    setLoading(true);
    fetchUserActivity(authToken, start, end)
      .then((data) => setHeartRates(data))
      .catch(() => setError("Impossible de charger les données"))
      .finally(() => setLoading(false));
  }, [currentDate, authToken]);

  const goToPrevWeek = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const data = weekDays.map((day) => {
    const iso = day.toISOString().split("T")[0];
    const found = heartRates?.find((h) => h.date === iso);
    return {
      date: iso,
      min: found?.heartRate.min ?? 0,
      max: found?.heartRate.max ?? 0,
      average: found?.heartRate.average ?? 0,
    };
  });

  const avgBPM =
    data.length > 0
      ? Math.round(data.reduce((acc, d) => acc + d.average, 0) / data.length)
      : 0;

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.heartRateChart}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{loading ? "..." : `${avgBPM} BPM`}</h2>
          <p className={styles.subtitle}>Fréquence cardiaque moyenne</p>
        </div>
        <div className={styles.nav}>
          <button onClick={goToPrevWeek}>&#8249;</button>
          <span>{formatDateShort(monday)} - {formatDateShort(sunday)}</span>
          <button onClick={goToNextWeek}>&#8250;</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={307}>
        <ComposedChart data={data} barSize={14} barCategoryGap="30%" barGap={2}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis dataKey="date" axisLine={{ stroke: "#333" }} tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(dateStr) => {
              const date = new Date(dateStr);
              return JOURS[date.getDay()];
            }}
          />
          <YAxis axisLine={{ stroke: "#333" }} tickLine={false} tick={{ fontSize: 10 }}
            domain={([dataMin, dataMax]) => [Math.max(0, dataMin - 20), dataMax + 10]}
          />
          <Tooltip cursor={false} />
          <Bar dataKey="min" fill="#FFCCC7" radius={[6, 6, 0, 0]} />
          <Bar dataKey="max" fill="#E84335" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="average" stroke="#a29bfe" strokeWidth={2}
            dot={{ fill: "#3D3DFF", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </ComposedChart>
      </ResponsiveContainer>

      <div className={styles.legend}>
        <span><span className={styles.dotMin}></span> Min</span>
        <span><span className={styles.dotMax}></span> Max BPM</span>
        <span><span className={styles.dotAvg}></span> Moy BPM</span>
      </div>
    </div>
  );
}