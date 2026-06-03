import { type RouteConfig, route, index, layout } from "@react-router/dev/routes"


export default [
// layout("components/ProtectedRoute.tsx", [
    layout("layoutsGlobal/Layout.tsx", [
        route("/dashboard", "pages/Dashboard.tsx"),
        route("/profile", "pages/Profile.tsx"),
    ]),
// ]),
  index("pages/SignIn.tsx"),
  route("*", "pages/page404.tsx")
] satisfies RouteConfig