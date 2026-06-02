import { Pie, PieChart, Tooltip} from 'recharts';
import { useState, useEffect } from "react";
import type { WeeklyGoal } from "../../../../types/Type";
import { MOCK_USER_INFO } from "../../../../data/mockData";


export default function DonnutChart() {

    const [weeklyGoal, setWeeklyGoal] = useState<WeeklyGoal | null>(null)

    
    useEffect(() => {
        setWeeklyGoal(MOCK_USER_INFO.weeklyGoal);
    }, [])
    
    const donutData = [
  { name: "Réalisées", value: weeklyGoal?.completed },
  { name: "Restantes", value: (weeklyGoal?.target ?? 0) - (weeklyGoal?.completed ?? 0)},
]
    return (
    <PieChart width={300} height={300}>
    <Pie
      data={donutData}
      dataKey="value"
      nameKey="name"
      innerRadius={60}
      outerRadius={80}
    />
    <Tooltip />
  </PieChart>);
}