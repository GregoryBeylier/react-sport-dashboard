export type ProfileCardProps = {
  age: number;
  weight: number;
  height: number;
  gender: string;
};

export default function ProfileCard({
  age,
  weight,
  height,
  gender,
}: ProfileCardProps) {
  return (
    <div>
      <p>Âge : {age} </p> 
      <p>Genre : {gender}</p> 
      <p>Taille : {Math.floor(height / 100)}m{height % 100}</p>
      <p>Poids : {weight} kg</p>
    </div>
  );
}
