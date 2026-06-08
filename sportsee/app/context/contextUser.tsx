import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useUserData from "../hooks/useUserData";

interface UserContextType {
  firstName: string;
  lastName: string;
  totalDistance: number;
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


  return (
    <ContextUser.Provider
      value={{
        firstName,
        lastName,
        photoProfile,
        isLoading,
        createdAt,
        totalDistance,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
};
