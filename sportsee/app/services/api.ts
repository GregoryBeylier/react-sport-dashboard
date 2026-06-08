export default async function fetchUserInfo(token: string) {
  try {
    const response = await fetch("http://localhost:8000/api/user-info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur :", error);
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data; // contient { token, userId }
  } catch (error) {
    console.error("Erreur login :", error);
  }
}
