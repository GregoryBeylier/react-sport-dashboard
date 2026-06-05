import DistanceChart from "./distanceChart/DistanceChart";
import HeartRateChart from "./HeartRateChart/HeartRateChart";
import styles from "./ChartsWrapper.module.css"

export default function ChartsWrapper() {
  return (
    <div className={styles.chartsWrapper}>
      <DistanceChart />
      <HeartRateChart />
    </div>
  );
}