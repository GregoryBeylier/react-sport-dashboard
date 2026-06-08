import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useUserData from "../hooks/useUserData";
import type { UserActivity } from "../types/Type";

interface UserContextType {
  firstName: string;
  lastName: string;
  totalDistance: number;
  createdAt: string;
  photoProfile: string | null;
  isLoading: boolean;
  runningData: UserActivity[];
  weeklyGoal: number;
}

const ContextUser = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(ContextUser);

  if (!context) throw new Error("useUser must be used within a UserProvider");

  return context;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { userData, isLoading } = useUserData();

  const firstName = userData?.userInfos.firstName ?? "";
  const lastName = userData?.userInfos.lastName ?? "";
  const photoProfile = userData?.userInfos.profilePicture ?? null;
  const createdAt = userData?.userInfos.createdAt ?? "";
  const runningData = userData?.runningData ?? [];
  const weeklyGoal = userData?.weeklyGoal ?? 0;

  const totalDistance =
    userData?.runningData.reduce((acc, session) => {
      return acc + session.distance;
    }, 0) ?? 0;

  return (
    <ContextUser.Provider
      value={{
        firstName,
        lastName,
        photoProfile,
        isLoading,
        createdAt,
        totalDistance,
        runningData,
        weeklyGoal
      }}
    >
      {children}
    </ContextUser.Provider>
  );
};
