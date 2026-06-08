import { useState, useEffect } from "react";
import { fetchUserActivity } from "../services/api";
import { useAuth } from "../context/authContext";
import fetchUserInfo from "../services/api";
import {getWeekRange, formatDateISO} from "../utils/dateHelpers"

export type UserData = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    weight: number;
    height: number;
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
  
  const [activityData, setActivityData] = useState<UserActivity[] | null>(null);


  const { monday, sunday } = getWeekRange()
  const startWeek = formatDateISO(monday)
  const endWeek = formatDateISO(sunday)

  

  useEffect(() => {
    if (!authToken) return;
    setIsLoading(true);
    async function fetchData() {
      const data = await fetchUserInfo(authToken!);
      const activity = await fetchUserActivity(authToken!, startWeek, endWeek)
      setActivityData(activity);
      setUserData(data );
      setIsLoading(false);
    }
    fetchData();
  }, [authToken, startWeek, endWeek]);
  return { userData, isLoading, activityData };
}
