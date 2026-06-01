import { useUser } from "../context/contextUser";
import RecentPerformance from "../components/RecentPerformance";

export default function Dashboard() {

  const { firstName, lastName, isLoading, createdAt, totalDistance, photoProfile} = useUser();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <img src={photoProfile || ""} alt={firstName} />
      <div>
        <p>{firstName} {lastName}</p>
        <p>Membre depuis le {createdAt}</p>
      </div>
      <div>
        <p>Distance totale parcourue {totalDistance} km</p>
      </div>
      <div>
      <RecentPerformance />
      </div>
    </div>

  );
}



