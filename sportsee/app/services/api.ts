import { MOCK_USER_INFO, MOCK_USER_ACTIVITY } from "../data/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export default async function fetchUserInfo(token: string) {
  if (USE_MOCK) return MOCK_USER_INFO;

  try {
    const response = await fetch("http://localhost:8000/api/user-info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("fetchUserInfo error:", error);
    throw error;
  }
}

export async function loginUser(username: string, password: string) {
  if (USE_MOCK) {
    return { token: "mock-token", userId: "mock-user" };
  }

  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("loginUser error:", error);
    throw error;
  }
}

export async function fetchUserActivity(
  token: string,
  startWeek: string,
  endWeek: string
) {
  if (USE_MOCK) {
    const start = new Date(startWeek);
    const end = new Date(endWeek);
    return MOCK_USER_ACTIVITY.filter((activity) => {
      const date = new Date(activity.date);
      return date >= start && date <= end;
    });
  }

  try {
    const response = await fetch(
      `http://localhost:8000/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("fetchUserActivity error:", error);
    throw error;
  }
}