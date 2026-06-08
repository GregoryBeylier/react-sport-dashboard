import { useState, useEffect } from "react"
import getUser from "../services/api"
import type { UserActivity } from "../types/Type"

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
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
        const data = await getUser("123")
        setUserData(data)
        setIsLoading(false);
    }
    fetchData() 
}, [])
return { userData, isLoading  }
}