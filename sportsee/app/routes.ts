import { type RouteConfig, route, index, layout } from "@react-router/dev/routes"


export default [
  layout("components/ProtectedRoute.tsx", [
    route("/dashboard", "routes/dashboard.tsx"),
    route("/profile", "routes/profile.tsx"),
]),
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("*", "routes/page404.tsx")
] satisfies RouteConfig