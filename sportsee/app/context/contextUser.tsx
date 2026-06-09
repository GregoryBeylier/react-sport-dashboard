import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useUserData from "../hooks/useUserData";


interface UserContextType {
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
  totalDistance: number;
  totalSessions: number;
  totalDuration: number;
  createdAt: string;
  photoProfile: string | null;
  isLoading: boolean;
}

const ContextUser = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(ContextUser);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { userData, isLoading } = useUserData();

  const firstName = userData?.profile?.firstName ?? "";
  const lastName = userData?.profile?.lastName ?? "";
  const photoProfile = userData?.profile?.profilePicture ?? null;
  const createdAt = userData?.profile?.createdAt ?? "";
  const totalDistance = parseFloat(userData?.statistics?.totalDistance ?? "0");
  const totalSessions = userData?.statistics?.totalSessions ?? 0;
  const totalDuration = userData?.statistics?.totalDuration ?? 0;
  const age = userData?.profile?.age ?? 0;
  const weight = userData?.profile?.weight ?? 0;
  const height = userData?.profile?.height ?? 0;
 

  return (
    <ContextUser.Provider value={{
      firstName, lastName, photoProfile, isLoading, createdAt,
      totalDistance, totalSessions, totalDuration,
      age, weight, height
    }}>
      {children}
    </ContextUser.Provider>
  );
};