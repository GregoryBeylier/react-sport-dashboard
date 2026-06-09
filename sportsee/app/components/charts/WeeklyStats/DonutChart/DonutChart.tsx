import { Pie, PieChart, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import fetchUserInfo from "../../../../services/api";
import { fetchUserActivity } from "../../../../services/api";
import { getWeekRange } from "../../../../utils/dateHelpers";
import styles from "./DonutChart.module.css";

export default function DonutChart() {
  const [target, setTarget] = useState<number>(7);
  const [completed, setCompleted] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const { authToken } = useAuth();

  
  const { monday, sunday } = getWeekRange(new Date());
  const start = monday.toISOString().split("T")[0];
  const end = sunday.toISOString().split("T")[0];

  useEffect(() => {
    if (!authToken) return;

    setLoading(true);

    Promise.all([
     
      fetchUserInfo(authToken),
      
      fetchUserActivity(authToken, start, end),
    ])
      .then(([userInfo, activities]) => {
        
        const goal =
          userInfo?.weeklyGoal ?? userInfo?.goal ?? 7;
        setTarget(goal);

       
        const count = Array.isArray(activities)
          ? activities.length
          : 0;
        setCompleted(count);
      })
      .catch((err) => console.error("DonutChart fetch error:", err))
      .finally(() => setLoading(false));
  }, [authToken]);

  
  const remaining = Math.max(0, target - completed);

  const donutData = [
    { name: "restantes", value: remaining, fill: "#B6BDFC" },
    { name: "Réalisées", value: completed, fill: "#0B23F4" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.title}>
          <span className={styles.count}>
            {loading ? "..." : `x${completed}`}
          </span>{" "}
          sur objectif de {loading ? "..." : target}
        </p>
        <p className={styles.subtitle}>Courses hebdomadaire réalisées</p>
      </div>

      <div className={styles.chartContainer}>
        <PieChart
          width={400}
          height={260}
          margin={{ top: 0, right: 100, bottom: 60, left: 40 }}
        >
          <Pie
            startAngle={110}
            endAngle={-260}
            data={donutData}
            dataKey="value"
            nameKey="name"
            innerRadius={30}
            outerRadius={70}
            cx="45%"
            cy="45%"
            label={({
              cx, cy, midAngle = 0,
              outerRadius, name, value, fill,
            }: any) => {
              const RADIAN = Math.PI / 180;
              const distance = outerRadius + 25;
              const x = cx + distance * Math.cos(-midAngle * RADIAN);
              const y = cy + distance * Math.sin(-midAngle * RADIAN);
              const isRight = x > cx;
              const textAnchor = isRight ? "start" : "end";
              const dotOffset = isRight ? -8 : 8;
              return (
                <g>
                  <circle cx={x + dotOffset} cy={y} r={3} fill={fill} />
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    fontSize={10}
                    fill="#707070"
                    fontWeight={500}
                    fontFamily="Inter"
                  >
                    {value} {name}
                  </text>
                </g>
              );
            }}
            labelLine={false}
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}