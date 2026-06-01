import { type RouteConfig, route, index, layout } from "@react-router/dev/routes"


export default [
// layout("components/ProtectedRoute.tsx", [
    layout("layouts/Layout.tsx", [
        route("/dashboard", "routes/Dashboard.tsx"),
        route("/profile", "routes/Profile.tsx"),
    ]),
// ]),
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("*", "routes/page404.tsx")
] satisfies RouteConfig