import { Pie, PieChart, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";
import type { WeeklyGoal } from "../../../../types/Type";
import { MOCK_USER_INFO } from "../../../../data/mockData";
import styles from "./DonutChart.module.css";

export default function DonnutChart() {
  const [weeklyGoal, setWeeklyGoal] = useState<WeeklyGoal | null>(null);

  useEffect(() => {
    setWeeklyGoal(MOCK_USER_INFO.weeklyGoal);
  }, []);

  const donutData = [
    {
      name: "restantes",
      value: (weeklyGoal?.target ?? 0) - (weeklyGoal?.completed ?? 0),
      fill: "#B6BDFC",
    },
    { name: "Réalisées", value: weeklyGoal?.completed ?? 0, fill: "#0B23F4" },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.title}>
          <span className={styles.count}>x{weeklyGoal?.completed}</span> sur
          objectif de {weeklyGoal?.target}
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
              cx,
              cy,
              midAngle = 0,
              outerRadius,
              name,
              value,
              fill,
            }: any) => {
              const RADIAN = Math.PI / 180;
              const distance = outerRadius + 25; // distance entre le donut et la légende
              const x = cx + distance * Math.cos(-midAngle * RADIAN);
              const y = cy + distance * Math.sin(-midAngle * RADIAN);

              // Alignement dynamique selon le côté du donut
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
