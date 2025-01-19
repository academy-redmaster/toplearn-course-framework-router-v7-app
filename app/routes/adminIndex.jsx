import { Outlet } from "react-router";

export default function AdminIndexPage() {
  return (
    <div className="w-full h-full grid grid-rows-2">
      <div className="w-full h-full bg-blue-100 flex items-center justify-center">
        <h1>Admin Index Page</h1>
      </div>
      <Outlet />
    </div>
  );
}

