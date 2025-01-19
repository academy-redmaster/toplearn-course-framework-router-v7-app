import { useLocation, Navigate, Outlet, useLoaderData } from "react-router";
import { checkAuth } from "../utils/auth";
import { getSession } from "../sessions.server";

export default function ProtectedRoute({ redirectTo = "/auth/login" }) {
  const token = useLoaderData();
  const { userId } = checkAuth(token);
  const location = useLocation();

  const isAuth = userId;

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const result = session.get("token");
  return result;
}
