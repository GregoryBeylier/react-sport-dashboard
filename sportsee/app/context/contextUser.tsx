import { createContext, useContext, useState  } from "react";
import type { ReactNode } from "react";

interface UserContextType {
    firstName: string;
    lastName: string;
    totalDistance : number;
    memberSince: string;
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
    
    let memberSince = ""

    return (
        <ContextUser.Provider value={{ firstName, lastName, photoProfile,  isLoading, totalDistance, memberSince }}>
            {children}
        </ContextUser.Provider>
    );
};
