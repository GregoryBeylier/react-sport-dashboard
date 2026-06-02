import DistanceChart from "./distanceChart/DistanceChart";
import HeartRateChart from "./heartRateChart/HeartRateChart";

export default function ChartsWrapper() {
  return (
    <div className="charts-wrapper">
      <DistanceChart />
      <HeartRateChart />
    </div>
  );
}