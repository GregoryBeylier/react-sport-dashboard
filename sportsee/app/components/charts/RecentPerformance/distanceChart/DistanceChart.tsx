import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle, CartesianGrid, ResponsiveContainer } from "recharts";
import { useAuth } from "../../../../context/authContext";
import { fetchUserActivity } from "../../../../services/api";
import { getFourWeekRange, formatDateISO, formatDateShort } from "../../../../utils/dateHelpers";
import type { UserActivity } from "../../../../hooks/useUserData";
import styles from "./DistanceChart.module.css";

export default function DistanceChart() {
  const { authToken } = useAuth();
  const [hovered, setHovered] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityData, setActivityData] = useState<UserActivity[] | null>(null);


  const { start, end } = getFourWeekRange(currentDate);
  const startWeek = formatDateISO(start);
  const endWeek = formatDateISO(end);


  useEffect(() => {
    if (!authToken) return;
    async function fetchData() {
      const data = await fetchUserActivity(authToken!, startWeek, endWeek);
      setActivityData(data);
    }
    fetchData();
  }, [authToken, startWeek, endWeek]);

  
  function generateWeekRanges(start: Date) {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(start);
      weekStart.setDate(start.getDate() + i * 7);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      weeks.push({ start: weekStart, end: weekEnd });
    }
    return weeks;
  }

  
  const weeks = generateWeekRanges(start);

  const formatted = weeks.map((week, index) => {
    const totalDistance =
      activityData
        ?.filter((session) => {
          const d = new Date(session.date);
          return d >= week.start && d <= week.end;
        })
        .reduce((acc, s) => acc + s.distance, 0) || 0;

    return {
      semaine: `S${index + 1}`,
      distance: totalDistance,
    };
  });

  
  const avgDistance = (
    formatted.reduce((acc, w) => acc + w.distance, 0) / 4
  ).toFixed(0);

  
  function goToPrevWeek() {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  }

  function goToNextWeek() {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  }

  return (
    <div className={styles.distanceChart}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{avgDistance}km en moyenne</h2>
          <p className={styles.subtitle}>Total des kilomètres 4 dernières semaines</p>
        </div>

        <div className={styles.nav}>
          <button onClick={goToPrevWeek}>&#8249;</button>
          <span>{formatDateShort(start)} - {formatDateShort(end)}</span>
          <button onClick={goToNextWeek}>&#8250;</button>
        </div>
      </div>

      <ResponsiveContainer width={330} height={307}>
        <BarChart data={formatted} barSize={14}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CartesianGrid vertical={false} stroke="#e0e0e0" strokeDasharray="2 2" />
          <XAxis dataKey="semaine" axisLine={true} tickLine={false} tick={{ dy: 10, fontSize: 12 }} padding={{ left: 10 }} />
          <YAxis axisLine={true} tickLine={false} tick={{ fontSize: 10 }} />
          <Tooltip cursor={false} />
          <Bar dataKey="distance" fill={hovered ? "#0000ff" : "#B6BDFC"}
            radius={[6, 6, 0, 0] as [number, number, number, number]}
            activeBar={<Rectangle fill="#0000ff" radius={[6, 6, 0, 0]} stroke="none" />}
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
