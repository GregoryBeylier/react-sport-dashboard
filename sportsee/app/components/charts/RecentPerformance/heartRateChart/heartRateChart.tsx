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

export type userHeartRateChart = {
  date: string;
  heartRate: {
    min: number;
    max: number;
    average: number;
  };
};

export default function HeartRateChart() {
  const [heartRates, setHeartRates] = useState<userHeartRateChart[]>([]);

  useEffect(() => {
    setHeartRates(MOCK_USER_ACTIVITY);
  }, []);

  return (
    <ComposedChart width={400} height={300} data={heartRates}>
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
      <Line type="monotone" dataKey="heartRate.average" stroke="#8884d8" />
      <Bar dataKey="heartRate.min" barSize={20} fill="#413ea0" />
      <Bar dataKey="heartRate.max" barSize={20} fill="#ff0000" />
      
    </ComposedChart>
  );
}
