
export default async function getUser(userID: string) {
  try {
    const response = await fetch(`http://localhost:8000/user/${userID}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erreur :", error)
  }
}