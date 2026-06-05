import { Outlet } from "react-router";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";

export default function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} >
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
