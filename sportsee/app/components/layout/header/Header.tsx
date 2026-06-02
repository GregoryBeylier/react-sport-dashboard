import { Link } from "react-router"
import {useAuth } from "../../../context/authContext"
import { useNavigate } from "react-router"



export default function Header() {
   
     const  { logout } = useAuth()
     const navigate = useNavigate()

     function sessionDestroy(){
        logout()
        navigate("/");
     }
   
    return (
        <div>
            <div>
                <h1>logo</h1>
            </div>
            <nav>
                <Link to ="/dashboard">Dashboard</Link>
                <Link to="/profile">Mon profile</Link>
                <button onClick={sessionDestroy}>Se déconnecter</button>
            </nav>
        </div>

    );
}