import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { MOCK_USER_INFO } from "../data/mockData";





interface UserContextType {
    firstName: string;
    lastName: string;
    totalDistance : number;
    createdAt: string;
    photoProfile: string | null;
    isLoading: boolean;
}

const ContextUser = createContext<UserContextType | null>(null);

export function useUser() {
    const context = useContext(ContextUser);

    if(!context) throw new Error("useUser must be used within a UserProvider")

    return context 
}

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [photoProfile, setPhotoProfile] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [createdAt, setCreatedAt] = useState<string>("");

    
    

    useEffect(() => {
        setIsLoading(true);
        setFirstName(MOCK_USER_INFO.profile.firstName);
        setLastName(MOCK_USER_INFO.profile.lastName);
        setPhotoProfile(MOCK_USER_INFO.profile.profilePicture);
        setTotalDistance(MOCK_USER_INFO.statistics.totalDistance);
        setCreatedAt(MOCK_USER_INFO.profile.createdAt);
        setIsLoading(false);
    }, []);

    return (
        <ContextUser.Provider value={{ firstName, lastName, photoProfile,  isLoading, totalDistance, createdAt }}>
            {children}
        </ContextUser.Provider>
    );
};
