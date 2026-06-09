import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import fetchUserInfo from "../services/api";

export type UserData = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    weight: number;
    height: number;
    gender: string;
    profilePicture: string;
  };
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  };
};

export type UserActivity = {
  date: string;
  distance: number;
  duration: number;
  heartRate: {
    min: number;
    max: number;
    average: number;
  };
  caloriesBurned: number;
};

export default function useUserData() {
  const { authToken } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!authToken) return;
    setIsLoading(true);
    async function fetchData() {
      const data = await fetchUserInfo(authToken!);
      setUserData(data);
      setIsLoading(false);
    }
    fetchData();
  }, [authToken]);

  return { userData, isLoading };
}