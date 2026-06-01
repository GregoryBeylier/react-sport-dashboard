import { Outlet } from "react-router";
import  Header  from "../components/layout/header/Header";
import  Footer  from "../components/layout/footer/Footer";

export default function Layout() {
    return (
        <div>
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}
