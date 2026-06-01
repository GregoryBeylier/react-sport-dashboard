import { Link } from "react-router"
import {useAuth } from "../context/authContext"



export default function Header() {
   
     const { logout } = useAuth()
   
    return (
        <div>
            <div>
                <h1>logo</h1>
            </div>
            <nav>
                <Link to ="/dashboard">Dashboard</Link>
                <Link to="/profile">Mon profile</Link>
                <button onClick={logout}>Se déconnecter</button>
            </nav>
        </div>

    );
}