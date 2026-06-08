import { useState, useEffect } from "react"
import fetchUserInfo  from "../services/api"
import { useAuth } from "../context/authContext"

export type UserData = {
profile: {
    firstName: string
    lastName: string
    createdAt:string
    age: number
    weight: number
    height: number
    profilePicture: string
}
  statistics: {
    totalDistance: string
    totalSessions: number
    totalDuration: number
  }
}

export default function useUserData() {
    const { authToken } = useAuth()

    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!authToken) return 
    setIsLoading(true);
    async function fetchData() {
        const data = await fetchUserInfo(authToken!)
        setUserData(data)
        setIsLoading(false);
    }
    fetchData() 
}, [authToken])
return { userData, isLoading  }
}



