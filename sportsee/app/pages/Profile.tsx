import { useUser } from "../context/contextUser";

export default function Profile() {

  const { firstName, lastName, isLoading, createdAt } = useUser();

  if (isLoading) {
    return <div>Chargement...</div>;
  }


  return <div>{firstName} {lastName} {createdAt} </div>;
}