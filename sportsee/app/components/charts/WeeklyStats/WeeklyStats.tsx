import DonnutChart from "./DonutChart/DonutChart";
import { MOCK_USER_ACTIVITY } from "../../../data/mockData";
import StatsCard from "./StatsCard/StatsCard";

export default function StatsWrapper() {
  const totalDuration = MOCK_USER_ACTIVITY.reduce((acc, session) => {
    return acc + session.duration;
  }, 0);

  const totalDistance = MOCK_USER_ACTIVITY.reduce((acc, session) => {
    return acc + session.distance;
  }, 0);

  return (
    <div className="stats-wrapper">
      <DonnutChart />
      <StatsCard label="Durée" value={totalDuration} unit="min" />
      <StatsCard label="Distance" value={totalDistance} unit="km" />
    </div>
  );
}
