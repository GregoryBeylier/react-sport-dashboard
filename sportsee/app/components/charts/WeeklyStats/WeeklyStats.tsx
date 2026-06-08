import DonnutChart from "./DonutChart/DonutChart";
import { MOCK_USER_ACTIVITY } from "../../../data/mockData";
import StatsCard from "./StatsCard/StatsCard";
import styles from "./WeeklyStats.module.css";
import { getWeekRange, formatDateLong } from "../../../utils/dateHelpers";

export default function StatsWrapper() {
  const totalDuration = MOCK_USER_ACTIVITY.reduce((acc, session) => {
    return acc + session.duration;
  }, 0);

  const totalDistance = MOCK_USER_ACTIVITY.reduce((acc, session) => {
    return acc + session.distance;
  }, 0);

  const { monday, sunday } = getWeekRange();
  const dateRange = ` Du ${formatDateLong(monday)} au ${formatDateLong(sunday)}`;

  return (
    <div className={styles.statsWrapper}>
      <h2>Cette semaine</h2>
      <p className={styles.dateRange}>{dateRange}</p>
      <div className={styles.statsContent}>
        <div className={styles.statsLeft}>
          <DonnutChart />
        </div>
        <div className={styles.statsRight}>
          <StatsCard
            label="Durée d’activité"
            value={totalDuration}
            unit="minutes"
            type="duration"
          />
          <StatsCard
            label="Distance"
            value={totalDistance}
            unit="kilomètres"
            type="distance"
          />
        </div>
      </div>
    </div>
  );
}
