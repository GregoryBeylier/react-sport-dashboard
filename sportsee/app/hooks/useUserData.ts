import { useState, useEffect } from "react"
import fetchUserInfo  from "../services/api"
import type { UserActivity } from "../types/Type"
import { useAuth } from "../context/authContext"

export type UserData = {
  id: string
  weeklyGoal: number
  userInfos: {
    firstName: string
    lastName: string
    age: number
    gender: string
    profilePicture: string
    height: number
    weight: number
    createdAt: string
  }
  runningData: UserActivity[]
}

export default function useUserData() {
    const { authToken } = useAuth()

    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!authToken) return // ← si pas de token, on ne fait rien
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


