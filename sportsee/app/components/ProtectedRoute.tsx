import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";


export default function ProtectedRoute() {
    const { authToken } = useAuth();

    if (!authToken) {
        return <Navigate to = "/login"/>
    } 
        return <Outlet/>
}
