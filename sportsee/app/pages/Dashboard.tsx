import { useUser } from "../context/contextUser";
import ChartsWrapper from "../components/charts/RecentPerformance/ChartsWrapper";
import StatsWrapper from "../components/charts/WeeklyStats/WeeklyStats";

export default function Dashboard() {
  const {
    firstName,
    lastName,
    isLoading,
    createdAt,
    totalDistance,
    photoProfile,
  } = useUser();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <img
        src={photoProfile || "/images/default_profile.png"}
        alt={firstName}
      />
      <div>
        <p>
          {firstName} {lastName}
        </p>
        <p>Membre depuis le {createdAt}</p>
      </div>
      <div>
        <p>Distance totale parcourue {totalDistance} km</p>
      </div>
      <div>
        <ChartsWrapper />
        <StatsWrapper />
      </div>
    </div>
  );
}
