import { useUser } from "../context/contextUser";
import ProfileCard from "../components/profileStats/ProfileCard";
import StatsSection from "../components/profileStats/statsSection";
import { MOCK_USER_INFO } from "../data/mockData";

export default function Profile() {
  const { firstName, lastName, isLoading, createdAt, photoProfile } = useUser();
  const { age, weight, height, gender } = MOCK_USER_INFO.profile;

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div>
        <img src={photoProfile ?? ""} alt={firstName} /> {firstName} {lastName}{" "}
        {createdAt}
      </div>
      <div>
        <h2>Vorre profil</h2>
        <ProfileCard
          age={age} 
          weight={weight}
          height={height}
          gender={gender}
        />
        <StatsSection />
      </div>
    </div>
  );
}
